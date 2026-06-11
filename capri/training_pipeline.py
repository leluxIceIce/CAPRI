import torch
from typing import List, Optional, Callable, Tuple
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
        self.model = EcologicalFingerprintEncoder(in_channels=192, latent_dim=128)
        self.dataset_cache: Optional[EcologicalPairDataset] = None

    def load_datasets(self, dataset_names: List[str]) -> int:
        return self.pool.load(dataset_names)

    def _build_pair_dataset(self):
        cubes = self.pool.cubes
        from cube_builder import TileMetadata
        from ecological_encoder import EcologicalEncoder
        
        encoder = EcologicalEncoder()
        
        encodings = []
        for i, cube in enumerate(cubes):
            meta = self.pool.metadata[i]
            t_meta = TileMetadata(source_file=meta["dataset"], regime=meta["regime"])
            lon_b = meta.get("lon_bounds")
            lat_b = meta.get("lat_bounds")
            if lon_b:
                t_meta.lon_bounds = tuple(lon_b)
            if lat_b:
                t_meta.lat_bounds = tuple(lat_b)
            
            enc = encoder.encode(cube, t_meta)
            encodings.append(enc)
            
        self.dataset_cache = EcologicalPairDataset(
            encodings=encodings,
            pair_strategy=PhysicalPerturbationPairs(),
            encoder=encoder
        )

    def train(self, epochs: int = 10, batch_size: int = 8, lr: float = 1e-3) -> Tuple[List[float], List[float], List[float]]:
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
        
        from ecological_encoder import EcologicalEncoder
        from cube_builder import TileMetadata
        encoder = EcologicalEncoder()
        
        db = EmbeddingDatabase()
        
        with torch.no_grad():
            for i, cube in enumerate(self.pool.cubes):
                meta = self.pool.metadata[i]
                t_meta = TileMetadata(source_file=meta["dataset"], regime=meta["regime"])
                lon_b = meta.get("lon_bounds")
                lat_b = meta.get("lat_bounds")
                if lon_b:
                    t_meta.lon_bounds = tuple(lon_b)
                if lat_b:
                    t_meta.lat_bounds = tuple(lat_b)
                
                enc = encoder.encode(cube, t_meta)
                c_t = enc.to_tensor().unsqueeze(0).to(self.device)
                emb = self.model.encode(c_t).cpu().numpy()[0]
                
                cube_id = f"{meta['dataset']}_{meta['tile_id']}"
                timestamp_val = meta.get("timestamp", "")
                
                rec = EmbeddingRecord(
                    embedding_id=i,
                    cube_id=cube_id,
                    dataset_id=meta["dataset"],
                    lon_bounds=tuple(lon_b) if lon_b else None,
                    lat_bounds=tuple(lat_b) if lat_b else None,
                    regime=meta["regime"],
                    embedding=emb,
                    timestamp=timestamp_val,
                    cube=cube
                )
                db.add(rec)
                
        return db

    def discover_states(self, db: EmbeddingDatabase):
        if not db.records:
            return None
            
        Z = np.stack([r.embedding for r in db.records])
        
        # Calculate pre-UMAP debug stats
        num_embeddings = Z.shape[0]
        embedding_dim = Z.shape[1]
        nan_count = int(np.isnan(Z).sum())
        variance = float(np.var(Z))
        
        discoverer = RegimeDiscoverer(n_components=3, reduction_method="umap")
        Z_proj = discoverer.fit_transform_latent_space(Z)
        hdb_labels, gmm_probs, gmm_labels = discoverer.discover_regimes(Z)
        
        # Write umap_projection.csv
        with open("umap_projection.csv", "w", newline="") as f:
            writer = csv.writer(f)
            writer.writerow(["embedding_id", "umap_x", "umap_y", "umap_z"])
            for idx, record in enumerate(db.records):
                x = float(Z_proj[idx, 0])
                y = float(Z_proj[idx, 1])
                z = float(Z_proj[idx, 2]) if Z_proj.shape[1] > 2 else 0.0
                writer.writerow([record.embedding_id, x, y, z])
                
        # Write cluster_assignments.csv
        with open("cluster_assignments.csv", "w", newline="") as f:
            writer = csv.writer(f)
            writer.writerow(["embedding_id", "hdbscan_label", "gmm_label"])
            for idx, record in enumerate(db.records):
                writer.writerow([record.embedding_id, int(hdb_labels[idx]), int(gmm_labels[idx])])
        
        return {
            "umap": Z_proj,
            "hdbscan_labels": hdb_labels,
            "gmm_probs": gmm_probs,
            "gmm_labels": gmm_labels,
            "num_embeddings": num_embeddings,
            "embedding_dim": embedding_dim,
            "nan_count": nan_count,
            "variance": variance
        }
