"""
EEF Layer 4.5 — 3D Molecular Tensor Framework.

Transforms 2D ecological tensors into 3D molecular structure spaces (voxel grids)
and computes molecular fingerprints using 3D Convolutional Neural Networks.
"""

import numpy as np
import torch
import torch.nn as nn
import torch.nn.functional as F
from typing import List, Tuple, Dict, Any, Optional

class Molecular3DCNN(nn.Module):
    """
    3D Convolutional Neural Network.
    Ingests 3D voxel volumes of shape (batch, 7, 20, 20, 20)
    and maps them to a 128-dimensional molecular fingerprint space.
    """
    def __init__(self, in_channels: int = 7, latent_dim: int = 128):
        super().__init__()
        self.conv1 = nn.Conv3d(in_channels, 32, kernel_size=3, stride=1, padding=1)
        self.conv2 = nn.Conv3d(32, 64, kernel_size=3, stride=1, padding=1)
        self.pool = nn.MaxPool3d(2, 2)
        # Use Adaptive Pooling to ensure robust output shape (5, 5, 5) regardless of input size
        self.adaptive_pool = nn.AdaptiveMaxPool3d((5, 5, 5))
        self.fc = nn.Linear(64 * 5 * 5 * 5, latent_dim)

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        # x shape: (batch, in_channels, H, W, D)
        x = F.relu(self.conv1(x))
        x = self.pool(x)
        x = F.relu(self.conv2(x))
        x = self.adaptive_pool(x)
        x = x.view(x.size(0), -1)
        x = self.fc(x)
        return x

def tensor_to_3d_voxels(cube: np.ndarray) -> np.ndarray:
    """
    Converts a 20x20x7 or 20x20x8 ecological cube into a 3D molecular voxel grid.
    
    The first 7 variables (CHL, TSM, APHY, ADG, BBP, PAR, KD490) are mapped to
    structural geometries along the depth axis (z). 
    SST (8th variable, if present) is used as a local conformational expansion factor
    that distorts the z-coordinates: alpha = 1.0 + 0.1 * SST.
    
    Returns:
        np.ndarray of shape (7, 20, 20, 20), values in [0, 1].
    """
    H, W, V = cube.shape
    assert H == 20 and W == 20, f"Expected grid 20x20, got {H}x{W}"
    
    # Extract SST if present, otherwise set expansion factor alpha to 1.0
    if V >= 8:
        sst = cube[:, :, 7]
        alpha = 1.0 + 0.1 * sst
    else:
        alpha = np.ones((H, W), dtype=np.float32)
        
    alpha = alpha[:, :, np.newaxis] # Shape (20, 20, 1)
    
    voxels = np.zeros((7, H, W, 20), dtype=np.float32)
    z_coords = np.arange(20, dtype=np.float32) # Shape (20,)
    
    # 1. CHL (c=0): planar porphyrin ring at z = 4 * alpha
    voxels[0] = cube[:, :, 0, np.newaxis] * np.exp(-((z_coords - 4.0 * alpha)**2) / 2.0)
    
    # 2. TSM (c=1): polysaccharide chain centered at z = 8 * alpha
    voxels[1] = cube[:, :, 1, np.newaxis] * np.exp(-((z_coords - 8.0 * alpha)**2) / 4.0)
    
    # 3. APHY (c=2): protein helix at z = 12 * alpha
    helix = (np.sin(z_coords) * 0.2 + 0.8) * np.exp(-((z_coords - 12.0 * alpha)**2) / 6.0)
    voxels[2] = cube[:, :, 2, np.newaxis] * helix
    
    # 4. ADG (c=3): aromatic ring at z = 15 * alpha
    voxels[3] = cube[:, :, 3, np.newaxis] * np.exp(-((z_coords - 15.0 * alpha)**2) / 2.0)
    
    # 5. BBP (c=4): linear chain centered at z = 17.5 * alpha
    voxels[4] = cube[:, :, 4, np.newaxis] * np.exp(-((z_coords - 17.5 * alpha)**2) / 2.0)
    
    # 6. PAR (c=5): globular cluster at z = 10 * alpha
    voxels[5] = cube[:, :, 5, np.newaxis] * np.exp(-((z_coords - 10.0 * alpha)**2) / 8.0)
    
    # 7. KD490 (c=6): spectral attenuation mapped along z
    voxels[6] = cube[:, :, 6, np.newaxis] * np.exp(-((z_coords - 19.0 * alpha)**2) / 10.0)
    
    return voxels

def detect_symmetry(voxel_grid: np.ndarray) -> List[str]:
    """
    Checks the voxel grid of the first channel (CHL) for rotational and
    reflectional symmetries.
    """
    chl = voxel_grid[0] # Shape (20, 20, 20)
    symmetries = []
    
    # Check 4-fold rotational symmetry (90, 180, 270 degrees)
    is_4fold = True
    for k in [1, 2, 3]:
        rotated = np.rot90(chl, k=k, axes=(0, 1))
        if not np.allclose(rotated, chl, atol=1e-2):
            is_4fold = False
            break
    if is_4fold:
        symmetries.append("4-fold rotational symmetry")
        
    # Check reflectional symmetry along x and y axes
    if np.allclose(np.flip(chl, axis=0), chl, atol=1e-2):
        symmetries.append("reflectional symmetry (horizontal)")
    if np.allclose(np.flip(chl, axis=1), chl, atol=1e-2):
        symmetries.append("reflectional symmetry (vertical)")
        
    return symmetries

# Global CNN instance
_molecular_cnn: Optional[Molecular3DCNN] = None

def decompose_to_molecular_fingerprint(cube: np.ndarray) -> np.ndarray:
    """
    Voxelizes the input cube, runs it through the 3D CNN,
    and returns a 128-dimensional molecular fingerprint vector.
    """
    global _molecular_cnn
    if _molecular_cnn is None:
        _molecular_cnn = Molecular3DCNN(in_channels=7, latent_dim=128)
        # Fix the seed for deterministic weights initialization
        torch.manual_seed(42)
        _molecular_cnn.eval()
        
    # Convert cube (20, 20, V) to voxels (7, 20, 20, 20)
    voxels = tensor_to_3d_voxels(cube)
    
    # Add batch dimension: shape (1, 7, 20, 20, 20)
    x = torch.from_numpy(voxels).unsqueeze(0)
    with torch.no_grad():
        z = _molecular_cnn(x)
        
    return z.squeeze(0).numpy()
