"use client";

import Link from "next/link";
import { Shield, Key, Code, Terminal, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function IntegrationPage() {
    return (
        <div className="min-h-screen bg-background text-text-primary font-sans selection:bg-brand-cyan/30">

            {/* Header */}
            <header className="px-8 py-6 border-b border-border bg-panel flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/" className="text-text-secondary hover:text-text-primary transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <div className="flex items-center gap-2">
                        <Shield className="text-brand-cyan" size={24} />
                        <span className="text-xl font-bold tracking-tight">Aegis<span className="text-brand-cyan">.AI</span></span>
                        <span className="ml-2 px-2 py-0.5 rounded text-[10px] font-mono bg-border text-text-secondary uppercase">Docs</span>
                    </div>
                </div>
                <div className="text-sm font-mono text-text-secondary">
                    Operator: Admin // SEC-LEVEL: 05
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* Left Column: Documentation */}
                <div className="lg:col-span-2 space-y-12">
                    <div>
                        <h1 className="text-3xl font-bold mb-4">API Integration</h1>
                        <p className="text-text-secondary leading-relaxed">
                            Integrate the Aegis.AI neuro-behavioral engine into your authentication and transaction flows.
                            Our incredibly lightweight SDK evaluates interaction telemetry and returns a risk score in under 42ms.
                        </p>
                    </div>

                    {/* Quick Start Code Block */}
                    <div className="bg-panel border border-border rounded-xl overflow-hidden">
                        <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-card">
                            <Terminal size={14} className="text-text-secondary" />
                            <span className="text-xs font-mono text-text-secondary">server.js (Node.js)</span>
                        </div>
                        <div className="p-6 overflow-x-auto">
                            <pre className="text-sm font-mono leading-relaxed text-text-primary">
                                <code className="text-brand-cyan">import</code> &#123; AegisGuard &#125; <code className="text-brand-cyan">from</code> <span className="text-threat-safe">'@aegis-ai/sdk'</span>;<br /><br />
                                <code className="text-text-secondary">// 1. Initialize with your secure API key</code><br />
                                <code className="text-brand-cyan">const</code> aegis = <code className="text-brand-cyan">new</code> AegisGuard(&#123;<br />
                                &nbsp;&nbsp;apiKey: process.env.AEGIS_SECRET_KEY,<br />
                                &nbsp;&nbsp;threshold: <span className="text-[#fb7185]">0.85</span> <code className="text-text-secondary">// Drop requests &gt; 85% risk</code><br />
                                &#125;);<br /><br />
                                <code className="text-text-secondary">// 2. Wrap your sensitive routes</code><br />
                                app.post(<span className="text-threat-safe">'/api/v1/auth/login'</span>, aegis.verify(), <code className="text-brand-cyan">async</code> (req, res) =&gt; &#123;<br />
                                &nbsp;&nbsp;<code className="text-text-secondary">// If Aegis detects a bot, it intercepts and returns a 403.</code><br />
                                &nbsp;&nbsp;<code className="text-text-secondary">// Otherwise, standard human login proceeds.</code><br />
                                &nbsp;&nbsp;<code className="text-brand-cyan">return</code> res.status(<span className="text-[#fbbf24]">200</span>).json(&#123; success: <code className="text-brand-cyan">true</code> &#125;);<br />
                                &#125;);
                            </pre>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FeatureCard title="Zero-Latency Evaluation" desc="Asynchronous telemetry processing ensures your UX remains completely unblocked." />
                        <FeatureCard title="Spatio-Temporal Analysis" desc="Monitors the rhythm of keystrokes, click cadence, and pointer velocity." />
                        <FeatureCard title="Auto-Mitigation" desc="Automatically challenges suspicious clusters with hard MFA or CAPTCHA." />
                        <FeatureCard title="Graph Relationships" desc="Maps overlapping session fingerprints to detect organized botnets." />
                    </div>
                </div>

                {/* Right Column: Client Setup / Keys */}
                <div className="space-y-6">
                    {/* API Key Panel */}
                    <div className="bg-panel border border-border rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <Key className="text-brand-cyan" size={20} />
                            <h2 className="text-lg font-bold">Integration Gateways</h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-mono text-text-secondary uppercase mb-2">Master API Key</label>
                                <div className="flex bg-card border border-border rounded-lg overflow-hidden">
                                    <input
                                        type="password"
                                        value="aegis_live_8f92j28nv9w8u483nv"
                                        readOnly
                                        className="flex-1 bg-transparent px-4 py-3 text-sm font-mono text-text-primary outline-none"
                                    />
                                    <button className="px-4 bg-border/50 text-xs font-semibold hover:bg-border transition-colors">
                                        COPY
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-text-secondary uppercase mb-2">Webhook Endpoint</label>
                                <div className="flex bg-card border border-border rounded-lg overflow-hidden">
                                    <input
                                        type="text"
                                        value="https://api.aegis.ai/v4/webhooks"
                                        readOnly
                                        className="flex-1 bg-transparent px-4 py-3 text-sm font-mono text-text-secondary outline-none"
                                    />
                                    <button className="px-3 bg-border/50 text-text-secondary hover:text-text-primary transition-colors">
                                        <Code size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button className="w-full mt-6 py-3 bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20 rounded-lg text-sm font-bold hover:bg-brand-cyan/20 transition-all">
                            ROLL NEW KEYS
                        </button>
                    </div>

                    {/* Setup Checklist */}
                    <div className="bg-panel border border-border rounded-xl p-6">
                        <h3 className="text-sm font-bold mb-4 uppercase tracking-wider text-text-secondary">Deployment Status</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-sm text-text-secondary">
                                <CheckCircle2 className="text-threat-safe" size={16} /> SDK Installed
                            </li>
                            <li className="flex items-center gap-3 text-sm text-text-secondary">
                                <CheckCircle2 className="text-threat-safe" size={16} /> Keys Authenticated
                            </li>
                            <li className="flex items-center gap-3 text-sm text-brand-cyan font-medium">
                                <div className="w-4 h-4 border-2 border-brand-cyan border-t-transparent rounded-full animate-spin" /> Awaiting Telemetry...
                            </li>
                        </ul>
                    </div>
                </div>

            </main>
        </div>
    );
}

function FeatureCard({ title, desc }: { title: string, desc: string }) {
    return (
        <div className="p-5 border border-border bg-card rounded-lg">
            <h3 className="text-sm font-bold mb-2 text-text-primary">{title}</h3>
            <p className="text-xs leading-relaxed text-text-secondary">{desc}</p>
        </div>
    );
}