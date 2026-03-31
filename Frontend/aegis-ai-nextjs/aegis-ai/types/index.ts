// ─── Threat & Alert Types ────────────────────────────────────────────────────

export type ThreatLevel = "critical" | "high" | "medium" | "low" | "safe";
export type AlertType = "critical" | "warning" | "info" | "success";
export type AttackType =
  | "Credential Stuffing"
  | "API Abuse"
  | "Brute Force"
  | "Distributed Attack"
  | "Low & Slow"
  | "Session Hijack"
  | "Zero-Day Botnet"
  | "Scanning";

export interface SecurityAlert {
  id: string;
  type: AlertType;
  title: string;
  message: string;
  meta: string;
  timestamp: Date;
  ip?: string;
  attackType?: AttackType;
  riskScore?: number;
  isNew?: boolean;
}

export interface IPRecord {
  id: string;
  ip: string;
  geo: string;
  flag: string;
  attackType: AttackType;
  riskScore: number;
  requestsPerSec: number;
  status: ThreatLevel;
  deltaT: number;        // avg Δt between requests in ms
  attempts: number;
  isBot: boolean;
  lastSeen: Date;
}

export interface NetworkNode {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: "safe" | "bot" | "suspicious";
  radius: number;
  label?: string;
}

export interface NetworkEdge {
  source: string;
  target: string;
  weight: number;
}

export interface ChartDataPoint {
  time: string;
  normal: number;
  attack: number;
  suspicious: number;
}

export interface RiskDistribution {
  safe: number;
  suspicious: number;
  botAttack: number;
}

export interface SystemStats {
  totalLogins: number;
  suspiciousRequests: number;
  botAttacks: number;
  blockedIPs: number;
  modelLatency: number;
  uptime: number; // seconds
  modelAccuracy: number;
}

export interface FeatureVector {
  deltaT: number;
  requestsPerSecond: number;
  attemptCount: number;
  ipSwitchRate: number;
  behavioralEntropy: number;
}
