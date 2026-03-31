import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ThreatLevel, AlertType, AttackType, IPRecord, SecurityAlert, ChartDataPoint } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(n: number): string {
  return n.toLocaleString("en-IN");
}

export function formatUptime(seconds: number): string {
  const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

export function riskColor(score: number): string {
  if (score >= 70) return "#fb7185"; // threat.critical
  if (score >= 50) return "#f59e0b"; // orange
  if (score >= 30) return "#fbbf24"; // threat.warning
  return "#34d399";                  // threat.safe
}

export function threatLevelColor(level: ThreatLevel): string {
  const map: Record<ThreatLevel, string> = {
    critical: "#fb7185",
    high: "#f59e0b",
    medium: "#fbbf24",
    low: "#3b82f6",
    safe: "#34d399",
  };
  return map[level];
}

export function alertTypeColor(type: AlertType): string {
  const map: Record<AlertType, string> = {
    critical: "#fb7185",
    warning: "#fbbf24",
    info: "#22d3ee",
    success: "#34d399",
  };
  return map[type];
}

export function timeAgo(date: Date): string {
  const diff = Date.now() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  if (seconds < 10) return "JUST NOW";
  if (seconds < 60) return `${seconds}S AGO`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}M AGO`;
  return `${Math.floor(minutes / 60)}H AGO`;
}

// ─── Mock Data Generators ─────────────────────────────────────────────────────
// (Keep your existing generateChartData, generateIPRecords, and generateAlerts exactly as they were in your previous utils.ts file to ensure your mock data still works!)
export function generateChartData(points = 48): ChartDataPoint[] {
  return Array.from({ length: points }, (_, i) => {
    const hour = Math.floor(i / 2);
    const min = i % 2 === 0 ? "00" : "30";
    const isAttackWindow = i > 30 && i < 42;
    return {
      time: `${String(hour).padStart(2, "0")}:${min}`,
      normal: Math.round(40 + Math.random() * 60),
      attack: isAttackWindow ? Math.round(80 + Math.random() * 140) : Math.round(Math.random() * 18),
      suspicious: Math.round(10 + Math.random() * 40),
    };
  });
}

export function generateIPRecords(): IPRecord[] {
  return [
    { id: "ip-1", ip: "192.168.1.104", geo: "China", flag: "🇨🇳", attackType: "Credential Stuffing", riskScore: 92, requestsPerSec: 847, status: "critical", deltaT: 1.2, attempts: 4821, isBot: true, lastSeen: new Date(Date.now() - 30000) },
    { id: "ip-2", ip: "45.22.10.68", geo: "Russia", flag: "🇷🇺", attackType: "API Abuse", riskScore: 88, requestsPerSec: 612, status: "critical", deltaT: 1.8, attempts: 3104, isBot: true, lastSeen: new Date(Date.now() - 120000) },
    { id: "ip-3", ip: "103.14.55.9", geo: "Brazil", flag: "🇧🇷", attackType: "Brute Force", riskScore: 74, requestsPerSec: 380, status: "high", deltaT: 2.6, attempts: 1822, isBot: true, lastSeen: new Date(Date.now() - 240000) },
    { id: "ip-4", ip: "185.220.101.47", geo: "Germany", flag: "🇩🇪", attackType: "Distributed Attack", riskScore: 65, requestsPerSec: 210, status: "high", deltaT: 4.7, attempts: 980, isBot: false, lastSeen: new Date(Date.now() - 480000) },
    { id: "ip-5", ip: "91.108.4.102", geo: "Ukraine", flag: "🇺🇦", attackType: "Low & Slow", riskScore: 51, requestsPerSec: 44, status: "medium", deltaT: 22.0, attempts: 412, isBot: false, lastSeen: new Date(Date.now() - 720000) },
    { id: "ip-6", ip: "172.16.0.82", geo: "USA", flag: "🇺🇸", attackType: "Scanning", riskScore: 28, requestsPerSec: 18, status: "low", deltaT: 55.0, attempts: 64, isBot: false, lastSeen: new Date(Date.now() - 1200000) },
  ];
}

export function generateAlerts(): SecurityAlert[] {
  return [
    { id: "a-1", type: "critical", title: "Bot Cluster Confirmed", message: "Credential stuffing attack detected — 14-node botnet active", meta: "Target: /api/auth/login · IP: 192.168.1.104 · Cluster: BCN-014", ip: "192.168.1.104", riskScore: 92, timestamp: new Date(Date.now() - 10000), isNew: true },
    { id: "a-2", type: "critical", title: "Isolation Forest Anomaly", message: "Behavioral fingerprint deviates 4.2σ from human baseline", meta: "Δt variance: 0.0003s · Requests: 847/s · Pattern: Cyclic", ip: "45.22.10.68", riskScore: 88, timestamp: new Date(Date.now() - 90000), isNew: true },
    { id: "a-3", type: "warning", title: "High-Velocity Login Burst", message: "Multiple failed logins — account targeting pattern", meta: "User: admin_alpha · Source: Mobile Auth · Attempts: 312", ip: "103.14.55.9", riskScore: 74, timestamp: new Date(Date.now() - 240000) },
    { id: "a-4", type: "warning", title: "IP Rotation Pattern", message: "Rotating proxies detected on /v1/auth endpoint", meta: "IP switching rate: 14 IPs/min · Proxy chain depth: 3", riskScore: 68, timestamp: new Date(Date.now() - 420000) },
  ];
}