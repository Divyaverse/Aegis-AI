"use client";

// ═══════════════════════════════════════════════════════════════
//  🛡️ Aegis.AI — HYPER-SYNC useSimulation Hook
//  Hybrid Mode: Uses REAL backend data when connected,
//  falls back to client-side simulation when offline.
// ═══════════════════════════════════════════════════════════════

import { useState, useEffect, useCallback, useRef } from "react";
import type { SecurityAlert, IPRecord, ChartDataPoint, SystemStats } from "@/types";
import {
  generateChartData,
  generateIPRecords,
  generateAlerts,
} from "@/lib/utils";
import { tickChart, tickIPRecords, nextSimulatedAlert } from "@/lib/simulation";
import { fetchDashboard, triggerBackendSimulation, resetBackendSimulation } from "@/lib/api";
import { useSocketIO } from "@/hooks/useSocketIO";

type ConnectionMode = "live" | "simulation";

export function useSimulation() {
  const [isAttackActive, setIsAttackActive] = useState(false);
  const [attackPhase, setAttackPhase] = useState<
    "idle" | "probing" | "burst" | "botnet" | "blocked"
  >("idle");
  const [mode, setMode] = useState<ConnectionMode>("simulation");

  const [stats, setStats] = useState<SystemStats>({
    totalLogins: 84209,
    suspiciousRequests: 1204,
    botAttacks: 482,
    blockedIPs: 29,
    modelLatency: 143,
    uptime: 0,
    modelAccuracy: 97.8,
  });

  const [chartData, setChartData] = useState<ChartDataPoint[]>(() =>
    generateChartData(48)
  );
  const [ipRecords, setIPRecords] = useState<IPRecord[]>(() =>
    generateIPRecords()
  );
  const [alerts, setAlerts] = useState<SecurityAlert[]>(() =>
    generateAlerts()
  );

  const attackPhaseRef = useRef(attackPhase);
  attackPhaseRef.current = attackPhase;
  const isAttackRef = useRef(isAttackActive);
  isAttackRef.current = isAttackActive;
  const modeRef = useRef(mode);
  modeRef.current = mode;

  // ── Socket.IO: Listen for real-time events from backend ──────────────────
  const { isConnected } = useSocketIO([
    {
      event: "new_log",
      handler: (log: any) => {
        // Convert backend log into a frontend SecurityAlert
        const alertType = log.risk === "Attack" ? "critical"
          : log.risk === "Suspicious" ? "warning" : "info";

        const newAlert: SecurityAlert = {
          id: log.log_id || `live-${Date.now()}`,
          type: alertType,
          title: log.blocked ? "Bot Blocked" : log.risk === "Attack" ? "Attack Detected" : "Activity Logged",
          message: (log.reasons || []).join(", ") || "Normal behavior",
          meta: `IP: ${log.ip} · User: ${log.user_id} · Score: ${log.score}`,
          ip: log.ip,
          riskScore: log.score,
          timestamp: new Date(log.timestamp || Date.now()),
          isNew: true,
        };

        setAlerts((prev) => [newAlert, ...prev.slice(0, 19)]);
      },
    },
    {
      event: "stats_update",
      handler: (backendStats: any) => {
        // Map backend stats to frontend SystemStats shape
        setStats((prev) => ({
          ...prev,
          totalLogins: backendStats.total_requests || prev.totalLogins,
          suspiciousRequests: backendStats.suspicious_count || prev.suspiciousRequests,
          botAttacks: backendStats.attack_count || prev.botAttacks,
          blockedIPs: backendStats.blocked_ips_count || prev.blockedIPs,
        }));
      },
    },
    {
      event: "threat_alert",
      handler: (threat: any) => {
        const newAlert: SecurityAlert = {
          id: `threat-${Date.now()}`,
          type: threat.blocked ? "success" : "critical",
          title: threat.blocked ? `🚫 IP ${threat.ip} Blocked` : `🚨 ${threat.severity} Threat`,
          message: (threat.reasons || []).join(", "),
          meta: `IP: ${threat.ip} · User: ${threat.user_id} · Score: ${threat.score}`,
          ip: threat.ip,
          riskScore: threat.score,
          timestamp: new Date(threat.timestamp || Date.now()),
          isNew: true,
        };

        setAlerts((prev) => [newAlert, ...prev.slice(0, 19)]);

        // If it's a real attack, show the attack phase on the dashboard
        if (threat.severity === "Attack" && !isAttackRef.current) {
          setIsAttackActive(true);
          setAttackPhase("burst");
          setTimeout(() => {
            setAttackPhase("idle");
            setIsAttackActive(false);
          }, 8000);
        }
      },
    },
  ]);

  // ── Set mode based on connection status ────────────────────────────────────
  useEffect(() => {
    if (isConnected) {
      setMode("live");
      // Fetch initial dashboard data from backend
      fetchDashboard()
        .then((data) => {
          if (data.stats) {
            setStats((prev) => ({
              ...prev,
              totalLogins: data.stats.total_requests || prev.totalLogins,
              suspiciousRequests: data.stats.suspicious_count || prev.suspiciousRequests,
              botAttacks: data.stats.attack_count || prev.botAttacks,
              blockedIPs: data.stats.blocked_ips_count || prev.blockedIPs,
            }));
          }
        })
        .catch(() => {
          // Silently fall back
        });
    } else {
      setMode("simulation");
    }
  }, [isConnected]);

  // ── Uptime counter ──────────────────────────────────────────────────────────
  useEffect(() => {
    const id = setInterval(() => {
      setStats((s) => ({ ...s, uptime: s.uptime + 1 }));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  // ── Latency jitter ──────────────────────────────────────────────────────────
  useEffect(() => {
    const id = setInterval(() => {
      const base = isAttackRef.current ? 180 : 120;
      setStats((s) => ({
        ...s,
        modelLatency: base + Math.floor(Math.random() * 80),
      }));
    }, 2000);
    return () => clearInterval(id);
  }, []);

  // ── Live login counter (simulation mode only) ───────────────────────────────
  useEffect(() => {
    const id = setInterval(() => {
      if (modeRef.current === "live") return; // Skip if live data is coming via socket
      const increment = isAttackRef.current
        ? Math.floor(Math.random() * 200 + 50)
        : Math.floor(Math.random() * 30 + 5);
      setStats((s) => ({
        ...s,
        totalLogins: s.totalLogins + increment,
        suspiciousRequests: isAttackRef.current
          ? s.suspiciousRequests + Math.floor(Math.random() * 20 + 5)
          : s.suspiciousRequests,
        botAttacks: isAttackRef.current
          ? s.botAttacks + Math.floor(Math.random() * 8 + 1)
          : s.botAttacks,
      }));
    }, 1800);
    return () => clearInterval(id);
  }, []);

  // ── Chart tick ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const id = setInterval(() => {
      const intensity =
        attackPhaseRef.current === "botnet"
          ? 0.9
          : attackPhaseRef.current === "burst"
          ? 0.6
          : attackPhaseRef.current === "probing"
          ? 0.3
          : 0;
      setChartData((prev) => tickChart(prev, isAttackRef.current, intensity));
    }, 1500);
    return () => clearInterval(id);
  }, []);

  // ── IP record mutations ─────────────────────────────────────────────────────
  useEffect(() => {
    const id = setInterval(() => {
      if (isAttackRef.current) {
        setIPRecords((prev) => tickIPRecords(prev, true));
      }
    }, 2500);
    return () => clearInterval(id);
  }, []);

  // ── Alert injection (simulation mode only) ──────────────────────────────────
  useEffect(() => {
    const id = setInterval(() => {
      if (modeRef.current === "live") return; // Skip if live alerts are coming via socket
      if (isAttackRef.current) {
        const newAlert = nextSimulatedAlert();
        setAlerts((prev) => {
          const updated = [newAlert, ...prev.slice(0, 11)];
          return updated;
        });
        // Bump blocked IPs on success alerts
        if (newAlert.type === "success") {
          setStats((s) => ({ ...s, blockedIPs: s.blockedIPs + 1 }));
        }
      }
    }, 6000);
    return () => clearInterval(id);
  }, []);

  // ── HYPER-SYNC Attack Trigger ──────────────────────────────────────────────
  // In LIVE mode: calls the REAL backend simulation endpoint
  // In SIMULATION mode: runs client-side animation sequence
  const triggerAttack = useCallback(async () => {
    if (isAttackRef.current) return;
    setIsAttackActive(true);
    setAttackPhase("probing");

    if (modeRef.current === "live") {
      // 🔥 REAL backend call — this sends 50 requests through the ML engine
      try {
        await triggerBackendSimulation(50, "mixed");
      } catch {
        // If backend call fails, continue with visual simulation
      }
    }

    setTimeout(() => setAttackPhase("burst"), 4000);
    setTimeout(() => setAttackPhase("botnet"), 9000);
    setTimeout(() => {
      setAttackPhase("blocked");
      setStats((s) => ({ ...s, blockedIPs: s.blockedIPs + 3 }));
    }, 18000);
    setTimeout(() => {
      setAttackPhase("idle");
      setIsAttackActive(false);
    }, 24000);
  }, []);

  const resetSimulation = useCallback(async () => {
    setIsAttackActive(false);
    setAttackPhase("idle");
    setIPRecords(generateIPRecords());
    setAlerts(generateAlerts());
    setChartData(generateChartData(48));
    setStats((s) => ({
      ...s,
      suspiciousRequests: 1204,
      botAttacks: 482,
      blockedIPs: 29,
    }));

    if (modeRef.current === "live") {
      try {
        await resetBackendSimulation();
      } catch {
        // Silently handle
      }
    }
  }, []);

  return {
    isAttackActive,
    attackPhase,
    stats,
    chartData,
    ipRecords,
    alerts,
    triggerAttack,
    resetSimulation,
    mode,          // "live" or "simulation" — frontend can display this
    isConnected,   // Socket.IO connection status
  };
}
