"use client";

// ═══════════════════════════════════════════════════════════════
//  🛡️ Aegis.AI — useSocketIO Hook
//  Connects to the backend via Socket.IO for real-time events.
//  Falls back gracefully if the backend is offline.
// ═══════════════════════════════════════════════════════════════

import { useEffect, useRef, useCallback, useState } from "react";
import { io, Socket } from "socket.io-client";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

interface SocketEvent {
  event: string;
  handler: (...args: any[]) => void;
}

export function useSocketIO(events: SocketEvent[]) {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = io(BACKEND_URL, {
      transports: ["websocket", "polling"],
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
      timeout: 5000,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("📡 Socket.IO connected to Aegis Backend");
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("📡 Socket.IO disconnected");
      setIsConnected(false);
    });

    socket.on("connect_error", () => {
      // Silently handle — frontend will fall back to simulation mode
      setIsConnected(false);
    });

    // Register all event listeners
    events.forEach(({ event, handler }) => {
      socket.on(event, handler);
    });

    return () => {
      events.forEach(({ event, handler }) => {
        socket.off(event, handler);
      });
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const emit = useCallback((event: string, data?: any) => {
    socketRef.current?.emit(event, data);
  }, []);

  return { isConnected, emit };
}
