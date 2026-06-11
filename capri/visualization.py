"""
EEF Layer 6 — Ecological Potential Space Visualization.

Implements high-quality scientific visualizations for latent spaces,
variable profiles per regime, transition boundaries, and manifold quality diagnostics.
"""

import numpy as np
import matplotlib
matplotlib.use('Agg')  # Non-interactive backend
import matplotlib.pyplot as plt
from typing import List, Dict, Tuple, Optional

def plot_latent_space(
    Z_proj: np.ndarray,
    labels: np.ndarray,
    save_path: str,
    title: str = "Ecological Potential Space (EPS)"
) -> None:
    """
    Plots the 2D projected latent space with regime coloring.
    """
    plt.figure(figsize=(8, 6), dpi=150)
    plt.style.use('dark_background')
    
    unique_labels = np.unique(labels)
    colors = plt.cm.viridis(np.linspace(0, 1, len(unique_labels)))
    
    for idx, lbl in enumerate(unique_labels):
        mask = labels == lbl
        lbl_name = f"Regime {lbl}" if lbl != -1 else "Noise/Transition"
        color = 'gray' if lbl == -1 else colors[idx]
        marker = 'x' if lbl == -1 else 'o'
        alpha = 0.5 if lbl == -1 else 0.8
        
        plt.scatter(
            Z_proj[mask, 0], Z_proj[mask, 1],
            c=[color], label=lbl_name, alpha=alpha,
            edgecolors='white' if lbl != -1 else 'none',
            linewidths=0.5, s=60, marker=marker
        )
        
    plt.title(title, fontsize=14, fontweight='bold', pad=15, color='#a0ffe0')
    plt.xlabel("Component 1", fontsize=10, color='gray')
    plt.ylabel("Component 2", fontsize=10, color='gray')
    plt.grid(True, linestyle='--', alpha=0.15)
    plt.legend(framealpha=0.2, loc='best')
    plt.tight_layout()
    plt.savefig(save_path, facecolor='#0c0c14')
    plt.close()

def plot_variable_profiles(
    cubes: List[np.ndarray],
    labels: np.ndarray,
    variables: List[str],
    save_path: str
) -> None:
    """
    Generates a profile heatmap of mean variable values across regimes.
    """
    plt.figure(figsize=(9, 5), dpi=150)
    plt.style.use('dark_background')
    
    # Extract mean variable values per sample
    data = np.stack(cubes, axis=0)  # (N, H, W, V)
    sample_means = np.mean(data, axis=(1, 2))  # (N, V)
    
    unique_labels = np.unique(labels)
    unique_labels = [l for l in unique_labels if l != -1]  # Exclude noise
    
    profile_matrix = []
    regime_names = []
    
    for lbl in unique_labels:
        cluster_means = np.mean(sample_means[labels == lbl], axis=0)
        profile_matrix.append(cluster_means)
        regime_names.append(f"Regime {lbl}")
        
    profile_matrix = np.array(profile_matrix)  # (NumRegimes, V)
    
    # Draw heatmap
    im = plt.imshow(profile_matrix.T, cmap='viridis', aspect='auto')
    
    # Show all ticks and label them with the respective list entries
    plt.xticks(np.arange(len(regime_names)), labels=regime_names, fontsize=10)
    plt.yticks(np.arange(len(variables)), labels=variables, fontsize=10, fontname='monospace')
    
    # Create colorbar
    cbar = plt.colorbar(im)
    cbar.ax.tick_params(labelsize=9)
    cbar.set_label('Mean Normalized Value', rotation=-90, va="bottom", fontsize=10, color='gray')
    
    # Loop over data dimensions and create text annotations
    for i in range(len(variables)):
        for j in range(len(regime_names)):
            val = profile_matrix[j, i]
            color = 'black' if val > 0.5 else 'white'
            plt.text(
                j, i, f"{val:.2f}",
                ha="center", va="center", color=color,
                fontsize=9, fontweight='bold'
            )
            
    plt.title("Regime Variable Profiles", fontsize=14, fontweight='bold', pad=15, color='#a0ffe0')
    plt.tight_layout()
    plt.savefig(save_path, facecolor='#0c0c14')
    plt.close()

def plot_shepard_diagram(
    Z: np.ndarray,
    Z_proj: np.ndarray,
    save_path: str
) -> None:
    """
    Plots a Shepard diagram comparing high-dimensional and low-dimensional pairwise distances.
    """
    from scipy.spatial.distance import pdist
    
    dist_high = pdist(Z)
    dist_low = pdist(Z_proj)
    
    # Subsample if too many pairs to prevent slow plotting
    if len(dist_high) > 2000:
        indices = np.random.choice(len(dist_high), 2000, replace=False)
        dist_high = dist_high[indices]
        dist_low = dist_low[indices]
        
    plt.figure(figsize=(7, 5), dpi=150)
    plt.style.use('dark_background')
    
    plt.scatter(dist_high, dist_low, alpha=0.3, color='#00ffd0', s=10, edgecolors='none')
    
    # Fit a simple trend line
    m, c = np.polyfit(dist_high, dist_low, 1)
    x_vals = np.linspace(dist_high.min(), dist_high.max(), 100)
    plt.plot(x_vals, m * x_vals + c, color='#ff0070', linestyle='--', label=f"Trend line (slope: {m:.2f})")
    
    from scipy.stats import pearsonr
    shepard_corr, _ = pearsonr(dist_high, dist_low)
    
    plt.title(f"Shepard Diagram (r = {shepard_corr:.3f})", fontsize=14, fontweight='bold', pad=15, color='#a0ffe0')
    plt.xlabel("High-Dimensional Distance (Z)", fontsize=10, color='gray')
    plt.ylabel("Low-Dimensional Distance (Z_proj)", fontsize=10, color='gray')
    plt.grid(True, linestyle='--', alpha=0.15)
    plt.legend(framealpha=0.2, loc='best')
    plt.tight_layout()
    plt.savefig(save_path, facecolor='#0c0c14')
    plt.close()

def plot_transition_probabilities(
    Z_proj: np.ndarray,
    gmm,
    reducer,
    save_path: str
) -> None:
    """
    Visualizes transition boundaries and GMM probability densities.
    """
    plt.figure(figsize=(8, 6), dpi=150)
    plt.style.use('dark_background')
    
    # Create a grid of points to evaluate probability density
    x_min, x_max = Z_proj[:, 0].min() - 1, Z_proj[:, 0].max() + 1
    y_min, y_max = Z_proj[:, 1].min() - 1, Z_proj[:, 1].max() + 1
    xx, yy = np.meshgrid(np.linspace(x_min, x_max, 100), np.linspace(y_min, y_max, 100))
    grid_points = np.c_[xx.ravel(), yy.ravel()]
    
    # If GMM was fitted in high-dimensional space, we must map 2D grid back to high-dim
    # using the inverse transform if using PCA
    if hasattr(reducer, "inverse_transform"):
        try:
            high_dim_grid = reducer.inverse_transform(grid_points)
            # Evaluate GMM probabilities
            probs = gmm.predict_proba(high_dim_grid)
            # Transition uncertainty is defined as: 1.0 - max(probs)
            max_probs = np.max(probs, axis=1)
            uncertainty = 1.0 - max_probs
            Z_grid = uncertainty.reshape(xx.shape)
            
            # Draw contour plot
            contour = plt.contourf(xx, yy, Z_grid, cmap='magma', levels=20, alpha=0.6)
            cbar = plt.colorbar(contour)
            cbar.ax.tick_params(labelsize=9)
            cbar.set_label('Transition Risk (1.0 - Max Probability)', rotation=-90, va="bottom", fontsize=10, color='gray')
        except Exception:
            pass
            
    # Overlay actual points
    plt.scatter(
        Z_proj[:, 0], Z_proj[:, 1],
        c='white', alpha=0.4, edgecolors='none', s=20
    )
    
    plt.title("Transition Boundary Map", fontsize=14, fontweight='bold', pad=15, color='#a0ffe0')
    plt.xlabel("Component 1", fontsize=10, color='gray')
    plt.ylabel("Component 2", fontsize=10, color='gray')
    plt.grid(True, linestyle='--', alpha=0.15)
    plt.tight_layout()
    plt.savefig(save_path, facecolor='#0c0c14')
    plt.close()
