"use client";

import { useState, useEffect } from "react";
import { useSimulation } from "@/hooks/useSimulation";
import {
  LayoutGrid, ShieldAlert, Database, Sliders, Activity,
  TerminalSquare, Settings, HelpCircle, AlertTriangle
} from "lucide-react";

// --- TABS & COMPONENTS ---
import { LoginActivityChart } from "@/components/charts/LoginActivityChart";
import { NetworkGraph } from "@/components/network/NetworkGraph";
import { RiskDistribution } from "@/components/dashboard/RiskDistribution";
import { AlertsFeed } from "@/components/dashboard/AlertsFeed";
import { IPTable } from "@/components/dashboard/IPTable";
import { MLEngineTab } from "@/components/dashboard/MLEngineTab";
import { ThreatMap } from "@/components/network/ThreatMap";
import { SimulationsTab } from "@/components/dashboard/SimulationsTab";
import { APIConfigTab } from "@/components/dashboard/APIConfigTab";
import { formatNumber } from "@/lib/utils";

type NavTab = "Dashboard" | "Attack Analysis" | "Traffic Logs" | "ML Tuner" | "Simulations" | "API Config";

export function DashboardShell() {
  const [activeTab, setActiveTab] = useState<NavTab>("Dashboard");

  const {
    isAttackActive,
    attackPhase,
    stats,
    chartData,
    ipRecords,
    alerts,
    triggerAttack,
    resetSimulation,
    mode,
    isConnected,
  } = useSimulation();

  // 🤫 Secret Presentation Trigger (Ctrl + Shift + A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        triggerAttack();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerAttack]);

  return (
    <div className="flex h-screen bg-background text-text-primary font-sans overflow-hidden selection:bg-brand-cyan/30">

      {/* ─── LEFT SIDEBAR ─── */}
      <aside className="w-[260px] flex-shrink-0 border-r border-border bg-background flex flex-col justify-between z-20">
        <div>
          {/* Logo Area */}
          <div className="h-20 flex flex-col justify-center px-8 border-b border-border">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold tracking-tight text-white">
                Aegis<span className="text-brand-cyan">.AI</span>
              </span>
            </div>
            <span className="text-[10px] font-mono text-text-secondary tracking-widest uppercase mt-1">
              Tactical Intel
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 mt-2">
            <NavItem icon={<LayoutGrid size={18} />} label="Dashboard" active={activeTab === "Dashboard"} onClick={() => setActiveTab("Dashboard")} />
            <NavItem icon={<ShieldAlert size={18} />} label="Attack Analysis" active={activeTab === "Attack Analysis"} onClick={() => setActiveTab("Attack Analysis")} />
            <NavItem icon={<Database size={18} />} label="Traffic Logs" active={activeTab === "Traffic Logs"} onClick={() => setActiveTab("Traffic Logs")} />
            <NavItem icon={<Sliders size={18} />} label="ML Tuner" active={activeTab === "ML Tuner"} onClick={() => setActiveTab("ML Tuner")} />
            <NavItem icon={<Activity size={18} />} label="Simulations" active={activeTab === "Simulations"} onClick={() => setActiveTab("Simulations")} />
            <NavItem icon={<TerminalSquare size={18} />} label="API Config" active={activeTab === "API Config"} onClick={() => setActiveTab("API Config")} />
          </nav>
        </div>

        {/* Bottom Links */}
        <div className="p-4 border-t border-border space-y-1.5 mb-2">
          <NavItem icon={<Settings size={18} />} label="Settings" active={false} onClick={() => { }} />
          <NavItem icon={<HelpCircle size={18} />} label="Support" active={false} onClick={() => { }} />
        </div>
      </aside>

      {/* ─── MAIN CONTENT WRAPPER ─── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">

        {/* TOP HEADER */}
        <header className="h-20 flex-shrink-0 border-b border-border bg-background/80 backdrop-blur-md flex items-center justify-between px-8 z-10">
          <div className="flex items-center gap-8 text-sm font-medium text-text-secondary">
            <span className="hover:text-white cursor-pointer transition-colors">Global System Health</span>
            <span className="text-brand-cyan border-b-2 border-brand-cyan pb-1">Active Threat Level</span>
            <span className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase border ${
              isConnected
                ? "border-[#34d399]/30 bg-[#34d399]/10 text-[#34d399]"
                : "border-[#fbbf24]/30 bg-[#fbbf24]/10 text-[#fbbf24]"
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isConnected ? "bg-[#34d399] animate-pulse" : "bg-[#fbbf24]"}`}></span>
              {isConnected ? "LIVE" : "SIM"}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-[11px] font-bold text-white uppercase tracking-wider">Operator Admin</p>
              <p className="text-[9px] font-mono text-text-secondary uppercase tracking-widest">SEC-LEVEL: 05</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-card border border-border overflow-hidden">
              {/* Professional Avatar Placeholder */}
              <div className="w-full h-full bg-gradient-to-tr from-brand-cyan/20 to-brand-blue/20 flex items-center justify-center text-brand-cyan font-bold">
                OA
              </div>
            </div>
          </div>
        </header>

        {/* DYNAMIC TAB CONTENT */}
        <main className="flex-1 overflow-auto p-8 bg-background scroll-smooth">
          <div className="max-w-[1600px] mx-auto">
            {activeTab === "Dashboard" && (
              <CommandOverviewTab
                isAttackActive={isAttackActive}
                attackPhase={attackPhase}
                stats={stats}
                chartData={chartData}
                alerts={alerts}
                onTriggerAttack={triggerAttack}
              />
            )}
            {activeTab === "ML Tuner" && <MLEngineTab />}
            {activeTab === "Traffic Logs" && <div className="mt-8"><IPTable records={ipRecords} /></div>}
            {activeTab === "Attack Analysis" && <ThreatMap />}
            {activeTab === "Simulations" && (
              <SimulationsTab
                isAttackActive={isAttackActive}
                onTriggerAttack={triggerAttack}
              />
            )}
            {activeTab === "API Config" && <APIConfigTab />}
          </div>
        </main>
      </div>
    </div>
  );
}

// ─── SIDEBAR NAV ITEM ───
function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 ${active
          ? "bg-brand-cyan/10 text-brand-cyan font-bold shadow-[inset_3px_0_0_#22d3ee]"
          : "text-text-secondary hover:bg-card hover:text-white font-medium"
        }`}
    >
      <span className={active ? "text-brand-cyan" : "text-text-secondary"}>{icon}</span>
      <span className="text-sm tracking-wide">{label}</span>
    </button>
  );
}

// ─── COMMAND OVERVIEW (The exact layout from your screenshot) ───
function CommandOverviewTab({ isAttackActive, attackPhase, stats, chartData, alerts, onTriggerAttack }: any) {
  return (
    <div className="flex flex-col gap-6 animate-fade-up">

      {/* Page Header & Top Stats */}
      <div className="flex items-end justify-between mb-2">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white mb-1">Command Overview</h1>
          <p className="text-xs font-mono text-text-secondary uppercase tracking-widest flex items-center gap-2">
            Operational Status: <span className={isAttackActive ? "text-threat-critical" : "text-text-secondary"}>{isAttackActive ? "THREAT DETECTED" : "DEFENSIVE ACTIVE"}</span>
          </p>
        </div>
        <div className="flex items-center gap-8 border border-border bg-panel px-6 py-3 rounded-xl">
          <div>
            <p className="text-[9px] font-mono text-text-secondary uppercase tracking-widest mb-1">Active Nodes</p>
            <p className="text-xl font-bold text-white leading-none">{formatNumber(stats.totalLogins)}</p>
          </div>
          <div className="w-[1px] h-8 bg-border"></div>
          <div>
            <p className="text-[9px] font-mono text-text-secondary uppercase tracking-widest mb-1">Threats Blocked</p>
            <p className="text-xl font-bold text-white leading-none">{formatNumber(stats.botAttacks)}</p>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Left Column (Spans 2/3) */}
        <div className="xl:col-span-2 flex flex-col gap-6">

          {/* Behavioral Intelligence Graph */}
          <div className="bg-panel border border-border rounded-xl flex flex-col min-h-[480px] relative overflow-hidden">
            <div className="absolute top-6 left-6 z-10">
              <h2 className="text-lg font-bold text-white mb-1">Behavioral Intelligence Graph</h2>
              <p className="text-[10px] font-mono text-text-secondary uppercase tracking-widest">Real-time Entity Correlation</p>
            </div>
            <div className="absolute top-6 right-6 z-10 flex gap-4 text-[9px] font-mono text-text-secondary uppercase tracking-widest">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-brand-cyan"></span> IP Addresses</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-border-bright"></span> Internal Users</span>
            </div>
            <div className="flex-1 mt-16">
              <NetworkGraph isAttackActive={isAttackActive} attackPhase={attackPhase} />
            </div>

            {/* Context Box floating over graph */}
            {isAttackActive && (
              <div className="absolute bottom-6 left-6 w-72 bg-card border border-border rounded-lg p-5 shadow-2xl animate-slide-in">
                <h3 className="text-[10px] font-mono text-text-secondary uppercase tracking-widest mb-2">Inference Engine</h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Anomaly detected in subnet 192.168.x.x. Heuristic matching confirms high-probability command-and-control behavior.
                </p>
              </div>
            )}
          </div>

          {/* Network Activity Chart */}
          <div className="bg-panel border border-border rounded-xl p-6 h-[300px] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-white mb-1">Network Activity</h2>
                <p className="text-[10px] font-mono text-text-secondary uppercase tracking-widest">Packets per second (PPS)</p>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-card border border-border text-xs font-mono rounded hover:text-white transition-colors">1H</button>
                <button className="px-3 py-1 bg-transparent text-text-secondary text-xs font-mono rounded hover:text-white transition-colors">24H</button>
              </div>
            </div>
            <div className="flex-1 -mx-2">
              <LoginActivityChart data={chartData} isAttackActive={isAttackActive} />
            </div>
          </div>

        </div>

        {/* Right Column (Spans 1/3) */}
        <div className="flex flex-col gap-6">

          {/* Risk Level Donut */}
          <RiskDistribution stats={stats} isAttackActive={isAttackActive} />

          {/* Critical Action Panel (Replaces old Attack Simulator) */}
          <div className={`border rounded-xl p-6 transition-all duration-500 ${isAttackActive ? 'bg-[#fb7185]/5 border-[#fb7185]/30' : 'bg-panel border-border'}`}>
            <div className="flex items-start gap-4 mb-4">
              <AlertTriangle className={isAttackActive ? "text-threat-critical mt-1" : "text-text-secondary mt-1"} size={24} />
              <div>
                <h3 className="text-sm font-bold text-white tracking-wide uppercase mb-2">
                  {isAttackActive ? "Critical Lockdown Required" : "System Secure"}
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {isAttackActive
                    ? "System suggests immediate isolation of identified cluster to prevent lateral movement."
                    : "No anomalous lateral movement detected. Global Guard on standby."}
                </p>
              </div>
            </div>
            <button
              onClick={onTriggerAttack}
              disabled={isAttackActive}
              className={`w-full py-3 rounded-lg text-xs font-bold tracking-widest uppercase transition-all ${isAttackActive
                  ? "bg-threat-critical text-white hover:bg-red-600 shadow-[0_0_15px_rgba(251,113,133,0.3)] animate-pulse"
                  : "bg-card border border-border text-text-secondary hover:text-white hover:border-brand-cyan"
                }`}
            >
              {isAttackActive ? "Execute Isolation" : "Simulate Threat Trigger"}
            </button>
          </div>

          {/* Live Intercept Feed */}
          <div className="bg-panel border border-border rounded-xl p-6 flex-1 flex flex-col min-h-[400px]">
            <h2 className="text-lg font-bold text-white mb-1">Live Intercept Feed</h2>
            <p className="text-[10px] font-mono text-text-secondary uppercase tracking-widest mb-6">Real-time threat mitigation logs</p>
            <AlertsFeed alerts={alerts} />
          </div>

        </div>
      </div>
    </div>
  );
}