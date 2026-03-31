<p align="center">
  <h1 align="center">🛡️ Aegis.AI</h1>
  <p align="center">
    <strong>Neuro-Behavioral Anti-Bot Defense System</strong>
    <br />
    <em>Team Leviosa · Hackovium 2026</em>
  </p>
</p>

<br />

## The Problem

FinTech platforms face a growing threat from sophisticated automated bots — credential stuffing, brute-force attacks, and DDoS floods that bypass traditional IP blacklists. Static rules can't keep up with bots that rotate proxies and mimic human behavior.

<br />

## Our Solution

Aegis.AI doesn't block IPs — it **reads behavior**.

We deploy an **Isolation Forest** anomaly detection model that analyzes the *rhythm* of incoming traffic. By measuring the mathematical distance between a user's behavioral fingerprint and known human patterns, we identify and neutralize automated threats in **real-time**.

<br />

## How It Works

```
                    ┌─────────────────────┐
  User Request ───▶ │   Node.js Backend   │
                    │   (Port 5000)       │
                    └────────┬────────────┘
                             │
                    ┌────────▼────────────┐
                    │  Python ML Engine   │
                    │  Isolation Forest   │
                    │   (Port 8000)       │
                    └────────┬────────────┘
                             │
              ┌──────────────▼──────────────┐
              │     Risk Score (0–100)       │
              │  > 90 = Auto-Block IP        │
              │  > 40 = Suspicious Alert     │
              │  < 40 = Safe / Human         │
              └──────────────┬──────────────┘
                             │
                    ┌────────▼────────────┐
                    │   Next.js Dashboard │
                    │   Live via Socket.IO│
                    │   (Port 3000)       │
                    └─────────────────────┘
```

<br />

## Tech Stack

| Layer | Technology | Purpose |
|:------|:-----------|:--------|
| **Frontend** | Next.js 14 · TypeScript · Tailwind · Three.js · Recharts | SOC Dashboard with 3D visualization and live alerts |
| **Backend** | Node.js · Express · Socket.IO · Helmet | Request orchestration, IP blocking, real-time events |
| **ML Engine** | Python · FastAPI · Scikit-Learn · Pandas | Behavioral anomaly detection and adaptive retraining |

<br />

## Quick Start

> **Prerequisites:** Node.js 18+, Python 3.8+, npm

<br />

**Step 1 — Launch the ML Brain**

```bash
cd ML
pip install -r requirements.txt
python data_generator.py
python model.py
uvicorn app:app --reload
```

<br />

**Step 2 — Launch the Defense Backend**

```bash
cd backend
npm install
npm run dev
```

<br />

**Step 3 — Launch the Dashboard**

```bash
cd Frontend/aegis-ai-nextjs/aegis-ai
npm install
npm run dev
```

<br />

**Step 4 — Run the Demo**

Open `http://localhost:3000` and press **`Ctrl + Shift + A`** to trigger a live attack simulation.

<br />

## Key Features

- **Behavioral Anomaly Detection** — Isolation Forest identifies non-human traffic patterns
- **Real-Time Defense** — Socket.IO broadcasts live threat alerts to the dashboard
- **Adaptive Learning** — `/retrain` endpoint evolves the model against new attack strategies
- **Auto-Blocking** — IPs with risk score > 90 are blocked instantly
- **Hybrid Dashboard** — Works in LIVE mode (connected) or SIM mode (standalone demo)
- **3D Threat Visualization** — Interactive Three.js botnet cluster map

<br />

## Team

| Name | Role | Responsibility |
|:-----|:-----|:---------------|
| **Harman Saini** | ML Engineer | Isolation Forest model, feature scaling, adaptive retraining |
| **Divya Tiwari** | Backend Engineer | Express server, Socket.IO, IP blocking, traffic simulation |
| **Shrishti Singh** | Frontend Engineer | Next.js dashboard, Three.js visualization, Recharts |
| **Swapnil Harad** | Presenter | System architecture, demo flow, judge Q&A |

<br />

---

<p align="center">
  <em>Built with ❤️ for Hackovium 2026</em>
</p>
