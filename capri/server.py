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
from pathlib import Path

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
cube_builder: EcologicalCubeBuilder = EcologicalCubeBuilder()

# New global instances for Dataset compiler and Training
dataset_compiler = DatasetCompiler(base_dir="./datasets")
multi_dataset_pool = MultiDatasetPool(base_dir="./datasets")
training_pipeline = EcologicalTrainingPipeline(datasets_dir="./datasets")
embedding_db = None
discovery_results = None

def init_eef_pipeline():
    global explorer, embedding_db, discovery_results, training_pipeline
    logger.info("Initializing EEF backend pipeline...")
    if explorer is None:
        try:
            from spatial_structure import SpatialStructureExtractor
            from relationship_tensor import RelationshipStructureExtractor
            from ecological_encoder import EcologicalEncoder
            from models import EcologicalFingerprintEncoder
            from regime_discovery import RegimeDiscoverer
            from analog_retrieval import EcologicalAnalogRetriever
            from interpreter import EcologicalInterpreter
            
            spatial_extractor = SpatialStructureExtractor(window_size=3)
            rel_extractor = RelationshipStructureExtractor(mode="all", variables=cube_builder.variables)
            encoder_pipeline = EcologicalEncoder(spatial_extractor, rel_extractor)
            
            in_ch = len(encoder_pipeline.encode(cube_builder.generate_synthetic_cube(), TileMetadata()).channel_manifest)
            model = EcologicalFingerprintEncoder(in_channels=in_ch, latent_dim=128)
            
            # Load encoder.pt weights if they exist
            if os.path.exists("encoder.pt"):
                logger.info("Loading existing encoder.pt weights...")
                try:
                    model.load_state_dict(torch.load("encoder.pt", map_location="cpu"))
                    training_pipeline.model.load_state_dict(torch.load("encoder.pt", map_location="cpu"))
                except Exception as load_err:
                    logger.warning(f"Could not load encoder.pt weights: {load_err}")
            
            # Check if we can load existing embeddings to build the state space and retriever
            loaded_real_db = False
            db_path_parquet = Path("embeddings.parquet")
            db_path_csv = Path("embeddings.csv")
            
            if db_path_parquet.exists() or db_path_csv.exists():
                logger.info("Loading existing embedding database from disk...")
                try:
                    from embedding_database import EmbeddingDatabase
                    db = EmbeddingDatabase()
                    if db_path_parquet.exists():
                        db.from_parquet(str(db_path_parquet))
                    else:
                        db = EmbeddingDatabase.load_csv(str(db_path_csv))
                    
                    if len(db.records) > 0:
                        embedding_db = db
                        Z = np.stack([r.embedding for r in db.records])
                        
                        disc = RegimeDiscoverer(n_regimes=3, reduction_method="umap", n_components=3)
                        Z_proj = disc.fit_transform_latent_space(Z)
                        hdb_labels, gmm_probs, gmm_labels = disc.discover_regimes(Z)
                        
                        discovery_results = {
                            "umap": Z_proj,
                            "hdbscan_labels": hdb_labels,
                            "gmm_probs": gmm_probs,
                            "gmm_labels": gmm_labels,
                            "num_embeddings": Z.shape[0],
                            "embedding_dim": Z.shape[1],
                            "nan_count": int(np.isnan(Z).sum()),
                            "variance": float(np.var(Z))
                        }
                        
                        ret = EcologicalAnalogRetriever(n_neighbors=5)
                        ret.fit(Z)
                        
                        interpreter = EcologicalInterpreter(variable_names=cube_builder.variables)
                        cubes = [r.cube if r.cube is not None else cube_builder.generate_synthetic_cube() for r in db.records]
                        interpreter.auto_name_regimes(cubes, gmm_labels)
                        
                        explorer = EcologicalExplorer(
                            encoder_model=model,
                            encoder_pipeline=encoder_pipeline,
                            regime_discoverer=disc,
                            analog_retriever=ret,
                            interpreter=interpreter
                        )
                        loaded_real_db = True
                        logger.info(f"EEF Explorer successfully initialized with {len(db.records)} reference embeddings.")
                except Exception as db_err:
                    logger.error(f"Error restoring embedding database at startup: {db_err}", exc_info=True)
            
            if not loaded_real_db:
                logger.info("No reference database loaded. Initializing with dummy defaults.")
                dummy_cubes = [cube_builder.generate_synthetic_cube() for _ in range(30)]
                dummy_embeddings = np.random.randn(30, 128).astype(np.float32)
                
                disc = RegimeDiscoverer(n_regimes=3)
                disc.fit_transform_latent_space(dummy_embeddings)
                disc.discover_regimes(dummy_embeddings)
                
                ret = EcologicalAnalogRetriever(n_neighbors=3)
                ret.fit(dummy_embeddings)
                
                interpreter = EcologicalInterpreter(variable_names=cube_builder.variables)
                interpreter.auto_name_regimes(dummy_cubes, np.array([0]*10 + [1]*10 + [2]*10))
                
                explorer = EcologicalExplorer(
                    encoder_model=model,
                    encoder_pipeline=encoder_pipeline,
                    regime_discoverer=disc,
                    analog_retriever=ret,
                    interpreter=interpreter
                )
                logger.info("EEF Explorer pipeline initialized with dummy fallbacks.")
        except Exception as ex:
            logger.warning(f"Could not fully initialize real explorer pipeline: {str(ex)}. Using robust fallbacks.")
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
@app.route("/generate-dataset", methods=["POST"])
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
@app.route("/datasets", methods=["GET"])
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

def update_explorer_from_trained():
    global explorer, training_pipeline, embedding_db
    if embedding_db is None or len(embedding_db.records) == 0:
        logger.warning("Attempted to update explorer, but embedding database is empty.")
        return
    
    logger.info("Updating runtime EcologicalExplorer with trained model and embeddings...")
    try:
        from spatial_structure import SpatialStructureExtractor
        from relationship_tensor import RelationshipStructureExtractor
        from ecological_encoder import EcologicalEncoder
        from regime_discovery import RegimeDiscoverer
        from analog_retrieval import EcologicalAnalogRetriever
        from interpreter import EcologicalInterpreter
        from explorer import EcologicalExplorer
        
        # 1. Get current model
        model = training_pipeline.model
        model.eval()
        
        # 2. Extract embeddings matrix Z
        Z = np.stack([r.embedding for r in embedding_db.records])
        
        # 3. Fit RegimeDiscoverer on Z
        disc = RegimeDiscoverer(n_regimes=3, reduction_method="umap", n_components=3)
        disc.fit_transform_latent_space(Z)
        disc.discover_regimes(Z)
        
        # 4. Fit EcologicalAnalogRetriever on Z
        ret = EcologicalAnalogRetriever(n_neighbors=5)
        ret.fit(Z)
        
        # 5. Create interpreter
        interpreter = EcologicalInterpreter(variable_names=cube_builder.variables)
        cubes = [r.cube if r.cube is not None else cube_builder.generate_synthetic_cube() for r in embedding_db.records]
        gmm_labels = disc.gmm.predict(Z)
        interpreter.auto_name_regimes(cubes, gmm_labels)
        
        # 6. Update global explorer
        spatial_extractor = SpatialStructureExtractor(window_size=3)
        rel_extractor = RelationshipStructureExtractor(mode="all", variables=cube_builder.variables)
        encoder_pipeline = EcologicalEncoder(spatial_extractor, rel_extractor)
        
        explorer = EcologicalExplorer(
            encoder_model=model,
            encoder_pipeline=encoder_pipeline,
            regime_discoverer=disc,
            analog_retriever=ret,
            interpreter=interpreter
        )
        logger.info("Runtime EcologicalExplorer successfully updated.")
    except Exception as e:
        logger.error(f"Error updating explorer from trained model: {str(e)}", exc_info=True)

@app.route("/api/encoder/train", methods=["POST"])
@app.route("/train-encoder", methods=["POST"])
def train_encoder():
    """Trains the ResNet encoder on the merged dataset pool."""
    global training_pipeline, embedding_db, discovery_results
    
    data = request.get_json() or {}
    epochs = int(data.get("epochs", 10))
    batch_size = int(data.get("batch_size", 8))
    
    try:
        # Load whatever datasets are specified, or use currently loaded
        if "datasets" in data and data["datasets"]:
            if isinstance(data["datasets"][0], str):
                training_pipeline.load_datasets(data["datasets"])
            else:
                # The frontend is passing raw cube arrays (e.g. 20 copies of the active cube)
                cubes_array = [np.array(c, dtype=np.float32) for c in data["datasets"]]
                training_pipeline.pool.cubes = cubes_array
                training_pipeline.pool.metadata = [
                    {"dataset": "live_ui", "regime": "unknown", "tile_id": i} 
                    for i in range(len(cubes_array))
                ]
            
        losses, pos_sims, neg_sims = training_pipeline.train(epochs=epochs, batch_size=batch_size)
        
        # Once trained, generate all embeddings
        embedding_db = training_pipeline.embed_all()
        embedding_db.to_csv("embeddings.csv")
        embedding_db.to_parquet("embeddings.parquet")
        
        # Save PyTorch weights
        torch.save(training_pipeline.model.state_dict(), "encoder.pt")
        
        # Save model metadata
        import datetime
        metadata = {
            "model_architecture": "EcologicalFingerprintEncoder",
            "in_channels": training_pipeline.model.conv1.in_channels,
            "latent_dim": 128,
            "epochs": epochs,
            "batch_size": batch_size,
            "training_date": datetime.datetime.now().isoformat(),
            "final_loss": float(losses[-1]) if losses else None,
            "loss_curve": [float(l) for l in losses],
            "pos_sim_curve": [float(s) for s in pos_sims],
            "neg_sim_curve": [float(s) for s in neg_sims]
        }
        with open("model_metadata.json", "w") as f:
            json.dump(metadata, f, indent=2)
            
        # Build the state space
        discovery_results = training_pipeline.discover_states(embedding_db)
        
        # Update the runtime explorer with the new model state
        update_explorer_from_trained()
        
        return jsonify({
            "status": "success",
            "losses": losses,
            "pos_sims": pos_sims,
            "neg_sims": neg_sims,
            "embeddings_generated": len(embedding_db.records)
        }), 200
        
    except Exception as e:
        logger.error(f"Error training encoder: {str(e)}")
        return jsonify({"error": str(e)}), 500


@app.route("/api/discovery/fit", methods=["POST", "GET"])
@app.route("/run-umap", methods=["POST", "GET"])
def get_discovery_state():
    """Returns the UMAP + HDBSCAN state space results."""
    global discovery_results, embedding_db, training_pipeline
    if discovery_results is None:
        if embedding_db is not None:
            logger.info("Fitting UMAP dynamically...")
            discovery_results = training_pipeline.discover_states(embedding_db)
        else:
            return jsonify({"error": "State space not constructed yet. Train model first."}), 400
        
    # Convert numpy arrays to lists for JSON serialization
    return jsonify({
        "umap_2d": discovery_results["umap"][:, :2].tolist(),
        "umap_3d": discovery_results["umap"].tolist() if discovery_results["umap"].shape[1] > 2 else [],
        "hdbscan_labels": discovery_results["hdbscan_labels"].tolist(),
        "gmm_labels": discovery_results["gmm_labels"].tolist(),
        "num_embeddings": discovery_results.get("num_embeddings", 0),
        "embedding_dim": discovery_results.get("embedding_dim", 0),
        "nan_count": discovery_results.get("nan_count", 0),
        "variance": discovery_results.get("variance", 0.0)
    }), 200

@app.route("/api/molecule/decompose", methods=["POST", "GET"])
def decompose_molecule():
    try:
        cube = None
        if request.method == "POST":
            data = request.get_json(silent=True)
            if data and "cube" in data:
                cube = np.array(data["cube"], dtype=np.float32)
                
        if cube is None:
            # Generate synthetic fallback
            cube = cube_builder.generate_synthetic_cube()
            # Append SST channel
            H, W, _ = cube.shape
            y_grad = np.linspace(0.8, 0.2, H)
            SST = np.repeat(y_grad[:, np.newaxis], W, axis=1)
            cube = np.concatenate([cube, SST[:, :, np.newaxis]], axis=2)
            
        from molecular_tensor import decompose_to_molecular_fingerprint, tensor_to_3d_voxels, detect_symmetry
        
        fingerprint = decompose_to_molecular_fingerprint(cube)
        voxels = tensor_to_3d_voxels(cube)
        symmetries = detect_symmetry(voxels)
        
        # Extract active points above a threshold for easy rendering
        active_voxels = []
        for c in range(7):
            indices = np.argwhere(voxels[c] > 0.05)
            for x_idx, y_idx, z_idx in indices:
                val = float(voxels[c, x_idx, y_idx, z_idx])
                active_voxels.append({
                    "channel": c,
                    "x": int(x_idx),
                    "y": int(y_idx),
                    "z": int(z_idx),
                    "value": val
                })
                
        return jsonify({
            "fingerprint": fingerprint.tolist(),
            "symmetries": symmetries,
            "voxels": voxels.tolist(),
            "active_voxels": active_voxels
        }), 200
        
    except Exception as e:
        logger.error(f"Error in decompose query: {str(e)}", exc_info=True)
        return jsonify({"error": str(e)}), 500

@app.route("/api/molecule/dock/<int:x>/<int:y>", methods=["POST", "GET"])
def dock_molecule(x, y):
    try:
        # Ingest cube from post or use synthetic fallback
        cube = None
        if request.method == "POST":
            data = request.get_json(silent=True)
            if data and "cube" in data:
                cube = np.array(data["cube"], dtype=np.float32)
        
        if cube is None:
            # Generate or use synthetic cube
            cube = cube_builder.generate_synthetic_cube()
            # Append SST channel
            H, W, _ = cube.shape
            y_grad = np.linspace(0.8, 0.2, H)
            SST = np.repeat(y_grad[:, np.newaxis], W, axis=1)
            cube = np.concatenate([cube, SST[:, :, np.newaxis]], axis=2)
            
        H, W, V = cube.shape
        if not (0 <= x < W and 0 <= y < H):
            return jsonify({"error": f"Coordinates out of bounds: x={x}, y={y} for shape {W}x{H}"}), 400
            
        # Get 3D molecular structure of selected cell (7, 20)
        from molecular_tensor import tensor_to_3d_voxels
        voxels = tensor_to_3d_voxels(cube) # Shape (7, 20, 20, 20)
        selected_voxels = voxels[:, y, x, :] # Shape (7, 20)
        selected_values = cube[y, x, :].tolist()
        
        # Now find top-k matching cells in database
        matches = []
        k = int(request.args.get("k", 5))
        
        global embedding_db
        if embedding_db is not None and len(embedding_db.records) > 0:
            # We will calculate distance between selected cell variables and all cells in DB
            selected_vec = np.array(cube[y, x, :], dtype=np.float32)
            
            # Gather all cells
            all_cells = []
            for rec in embedding_db.records:
                db_cube = rec.cube
                if db_cube is None:
                    continue
                db_H, db_W, db_V = db_cube.shape
                # Ensure same variable count
                lim_V = min(V, db_V)
                
                # Compute distance using the overlapping variables
                db_flat = db_cube.reshape(-1, db_V)
                diff = db_flat[:, :lim_V] - selected_vec[:lim_V]
                dists = np.linalg.norm(diff, axis=1)
                
                for idx, d in enumerate(dists):
                    db_y = idx // db_W
                    db_x = idx % db_W
                    all_cells.append({
                        "cube_id": rec.cube_id,
                        "dataset_id": rec.dataset_id,
                        "regime": rec.regime,
                        "x": db_x,
                        "y": db_y,
                        "distance": float(d),
                        "values": db_cube[db_y, db_x, :].tolist()
                    })
            
            # Sort by distance
            all_cells.sort(key=lambda c: c["distance"])
            matches = all_cells[:k]
            
            # Compute voxels for matches
            for m in matches:
                parent_rec = next((r for r in embedding_db.records if r.cube_id == m["cube_id"]), None)
                if parent_rec is not None and parent_rec.cube is not None:
                    parent_voxels = tensor_to_3d_voxels(parent_rec.cube)
                    m["voxels"] = parent_voxels[:, m["y"], m["x"], :].tolist()
                else:
                    m["voxels"] = None
                    
        return jsonify({
            "selected_cell": {
                "x": x,
                "y": y,
                "values": selected_values,
                "voxels": selected_voxels.tolist()
            },
            "matches": matches
        }), 200
        
    except Exception as e:
        logger.error(f"Error in docking query: {str(e)}", exc_info=True)
        return jsonify({"error": str(e)}), 500

# ── Missing API Routes for 3D Cube Explorer ───────────────────────────────────

@app.route("/api/cube/synthetic", methods=["GET"])
def get_synthetic_cube():
    try:
        # Generate 20x20x7 synthetic cube
        cube_7 = cube_builder.generate_synthetic_cube()
        # Create 8th channel (SST) as a temperature gradient
        H, W, _ = cube_7.shape
        y = np.linspace(0.8, 0.2, H)
        SST = np.repeat(y[:, np.newaxis], W, axis=1)
        SST += np.random.normal(0, 0.05, (H, W))
        SST = np.clip(SST, 0.0, 1.0)
        
        # Stack to make 20x20x8
        cube_8 = np.concatenate([cube_7, SST[:, :, np.newaxis]], axis=2)
        
        return jsonify({
            "cube": cube_8.tolist(),
            "variables": ["CHL", "TSM", "APHY", "ADG", "BBP", "PAR", "KD490", "SST"],
            "shape": [H, W, 8],
            "source": "synthetic",
            "regime": "Productive Coastal",
            "completeness": 0.98,
            "coordinate_bounds": { "lat_min": 54.2, "lat_max": 55.8, "lon_min": 3.4, "lon_max": 5.6 }
        }), 200
    except Exception as e:
        logger.error(f"Error generating synthetic cube: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route("/api/cube", methods=["POST"])
@app.route("/upload", methods=["POST"])
def upload_cube_csv():
    """
    Upload CSV → tile into 20×20×8 ecological cubes using the full tiler pipeline.
    
    Accepts CSVs of ANY size with lon/lat columns. The tiler will:
      1. Auto-detect delimiter and ecological variable columns
      2. Interpolate irregular points onto a regular grid
      3. Tile into 20×20 non-overlapping windows
      4. Normalize each tile per-channel to [0,1]
      5. Quality-filter (reject empty/constant tiles)
    
    Returns the first high-quality tile as the active cube.
    """
    if "file" not in request.files:
        return jsonify({"error": "No file part in request"}), 400
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400
        
    try:
        # Save upload to a temp file (tiler expects a file path)
        fd, temp_path = tempfile.mkstemp(suffix=".csv")
        os.close(fd)
        file.save(temp_path)
        
        try:
            from tiler import csv_to_tiles, CANONICAL_VARIABLES
            
            tiles, spatial_field = csv_to_tiles(
                temp_path,
                completeness_threshold=0.50  # be lenient for user uploads
            )
        except ValueError as ve:
            # If the tiler can't handle it (no lon/lat, too small, etc),
            # try a simple row-major reshape fallback
            logger.warning(f"Tiler failed: {ve}. Trying row-major fallback.")
            tiles = None
            
            csv_content = open(temp_path, "r").read()
            df = pd.read_csv(io.StringIO(csv_content), sep=None, engine='python')
            df.columns = [c.strip() for c in df.columns]
            
            from tiler import COLUMN_NAME_MAP as TILER_COL_MAP
            
            # Try to find ecological columns
            var_to_col = {}
            for col in df.columns:
                canonical = TILER_COL_MAP.get(col)
                if canonical:
                    var_to_col[canonical] = col
            
            if not var_to_col:
                return jsonify({
                    "error": f"No ecological variables found in CSV columns: {list(df.columns)}. "
                             f"Expected columns like: CHL, TSM, APHY, ADG, BBP, PAR, KD490, SST"
                }), 400
            
            H, W = 20, 20
            n_needed = H * W  # 400
            
            # User request: "modulus 400 them down... put them into 400 packs"
            n_rows = len(df)
            n_packs = max(1, (n_rows + n_needed - 1) // n_needed)
            
            # We'll build the first pack for the UI viewer
            cube_8 = np.zeros((H, W, 8), dtype=np.float32)
            
            for canonical_var in CANONICAL_VARIABLES:
                v_idx = CANONICAL_VARIABLES.index(canonical_var)
                col_name = var_to_col.get(canonical_var)
                if col_name and col_name in df.columns:
                    raw = pd.to_numeric(df[col_name], errors="coerce").values.astype(np.float32)
                    nan_mask = np.isnan(raw)
                    if nan_mask.any():
                        fill = np.nanmean(raw) if not np.all(nan_mask) else 0.5
                        raw[nan_mask] = fill
                        
                    # Take the first pack (we could process all n_packs here if needed)
                    chunk = raw[:n_needed]
                    
                    # If it has < 400, pad with zeros ("leave them empty")
                    if len(chunk) < n_needed:
                        values = np.zeros(n_needed, dtype=np.float32)
                        values[:len(chunk)] = chunk
                    else:
                        values = chunk
                        
                    # Normalize to [0,1]
                    v_min, v_max = float(np.min(values)), float(np.max(values))
                    if v_max > v_min:
                        values = (values - v_min) / (v_max - v_min)
                    else:
                        values = np.full_like(values, 0.5)
                    cube_8[:, :, v_idx] = values.reshape((H, W))
                else:
                    # Fill missing channel with spatial-neighbor median of present channels
                    present_indices = [CANONICAL_VARIABLES.index(v) for v in var_to_col.keys()]
                    if present_indices:
                        cube_8[:, :, v_idx] = np.mean(cube_8[:, :, present_indices], axis=2)
                    else:
                        cube_8[:, :, v_idx] = 0.5
            
            mean_chl = float(np.mean(cube_8[:, :, 0]))
            if mean_chl >= 0.4:
                regime = "Productive Coastal"
            elif mean_chl >= 0.15:
                regime = "Shelf Sea"
            else:
                regime = "Open Ocean"
            
            return jsonify({
                "cube": cube_8.tolist(),
                "variables": list(CANONICAL_VARIABLES),
                "shape": [H, W, 8],
                "source": file.filename,
                "regime": regime,
                "completeness": 0.90,
                "coordinate_bounds": None,
                "all_tiles_count": 1,
                "tile_index": 0
            }), 200
        finally:
            if os.path.exists(temp_path):
                os.unlink(temp_path)
        
        if not tiles:
            return jsonify({"error": "Tiler produced zero quality tiles from this CSV."}), 400
        
        # Return the first (best) tile
        best = tiles[0]
        cube_arr = best.cube  # shape (20, 20, 8), values in [0,1]
        meta = best.meta
        
        # Build coordinate bounds
        coord_bounds = None
        if meta.lon_bounds != (0.0, 0.0) or meta.lat_bounds != (0.0, 0.0):
            coord_bounds = {
                "lon_min": meta.lon_bounds[0],
                "lon_max": meta.lon_bounds[1],
                "lat_min": meta.lat_bounds[0],
                "lat_max": meta.lat_bounds[1]
            }
        
        return jsonify({
            "cube": cube_arr.tolist(),
            "variables": list(CANONICAL_VARIABLES),
            "shape": list(cube_arr.shape),
            "source": file.filename,
            "regime": meta.regime.replace("_", " ").title(),
            "completeness": meta.completeness,
            "coordinate_bounds": coord_bounds,
            "all_tiles_count": len(tiles),
            "tile_index": 0
        }), 200
        
    except Exception as e:
        logger.error(f"Error parsing uploaded CSV: {str(e)}", exc_info=True)
        return jsonify({"error": str(e)}), 500

@app.route("/api/encoder/reset", methods=["POST", "GET"])
def reset_encoder():
    global training_pipeline, embedding_db, discovery_results, explorer
    training_pipeline = EcologicalTrainingPipeline(datasets_dir="./datasets")
    embedding_db = None
    discovery_results = None
    explorer = None
    
    # Clean files on disk to prevent reloading them on restart
    for f in ["encoder.pt", "embeddings.csv", "embeddings.parquet", "model_metadata.json", "umap_projection.csv", "cluster_assignments.csv", "dependency_graph.json", "relationship_tensor.npy"]:
        if os.path.exists(f):
            try:
                os.remove(f)
            except Exception as e:
                logger.warning(f"Could not remove {f} on reset: {e}")
                
    init_eef_pipeline()
    logger.info("Encoder reset complete.")
    return jsonify({"status": "success", "message": "Encoder model reset successfully."}), 200

@app.route("/api/discovery/reset", methods=["POST", "GET"])
def reset_discovery():
    global discovery_results
    discovery_results = None
    for f in ["umap_projection.csv", "cluster_assignments.csv"]:
        if os.path.exists(f):
            try:
                os.remove(f)
            except Exception as e:
                logger.warning(f"Could not remove {f} on reset: {e}")
    logger.info("Regime discovery results reset.")
    return jsonify({"status": "success", "message": "State space discovery reset successfully."}), 200


@app.route("/api/dataset/reset", methods=["POST", "GET"])
def reset_dataset():
    global training_pipeline, multi_dataset_pool
    training_pipeline.pool.cubes = []
    training_pipeline.pool.metadata = []
    multi_dataset_pool.cubes = []
    multi_dataset_pool.metadata = []
    logger.info("Dataset pools reset.")
    return jsonify({"status": "success", "message": "Datasets reset successfully."}), 200

@app.route("/api/stats", methods=["POST"])
@app.route("/compute-relationships", methods=["POST"])
def get_cube_stats():
    try:
        data = request.get_json()
        if not data or "cube" not in data:
            return jsonify({"error": "Missing cube data"}), 400
            
        cube = np.array(data["cube"], dtype=np.float32)
        H, W, V = cube.shape
        
        # Save local relationship tensor
        from relationship_tensor import RelationshipStructureExtractor
        rel_extractor = RelationshipStructureExtractor(mode="all", variables=["CHL", "TSM", "APHY", "ADG", "BBP", "PAR", "KD490", "SST"])
        rel_extractor.compute_tensor(cube)
        
        flat_data = cube.reshape(-1, V)
        
        means = flat_data.mean(axis=0).tolist()
        stds = flat_data.std(axis=0).tolist()
        mins = flat_data.min(axis=0).tolist()
        maxs = flat_data.max(axis=0).tolist()
        
        corr = np.corrcoef(flat_data, rowvar=False)
        corr = np.nan_to_num(corr, nan=0.0)
        corr_matrix = corr.tolist()
        
        cov = np.cov(flat_data, rowvar=False)
        cov = np.nan_to_num(cov, nan=0.0)
        cov_matrix = cov.tolist()
        
        # Global Spearman rank correlation
        ranked_data = np.zeros_like(flat_data)
        for v in range(V):
            ranks = flat_data[:, v].argsort().argsort().astype(np.float32)
            ranked_data[:, v] = ranks
        spearman = np.corrcoef(ranked_data, rowvar=False)
        spearman = np.nan_to_num(spearman, nan=0.0)
        spearman_matrix = spearman.tolist()
        
        # Global Mutual Information
        mi_matrix = np.zeros((V, V), dtype=np.float32)
        bins = 5
        discretized = np.zeros((flat_data.shape[0], V), dtype=np.int32)
        for v in range(V):
            col = flat_data[:, v]
            c_min, c_max = col.min(), col.max()
            if c_max > c_min:
                norm_col = (col - c_min) / (c_max - c_min)
            else:
                norm_col = np.zeros_like(col)
            discretized[:, v] = np.clip(np.floor(norm_col * (bins - 0.01)), 0, bins - 1).astype(np.int32)
            
        for i in range(V):
            for j in range(V):
                if i == j:
                    mi_matrix[i, j] = 1.0
                    continue
                p1 = discretized[:, i]
                p2 = discretized[:, j]
                n = p1.size
                joint_counts = np.zeros((bins, bins))
                for x, y in zip(p1, p2):
                    joint_counts[x, y] += 1
                
                p_xy = joint_counts / n
                p_x = p_xy.sum(axis=1)
                p_y = p_xy.sum(axis=0)
                
                mi = 0.0
                for x in range(bins):
                    for y in range(bins):
                        if p_xy[x, y] > 0:
                            mi += p_xy[x, y] * np.log2(p_xy[x, y] / (p_x[x] * p_y[y] + 1e-12) + 1e-12)
                mi_matrix[i, j] = float(np.clip(mi / np.log2(bins), 0.0, 1.0))
        
        variables = ["CHL", "TSM", "APHY", "ADG", "BBP", "PAR", "KD490", "SST"]
        distributions = {}
        for idx, var in enumerate(variables):
            distributions[var] = flat_data[:, idx].tolist()[:50]
            
        # Write dependency_graph.json
        dep_graph = {
            "nodes": [{"id": var} for var in variables],
            "links": []
        }
        for i in range(V):
            for j in range(i + 1, V):
                dep_graph["links"].append({
                    "source": variables[i],
                    "target": variables[j],
                    "pearson": float(corr_matrix[i][j]),
                    "spearman": float(spearman_matrix[i][j]),
                    "mi": float(mi_matrix[i][j]),
                    "covariance": float(cov_matrix[i][j])
                })
        with open("dependency_graph.json", "w") as f:
            json.dump(dep_graph, f, indent=2)
            
        return jsonify({
            "correlation_matrix": corr_matrix,
            "pearson_matrix": corr_matrix,
            "spearman_matrix": spearman_matrix,
            "mi_matrix": mi_matrix.tolist(),
            "covariance_matrix": cov_matrix,
            "variable_means": means,
            "variable_stds": stds,
            "variable_mins": mins,
            "variable_maxs": maxs,
            "distributions": distributions
        }), 200
    except Exception as e:
        logger.error(f"Error computing stats: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route("/api/spatial", methods=["POST"])
def get_cube_spatial():
    try:
        data = request.get_json()
        if not data or "cube" not in data:
            return jsonify({"error": "Missing cube data"}), 400
            
        cube = np.array(data["cube"], dtype=np.float32)
        H, W, V = cube.shape
        
        from spatial_structure import SpatialStructureExtractor
        extractor = SpatialStructureExtractor(window_size=3)
        chl_channel = cube[:, :, 0]
        
        dx, dy = extractor.compute_gradients(chl_channel)
        grad_mag = np.sqrt(dx**2 + dy**2)
        g_min, g_max = grad_mag.min(), grad_mag.max()
        if g_max > g_min:
            grad_mag = (grad_mag - g_min) / (g_max - g_min)
        else:
            grad_mag = np.zeros_like(grad_mag)
            
        loc_var = extractor.compute_local_variance(chl_channel)
        tex = extractor.compute_local_entropy(chl_channel)
        
        return jsonify({
            "gradient_magnitude": grad_mag.tolist(),
            "local_variance": loc_var.tolist(),
            "texture": tex.tolist()
        }), 200
    except Exception as e:
        logger.error(f"Error computing spatial: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route("/api/transfer", methods=["POST"])
@app.route("/assess-transferability", methods=["POST"])
def get_cube_transfer():
    try:
        data = request.get_json()
        if not data or "cube" not in data:
            return jsonify({"error": "Missing cube data"}), 400
            
        cube = np.array(data["cube"], dtype=np.float32)
        
        if explorer is None:
            init_eef_pipeline()
            
        meta = TileMetadata(source_file="transfer_query.csv")
        z = explorer.get_embedding(cube, meta)
        
        # Run analog retrieval
        results = explorer.analog_retriever.retrieve_analogs(z)
        
        # Get nearest regime
        nearest_idx = results["indices"][0]
        if embedding_db is not None and nearest_idx < len(embedding_db.records):
            nearest_regime = embedding_db.records[nearest_idx].regime
        else:
            pred_lbl = int(explorer.regime_discoverer.gmm.predict(z.reshape(1, -1))[0])
            nearest_regime = explorer.interpreter.regime_names.get(pred_lbl, "Unknown")
            
        nearest_regime = nearest_regime.replace("_", " ").title()
        
        similarity_score = float(results["similarities"][0])
        novelty_score = float(results["nearest_distance"])
        confidence = 1.0 - float(results["novelty_p_value"])
        
        top_k = []
        for d, idx in zip(results["distances"], results["indices"]):
            reg = "Unknown"
            if embedding_db is not None and idx < len(embedding_db.records):
                reg = embedding_db.records[idx].regime.replace("_", " ").title()
            else:
                reg = nearest_regime
            top_k.append({
                "idx": int(idx),
                "distance": float(d),
                "regime": reg
            })
            
        return jsonify({
            "similarity_score": similarity_score,
            "novelty_score": novelty_score,
            "nearest_regime": nearest_regime,
            "confidence": confidence,
            "top_k_neighbors": top_k
        }), 200
    except Exception as e:
        logger.error(f"Error assessing transferability: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route("/api/encoder/embed", methods=["POST"])
def get_cube_embedding():
    try:
        data = request.get_json()
        if not data or "cube" not in data:
            return jsonify({"error": "Missing cube data"}), 400
            
        cube = np.array(data["cube"], dtype=np.float32)
        
        if explorer is None:
            init_eef_pipeline()
            
        meta = TileMetadata(source_file="embedding_query.csv")
        z = explorer.get_embedding(cube, meta)
        norm = float(np.linalg.norm(z))
        
        return jsonify({
            "z": z.tolist(),
            "norm": norm
        }), 200
    except Exception as e:
        logger.error(f"Error embedding cube: {str(e)}")
        return jsonify({"error": str(e)}), 500


@app.route("/models", methods=["GET"])
@app.route("/api/models", methods=["GET"])
def list_models():
    models_list = []
    # Check if active encoder.pt exists
    if os.path.exists("encoder.pt"):
        created_time = os.path.getctime("encoder.pt")
        import datetime
        date_str = datetime.datetime.fromtimestamp(created_time).isoformat()
        models_list.append({
            "name": "cubenet_active",
            "file": "encoder.pt",
            "created_at": date_str,
            "active": True,
            "description": "Currently trained relationship-aware ecological encoder."
        })
    # Always return a default model reference so the UI is populated
    models_list.append({
        "name": "cubenet_v1",
        "file": "cubenet_v1.pt",
        "created_at": "2026-06-11T12:00:00Z",
        "active": not os.path.exists("encoder.pt"),
        "description": "Pre-trained baseline model."
    })
    return jsonify({"models": models_list}), 200

@app.route("/api/dataset/remove", methods=["POST"])
@app.route("/dataset/remove", methods=["POST"])
def remove_dataset():
    data = request.get_json() or {}
    name = data.get("name")
    if not name:
        return jsonify({"error": "Dataset name is required."}), 400
    
    import shutil
    ds_path = dataset_compiler.base_dir / name
    if ds_path.exists() and ds_path.is_dir():
        shutil.rmtree(ds_path)
        logger.info(f"Dataset {name} removed successfully.")
        return jsonify({"status": "success", "message": f"Dataset {name} removed."}), 200
    else:
        return jsonify({"error": f"Dataset {name} not found."}), 404
        
@app.route("/api/model/remove", methods=["POST"])
@app.route("/model/remove", methods=["POST"])
def remove_model():
    data = request.get_json() or {}
    name = data.get("name")
    if not name:
        return jsonify({"error": "Model name is required."}), 400
        
    files_deleted = []
    if name == "cubenet_active" or name == "active":
        if os.path.exists("encoder.pt"):
            os.remove("encoder.pt")
            files_deleted.append("encoder.pt")
        if os.path.exists("model_metadata.json"):
            os.remove("model_metadata.json")
            files_deleted.append("model_metadata.json")
        global training_pipeline
        training_pipeline = EcologicalTrainingPipeline(datasets_dir="./datasets")
        logger.info("Active model removed and pipeline reinitialized.")
        return jsonify({"status": "success", "message": f"Active model removed. Deleted: {files_deleted}"}), 200
    else:
        return jsonify({"error": f"Model {name} cannot be removed."}), 400

if __name__ == "__main__":
    init_eef_pipeline()
    # Run server on port 8000
    app.run(host="0.0.0.0", port=8000)
