"use client";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { ChartDataPoint } from "@/types";

export function LoginActivityChart({ data, isAttackActive }: { data: ChartDataPoint[], isAttackActive: boolean }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 5, right: 0, bottom: 0, left: -20 }}>
        <defs>
          <linearGradient id="gradNormal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gradAttack" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#fb7185" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#fb7185" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gradSusp" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#fbbf24" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#2a364a" vertical={false} />
        <XAxis dataKey="time" tick={{ fontSize: 10, fill: "#94a3b8", fontFamily: "JetBrains Mono" }} tickLine={false} axisLine={false} interval={7} />
        <YAxis tick={{ fontSize: 10, fill: "#94a3b8", fontFamily: "JetBrains Mono" }} tickLine={false} axisLine={false} />
        <Tooltip contentStyle={{ backgroundColor: "#1e293b", borderColor: "#3b4a6b", borderRadius: "8px", color: "#f8fafc" }} itemStyle={{ fontSize: "12px", fontWeight: "bold" }} />
        <Area type="monotone" dataKey="normal" stroke="#3b82f6" strokeWidth={2} fill="url(#gradNormal)" dot={false} />
        <Area type="monotone" dataKey="suspicious" stroke="#fbbf24" strokeWidth={2} fill="url(#gradSusp)" dot={false} />
        <Area type="monotone" dataKey="attack" stroke="#fb7185" strokeWidth={2} fill="url(#gradAttack)" dot={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}