from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from model import predict, train_model
import pandas as pd
import os

# 1. Initialize App
app = FastAPI(title="Aegis.AI ML Engine", version="1.0.0")

# 2. Enable CORS (Crucial for Hackathon Integration)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allows all origins (Frontend/Backend)
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Enhanced Input Format with Validation
class InputData(BaseModel):
    time_gap: float = Field(..., gt=0, description="Time between requests in seconds")
    request_rate: float = Field(..., ge=0, description="Requests per minute")
    same_ip: int = Field(..., ge=1, description="Number of attempts from this IP")

class RetrainData(InputData):
    is_bot: int = Field(..., ge=0, le=1, description="1 if verified Bot, 0 if verified Human")

@app.get("/")
def home():
    return {
        "message": "Aegis.AI ML Engine is running 🚀",
        "status": "Online",
        "docs": "/docs"
    }

@app.post("/predict")
def get_prediction(data: InputData):
    try:
        # Convert Pydantic object to list for model.py
        input_list = [data.time_gap, data.request_rate, data.same_ip]
        
        # Get result from model.py logic
        result = predict(input_list)
        
        return result
    except Exception as e:
        # If something goes wrong, return a 500 error instead of crashing
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/retrain")
def retrain_model_dynamically(data: RetrainData):
    """
    Adaptive Learning: Accepts a confirmed data point from the dashboard,
    appends it to the CSV, and retrains the AI on the fly.
    """
    try:
        filepath = "data/raw/traffic_logs.csv"
        
        # Format the new row exactly like the dataset
        new_row = {
            "time_gap": data.time_gap,
            "request_rate": data.request_rate,
            "same_ip": data.same_ip,
            "is_bot": data.is_bot
        }
        
        # Append logic (handling both empty/missing file and existing file safely)
        df_new = pd.DataFrame([new_row])
        if os.path.exists(filepath):
            df_new.to_csv(filepath, mode='a', header=False, index=False)
        else:
            os.makedirs(os.path.dirname(filepath), exist_ok=True)
            df_new.to_csv(filepath, index=False)
        
        # Retrain the model so the matrix learns this exact behavior boundary
        train_model()
        
        return {
            "status": "Success",
            "message": "AI successfully ingested the new behavior and re-calibrated the defensive matrix."
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to adapt/retrain: {str(e)}")