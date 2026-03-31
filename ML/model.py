import pandas as pd
import joblib
import numpy as np
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler # Added for Top 5% scaling
import os

# ================================
# 1. LOAD DATA
# ================================

def load_training_data(filepath="data/raw/traffic_logs.csv"):
    if not os.path.exists(filepath):
        print(f"❌ Error: {filepath} not found. Run data_generator.py first!")
        return None
    
    df = pd.read_csv(filepath)
    # Using specific features as per workflow [cite: 60, 61, 62]
    features = df[['time_gap', 'request_rate', 'same_ip']]
    return features

# ================================
# 2. TRAIN MODEL (With Scaling)
# ================================

def train_model():
    data = load_training_data()
    if data is None:
        return
    
    print("🧠 Training the Behavioral Brain with Feature Scaling...")

    # TOP 5% IMPROVEMENT: Scaling features so request_rate doesn't overpower time_gap
    scaler = StandardScaler()
    scaled_data = scaler.fit_transform(data)

    # Match contamination with bot proportion (~30%)
    model = IsolationForest(contamination=0.3, random_state=42)
    model.fit(scaled_data)

    os.makedirs("models", exist_ok=True)

    # Save both model and scaler (must use the same scaler for predictions later)
    joblib.dump(model, "models/behavior_model.pkl")
    joblib.dump(scaler, "models/scaler.pkl")

    print("✅ Model and Scaler saved to /models/")

# ================================
# 3. PREDICTION & DYNAMIC SCORING
# ================================

def predict(data_point):
    """
    Input: [time_gap, request_rate, same_ip]
    Output: risk label + dynamic score + reasons
    """
    # Protect against missing files by dynamically retraining
    if not os.path.exists("models/behavior_model.pkl") or not os.path.exists("models/scaler.pkl"):
        print("⚠️ Models missing! Auto-healing by running train_model()...")
        train_model()

    # Load assets
    model = joblib.load("models/behavior_model.pkl")
    scaler = joblib.load("models/scaler.pkl")

    # 1. Scale the incoming data point exactly like the training data
    scaled_point = scaler.transform(pd.DataFrame([data_point], columns=['time_gap', 'request_rate', 'same_ip']))


    # 2. Get Prediction (-1 for Anomaly, 1 for Normal) [cite: 66]
    prediction = model.predict(scaled_point)[0]

    # 3. TOP 5% IMPROVEMENT: Dynamic Risk Score using decision_function
    # Lower decision scores mean more "isolated" (suspicious) behavior
    raw_score = model.decision_function(scaled_point)[0]
    
    # Mathematical mapping to 0-100 scale (High anomaly = Higher score)
    # We use a simple inversion: as raw_score decreases, risk increases.
    dynamic_score = int(max(0, min(100, (0.5 - raw_score) * 100)))

    risk = "Attack" if prediction == -1 else "Safe"
    reasons = explain(data_point)

    return {
        "risk": risk,
        "score": dynamic_score,
        "reasons": reasons
    }

# ================================
# 4. EXPLANATION FUNCTION
# ================================

def explain(data_point):
    time_gap, request_rate, same_ip = data_point
    reasons = []

    # Explanations based on behavioral thresholds [cite: 75, 76, 77]
    if time_gap < 0.5:
        reasons.append("Very fast requests")
    if request_rate > 20:
        reasons.append("High request rate")
    if same_ip > 5:
        reasons.append("Repeated attempts from same IP")

    return reasons

if __name__ == "__main__":
    train_model()
    # Test sample: High speed, high frequency [cite: 57]
    test_result = predict([0.1, 85, 12])
    print(f"\n🔍 Dynamic Test Result: {test_result}")