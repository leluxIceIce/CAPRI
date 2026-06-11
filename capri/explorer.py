"""
EEF Layer 7 — Scientific Exploration Toolkit.

Provides a unified research interface (EcologicalExplorer) for querying,
comparing, tracking trajectories, and assessing novelty of ecological cubes.
"""

import numpy as np
import torch
from typing import List, Dict, Any, Tuple, Optional
from cube_builder import TileMetadata
from ecological_encoder import EcologicalEncoder, EcologicalEncoding
from models import EcologicalFingerprintEncoder
from regime_discovery import RegimeDiscoverer
from analog_retrieval import EcologicalAnalogRetriever
from interpreter import EcologicalInterpreter
from visualization import (
    plot_latent_space, plot_variable_profiles,
    plot_shepard_diagram, plot_transition_probabilities
)

class EcologicalExplorer:
    """
    EEF Layer 7: Ecological Explorer.
    
    A unified, high-level scientific research interface wrapping the entire
    Ecological Encoding Framework (EEF) pipeline. Allows scientists to query tiles,
    compare ecosystems, track temporal trajectories, and perform statistical novelty detection.
    """
    def __init__(
        self,
        encoder_model: EcologicalFingerprintEncoder,
        encoder_pipeline: EcologicalEncoder,
        regime_discoverer: RegimeDiscoverer,
        analog_retriever: EcologicalAnalogRetriever,
        interpreter: EcologicalInterpreter
    ):
        self.encoder_model = encoder_model
        self.encoder_pipeline = encoder_pipeline
        self.regime_discoverer = regime_discoverer
        self.analog_retriever = analog_retriever
        self.interpreter = interpreter

        self.encoder_model.eval()

    def get_embedding(self, cube: np.ndarray, metadata: TileMetadata) -> np.ndarray:
        """Helper to get the 128-dim latent vector for a cube."""
        encoding = self.encoder_pipeline.encode(cube, metadata)
        tensor = encoding.to_tensor().unsqueeze(0)  # Shape (1, C, H, W)
        with torch.no_grad():
            z = self.encoder_model(tensor)
        return z.squeeze(0).numpy()

    def query(self, cube: np.ndarray, source_file: str = "query.csv") -> Dict[str, Any]:
        """
        Runs the full assessment pipeline for a single ecological cube.
        """
        meta = TileMetadata(source_file=source_file)
        z = self.get_embedding(cube, meta)
        
        # Analog retrieval
        analog_results = self.analog_retriever.retrieve_analogs(z)
        
        # Probabilities
        gmm_probs = self.regime_discoverer.gmm.predict_proba(z.reshape(1, -1))[0]
        
        # HDBSCAN label
        nearest_idx = analog_results["indices"][0]
        hdbscan_label = self.regime_discoverer.hdbscan_clusterer.labels_[nearest_idx]
        
        # Generate assessment
        assessment = self.interpreter.generate_assessment(
            sample_cube=cube,
            gmm_prob_single=gmm_probs,
            hdbscan_label=hdbscan_label,
            analog_results=analog_results
        )
        
        return assessment

    def compare(self, cube_a: np.ndarray, cube_b: np.ndarray) -> Dict[str, Any]:
        """
        Compares two ecological cubes and returns their Euclidean and cosine distance
        in latent space, alongside their profile differences.
        """
        meta_a = TileMetadata(source_file="compare_a.csv")
        meta_b = TileMetadata(source_file="compare_b.csv")
        
        z_a = self.get_embedding(cube_a, meta_a)
        z_b = self.get_embedding(cube_b, meta_b)
        
        # Distance calculations
        euclidean_dist = float(np.linalg.norm(z_a - z_b))
        cosine_dist = float(1.0 - np.dot(z_a, z_b) / (np.linalg.norm(z_a) * np.linalg.norm(z_b) + 1e-12))
        
        # Variable profile differences
        means_a = cube_a.mean(axis=(0, 1))
        means_b = cube_b.mean(axis=(0, 1))
        
        diff = {}
        for idx, var in enumerate(self.interpreter.variable_names):
            diff[var] = {
                "val_a": float(means_a[idx]),
                "val_b": float(means_b[idx]),
                "absolute_diff": float(abs(means_a[idx] - means_b[idx]))
            }
            
        return {
            "euclidean_distance": euclidean_dist,
            "cosine_distance": cosine_dist,
            "variable_differences": diff
        }

    def detect_novelty(self, cube: np.ndarray) -> Dict[str, Any]:
        """
        Performs detailed novelty detection for an ecological cube with statistical explanations.
        """
        meta = TileMetadata(source_file="novelty_test.csv")
        z = self.get_embedding(cube, meta)
        
        results = self.analog_retriever.retrieve_analogs(z)
        
        explanation = ""
        if results["is_novel_statistically"]:
            explanation = (
                f"Highly novel ecological state. The closest match in our historical archive "
                f"has a distance of {results['nearest_distance']:.4f}, which is statistically significant "
                f"(p-value = {results['novelty_p_value']:.4f}, confidence = {results['novelty_confidence']})."
            )
        else:
            explanation = (
                f"Standard ecological state. Closest historical match has a distance of "
                f"{results['nearest_distance']:.4f}, which lies within normal operational variability "
                f"(p-value = {results['novelty_p_value']:.4f})."
            )
            
        return {
            "is_novel": results["is_novel_statistically"],
            "p_value": results["novelty_p_value"],
            "confidence": results["novelty_confidence"],
            "nearest_distance": results["nearest_distance"],
            "explanation": explanation
        }

    def find_transitions(self, sequence: List[np.ndarray]) -> Dict[str, Any]:
        """
        Tracks a temporal trajectory of cubes, computing velocities, accelerations,
        and identifying regime boundaries.
        """
        meta = TileMetadata()
        Z_seq = []
        labels_seq = []
        
        for cube in sequence:
            z = self.get_embedding(cube, meta)
            Z_seq.append(z)
            lbl = int(self.regime_discoverer.gmm.predict(z.reshape(1, -1))[0])
            labels_seq.append(lbl)
            
        Z_seq = np.array(Z_seq)
        
        trajectory_results = self.analog_retriever.explore_trajectory(Z_seq, labels_seq)
        
        # Identify critical transitions (high velocity state shifts)
        critical_transitions = []
        for transition in trajectory_results["transitions"]:
            if transition["velocity"] > np.mean(trajectory_results["velocities"]):
                critical_transitions.append(transition)
                
        trajectory_results["critical_transitions"] = critical_transitions
        return trajectory_results
