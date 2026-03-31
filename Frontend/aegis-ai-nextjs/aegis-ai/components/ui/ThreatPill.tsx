import { cn } from "@/lib/utils";
import type { ThreatLevel } from "@/types";

const pillClass: Record<ThreatLevel, string> = {
  critical: "pill-critical",
  high:     "pill-high",
  medium:   "pill-medium",
  low:      "pill-low",
  safe:     "pill-safe",
};

interface ThreatPillProps {
  level: ThreatLevel;
  label?: string;
  className?: string;
}

export function ThreatPill({ level, label, className }: ThreatPillProps) {
  return (
    <span
      className={cn(
        "inline-block text-[9px] tracking-[1.5px] uppercase px-[9px] py-[3px] rounded-[2px] font-medium",
        pillClass[level],
        className
      )}
      style={{ fontFamily: "var(--font-jetbrains)" }}
    >
      {label ?? level}
    </span>
  );
}
