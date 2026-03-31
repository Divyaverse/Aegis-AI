"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { SecurityAlert, IPRecord, ChartDataPoint, SystemStats } from "@/types";
import {
  generateChartData,
  generateIPRecords,
  generateAlerts,
} from "@/lib/utils";
import { tickChart, tickIPRecords, nextSimulatedAlert } from "@/lib/simulation";

export function useSimulation() {
  const [isAttackActive, setIsAttackActive] = useState(false);
  const [attackPhase, setAttackPhase] = useState<
    "idle" | "probing" | "burst" | "botnet" | "blocked"
  >("idle");

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

  // ── Live login counter ──────────────────────────────────────────────────────
  useEffect(() => {
    const id = setInterval(() => {
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

  // ── Alert injection ─────────────────────────────────────────────────────────
  useEffect(() => {
    const id = setInterval(() => {
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

  // ── Attack simulation sequence ──────────────────────────────────────────────
  const triggerAttack = useCallback(() => {
    if (isAttackRef.current) return;
    setIsAttackActive(true);
    setAttackPhase("probing");

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

  const resetSimulation = useCallback(() => {
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
  };
}
