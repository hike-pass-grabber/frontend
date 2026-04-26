"use client";
import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";
import type { Hike } from "@/types";

export function useHikes() {
  const [hikes, setHikes] = useState<Hike[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    api.get<Hike[]>("/hikes/").then(setHikes).catch(() => {});
  }, []);

  useEffect(() => {
    api.get<Hike[]>("/hikes/")
      .then(setHikes)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { hikes, loading, refresh };
}
