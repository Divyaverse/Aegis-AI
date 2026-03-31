"use client";

import type { SecurityAlert } from "@/types";

interface AlertsFeedProps {
  alerts: SecurityAlert[];
}

export function AlertsFeed({ alerts }: AlertsFeedProps) {
  // Only show top 5 for the sleek look
  const displayAlerts = alerts.slice(0, 5);

  return (
    <div className="flex-1 overflow-y-auto pr-2 space-y-5 custom-scrollbar">
      {displayAlerts.map((alert) => (
        <div key={alert.id} className="relative group">

          <div className="flex items-start justify-between mb-1">
            <span className="text-[10px] font-mono text-text-secondary">
              {alert.timestamp.toLocaleTimeString('en-US', { hour12: false }) + '.' + alert.timestamp.getMilliseconds().toString().padStart(2, '0').slice(0, 2)}
            </span>
            <span className={`text-[9px] font-bold tracking-widest uppercase ${alert.type === 'critical' ? 'text-threat-critical' : 'text-text-secondary'}`}>
              {alert.type === 'critical' ? 'Blocked' : 'Logged'}
            </span>
          </div>

          <p className="text-sm font-semibold text-white mb-2">
            Source: {alert.ip || "104.22.41.9"}
          </p>

          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-card border border-border rounded text-[9px] font-mono text-text-secondary uppercase tracking-widest">
              {alert.attackType || "Anomaly Detected"}
            </span>
            {alert.type === 'critical' && (
              <span className="px-2 py-1 bg-card border border-border rounded text-[9px] font-mono text-text-secondary uppercase tracking-widest">
                High Volume
              </span>
            )}
          </div>

        </div>
      ))}

      {alerts.length === 0 && (
        <p className="text-xs font-mono text-text-secondary text-center mt-10">Waiting for telemetry...</p>
      )}

      {/* View All Button */}
      <button className="w-full mt-4 pt-4 border-t border-border text-[10px] font-bold text-text-secondary hover:text-white uppercase tracking-widest transition-colors">
        View All Logs
      </button>
    </div>
  );
}