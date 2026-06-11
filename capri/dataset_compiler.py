"""
Dataset Compiler.

Orchestrates the tiling process and saves the output as a structured dataset folder.

Output structure:
dataset_folder/
├── cubes/
│   ├── cube_0001.npy
│   ├── cube_0002.npy
│   └── ...
├── manifest.json
└── source.csv
"""

import os
import json
import shutil
import numpy as np
from pathlib import Path
from typing import Optional, Dict, Any

from tiler import csv_to_tiles, TILE_SIZE, CANONICAL_VARIABLES

class DatasetCompiler:
    """
    Compiles an incoming CSV into a structured directory of ecological cubes.
    """

    def __init__(self, base_dir: str = "./datasets"):
        self.base_dir = Path(base_dir)
        self.base_dir.mkdir(parents=True, exist_ok=True)

    def compile(
        self,
        csv_path: str,
        dataset_name: str,
        resolution: Optional[float] = None,
        completeness_threshold: float = 0.70,
    ) -> Dict[str, Any]:
        """
        Run the full CSV-to-tiles pipeline and write to disk.

        Returns:
            The dataset manifest as a dictionary.
        """
        source_path = Path(csv_path)
        if not source_path.exists():
            raise FileNotFoundError(f"CSV not found: {source_path}")

        out_dir = self.base_dir / dataset_name
        if out_dir.exists():
            shutil.rmtree(out_dir)

        cubes_dir = out_dir / "cubes"
        cubes_dir.mkdir(parents=True, exist_ok=True)

        # 1. Run the tiler
        tiles, sf = csv_to_tiles(
            str(source_path),
            resolution=resolution,
            completeness_threshold=completeness_threshold,
        )

        # 2. Save cubes
        tile_records = []
        for tile in tiles:
            # Save cube as .npy
            filename = f"cube_{tile.meta.tile_id:04d}.npy"
            np.save(cubes_dir / filename, tile.cube)

            # Record metadata
            tile_records.append({
                "id": tile.meta.tile_id,
                "file": filename,
                "regime": tile.meta.regime,
                "completeness": tile.meta.completeness,
                "lon_bounds": tile.meta.lon_bounds,
                "lat_bounds": tile.meta.lat_bounds,
                "field_position": [tile.meta.field_row, tile.meta.field_col],
            })

        # 3. Copy source CSV
        shutil.copy2(source_path, out_dir / "source.csv")

        # 4. Generate manifest
        manifest = {
            "dataset_name": dataset_name,
            "source_file": source_path.name,
            "n_cubes": len(tiles),
            "tile_shape": [20, 20, 8],
            "variables_present": sf.variables_present,
            "variables_imputed": sf.variables_imputed,
            "resolution": resolution if resolution is not None else "auto",
            "completeness_threshold": completeness_threshold,
            "tiles": tile_records,
        }

        with open(out_dir / "manifest.json", "w") as f:
            json.dump(manifest, f, indent=2)

        return manifest

    def list_datasets(self) -> list[Dict[str, Any]]:
        """List all compiled datasets in the base directory."""
        datasets = []
        if not self.base_dir.exists():
            return datasets
            
        for child in self.base_dir.iterdir():
            if child.is_dir():
                manifest_path = child / "manifest.json"
                if manifest_path.exists():
                    try:
                        with open(manifest_path, "r") as f:
                            manifest = json.load(f)
                            datasets.append(manifest)
                    except Exception as e:
                        print(f"Error reading manifest {manifest_path}: {e}")
                        
        return datasets
