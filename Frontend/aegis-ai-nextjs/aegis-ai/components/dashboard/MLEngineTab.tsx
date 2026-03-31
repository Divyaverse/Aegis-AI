"use client";

import { useState, useEffect } from "react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from "recharts";

// Synthetic data generator for the demo (Will be replaced by your backend API)
function generateScatterData() {
    const normal = Array.from({ length: 60 }, () => ({
        x: 0.5 + Math.random() * 4.5, // Random time gaps (human)
        y: Math.random() * 15,        // Low req/s (human)
        z: 200,
    }));

    const bot = Array.from({ length: 25 }, () => ({
        x: 0.1 + Math.random() * 0.2, // Fixed, tiny time gap (bot rhythm)
        y: 80 + Math.random() * 20,   // Extremely high req/s (bot burst)
        z: 400,
    }));

    const suspicious = Array.from({ length: 10 }, () => ({
        x: 0.3 + Math.random() * 1.5,
        y: 25 + Math.random() * 30,
        z: 300,
    }));

    return { normal, bot, suspicious };
}

export function MLEngineTab() {
    const [data, setData] = useState(generateScatterData());

    // Simulate live telemetry shifts
    useEffect(() => {
        const interval = setInterval(() => setData(generateScatterData()), 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col gap-6 animate-fade-up">

            {/* ── Header ── */}
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-white mb-1">Isolation Forest Configuration</h1>
                    <p className="text-xs font-mono text-text-secondary uppercase tracking-widest">Tactical ML Engine / Node: Delta-9</p>
                </div>
                <div className="flex gap-4">
                    <button className="px-6 py-2.5 bg-card border border-border rounded-lg text-xs font-bold text-text-secondary hover:text-white hover:border-brand-cyan transition-colors uppercase tracking-widest">
                        Export Logic
                    </button>
                    <button className="px-6 py-2.5 bg-brand-cyan text-[#0b1121] rounded-lg text-xs font-bold hover:bg-[#1bb8d1] transition-colors uppercase tracking-widest shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                        Deploy Changes
                    </button>
                </div>
            </div>

            {/* ── Main Grid ── */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-2">

                {/* Left Column: Model Tuning & Telemetry (Spans 2 cols) */}
                <div className="xl:col-span-2 flex flex-col gap-6">

                    {/* Threshold Tuning Box */}
                    <div className="bg-panel border border-border rounded-xl p-8 flex items-center justify-between">
                        <div className="flex-1 pr-12">
                            <h2 className="text-lg font-bold text-white mb-1">Anomaly Threshold Tuning</h2>
                            <p className="text-[10px] font-mono text-text-secondary uppercase tracking-widest mb-8">Adjust the sensitivity of outlier detection nodes.</p>

                            <div className="text-5xl font-extrabold text-white mb-6">0.75</div>

                            {/* Fake UI Slider */}
                            <div className="relative w-full h-1.5 bg-card rounded-full mt-4">
                                <div className="absolute top-0 left-0 h-full bg-brand-cyan rounded-full w-[75%]" />
                                <div className="absolute top-1/2 left-[75%] -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)] border-2 border-brand-cyan" />
                            </div>
                            <div className="flex justify-between text-[9px] font-mono text-text-secondary uppercase tracking-widest mt-3">
                                <span>Permissive (0.00)</span>
                                <span>Standard (0.50)</span>
                                <span>Aggressive (1.00)</span>
                            </div>
                        </div>

                        {/* Status Pill */}
                        <div className="flex-shrink-0 flex items-start h-full pb-16">
                            <span className="flex items-center gap-2 px-3 py-1.5 bg-threat-critical/10 border border-threat-critical/20 rounded text-[10px] font-mono text-threat-critical uppercase tracking-widest">
                                <span className="w-1.5 h-1.5 rounded-full bg-threat-critical animate-pulse" /> Status: Suspicious
                            </span>
                        </div>
                    </div>

                    {/* Rhythm Telemetry Chart */}
                    <div className="bg-panel border border-border rounded-xl p-8 h-[400px] flex flex-col">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-lg font-bold text-white mb-1">Behavioral Rhythm Analysis</h2>
                                <p className="text-[10px] font-mono text-text-secondary uppercase tracking-widest">Human vs. Bot Request Intervals (ms)</p>
                            </div>
                            <div className="flex gap-4 text-[9px] font-mono text-text-secondary uppercase tracking-widest">
                                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-sm bg-brand-cyan"></span> Human Rhythms</span>
                                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-sm bg-threat-critical"></span> Automated/Bot</span>
                            </div>
                        </div>

                        <div className="flex-1 -ml-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <ScatterChart margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#2a364a" vertical={false} />
                                    <XAxis type="number" dataKey="x" stroke="#94a3b8" tick={{ fontSize: 10, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
                                    <YAxis type="number" dataKey="y" stroke="#94a3b8" tick={{ fontSize: 10, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
                                    <ZAxis type="number" dataKey="z" range={[50, 400]} />
                                    <Tooltip
                                        cursor={{ strokeDasharray: '3 3', stroke: '#3b4a6b' }}
                                        contentStyle={{ backgroundColor: '#1e293b', borderColor: '#3b4a6b', color: '#f8fafc', borderRadius: '8px' }}
                                        itemStyle={{ fontSize: '11px', fontWeight: 'bold' }}
                                    />
                                    <Scatter name="Human" data={data.normal} fill="#22d3ee" opacity={0.6} />
                                    <Scatter name="Bot" data={data.bot} fill="#fb7185" className="animate-pulse" />
                                    <Scatter name="Suspicious" data={data.suspicious} fill="#fbbf24" opacity={0.8} />
                                </ScatterChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Right Column: Model Accuracy & Drift */}
                <div className="flex flex-col gap-6">

                    <div className="bg-panel border border-brand-cyan/30 rounded-xl p-8 shadow-[inset_0_0_40px_rgba(34,211,238,0.02)]">
                        <h2 className="text-[10px] font-mono text-text-secondary uppercase tracking-widest mb-8">Accuracy Matrix</h2>
                        <div className="mb-10">
                            <p className="text-6xl font-extrabold text-white tracking-tighter mb-2">98.4<span className="text-2xl text-text-secondary">%</span></p>
                            <p className="text-xs text-text-secondary leading-relaxed">System confidence interval within optimal tactical parameters.</p>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between text-[10px] font-mono text-text-secondary uppercase tracking-widest mb-2">
                                    <span>Drift Indicator</span>
                                    <span className="text-threat-warning font-bold">+0.04% Warning</span>
                                </div>
                                <div className="w-full h-1.5 bg-card rounded-full overflow-hidden flex">
                                    <div className="h-full bg-brand-cyan w-[60%]" />
                                    <div className="h-full bg-threat-warning w-[4%]" />
                                </div>
                            </div>

                            <div className="pt-6 border-t border-border">
                                <div className="flex justify-between text-[10px] font-mono text-text-secondary uppercase tracking-widest mb-2">
                                    <span>Inference Latency</span>
                                    <span className="text-white">42ms</span>
                                </div>
                                <div className="w-full h-1.5 bg-card rounded-full overflow-hidden">
                                    <div className="h-full bg-brand-cyan w-[15%]" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}