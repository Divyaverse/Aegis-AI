import requests
import time

BASE_URL = "http://localhost:8000"

def run_tests():
    print(f"🚦 Testing Connection to {BASE_URL}...")
    try:
        res = requests.get(f"{BASE_URL}/")
        print("✅ Connection Successful:", res.json())
    except requests.exceptions.ConnectionError:
        print("❌ Error: Could not connect to the API. Make sure 'uvicorn app:app --reload' is running!")
        return

    print("\n-------------------------")
    print("🛡️ TEST 1: Safe Human Traffic")
    safe_payload = {
        "time_gap": 15.0,
        "request_rate": 2.0,
        "same_ip": 1
    }
    safe_response = requests.post(f"{BASE_URL}/predict", json=safe_payload)
    print("Status:", safe_response.status_code)
    print("AI Decision:", safe_response.json())

    print("\n-------------------------")
    print("🚨 TEST 2: Aggressive Bot Traffic")
    bot_payload = {
        "time_gap": 0.05,
        "request_rate": 95.0,
        "same_ip": 20
    }
    bot_response = requests.post(f"{BASE_URL}/predict", json=bot_payload)
    print("Status:", bot_response.status_code)
    print("AI Decision:", bot_response.json())

    print("\n-------------------------")
    print("🔄 TEST 3: Adaptive Retraining (False Positive Correction)")
    # Simulating the dashboard marking an aggressive behavior as actually 'Safe' (is_bot = 0)
    retrain_payload = {
        "time_gap": 0.05,
        "request_rate": 95.0,
        "same_ip": 20,
        "is_bot": 0
    }
    retrain_response = requests.post(f"{BASE_URL}/retrain", json=retrain_payload)
    print("Status:", retrain_response.status_code)
    print("AI Decision:", retrain_response.json())

if __name__ == "__main__":
    run_tests()
