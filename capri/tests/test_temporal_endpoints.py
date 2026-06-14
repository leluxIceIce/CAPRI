import pytest
import json
import os
import shutil
import numpy as np
import pandas as pd
from pathlib import Path
from flask import Flask
from server import app

@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client

def test_list_temporal_batches(client):
    # Ensure datasets/temporal_batches exists
    folder = Path("datasets/temporal_batches")
    folder.mkdir(parents=True, exist_ok=True)
    
    # Create a dummy batch folder
    dummy_batch = folder / "test_batch_123"
    dummy_batch.mkdir(parents=True, exist_ok=True)
    
    response = client.get("/api/temporal/list")
    assert response.status_code == 200
    data = response.get_json()
    assert "batches" in data
    assert "test_batch_123" in data["batches"]
    
    # Cleanup dummy folder
    shutil.rmtree(dummy_batch)

def test_manage_temporal_manifest(client):
    # Check GET before any manifest exists or when it does
    response_get = client.get("/api/temporal/manifest")
    assert response_get.status_code == 200
    
    # Test POST
    payload = {"selections": ["dataset_A", "dataset_B"]}
    response_post = client.post(
        "/api/temporal/manifest",
        data=json.dumps(payload),
        content_type="application/json"
    )
    assert response_post.status_code == 200
    assert response_post.get_json()["status"] == "success"
    
    # Test GET again to check if it matches the payload
    response_get2 = client.get("/api/temporal/manifest")
    assert response_get2.status_code == 200
    assert response_get2.get_json() == payload
    
    # Clean up manifest file
    manifest_path = Path("saved_manifests/training_manifest.json")
    if manifest_path.exists():
        manifest_path.unlink()

def test_load_temporal_batch(client):
    # Create mock temporal batch folder with a mock CSV
    folder = Path("datasets/temporal_batches") / "mock_batch"
    folder.mkdir(parents=True, exist_ok=True)
    
    df = pd.DataFrame({
        "CHL": np.random.rand(400),
        "aphy": np.random.rand(400),
        "ADG": np.random.rand(400),
        "bbp": np.random.rand(400),
        "TSM": np.random.rand(400),
        "PAR": np.random.rand(400),
        "KD490": np.random.rand(400),
        "longitude": np.full(400, 5.0),
        "latitude": np.full(400, 54.0)
    })
    df.to_csv(folder / "observation_2020-05-01.csv", index=False)
    df.to_csv(folder / "cube_2020-05-02.csv", index=False)
    
    payload = {"batch_id": "mock_batch"}
    response = client.post(
        "/api/temporal/load",
        data=json.dumps(payload),
        content_type="application/json"
    )
    assert response.status_code in [200, 429]
    if response.status_code == 200:
        data = response.get_json()
        assert data["batch_id"] == "mock_batch"
        assert "umap_trajectory" in data
        assert "time_series" in data
        assert "trajectory_analysis" in data
        assert "correlation_delta" in data
        
    # Cleanup
    shutil.rmtree(folder)
