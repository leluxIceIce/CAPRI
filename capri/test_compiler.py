from tiler import generate_synthetic_csv
from dataset_compiler import DatasetCompiler
import shutil
from pathlib import Path

csv_path = "test_data.csv"
generate_synthetic_csv(csv_path, n_lon=100, n_lat=100, seed=42)

compiler = DatasetCompiler(base_dir="./datasets")
manifest = compiler.compile(csv_path, dataset_name="test_ds", completeness_threshold=0.5)

print(f"Generated {manifest['n_cubes']} cubes")
print(f"Variables present: {manifest['variables_present']}")
print(f"Variables imputed: {manifest['variables_imputed']}")

if Path(csv_path).exists():
    Path(csv_path).unlink()
