"use client";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { getToken, setToken, clearToken } from "@/lib/auth";
import type { User } from "@/types";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!getToken()) { setLoading(false); return; }
    api.get<User>("/users/me")
      .then(setUser)
      .catch(() => clearToken())
      .finally(() => setLoading(false));
  }, []);

  async function login(email: string, password: string): Promise<User> {
    const data = await api.post<{ access_token: string }>("/auth/login", { email, password });
    setToken(data.access_token);
    const me = await api.get<User>("/users/me");
    setUser(me);
    return me;
  }

  function logout() {
    clearToken();
    setUser(null);
  }

  return { user, loading, login, logout };
}
