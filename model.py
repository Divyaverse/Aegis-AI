import pandas as pd
import joblib
from sklearn.ensemble import IsolationForest
import os

# ================================
# 1. LOAD DATA
# ================================

def load_training_data(filepath="data/raw/traffic_logs.csv"):
    if not os.path.exists(filepath):
        print(f" Error: {filepath} not found. Run data_generator.py first!")
        return None
    
    df = pd.read_csv(filepath)
    
    # Use only features (unsupervised learning)
    features = df[['time_gap', 'request_rate', 'same_ip']]
    
    return features


# ================================
# 2. TRAIN MODEL
# ================================

def train_model():
    data = load_training_data()
    
    if data is None:
        return
    
    print("🧠 Training the Behavioral Brain...")

    # Match contamination with bot proportion (~30%)
    model = IsolationForest(contamination=0.3, random_state=42)

    model.fit(data)

    # Create folder if not exists
    os.makedirs("models", exist_ok=True)

    # Save trained model
    joblib.dump(model, "models/behavior_model.pkl")

    print("✅ Model trained and saved to models/behavior_model.pkl")


# ================================
# 3. LOAD MODEL
# ================================

def load_model():
    model_path = "models/behavior_model.pkl"

    if not os.path.exists(model_path):
        print("⚠️ Model not found. Training new model...")
        train_model()

    return joblib.load(model_path)


# ================================
# 4. PREDICTION FUNCTION
# ================================

def predict(data_point):
    """
    Input: [time_gap, request_rate, same_ip]
    Output: risk label + score + reasons
    """

    model = load_model()

    prediction = model.predict([data_point])[0]

    # Convert prediction
    if prediction == -1:
        risk = "Attack"
    else:
        risk = "Safe"

    score = calculate_risk_score(prediction)
    reasons = explain(data_point)

    return {
        "risk": risk,
        "score": score,
        "reasons": reasons
    }


# ================================
# 5. RISK SCORING
# ================================

def calculate_risk_score(prediction_raw):
    """
    Isolation Forest output:
    1  -> Normal
    -1 -> Anomaly
    """

    if prediction_raw == -1:
        return 90  # High risk
    else:
        return 20  # Low risk


# ================================
# 6. EXPLANATION FUNCTION
# ================================

def explain(data_point):
    time_gap, request_rate, same_ip = data_point

    reasons = []

    if time_gap < 0.5:
        reasons.append("Very fast requests")
    if request_rate > 20:
        reasons.append("High request rate")
    if same_ip > 5:
        reasons.append("Repeated attempts from same IP")

    return reasons


# ================================
# 7. TEST RUN
# ================================

if __name__ == "__main__":
    # Ensure model is trained
    train_model()

    # Test sample
    test_data = [0.2, 50, 10]

    result = predict(test_data)

    print("\n🔍 Test Result:")
    print(result)