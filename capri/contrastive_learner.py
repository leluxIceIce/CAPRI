"""
EEF Layer 5 — Representation Learning.

Implements contrastive pair datasets, NT-Xent loss, and pair generation
strategies (spatial adjacency, temporal neighbors, seasonal analogs, and
physical perturbations) for representation learning.
"""

import torch
import torch.nn as nn
import torch.nn.functional as F
from torch.utils.data import Dataset, DataLoader
import numpy as np
from typing import List, Tuple, Optional
from ecological_encoder import EcologicalEncoding, EcologicalEncoder
from cube_builder import TileMetadata

class ContrastiveLoss(nn.Module):
    """
    NT-Xent (Normalized Temperature-scaled Cross Entropy) Loss.
    Used for contrastive learning of ecological states.
    """
    def __init__(self, temperature: float = 0.5):
        super(ContrastiveLoss, self).__init__()
        self.temperature = temperature

    def forward(self, z_i: torch.Tensor, z_j: torch.Tensor) -> torch.Tensor:
        """
        Args:
            z_i: Latent projection of first views of shape (N, D).
            z_j: Latent projection of second views of shape (N, D).
            
        Returns:
            Scalar contrastive loss.
        """
        z_i = F.normalize(z_i, dim=1)
        z_j = F.normalize(z_j, dim=1)
        
        batch_size = z_i.shape[0]
        representations = torch.cat([z_i, z_j], dim=0) # Shape: (2N, D)
        
        similarity_matrix = torch.matmul(representations, representations.T) / self.temperature
        
        mask = torch.eye(2 * batch_size, device=z_i.device).bool()
        similarity_matrix.masked_fill_(mask, -9e15)
        
        labels = torch.arange(batch_size, device=z_i.device)
        labels = torch.cat([labels + batch_size, labels], dim=0)
        
        loss = F.cross_entropy(similarity_matrix, labels)
        return loss

# ── Pair Generation Strategies ────────────────────────────────────────────────

class PairGenerationStrategy:
    """Base class for contrastive positive view pair generation strategies."""
    def generate_pair(self, dataset, idx: int) -> Tuple[torch.Tensor, torch.Tensor]:
        raise NotImplementedError

class PhysicalPerturbationPairs(PairGenerationStrategy):
    """
    Generates positive pairs by applying physical/sensor perturbations to a single tile.
    This is the default augmentation-based strategy.
    """
    def __init__(self, spatial_shift_prob: float = 0.5, noise_level: float = 0.02):
        self.spatial_shift_prob = spatial_shift_prob
        self.noise_level = noise_level

    def _apply_perturbations(self, cube: np.ndarray, apply_shift: bool) -> np.ndarray:
        perturbed = cube.copy()
        H, W, V = cube.shape

        # 1. Spatial shift or rotation
        if apply_shift:
            rot_k = np.random.choice([0, 1, 2, 3])
            perturbed = np.rot90(perturbed, k=rot_k, axes=(0, 1))
            if np.random.rand() > 0.5:
                perturbed = np.flip(perturbed, axis=0)

        # 2. Physical perturbation: small Gaussian noise
        noise = np.random.normal(0, self.noise_level, perturbed.shape).astype(np.float32)
        perturbed = np.clip(perturbed + noise, 0.0, 1.0)

        # 3. Channel scaling (sensor drift simulation)
        scale = np.random.uniform(0.95, 1.05, (1, 1, V)).astype(np.float32)
        perturbed = np.clip(perturbed * scale, 0.0, 1.0)

        return perturbed

    def generate_pair(self, dataset, idx: int) -> Tuple[torch.Tensor, torch.Tensor]:
        encoding = dataset.encodings[idx]
        
        # View 1: Mild perturbation
        v1_cube = self._apply_perturbations(encoding.cube, apply_shift=False)
        e1 = dataset.encoder.encode(v1_cube, encoding.metadata)
        
        # View 2: Shift + perturbation
        apply_shift = np.random.rand() < self.spatial_shift_prob
        v2_cube = self._apply_perturbations(encoding.cube, apply_shift=apply_shift)
        e2 = dataset.encoder.encode(v2_cube, encoding.metadata)
        
        return e1.to_tensor(), e2.to_tensor()

class SpatialAdjacencyPairs(PairGenerationStrategy):
    """
    Generates positive pairs from spatially adjacent tiles using coordinate metadata.
    Falls back to PhysicalPerturbationPairs if coordinates are not available or no neighbors exist.
    """
    def __init__(self, fallback_strategy: Optional[PairGenerationStrategy] = None):
        self.fallback = fallback_strategy or PhysicalPerturbationPairs()

    def generate_pair(self, dataset, idx: int) -> Tuple[torch.Tensor, torch.Tensor]:
        encoding = dataset.encodings[idx]
        coords = getattr(encoding.metadata, "coordinates", None)
        
        if coords is None:
            return self.fallback.generate_pair(dataset, idx)
            
        cx, cy = coords
        neighbors = []
        for other_idx, other in enumerate(dataset.encodings):
            other_coords = getattr(other.metadata, "coordinates", None)
            if other_coords is not None and other_idx != idx:
                ox, oy = other_coords
                # 4-neighborhood spatial adjacency
                if abs(cx - ox) + abs(cy - oy) <= 1:
                    neighbors.append(other)
                    
        if len(neighbors) == 0:
            return self.fallback.generate_pair(dataset, idx)
            
        # Select random neighbor
        neighbor = np.random.choice(neighbors)
        return encoding.to_tensor(), neighbor.to_tensor()

class TemporalNeighborPairs(PairGenerationStrategy):
    """
    Generates positive pairs from temporally adjacent tiles (nearby timestamps).
    Falls back to PhysicalPerturbationPairs if timestamp is not available.
    """
    def __init__(self, max_delta_days: float = 7.0, fallback_strategy: Optional[PairGenerationStrategy] = None):
        self.max_delta_days = max_delta_days
        self.fallback = fallback_strategy or PhysicalPerturbationPairs()

    def generate_pair(self, dataset, idx: int) -> Tuple[torch.Tensor, torch.Tensor]:
        encoding = dataset.encodings[idx]
        ts_str = getattr(encoding.metadata, "timestamp", "")
        
        if not ts_str:
            return self.fallback.generate_pair(dataset, idx)
            
        try:
            from datetime import datetime
            t_curr = datetime.fromisoformat(ts_str)
        except Exception:
            return self.fallback.generate_pair(dataset, idx)
            
        neighbors = []
        for other_idx, other in enumerate(dataset.encodings):
            other_ts_str = getattr(other.metadata, "timestamp", "")
            if other_ts_str and other_idx != idx:
                try:
                    t_other = datetime.fromisoformat(other_ts_str)
                    delta = abs((t_curr - t_other).total_seconds()) / 86400.0
                    if delta <= self.max_delta_days:
                        neighbors.append(other)
                except Exception:
                    continue
                    
        if len(neighbors) == 0:
            return self.fallback.generate_pair(dataset, idx)
            
        neighbor = np.random.choice(neighbors)
        return encoding.to_tensor(), neighbor.to_tensor()

class SeasonalAnalogPairs(PairGenerationStrategy):
    """
    Generates positive pairs from seasonal analog tiles (similar month/season in different years).
    """
    def __init__(self, fallback_strategy: Optional[PairGenerationStrategy] = None):
        self.fallback = fallback_strategy or PhysicalPerturbationPairs()

    def generate_pair(self, dataset, idx: int) -> Tuple[torch.Tensor, torch.Tensor]:
        encoding = dataset.encodings[idx]
        ts_str = getattr(encoding.metadata, "timestamp", "")
        
        if not ts_str:
            return self.fallback.generate_pair(dataset, idx)
            
        try:
            from datetime import datetime
            t_curr = datetime.fromisoformat(ts_str)
            month = t_curr.month
        except Exception:
            return self.fallback.generate_pair(dataset, idx)
            
        neighbors = []
        for other_idx, other in enumerate(dataset.encodings):
            other_ts_str = getattr(other.metadata, "timestamp", "")
            if other_ts_str and other_idx != idx:
                try:
                    t_other = datetime.fromisoformat(other_ts_str)
                    # Check if months match and years are different
                    if t_other.month == month and t_other.year != t_curr.year:
                        neighbors.append(other)
                except Exception:
                    continue
                    
        if len(neighbors) == 0:
            return self.fallback.generate_pair(dataset, idx)
            
        neighbor = np.random.choice(neighbors)
        return encoding.to_tensor(), neighbor.to_tensor()

# ── Dataset ───────────────────────────────────────────────────────────────────

class EcologicalPairDataset(Dataset):
    """
    Dataset class that consumes EcologicalEncoding objects and utilizes a
    specified PairGenerationStrategy to construct positive views for contrastive training.
    """
    def __init__(
        self,
        encodings: List[EcologicalEncoding],
        pair_strategy: Optional[PairGenerationStrategy] = None,
        encoder: Optional[EcologicalEncoder] = None
    ):
        """
        Args:
            encodings: List of pre-computed EcologicalEncoding objects.
            pair_strategy: Concrete PairGenerationStrategy instance.
            encoder: Instance of EcologicalEncoder (needed for perturbation strategies).
        """
        self.encodings = encodings
        self.pair_strategy = pair_strategy or PhysicalPerturbationPairs()
        self.encoder = encoder or EcologicalEncoder()

    @classmethod
    def from_cubes(
        cls,
        cubes: List[np.ndarray],
        spatial_extractor,
        relationship_extractor,
        pair_strategy: Optional[PairGenerationStrategy] = None
    ) -> 'EcologicalPairDataset':
        """
        Factory method to construct dataset from raw cubes by computing encodings first.
        """
        encoder = EcologicalEncoder(
            spatial_extractor=spatial_extractor,
            relationship_extractor=relationship_extractor
        )
        encodings = []
        for idx, cube in enumerate(cubes):
            meta = TileMetadata(source_file=f"cube_{idx}.csv")
            # If we want to support spatial adjacency in tests, we can assign synthetic coords
            meta.coordinates = (idx // 10, idx % 10)
            encodings.append(encoder.encode(cube, meta))
            
        return cls(encodings=encodings, pair_strategy=pair_strategy, encoder=encoder)

    def __len__(self) -> int:
        return len(self.encodings)

    def __getitem__(self, idx: int) -> Tuple[torch.Tensor, torch.Tensor]:
        return self.pair_strategy.generate_pair(self, idx)

# ── Training Loop ─────────────────────────────────────────────────────────────

def train_contrastive_model(
    model: nn.Module,
    dataset: EcologicalPairDataset,
    epochs: int = 10,
    batch_size: int = 8,
    lr: float = 1e-3,
    device: str = "cpu"
) -> List[float]:
    """Helper to train the ecological encoder contrastively with projection head enabled."""
    model.to(device)
    
    # Store old projection state and activate projection head for contrastive training
    was_projection = getattr(model, "use_projection", False)
    if hasattr(model, "use_projection"):
        model.use_projection = True
        
    optimizer = torch.optim.Adam(model.parameters(), lr=lr, weight_decay=1e-4)
    criterion = ContrastiveLoss(temperature=0.5)
    dataloader = DataLoader(dataset, batch_size=batch_size, shuffle=True, drop_last=True)
    
    losses = []
    model.train()
    
    for epoch in range(epochs):
        epoch_loss = 0.0
        for step, (x_i, x_j) in enumerate(dataloader):
            x_i, x_j = x_i.to(device), x_j.to(device)
            
            optimizer.zero_grad()
            z_i = model(x_i)
            z_j = model(x_j)
            
            loss = criterion(z_i, z_j)
            loss.backward()
            optimizer.step()
            
            epoch_loss += loss.item()
            
        avg_loss = epoch_loss / len(dataloader)
        losses.append(avg_loss)
        
    # Restore model's original projection head state
    if hasattr(model, "use_projection"):
        model.use_projection = was_projection
        
    return losses
