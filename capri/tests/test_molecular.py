import pytest
import numpy as np
import torch
from molecular_tensor import tensor_to_3d_voxels, detect_symmetry, Molecular3DCNN, decompose_to_molecular_fingerprint
from ecological_encoder import EcologicalEncoder
from cube_builder import TileMetadata

def test_tensor_to_3d_voxels():
    # Construct a dummy cube of shape (20, 20, 8)
    dummy_cube = np.random.rand(20, 20, 8).astype(np.float32)
    voxels = tensor_to_3d_voxels(dummy_cube)
    assert voxels.shape == (7, 20, 20, 20)
    assert voxels.min() >= 0.0
    
    # Test fallback when SST is missing (7 channels)
    dummy_cube_7 = np.random.rand(20, 20, 7).astype(np.float32)
    voxels_7 = tensor_to_3d_voxels(dummy_cube_7)
    assert voxels_7.shape == (7, 20, 20, 20)

def test_detect_symmetry():
    # Create a perfectly symmetric voxel grid
    # Let's create all zeros and make CHL (channel 0) symmetric
    voxels = np.zeros((7, 20, 20, 20), dtype=np.float32)
    
    # Fill channel 0 with a symmetric pattern along the xy plane
    # 4-fold symmetry: identical when rotated by 90, 180, 270 degrees
    # Let's make it a circle/ring/uniform value
    voxels[0, :, :, :] = 0.5
    
    symmetries = detect_symmetry(voxels)
    assert "4-fold rotational symmetry" in symmetries
    assert "reflectional symmetry (horizontal)" in symmetries
    assert "reflectional symmetry (vertical)" in symmetries

    # Create a non-symmetric voxel grid
    asymmetric_voxels = np.zeros((7, 20, 20, 20), dtype=np.float32)
    asymmetric_voxels[0, 2, 5, :] = 1.0 # asymmetric point
    asymmetric_symmetries = detect_symmetry(asymmetric_voxels)
    assert "4-fold rotational symmetry" not in asymmetric_symmetries

def test_molecular_3d_cnn():
    model = Molecular3DCNN(in_channels=7, latent_dim=128)
    # Batch size of 2, 7 channels, 20x20x20 voxel grid
    dummy_input = torch.randn(2, 7, 20, 20, 20)
    output = model(dummy_input)
    assert output.shape == (2, 128)

def test_augmented_encoder_channels():
    encoder = EcologicalEncoder()
    dummy_cube = np.random.rand(20, 20, 8).astype(np.float32)
    meta = TileMetadata(source_file="test_metadata.csv", regime="coastal")
    
    encoding = encoder.encode(dummy_cube, meta)
    # Original: 7 (vars) + 56 (relationships) + 63 (spatial features) + 128 (molecular fingerprints) = 254?
    # Wait, let's calculate exact numbers:
    # 7 variables:
    # Relationship features: all pairs of 7 variables is 7 * 6 = 42?
    # Wait, let's count actual features in the manifest
    manifest_len = len(encoding.channel_manifest)
    print("Channel manifest length:", manifest_len)
    
    # Let's assert tensor shape matches manifest length
    tensor = encoding.to_tensor()
    assert tensor.shape[0] == manifest_len
    
    vector = encoding.to_vector()
    assert len(vector) == 20 * 20 * manifest_len
