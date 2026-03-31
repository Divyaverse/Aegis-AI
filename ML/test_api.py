import pytest
from fastapi.testclient import TestClient
from app import app

# Initialize FastAPI's test client
client = TestClient(app)

def test_home_endpoint():
    """Test if the API is successfully running."""
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["status"] == "Online"

def test_predict_human_behavior():
    """Test a data point representing a normal human user."""
    payload = {
        "time_gap": 15.5,
        "request_rate": 2,
        "same_ip": 1
    }
    
    response = client.post("/predict", json=payload)
    
    # Assert successful network request
    assert response.status_code == 200
    
    # Assert model marks this as completely Safe
    data = response.json()
    assert data["risk"] == "Safe"
    assert data["score"] == 20 # Low risk
    assert len(data["reasons"]) == 0 # No anomalous flags

def test_predict_bot_behavior():
    """Test a data point representing an aggressive automated bot scanner."""
    payload = {
        "time_gap": 0.05, # Extremely fast
        "request_rate": 80, # Very high volume
        "same_ip": 15 # Multiple quick hits from 1 IP
    }
    
    response = client.post("/predict", json=payload)
    
    assert response.status_code == 200
    
    # Assert model marks this as an Attack
    data = response.json()
    assert data["risk"] == "Attack"
    assert data["score"] == 90 # High anomalous risk
    assert "Very fast requests" in data["reasons"]
    assert "High request rate" in data["reasons"]
    assert "Repeated attempts from same IP" in data["reasons"]

def test_predict_validation_error():
    """Test if FastAPI catches malformed data gracefully."""
    # Sending missing parameters or invalid negative times (which doesn't make sense physically)
    payload = {
        "time_gap": -5.0, # Time cannot be negative (as restricted in app.py)
        "request_rate": 5,
        "same_ip": 1
    }
    
    response = client.post("/predict", json=payload)
    
    # Make sure app.py catches the negative Pydantic schema validation as a 422 Unprocessable Entity
    # rather than crashing the model on the backend team
    assert response.status_code == 422
