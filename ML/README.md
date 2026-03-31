# Aegis.AI - Behavioral Bot Detection Engine

**Role:** Lead ML Engineer  
**Stack:** Python, FastAPI, Scikit-Learn, Pandas

This repository module contains the machine learning brain of Aegis.AI. Instead of relying on static IP blacklists or rigid rate limits, this engine leverages unsupervised learning to analyze user behavior dynamically, identifying non-human, systematic request patterns indicative of vulnerability scanners, credential stuffing, or DDoS bots.

---

## 🧠 System Architecture

The ML subsystem is strictly modularized for professional scale:

1. **`data_generator.py`**: Simulates organic human behavior against high-speed, systematic bot attacks. It injects realistic noise (e.g., humans occasionally clicking twice).
2. **`model.py`**: Handles mathematical feature engineering and trains the `IsolationForest` to recognize normal behavioral boundaries. It exports the trained matrix as a `.pkl` artifact.
3. **`app.py`**: A low-latency inference REST API built in FastAPI, allowing the Node.js backend to asynchronously query traffic behaviors and receive an instant boolean verdict and explainable Risk Score.

---

## 🧮 How It Works: The Math Behind Isolation Forest

This model utilizes an **Isolation Forest**, an unsupervised anomaly detection algorithm that operates on the core principle: *anomalies are "few and different"*.

Instead of trying to profile what normal behavior looks like, the algorithm actively profiles anomalies by isolating instances in the feature space.

### 1. Random Partitioning (The Trees)
The algorithm builds an ensemble of "Isolation Trees" (iTrees). At each node of the tree, it selects a random feature (e.g., `request_rate`) and randomly selects a split value between the minimum and maximum values of that feature. 

### 2. Path Length ($h(x)$)
Since anomalous data points represent non-human, systematic extreme values (e.g., a bot requesting identical endpoints exactly 0.05 seconds apart), they require far fewer random splits to be isolated in their own leaf node. 
* **Bots (Anomalies):** Land on very short branch paths.
* **Humans (Normal):** Are clustered densely in the middle, requiring many deep cuts to isolate. The path length is consequently much longer.

### 3. The Anomaly Score
The algorithm aggregates the path lengths across the entire forest to compute an anomaly score for a given request $x$:

$$ s(x, n) = 2^{ -\frac{E(h(x))}{c(n)} } $$

* $E(h(x))$ is the average path length of point $x$ across all trees.
* $c(n)$ is a normalization constant (the average path length of unsuccessful search in a Binary Search Tree built from $n$ samples).

**Interpretation:**
* If $s \approx 1$, the instance is an anomaly (Bot).
* If $s < 0.5$, the instance is a normal point (Human).
* In Scikit-Learn, this maps to `-1` for anomalies and `1` for normal traffic.

---

## 🚀 Advanced Feature Engineering (Future Roadmap)

While the initial model effectively utilizes `time_gap`, `request_rate`, and `same_ip`, bot detection is an arms race. Future iterations of this model should consider engineering the following sophisticated features:

1. **`time_gap_variance`**: Bots are highly programmatic resulting in temporal consistency. Humans hesitate—the variance between a human's clicks fluctuates wildly. A variance approaching `0` strongly indicates an automated script.
2. **`path_diversity_ratio`**: Scanners enumerate directories systematically (e.g., `/login`, `/admin/panel`). Measuring `unique_paths / total_requests_in_session` helps identify traversal fuzzing versus organic human linear workflows.
3. **`failure_rate` (4xx/5xx)**: Brute-forcers generate heavy volumes of 401/403 errors, and scanners generate 404s. Identifying IPs with a sudden spike in client errors isolates attackers searching for undocumented vulnerabilities.
4. **`payload_size_variance`**: If tracking POST requests, fuzzing tools often send inputs of highly erratic byte sizes to test for overflow vulnerabilities.

---

## 🏃‍♂️ Running the API

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. Generate synthetic data and build the initial model:
   ```bash
   python data_generator.py
   python model.py
   ```
3. Start the Inference Engine:
   ```bash
   uvicorn app:app --reload
   ```

The API will be live at `http://127.0.0.1:8000/docs`, providing interactive Swagger UI documentation for backend integration testing.
