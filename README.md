# 🛡️ Aegis.AI — Behavioral Bot Detection System

**Aegis.AI** is a proactive cybersecurity suite designed to detect and block automated attacks (bots) using unsupervised machine learning instead of traditional, static IP blacklists.

---

## 🚀 Impact Summary
This platform uses the **"Isolation Forest"** anomaly detection algorithm to identify non-human behavior patterns (e.g., impossible request frequencies and robotic time-gaps) in real-time.

1.  **Behavioral Brain (ML Engine)**: Analyzes traffic vectors (time-gap, rate, same-ip) and provides instantaneous risk scores.
2.  **Live Defense (Node.js)**: Auto-blocks bots with high risk scores (> 90) and notifies the dashboard via WebSockets.
3.  **Visualization Dashboard**: Displays live threat alerts, active bot clusters, and global attack origin mapping.

---

## 🏗️ Project Architecture
The project is split into two modular cores to ensure maximum scalability:
*   **/backend**: The Express/Node.js orchestration layer. Handles real-time communication, IP blocking, and dashboard data aggregation.
*   **/ML**: The Python/FastAPI brain. Handles feature scaling, model inference, and adaptive retraining.

---

## ⚡ Quick Start (Demo Setup)

### 1. Launch the ML Brain
Requires: `Python 3.8+`, `FastAPI`, `Scikit-Learn`
```bash
cd ML
pip install -r requirements.txt
python model.py  # (Initial data generation & training)
uvicorn app:app --reload
```
*Live at:* `http://localhost:8000`

### 2. Launch the Defense Backend
Requires: `Node.js 18+`, `npm`
```bash
cd backend
npm install
npm run dev
```
*Live at:* `http://localhost:5000`

### 3. Generate Simulated Traffic
To see the system in action for a demo, trigger the simulation:
```bash
# Populates the dashboard with 50 mixed (normal+attack) logs
curl -X POST "http://localhost:5000/simulate/traffic?count=50"
```

---

*Aegis.AI *
