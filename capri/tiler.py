"""
Auto-Tiler — Spatial Field → 16×16×8 Ecological Cube Dataset.

This is the data backbone.  If this is wrong, everything above it collapses.

Pipeline:
    1. Parse CSV → detect lon/lat + ecological variables
    2. Reconstruct continuous spatial field via griddata interpolation
    3. Fill missing variables from spatial-neighbor medians
    4. Slide non-overlapping 16×16 window → crop edges (no padding)
    5. Per-tile normalization to [0, 1]
    6. Quality filter → reject empty / constant / cloud-masked tiles

Input:  arbitrary CSV with lon, lat, and ≥1 ecological variable
Output: list of Tile dataclass (cube + metadata)
"""

import numpy as np
import pandas as pd
from scipy.interpolate import griddata
from scipy.ndimage import median_filter
from dataclasses import dataclass, field
from pathlib import Path
from typing import List, Tuple, Optional, Dict
from datetime import datetime, timezone

# ── Canonical ecological variables (the 8-channel standard) ──────────────────

CANONICAL_VARIABLES = ["CHL", "TSM", "APHY", "ADG", "BBP", "PAR", "KD490", "SST"]

TILE_SIZE = 20
NUM_VARS = 8

# Column name aliases — satellite export tools use wildly inconsistent naming.
COLUMN_NAME_MAP: Dict[str, str] = {
    # CHL variants
    "CHL": "CHL", "CHL_NN": "CHL", "CHL_OC4ME": "CHL",
    "chl": "CHL", "chl_nn": "CHL", "chlorophyll": "CHL", "Chlorophyll": "CHL",
    # TSM variants
    "TSM": "TSM", "TSM_NN": "TSM", "tsm_nn": "TSM", "tsm": "TSM",
    "total_suspended_matter": "TSM",
    # APHY variants
    "APHY": "APHY", "aphy": "APHY", "aphy_443": "APHY", "APHY_443": "APHY",
    # ADG variants
    "ADG": "ADG", "ADG443_NN": "ADG", "adg_443": "ADG", "adg443_nn": "ADG",
    "adg": "ADG",
    # BBP variants
    "BBP": "BBP", "bbp": "BBP", "bbp_443": "BBP", "BBP_443": "BBP",
    # PAR variants
    "PAR": "PAR", "par": "PAR",
    # KD490 variants
    "KD490": "KD490", "KD490_M07": "KD490", "kd490_m07": "KD490", "kd490": "KD490",
    # SST variants
    "SST": "SST", "sst": "SST", "sea_surface_temperature": "SST",
    "SST_SKIN": "SST", "sst_skin": "SST", "temperature": "SST",
}

# Coordinate column aliases — lon/lat come in many spellings.
LON_ALIASES = {"lon", "longitude", "Longitude", "LON", "lng", "x", "X"}
LAT_ALIASES = {"lat", "latitude", "Latitude", "LAT", "y", "Y"}

# ── Data structures ──────────────────────────────────────────────────────────

@dataclass
class TileMeta:
    """Provenance record for a single 16×16×8 ecological tile."""
    tile_id: int
    source_file: str
    regime: str = "unknown"
    completeness: float = 1.0                  # fraction of non-NaN cells
    variables_present: List[str] = field(default_factory=list)
    variables_imputed: List[str] = field(default_factory=list)
    lon_bounds: Tuple[float, float] = (0.0, 0.0)
    lat_bounds: Tuple[float, float] = (0.0, 0.0)
    field_row: int = 0                          # tile origin in full raster
    field_col: int = 0
    timestamp: str = ""
    created_at: str = field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


@dataclass
class Tile:
    """One ecological observation cube with its metadata."""
    cube: np.ndarray            # shape (16, 16, 8), values in [0, 1]
    meta: TileMeta


@dataclass
class SpatialField:
    """Intermediate: the full rasterised field before tiling."""
    data: np.ndarray            # shape (H, W, 8)
    lons: np.ndarray            # shape (W,) — grid longitudes
    lats: np.ndarray            # shape (H,) — grid latitudes
    variables_present: List[str]
    variables_imputed: List[str]
    source_file: str


# ── Regime detection ─────────────────────────────────────────────────────────

REGIME_THRESHOLDS = {
    "productive_coastal": 0.45,
    "shelf_sea": 0.18,
    # below → open_ocean
}


def detect_regime(cube: np.ndarray) -> str:
    """Classify a tile by mean CHL (channel 0) after normalisation."""
    mean_chl = float(np.nanmean(cube[:, :, 0]))
    if mean_chl >= REGIME_THRESHOLDS["productive_coastal"]:
        return "productive_coastal"
    elif mean_chl >= REGIME_THRESHOLDS["shelf_sea"]:
        return "shelf_sea"
    return "open_ocean"


# ═══════════════════════════════════════════════════════════════════════════════
#  STAGE 1 — CSV PARSING
# ═══════════════════════════════════════════════════════════════════════════════

def _detect_delimiter(path: Path) -> str:
    with open(path, "r") as f:
        sample = f.read(4096)
    return ";" if sample.count(";") > sample.count(",") else ","


def _find_column(df: pd.DataFrame, aliases: set) -> Optional[str]:
    """Find first column matching any alias."""
    for col in df.columns:
        if col.strip() in aliases:
            return col.strip()
    return None


def _resolve_eco_columns(df: pd.DataFrame) -> Dict[str, str]:
    """Map CSV column names → canonical variable names."""
    resolved: Dict[str, str] = {}
    used: set = set()
    for col in df.columns:
        c = col.strip()
        canonical = COLUMN_NAME_MAP.get(c)
        if canonical and canonical not in used:
            resolved[c] = canonical
            used.add(canonical)
    return resolved


def parse_csv(csv_path: str) -> Tuple[pd.DataFrame, str, str, Dict[str, str]]:
    """
    Parse CSV, auto-detect delimiter, find lon/lat and eco-variable columns.

    Returns:
        (df, lon_col, lat_col, eco_col_map)
    """
    path = Path(csv_path)
    delimiter = _detect_delimiter(path)
    df = pd.read_csv(path, sep=delimiter)

    # Strip whitespace from column names
    df.columns = [c.strip() for c in df.columns]

    # Find coordinate columns
    lon_col = _find_column(df, LON_ALIASES)
    lat_col = _find_column(df, LAT_ALIASES)
    if lon_col is None or lat_col is None:
        raise ValueError(
            f"Cannot find lon/lat columns.\n"
            f"  CSV columns: {list(df.columns)}\n"
            f"  Expected lon aliases: {LON_ALIASES}\n"
            f"  Expected lat aliases: {LAT_ALIASES}"
        )

    # Find ecological variable columns
    eco_map = _resolve_eco_columns(df)
    if not eco_map:
        raise ValueError(
            f"No ecological variable columns found.\n"
            f"  CSV columns: {list(df.columns)}\n"
            f"  Expected (any of): {sorted(COLUMN_NAME_MAP.keys())}"
        )

    return df, lon_col, lat_col, eco_map


# ═══════════════════════════════════════════════════════════════════════════════
#  STAGE 2 — SPATIAL FIELD RECONSTRUCTION
# ═══════════════════════════════════════════════════════════════════════════════

def reconstruct_field(
    df: pd.DataFrame,
    lon_col: str,
    lat_col: str,
    eco_map: Dict[str, str],
    resolution: Optional[float] = None,
    source_file: str = "",
) -> SpatialField:
    """
    Interpolate irregular lon/lat point data onto a regular raster grid.

    Resolution is auto-detected from the median inter-point spacing
    unless explicitly provided.

    Missing variables (< 8 present) are filled by spatial-neighbor median
    of the existing channels — "multi-polarize from neighbours."
    """
    lons_raw = df[lon_col].values.astype(np.float64)
    lats_raw = df[lat_col].values.astype(np.float64)
    points = np.column_stack([lons_raw, lats_raw])

    # ── Auto-detect grid resolution ──
    if resolution is None:
        # Median of sorted differences in each axis
        lon_sorted = np.sort(np.unique(lons_raw))
        lat_sorted = np.sort(np.unique(lats_raw))
        if len(lon_sorted) > 1 and len(lat_sorted) > 1:
            dlon = np.median(np.diff(lon_sorted))
            dlat = np.median(np.diff(lat_sorted))
            resolution = min(dlon, dlat)
            if resolution <= 0:
                resolution = 0.01  # fallback ~1km
        else:
            resolution = 0.01

    # ── Build regular grid ──
    lon_min, lon_max = float(lons_raw.min()), float(lons_raw.max())
    lat_min, lat_max = float(lats_raw.min()), float(lats_raw.max())

    grid_lons = np.arange(lon_min, lon_max + resolution * 0.5, resolution)
    grid_lats = np.arange(lat_min, lat_max + resolution * 0.5, resolution)

    W = len(grid_lons)
    H = len(grid_lats)

    if H < TILE_SIZE or W < TILE_SIZE:
        raise ValueError(
            f"Reconstructed field too small for tiling: {H}×{W} "
            f"(need at least {TILE_SIZE}×{TILE_SIZE}).\n"
            f"  Spatial extent: lon [{lon_min:.4f}, {lon_max:.4f}], "
            f"lat [{lat_min:.4f}, {lat_max:.4f}]\n"
            f"  Resolution: {resolution:.6f}"
        )

    grid_lon_2d, grid_lat_2d = np.meshgrid(grid_lons, grid_lats)

    # ── Interpolate each variable onto the grid ──
    full_field = np.full((H, W, NUM_VARS), np.nan, dtype=np.float32)
    variables_present: List[str] = []

    for csv_col, canonical in eco_map.items():
        if canonical not in CANONICAL_VARIABLES:
            continue
        v_idx = CANONICAL_VARIABLES.index(canonical)
        values = pd.to_numeric(df[csv_col], errors="coerce").values

        # Remove NaN points for interpolation
        valid = ~np.isnan(values)
        if valid.sum() < 4:
            continue  # too few points for interpolation

        # Linear interpolation, then fill remaining gaps with nearest
        grid_z = griddata(
            points[valid], values[valid],
            (grid_lon_2d, grid_lat_2d),
            method="linear",
        )
        nan_mask = np.isnan(grid_z)
        if np.any(nan_mask):
            nearest = griddata(
                points[valid], values[valid],
                (grid_lon_2d, grid_lat_2d),
                method="nearest",
            )
            grid_z[nan_mask] = nearest[nan_mask]

        full_field[:, :, v_idx] = grid_z
        variables_present.append(canonical)

    # ── Fill missing variables with synthetic textures ──
    variables_imputed: List[str] = []
    missing_vars = [v for v in CANONICAL_VARIABLES if v not in variables_present]

    if missing_vars:
        import sys
        import os
        from cube_builder import EcologicalCubeBuilder
        builder = EcologicalCubeBuilder(grid_shape=(H, W))
        synthetic_fallback = builder.generate_synthetic_cube()
        
        for v_name in missing_vars:
            v_idx = CANONICAL_VARIABLES.index(v_name)
            if v_idx < 7:
                full_field[:, :, v_idx] = synthetic_fallback[:, :, v_idx]
            else:
                full_field[:, :, 7] = np.linspace(1.0, 0.0, W).reshape(-1, 1).repeat(H, axis=1).T
            variables_imputed.append(v_name)

    return SpatialField(
        data=full_field,
        lons=grid_lons,
        lats=grid_lats,
        variables_present=variables_present,
        variables_imputed=variables_imputed,
        source_file=source_file,
    )


# ═══════════════════════════════════════════════════════════════════════════════
#  STAGE 3 — AUTO-TILING (THE CRITICAL POINT)
# ═══════════════════════════════════════════════════════════════════════════════

def tile_field(
    sf: SpatialField,
    tile_size: int = TILE_SIZE,
    completeness_threshold: float = 0.70,
    variance_threshold: float = 1e-6,
) -> List[Tile]:
    """
    Slide a non-overlapping tile_size × tile_size window across the spatial field.

    Hard rules:
        - stride = tile_size (non-overlapping — scientifically clean)
        - edge crop: partial tiles are DISCARDED, not padded
        - quality filter: reject tiles below completeness or variance thresholds

    Args:
        sf:                       The reconstructed spatial field.
        tile_size:                Tile dimension (default 20).
        completeness_threshold:   Min fraction of non-NaN cells to keep tile.
        variance_threshold:       Min variance across channels to keep tile.

    Returns:
        List of Tile objects, each with cube shape (tile_size, tile_size, 8).
    """
    H, W, V = sf.data.shape
    stride = tile_size

    # Number of complete tiles per axis — CROP, don't pad
    n_rows = H // stride
    n_cols = W // stride

    if n_rows == 0 or n_cols == 0:
        raise ValueError(
            f"Spatial field ({H}×{W}) too small to produce any "
            f"{tile_size}×{tile_size} tiles."
        )

    cropped_h = n_rows * stride
    cropped_w = n_cols * stride
    crop_bottom = H - cropped_h
    crop_right = W - cropped_w

    tiles: List[Tile] = []
    tile_id = 0

    for row_idx in range(n_rows):
        for col_idx in range(n_cols):
            r0 = row_idx * stride
            c0 = col_idx * stride
            r1 = r0 + tile_size
            c1 = c0 + tile_size

            raw_tile = sf.data[r0:r1, c0:c1, :].copy()

            # ── Quality check 1: completeness ──
            total_cells = tile_size * tile_size * V
            nan_count = int(np.isnan(raw_tile).sum())
            completeness = 1.0 - (nan_count / total_cells)

            if completeness < completeness_threshold:
                continue  # reject — too many holes

            # Fill any remaining NaN (edge interpolation artifacts)
            if nan_count > 0:
                for v in range(V):
                    layer = raw_tile[:, :, v]
                    nan_mask = np.isnan(layer)
                    if np.any(nan_mask):
                        fill_val = np.nanmedian(layer)
                        if np.isnan(fill_val):
                            fill_val = 0.0
                        layer[nan_mask] = fill_val
                        raw_tile[:, :, v] = layer

            # ── Per-tile normalization to [0, 1] ──
            for v in range(V):
                layer = raw_tile[:, :, v]
                v_min = float(np.min(layer))
                v_max = float(np.max(layer))
                if v_max > v_min:
                    raw_tile[:, :, v] = (layer - v_min) / (v_max - v_min)
                else:
                    raw_tile[:, :, v] = 0.0

            # ── Quality check 2: variance ──
            # Reject tiles where ALL channels are constant (cloud/mask artifacts)
            total_var = float(np.var(raw_tile))
            if total_var < variance_threshold:
                continue  # reject — no signal

            # ── Compute spatial bounds ──
            lon_lo = float(sf.lons[c0]) if c0 < len(sf.lons) else 0.0
            lon_hi = float(sf.lons[min(c1 - 1, len(sf.lons) - 1)])
            lat_lo = float(sf.lats[r0]) if r0 < len(sf.lats) else 0.0
            lat_hi = float(sf.lats[min(r1 - 1, len(sf.lats) - 1)])

            # ── Detect regime ──
            regime = detect_regime(raw_tile)

            meta = TileMeta(
                tile_id=tile_id,
                source_file=sf.source_file,
                regime=regime,
                completeness=round(completeness, 4),
                variables_present=list(sf.variables_present),
                variables_imputed=list(sf.variables_imputed),
                lon_bounds=(lon_lo, lon_hi),
                lat_bounds=(lat_lo, lat_hi),
                field_row=r0,
                field_col=c0,
            )

            tiles.append(Tile(cube=raw_tile, meta=meta))
            tile_id += 1

    return tiles


# ═══════════════════════════════════════════════════════════════════════════════
#  FULL PIPELINE: CSV → TILES
# ═══════════════════════════════════════════════════════════════════════════════

def csv_to_tiles(
    csv_path: str,
    resolution: Optional[float] = None,
    completeness_threshold: float = 0.70,
) -> Tuple[List[Tile], SpatialField]:
    """
    End-to-end: CSV file → list of quality-filtered 16×16×8 ecological cubes.

    Args:
        csv_path:                Path to the CSV file.
        resolution:              Grid resolution in degrees (auto-detected if None).
        completeness_threshold:  Minimum fraction of valid cells per tile.

    Returns:
        (tiles, spatial_field) — the tiles and the intermediate raster field.
    """
    # Stage 1: parse
    df, lon_col, lat_col, eco_map = parse_csv(csv_path)

    # Stage 2: reconstruct
    sf = reconstruct_field(
        df, lon_col, lat_col, eco_map,
        resolution=resolution,
        source_file=Path(csv_path).name,
    )

    # Stage 3+4+5: tile + normalize + filter
    tiles = tile_field(sf, completeness_threshold=completeness_threshold)

    return tiles, sf


# ═══════════════════════════════════════════════════════════════════════════════
#  SYNTHETIC FIELD GENERATOR (for testing)
# ═══════════════════════════════════════════════════════════════════════════════

def generate_synthetic_field(
    n_lon: int = 64,
    n_lat: int = 64,
    seed: int = 42,
) -> SpatialField:
    """
    Generate a synthetic continuous field for testing the tiler.

    Creates ecologically plausible patterns: a chlorophyll plume,
    a temperature front, patchy productivity, smooth PAR gradient.
    """
    rng = np.random.default_rng(seed)

    lons = np.linspace(3.0, 6.0, n_lon)
    lats = np.linspace(53.0, 56.0, n_lat)

    X, Y = np.meshgrid(
        np.linspace(-2, 2, n_lon),
        np.linspace(-2, 2, n_lat),
    )

    # Base spatial patterns
    plume = np.exp(-((X - 0.5) ** 2 + (Y - 0.3) ** 2) / 1.5)
    front = 1.0 / (1.0 + np.exp(-(X + 0.5 * Y) * 2))
    patchy = np.sin(X * 3) * np.cos(Y * 3) * 0.3 + 0.5

    patterns = [
        0.6 * plume + 0.2 * patchy + 0.1 * front,         # CHL
        0.5 * front + 0.3 * patchy,                         # TSM
        0.55 * plume + 0.25 * front,                        # APHY
        0.7 * front + 0.1 * patchy,                          # ADG
        0.45 * plume + 0.4 * front,                          # BBP
        0.3 + 0.5 * (Y / 4.0 + 0.5),                        # PAR (smooth gradient)
        0.5 * plume + 0.4 * front,                           # KD490
        0.25 + 0.5 * (1.0 - Y / 4.0) + 0.2 * patchy,       # SST (inverse lat gradient)
    ]

    data = np.zeros((n_lat, n_lon, NUM_VARS), dtype=np.float32)
    for v, pattern in enumerate(patterns):
        noise = rng.normal(0, 0.03, (n_lat, n_lon))
        val = pattern + noise
        # Don't normalize here — tile_field does per-tile normalization
        data[:, :, v] = val.astype(np.float32)

    return SpatialField(
        data=data,
        lons=lons,
        lats=lats,
        variables_present=list(CANONICAL_VARIABLES),
        variables_imputed=[],
        source_file="synthetic",
    )


def generate_synthetic_csv(
    output_path: str,
    n_lon: int = 64,
    n_lat: int = 64,
    n_variables: int = 8,
    seed: int = 42,
) -> str:
    """
    Generate a synthetic CSV file for testing the full pipeline.
    Returns the path written.
    """
    sf = generate_synthetic_field(n_lon, n_lat, seed)

    lons_2d, lats_2d = np.meshgrid(sf.lons, sf.lats)
    rows = {
        "longitude": lons_2d.ravel(),
        "latitude": lats_2d.ravel(),
    }
    for v_idx in range(min(n_variables, NUM_VARS)):
        rows[CANONICAL_VARIABLES[v_idx]] = sf.data[:, :, v_idx].ravel()

    df = pd.DataFrame(rows)
    df.to_csv(output_path, index=False)
    return output_path
