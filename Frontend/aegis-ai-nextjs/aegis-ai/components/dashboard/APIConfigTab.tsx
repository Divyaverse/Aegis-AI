"use client";

import { Key, Copy, CheckCircle2, Webhook, Database } from "lucide-react";

export function APIConfigTab() {
    return (
        <div className="flex flex-col gap-6 animate-fade-up">
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-white mb-1">API Configuration</h1>
                    <p className="text-xs font-mono text-text-secondary uppercase tracking-widest">Manage access keys and telemetry webhooks</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">

                {/* Keys & Endpoints */}
                <div className="space-y-6">
                    <div className="bg-panel border border-border rounded-xl p-8">
                        <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Key size={18} className="text-brand-cyan" /> Authentication Keys</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-mono text-text-secondary uppercase tracking-widest mb-2">Production Secret Key</label>
                                <div className="flex bg-card border border-border rounded-lg overflow-hidden">
                                    <input type="password" value="sk_live_aegis_89f2n39nv823nv9" readOnly className="flex-1 bg-transparent px-4 py-3 text-sm font-mono text-text-primary outline-none" />
                                    <button className="px-4 bg-border/50 hover:bg-border text-text-secondary hover:text-white transition-colors"><Copy size={14} /></button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-mono text-text-secondary uppercase tracking-widest mb-2">Development Key (Sandbox)</label>
                                <div className="flex bg-card border border-border rounded-lg overflow-hidden">
                                    <input type="text" value="sk_test_aegis_sandbox_001" readOnly className="flex-1 bg-transparent px-4 py-3 text-sm font-mono text-text-secondary outline-none" />
                                    <button className="px-4 bg-border/50 hover:bg-border text-text-secondary hover:text-white transition-colors"><Copy size={14} /></button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-panel border border-border rounded-xl p-8">
                        <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Webhook size={18} className="text-brand-cyan" /> Webhook Routing</h2>
                        <div>
                            <label className="block text-[10px] font-mono text-text-secondary uppercase tracking-widest mb-2">Endpoint URL</label>
                            <input type="text" defaultValue="https://api.novapay.com/webhooks/aegis" className="w-full bg-card border border-border text-white text-sm rounded-lg px-4 py-3 outline-none focus:border-brand-cyan transition-colors" />
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-xs font-mono text-threat-safe uppercase tracking-widest">
                            <CheckCircle2 size={14} /> Endpoint Verified
                        </div>
                    </div>
                </div>

                {/* Data Retention */}
                <div className="bg-panel border border-border rounded-xl p-8 h-fit">
                    <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Database size={18} className="text-brand-cyan" /> Telemetry Retention</h2>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-card">
                            <div>
                                <p className="text-sm font-bold text-white">Active Log Persistence</p>
                                <p className="text-xs text-text-secondary mt-1">Duration for high-fidelity data storage.</p>
                            </div>
                            <div className="flex bg-background border border-border rounded overflow-hidden">
                                <button className="px-3 py-1.5 text-xs font-mono font-bold bg-brand-cyan/10 text-brand-cyan">30D</button>
                                <button className="px-3 py-1.5 text-xs font-mono text-text-secondary hover:text-white">90D</button>
                                <button className="px-3 py-1.5 text-xs font-mono text-text-secondary hover:text-white">1Y</button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-card">
                            <div>
                                <p className="text-sm font-bold text-white">Auto-Archive Trigger</p>
                                <p className="text-xs text-text-secondary mt-1">Compress telemetry to cold storage after 30 days.</p>
                            </div>
                            <div className="w-10 h-5 bg-brand-cyan rounded-full relative cursor-pointer">
                                <div className="absolute right-1 top-1 w-3 h-3 bg-background rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}