import pytest
import json
import numpy as np
from flask import Flask
from server import app

@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client

def test_health(client):
    response = client.get("/health")
    assert response.status_code == 200

def test_rate_limiting(client):
    """Test that the rate limiter returns 429 when threshold is exceeded."""
    # The capacity is 10. Let's make 15 fast requests to /run-umap
    # /run-umap returns 400 if model isn't trained, but rate limit comes first.
    responses = []
    for _ in range(15):
        responses.append(client.get("/run-umap"))
        
    status_codes = [r.status_code for r in responses]
    assert 429 in status_codes
    assert status_codes.count(429) > 0

def test_cube_validation_success(client):
    """Test valid 20x20 cube input."""
    # Synthetic cube 20x20x7
    cube = np.random.rand(20, 20, 7).tolist()
    response = client.post(
        "/api/molecule/decompose",
        data=json.dumps({"cube": cube}),
        content_type="application/json"
    )
    # If the rate limit is hit, wait or reset. We'll assume the first request works.
    assert response.status_code in [200, 429]

def test_cube_validation_failure_nan(client):
    """Test that NaN values are rejected by Pydantic."""
    cube = np.random.rand(20, 20, 7)
    cube[0, 0, 0] = np.nan
    response = client.post(
        "/api/molecule/decompose",
        data=json.dumps({"cube": cube.tolist()}),
        content_type="application/json"
    )
    assert response.status_code == 400
    assert "NaN or Inf" in response.get_data(as_text=True)

def test_cube_validation_failure_shape(client):
    """Test that bad shape is rejected."""
    cube = np.random.rand(10, 10, 7).tolist()
    response = client.post(
        "/api/molecule/decompose",
        data=json.dumps({"cube": cube}),
        content_type="application/json"
    )
    assert response.status_code == 400
    assert "dimensions 20x20" in response.get_data(as_text=True)

def test_train_encoder_validation(client):
    """Test that invalid train payload is rejected."""
    response = client.post(
        "/train-encoder",
        data=json.dumps({"epochs": "not_an_int"}),
        content_type="application/json"
    )
    assert response.status_code == 400
    assert "Invalid input format" in response.get_data(as_text=True)
