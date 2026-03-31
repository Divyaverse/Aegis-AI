from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from model import predict

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