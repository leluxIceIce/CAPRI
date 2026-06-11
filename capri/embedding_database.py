import json
from dataclasses import dataclass
from typing import List, Tuple, Dict, Any, Optional
import numpy as np
import csv
from pathlib import Path
import torch

@dataclass
class EmbeddingRecord:
    embedding_id: int
    cube_id: str          
    dataset_id: str
    lon_bounds: Optional[Tuple[float, float]]
    lat_bounds: Optional[Tuple[float, float]]
    regime: str
    embedding: np.ndarray
    timestamp: str = ""
    cube: Optional[np.ndarray] = None

class EmbeddingDatabase:
    def __init__(self):
        self.records: List[EmbeddingRecord] = []
        
    def add(self, rec: EmbeddingRecord):
        self.records.append(rec)

    def to_parquet(self, path: str):
        import pandas as pd
        records_data = []
        for r in self.records:
            lon_min, lon_max = r.lon_bounds if r.lon_bounds else (None, None)
            lat_min, lat_max = r.lat_bounds if r.lat_bounds else (None, None)
            
            row = {
                "embedding_id": r.embedding_id,
                "cube_id": r.cube_id,
                "dataset_id": r.dataset_id,
                "lon_min": lon_min,
                "lon_max": lon_max,
                "lat_min": lat_min,
                "lat_max": lat_max,
                "regime": r.regime,
                "timestamp": getattr(r, "timestamp", ""),
                "embedding_vector": r.embedding.tolist(),
            }
            if getattr(r, "cube", None) is not None:
                # Add individual variable means for easy query
                var_names = ["CHL", "TSM", "APHY", "ADG", "BBP", "PAR", "KD490", "SST"]
                cube_data = r.cube
                for idx, var in enumerate(var_names):
                    if idx < cube_data.shape[-1]:
                        row[f"{var}_mean"] = float(cube_data[:, :, idx].mean())
                # Full flattened cube for reversibility
                row["original_measurements"] = cube_data.flatten().tolist()
            records_data.append(row)
            
        df = pd.DataFrame(records_data)
        df.to_parquet(path, engine="pyarrow")
        
    def to_csv(self, path: str):
        with open(path, 'w', newline='') as f:
            writer = csv.writer(f)
            writer.writerow(["embedding_id", "cube_id", "dataset_id", "lon_min", "lon_max", "lat_min", "lat_max", "regime", "embedding_vector"])
            for r in self.records:
                vec_str = json.dumps(r.embedding.tolist())
                lon_min, lon_max = r.lon_bounds if r.lon_bounds else (None, None)
                lat_min, lat_max = r.lat_bounds if r.lat_bounds else (None, None)
                writer.writerow([r.embedding_id, r.cube_id, r.dataset_id, lon_min, lon_max, lat_min, lat_max, r.regime, vec_str])
                
    @classmethod
    def load_csv(cls, path: str) -> 'EmbeddingDatabase':
        db = cls()
        with open(path, 'r') as f:
            reader = csv.DictReader(f)
            for row in reader:
                lon_b = (float(row["lon_min"]), float(row["lon_max"])) if row["lon_min"] else None
                lat_b = (float(row["lat_min"]), float(row["lat_max"])) if row["lat_min"] else None
                rec = EmbeddingRecord(
                    embedding_id=int(row["embedding_id"]),
                    cube_id=row["cube_id"],
                    dataset_id=row["dataset_id"],
                    lon_bounds=lon_b,
                    lat_bounds=lat_b,
                    regime=row["regime"],
                    embedding=np.array(json.loads(row["embedding_vector"]), dtype=np.float32)
                )
                db.add(rec)
        return db

    def from_parquet(self, path: str):
        import pandas as pd
        df = pd.read_parquet(path, engine="pyarrow")
        self.records = []
        for _, row in df.iterrows():
            lon_min_val = row.get("lon_min")
            lon_max_val = row.get("lon_max")
            lat_min_val = row.get("lat_min")
            lat_max_val = row.get("lat_max")
            
            lon_b = (float(lon_min_val), float(lon_max_val)) if pd.notna(lon_min_val) and pd.notna(lon_max_val) else None
            lat_b = (float(lat_min_val), float(lat_max_val)) if pd.notna(lat_min_val) and pd.notna(lat_max_val) else None
            
            cube = None
            orig_meas = row.get("original_measurements")
            if orig_meas is not None and len(orig_meas) > 0:
                meas = np.array(orig_meas, dtype=np.float32)
                if len(meas) == 20 * 20 * 8:
                    cube = meas.reshape(20, 20, 8)
                    
            rec = EmbeddingRecord(
                embedding_id=int(row["embedding_id"]),
                cube_id=row["cube_id"],
                dataset_id=row["dataset_id"],
                lon_bounds=lon_b,
                lat_bounds=lat_b,
                regime=row["regime"],
                embedding=np.array(row["embedding_vector"], dtype=np.float32),
                timestamp=row.get("timestamp", ""),
                cube=cube
            )
            self.add(rec)

    @classmethod
    def load_parquet(cls, path: str) -> 'EmbeddingDatabase':
        db = cls()
        db.from_parquet(path)
        return db

