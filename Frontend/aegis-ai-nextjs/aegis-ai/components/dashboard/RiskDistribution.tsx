"use client";

import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from "recharts";

interface RiskDistributionProps {
  stats: any;
  isAttackActive?: boolean;
}

export function RiskDistribution({ stats, isAttackActive }: RiskDistributionProps) {
  const total = Math.max(stats.totalLogins, 1);
  const rawScore = Math.round((stats.botAttacks / total) * 1000) / 10;

  // Force high score if demo is active for visual effect
  const displayScore = isAttackActive ? 87 : Math.max(12, rawScore);
  const color = displayScore > 70 ? "#fb7185" : displayScore > 30 ? "#fbbf24" : "#34d399";

  const radialData = [
    { name: "Score", value: displayScore, fill: color },
  ];

  return (
    <div className="bg-panel border border-border rounded-xl p-6">
      <h3 className="text-[10px] font-mono text-text-secondary uppercase tracking-widest mb-6">Risk Level</h3>

      {/* Centered Donut Chart */}
      <div className="relative w-40 h-40 mx-auto mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%" cy="50%" innerRadius="85%" outerRadius="100%"
            data={radialData} startAngle={90} endAngle={-270}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            <RadialBar dataKey="value" cornerRadius={10} background={{ fill: "#1e293b" }} />
          </RadialBarChart>
        </ResponsiveContainer>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-4xl font-extrabold text-white tracking-tighter leading-none">
            {displayScore}<span className="text-lg text-text-secondary ml-0.5">%</span>
          </span>
          <span className="text-[8px] tracking-[2px] uppercase mt-2 font-bold" style={{ color }}>
            {displayScore > 70 ? "High Risk" : "Monitored"}
          </span>
        </div>
      </div>

      {/* Telemetry Bars */}
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-[10px] font-mono text-text-secondary uppercase tracking-widest mb-2">
            <span>Latency</span>
            <span className="text-white">42ms</span>
          </div>
          <div className="w-full h-1 bg-card rounded-full overflow-hidden">
            <div className="h-full bg-brand-cyan rounded-full w-[15%]" />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-[10px] font-mono text-text-secondary uppercase tracking-widest mb-2">
            <span>Integrity</span>
            <span className="text-white">99.2%</span>
          </div>
          <div className="w-full h-1 bg-card rounded-full overflow-hidden">
            <div className="h-full bg-brand-cyan rounded-full w-[99%]" />
          </div>
        </div>
      </div>
    </div>
  );
}