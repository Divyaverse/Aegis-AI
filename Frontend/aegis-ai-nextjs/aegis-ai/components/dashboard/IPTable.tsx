"use client";

import { ThreatPill } from "@/components/ui/ThreatPill";
import { timeAgo, formatNumber } from "@/lib/utils";
import type { IPRecord } from "@/types";
import { Download, Activity, AlertTriangle, ShieldCheck } from "lucide-react";

export function IPTable({ records }: { records: IPRecord[] }) {
  return (
    <div className="flex flex-col gap-6 animate-fade-up">

      {/* Header & Controls */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white mb-1">Traffic Surveillance</h1>
          <p className="text-xs font-mono text-text-secondary uppercase tracking-widest">Real-time log exploration and tactical intercept data.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-5 py-2.5 bg-card border border-border rounded-lg text-xs font-bold text-text-secondary hover:text-white transition-colors uppercase tracking-widest flex items-center gap-2">
            <Download size={14} /> Export CSV
          </button>
          <button className="px-6 py-2.5 bg-brand-cyan text-[#0b1121] rounded-lg text-xs font-bold hover:bg-[#1bb8d1] transition-colors uppercase tracking-widest shadow-[0_0_15px_rgba(34,211,238,0.2)] flex items-center gap-2">
            <Activity size={14} /> Live Stream
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-panel border border-border rounded-xl p-5 flex items-center gap-6">
        <div className="flex-1">
          <label className="block text-[10px] font-mono text-text-secondary uppercase tracking-widest mb-2">Risk Classification</label>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-xs font-mono uppercase tracking-widest rounded">All Traffic</button>
            <button className="px-4 py-2 bg-background border border-border text-text-secondary text-xs font-mono uppercase tracking-widest rounded hover:text-white">Suspicious</button>
            <button className="px-4 py-2 bg-background border border-border text-text-secondary text-xs font-mono uppercase tracking-widest rounded hover:text-white">Bot Cluster</button>
          </div>
        </div>
        <div className="w-[1px] h-10 bg-border"></div>
        <div className="flex-1">
          <label className="block text-[10px] font-mono text-text-secondary uppercase tracking-widest mb-2">Time Window</label>
          <select className="w-full max-w-[200px] bg-background border border-border text-white text-xs font-mono rounded px-3 py-2 outline-none uppercase tracking-widest">
            <option>Last 15 Minutes</option>
            <option>Last 1 Hour</option>
            <option>Last 24 Hours</option>
          </select>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-panel border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-card/40">
                {["Timestamp", "IP Address", "User Identity", "Action Vector", "Risk Rating", "Δt (ms)", "Telemetry"].map(h => (
                  <th key={h} className="px-6 py-5 text-[10px] tracking-widest uppercase font-mono text-text-secondary">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {records.map((rec) => (
                <tr key={rec.id} className="border-b border-border/50 hover:bg-card/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-[11px] text-text-secondary font-mono block">2026-03-31</span>
                    <span className="text-[11px] text-text-secondary font-mono">{new Date().toLocaleTimeString('en-US', { hour12: false })}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono text-brand-cyan">{rec.ip}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[13px] text-text-secondary font-mono italic">{rec.isBot ? 'Anonymous' : `usr_${rec.id.split('-')[1]}_alpha`}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-card border border-border rounded text-[9px] font-mono text-text-secondary uppercase tracking-widest">
                      {rec.attackType.replace(' ', '_').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4"><ThreatPill level={rec.status} /></td>
                  <td className="px-6 py-4 text-sm font-mono text-text-secondary">{rec.deltaT.toFixed(1)}</td>
                  <td className="px-6 py-4">
                    <button className="text-text-secondary hover:text-white transition-colors">
                      <Activity size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 border-t border-border bg-card/20 flex justify-between items-center text-[10px] font-mono text-text-secondary uppercase tracking-widest">
          <span>Showing 1-25 of 142,881 events captured</span>
          <div className="flex gap-1">
            <button className="w-6 h-6 flex items-center justify-center bg-brand-cyan text-[#0b1121] rounded">1</button>
            <button className="w-6 h-6 flex items-center justify-center hover:bg-card rounded">2</button>
            <button className="w-6 h-6 flex items-center justify-center hover:bg-card rounded">3</button>
          </div>
        </div>
      </div>

      {/* Bottom Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-panel border border-brand-cyan/30 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-5"><Activity size={100} /></div>
          <p className="text-[10px] font-mono text-text-secondary uppercase tracking-widest mb-4">Ingress Flow Rate</p>
          <p className="text-4xl font-extrabold text-white mb-2">4.2 <span className="text-lg text-text-secondary">GB/s</span></p>
          <p className="text-[10px] font-mono text-brand-cyan uppercase tracking-widest">+14% vs last hour</p>
        </div>
        <div className="bg-panel border border-threat-warning/30 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-5"><AlertTriangle size={100} /></div>
          <p className="text-[10px] font-mono text-text-secondary uppercase tracking-widest mb-4">Anomaly Frequency</p>
          <p className="text-4xl font-extrabold text-white mb-2">1.04<span className="text-lg text-text-secondary">%</span></p>
          <p className="text-[10px] font-mono text-threat-warning uppercase tracking-widest">12.1% spikes detected</p>
        </div>
        <div className="bg-panel border border-threat-safe/30 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-5"><ShieldCheck size={100} /></div>
          <p className="text-[10px] font-mono text-text-secondary uppercase tracking-widest mb-4">Auto-Deflection Score</p>
          <p className="text-4xl font-extrabold text-white mb-2">99.8<span className="text-lg text-text-secondary">%</span></p>
          <p className="text-[10px] font-mono text-threat-safe uppercase tracking-widest">Tactical AI Active</p>
        </div>
      </div>

    </div>
  );
}