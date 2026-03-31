"use client";

import { useEffect, useRef } from "react";

interface Node {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: "safe" | "bot" | "suspicious";
  r: number;
  targetX?: number;
  targetY?: number;
}

interface Edge {
  a: number;
  b: number;
}

interface NetworkGraphProps {
  isAttackActive: boolean;
  attackPhase: string;
}

export function NetworkGraph({ isAttackActive, attackPhase }: NetworkGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<{
    nodes: Node[];
    edges: Edge[];
    tick: number;
    animId: number;
  } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Build initial node/edge graph
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    const NW = canvas.width;
    const NH = canvas.height;

    // Safe nodes — spread around
    for (let i = 0; i < 18; i++) {
      nodes.push({
        id: i,
        x: 20 + Math.random() * (NW - 40),
        y: 20 + Math.random() * (NH - 40),
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        type: "safe",
        r: 2.5 + Math.random() * 1.5,
      });
    }

    // Bot cluster — center-right
    const bcx = NW * 0.65, bcy = NH * 0.5;
    for (let i = 18; i < 32; i++) {
      nodes.push({
        id: i,
        x: bcx + (Math.random() - 0.5) * 60,
        y: bcy + (Math.random() - 0.5) * 60,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        type: "bot",
        r: 3 + Math.random() * 2,
        targetX: bcx,
        targetY: bcy,
      });
    }

    // Suspicious bridging nodes
    for (let i = 32; i < 38; i++) {
      nodes.push({
        id: i,
        x: NW * 0.45 + Math.random() * (NW * 0.2),
        y: NH * 0.3 + Math.random() * (NH * 0.4),
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        type: "suspicious",
        r: 2.5,
      });
    }

    // Connect Bot cluster tightly
    for (let i = 18; i < 32; i++) {
      for (let j = i + 1; j < 32; j++) {
        if (Math.random() < 0.3) edges.push({ a: i, b: j });
      }
    }
    // Connect Safe nodes sparsely
    for (let i = 0; i < 18; i++) {
      if (Math.random() < 0.2) edges.push({ a: i, b: Math.floor(Math.random() * 18) });
    }
    // Bridge suspicious
    for (let i = 32; i < 38; i++) {
      edges.push({ a: i, b: 18 + Math.floor(Math.random() * 14) }); // link to bot
    }

    let tick = 0;

    function draw() {
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      tick++;

      const pulse = 0.5 + 0.5 * Math.sin(tick * 0.05);
      const attackIntensity = isAttackActive ? 1 : 0.3;

      // Bot cluster glow halo (Red/Coral - #fb7185)
      const haloGrad = ctx.createRadialGradient(bcx, bcy, 0, bcx, bcy, 70 + pulse * 20);
      haloGrad.addColorStop(0, `rgba(251, 113, 133, ${(0.05 + pulse * 0.05) * attackIntensity})`);
      haloGrad.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(bcx, bcy, 70 + pulse * 20, 0, Math.PI * 2);
      ctx.fillStyle = haloGrad;
      ctx.fill();

      // Draw edges
      for (const e of edges) {
        const na = nodes[e.a], nb = nodes[e.b];
        if (!na || !nb) continue;
        const isBotEdge = na.type === "bot" && nb.type === "bot";

        ctx.beginPath();
        ctx.moveTo(na.x, na.y);
        ctx.lineTo(nb.x, nb.y);
        ctx.strokeStyle = isBotEdge
          ? `rgba(251, 113, 133, ${(0.1 + pulse * 0.15) * attackIntensity})` // #fb7185
          : "rgba(34, 211, 238, 0.1)"; // #22d3ee
        ctx.lineWidth = isBotEdge ? 1.5 : 0.5;
        ctx.stroke();
      }

      // Update & draw nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 4 || n.x > W - 4) n.vx *= -1;
        if (n.y < 4 || n.y > H - 4) n.vy *= -1;

        // Bot nodes drift toward cluster center if attack is active
        if (n.type === "bot" && n.targetX && n.targetY) {
          n.x += (n.targetX - n.x) * 0.005 * attackIntensity;
          n.y += (n.targetY - n.y) * 0.005 * attackIntensity;
        }

        // Color assignments based on new Tailwind config
        const color = n.type === "bot" ? "#fb7185" : n.type === "suspicious" ? "#fbbf24" : "#22d3ee";
        const glowSize = n.type === "bot" ? 8 + pulse * 4 : 2;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = glowSize;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // "BOTNET_ALPHA_DETECTION" label blinks near the cluster
      if (Math.floor(tick / 40) % 2 === 0 && attackPhase !== "idle") {
        ctx.fillStyle = `rgba(251, 113, 133, ${0.7 + 0.3 * pulse})`; // #fb7185
        ctx.font = `bold 10px 'JetBrains Mono', monospace`;
        ctx.fillText("BOTNET_ALPHA_DETECTION", bcx - 65, bcy + 55);
        ctx.fillStyle = `rgba(148, 163, 184, 0.8)`; // text-secondary
        ctx.font = `10px 'JetBrains Mono', monospace`;
        ctx.fillText("IP: 192.168.1.XX", bcx - 45, bcy + 68);
      }

      stateRef.current!.animId = requestAnimationFrame(draw);
    }

    stateRef.current = { nodes, edges, tick: 0, animId: 0 };
    stateRef.current.animId = requestAnimationFrame(draw);

    return () => {
      if (stateRef.current) cancelAnimationFrame(stateRef.current.animId);
      window.removeEventListener("resize", resize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full h-full relative bg-transparent">
      {/* Target Crosshair graphic in center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-border/30 rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-40 bg-border/20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-[1px] bg-border/20 pointer-events-none" />

      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}