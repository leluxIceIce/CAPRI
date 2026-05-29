"""
Convert spectral data (8D) to synthetic 2D RGB images for cGAN training.
Each sample becomes a small image where spatial dimensions encode feature relationships.
"""

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from pathlib import Path
from PIL import Image


def normalize_to_0_1(data: np.ndarray) -> np.ndarray:
    """Normalize data to [0, 1] range."""
    data_min = np.nanmin(data)
    data_max = np.nanmax(data)
    if data_max == data_min:
        return np.zeros_like(data)
    return (data - data_min) / (data_max - data_min)


def create_spectral_image_grid(
    df: pd.DataFrame,
    response_col: str,
    grid_size: int = 32,
    feature_subset: list = None,
) -> tuple[np.ndarray, np.ndarray]:
    """
    Convert spectral measurements to synthetic RGB images.
    
    Strategy: Arrange features in a 2D grid where spatial proximity encodes relationships.
    - Red channel: Chlorophyll-related features
    - Green channel: Absorption/optical properties
    - Blue channel: Backscatter/particle properties
    """
    
    if feature_subset is None:
        feature_subset = ['CHL_NN', 'ADG443_NN', 'aphy_443', 'bbp_443', 'KD490_M07', 'TSM_NN', 'PAR']
    
    # Filter to available columns
    feature_subset = [f for f in feature_subset if f in df.columns]
    
    n_samples = len(df)
    images = np.zeros((n_samples, grid_size, grid_size, 3), dtype=np.uint8)
    labels = df[response_col].values
    
    # Extract and normalize feature data
    features = df[feature_subset].apply(pd.to_numeric, errors='coerce').fillna(0)
    
    # Define channel assignments (RGB)
    chl_features = ['CHL_NN', 'CHL_OC4ME'] if 'CHL_OC4ME' in feature_subset else ['CHL_NN']
    abs_features = ['ADG443_NN', 'aphy_443', 'KD490_M07']
    back_features = ['bbp_443', 'TSM_NN', 'PAR']
    
    # Aggregate features per channel (average across assigned features)
    red_data = features[[f for f in chl_features if f in feature_subset]].mean(axis=1).values
    green_data = features[[f for f in abs_features if f in feature_subset]].mean(axis=1).values
    blue_data = features[[f for f in back_features if f in feature_subset]].mean(axis=1).values
    
    red_norm = normalize_to_0_1(red_data)
    green_norm = normalize_to_0_1(green_data)
    blue_norm = normalize_to_0_1(blue_data)
    
    # Create images: fill grid with normalized values + gradient
    for idx in range(n_samples):
        # Base color (uniform fill)
        img = np.zeros((grid_size, grid_size, 3), dtype=np.float32)
        img[:, :, 0] = red_norm[idx]
        img[:, :, 1] = green_norm[idx]
        img[:, :, 2] = blue_norm[idx]
        
        # Add spatial texture: gradients encode fine-grained relationships
        for i in range(grid_size):
            for j in range(grid_size):
                # Create gradient texture encoding feature interactions
                norm_i = i / grid_size
                norm_j = j / grid_size
                
                # Modulate color with position-dependent information
                interaction = (red_norm[idx] * green_norm[idx]) * 0.5
                img[i, j, 0] += interaction * norm_i * 0.3
                img[i, j, 1] += (green_norm[idx] * blue_norm[idx]) * norm_j * 0.3
                img[i, j, 2] += (red_norm[idx] * blue_norm[idx]) * (norm_i + norm_j) * 0.15
        
        # Clip and convert to uint8
        images[idx] = np.clip(img * 255, 0, 255).astype(np.uint8)
    
    return images, labels


def save_image_dataset(
    csv_path: Path,
    output_dir: Path,
    response_col: str = 'CHL_NN',
    grid_size: int = 32,
) -> None:
    """Generate and save spectral images as PNG files."""
    
    output_dir.mkdir(exist_ok=True)
    
    df = pd.read_csv(csv_path, sep=';')
    
    print(f'Loading {len(df)} samples from {csv_path}')
    print(f'Columns: {df.columns.tolist()}')
    
    images, labels = create_spectral_image_grid(df, response_col, grid_size)
    
    print(f'Generated {len(images)} synthetic images of size {grid_size}x{grid_size} RGB')
    
    # Save images
    image_dir = output_dir / f'{response_col}_images'
    image_dir.mkdir(exist_ok=True)
    
    for idx, (img, label) in enumerate(zip(images, labels)):
        img_pil = Image.fromarray(img)
        label_str = f'{label:.3f}'.replace('.', '_')
        img_path = image_dir / f'{response_col}_{idx:04d}_{label_str}.png'
        img_pil.save(img_path)
    
    print(f'Saved {len(images)} images to {image_dir}')
    
    # Save metadata CSV
    metadata_df = pd.DataFrame({
        'filename': [f'{response_col}_{i:04d}_*.png' for i in range(len(labels))],
        'label': labels,
        'label_type': response_col,
    })
    metadata_path = output_dir / f'{response_col}_metadata.csv'
    metadata_df.to_csv(metadata_path, index=False)
    print(f'Saved metadata to {metadata_path}')
    
    # Visualize sample images
    fig, axes = plt.subplots(2, 4, figsize=(12, 6))
    for idx in range(8):
        ax = axes[idx // 4, idx % 4]
        ax.imshow(images[idx])
        ax.set_title(f'{response_col}: {labels[idx]:.3f}')
        ax.axis('off')
    plt.tight_layout()
    
    vis_path = output_dir / f'{response_col}_sample_images.png'
    plt.savefig(vis_path, dpi=100, bbox_inches='tight')
    print(f'Saved sample visualization to {vis_path}')
    plt.close()


def parse_args():
    import argparse
    parser = argparse.ArgumentParser(description='Convert spectral data to synthetic RGB images.')
    parser.add_argument('csv_path', type=Path, help='Path to CSV dataset')
    parser.add_argument('--response', default='CHL_NN', help='Response variable column')
    parser.add_argument('--output-dir', type=Path, help='Output directory (default: same as CSV)')
    parser.add_argument('--grid-size', type=int, default=32, help='Image size (NxN)')
    return parser.parse_args()


if __name__ == '__main__':
    args = parse_args()
    output_dir = args.output_dir or args.csv_path.parent
    save_image_dataset(args.csv_path, output_dir, args.response, args.grid_size)
