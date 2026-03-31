"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Shield, Activity, Lock, Terminal, ShieldAlert } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// --- 3D AI Core Component ---
function AICore() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group>
      {/* Outer Wireframe Sphere (The Isolation Forest) */}
      <Sphere args={[2.4, 32, 32]} ref={meshRef}>
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.15} />
      </Sphere>

      {/* Inner Distorting Core (The ML Engine) */}
      <Sphere args={[1.8, 64, 64]}>
        <MeshDistortMaterial
          color="#0b1121"
          envMapIntensity={1}
          clearcoat={0.8}
          clearcoatRoughness={0}
          metalness={0.9}
          roughness={0.1}
          distort={0.4}
          speed={2}
          emissive="#22d3ee"
          emissiveIntensity={0.2}
        />
      </Sphere>

      {/* Orbiting Threat Nodes (Red) */}
      <mesh position={[2.8, 1, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#fb7185" />
      </mesh>
      <mesh position={[-2.5, -1.5, 1]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color="#fb7185" />
      </mesh>
    </group>
  );
}

export default function EnterpriseLandingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#050810] text-slate-200 font-sans selection:bg-[#22d3ee]/30 overflow-hidden flex flex-col relative">

      {/* --- Global Background Gradients --- */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#151e32_0%,_#050810_100%)] pointer-events-none" />

      {/* --- Top Navigation --- */}
      <nav className="relative z-50 flex items-center justify-between px-8 py-5 border-b border-[#1e293b] bg-[#0b1121]/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Shield className="text-[#22d3ee]" size={26} />
          <span className="text-2xl font-bold tracking-tight text-white">
            Aegis<span className="text-[#22d3ee]">.AI</span>
          </span>
          <span className="hidden sm:flex ml-4 px-2 py-1 bg-[#22d3ee]/10 border border-[#22d3ee]/20 text-[#22d3ee] text-[10px] font-mono tracking-widest uppercase rounded">
            Tactical Intel
          </span>
        </div>
        <div className="flex items-center gap-8 text-sm font-medium text-slate-400">
          <Link href="/dashboard" className="hover:text-white transition-colors">Platform</Link>
          <Link href="/integration" className="hover:text-white transition-colors">Integration</Link>
          <Link href="/demo" className="hover:text-white transition-colors">Target App</Link>
          <Link href="/dashboard" className="px-6 py-2.5 bg-[#22d3ee] text-[#050810] font-bold rounded hover:bg-[#1bb8d1] transition-all shadow-[0_0_15px_rgba(34,211,238,0.3)]">
            COMMAND CENTER
          </Link>
        </div>
      </nav>

      {/* --- Main Hero Section --- */}
      <main className="relative z-10 flex-1 w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center px-8 py-12">

        {/* Left Column: Copy & Actions */}
        <div className="flex flex-col items-start z-20">

          {/* Status Pill */}
          <div className="flex items-center gap-3 px-3 py-1.5 border border-[#1e293b] bg-[#0b1121] rounded-full mb-8">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34d399] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#34d399]"></span>
            </span>
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">Global Defense Network Active</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
            Eradicate Bots.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22d3ee] to-[#3b82f6]">
              By Behavior.
            </span>
          </h1>

          <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-xl">
            Aegis.AI deploys an Isolation Forest ML engine to protect FinTech infrastructure. We do not just block IPs; we analyze spatio-temporal interaction rhythms to neutralize zero-day botnets in real-time.
          </p>

          <div className="flex flex-wrap items-center gap-4 w-full">
            <Link href="/dashboard" className="px-8 py-4 bg-[#22d3ee] text-[#050810] font-bold rounded hover:bg-[#1bb8d1] transition-all flex items-center justify-center gap-2 group">
              Access Live Telemetry <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/integration" className="px-8 py-4 bg-[#0b1121] border border-[#1e293b] text-white font-medium rounded hover:bg-[#151e32] transition-all flex items-center justify-center gap-2">
              <Terminal size={18} /> View API Docs
            </Link>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-6 mt-16 pt-8 border-t border-[#1e293b] w-full max-w-xl">
            <div>
              <p className="text-3xl font-bold text-white mb-1">42<span className="text-[#22d3ee] text-lg">ms</span></p>
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Inference Latency</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white mb-1">99.8<span className="text-[#22d3ee] text-lg">%</span></p>
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Detection Accuracy</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white mb-1">0.04<span className="text-[#fb7185] text-lg">%</span></p>
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">False Positives</p>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Visualization & Floating UI */}
        <div className="relative w-full h-[600px] flex items-center justify-center lg:justify-end">

          {/* 3D Canvas */}
          <div className="absolute inset-0 w-full h-full z-0">
            <Canvas camera={{ position: [0, 0, 6] }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <AICore />
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
          </div>

          {/* Floating UI Overlay: Intercept Feed */}
          <div className="absolute bottom-10 right-0 w-72 bg-[#0b1121]/90 border border-[#1e293b] backdrop-blur-md rounded-lg p-4 z-10 shadow-2xl animate-fade-up">
            <div className="flex items-center justify-between mb-4 border-b border-[#1e293b] pb-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Activity size={12} className="text-[#22d3ee]" /> Live Intercept Feed
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] font-mono text-slate-300">194.27.112.4</p>
                  <p className="text-[9px] text-slate-500 mt-0.5">Credential Stuffing</p>
                </div>
                <span className="text-[9px] font-bold text-[#fb7185] bg-[#fb7185]/10 px-1.5 py-0.5 rounded">BLOCKED</span>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] font-mono text-slate-300">88.192.4.55</p>
                  <p className="text-[9px] text-slate-500 mt-0.5">High Volume Anomaly</p>
                </div>
                <span className="text-[9px] font-bold text-[#fb7185] bg-[#fb7185]/10 px-1.5 py-0.5 rounded">BLOCKED</span>
              </div>
              <div className="flex justify-between items-start opacity-50">
                <div>
                  <p className="text-[10px] font-mono text-slate-300">104.22.41.9</p>
                  <p className="text-[9px] text-slate-500 mt-0.5">Brute Force</p>
                </div>
                <span className="text-[9px] font-bold text-[#fb7185] bg-[#fb7185]/10 px-1.5 py-0.5 rounded">BLOCKED</span>
              </div>
            </div>
          </div>

          {/* Floating UI Overlay: Risk Score */}
          <div className="absolute top-10 left-10 w-48 bg-[#0b1121]/90 border border-[#1e293b] backdrop-blur-md rounded-lg p-4 z-10 shadow-2xl animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-3 text-center">Current Threat Index</p>
            <div className="relative w-24 h-24 mx-auto flex items-center justify-center rounded-full border-4 border-[#1e293b] border-t-[#fb7185]">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">87<span className="text-sm">%</span></p>
                <p className="text-[8px] font-bold text-[#fb7185] uppercase tracking-wider">High Risk</p>
              </div>
            </div>
            <p className="text-[9px] text-slate-500 text-center mt-3">Active Cluster: BCN-014</p>
          </div>

        </div>
      </main>

      {/* --- Footer / Bottom Bar --- */}
      <footer className="relative z-10 border-t border-[#1e293b] bg-[#0b1121] px-8 py-4 flex items-center justify-between text-[10px] font-mono text-slate-500 uppercase tracking-widest">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2"><Lock size={12} className="text-[#34d399]" /> Encrypted Connection Established</span>
          <span className="hidden md:inline">Node: US_WEST_1</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Aegis-Core: V4.8.2-Stable</span>
          <span>Team Leviosa</span>
        </div>
      </footer>
    </div>
  );
}