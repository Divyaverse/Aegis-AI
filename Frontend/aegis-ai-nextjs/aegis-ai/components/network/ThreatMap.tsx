"use client";

import { useEffect, useState } from "react";
import { Activity, MapPin, Target } from "lucide-react";

export function ThreatMap() {
    const [pings, setPings] = useState<{ id: number, x: number, y: number, color: string, label: string }[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const isCritical = Math.random() > 0.7;
            const newPing = {
                id: Date.now(),
                x: Math.random() * 80 + 10,
                y: Math.random() * 80 + 10,
                color: isCritical ? "#fb7185" : "#fbbf24", // Enterprise Red or Amber
                label: isCritical ? "CRITICAL" : "PROBING"
            };
            setPings(prev => [...prev.slice(-4), newPing]);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col gap-6 animate-fade-up">
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-white mb-1">Global Threat Radar</h1>
                    <p className="text-xs font-mono text-text-secondary uppercase tracking-widest">Live Geolocation Tracking & IP Routing</p>
                </div>
                <div className="flex items-center gap-4 border border-border bg-panel px-6 py-3 rounded-xl">
                    <div className="flex items-center gap-2 text-xs font-mono text-text-secondary uppercase tracking-widest">
                        <Activity size={14} className="text-brand-cyan" /> Active Scans: 14,204/hr
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Radar View */}
                <div className="lg:col-span-3 panel bg-panel border border-border rounded-xl h-[600px] flex items-center justify-center relative overflow-hidden">

                    {/* Radar Circles */}
                    <div className="absolute w-[800px] h-[800px] rounded-full border border-border opacity-20" />
                    <div className="absolute w-[600px] h-[600px] rounded-full border border-border opacity-40" />
                    <div className="absolute w-[400px] h-[400px] rounded-full border border-border opacity-60" />
                    <div className="absolute w-[200px] h-[200px] rounded-full border border-brand-cyan opacity-40" />

                    {/* Crosshairs */}
                    <div className="absolute w-full h-[1px] bg-border opacity-50" />
                    <div className="absolute h-full w-[1px] bg-border opacity-50" />

                    {/* Animated Sweep */}
                    <div className="absolute w-[400px] h-[400px] origin-bottom-right animate-[spin_4s_linear_infinite]"
                        style={{
                            background: 'conic-gradient(from 180deg at 100% 100%, transparent 0deg, rgba(34, 211, 238, 0.15) 90deg, transparent 90deg)',
                            top: 'calc(50% - 400px)',
                            left: 'calc(50% - 400px)'
                        }}
                    />

                    {/* Threat Pings */}
                    {pings.map(ping => (
                        <div key={ping.id} className="absolute flex items-center justify-center" style={{ left: `${ping.x}%`, top: `${ping.y}%` }}>
                            <span className="w-2 h-2 rounded-full z-10" style={{ backgroundColor: ping.color, boxShadow: `0 0 15px ${ping.color}` }} />
                            <span className="absolute w-12 h-12 rounded-full animate-ping opacity-50" style={{ backgroundColor: ping.color }} />
                            <span className="absolute top-4 left-4 text-[9px] font-mono whitespace-nowrap bg-card border border-border px-2 py-1 rounded" style={{ color: ping.color }}>
                                {ping.label} // {ping.x.toFixed(1)}°N
                            </span>
                        </div>
                    ))}
                </div>

                {/* Side Panel Info */}
                <div className="flex flex-col gap-6">
                    <div className="bg-panel border border-border rounded-xl p-6 flex-1">
                        <h3 className="text-sm font-bold text-white mb-6 flex items-center gap-2"><MapPin size={16} className="text-brand-cyan" /> Active Vectors</h3>
                        <div className="space-y-4">
                            <VectorItem region="North America" count={1204} trend="+14%" color="#fb7185" />
                            <VectorItem region="Eastern Europe" count={842} trend="+5%" color="#fbbf24" />
                            <VectorItem region="South Asia" count={312} trend="-2%" color="#34d399" />
                            <VectorItem region="East Asia" count={194} trend="-8%" color="#34d399" />
                        </div>
                    </div>

                    <div className="bg-panel border border-border rounded-xl p-6">
                        <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2"><Target size={16} className="text-brand-cyan" /> Auto-Deflection</h3>
                        <p className="text-xs text-text-secondary leading-relaxed mb-4">Aegis Global Guard is currently routing suspicious traffic through deep-inspection scrubbing centers.</p>
                        <div className="w-full bg-card rounded-full h-1.5"><div className="bg-brand-cyan h-1.5 rounded-full w-full"></div></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function VectorItem({ region, count, trend, color }: { region: string, count: number, trend: string, color: string }) {
    return (
        <div className="flex justify-between items-center pb-4 border-b border-border/50 last:border-0 last:pb-0">
            <div>
                <p className="text-xs font-bold text-white">{region}</p>
                <p className="text-[10px] font-mono text-text-secondary uppercase">{count} instances</p>
            </div>
            <span className="text-[10px] font-mono font-bold" style={{ color }}>{trend}</span>
        </div>
    );
}