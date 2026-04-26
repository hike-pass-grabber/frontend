"use client";
import { useState, useEffect } from "react";
import type { User } from "@/types";

export type LocalStatus = "offline" | "unauthenticated" | "mismatch" | "ready";

export function useLocalStatus(user: User | null): LocalStatus {
  const [status, setStatus] = useState<LocalStatus>("offline");

  useEffect(() => {
    async function check() {
      try {
        const res = await fetch("http://localhost:8765/status", { signal: AbortSignal.timeout(2000) });
        const data = await res.json();
        if (!data.authenticated) {
          setStatus("unauthenticated");
        } else if (user && data.user_id !== user.id) {
          setStatus("mismatch");
        } else {
          setStatus("ready");
        }
      } catch {
        setStatus("offline");
      }
    }

    check();
    const id = setInterval(check, 5000);
    return () => clearInterval(id);
  }, [user]);

  return status;
}
