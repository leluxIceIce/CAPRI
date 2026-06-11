"""
EEF UI Backend Pipeline Server.

Runs a Flask server serving the EEF Viewer frontend and exposing API endpoints
to run real-time scientific assessments, novelty checks, and comparison reports
using the python EcologicalExplorer backend.
"""

import os
import io
import logging
import numpy as np
import pandas as pd
import torch
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from typing import Dict, Any, List, Optional
import tempfile
import uuid
import json

# Import our modular components
from cube_builder import EcologicalCubeBuilder, TileMetadata
from spatial_structure import SpatialStructureExtractor
from relationship_tensor import RelationshipStructureExtractor
from ecological_encoder import EcologicalEncoder, EcologicalEncoding
from models import EcologicalFingerprintEncoder
from contrastive_learner import EcologicalPairDataset, train_contrastive_model
from regime_discovery import RegimeDiscoverer
from analog_retrieval import EcologicalAnalogRetriever
from interpreter import EcologicalInterpreter
from explorer import EcologicalExplorer
from dataset_compiler import DatasetCompiler
from multi_dataset import MultiDatasetPool
from training_pipeline import EcologicalTrainingPipeline

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger("EEFBackend")

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend

# Global explorer instance
explorer: Optional[EcologicalExplorer] = None
cube_builder: Optional[EcologicalCubeBuilder] = None

# New global instances for Dataset compiler and Training
dataset_compiler = DatasetCompiler(base_dir="./datasets")
multi_dataset_pool = MultiDatasetPool(base_dir="./datasets")
training_pipeline = EcologicalTrainingPipeline(datasets_dir="./datasets")
embedding_db = None
discovery_results = None

def init_eef_pipeline():
    logger.info("Initializing EEF backend pipeline...")
    # Delay expensive initialization to API calls
    logger.info("EEF Pipeline initialized and waiting for data.")

def parse_csv_to_cube(csv_content: str) -> np.ndarray:
    """Parses uploaded CSV content into a 20x20x7 cube."""
    df = pd.read_csv(io.StringIO(csv_content), sep=None, engine='python')
    
    # Check that we have exactly 400 rows
    if len(df) != 400:
        raise ValueError(f"CSV must contain exactly 400 rows (20x20 grid), found {len(df)} rows.")
        
    # Extract canonical variables
    resolved_cols = cube_builder._resolve_columns(df)
    if len(resolved_cols) < 7:
        missing = set(cube_builder.variables) - set(resolved_cols.values())
        raise ValueError(f"CSV missing canonical variables. Missing: {list(missing)}")
        
    # Extract variables in order and normalize
    cube = np.zeros((20, 20, 7), dtype=np.float32)
    # Reshape each column to 20x20
    for csv_col, canonical in resolved_cols.items():
        v_idx = cube_builder.variables.index(canonical)
        series = df[csv_col].values.astype(np.float32)
        # Min-max normalize to [0, 1]
        s_min, s_max = series.min(), series.max()
        if s_max > s_min:
            series = (series - s_min) / (s_max - s_min)
        else:
            series = np.zeros_like(series)
        cube[:, :, v_idx] = series.reshape((20, 20))
        
    return cube

# ── API Routes ────────────────────────────────────────────────────────────────

@app.route("/")
def index():
    """Serves the static Three.js browser client."""
    return send_file("eef_viewer.html")

@app.route("/health")
def health():
    """Health check endpoint."""
    return jsonify({"status": "healthy"}), 200

@app.route("/api/analyze", methods=["POST"])
def analyze_tile():
    """
    Ingests a CSV file, runs it through the EcologicalExplorer,
    and returns a structured scientific assessment.
    """
    if "file" not in request.files:
        return jsonify({"error": "No file part in request"}), 400
        
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400
        
    try:
        csv_content = file.read().decode("utf-8")
        cube = parse_csv_to_cube(csv_content)
        
        # Run explorer query
        assessment = explorer.query(cube, source_file=file.filename)
        
        # Add detailed novelty details
        novelty_report = explorer.detect_novelty(cube)
        assessment["novelty_analysis"] = novelty_report
        
        # Add explanation justification text
        justification = explorer.interpreter.generate_scientific_justification(assessment)
        assessment["scientific_justification"] = justification
        
        return jsonify(assessment)
    except Exception as e:
        logger.error(f"Error during analysis: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route("/api/compare", methods=["POST"])
def compare_tiles():
    """
    Compares two uploaded CSV tiles.
    """
    if "file_a" not in request.files or "file_b" not in request.files:
        return jsonify({"error": "Both file_a and file_b are required"}), 400
        
    file_a = request.files["file_a"]
    file_b = request.files["file_b"]
    
    try:
        cube_a = parse_csv_to_cube(file_a.read().decode("utf-8"))
        cube_b = parse_csv_to_cube(file_b.read().decode("utf-8"))
        
        comparison = explorer.compare(cube_a, cube_b)
        return jsonify(comparison)
    except Exception as e:
        logger.error(f"Error during comparison: {str(e)}")
        return jsonify({"error": str(e)}), 500

# ── Dataset Factory API Routes ────────────────────────────────────────────────

@app.route("/api/dataset/compile", methods=["POST"])
def compile_dataset():
    """Upload CSV → compile full dataset, return manifest."""
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400
        
    dataset_name = request.form.get("dataset_name", file.filename.split('.')[0] + f"_{uuid.uuid4().hex[:6]}")
    completeness_threshold = float(request.form.get("completeness_threshold", "0.70"))
    
    # Save uploaded file to temp path
    try:
        fd, temp_path = tempfile.mkstemp(suffix=".csv")
        os.close(fd)
        file.save(temp_path)
        
        manifest = dataset_compiler.compile(
            csv_path=temp_path,
            dataset_name=dataset_name,
            completeness_threshold=completeness_threshold
        )
        return jsonify(manifest), 200
        
    except Exception as e:
        logger.error(f"Error compiling dataset: {str(e)}")
        return jsonify({"error": str(e)}), 500
    finally:
        if 'temp_path' in locals() and os.path.exists(temp_path):
            os.unlink(temp_path)

@app.route("/api/dataset/list", methods=["GET"])
def list_datasets():
    """List all compiled datasets on disk."""
    datasets = dataset_compiler.list_datasets()
    return jsonify({"datasets": datasets}), 200

@app.route("/api/dataset/<dataset_name>/manifest", methods=["GET"])
def get_manifest(dataset_name):
    """Return manifest.json for a compiled dataset."""
    manifest_path = dataset_compiler.base_dir / dataset_name / "manifest.json"
    if not manifest_path.exists():
        return jsonify({"error": "Dataset not found"}), 404
        
    with open(manifest_path, "r") as f:
        manifest = json.load(f)
    return jsonify(manifest), 200

@app.route("/api/dataset/<dataset_name>/cubes", methods=["GET"])
def get_dataset_cubes(dataset_name):
    """Return all cube arrays as JSON."""
    manifest_path = dataset_compiler.base_dir / dataset_name / "manifest.json"
    if not manifest_path.exists():
        return jsonify({"error": "Dataset not found"}), 404
        
    try:
        with open(manifest_path, "r") as f:
            manifest = json.load(f)
            
        cubes = []
        cubes_dir = dataset_compiler.base_dir / dataset_name / "cubes"
        for tile in manifest.get("tiles", []):
            cube_file = cubes_dir / tile["file"]
            if cube_file.exists():
                cube_data = np.load(cube_file)
                cubes.append({
                    "id": tile["id"],
                    "regime": tile["regime"],
                    "cube": cube_data.tolist()
                })
                
        return jsonify({"dataset": dataset_name, "cubes": cubes}), 200
    except Exception as e:
        logger.error(f"Error reading cubes: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route("/api/dataset/merge", methods=["POST"])
def merge_datasets():
    """Merge multiple datasets, return unified pool stats."""
    data = request.get_json()
    if not data or "datasets" not in data:
        return jsonify({"error": "Missing datasets list"}), 400
        
    dataset_names = data["datasets"]
    try:
        n_loaded = multi_dataset_pool.load(dataset_names)
        return jsonify({
            "status": "success",
            "merged_count": n_loaded,
            "datasets": dataset_names
        }), 200
    except Exception as e:
        logger.error(f"Error merging datasets: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route("/api/encoder/train", methods=["POST"])
def train_encoder():
    """Trains the ResNet encoder on the merged dataset pool."""
    global training_pipeline, embedding_db, discovery_results
    
    data = request.get_json() or {}
    epochs = int(data.get("epochs", 10))
    batch_size = int(data.get("batch_size", 8))
    
    try:
        # Load whatever datasets are specified, or use currently loaded
        if "datasets" in data and data["datasets"]:
            training_pipeline.load_datasets(data["datasets"])
            
        losses = training_pipeline.train(epochs=epochs, batch_size=batch_size)
        
        # Once trained, generate all embeddings
        embedding_db = training_pipeline.embed_all()
        embedding_db.to_csv("embeddings.csv")
        
        # Build the state space
        discovery_results = training_pipeline.discover_states(embedding_db)
        
        return jsonify({
            "status": "success",
            "losses": losses,
            "embeddings_generated": len(embedding_db.records)
        }), 200
        
    except Exception as e:
        logger.error(f"Error training encoder: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route("/api/discovery/fit", methods=["GET"])
def get_discovery_state():
    """Returns the UMAP + HDBSCAN state space results."""
    global discovery_results
    if discovery_results is None:
        return jsonify({"error": "State space not constructed yet."}), 400
        
    # Convert numpy arrays to lists for JSON serialization
    return jsonify({
        "umap_2d": discovery_results["umap"][:, :2].tolist(),
        "umap_3d": discovery_results["umap"].tolist() if discovery_results["umap"].shape[1] > 2 else [],
        "hdbscan_labels": discovery_results["hdbscan_labels"].tolist(),
        "gmm_labels": discovery_results["gmm_labels"].tolist()
    }), 200

if __name__ == "__main__":
    init_eef_pipeline()
    # Run server on port 8000
    app.run(host="0.0.0.0", port=8000)
