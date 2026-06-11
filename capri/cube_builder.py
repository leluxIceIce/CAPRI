"""
EEF Layer 1 — Ecological Cube System.

Constructs and manages ecological observation cubes C ∈ R^{H×W×V}.
Supports synthetic generation, CSV ingestion with column-name mapping,
and batch tile management with metadata provenance.
"""

import numpy as np
import pandas as pd
from dataclasses import dataclass, field
from pathlib import Path
from typing import List, Tuple, Optional, Dict
from datetime import datetime

# ── Canonical variable definitions ────────────────────────────────────────────

CANONICAL_VARIABLES = ["CHL", "aphy", "ADG", "bbp", "TSM", "PAR", "KD490"]

# Maps common CSV column names found in SNAP / satellite exports to canonical names.
COLUMN_NAME_MAP: Dict[str, str] = {
    # CHL variants
    "CHL":        "CHL",
    "CHL_NN":     "CHL",
    "CHL_OC4ME":  "CHL",
    "chl":        "CHL",
    "chl_nn":     "CHL",
    # aphy variants
    "aphy":       "aphy",
    "aphy_443":   "aphy",
    "APHY_443":   "aphy",
    # ADG variants
    "ADG":        "ADG",
    "ADG443_NN":  "ADG",
    "adg_443":    "ADG",
    "adg443_nn":  "ADG",
    # bbp variants
    "bbp":        "bbp",
    "bbp_443":    "bbp",
    "BBP_443":    "bbp",
    # TSM variants
    "TSM":        "TSM",
    "TSM_NN":     "TSM",
    "tsm_nn":     "TSM",
    # PAR variants
    "PAR":        "PAR",
    "par":        "PAR",
    # KD490 variants
    "KD490":      "KD490",
    "KD490_M07":  "KD490",
    "kd490_m07":  "KD490",
    "kd490":      "KD490",
}

# Regime auto-detection thresholds (based on mean CHL after normalisation)
REGIME_THRESHOLDS = {
    "coastal":     0.4,   # high CHL
    "shallow_sea": 0.15,  # low CHL
    # anything below → deep_sea (near-null CHL)
}


# ── Metadata ──────────────────────────────────────────────────────────────────

@dataclass
class TileMetadata:
    """Provenance record for a single ecological tile."""
    source_file: str = ""
    regime: str = "unknown"            # coastal / shallow_sea / deep_sea / unknown
    timestamp: str = ""                # ISO-8601 acquisition time if available
    grid_shape: Tuple[int, int] = (20, 20)
    variables: List[str] = field(default_factory=lambda: list(CANONICAL_VARIABLES))
    created_at: str = field(default_factory=lambda: datetime.utcnow().isoformat())
    preprocessing: List[str] = field(default_factory=list)


# ── Cube Builder ──────────────────────────────────────────────────────────────

class EcologicalCubeBuilder:
    """
    EEF Layer 1: Ecological Observation Cube Construction.

    Produces cubes C ∈ R^{H×W×V} where:
        H, W = spatial dimensions (default 20×20, matching 400-sample datasets)
        V    = number of ecological variables (default 7)
    """

    def __init__(
        self,
        grid_shape: Tuple[int, int] = (20, 20),
        variables: Optional[List[str]] = None,
    ):
        self.grid_shape = grid_shape
        self.variables = variables or list(CANONICAL_VARIABLES)
        self.num_variables = len(self.variables)

    # ── Synthetic cube generation ─────────────────────────────────────────

    def generate_synthetic_cube(self, seed: Optional[int] = None) -> np.ndarray:
        """
        Generates a synthetic cube using correlated spatial patterns
        (plumes, fronts, patches) that mimic ecological structure.

        Returns:
            np.ndarray of shape (H, W, V), values in [0, 1].
        """
        if seed is not None:
            np.random.seed(seed)

        H, W = self.grid_shape
        V = self.num_variables
        cube = np.zeros((H, W, V), dtype=np.float32)

        x = np.linspace(-2, 2, W)
        y = np.linspace(-2, 2, H)
        X, Y = np.meshgrid(x, y)

        # Base spatial patterns
        plume  = np.exp(-((X - 0.5)**2 + (Y - 0.5)**2) / 1.5)
        front  = 1.0 / (1.0 + np.exp(-(X + Y)))
        patchy = np.sin(X * 3) * np.cos(Y * 3) * 0.3 + 0.5

        patterns = [
            0.6 * plume  + 0.2 * patchy,   # CHL
            0.5 * plume  + 0.3 * front,     # aphy
            0.7 * front  + 0.1 * patchy,    # ADG
            0.4 * plume  + 0.4 * front,     # bbp
            0.8 * front,                     # TSM
            0.8 * (Y / 4.0 + 0.5),          # PAR
            0.5 * plume  + 0.4 * front,      # KD490
        ]

        for v in range(min(V, len(patterns))):
            noise_std = 0.02 if v == 5 else 0.05   # PAR is smoother
            val = patterns[v] + 0.2 * np.random.normal(0, noise_std, (H, W))
            val_min, val_max = val.min(), val.max()
            if val_max > val_min:
                cube[:, :, v] = (val - val_min) / (val_max - val_min)

        return cube

    # ── CSV ingestion ─────────────────────────────────────────────────────

    @staticmethod
    def _resolve_columns(df: pd.DataFrame) -> Dict[str, str]:
        """
        Matches DataFrame column names to canonical variable names.
        Returns a mapping {csv_column → canonical_name}.
        """
        resolved: Dict[str, str] = {}
        used_canonical: set = set()

        for col in df.columns:
            col_stripped = col.strip()
            canonical = COLUMN_NAME_MAP.get(col_stripped)
            if canonical and canonical not in used_canonical:
                resolved[col_stripped] = canonical
                used_canonical.add(canonical)

        return resolved

    @staticmethod
    def _detect_regime(cube: np.ndarray, variables: List[str]) -> str:
        """Auto-detect ecological regime based on mean CHL values."""
        try:
            chl_idx = variables.index("CHL")
        except ValueError:
            return "unknown"

        mean_chl = float(np.mean(cube[:, :, chl_idx]))

        if mean_chl >= REGIME_THRESHOLDS["coastal"]:
            return "coastal"
        elif mean_chl >= REGIME_THRESHOLDS["shallow_sea"]:
            return "shallow_sea"
        else:
            return "deep_sea"

    def build_from_csv(
        self,
        csv_path: str,
        delimiter: Optional[str] = None,
        regime: Optional[str] = None,
    ) -> Tuple[np.ndarray, TileMetadata]:
        """
        Reads a CSV file and reshapes it into a single ecological cube.

        Expects the CSV to contain N = H*W rows and at least 7 ecological
        variable columns (auto-mapped from common naming conventions).

        Args:
            csv_path:  Path to the CSV file.
            delimiter: CSV delimiter (auto-detected if None).
            regime:    Ecological regime label; auto-detected if None.

        Returns:
            (cube, metadata) where cube has shape (H, W, V).
        """
        path = Path(csv_path)
        H, W = self.grid_shape
        V = self.num_variables

        # Auto-detect delimiter
        if delimiter is None:
            with open(path, "r") as f:
                sample = f.read(2048)
            delimiter = ";" if sample.count(";") > sample.count(",") else ","

        df = pd.read_csv(path, sep=delimiter)

        # Resolve column names
        col_map = self._resolve_columns(df)
        if not col_map:
            raise ValueError(
                f"Could not map any CSV columns to canonical variables.\n"
                f"  CSV columns: {list(df.columns)}\n"
                f"  Expected (any of): {list(COLUMN_NAME_MAP.keys())}"
            )

        # Build the cube
        n_samples = len(df)
        expected = H * W
        if n_samples < expected:
            raise ValueError(
                f"CSV has {n_samples} rows but grid {H}×{W} requires {expected}."
            )

        cube = np.zeros((H, W, V), dtype=np.float32)
        preprocessing_notes: List[str] = []

        for csv_col, canonical in col_map.items():
            if canonical not in self.variables:
                continue
            v_idx = self.variables.index(canonical)

            values = pd.to_numeric(df[csv_col], errors="coerce").values[:expected]
            nan_count = int(np.isnan(values).sum())
            if nan_count > 0:
                values = np.nan_to_num(values, nan=float(np.nanmean(values)))
                preprocessing_notes.append(f"{canonical}: filled {nan_count} NaN with mean")

            # Normalise to [0, 1]
            v_min, v_max = float(np.nanmin(values)), float(np.nanmax(values))
            if v_max > v_min:
                values = (values - v_min) / (v_max - v_min)
            else:
                values = np.zeros_like(values)

            cube[:, :, v_idx] = values.reshape(H, W)

        # Auto-detect regime
        if regime is None:
            regime = self._detect_regime(cube, self.variables)

        metadata = TileMetadata(
            source_file=str(path.name),
            regime=regime,
            grid_shape=self.grid_shape,
            variables=list(self.variables),
            preprocessing=preprocessing_notes,
        )

        return cube, metadata

    def build_from_dataframe(
        self,
        df: pd.DataFrame,
        x_col: Optional[str] = None,
        y_col: Optional[str] = None,
    ) -> List[np.ndarray]:
        """
        Converts a DataFrame into grid cubes.  If coordinates are provided,
        uses spatial interpolation; otherwise reshapes row-major.
        """
        H, W = self.grid_shape
        V = self.num_variables
        cubes = []

        available_vars = [v for v in self.variables if v in df.columns]
        if not available_vars:
            available_vars = list(df.select_dtypes(include=[np.number]).columns[:V])

        if x_col and y_col and x_col in df.columns and y_col in df.columns:
            from scipy.interpolate import griddata

            points = df[[x_col, y_col]].values
            grid_y, grid_x = np.mgrid[
                df[y_col].min():df[y_col].max():complex(H),
                df[x_col].min():df[x_col].max():complex(W),
            ]
            cube = np.zeros((H, W, V), dtype=np.float32)
            for v_idx, var in enumerate(self.variables):
                if var in df.columns:
                    values = df[var].values
                    grid_z = griddata(points, values, (grid_x, grid_y), method="linear")
                    nan_mask = np.isnan(grid_z)
                    if np.any(nan_mask):
                        grid_z[nan_mask] = griddata(
                            points, values, (grid_x, grid_y), method="nearest"
                        )[nan_mask]
                    z_min, z_max = np.nanmin(grid_z), np.nanmax(grid_z)
                    if z_max > z_min:
                        grid_z = (grid_z - z_min) / (z_max - z_min)
                    cube[:, :, v_idx] = grid_z
                else:
                    cube[:, :, v_idx] = 0.5
            cubes.append(cube)
        else:
            patch_size = H * W
            num_patches = len(df) // patch_size
            for p in range(num_patches):
                df_patch = df.iloc[p * patch_size : (p + 1) * patch_size]
                cube = np.zeros((H, W, V), dtype=np.float32)
                for v_idx, var in enumerate(self.variables):
                    if var in df_patch.columns:
                        vals = df_patch[var].values.reshape(H, W)
                        v_min, v_max = vals.min(), vals.max()
                        if v_max > v_min:
                            vals = (vals - v_min) / (v_max - v_min)
                        cube[:, :, v_idx] = vals
                    else:
                        cube[:, :, v_idx] = 0.5
                cubes.append(cube)

        if not cubes:
            cubes.append(self.generate_synthetic_cube())

        return cubes


# ── Tile Manager ──────────────────────────────────────────────────────────────

class EcologicalTileManager:
    """
    Manages collections of ecological tiles with metadata.
    Supports saving/loading in .npz format and batch operations.
    """

    def __init__(self, storage_dir: str = "./tiles"):
        self.storage_dir = Path(storage_dir)
        self.storage_dir.mkdir(parents=True, exist_ok=True)
        self.tiles: List[Tuple[np.ndarray, TileMetadata]] = []

    def add(self, cube: np.ndarray, metadata: TileMetadata) -> int:
        """Add a tile and return its index."""
        self.tiles.append((cube, metadata))
        return len(self.tiles) - 1

    def get(self, idx: int) -> Tuple[np.ndarray, TileMetadata]:
        return self.tiles[idx]

    def get_cubes(self) -> List[np.ndarray]:
        """Return just the cube arrays (for downstream pipeline consumption)."""
        return [t[0] for t in self.tiles]

    def get_by_regime(self, regime: str) -> List[Tuple[np.ndarray, TileMetadata]]:
        return [(c, m) for c, m in self.tiles if m.regime == regime]

    def save(self, name: str = "dataset") -> Path:
        """Save all tiles and metadata to a single .npz archive."""
        cubes = np.array([t[0] for t in self.tiles])
        meta_dicts = [
            {
                "source_file": m.source_file,
                "regime": m.regime,
                "timestamp": m.timestamp,
                "grid_shape": list(m.grid_shape),
                "variables": m.variables,
                "created_at": m.created_at,
                "preprocessing": m.preprocessing,
            }
            for _, m in self.tiles
        ]
        out_path = self.storage_dir / f"{name}.npz"
        np.savez_compressed(
            out_path,
            cubes=cubes,
            metadata=np.array(str(meta_dicts)),  # serialise as string
        )
        return out_path

    def summary(self) -> str:
        """Human-readable summary of the tile collection."""
        regimes = {}
        for _, m in self.tiles:
            regimes[m.regime] = regimes.get(m.regime, 0) + 1

        lines = [
            f"EcologicalTileManager: {len(self.tiles)} tiles",
            f"  Storage: {self.storage_dir}",
            f"  Regimes: {regimes}",
        ]
        return "\n".join(lines)
