"""
EEF Layer 3 — Relationship Engine.

Computes pairwise and composite ecological relationships (correlations,
mutual information, ratios, and composite indices) between variables
across the spatial grid.
"""

import numpy as np
import scipy.ndimage as ndimage
from dataclasses import dataclass
from typing import List, Dict, Optional, Tuple

@dataclass
class RelationshipDescriptorMatrix:
    """Container for the output of the relationship structure extractor."""
    data: np.ndarray                          # Shape (H, W, R_features)
    feature_names: List[str]                  # Listing of what each channel represents
    variables: List[str]

class RelationshipStructureExtractor:
    """
    EEF Layer 3: Relationship Structure Extraction.

    Computes pixel-wise interactions and ecological relationships between variables:
    1. Pearson correlation (all V*(V-1)/2 pairs)
    2. Mutual Information (all V*(V-1)/2 pairs, discretized)
    3. Ecologically grounded ratios (CHL/TSM, aphy/CHL, ADG/bbp, KD490/PAR, CHL/aphy)
    4. Composite ecological indices (Trophic State, Turbidity/Eutrophication, Light Limitation, Organic Carbon Proxy)
    """

    def __init__(
        self,
        mode: str = "all",
        window_size: int = 3,
        variables: Optional[List[str]] = None,
    ):
        """
        Args:
            mode: Method to compute relationships:
                  - 'correlation': Local Pearson correlation (21 channels)
                  - 'covariance': Local covariance (21 channels)
                  - 'mutual_information': Discretized local MI (21 channels)
                  - 'ratios': 5 specific ecological ratios (5 channels)
                  - 'indices': 4 specific composite indices (4 channels)
                  - 'all': All of the above (51 channels)
            window_size: Neighborhood window size for local operations.
            variables: List of variable names matching the cube channels.
        """
        self.mode = mode
        self.window_size = window_size
        self.variables = variables or ["CHL", "aphy", "ADG", "bbp", "TSM", "PAR", "KD490"]

    def compute_local_mi(self, c1: np.ndarray, c2: np.ndarray, bins: int = 3) -> np.ndarray:
        """Computes discretized local Mutual Information using sliding window."""
        d1 = np.clip(np.floor(c1 * (bins - 0.01)), 0, bins - 1).astype(int)
        d2 = np.clip(np.floor(c2 * (bins - 0.01)), 0, bins - 1).astype(int)
        
        H, W = c1.shape
        r = self.window_size // 2
        mi_grid = np.zeros_like(c1)
        
        for i in range(H):
            for j in range(W):
                i_min, i_max = max(0, i - r), min(H, i + r + 1)
                j_min, j_max = max(0, j - r), min(W, j + r + 1)
                p1 = d1[i_min:i_max, j_min:j_max].flatten()
                p2 = d2[i_min:i_max, j_min:j_max].flatten()
                
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
                mi_grid[i, j] = mi
        
        max_mi = np.log2(bins)
        return np.clip(mi_grid / max_mi, 0.0, 1.0)

    def _rank_transform(self, channel: np.ndarray) -> np.ndarray:
        """Rank-transforms a 2D channel to [0, 1] based on value sorting."""
        flat = channel.flatten()
        temp = flat.argsort()
        ranks = np.empty_like(temp, dtype=np.float32)
        ranks[temp] = np.arange(len(flat), dtype=np.float32)
        ranks = ranks / (len(flat) - 1.0 + 1e-12)
        return ranks.reshape(channel.shape)

    def _compute_local_correlation(self, c1: np.ndarray, c2: np.ndarray, epsilon: float = 1e-5) -> np.ndarray:
        mean_1 = ndimage.uniform_filter(c1, size=self.window_size, mode='reflect')
        mean_2 = ndimage.uniform_filter(c2, size=self.window_size, mode='reflect')
        
        prod = c1 * c2
        mean_prod = ndimage.uniform_filter(prod, size=self.window_size, mode='reflect')
        local_cov = mean_prod - mean_1 * mean_2
        
        var_1 = ndimage.uniform_filter(c1**2, size=self.window_size, mode='reflect') - mean_1**2
        var_2 = ndimage.uniform_filter(c2**2, size=self.window_size, mode='reflect') - mean_2**2
        std_12 = np.sqrt(np.clip(var_1 * var_2, 0, None))
        
        local_corr = np.zeros(c1.shape, dtype=np.float32)
        valid_mask = std_12 > epsilon
        local_corr[valid_mask] = local_cov[valid_mask] / std_12[valid_mask]
        
        return (local_corr + 1.0) * 0.5  # Map to [0, 1]

    def _compute_local_covariance(self, c1: np.ndarray, c2: np.ndarray) -> np.ndarray:
        mean_1 = ndimage.uniform_filter(c1, size=self.window_size, mode='reflect')
        mean_2 = ndimage.uniform_filter(c2, size=self.window_size, mode='reflect')
        
        prod = c1 * c2
        mean_prod = ndimage.uniform_filter(prod, size=self.window_size, mode='reflect')
        local_cov = mean_prod - mean_1 * mean_2
        
        cov_min, cov_max = local_cov.min(), local_cov.max()
        if cov_max > cov_min:
            norm_cov = (local_cov - cov_min) / (cov_max - cov_min)
        else:
            norm_cov = np.zeros_like(local_cov)
        return norm_cov

    def compute_tensor(self, cube: np.ndarray) -> RelationshipDescriptorMatrix:
        """
        Computes the relationship tensor R based on the selected mode.
        
        Args:
            cube: Input observation cube of shape (H, W, V).
            
        Returns:
            RelationshipDescriptorMatrix holding the computed tensor.
        """
        H, W, V = cube.shape
        
        data_list = []
        feature_names = []

        # ── 1. Pearson Correlation ───────────────────────────────────────────
        if self.mode in ("correlation", "all"):
            for i in range(V):
                for j in range(i + 1, V):
                    name_i, name_j = self.variables[i], self.variables[j]
                    norm_corr = self._compute_local_correlation(cube[:, :, i], cube[:, :, j])
                    data_list.append(norm_corr)
                    feature_names.append(f"corr_{name_i}_{name_j}")

        # ── 2. Spearman Rank Correlation ─────────────────────────────────────
        if self.mode in ("spearman", "all"):
            # Rank-transform channels first
            ranked_channels = [self._rank_transform(cube[:, :, v]) for v in range(V)]
            for i in range(V):
                for j in range(i + 1, V):
                    name_i, name_j = self.variables[i], self.variables[j]
                    norm_spearman = self._compute_local_correlation(ranked_channels[i], ranked_channels[j])
                    data_list.append(norm_spearman)
                    feature_names.append(f"spearman_{name_i}_{name_j}")

        # ── 3. Mutual Information ─────────────────────────────────────────────
        if self.mode in ("mutual_information", "all"):
            for i in range(V):
                for j in range(i + 1, V):
                    name_i, name_j = self.variables[i], self.variables[j]
                    mi = self.compute_local_mi(cube[:, :, i], cube[:, :, j])
                    data_list.append(mi)
                    feature_names.append(f"mi_{name_i}_{name_j}")

        # ── 4. Covariance ─────────────────────────────────────────────────────
        if self.mode in ("covariance", "all"):
            for i in range(V):
                for j in range(i + 1, V):
                    name_i, name_j = self.variables[i], self.variables[j]
                    norm_cov = self._compute_local_covariance(cube[:, :, i], cube[:, :, j])
                    data_list.append(norm_cov)
                    feature_names.append(f"cov_{name_i}_{name_j}")

        # ── 5. Ecologically Grounded Ratios ───────────────────────────────────
        var_to_idx = {v.upper(): idx for idx, v in enumerate(self.variables)}
        epsilon = 1e-6
        if self.mode == "ratios":
            # CHL / TSM
            if "CHL" in var_to_idx and "TSM" in var_to_idx:
                val = (cube[:, :, var_to_idx["CHL"]] + epsilon) / (cube[:, :, var_to_idx["TSM"]] + epsilon)
                data_list.append(np.clip(val, 0.0, 10.0) / 10.0)
                feature_names.append("ratio_CHL_TSM")
                
            # aphy / CHL
            aphy_key = "APHY" if "APHY" in var_to_idx else "aphy"
            if aphy_key in var_to_idx and "CHL" in var_to_idx:
                val = (cube[:, :, var_to_idx[aphy_key]] + epsilon) / (cube[:, :, var_to_idx["CHL"]] + epsilon)
                data_list.append(np.clip(val, 0.0, 2.0) / 2.0)
                feature_names.append("ratio_aphy_CHL")
                
            # ADG / bbp
            bbp_key = "BBP" if "BBP" in var_to_idx else "bbp"
            if "ADG" in var_to_idx and bbp_key in var_to_idx:
                val = (cube[:, :, var_to_idx["ADG"]] + epsilon) / (cube[:, :, var_to_idx[bbp_key]] + epsilon)
                data_list.append(np.clip(val, 0.0, 50.0) / 50.0)
                feature_names.append("ratio_ADG_bbp")
                
            # KD490 / PAR
            if "KD490" in var_to_idx and "PAR" in var_to_idx:
                val = (cube[:, :, var_to_idx["KD490"]] + epsilon) / (cube[:, :, var_to_idx["PAR"]] + epsilon)
                data_list.append(np.clip(val, 0.0, 5.0) / 5.0)
                feature_names.append("ratio_KD490_PAR")
                
            # CHL / aphy
            if "CHL" in var_to_idx and aphy_key in var_to_idx:
                val = (cube[:, :, var_to_idx["CHL"]] + epsilon) / (cube[:, :, var_to_idx[aphy_key]] + epsilon)
                data_list.append(np.clip(val, 0.0, 20.0) / 20.0)
                feature_names.append("ratio_CHL_aphy")

        # ── 6. Composite Ecological Indices ───────────────────────────────────
        if self.mode == "indices":
            # Trophic State Proxy: CHL * PAR
            if "CHL" in var_to_idx and "PAR" in var_to_idx:
                val = cube[:, :, var_to_idx["CHL"]] * cube[:, :, var_to_idx["PAR"]]
                data_list.append(val)
                feature_names.append("index_trophic_state")
                
            # Turbidity/Eutrophication Index: TSM * KD490
            if "TSM" in var_to_idx and "KD490" in var_to_idx:
                val = cube[:, :, var_to_idx["TSM"]] * cube[:, :, var_to_idx["KD490"]]
                data_list.append(val)
                feature_names.append("index_turbidity")
                
            # Light Limitation Index: PAR / (KD490 + epsilon)
            if "PAR" in var_to_idx and "KD490" in var_to_idx:
                val = cube[:, :, var_to_idx["PAR"]] / (cube[:, :, var_to_idx["KD490"]] + epsilon)
                data_list.append(np.clip(val, 0.0, 10.0) / 10.0)
                feature_names.append("index_light_limitation")
                
            # Organic Carbon Proxy: bbp / (TSM + epsilon)
            bbp_key = "BBP" if "BBP" in var_to_idx else "bbp"
            if bbp_key in var_to_idx and "TSM" in var_to_idx:
                val = cube[:, :, var_to_idx[bbp_key]] / (cube[:, :, var_to_idx["TSM"]] + epsilon)
                data_list.append(np.clip(val, 0.0, 5.0) / 5.0)
                feature_names.append("index_organic_carbon")

        # Combine list of HxW matrices into HxWxC tensor
        data = np.stack(data_list, axis=-1).astype(np.float32)
        
        # Save relationship tensor to disk as relationship_tensor.npy
        np.save("relationship_tensor.npy", data)
        
        return RelationshipDescriptorMatrix(
            data=data,
            feature_names=feature_names,
            variables=self.variables
        )

