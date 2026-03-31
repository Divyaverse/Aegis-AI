// ═══════════════════════════════════════════════════════════════
//  🛡️ Aegis.AI — Backend API Service Layer
//  Connects the Next.js frontend to the Node.js defense backend
//  and the Python ML inference engine.
// ═══════════════════════════════════════════════════════════════

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
const ML_URL = process.env.NEXT_PUBLIC_ML_URL || "http://localhost:8000";

// ── Dashboard Data ───────────────────────────────────────────────────────────
export async function fetchDashboard() {
  const res = await fetch(`${BACKEND_URL}/dashboard`, { cache: "no-store" });
  if (!res.ok) throw new Error("Backend unreachable");
  return res.json();
}

// ── Graph Data (nodes + links for network visualization) ─────────────────────
export async function fetchGraphData() {
  const res = await fetch(`${BACKEND_URL}/graph-data`, { cache: "no-store" });
  if (!res.ok) throw new Error("Graph data unavailable");
  return res.json();
}

// ── Alerts ───────────────────────────────────────────────────────────────────
export async function fetchAlerts(level?: "attack" | "suspicious") {
  const query = level ? `?level=${level}` : "";
  const res = await fetch(`${BACKEND_URL}/alerts${query}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Alerts unavailable");
  return res.json();
}

// ── Trigger Simulation (calls POST /simulate/traffic on the backend) ─────────
export async function triggerBackendSimulation(count = 50, type = "mixed") {
  const res = await fetch(
    `${BACKEND_URL}/simulate/traffic?count=${count}&type=${type}`,
    { method: "POST" }
  );
  if (!res.ok) throw new Error("Simulation failed");
  return res.json();
}

// ── Reset Simulation Data ────────────────────────────────────────────────────
export async function resetBackendSimulation() {
  const res = await fetch(`${BACKEND_URL}/simulate/reset`, { method: "DELETE" });
  if (!res.ok) throw new Error("Reset failed");
  return res.json();
}

// ── Send a single login attempt for ML analysis ──────────────────────────────
export async function analyzeLogin(payload: {
  user_id: string;
  ip: string;
  time_gap: number;
  request_rate: number;
  same_ip: number;
}) {
  const res = await fetch(`${BACKEND_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Login analysis failed");
  return res.json();
}

// ── ML Engine Health Check ───────────────────────────────────────────────────
export async function checkMLHealth() {
  try {
    const res = await fetch(`${ML_URL}/`, { cache: "no-store" });
    if (!res.ok) return { status: "offline" };
    const data = await res.json();
    return { status: "online", ...data };
  } catch {
    return { status: "offline" };
  }
}

// ── Backend Health Check ─────────────────────────────────────────────────────
export async function checkBackendHealth() {
  try {
    const res = await fetch(`${BACKEND_URL}/`, { cache: "no-store" });
    if (!res.ok) return { status: "offline" };
    const data = await res.json();
    return { status: "online", ...data };
  } catch {
    return { status: "offline" };
  }
}

// ── Blocked IPs ──────────────────────────────────────────────────────────────
export async function fetchBlockedIPs() {
  const res = await fetch(`${BACKEND_URL}/auth/blocked`, { cache: "no-store" });
  if (!res.ok) throw new Error("Blocked IPs unavailable");
  return res.json();
}
