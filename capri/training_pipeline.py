import torch
from typing import List, Optional, Callable
import numpy as np
from pathlib import Path

from models import EcologicalFingerprintEncoder
from multi_dataset import MultiDatasetPool
from contrastive_learner import EcologicalPairDataset, PhysicalPerturbationPairs, train_contrastive_model
from embedding_database import EmbeddingDatabase, EmbeddingRecord
from regime_discovery import RegimeDiscoverer
import csv

class EcologicalTrainingPipeline:
    def __init__(self, datasets_dir: str = "./datasets", device: str = "cpu"):
        self.base_dir = Path(datasets_dir)
        self.device = device
        self.pool = MultiDatasetPool(datasets_dir)
        self.model = EcologicalFingerprintEncoder(in_channels=8, latent_dim=128)
        self.dataset_cache: Optional[EcologicalPairDataset] = None

    def load_datasets(self, dataset_names: List[str]) -> int:
        return self.pool.load(dataset_names)

    def _build_pair_dataset(self):
        cubes = self.pool.cubes
        # Convert (H, W, V) to (V, H, W) for PyTorch
        pt_cubes = [np.transpose(c, (2, 0, 1)).astype(np.float32) for c in cubes]
        
        from cube_builder import TileMetadata
        from ecological_encoder import EcologicalEncoding
        
        encodings = []
        for i, c in enumerate(pt_cubes):
            meta = self.pool.metadata[i]
            t_meta = TileMetadata(source_file=meta["dataset"], regime=meta["regime"])
            t_meta.coordinates = meta.get("lon_bounds", [0,0]) # simplify
            
            # Create a mock encoding wrapper to satisfy ContrastiveLearner
            # (which usually expects EcologicalEncoder outputs)
            class MockEncoding(EcologicalEncoding):
                def __init__(self, tensor, m):
                    self.tensor = tensor
                    self.metadata = m
                    self.cube = np.transpose(tensor.numpy(), (1, 2, 0)) # back to H,W,V for augmentation
                def to_tensor(self):
                    return self.tensor
            
            t = torch.tensor(c)
            encodings.append(MockEncoding(t, t_meta))
            
        self.dataset_cache = EcologicalPairDataset(
            encodings=encodings,
            pair_strategy=PhysicalPerturbationPairs()
        )

    def train(self, epochs: int = 10, batch_size: int = 8, lr: float = 1e-3) -> List[float]:
        if not self.pool.cubes:
            raise ValueError("No datasets loaded")
            
        self._build_pair_dataset()
        return train_contrastive_model(
            model=self.model,
            dataset=self.dataset_cache,
            epochs=epochs,
            batch_size=batch_size,
            lr=lr,
            device=self.device
        )

    def embed_all(self) -> EmbeddingDatabase:
        self.model.eval()
        self.model.to(self.device)
        self.model.use_projection = False # want latent space, not contrastive projection
        
        db = EmbeddingDatabase()
        
        with torch.no_grad():
            for i, cube in enumerate(self.pool.cubes):
                meta = self.pool.metadata[i]
                
                # (H,W,V) -> (1, V, H, W)
                c_t = torch.tensor(np.transpose(cube, (2,0,1))).unsqueeze(0).float().to(self.device)
                emb = self.model.encode(c_t).cpu().numpy()[0]
                
                cube_id = f"{meta['dataset']}_{meta['tile_id']}"
                
                lon_b = meta.get("lon_bounds")
                lat_b = meta.get("lat_bounds")
                
                rec = EmbeddingRecord(
                    embedding_id=i,
                    cube_id=cube_id,
                    dataset_id=meta["dataset"],
                    lon_bounds=tuple(lon_b) if lon_b else None,
                    lat_bounds=tuple(lat_b) if lat_b else None,
                    regime=meta["regime"],
                    embedding=emb
                )
                db.add(rec)
                
        return db

    def discover_states(self, db: EmbeddingDatabase):
        if not db.records:
            return None
            
        Z = np.stack([r.embedding for r in db.records])
        discoverer = RegimeDiscoverer(n_components=3, reduction_method="umap")
        Z_proj = discoverer.fit_transform_latent_space(Z)
        hdb_labels, gmm_probs, gmm_labels = discoverer.discover_regimes(Z)
        
        return {
            "umap": Z_proj,
            "hdbscan_labels": hdb_labels,
            "gmm_probs": gmm_probs,
            "gmm_labels": gmm_labels
        }
