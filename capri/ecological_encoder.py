"""
EEF Layer 4 — Ecological Encoding Layer.

Combines Stage I features (observation cube, spatial descriptors, and
relationship descriptors) into a structured, inspectable, deterministic
EcologicalEncoding object.
"""

import numpy as np
import torch
from dataclasses import dataclass, field
from typing import List, Dict, Tuple, Optional
from cube_builder import TileMetadata
from spatial_structure import SpatialDescriptorSet, SpatialStructureExtractor
from relationship_tensor import RelationshipDescriptorMatrix, RelationshipStructureExtractor

@dataclass
class EcologicalEncoding:
    """
    EEF Layer 4: Ecological Encoding.
    
    A deterministic, inspectable, and structured ecological fingerprint representation
    for a satellite-derived observation cube before any machine learning is applied.
    """
    cube: np.ndarray                            # Shape (H, W, V)
    spatial_descriptors: SpatialDescriptorSet  # Shape (H, W, V_spatial)
    relationship_descriptors: RelationshipDescriptorMatrix  # Shape (H, W, V_pairs)
    metadata: TileMetadata
    channel_manifest: List[str]                 # Names of all channels in concatenated order

    def to_tensor(self) -> torch.Tensor:
        """
        Concatenates all features and converts to PyTorch channel-first tensor.
        Shape: (C_total, H, W).
        """
        concat = np.concatenate([
            self.cube,
            self.relationship_descriptors.data,
            self.spatial_descriptors.data
        ], axis=-1)
        # Convert to (C_total, H, W)
        return torch.from_numpy(concat).permute(2, 0, 1).float()

    def to_vector(self) -> np.ndarray:
        """Flattens the entire encoding into a single explicit fingerprint vector."""
        concat = np.concatenate([
            self.cube,
            self.relationship_descriptors.data,
            self.spatial_descriptors.data
        ], axis=-1)
        return concat.flatten()

    def inspect(self) -> str:
        """Generates a human-readable scientific diagnostic report of the encoding."""
        lines = []
        lines.append("=" * 60)
        lines.append("🌿 ECOLOGICAL ENCODING INSPECTION REPORT")
        lines.append("=" * 60)
        lines.append(f"Source File   : {self.metadata.source_file}")
        lines.append(f"Regime Label  : {self.metadata.regime}")
        lines.append(f"Timestamp     : {self.metadata.timestamp}")
        lines.append(f"Grid Shape    : {self.metadata.grid_shape[0]}x{self.metadata.grid_shape[1]}")
        lines.append("-" * 60)
        lines.append(f"TENSOR SUMMARY:")
        lines.append(f"  Observation Cube (C)   : shape {self.cube.shape}")
        lines.append(f"  Spatial Descriptors (P): shape {self.spatial_descriptors.data.shape}")
        lines.append(f"  Relationship Descr (R) : shape {self.relationship_descriptors.data.shape}")
        lines.append(f"  Total Input Channels   : {len(self.channel_manifest)}")
        lines.append("-" * 60)
        lines.append("CHANNEL MANIFEST:")
        for idx, channel_name in enumerate(self.channel_manifest):
            # Print first 10 and last 5, or summarize
            if len(self.channel_manifest) <= 25 or idx < 12 or idx >= len(self.channel_manifest) - 6:
                lines.append(f"  [{idx:03d}] {channel_name}")
            elif idx == 12:
                lines.append("  [ ... middle channels omitted for brevity ... ]")
        lines.append("-" * 60)
        lines.append("ECOLOGICAL STATS SUMMARY (pixel means):")
        
        # Original variables statistics
        var_names = self.metadata.variables
        for v_idx, var in enumerate(var_names):
            if v_idx < self.cube.shape[-1]:
                c_data = self.cube[:, :, v_idx]
                lines.append(f"  {var:<10}: mean={c_data.mean():.4f} min={c_data.min():.4f} max={c_data.max():.4f}")
        lines.append("=" * 60)
        return "\n".join(lines)


class EcologicalEncoder:
    """
    EEF Layer 4: Ecological Ingestion and Encoding Layer.
    
    Coordinates the ingestion of observation cubes (Layer 1) and extraction of
    spatial structures (Layer 2) and relationships (Layer 3) to assemble
    a deterministic EcologicalEncoding.
    """
    def __init__(
        self,
        spatial_extractor: Optional[SpatialStructureExtractor] = None,
        relationship_extractor: Optional[RelationshipStructureExtractor] = None
    ):
        self.spatial_extractor = spatial_extractor or SpatialStructureExtractor(window_size=3)
        self.relationship_extractor = relationship_extractor or RelationshipStructureExtractor(mode="all")

    def encode(self, cube: np.ndarray, metadata: TileMetadata) -> EcologicalEncoding:
        """
        Ingests a raw observation cube and constructs the full ecological encoding.
        """
        # Ensure correct variable names are configured
        var_names = metadata.variables or ["CHL", "aphy", "ADG", "bbp", "TSM", "PAR", "KD490"]
        self.spatial_extractor.variables = var_names
        self.relationship_extractor.variables = var_names
        
        # Compute spatial and relationship features
        spatial_desc = self.spatial_extractor.compute_tensor(cube)
        relationship_desc = self.relationship_extractor.compute_tensor(cube)
        
        # Overwrite internal variable names to match metadata
        spatial_desc.variables = var_names
        relationship_desc.variables = var_names
        
        # Regenerate spatial feature names to use clean variable names
        spatial_desc.feature_names = []
        for v in range(len(var_names)):
            var_name = var_names[v]
            spatial_desc.feature_names.extend([
                f"{var_name}_gradient_dx",
                f"{var_name}_gradient_dy",
                f"{var_name}_laplacian",
                f"{var_name}_variance",
                f"{var_name}_entropy",
                f"{var_name}_moran",
                f"{var_name}_semivariance",
                f"{var_name}_patchiness",
                f"{var_name}_texture_contrast"
            ])
            
        # Build the channel manifest
        channel_manifest = list(var_names) + list(relationship_desc.feature_names) + list(spatial_desc.feature_names)
        
        return EcologicalEncoding(
            cube=cube,
            spatial_descriptors=spatial_desc,
            relationship_descriptors=relationship_desc,
            metadata=metadata,
            channel_manifest=channel_manifest
        )
