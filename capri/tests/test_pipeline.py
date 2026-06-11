"""
EEF Pipeline Tests — Layer-by-layer validation.
"""
import pytest
import numpy as np
import torch
import pandas as pd
import tempfile
from pathlib import Path

from cube_builder import (
    EcologicalCubeBuilder, EcologicalTileManager, TileMetadata,
    CANONICAL_VARIABLES, COLUMN_NAME_MAP,
)
from relationship_tensor import RelationshipStructureExtractor
from spatial_structure import SpatialStructureExtractor
from ecological_encoder import EcologicalEncoder, EcologicalEncoding
from models import EcologicalFingerprintEncoder
from contrastive_learner import (
    EcologicalPairDataset, ContrastiveLoss,
    PhysicalPerturbationPairs, SpatialAdjacencyPairs,
    TemporalNeighborPairs, SeasonalAnalogPairs,
)
from regime_discovery import RegimeDiscoverer
from analog_retrieval import EcologicalAnalogRetriever
from interpreter import EcologicalInterpreter


# ── Layer 1: Ecological Cube ──────────────────────────────────────────────────

class TestLayer1CubeBuilder:

    def test_canonical_defaults(self):
        builder = EcologicalCubeBuilder()
        assert builder.grid_shape == (20, 20)
        assert builder.variables == CANONICAL_VARIABLES
        assert builder.num_variables == 7

    def test_synthetic_cube_shape_and_bounds(self):
        builder = EcologicalCubeBuilder()
        cube = builder.generate_synthetic_cube(seed=42)
        assert cube.shape == (20, 20, 7)
        assert not np.isnan(cube).any()
        assert cube.min() >= 0.0
        assert cube.max() <= 1.0

    def test_custom_grid_shape(self):
        builder = EcologicalCubeBuilder(grid_shape=(16, 16), variables=["A", "B", "C"])
        cube = builder.generate_synthetic_cube(seed=0)
        assert cube.shape == (16, 16, 3)

    def test_csv_ingestion(self):
        """Test CSV ingestion with realistic SNAP-style column names."""
        builder = EcologicalCubeBuilder()
        # Create a fake CSV with SNAP-style column names and 400 rows
        rng = np.random.default_rng(123)
        df = pd.DataFrame({
            "CHL_NN":     rng.random(400) * 5.0,
            "aphy_443":   rng.random(400) * 0.1,
            "ADG443_NN":  rng.random(400) * 0.5,
            "bbp_443":    rng.random(400) * 0.02,
            "TSM_NN":     rng.random(400) * 3.0,
            "PAR":        rng.random(400) * 60.0,
            "KD490_M07":  rng.random(400) * 0.3,
        })
        with tempfile.NamedTemporaryFile(suffix=".csv", mode="w", delete=False) as f:
            df.to_csv(f, index=False)
            csv_path = f.name

        cube, meta = builder.build_from_csv(csv_path)
        assert cube.shape == (20, 20, 7)
        assert not np.isnan(cube).any()
        assert cube.min() >= 0.0
        assert cube.max() <= 1.0
        assert meta.source_file != ""
        assert meta.regime in ("coastal", "shallow_sea", "deep_sea")
        Path(csv_path).unlink()

    def test_csv_semicolon_delimiter(self):
        """Test CSV with semicolon delimiter (common in EU data)."""
        builder = EcologicalCubeBuilder()
        rng = np.random.default_rng(456)
        df = pd.DataFrame({
            "CHL_NN":     rng.random(400),
            "aphy_443":   rng.random(400),
            "ADG443_NN":  rng.random(400),
            "bbp_443":    rng.random(400),
            "TSM_NN":     rng.random(400),
            "PAR":        rng.random(400),
            "KD490_M07":  rng.random(400),
        })
        with tempfile.NamedTemporaryFile(suffix=".csv", mode="w", delete=False) as f:
            df.to_csv(f, index=False, sep=";")
            csv_path = f.name

        cube, meta = builder.build_from_csv(csv_path)
        assert cube.shape == (20, 20, 7)
        Path(csv_path).unlink()

    def test_regime_auto_detection(self):
        builder = EcologicalCubeBuilder()
        # High CHL → coastal
        cube_high = np.zeros((20, 20, 7), dtype=np.float32)
        cube_high[:, :, 0] = 0.8  # CHL
        assert builder._detect_regime(cube_high, CANONICAL_VARIABLES) == "coastal"
        # Low CHL → shallow_sea
        cube_mid = np.zeros((20, 20, 7), dtype=np.float32)
        cube_mid[:, :, 0] = 0.2
        assert builder._detect_regime(cube_mid, CANONICAL_VARIABLES) == "shallow_sea"
        # Near-null CHL → deep_sea
        cube_low = np.zeros((20, 20, 7), dtype=np.float32)
        cube_low[:, :, 0] = 0.05
        assert builder._detect_regime(cube_low, CANONICAL_VARIABLES) == "deep_sea"

    def test_tile_manager(self):
        builder = EcologicalCubeBuilder()
        mgr = EcologicalTileManager(storage_dir=tempfile.mkdtemp())
        for i in range(3):
            cube = builder.generate_synthetic_cube(seed=i)
            meta = TileMetadata(source_file=f"test_{i}.csv", regime="coastal")
            mgr.add(cube, meta)
        assert len(mgr.tiles) == 3
        assert len(mgr.get_cubes()) == 3
        assert len(mgr.get_by_regime("coastal")) == 3
        assert "3 tiles" in mgr.summary()

    def test_dataframe_ingestion(self):
        builder = EcologicalCubeBuilder(grid_shape=(16, 16), variables=["A", "B", "C"])
        df = pd.DataFrame({
            "A": np.random.rand(256),
            "B": np.random.rand(256),
            "C": np.random.rand(256),
        })
        cubes = builder.build_from_dataframe(df)
        assert len(cubes) == 1
        assert cubes[0].shape == (16, 16, 3)


# ── Layer 2: Spatial Structure ────────────────────────────────────────────────

class TestLayer2SpatialStructure:

    def test_spatial_structure_shape(self):
        cube = np.random.rand(20, 20, 7).astype(np.float32)
        extractor = SpatialStructureExtractor(window_size=3)
        P = extractor.compute_tensor(cube)
        # 7 variables × 9 features each = 63
        assert P.data.shape == (20, 20, 63)
        assert not np.isnan(P.data).any()
        assert len(P.feature_names) == 63


# ── Layer 3: Relationship Structure ───────────────────────────────────────────

class TestLayer3Relationships:

    def test_correlation_mode_shape(self):
        cube = np.random.rand(20, 20, 7).astype(np.float32)
        extractor = RelationshipStructureExtractor(mode="correlation")
        R = extractor.compute_tensor(cube)
        # 7 choose 2 = 21 pairs
        assert R.data.shape == (20, 20, 21)
        assert not np.isnan(R.data).any()

    def test_mutual_information_mode_shape(self):
        cube = np.random.rand(20, 20, 7).astype(np.float32)
        extractor = RelationshipStructureExtractor(mode="mutual_information")
        R = extractor.compute_tensor(cube)
        # 7 choose 2 = 21 pairs
        assert R.data.shape == (20, 20, 21)
        assert not np.isnan(R.data).any()

    def test_ratios_and_indices_modes(self):
        cube = np.random.rand(20, 20, 7).astype(np.float32)
        ratios_extractor = RelationshipStructureExtractor(mode="ratios")
        R_ratios = ratios_extractor.compute_tensor(cube)
        assert R_ratios.data.shape == (20, 20, 5)

        indices_extractor = RelationshipStructureExtractor(mode="indices")
        R_indices = indices_extractor.compute_tensor(cube)
        assert R_indices.data.shape == (20, 20, 4)

    def test_all_mode_shape(self):
        cube = np.random.rand(20, 20, 7).astype(np.float32)
        extractor = RelationshipStructureExtractor(mode="all")
        R = extractor.compute_tensor(cube)
        # 21 + 21 + 21 + 21 = 84 channels
        assert R.data.shape == (20, 20, 84)
        assert not np.isnan(R.data).any()


# ── Layer 4: Ecological Encoding ──────────────────────────────────────────────

class TestLayer4Encoding:

    def test_ecological_encoder_assembly(self):
        builder = EcologicalCubeBuilder()
        cube = builder.generate_synthetic_cube(seed=42)
        meta = TileMetadata(source_file="synthetic_42.csv", regime="coastal")
        
        encoder = EcologicalEncoder()
        encoding = encoder.encode(cube, meta)
        
        assert isinstance(encoding, EcologicalEncoding)
        assert encoding.cube.shape == (20, 20, 7)
        assert encoding.spatial_descriptors.data.shape == (20, 20, 63)
        assert encoding.relationship_descriptors.data.shape == (20, 20, 84)
        
        # Test outputs
        tensor = encoding.to_tensor()
        assert tensor.shape == (282, 20, 20)
        assert not torch.isnan(tensor).any()
        
        # Manifest checks
        assert len(encoding.channel_manifest) == 282
        assert encoding.channel_manifest[0] == "CHL"
        assert encoding.channel_manifest[7] == "corr_CHL_aphy"
        assert encoding.channel_manifest[-129] == "KD490_texture_contrast"
        
        # Inspect string check
        report = encoding.inspect()
        assert "ECOLOGICAL ENCODING INSPECTION REPORT" in report
        assert "Total Input Channels   : 282" in report


# ── Layer 5: Representation Learning ─────────────────────────────────────────

class TestLayer5Representation:

    def _get_in_channels(self):
        """Calculate total input channels for 7 variables."""
        V = 7
        V_pairs = 84                  # 21 (corr) + 21 (spearman) + 21 (mi) + 21 (cov)
        V_spatial = V * 9             # 63
        return V + V_pairs + V_spatial + 128  # 282

    def test_encoder_forward(self):
        in_ch = self._get_in_channels()
        x = torch.randn(2, in_ch, 20, 20)
        encoder = EcologicalFingerprintEncoder(in_channels=in_ch, latent_dim=128)
        z = encoder(x)
        assert z.shape == (2, 128)

    def test_contrastive_loss(self):
        z_i = torch.randn(4, 128)
        z_j = torch.randn(4, 128)
        criterion = ContrastiveLoss(temperature=0.5)
        loss = criterion(z_i, z_j)
        assert loss.item() > 0.0

    def test_pair_dataset(self):
        cubes = [np.random.rand(20, 20, 7).astype(np.float32) for _ in range(4)]
        spatial_extractor = SpatialStructureExtractor(window_size=3)
        rel = RelationshipStructureExtractor(mode="all")
        ds = EcologicalPairDataset.from_cubes(
            cubes=cubes,
            spatial_extractor=spatial_extractor,
            relationship_extractor=rel,
        )
        assert len(ds) == 4
        x_i, x_j = ds[0]
        in_ch = self._get_in_channels()
        assert x_i.shape == (in_ch, 20, 20)
        assert x_j.shape == (in_ch, 20, 20)

    def test_pair_strategies(self):
        cubes = [np.random.rand(20, 20, 7).astype(np.float32) for _ in range(4)]
        spatial_extractor = SpatialStructureExtractor(window_size=3)
        rel = RelationshipStructureExtractor(mode="all")
        
        # Build dataset manually with custom metadata to test strategies
        encoder = EcologicalEncoder(spatial_extractor=spatial_extractor, relationship_extractor=rel)
        encodings = []
        for idx, cube in enumerate(cubes):
            meta = TileMetadata(source_file=f"cube_{idx}.csv")
            meta.coordinates = (idx, 0)  # adjacent coordinates
            # Adjacent timestamps
            meta.timestamp = f"2026-06-{10+idx:02d}T12:00:00"
            encodings.append(encoder.encode(cube, meta))
            
        # 1. Physical Perturbation
        ds_phys = EcologicalPairDataset(encodings, pair_strategy=PhysicalPerturbationPairs(), encoder=encoder)
        xi, xj = ds_phys[0]
        assert xi.shape == (282, 20, 20)
        
        # 2. Spatial Adjacency
        ds_space = EcologicalPairDataset(encodings, pair_strategy=SpatialAdjacencyPairs(), encoder=encoder)
        xi, xj = ds_space[0]
        assert xi.shape == (282, 20, 20)
        
        # 3. Temporal Neighbor
        ds_time = EcologicalPairDataset(encodings, pair_strategy=TemporalNeighborPairs(max_delta_days=2.0), encoder=encoder)
        xi, xj = ds_time[0]
        assert xi.shape == (282, 20, 20)
        
        # 4. Seasonal Analog
        # Modify seasons for testing
        encodings[0].metadata.timestamp = "2025-06-10T12:00:00"
        encodings[1].metadata.timestamp = "2026-06-12T12:00:00"  # Match June, different year
        ds_season = EcologicalPairDataset(encodings, pair_strategy=SeasonalAnalogPairs(), encoder=encoder)
        xi, xj = ds_season[0]
        assert xi.shape == (282, 20, 20)


# ── Layer 6–7: Regime Discovery & Exploration ─────────────────────────────────

class TestLayer6And7:

    def test_regime_discovery_and_extensions(self):
        Z = np.random.randn(50, 128).astype(np.float32)
        disc = RegimeDiscoverer(n_regimes=3, reduction_method="pca")
        proj = disc.fit_transform_latent_space(Z)
        assert proj.shape == (50, 2)
        
        # Discover regimes
        hdbscan_labels, gmm_probs, gmm_labels = disc.discover_regimes(Z)
        assert len(hdbscan_labels) == 50
        assert gmm_probs.shape == (50, 3)
        
        # Test quality metrics
        metrics = disc.compute_manifold_metrics(Z, proj)
        assert "trustworthiness" in metrics
        assert "shepard_correlation" in metrics
        assert 0.0 <= metrics["trustworthiness"] <= 1.0
        
        # Test cluster separation
        sep = disc.compute_regime_separation(Z, gmm_labels)
        assert "silhouette" in sep
        assert "davies_bouldin" in sep
        
        # Test ecological coherence
        cubes = [np.random.rand(20, 20, 7).astype(np.float32) for _ in range(50)]
        coherence = disc.compute_ecological_coherence(cubes, gmm_labels, ["CHL", "aphy", "ADG", "bbp", "TSM", "PAR", "KD490"])
        assert "mean_ecological_coherence" in coherence
        assert "CHL_coherence" in coherence

    def test_analog_retrieval_and_trajectory(self):
        Z = np.random.randn(20, 128).astype(np.float32)
        ret = EcologicalAnalogRetriever(metric="cosine", n_neighbors=3)
        ret.fit(Z)
        
        # Test statistical novelty
        q = np.random.randn(128).astype(np.float32)
        res = ret.retrieve_analogs(q)
        assert len(res["indices"]) == 3
        assert "is_novel_statistically" in res
        assert "novelty_confidence" in res
        
        # Test trajectory
        seq = np.random.randn(5, 128).astype(np.float32)
        traj = ret.explore_trajectory(seq, labels_sequence=[0, 0, 1, 1, 2])
        assert len(traj["velocities"]) == 4
        assert len(traj["accelerations"]) == 3
        assert traj["cumulative_distance"] > 0.0
        assert len(traj["transitions"]) == 2

    def test_plotting_functions(self):
        import tempfile
        import os
        from visualization import (
            plot_latent_space, plot_variable_profiles,
            plot_shepard_diagram, plot_transition_probabilities
        )
        
        Z = np.random.randn(10, 128).astype(np.float32)
        Z_proj = np.random.randn(10, 2).astype(np.float32)
        labels = np.array([0, 0, 0, 1, 1, 1, 2, 2, 2, 2])
        
        with tempfile.TemporaryDirectory() as tmpdir:
            # Test 1: Latent space plot
            path1 = os.path.join(tmpdir, "latent.png")
            plot_latent_space(Z_proj, labels, path1)
            assert os.path.exists(path1)
            
            # Test 2: Variable profile plot
            cubes = [np.random.rand(20, 20, 7).astype(np.float32) for _ in range(10)]
            path2 = os.path.join(tmpdir, "profiles.png")
            plot_variable_profiles(cubes, labels, ["CHL", "aphy", "ADG", "bbp", "TSM", "PAR", "KD490"], path2)
            assert os.path.exists(path2)
            
            # Test 3: Shepard plot
            path3 = os.path.join(tmpdir, "shepard.png")
            plot_shepard_diagram(Z, Z_proj, path3)
            assert os.path.exists(path3)
            
            # Test 4: Transition map
            path4 = os.path.join(tmpdir, "transition.png")
            disc = RegimeDiscoverer(n_regimes=3, reduction_method="pca")
            _ = disc.fit_transform_latent_space(Z)
            _, _, gmm_labels = disc.discover_regimes(Z)
            plot_transition_probabilities(Z_proj, disc.gmm, disc.reducer, path4)
            assert os.path.exists(path4)

    def test_explorer_workflow(self):
        from explorer import EcologicalExplorer
        
        # Setup mock components
        grid_shape = (20, 20)
        variables = ["CHL", "aphy", "ADG", "bbp", "TSM", "PAR", "KD490"]
        
        # Build dataset
        builder = EcologicalCubeBuilder(grid_shape=grid_shape, variables=variables)
        cubes = [builder.generate_synthetic_cube(seed=i) for i in range(15)]
        
        spatial_extractor = SpatialStructureExtractor(window_size=3)
        rel_extractor = RelationshipStructureExtractor(mode="all", variables=variables)
        
        encoder_pipeline = EcologicalEncoder(spatial_extractor, rel_extractor)
        
        in_ch = 282
        model = EcologicalFingerprintEncoder(in_channels=in_ch, latent_dim=128)
        
        # Generate embeddings
        embeddings = []
        for cube in cubes:
            enc = encoder_pipeline.encode(cube, TileMetadata())
            t = enc.to_tensor().unsqueeze(0)
            with torch.no_grad():
                z = model(t).squeeze(0).numpy()
            embeddings.append(z)
        Z = np.array(embeddings)
        
        # Fit clustering and retrieval
        disc = RegimeDiscoverer(n_regimes=3)
        _, _, gmm_labels = disc.discover_regimes(Z)
        
        ret = EcologicalAnalogRetriever(n_neighbors=3)
        ret.fit(Z)
        
        interpreter = EcologicalInterpreter(variable_names=variables)
        interpreter.auto_name_regimes(cubes, gmm_labels)
        
        # Create Explorer
        explorer = EcologicalExplorer(
            encoder_model=model,
            encoder_pipeline=encoder_pipeline,
            regime_discoverer=disc,
            analog_retriever=ret,
            interpreter=interpreter
        )
        
        # 1. Query
        q_cube = builder.generate_synthetic_cube(seed=999)
        report = explorer.query(q_cube)
        assert "regime" in report
        assert "variables_profile" in report
        
        # 2. Compare
        comp = explorer.compare(cubes[0], cubes[1])
        assert "euclidean_distance" in comp
        assert "variable_differences" in comp
        
        # 3. Detect novelty
        novelty = explorer.detect_novelty(q_cube)
        assert "is_novel" in novelty
        assert "explanation" in novelty
        
        # 4. Find transitions
        seq = [builder.generate_synthetic_cube(seed=s) for s in range(5)]
        traj = explorer.find_transitions(seq)
        assert "velocities" in traj
        assert "cumulative_distance" in traj
