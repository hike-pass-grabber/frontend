"use client";
import { useState, useEffect, useRef } from "react";
import { api } from "@/lib/api";
import type { Booking } from "@/types";

export function useBookingStatus() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);

  function refresh() {
    api.get<Booking[]>("/bookings").then(setBookings).catch(() => {});
  }

  useEffect(() => {
    refresh();
    ref.current = setInterval(refresh, 3000);
    return () => { if (ref.current) clearInterval(ref.current); };
  }, []);

  return { bookings, refresh };
}
