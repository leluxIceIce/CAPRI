"""
EEF Layer 2 — Spatial Structure Engine.

Extracts spatial structure, gradients, patchiness, and texture features
from ecological observation cubes C ∈ R^{H×W×V}.
"""

import numpy as np
import scipy.ndimage as ndimage
from dataclasses import dataclass
from typing import List, Tuple, Dict

@dataclass
class SpatialDescriptorSet:
    """Container for the output of the spatial structure extractor."""
    data: np.ndarray                          # Shape (H, W, V * 9)
    feature_names: List[str]                  # E.g. ["CHL_gradient_dx", ...]
    variables: List[str]
    features_per_var: int = 9

class SpatialStructureExtractor:
    """
    EEF Layer 2: Spatial Structure Extraction.

    Computes 9 spatial descriptors for each channel in the observation cube:
    1. gradient_dx
    2. gradient_dy
    3. laplacian
    4. variance
    5. entropy
    6. moran (Moran's I)
    7. semivariance
    8. patchiness
    9. texture_contrast
    """

    def __init__(self, window_size: int = 3):
        self.window_size = window_size

    def compute_gradients(self, channel: np.ndarray) -> Tuple[np.ndarray, np.ndarray]:
        """Compute spatial derivatives dx, dy using Sobel filter."""
        dx = ndimage.sobel(channel, axis=1)
        dy = ndimage.sobel(channel, axis=0)
        return dx, dy

    def compute_laplacian(self, channel: np.ndarray) -> np.ndarray:
        """Compute local Laplacian to highlight accumulation or dispersion."""
        return ndimage.laplace(channel)

    def compute_local_variance(self, channel: np.ndarray) -> np.ndarray:
        """Computes local variance of the channel using a sliding window."""
        mean_val = ndimage.uniform_filter(channel, size=self.window_size, mode='reflect')
        sq_mean_val = ndimage.uniform_filter(channel**2, size=self.window_size, mode='reflect')
        variance = sq_mean_val - mean_val**2
        variance = np.clip(variance, 0.0, None)
        v_max = variance.max() + 1e-6
        return variance / v_max

    def compute_local_entropy(self, channel: np.ndarray) -> np.ndarray:
        """Computes local Shannon entropy using a sliding window."""
        discrete = np.clip(np.floor(channel * 9.99), 0, 9).astype(int)
        H, W = channel.shape
        r = self.window_size // 2
        entropy_grid = np.zeros_like(channel)
        
        for i in range(H):
            for j in range(W):
                i_min, i_max = max(0, i - r), min(H, i + r + 1)
                j_min, j_max = max(0, j - r), min(W, j + r + 1)
                patch = discrete[i_min:i_max, j_min:j_max]
                _, counts = np.unique(patch, return_counts=True)
                probs = counts / patch.size
                entropy_grid[i, j] = -np.sum(probs * np.log2(probs + 1e-8))
                
        return np.clip(entropy_grid / 3.32, 0.0, 1.0)

    def compute_local_moran(self, channel: np.ndarray) -> np.ndarray:
        """Computes local Moran's I (spatial autocorrelation metric)."""
        H, W = channel.shape
        mean = channel.mean()
        std = channel.std() + 1e-6
        z = (channel - mean) / std
        
        weights = np.array([
            [1, 1, 1],
            [1, 0, 1],
            [1, 1, 1]
        ], dtype=np.float32)
        weights /= weights.sum()
        
        z_lag = ndimage.convolve(z, weights, mode='constant', cval=0.0)
        moran_i = z * z_lag
        
        m_min, m_max = moran_i.min(), moran_i.max()
        if m_max > m_min:
            return (moran_i - m_min) / (m_max - m_min)
        return np.zeros_like(channel)

    def compute_local_semivariance(self, channel: np.ndarray) -> np.ndarray:
        """Computes local semivariance."""
        H, W = channel.shape
        r = self.window_size // 2
        semivar = np.zeros_like(channel)
        
        for i in range(H):
            for j in range(W):
                i_min, i_max = max(0, i - r), min(H, i + r + 1)
                j_min, j_max = max(0, j - r), min(W, j + r + 1)
                center_val = channel[i, j]
                neighbors = channel[i_min:i_max, j_min:j_max]
                diffs = (neighbors - center_val) ** 2
                semivar[i, j] = 0.5 * diffs.mean()
                
        sv_max = semivar.max() + 1e-6
        return semivar / sv_max

    def compute_patchiness(self, channel: np.ndarray) -> np.ndarray:
        """Computes spatial patchiness based on connected component sizes."""
        threshold = np.median(channel)
        binary_mask = channel > threshold
        
        labeled_array, num_features = ndimage.label(binary_mask, structure=np.ones((3,3)))
        
        unique, counts = np.unique(labeled_array, return_counts=True)
        sizes = dict(zip(unique, counts))
        sizes[0] = 0
        
        patch_sizes = np.vectorize(sizes.get)(labeled_array).astype(np.float32)
        return patch_sizes / channel.size

    def compute_texture_contrast(self, channel: np.ndarray) -> np.ndarray:
        """Computes GLCM-like texture contrast."""
        discrete = np.clip(np.floor(channel * 7.99), 0, 7).astype(np.float32)
        
        diff_h = np.zeros_like(discrete)
        diff_v = np.zeros_like(discrete)
        
        diff_h[:, :-1] = (discrete[:, 1:] - discrete[:, :-1]) ** 2
        diff_v[:-1, :] = (discrete[1:, :] - discrete[:-1, :]) ** 2
        
        diff = 0.5 * (diff_h + diff_v)
        contrast = ndimage.uniform_filter(diff, size=self.window_size, mode='constant', cval=0.0)
        return np.clip(contrast / 49.0, 0.0, 1.0)

    def compute_tensor(self, cube: np.ndarray) -> SpatialDescriptorSet:
        """
        Computes the spatial structure tensor for all variables.
        
        Args:
            cube: Input observation cube of shape (H, W, V).
            
        Returns:
            SpatialDescriptorSet holding a (H, W, V * 9) array and metadata.
        """
        H, W, V = cube.shape
        # Total feature channels = V * 9
        features_per_var = 9
        data = np.zeros((H, W, V * features_per_var), dtype=np.float32)
        feature_names = []
        variables = []

        # We assume cube ordering of variables matches variables list, or we use defaults
        # For simplicity, we just use a generic list or build it dynamically
        for v in range(V):
            var_name = f"var_{v}"
            # In practice we know variables from cube_builder if default, but let's label
            variables.append(var_name)

        feat_idx = 0
        for v in range(V):
            channel = cube[:, :, v]
            var_name = variables[v]

            # 1. Gradients dx, dy
            dx, dy = self.compute_gradients(channel)
            for grad, name in [(dx, "gradient_dx"), (dy, "gradient_dy")]:
                g_min, g_max = grad.min(), grad.max()
                if g_max > g_min:
                    data[:, :, feat_idx] = (grad - g_min) / (g_max - g_min)
                else:
                    data[:, :, feat_idx] = 0.5
                feature_names.append(f"{var_name}_{name}")
                feat_idx += 1

            # 3. Laplacian
            lap = self.compute_laplacian(channel)
            lap_min, lap_max = lap.min(), lap.max()
            if lap_max > lap_min:
                data[:, :, feat_idx] = (lap - lap_min) / (lap_max - lap_min)
            else:
                data[:, :, feat_idx] = 0.5
            feature_names.append(f"{var_name}_laplacian")
            feat_idx += 1

            # 4. Variance
            data[:, :, feat_idx] = self.compute_local_variance(channel)
            feature_names.append(f"{var_name}_variance")
            feat_idx += 1

            # 5. Entropy
            data[:, :, feat_idx] = self.compute_local_entropy(channel)
            feature_names.append(f"{var_name}_entropy")
            feat_idx += 1

            # 6. Moran's I
            data[:, :, feat_idx] = self.compute_local_moran(channel)
            feature_names.append(f"{var_name}_moran")
            feat_idx += 1

            # 7. Semivariance
            data[:, :, feat_idx] = self.compute_local_semivariance(channel)
            feature_names.append(f"{var_name}_semivariance")
            feat_idx += 1

            # 8. Patchiness
            data[:, :, feat_idx] = self.compute_patchiness(channel)
            feature_names.append(f"{var_name}_patchiness")
            feat_idx += 1

            # 9. Texture Contrast
            data[:, :, feat_idx] = self.compute_texture_contrast(channel)
            feature_names.append(f"{var_name}_texture_contrast")
            feat_idx += 1

        return SpatialDescriptorSet(
            data=data,
            feature_names=feature_names,
            variables=variables,
            features_per_var=features_per_var
        )
