// components/providers/WebSocketProvider.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useSession } from "next-auth/react";

interface WebSocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

const WebSocketContext = createContext<WebSocketContextType>({
  socket: null,
  isConnected: false,
  isAuthenticated: false,
  error: null,
});

export const useWebSocket = () => useContext(WebSocketContext);

export function WebSocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    // Initialize Socket.IO server if it's not already running
    const initializeSocket = async () => {
      await fetch("/api/socket/io");
    };

    initializeSocket();

    // Create socket instance
    const socketInstance = io("", {
      path: "/api/socket",
      autoConnect: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    setSocket(socketInstance);

    // Socket event listeners
    socketInstance.on("connect", () => {
      console.log("Socket connected:", socketInstance.id);
      setIsConnected(true);
      setError(null);

      // Authenticate if session exists and has an accessToken
      if (session?.user?.accessToken) {
        socketInstance.emit("authenticate", session.user.accessToken);
      }
    });

    socketInstance.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);
      setError(`Connection error: ${err.message}`);
      setIsConnected(false);
      setIsAuthenticated(false);
    });

    socketInstance.on("authenticated", () => {
      console.log("Socket authenticated successfully");
      setIsAuthenticated(true);
      setError(null);
    });

    socketInstance.on("auth_error", (errorMsg) => {
      console.error("Socket authentication error:", errorMsg);
      setError(`Authentication error: ${errorMsg}`);
      setIsAuthenticated(false);
    });

    socketInstance.on("disconnect", () => {
      console.log("Socket disconnected");
      setIsConnected(false);
      setIsAuthenticated(false);
    });

    // Cleanup on unmount
    return () => {
      socketInstance.disconnect();
    };
  }, [session]);

  // Re-authenticate when session changes
  useEffect(() => {
    if (socket && isConnected && session?.user?.accessToken) {
      socket.emit("authenticate", session.user.accessToken);
    }
  }, [socket, isConnected, session]);

  return (
    <WebSocketContext.Provider
      value={{ socket, isConnected, isAuthenticated, error }}
    >
      {children}
    </WebSocketContext.Provider>
  );
}