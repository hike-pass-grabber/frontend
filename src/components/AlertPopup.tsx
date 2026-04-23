"use client";
import { useEffect, useRef } from "react";
import type { Booking } from "@/types";

export function AlertPopup({ bookings }: { bookings: Booking[] }) {
  const notified = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (typeof Notification !== "undefined" && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    for (const b of bookings) {
      if (b.status === "available" && !notified.current.has(b.id)) {
        notified.current.add(b.id);
        if (Notification.permission === "granted") {
          new Notification("Pass available!", {
            body: "A spot just opened. Complete your booking now.",
          });
        }
      }
    }
  }, [bookings]);

  return null;
}
