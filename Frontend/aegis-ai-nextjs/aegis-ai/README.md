# Aegis.AI — Neuro-Behavioral Anti-Bot Defense
### Team Leviosa · HackUp 2026 · AC Patil College of Engineering

A production-grade Next.js 14 SOC Dashboard for detecting automated bot attacks on FinTech platforms using behavioral AI and Isolation Forest anomaly detection.

---

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Features

- **Live SOC Dashboard** — Real-time stats: logins, bot attacks, suspicious requests, blocked IPs
- **Login Activity Timeline** — Recharts area chart with live-updating normal vs attack traffic
- **Botnet Cluster Map** — Canvas-based animated network graph showing IP nodes, edges, and bot cluster glow
- **Live Security Alerts Feed** — Auto-injecting alerts with severity levels and risk scores
- **Risk Distribution Panel** — Radial bar chart + attack vector mini-bars
- **High-Risk IP Registry** — Full table with Δt, risk score bars, req/s, geo, threat levels
- **Attack Simulator** — Triggers a 24-second synthetic attack sequence (Probing → Burst → Botnet → Blocked) that drives all live data
- **Isolation Forest ML Info** — Shows model parameters and accuracy

## Tech Stack (Frontend)

| Layer       | Tech                              |
|-------------|-----------------------------------|
| Framework   | Next.js 14 (App Router)           |
| Language    | TypeScript                        |
| Styling     | Tailwind CSS + CSS Variables      |
| Charts      | Recharts                          |
| Animation   | Framer Motion + CSS Keyframes     |
| Icons       | Lucide React                      |
| Fonts       | Syne (display) + JetBrains Mono   |

## Full System Architecture (from project)

```
Logs → Feature Extraction → ML Model (Isolation Forest) → Risk Score → Dashboard
```

- **Log Ingestion**: Node.js + Express captures login & API events
- **Feature Extraction**: Δt patterns, request rate, IP switching, behavioral entropy
- **ML Engine**: Python + FastAPI + Scikit-learn (Isolation Forest, contamination=0.12)
- **Database**: MongoDB (logs) + PostgreSQL (structured)
- **Frontend**: This repo — React/Next.js + Tailwind

## Project Structure

```
aegis-ai/
├── app/
│   ├── layout.tsx         # Root layout with font imports
│   ├── page.tsx           # Home → DashboardShell
│   └── globals.css        # CSS variables, animations, utilities
├── components/
│   ├── ui/
│   │   ├── PanelHeader.tsx
│   │   ├── StatCard.tsx
│   │   ├── ThreatPill.tsx
│   │   └── ScoreBar.tsx
│   ├── dashboard/
│   │   ├── DashboardShell.tsx   # Main layout orchestrator
│   │   ├── Header.tsx           # Nav + status badge
│   │   ├── StatsRow.tsx         # 4 KPI cards
│   │   ├── AlertsFeed.tsx       # Live alerts sidebar
│   │   ├── RiskDistribution.tsx # Ring chart + bars
│   │   ├── IPTable.tsx          # IP registry table
│   │   ├── AttackSimulator.tsx  # Demo trigger panel
│   │   └── SystemFooter.tsx     # Model info footer
│   ├── charts/
│   │   └── LoginActivityChart.tsx
│   └── network/
│       └── NetworkGraph.tsx     # Canvas botnet visualization
├── hooks/
│   ├── useSimulation.ts   # All live data simulation
│   └── useClock.ts
├── lib/
│   ├── utils.ts           # Helpers + mock data generators
│   └── simulation.ts      # Attack simulation engine
└── types/
    └── index.ts           # All TypeScript types
```

## Team

| Name           | Role       | College                          |
|----------------|------------|----------------------------------|
| Harman Saini   | ML         | Chhatrapati Shivaji Maharaj Univ |
| Divya Tiwari   | Backend    | SIES Graduate School of Tech     |
| Shrishti Singh | Frontend   | Chhatrapati Shivaji Maharaj Univ |
| Swapnil Harad  | Presenter  | Datta Meghe College of Engg      |
