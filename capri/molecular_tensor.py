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
    
    Each cell (x, y) is modeled as a 3D molecular structure:
    - CHL (c=0): planar porphyrin macrocycle with 4 nitrogen atom peaks (4-fold symmetry).
    - TSM (c=1): polysaccharide chain branching along the local gradient direction.
    - APHY (c=2): protein helix along the depth axis (z).
    - ADG (c=3): aromatic ring structure (6-fold symmetry).
    - BBP (c=4): linear molecular chain.
    - PAR (c=5): globular cluster (3D sphere).
    - KD490 (c=6): spectral attenuation exponential decay tail.
    
    SST (8th variable, if present) is used as a local conformational expansion factor
    that distorts the z-coordinates: alpha = 1.0 + 0.1 * SST.
    
    Additionally, active neighboring cells are physically connected via a 3D
    tubular root grid system for each channel.
    
    Returns:
        np.ndarray of shape (7, 20, 20, 20), values in [0, 1].
    """
    H, W, V = cube.shape
    assert H == 20 and W == 20, f"Expected grid 20x20, got {H}x{W}"
    
    if V >= 8:
        sst = cube[:, :, 7]
        alpha = 1.0 + 0.1 * sst
    else:
        alpha = np.ones((H, W), dtype=np.float32)
        
    voxels = np.zeros((7, H, W, 20), dtype=np.float32)
    
    # Precompute coordinate grids for fast broadcasting
    x_indices = np.arange(H, dtype=np.float32)
    y_indices = np.arange(W, dtype=np.float32)
    z_indices = np.arange(20, dtype=np.float32)
    
    # Pre-extract variables for speed
    val_chl = cube[:, :, 0]
    val_tsm = cube[:, :, 1]
    val_aphy = cube[:, :, 2]
    val_adg = cube[:, :, 3]
    val_bbp = cube[:, :, 4]
    val_par = cube[:, :, 5]
    val_kd = cube[:, :, 6]
    
    # TSM spatial gradients for branching angles
    dy, dx = np.gradient(val_tsm)
    grad_angles = np.arctan2(dy, dx)
    
    sigma = 0.6
    sigma_sq = 2.0 * (sigma ** 2)
    
    # Base Z centers for each variable layer
    base_z_centers = [4.0, 8.0, 12.0, 15.0, 17.5, 10.0, 19.0]
    
    # 1. Accumulate localized cell-level structures
    for xc in range(H):
        for yc in range(W):
            v_chl = val_chl[xc, yc]
            v_tsm = val_tsm[xc, yc]
            v_aphy = val_aphy[xc, yc]
            v_adg = val_adg[xc, yc]
            v_bbp = val_bbp[xc, yc]
            v_par = val_par[xc, yc]
            v_kd = val_kd[xc, yc]
            
            # Skip empty cells
            if v_chl == 0 and v_tsm == 0 and v_aphy == 0 and v_adg == 0 and v_bbp == 0 and v_par == 0 and v_kd == 0:
                continue
                
            # Local expansion factor
            a = alpha[xc, yc]
            
            # Z centers for each variable
            z_chl = base_z_centers[0] * a
            z_tsm = base_z_centers[1] * a
            z_aphy = base_z_centers[2] * a
            z_adg = base_z_centers[3] * a
            z_bbp = base_z_centers[4] * a
            z_par = base_z_centers[5] * a
            z_kd = base_z_centers[6] * a
            
            # Define local bounding box (radius = 5) to keep execution fast
            r_limit = 5
            x_min = max(0, xc - r_limit)
            x_max = min(H, xc + r_limit + 1)
            y_min = max(0, yc - r_limit)
            y_max = min(W, yc + r_limit + 1)
            
            # Subgrid 1D arrays for orthogonal broadcasting
            sub_x = x_indices[x_min:x_max][:, np.newaxis, np.newaxis]
            sub_y = y_indices[y_min:y_max][np.newaxis, :, np.newaxis]
            sub_z = z_indices[np.newaxis, np.newaxis, :]
            
            sub_x_shift = sub_x - xc
            sub_y_shift = sub_y - yc
            dx_sq = sub_x_shift ** 2
            dy_sq = sub_y_shift ** 2
            dxy = np.sqrt(dx_sq + dy_sq)
            
            # 1. CHL (Porphyrin Ring): planar macrocycle in XY plane with 4 nitrogen peaks
            if v_chl > 0:
                r_chl = 1.0 + 2.0 * v_chl
                theta = np.arctan2(sub_y_shift, sub_x_shift)
                nitrogen_factor = 0.8 + 0.2 * np.cos(4.0 * theta)
                chl_density = v_chl * np.exp(-((dxy - r_chl)**2) / sigma_sq) * np.exp(-((sub_z - z_chl)**2) / sigma_sq) * nitrogen_factor
                voxels[0, x_min:x_max, y_min:y_max, :] = np.maximum(voxels[0, x_min:x_max, y_min:y_max, :], chl_density)
                
            # 2. TSM (Polysaccharide Chain): branching along the local gradient direction
            if v_tsm > 0:
                phi = grad_angles[xc, yc]
                stem_density = v_tsm * np.exp(-(dx_sq + dy_sq) / sigma_sq) * np.exp(-((sub_z - z_tsm)**2) / 6.0)
                
                dist_along_branch = sub_x_shift * np.cos(phi) + sub_y_shift * np.sin(phi)
                dist_perp_branch = -sub_x_shift * np.sin(phi) + sub_y_shift * np.cos(phi)
                z_branch = z_tsm + 0.5 * dist_along_branch
                branch_density = v_tsm * 0.7 * np.exp(-(dist_perp_branch**2) / sigma_sq) * np.exp(-((sub_z - z_branch)**2) / sigma_sq) * (dist_along_branch >= 0) * (dist_along_branch <= 4.0)
                
                tsm_density = np.maximum(stem_density, branch_density)
                voxels[1, x_min:x_max, y_min:y_max, :] = np.maximum(voxels[1, x_min:x_max, y_min:y_max, :], tsm_density)
                
            # 3. APHY (Accessory Pigments): helical protein structure along Z
            if v_aphy > 0:
                r_aphy = 0.6 + 1.2 * v_aphy
                omega = 1.0
                helix_x = xc + r_aphy * np.cos(omega * sub_z)
                helix_y = yc + r_aphy * np.sin(omega * sub_z)
                aphy_density = v_aphy * np.exp(-((sub_x - helix_x)**2 + (sub_y - helix_y)**2) / sigma_sq) * np.exp(-((sub_z - z_aphy)**2) / 8.0)
                voxels[2, x_min:x_max, y_min:y_max, :] = np.maximum(voxels[2, x_min:x_max, y_min:y_max, :], aphy_density)
                
            # 4. ADG (CDOM): Aromatic ring structure (6-fold benzene-like symmetry)
            if v_adg > 0:
                r_adg = 0.8 + 1.5 * v_adg
                theta = np.arctan2(sub_y_shift, sub_x_shift)
                aromatic_factor = 0.75 + 0.25 * np.cos(6.0 * theta)
                adg_density = v_adg * np.exp(-((dxy - r_adg)**2) / sigma_sq) * np.exp(-((sub_z - z_adg)**2) / sigma_sq) * aromatic_factor
                voxels[3, x_min:x_max, y_min:y_max, :] = np.maximum(voxels[3, x_min:x_max, y_min:y_max, :], adg_density)
                
            # 5. BBP (Backscattering): linear chain structure
            if v_bbp > 0:
                bbp_density = v_bbp * np.exp(-(dx_sq + dy_sq) / sigma_sq) * np.exp(-((sub_z - z_bbp)**2) / 4.0)
                voxels[4, x_min:x_max, y_min:y_max, :] = np.maximum(voxels[4, x_min:x_max, y_min:y_max, :], bbp_density)
                
            # 6. PAR (Radiation): globular cluster (3D sphere)
            if v_par > 0:
                r_par = 1.5 + 2.5 * v_par
                par_density = v_par * np.exp(-((sub_x - xc)**2 + (sub_y - yc)**2 + (sub_z - z_par)**2) / (2.0 * (r_par**2)))
                voxels[5, x_min:x_max, y_min:y_max, :] = np.maximum(voxels[5, x_min:x_max, y_min:y_max, :], par_density)
                
            # 7. KD490 (Attenuation): exponential decay tail going downwards
            if v_kd > 0:
                dist_z = np.maximum(0.0, z_kd - sub_z)
                kd_density = v_kd * np.exp(-(dx_sq + dy_sq) / sigma_sq) * np.exp(-dist_z / 3.0)
                voxels[6, x_min:x_max, y_min:y_max, :] = np.maximum(voxels[6, x_min:x_max, y_min:y_max, :], kd_density)

    # 2. Add tubular root grid system (connecting adjacent active cells in 3D space)
    sigma_root = 0.6
    sigma_root_sq = 2.0 * (sigma_root ** 2)
    
    connections = []
    # Horizontal neighbors: (x, y) <-> (x+1, y)
    for x in range(H - 1):
        for y in range(W):
            connections.append(((x, y), (x + 1, y)))
    # Vertical neighbors: (x, y) <-> (x, y+1)
    for x in range(H):
        for y in range(W - 1):
            connections.append(((x, y), (x, y + 1)))
            
    for A_coord, B_coord in connections:
        x_A, y_A = A_coord
        x_B, y_B = B_coord
        a_A = alpha[x_A, y_A]
        a_B = alpha[x_B, y_B]
        
        for c in range(7):
            val_A = cube[x_A, y_A, c]
            val_B = cube[x_B, y_B, c]
            if val_A > 0 and val_B > 0:
                z_A = base_z_centers[c] * a_A
                z_B = base_z_centers[c] * a_B
                v_avg = 0.5 * (val_A + val_B)
                
                # Dynamic localized bounding box to optimize calculation speed
                x_min = max(0, min(x_A, x_B) - 2)
                x_max = min(H, max(x_A, x_B) + 3)
                y_min = max(0, min(y_A, y_B) - 2)
                y_max = min(W, max(y_A, y_B) + 3)
                z_min = max(0, int(min(z_A, z_B) - 2))
                z_max = min(20, int(max(z_A, z_B) + 3))
                
                sub_x = x_indices[x_min:x_max][:, np.newaxis, np.newaxis]
                sub_y = y_indices[y_min:y_max][np.newaxis, :, np.newaxis]
                sub_z = z_indices[z_min:z_max][np.newaxis, np.newaxis, :]
                
                vx, vy, vz = x_B - x_A, y_B - y_A, z_B - z_A
                v_sq = vx**2 + vy**2 + vz**2
                if v_sq > 0:
                    dot = (sub_x - x_A) * vx + (sub_y - y_A) * vy + (sub_z - z_A) * vz
                    t = np.clip(dot / v_sq, 0.0, 1.0)
                    cx = x_A + t * vx
                    cy = y_A + t * vy
                    cz = z_A + t * vz
                    
                    d_sq = (sub_x - cx)**2 + (sub_y - cy)**2 + (sub_z - cz)**2
                    root_density = v_avg * np.exp(-d_sq / sigma_root_sq)
                    
                    voxels[c, x_min:x_max, y_min:y_max, z_min:z_max] = np.maximum(
                        voxels[c, x_min:x_max, y_min:y_max, z_min:z_max],
                        root_density
                    )
                
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
    
    Applies XY group-symmetric pooling (averaging over all 8 rotations and reflections)
    to ensure the resulting fingerprint is perfectly rotationally invariant.
    """
    global _molecular_cnn
    if _molecular_cnn is None:
        _molecular_cnn = Molecular3DCNN(in_channels=7, latent_dim=128)
        # Fix the seed for deterministic weights initialization
        torch.manual_seed(42)
        _molecular_cnn.eval()
        
    # Convert cube (20, 20, V) to voxels (7, 20, 20, 20)
    voxels = tensor_to_3d_voxels(cube)
    
    # Aggregate over all 8 symmetric configurations in the XY plane to achieve rotational invariance
    embeddings = []
    for rot in range(4):
        for flip in [False, True]:
            v_curr = np.rot90(voxels, k=rot, axes=(1, 2))
            if flip:
                v_curr = np.flip(v_curr, axis=1)
                
            x = torch.from_numpy(v_curr.copy()).unsqueeze(0)
            with torch.no_grad():
                z = _molecular_cnn(x)
            embeddings.append(z.squeeze(0).numpy())
            
    return np.mean(embeddings, axis=0)
