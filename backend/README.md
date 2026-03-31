# 🖥️ Aegis.AI — Backend Engine

> The orchestration layer that connects the ML brain to the frontend dashboard.

<br />

## Overview

This is the **Node.js/Express** backend that handles:

- Receiving login attempts and forwarding behavioral data to the ML engine
- Auto-blocking malicious IPs based on ML risk scores
- Broadcasting real-time threat alerts via Socket.IO
- Providing dashboard APIs for stats, graphs, and alert history
- Simulating attack traffic for hackathon demos

<br />

## Architecture

```
Frontend (3000)
    │
    ▼
┌──────────────────────────────┐
│        Express Server        │
│          (Port 5000)         │
├──────────────────────────────┤
│                              │
│  Middleware                  │
│  ├── Helmet (Security)       │
│  ├── CORS                    │
│  ├── Rate Limiter (100/min)  │
│  └── Request ID Tracking     │
│                              │
│  Routes                      │
│  ├── POST /auth/login        │
│  ├── GET  /dashboard         │
│  ├── GET  /graph-data        │
│  ├── GET  /alerts            │
│  ├── POST /simulate/traffic  │
│  └── GET  /docs              │
│                              │
│  Services                    │
│  ├── mlService.js  ──────────┼──▶  ML Engine (8000)
│  └── notificationService.js  │
│                              │
│  Store                       │
│  └── memoryStore.js          │
│                              │
└──────────────────────────────┘
    │
    ▼
Socket.IO ──▶ Frontend (Live Alerts)
```

<br />

## API Endpoints

### Authentication

| Method | Route | Description |
|:-------|:------|:------------|
| `POST` | `/auth/login` | Analyze a login attempt via ML engine |
| `GET` | `/auth/blocked` | List all currently blocked IPs |

### Dashboard

| Method | Route | Description |
|:-------|:------|:------------|
| `GET` | `/dashboard` | Full dashboard payload (stats, logs, alerts, timeline) |
| `GET` | `/graph-data` | Network graph nodes + links for visualization |
| `GET` | `/alerts` | High-risk activity history |
| `GET` | `/alerts?level=attack` | Attack-only alerts |

### Simulation

| Method | Route | Description |
|:-------|:------|:------------|
| `POST` | `/simulate/traffic?count=50` | Generate simulated traffic for demo |
| `DELETE` | `/simulate/reset` | Clear all data for a fresh demo |

<br />

## Socket.IO Events

The backend emits real-time events to connected frontends:

| Event | Trigger | Payload |
|:------|:--------|:--------|
| `new_log` | Every login attempt | `{ log_id, user_id, ip, risk, score, reasons }` |
| `threat_alert` | Risk ≥ Suspicious | `{ type, severity, ip, score, blocked }` |
| `stats_update` | After each analysis | `{ total_requests, attack_count, blocked_ips_count }` |

<br />

## Quick Start

```bash
npm install
npm run dev
```

The server will start at `http://localhost:5000`.

<br />

## Dependencies

| Package | Purpose |
|:--------|:--------|
| `express` | HTTP server framework |
| `socket.io` | Real-time WebSocket communication |
| `axios` | HTTP client for ML engine calls |
| `helmet` | Security headers |
| `express-rate-limit` | Brute-force protection |
| `cors` | Cross-origin resource sharing |
| `morgan` | HTTP request logging |

<br />

---

*Aegis.AI Backend v1.0*
