"""
Multi-Dataset Pool.

Merges multiple compiled dataset folders into a unified training corpus.
Applies global standardisation / normalisation (optional) and serves batches.
"""

import json
from pathlib import Path
from typing import List, Tuple, Dict, Any
import numpy as np

class MultiDatasetPool:
    """
    Loads cubes from multiple compiled dataset folders and provides an interface
    for unified sampling.
    """

    def __init__(self, base_dir: str = "./datasets"):
        self.base_dir = Path(base_dir)
        self.cubes: List[np.ndarray] = []
        self.metadata: List[Dict[str, Any]] = []

    def load(self, dataset_names: List[str]) -> int:
        """
        Load all cubes from the specified datasets.

        Returns:
            Total number of cubes loaded.
        """
        self.cubes = []
        self.metadata = []

        for name in dataset_names:
            dataset_dir = self.base_dir / name
            manifest_path = dataset_dir / "manifest.json"

            if not manifest_path.exists():
                print(f"Warning: Dataset '{name}' not found or missing manifest.")
                continue

            with open(manifest_path, "r") as f:
                manifest = json.load(f)

            cubes_dir = dataset_dir / "cubes"
            for tile_rec in manifest.get("tiles", []):
                cube_file = cubes_dir / tile_rec["file"]
                if cube_file.exists():
                    cube = np.load(cube_file)
                    self.cubes.append(cube)
                    self.metadata.append({
                        "dataset": name,
                        "tile_id": tile_rec["id"],
                        "regime": tile_rec.get("regime", "unknown"),
                        "lon_bounds": tile_rec.get("lon_bounds"),
                        "lat_bounds": tile_rec.get("lat_bounds"),
                        "field_position": tile_rec.get("field_position")
                    })

        return len(self.cubes)

    def get_all_cubes(self) -> np.ndarray:
        """Return all loaded cubes as a single stacked array (N, 20, 20, 8)."""
        if not self.cubes:
            return np.empty((0, 20, 20, 8), dtype=np.float32)
        return np.stack(self.cubes, axis=0)

    def get_training_batch(self, batch_size: int) -> np.ndarray:
        """Return a random batch of cubes."""
        if not self.cubes:
            raise ValueError("No cubes loaded. Call load() first.")

        n_cubes = len(self.cubes)
        indices = np.random.choice(n_cubes, min(batch_size, n_cubes), replace=False)
        batch = [self.cubes[i] for i in indices]
        return np.stack(batch, axis=0)

    def get_training_batch_with_metadata(self, batch_size: int) -> Tuple[np.ndarray, List[Dict[str, Any]]]:
        """Return a random batch of cubes along with their metadata for traceability."""
        if not self.cubes:
            raise ValueError("No cubes loaded. Call load() first.")

        n_cubes = len(self.cubes)
        indices = np.random.choice(n_cubes, min(batch_size, n_cubes), replace=False)
        batch_cubes = [self.cubes[i] for i in indices]
        batch_meta = [self.metadata[i] for i in indices]
        return np.stack(batch_cubes, axis=0), batch_meta
