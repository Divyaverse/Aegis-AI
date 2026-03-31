"use client";

import { useState } from "react";
import { Shield, Fingerprint, Lock, ArrowRight } from "lucide-react";

export default function FinTechLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSimulatingBot, setIsSimulatingBot] = useState(false);
    const [loginStatus, setLoginStatus] = useState<"idle" | "loading" | "blocked" | "success">("idle");

    const handleHumanLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoginStatus("loading");
        // Simulate a normal login delay
        setTimeout(() => setLoginStatus("success"), 1200);
    };

    const triggerBotnet = () => {
        setIsSimulatingBot(true);
        setLoginStatus("loading");

        // In your real demo, this button can fire a request to your backend to trigger the attack.
        // For now, it simulates the "Blocked" response from Aegis.AI.
        setTimeout(() => {
            setLoginStatus("blocked");
            setIsSimulatingBot(false);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center p-4 font-sans relative overflow-hidden text-white">

            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

            {/* Target App UI Container */}
            <div className="w-full max-w-[420px] bg-[#18181b] border border-[#3f3f46] rounded-2xl p-8 relative z-10 shadow-2xl">

                {/* Logo / Header */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center mb-5 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                        <Lock size={22} />
                    </div>
                    <h1 className="text-2xl font-semibold tracking-tight">NovaPay Secure</h1>
                    <p className="text-[#a1a1aa] text-sm mt-2 text-center">Enter your credentials to access your global FinTech vault.</p>
                </div>

                {/* Status Messages */}
                {loginStatus === "blocked" && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3">
                        <Shield className="text-red-500 flex-shrink-0 mt-0.5" size={18} />
                        <div>
                            <p className="text-red-500 font-semibold text-sm">Access Denied</p>
                            <p className="text-red-400/80 text-xs mt-1">Aegis.AI detected anomalous behavioral patterns. Your IP has been temporarily quarantined.</p>
                        </div>
                    </div>
                )}

                {loginStatus === "success" && (
                    <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-center gap-3">
                        <Shield className="text-emerald-500 flex-shrink-0" size={18} />
                        <p className="text-emerald-500 font-medium text-sm">Authentication Successful</p>
                    </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleHumanLogin} className="space-y-5">
                    <div>
                        <label className="block text-xs font-semibold text-[#a1a1aa] mb-2 uppercase tracking-wider">Email Address</label>
                        <input
                            type="email"
                            required
                            className="w-full bg-[#27272a] border border-[#3f3f46] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                            placeholder="customer@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-[#a1a1aa] mb-2 uppercase tracking-wider">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full bg-[#27272a] border border-[#3f3f46] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loginStatus === "loading"}
                        className="w-full bg-white text-black hover:bg-zinc-200 font-semibold rounded-lg py-3 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {loginStatus === "loading" && !isSimulatingBot ? "Authenticating..." : (
                            <>
                                <Fingerprint size={18} />
                                Sign In Securely
                            </>
                        )}
                    </button>
                </form>

                {/* Developer Attack Panel */}
                <div className="mt-8 pt-8 border-t border-[#3f3f46]">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="h-[1px] flex-1 bg-[#3f3f46]"></div>
                        <p className="text-[10px] text-[#71717a] font-mono uppercase tracking-widest">Demo Attack Vectors</p>
                        <div className="h-[1px] flex-1 bg-[#3f3f46]"></div>
                    </div>

                    <button
                        onClick={triggerBotnet}
                        disabled={isSimulatingBot}
                        className={`w-full py-3 rounded-lg border text-sm font-medium transition-all flex items-center justify-center gap-2 ${isSimulatingBot
                                ? 'bg-red-500/20 border-red-500 text-red-500 animate-pulse'
                                : 'bg-[#27272a] border-[#3f3f46] text-[#a1a1aa] hover:border-red-500 hover:text-red-400'
                            }`}
                    >
                        {isSimulatingBot ? (
                            'Deploying Credential Stuffing (847 req/s)...'
                        ) : (
                            <>
                                Simulate Botnet Attack <ArrowRight size={16} />
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Powered By Badge */}
            <div className="mt-8 flex items-center gap-2 text-[#71717a] text-xs font-medium tracking-wide bg-[#18181b] px-4 py-2 rounded-full border border-[#3f3f46]">
                <Shield size={14} className="text-blue-500" />
                INFRASTRUCTURE PROTECTED BY <span className="text-white font-bold">AEGIS.AI</span>
            </div>
        </div>
    );
}