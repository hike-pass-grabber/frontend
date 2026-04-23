"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { NavBar } from "@/components/NavBar";
import { HikeCard } from "@/components/HikeCard";
import { BookingForm } from "@/components/BookingForm";
import { useAuth } from "@/hooks/useAuth";
import { useHikes } from "@/hooks/useHikes";
import type { Booking, Hike } from "@/types";

export default function HomePage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const { hikes } = useHikes();
  const [selected, setSelected] = useState<Hike | null>(null);

  if (loading) return null;
  if (!user) { router.push("/login"); return null; }

  if (user.role === "unauthorized") {
    return (
      <>
        <NavBar role={user.role} />
        <div className="max-w-lg mx-auto mt-24 text-center px-4">
          <h1 className="text-2xl font-bold text-gray-800">Pending Approval</h1>
          <p className="mt-3 text-gray-500">
            Your account is waiting for admin approval. You&apos;ll receive an email when approved.
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar role={user.role} />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Select a Hike</h1>
        <div className="space-y-2">
          {hikes.map(hike => (
            <HikeCard
              key={hike.id}
              hike={hike}
              selected={selected?.id === hike.id}
              onClick={() => setSelected(hike)}
            />
          ))}
        </div>

        {selected && (
          <div className="mt-8 bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">{selected.name}</h2>
            <BookingForm
              hike={selected}
              onStarted={(_: Booking) => router.push("/dashboard")}
            />
          </div>
        )}
      </div>
    </>
  );
}
