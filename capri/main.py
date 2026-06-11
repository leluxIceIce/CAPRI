"""
EEF Main Pipeline.

Coordinates the complete 7-layer Ecological Encoding Framework:
L1. Observation Cube Ingestion
L2. Spatial Structure Extraction
L3. Relationship Tensor Engine
L4. Ecological Encoding Layer
L5. Contrastive Representation Learning
L6. Ecological Potential Space Mapping & Visualization
L7. Scientific Exploration Dashboard
"""

import numpy as np
import torch
import logging
import os
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
from visualization import (
    plot_latent_space, plot_variable_profiles,
    plot_shepard_diagram, plot_transition_probabilities
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger("CapriEEFPipeline")

def run_pipeline():
    # Setup directories
    os.makedirs("plots", exist_ok=True)
    
    logger.info("Initializing EEF Pipeline — Layer 1: Ecological Cube Ingestion...")
    grid_shape = (20, 20)
    variables = ["CHL", "aphy", "ADG", "bbp", "TSM", "PAR", "KD490"]
    
    # 1. Builders & Extractors
    cube_builder = EcologicalCubeBuilder(grid_shape=grid_shape, variables=variables)
    spatial_extractor = SpatialStructureExtractor(window_size=3)
    relationship_extractor = RelationshipStructureExtractor(mode="all", variables=variables)
    ecological_encoder = EcologicalEncoder(
        spatial_extractor=spatial_extractor,
        relationship_extractor=relationship_extractor
    )
    
    # 2. Data Construction (Layer 1-4)
    logger.info("Generating dataset of synthetic observation cubes (preserving spatial structure)...")
    base_cubes = [cube_builder.generate_synthetic_cube(seed=i) for i in range(40)]
    
    # Encode all cubes deterministically into inspectable EcologicalEncoding objects
    logger.info("Encoding cubes into inspectable EcologicalEncoding fingerprints...")
    encodings = []
    for idx, cube in enumerate(base_cubes):
        meta = TileMetadata(source_file=f"cube_{idx}.csv")
        # Assign coordinates for spatial adjacency tests
        meta.coordinates = (idx // 10, idx % 10)
        meta.timestamp = f"2026-06-10T12:00:00"
        encodings.append(ecological_encoder.encode(cube, meta))
        
    # Inspect the first encoding to show pre-ML scientific review
    logger.info("Printing sample pre-ML Ecological Encoding Inspection Report:")
    print(encodings[0].inspect())
    
    # Concatenated total input dimensions
    in_channels = len(encodings[0].channel_manifest)
    logger.info(f"Deterministic Ingestion Complete. Total Concatenated Channels = {in_channels}")
    
    # 3. Stage II: Representation Learning (Layer 5)
    logger.info("Initializing Layer 5: Pair Generation & Fingerprint Encoding...")
    pair_dataset = EcologicalPairDataset(
        encodings=encodings,
        encoder=ecological_encoder
    )
    
    # Initialize encoder model
    encoder_model = EcologicalFingerprintEncoder(in_channels=in_channels, latent_dim=128)
    
    # Train contrastively
    logger.info("Training Ecological Fingerprint Encoder contrastively (InfoNCE loss)...")
    losses, _, _ = train_contrastive_model(
        model=encoder_model,
        dataset=pair_dataset,
        epochs=5,
        batch_size=8,
        lr=1e-3,
        device="cpu"
    )
    logger.info(f"Contrastive training complete. Losses: {[f'{l:.4f}' for l in losses]}")
    
    # 4. Generate Latent Space Embeddings Z (Layer 6)
    logger.info("Mapping encodings to Ecological Potential Space (EPS) embeddings Z...")
    encoder_model.eval()
    embeddings = []
    with torch.no_grad():
        for enc in encodings:
            t = enc.to_tensor().unsqueeze(0)  # (1, C, H, W)
            z = encoder_model(t).squeeze(0).numpy()
            embeddings.append(z)
            
    Z = np.array(embeddings)
    logger.info(f"EPS Latent Matrix Z shape = {Z.shape}")
    
    # 5. Fit Stage III Clustering (HDBSCAN/GMM)
    logger.info("Fitting Regime Discovery (GMM & HDBSCAN)...")
    discoverer = RegimeDiscoverer(n_regimes=4, reduction_method="pca", n_components=2)
    Z_proj = discoverer.fit_transform_latent_space(Z)
    hdbscan_labels, gmm_probs, gmm_labels = discoverer.discover_regimes(Z)
    
    # Setup Analog Retriever
    retriever = EcologicalAnalogRetriever(metric="cosine", n_neighbors=5)
    retriever.fit(Z)
    
    # Setup Interpreter
    interpreter = EcologicalInterpreter(variable_names=variables)
    interpreter.auto_name_regimes(base_cubes, gmm_labels)
    
    # 6. Compute EPS Diagnostics and Scientific Metrics (Layer 6)
    logger.info("Computing EPS Manifold & Scientific Quality Metrics:")
    manifold_metrics = discoverer.compute_manifold_metrics(Z, Z_proj)
    cluster_metrics = discoverer.compute_regime_separation(Z, gmm_labels)
    coherence_metrics = discoverer.compute_ecological_coherence(base_cubes, gmm_labels, variables)
    
    print("-" * 60)
    print("📈 SCIENTIFIC PIPELINE DIAGNOSTIC REPORT")
    print("-" * 60)
    print(f"Manifold Trustworthiness     : {manifold_metrics['trustworthiness']:.4f}")
    print(f"Manifold Shepard Correlation : {manifold_metrics['shepard_correlation']:.4f}")
    print(f"Regime Silhouette Score      : {cluster_metrics['silhouette']:.4f}")
    print(f"Regime Davies-Bouldin Index  : {cluster_metrics['davies_bouldin']:.4f}")
    print(f"Mean Ecological Coherence    : {coherence_metrics['mean_ecological_coherence']:.4f}")
    print("-" * 60)
    
    # 7. Generate EPS Visualizations (Layer 6)
    logger.info("Generating scientific visualization plots in './plots/'...")
    plot_latent_space(Z_proj, gmm_labels, "plots/eps_latent_space.png")
    plot_variable_profiles(base_cubes, gmm_labels, variables, "plots/regime_variable_profiles.png")
    plot_shepard_diagram(Z, Z_proj, "plots/shepard_diagram.png")
    plot_transition_probabilities(Z_proj, discoverer.gmm, discoverer.reducer, "plots/transition_boundaries.png")
    logger.info("Plots saved successfully.")
    
    # 8. Launch Unified Explorer workflow (Layer 7)
    logger.info("Launching Layer 7 Scientific Explorer...")
    explorer = EcologicalExplorer(
        encoder_model=encoder_model,
        encoder_pipeline=ecological_encoder,
        regime_discoverer=discoverer,
        analog_retriever=retriever,
        interpreter=interpreter
    )
    
    # Assessment query
    query_cube = cube_builder.generate_synthetic_cube(seed=999)
    logger.info("Running Explorer query on a new observation cube...")
    assessment = explorer.query(query_cube, source_file="satellite_ingest_999.csv")
    explorer.interpreter.print_assessment_report(assessment)
    
    # Novelty Detection
    logger.info("Running Explorer novelty detection...")
    novelty_report = explorer.detect_novelty(query_cube)
    print("NOVELTY ANALYSIS:")
    print(f"  Is Statistically Novel : {novelty_report['is_novel']}")
    print(f"  Confidence Level       : {novelty_report['confidence']}")
    print(f"  Explanation            : {novelty_report['explanation']}")
    print("=" * 60)
    
    # Compare tiles
    logger.info("Comparing two ecosystems (Cube 0 vs Cube 5)...")
    comp = explorer.compare(base_cubes[0], base_cubes[5])
    print("COMPARISON REPORT (C0 vs C5):")
    print(f"  Latent Cosine Distance : {comp['cosine_distance']:.4f}")
    print(f"  Latent Euclidean Dist  : {comp['euclidean_distance']:.4f}")
    print("  Variable Profile Differences:")
    for var, v_diff in comp["variable_differences"].items():
        print(f"    {var:<8} - C0: {v_diff['val_a']:.3f} | C5: {v_diff['val_b']:.3f} | Diff: {v_diff['absolute_diff']:.3f}")
    print("=" * 60)

if __name__ == "__main__":
    run_pipeline()
