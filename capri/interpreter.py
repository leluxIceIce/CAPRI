import numpy as np
from typing import Dict, Any, List

class EcologicalInterpreter:
    """
    Stage III - Layer 9: Ecological State Interpretation Layer.
    Translates raw latent features, GMM regime probabilities, and kNN analogs
    into human-readable scientific diagnostics:
    - Identifies regime characteristics (e.g. Oligotrophic, Eutrophic Coastal)
    - Estimates Transition Risk based on GMM prediction uncertainty
    - Summarizes analog matches and novelty flags
    """
    def __init__(self, variable_names: List[str]):
        self.variable_names = variable_names
        self.regime_names = {}

    def auto_name_regimes(
        self,
        cubes: List[np.ndarray],
        gmm_labels: np.ndarray
    ) -> Dict[int, str]:
        """
        Names each cluster/regime dynamically based on average variable characteristics.
        
        Args:
            cubes: List of cubes of shape (H, W, V).
            gmm_labels: Array of GMM label assignments.
        """
        num_clusters = len(np.unique(gmm_labels))
        # Compute mean value of each variable for each GMM cluster
        cluster_means = {c: [] for c in range(num_clusters)}
        
        # Flatten spatial pixels for each sample
        for i, cube in enumerate(cubes):
            label = gmm_labels[i]
            # Average across spatial dimensions for this sample
            mean_vals = cube.mean(axis=(0, 1))
            cluster_means[label].append(mean_vals)
            
        self.regime_names = {}
        for c in range(num_clusters):
            if not cluster_means[c]:
                self.regime_names[c] = f"Regime {c}"
                continue
                
            avg_profile = np.mean(cluster_means[c], axis=0)
            
            # Map index variables (assuming CHL = index 0, TSM = index 4, Temp = last index)
            chl_val = avg_profile[0] if len(avg_profile) > 0 else 0.5
            tsm_val = avg_profile[4] if len(avg_profile) > 4 else 0.5
            
            # Formulate descriptive naming rule
            if chl_val > 0.6:
                productivity = "Eutrophic (Highly Productive)"
            elif chl_val > 0.3:
                productivity = "Mesotrophic"
            else:
                productivity = "Oligotrophic (Low Productivity)"
                
            if tsm_val > 0.5:
                turbidity = "Turbid/Coastal"
            else:
                turbidity = "Clear Water"
                
            self.regime_names[c] = f"{productivity} {turbidity} [Regime {c}]"
            
        return self.regime_names

    def calculate_transition_risk(self, gmm_probs_single: np.ndarray) -> str:
        """
        Estimates Transition Risk based on GMM probability entropy.
        If probabilities are split across regimes, transition risk is high.
        """
        # Shannon Entropy of the probabilities
        # Normalised by log2(num_regimes) so it ranges between [0, 1]
        k = len(gmm_probs_single)
        entropy = -np.sum(gmm_probs_single * np.log2(gmm_probs_single + 1e-8))
        norm_entropy = entropy / np.log2(k + 1e-5)
        
        if norm_entropy > 0.7:
            return "High (Active State Boundary)"
        elif norm_entropy > 0.35:
            return "Moderate (Mixing Zone)"
        else:
            return "Low (Stable Core)"

    def generate_assessment(
        self,
        sample_cube: np.ndarray,
        gmm_prob_single: np.ndarray,
        hdbscan_label: int,
        analog_results: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Generates a comprehensive scientific summary for a single observation cube.
        """
        gmm_label = int(np.argmax(gmm_prob_single))
        regime_name = self.regime_names.get(gmm_label, f"Regime {gmm_label}")
        
        # Calculate transition risk
        transition_risk = self.calculate_transition_risk(gmm_prob_single)
        
        # Determine novelty
        novelty = "High" if analog_results["is_novel"] else "Low"
        
        # Detail boundary zones using HDBSCAN
        # If HDBSCAN label is -1, it represents a transition point/noise
        is_boundary_zone = (hdbscan_label == -1)
        
        # Retrieve primary variables average
        spatial_avg = sample_cube.mean(axis=(0, 1)).tolist()
        var_summary = {self.variable_names[i]: float(spatial_avg[i]) for i in range(len(spatial_avg))}

        return {
            "regime": regime_name,
            "regime_id": gmm_label,
            "primary_probability": float(gmm_prob_single[gmm_label]),
            "transition_risk": transition_risk,
            "novelty": novelty,
            "novelty_confidence": analog_results.get("novelty_confidence", "N/A"),
            "is_boundary_zone": is_boundary_zone,
            "top_similarity": float(analog_results["similarities"][0]),
            "closest_analogs": analog_results["indices"],
            "variables_profile": var_summary
        }

    def generate_scientific_justification(self, assessment: Dict[str, Any]) -> str:
        """
        Generates a paragraph of scientific justification explaining the ecological classification.
        """
        p = assessment["variables_profile"]
        regime = assessment["regime"]
        
        reasons = []
        if "CHL" in p:
            if p["CHL"] > 0.6:
                reasons.append("extreme phytoplankton concentration (chlorophyll-a proxy)")
            elif p["CHL"] > 0.3:
                reasons.append("moderate algal activity")
            else:
                reasons.append("low primary productivity")
                
        if "TSM" in p:
            if p["TSM"] > 0.5:
                reasons.append("high particulate loading and suspended sediment levels")
            else:
                reasons.append("exceptionally high water clarity")
                
        if "KD490" in p and p["KD490"] > 0.4:
            reasons.append("rapid light attenuation in the upper water column")
            
        if "PAR" in p and p["PAR"] < 0.3:
            reasons.append("low incident photosynthetically active radiation (potential light-limiting conditions)")

        justification = (
            f"This location is classified under the '{regime}' state, driven by "
            f"{', '.join(reasons)}. "
        )
        
        if assessment["is_boundary_zone"]:
            justification += (
                "The system is currently situated in a spatial boundary zone (regime front), "
                "meaning it exhibits complex spatial gradients and high localized patchiness."
            )
        else:
            justification += "The system lies securely within a stable ecological core region."
            
        if "High" in assessment["transition_risk"]:
            justification += (
                " WARNING: High transition entropy indicates this ecosystem is experiencing "
                "a state transition or critical boundary mixing, with elevated vulnerability to tipping points."
            )
            
        return justification

    def print_assessment_report(self, assessment: Dict[str, Any]) -> None:
        """Prints a beautifully formatted dashboard representation of the assessment."""
        print("="*60)
        print("🌊 CAPRI ECOLOGICAL STATE REPORT")
        print("="*60)
        print(f"Current State Regime : {assessment['regime']}")
        print(f"Regime Probability   : {assessment['primary_probability']:.2f}")
        print(f"Top Analog Similarity: {assessment['top_similarity']:.2f}")
        print(f"Transition Risk      : {assessment['transition_risk']}")
        print(f"State Novelty        : {assessment['novelty']} ({assessment['novelty_confidence']})")
        print(f"Boundary Zone Flag   : {assessment['is_boundary_zone']}")
        print(f"Closest Analogs IDs  : {assessment['closest_analogs']}")
        print("-"*60)
        print("PHYSICAL VARIABLE MEANS:")
        for var, val in assessment["variables_profile"].items():
            bar = "█" * int(val * 20)
            print(f"  {var:<15} : {val:.3f} {bar}")
        print("-"*60)
        print("SCIENTIFIC ASSESSMENT JUSTIFICATION:")
        justification = self.generate_scientific_justification(assessment)
        import textwrap
        print(textwrap.fill(justification, width=60))
        print("="*60)
