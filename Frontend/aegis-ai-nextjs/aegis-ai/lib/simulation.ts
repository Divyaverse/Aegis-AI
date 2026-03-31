import type { IPRecord, SecurityAlert, ChartDataPoint, SystemStats } from "@/types";

// ─── Simulation State ─────────────────────────────────────────────────────────
// This module simulates a live bot attack arriving at a FinTech API.
// It drives all the live counters, chart updates, and alert generation
// that the dashboard displays in real-time.

export interface SimulationState {
  isAttackActive: boolean;
  attackIntensity: number;    // 0–1
  attackPhase: "idle" | "probing" | "burst" | "botnet" | "blocked";
  totalLogins: number;
  suspiciousRequests: number;
  botAttacks: number;
  blockedIPs: number;
  modelLatency: number;
  uptimeSeconds: number;
  chartBuffer: ChartDataPoint[];
  recentAlerts: SecurityAlert[];
  ipRecords: IPRecord[];
}

// Patch a live chart data point
export function tickChart(
  prev: ChartDataPoint[],
  isAttackActive: boolean,
  intensity: number
): ChartDataPoint[] {
  const now = new Date();
  const label = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  const normal = Math.round(40 + Math.random() * 55);
  const attack = isAttackActive
    ? Math.round(60 + intensity * 160 + Math.random() * 40)
    : Math.round(Math.random() * 12);
  const suspicious = isAttackActive
    ? Math.round(20 + intensity * 60 + Math.random() * 20)
    : Math.round(Math.random() * 25);

  const next = [...prev.slice(-47), { time: label, normal, attack, suspicious }];
  return next;
}

// Simulate live IP record mutations
export function tickIPRecords(records: IPRecord[], isAttack: boolean): IPRecord[] {
  return records.map((r) => {
    if (!isAttack) return r;
    if (r.status === "critical") {
      return {
        ...r,
        requestsPerSec: Math.max(100, r.requestsPerSec + Math.floor((Math.random() - 0.3) * 100)),
        attempts: r.attempts + Math.floor(Math.random() * 80),
        lastSeen: new Date(),
        riskScore: Math.min(99, r.riskScore + (Math.random() > 0.7 ? 1 : 0)),
      };
    }
    return r;
  });
}

// Incoming alert queue for the live feed
const incomingAlerts: Omit<SecurityAlert, "id" | "timestamp">[] = [
  {
    type: "critical",
    title: "New Bot Node Joined Cluster",
    message: "BCN-014 cluster expanded — node 15 activated",
    meta: "IP: 203.0.113.52 · Δt: 1.1ms · Behavior: Machine",
    riskScore: 91,
    isNew: true,
  },
  {
    type: "warning",
    title: "API Rate Limit Approaching",
    message: "/v1/balance endpoint under heavy load",
    meta: "Current: 890 req/s · Limit: 1000 req/s",
    riskScore: 63,
    isNew: true,
  },
  {
    type: "critical",
    title: "Session Token Forging Attempt",
    message: "Malformed JWT tokens detected from bot cluster",
    meta: "Count: 214 · Source: 192.168.1.104 · Type: HMAC replay",
    riskScore: 95,
    isNew: true,
  },
  {
    type: "info",
    title: "Behavioral Entropy Drop",
    message: "Request timing entropy fell below human threshold",
    meta: "Entropy: 0.12 bits (human baseline: 2.4 bits)",
    riskScore: 76,
    isNew: true,
  },
  {
    type: "warning",
    title: "Account Enumeration Detected",
    message: "Sequential user ID probing pattern identified",
    meta: "Range: UID_10041–UID_10680 · Rate: 42 IDs/s",
    riskScore: 69,
    isNew: true,
  },
  {
    type: "success",
    title: "CAPTCHA Challenge Triggered",
    message: "Dynamic CAPTCHA deployed — risk threshold exceeded 85%",
    meta: "Endpoint: /login · Rule: AUTO-CAPTCHA-85 · Active",
    isNew: true,
  },
];

let alertQueueIdx = 0;

export function nextSimulatedAlert(): SecurityAlert {
  const template = incomingAlerts[alertQueueIdx % incomingAlerts.length];
  alertQueueIdx++;
  return {
    ...template,
    id: `sim-${Date.now()}-${alertQueueIdx}`,
    timestamp: new Date(),
  };
}
