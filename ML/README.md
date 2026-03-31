# 🧠 Aegis.AI — Behavioral Bot Detection Engine

> The machine learning brain that powers real-time anomaly detection.

<br />

## Overview

This module contains the Python-based ML engine that analyzes user behavior to distinguish humans from bots. Instead of relying on static rules, it uses an **Isolation Forest** — an unsupervised anomaly detection algorithm that mathematically isolates outliers in behavioral feature space.

<br />

## The Math

### Why Isolation Forest?

Traditional approaches try to model "normal behavior." Isolation Forest flips this — it directly targets **anomalies** by exploiting one key insight:

> *Anomalies are few and different. They require fewer random splits to be isolated.*

<br />

### How It Works

The algorithm builds an ensemble of random binary trees (iTrees). At each node, it randomly selects a feature and a split value.

**Bots** — with their extreme, systematic values — land on **short branches** (easy to isolate).

**Humans** — clustered densely in normal ranges — require **many deep cuts** to separate.

<br />

### The Anomaly Score

$$s(x, n) = 2^{ -\frac{E(h(x))}{c(n)} }$$

| Symbol | Meaning |
|:-------|:--------|
| $E(h(x))$ | Average path length of point $x$ across all trees |
| $c(n)$ | Normalization constant from BST theory |
| $s \approx 1$ | **Anomaly** (Bot) |
| $s < 0.5$ | **Normal** (Human) |

<br />

## Features Analyzed

| Feature | Human Pattern | Bot Pattern |
|:--------|:-------------|:------------|
| `time_gap` | 1.5 – 30 seconds | 0.01 – 0.8 seconds |
| `request_rate` | 1 – 12 req/min | 40 – 100 req/min |
| `same_ip` | 1 – 3 attempts | 10 – 30 attempts |

<br />

## Module Structure

```
ML/
├── data_generator.py    →  Generates synthetic human + bot training data
├── model.py             →  Trains Isolation Forest with StandardScaler
├── app.py               →  FastAPI inference API with Pydantic validation
├── requirements.txt     →  Python dependencies
└── README.md            →  You are here
```

<br />

## API Endpoints

| Method | Route | Description |
|:-------|:------|:------------|
| `GET` | `/` | Health check — confirms engine is online |
| `POST` | `/predict` | Analyze a behavior vector → returns risk + score + reasons |
| `POST` | `/retrain` | Ingest a confirmed data point and retrain the model |

<br />

### Predict Request

```json
{
  "time_gap": 0.05,
  "request_rate": 95.0,
  "same_ip": 20
}
```

### Predict Response

```json
{
  "risk": "Attack",
  "score": 87,
  "reasons": [
    "Very fast requests",
    "High request rate",
    "Repeated attempts from same IP"
  ]
}
```

<br />

## Key Design Decisions

**1. Feature Scaling**
We use `StandardScaler` to normalize features before training. Without this, `request_rate` (range 1–100) would dominate `time_gap` (range 0–1) in the random splits.

**2. Dynamic Risk Scoring**
Instead of returning a binary "bot or not", we extract the raw `decision_function` score and map it to a continuous 0–100 scale. This gives the dashboard granular risk visualization.

**3. Self-Healing**
If the model files (`.pkl`) are missing on a teammate's machine, the engine automatically generates training data and retrains before serving predictions.

**4. Adaptive Learning**
The `/retrain` endpoint allows the dashboard to correct false positives. The model re-learns the behavioral boundary on the fly.

<br />

## Quick Start

```bash
pip install -r requirements.txt
python data_generator.py
python model.py
uvicorn app:app --reload
```

The API will be live at `http://localhost:8000/docs` with interactive Swagger documentation.

<br />

---

*Aegis.AI ML Engine v1.0*
