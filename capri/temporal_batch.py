import os
import re
import math
from datetime import datetime
from typing import Dict, Tuple, List, Optional
from dataclasses import dataclass
import pandas as pd
import numpy as np
import torch
from pathlib import Path

from cube_builder import EcologicalCubeBuilder, TileMetadata
from ecological_encoder import EcologicalEncoder
from models import EcologicalFingerprintEncoder
from regime_discovery import RegimeDiscoverer


def parse_timestamp(filename: str) -> str:
    """Parses YYYY-MM-DD from filename format observation_YYYY-MM-DD.csv or cube_YYYY-MM-DD.csv."""
    match = re.search(r"(\d{4}-\d{2}-\d{2})", filename)
    if not match:
        raise ValueError(f"Could not parse timestamp from filename: {filename}")
    return match.group(1)


def get_seasonal_features(date) -> Tuple[float, float]:
    """Computes sin and cos seasonal encodings using Day-of-Year / 365.25."""
    if isinstance(date, str):
        # Handle simple YYYY-MM-DD or full timestamp
        date = datetime.strptime(date[:10], "%Y-%m-%d")
    doy = date.timetuple().tm_yday
    angle = 2.0 * math.pi * doy / 365.25
    return (math.sin(angle), math.cos(angle))


@dataclass
class SavedSample:
    sample_id: str
    timestamp: str
    coordinates: Tuple[float, float]
    regime: str
    variables: Dict[str, float]
    embedding: List[float]
    cube: Optional[np.ndarray] = None


class TemporalBatch:
    def __init__(self, batch_id: str, folder_path: str):
        self.batch_id = batch_id
        self.folder_path = folder_path
        self.samples: List[SavedSample] = []

    @classmethod
    def from_folder(
        cls,
        folder_path: str,
        encoder_model: Optional[EcologicalFingerprintEncoder] = None,
        regime_discoverer: Optional[RegimeDiscoverer] = None,
    ) -> "TemporalBatch":
        """Loads all CSVs in chronological order. Runs them through the EcologicalEncoder and GMM clusterer/regime discovery pipeline."""
        path = Path(folder_path)
        batch_id = path.name

        # List CSV files matching observation_*.csv or cube_*.csv
        csv_files = []
        if path.exists() and path.is_dir():
            for file in path.glob("*.csv"):
                if "observation_" in file.name or "cube_" in file.name:
                    csv_files.append(file)

        # Parse timestamp and sort chronologically
        parsed_files = []
        for f in csv_files:
            try:
                ts = parse_timestamp(f.name)
                parsed_files.append((ts, f))
            except ValueError:
                continue

        parsed_files.sort(key=lambda x: x[0])

        encoder_pipeline = EcologicalEncoder()

        if encoder_model is None:
            # Default to 282 channels
            encoder_model = EcologicalFingerprintEncoder(in_channels=282, latent_dim=128)
            if os.path.exists("encoder.pt"):
                try:
                    encoder_model.load_state_dict(torch.load("encoder.pt", map_location="cpu"))
                except Exception:
                    pass
            encoder_model.eval()

        if regime_discoverer is None:
            regime_discoverer = RegimeDiscoverer(n_regimes=3)

        builder = EcologicalCubeBuilder()

        samples_info = []
        for ts, f in parsed_files:
            try:
                df = pd.read_csv(f, sep=None, engine="python")
            except Exception:
                # Handle potential reading errors
                continue

            # Extract coordinates
            lon_col = None
            lat_col = None
            lon_aliases = {"lon", "longitude", "Longitude", "LON", "lng", "x", "X"}
            lat_aliases = {"lat", "latitude", "Latitude", "LAT", "y", "Y"}
            for col in df.columns:
                col_stripped = col.strip()
                if col_stripped in lon_aliases:
                    lon_col = col
                elif col_stripped in lat_aliases:
                    lat_col = col

            if lon_col is not None and lat_col is not None:
                try:
                    mean_lon = float(pd.to_numeric(df[lon_col], errors="coerce").mean())
                    mean_lat = float(pd.to_numeric(df[lat_col], errors="coerce").mean())
                    if not np.isnan(mean_lon) and not np.isnan(mean_lat):
                        coords = (mean_lon, mean_lat)
                    else:
                        coords = (0.0, 0.0)
                except Exception:
                    coords = (0.0, 0.0)
            else:
                coords = (0.0, 0.0)

            # Build cube
            try:
                cube, meta = builder.build_from_csv(str(f))
            except Exception:
                # Fallback to reshape row-major if build_from_csv fails
                try:
                    H, W = 20, 20
                    V = 7
                    cube = np.zeros((H, W, V), dtype=np.float32)
                    col_map = builder._resolve_columns(df)
                    for csv_col, canonical in col_map.items():
                        if canonical in builder.variables:
                            v_idx = builder.variables.index(canonical)
                            values = pd.to_numeric(df[csv_col], errors="coerce").values[:400]
                            if len(values) < 400:
                                padded = np.zeros(400, dtype=np.float32)
                                padded[:len(values)] = values
                                values = padded
                            v_min, v_max = float(np.nanmin(values)), float(np.nanmax(values))
                            if v_max > v_min:
                                values = (values - v_min) / (v_max - v_min)
                            else:
                                values = np.zeros_like(values)
                            cube[:, :, v_idx] = values.reshape(H, W)
                    meta = TileMetadata(
                        source_file=str(f.name),
                        regime="unknown",
                        grid_shape=(20, 20),
                        variables=list(builder.variables),
                    )
                except Exception:
                    continue

            # Get variable means
            variables_means = {}
            for v_idx, var in enumerate(builder.variables):
                variables_means[var] = float(cube[:, :, v_idx].mean())

            # Compute embedding
            meta.timestamp = ts
            encoding = encoder_pipeline.encode(cube, meta)
            tensor = encoding.to_tensor().unsqueeze(0)
            with torch.no_grad():
                z = encoder_model(tensor).squeeze(0).numpy()

            samples_info.append({
                "sample_id": f.stem,
                "timestamp": ts,
                "coordinates": coords,
                "variables": variables_means,
                "embedding": z,
                "cube": cube
            })

        # Run GMM clusterer/regime discovery pipeline on embeddings
        if samples_info:
            Z = np.stack([s["embedding"] for s in samples_info])
            if regime_discoverer.gmm is not None:
                try:
                    if hasattr(regime_discoverer.gmm, "means_"):
                        gmm_labels = regime_discoverer.gmm.predict(Z)
                    else:
                        _, _, gmm_labels = regime_discoverer.discover_regimes(Z)
                except Exception:
                    _, _, gmm_labels = regime_discoverer.discover_regimes(Z)
            else:
                _, _, gmm_labels = regime_discoverer.discover_regimes(Z)
        else:
            gmm_labels = []

        # Construct SavedSample objects
        samples = []
        for idx, s in enumerate(samples_info):
            gmm_label = int(gmm_labels[idx]) if idx < len(gmm_labels) else 0
            regime_str = f"Regime_{gmm_label}"

            sample = SavedSample(
                sample_id=s["sample_id"],
                timestamp=s["timestamp"],
                coordinates=s["coordinates"],
                regime=regime_str,
                variables=s["variables"],
                embedding=s["embedding"].tolist(),
                cube=s["cube"]
            )
            samples.append(sample)

        batch = cls(batch_id=batch_id, folder_path=folder_path)
        batch.samples = samples
        return batch

    @staticmethod
    def get_seasonal_features(date) -> Tuple[float, float]:
        """Computes sin and cos seasonal Day-of-Year components."""
        return get_seasonal_features(date)
