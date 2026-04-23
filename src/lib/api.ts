import { getToken } from "./auth";

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers ?? {}),
  };
  const resp = await fetch(`${BASE}${path}`, { ...options, headers });
  if (!resp.ok) {
    const body = await resp.json().catch(() => ({}));
    throw new Error(body.detail ?? `HTTP ${resp.status}`);
  }
  return resp.json();
}

export const api = {
  get:   <T>(path: string)                   => request<T>(path),
  post:  <T>(path: string, body?: unknown)   => request<T>(path, { method: "POST",  body: JSON.stringify(body ?? {}) }),
  patch: <T>(path: string, body?: unknown)   => request<T>(path, { method: "PATCH", body: JSON.stringify(body ?? {}) }),
};
