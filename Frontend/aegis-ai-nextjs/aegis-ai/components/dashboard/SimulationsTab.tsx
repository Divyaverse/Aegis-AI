"use client";

import { useState } from "react";
import { Activity, Play, Settings2, ShieldAlert, CreditCard, Lock, CheckCircle2 } from "lucide-react";

export function SimulationsTab({ isAttackActive, onTriggerAttack }: { isAttackActive: boolean, onTriggerAttack: () => void }) {
    const [targetEndpoint, setTargetEndpoint] = useState<"login" | "payment">("login");
    const [manualStatus, setManualStatus] = useState<"idle" | "success" | "loading">("idle");

    const handleManualRequest = (e: React.FormEvent) => {
        e.preventDefault();
        setManualStatus("loading");
        setTimeout(() => setManualStatus("success"), 800);
        setTimeout(() => setManualStatus("idle"), 3000);
    };

    return (
        <div className="flex flex-col gap-6 animate-fade-up">
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-white mb-1">Threat Simulation Engine</h1>
                    <p className="text-xs font-mono text-text-secondary uppercase tracking-widest">Target profiling and payload deployment</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">

                {/* ── Left Column: Target Application View ── */}
                <div className="bg-panel border border-border rounded-xl p-8 flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <Settings2 size={18} className="text-brand-cyan" /> Select Target Vector
                        </h2>
                        <div className="flex bg-card border border-border rounded-lg p-1">
                            <button
                                onClick={() => setTargetEndpoint("login")}
                                className={`px-4 py-1.5 text-xs font-mono tracking-widest uppercase rounded-md transition-all ${targetEndpoint === "login" ? "bg-brand-cyan text-[#0b1121] font-bold" : "text-text-secondary hover:text-white"}`}
                            >
                                Auth API
                            </button>
                            <button
                                onClick={() => setTargetEndpoint("payment")}
                                className={`px-4 py-1.5 text-xs font-mono tracking-widest uppercase rounded-md transition-all ${targetEndpoint === "payment" ? "bg-brand-cyan text-[#0b1121] font-bold" : "text-text-secondary hover:text-white"}`}
                            >
                                Payment API
                            </button>
                        </div>
                    </div>

                    {/* Interactive Mock App */}
                    <div className="flex-1 border border-border bg-card rounded-xl p-8 relative overflow-hidden flex flex-col justify-center">
                        <div className="absolute top-4 left-4 flex items-center gap-2">
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-threat-safe opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-threat-safe"></span>
                            </span>
                            <span className="text-[9px] font-mono text-text-secondary uppercase tracking-widest">NovaPay Target App Active</span>
                        </div>

                        <form onSubmit={handleManualRequest} className="w-full max-w-sm mx-auto space-y-4 mt-4">
                            <div className="text-center mb-6">
                                {targetEndpoint === "login" ? <Lock size={32} className="mx-auto text-brand-cyan mb-3" /> : <CreditCard size={32} className="mx-auto text-brand-cyan mb-3" />}
                                <h3 className="text-xl font-bold text-white">
                                    {targetEndpoint === "login" ? "Secure Login" : "Payment Gateway"}
                                </h3>
                                <p className="text-xs text-text-secondary mt-1">Manual (Human) Request Simulator</p>
                            </div>

                            {targetEndpoint === "login" ? (
                                <>
                                    <input type="email" placeholder="Email Address" required className="w-full bg-background border border-border text-white text-sm rounded-lg px-4 py-3 outline-none focus:border-brand-cyan" />
                                    <input type="password" placeholder="Password" required className="w-full bg-background border border-border text-white text-sm rounded-lg px-4 py-3 outline-none focus:border-brand-cyan" />
                                </>
                            ) : (
                                <>
                                    <input type="text" placeholder="Card Number (0000 0000 0000 0000)" required className="w-full bg-background border border-border text-white text-sm rounded-lg px-4 py-3 outline-none focus:border-brand-cyan font-mono" />
                                    <div className="flex gap-4">
                                        <input type="text" placeholder="MM/YY" required className="w-full bg-background border border-border text-white text-sm rounded-lg px-4 py-3 outline-none focus:border-brand-cyan font-mono" />
                                        <input type="text" placeholder="CVC" required className="w-full bg-background border border-border text-white text-sm rounded-lg px-4 py-3 outline-none focus:border-brand-cyan font-mono" />
                                    </div>
                                </>
                            )}

                            <button type="submit" className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors mt-2">
                                {manualStatus === "loading" ? "Processing..." : "Submit Manual Request"}
                            </button>

                            {manualStatus === "success" && (
                                <div className="text-center text-threat-safe text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-1 mt-2">
                                    <CheckCircle2 size={14} /> Human Behavior Verified
                                </div>
                            )}
                        </form>
                    </div>
                </div>

                {/* ── Right Column: Botnet Deployment ── */}
                <div className="flex flex-col gap-6">
                    <div className="bg-panel border border-border rounded-xl p-8 flex-1 flex flex-col justify-center items-center text-center relative overflow-hidden">

                        {isAttackActive && (
                            <div className="absolute inset-0 bg-threat-critical/5 animate-pulse pointer-events-none" />
                        )}

                        <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-colors z-10 ${isAttackActive ? 'bg-threat-critical/10 text-threat-critical' : 'bg-brand-cyan/10 text-brand-cyan'}`}>
                            <ShieldAlert size={32} className={isAttackActive ? 'animate-pulse' : ''} />
                        </div>

                        <h3 className="text-xl font-bold text-white mb-2 z-10">Botnet Payload Deployment</h3>

                        <div className="bg-card border border-border rounded-lg p-4 w-full max-w-sm mb-8 text-left space-y-3 z-10">
                            <div className="flex justify-between text-[10px] font-mono text-text-secondary uppercase tracking-widest">
                                <span>Vector</span>
                                <span className="text-white">{targetEndpoint === "login" ? "Credential Stuffing" : "BIN Attack / Carding"}</span>
                            </div>
                            <div className="flex justify-between text-[10px] font-mono text-text-secondary uppercase tracking-widest">
                                <span>Velocity</span>
                                <span className="text-threat-critical font-bold">847 req/sec</span>
                            </div>
                            <div className="flex justify-between text-[10px] font-mono text-text-secondary uppercase tracking-widest">
                                <span>IP Entropy</span>
                                <span className="text-threat-warning">High (Rotating Proxies)</span>
                            </div>
                        </div>

                        <button
                            onClick={onTriggerAttack}
                            disabled={isAttackActive}
                            className={`w-full max-w-sm py-4 rounded-lg text-xs font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 z-10 ${isAttackActive
                                    ? "bg-threat-critical text-white shadow-[0_0_20px_rgba(251,113,133,0.4)]"
                                    : "bg-brand-cyan text-[#0b1121] hover:bg-[#1bb8d1] shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                                }`}
                        >
                            {isAttackActive ? <><Activity size={16} className="animate-spin" /> Attack In Progress</> : <><Play size={16} fill="currentColor" /> Deploy Automated Attack</>}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}