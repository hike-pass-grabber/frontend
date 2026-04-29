"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { NavBar } from "@/components/NavBar";
import { HikeCard } from "@/components/HikeCard";
import { BookingForm } from "@/components/BookingForm";
import { Modal } from "@/components/Modal";
import { AddHikeModal } from "@/components/AddHikeModal";
import { EditHikeModal } from "@/components/EditHikeModal";
import { DeleteHikeModal } from "@/components/DeleteHikeModal";
import { useAuth } from "@/hooks/useAuth";
import { useHikes } from "@/hooks/useHikes";
import { LoadingScreen } from "@/components/LoadingScreen";
import type { Hike } from "@/types";

export default function HomePage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const { hikes, refresh: refreshHikes } = useHikes();

  const [bookingHike, setBookingHike] = useState<Hike | null>(null);
  const [editHike, setEditHike] = useState<Hike | null>(null);
  const [deleteHike, setDeleteHike] = useState<Hike | null>(null);
  const [showAddHike, setShowAddHike] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [loading, user, router]);

  if (loading || !user) return <LoadingScreen />;

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

  const isAdmin = user.role === "admin";

  return (
    <>
      <NavBar role={user.role} />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Select a Hike</h1>
          {isAdmin && (
            <button
              onClick={() => setShowAddHike(true)}
              className="bg-green-700 text-white px-4 py-2 rounded text-sm hover:bg-green-800"
            >
              + Add Hike
            </button>
          )}
        </div>

        <div className="space-y-2">
          {hikes.map(hike => (
            <HikeCard
              key={hike.id}
              hike={hike}
              isAdmin={isAdmin}
              onClick={() => setBookingHike(hike)}
              onEdit={() => setEditHike(hike)}
              onDelete={() => setDeleteHike(hike)}
            />
          ))}
        </div>
      </div>

      {bookingHike && (
        <Modal title={`Start Polling — ${bookingHike.name}`} onClose={() => setBookingHike(null)}>
          <BookingForm
            hike={bookingHike}
            onStarted={() => {
              setBookingHike(null);
              router.push("/dashboard");
            }}
          />
        </Modal>
      )}

      {editHike && (
        <EditHikeModal
          hike={editHike}
          onClose={() => setEditHike(null)}
          onUpdated={refreshHikes}
        />
      )}

      {showAddHike && (
        <AddHikeModal
          onClose={() => setShowAddHike(false)}
          onAdded={refreshHikes}
        />
      )}

      {deleteHike && (
        <DeleteHikeModal
          hike={deleteHike}
          onClose={() => setDeleteHike(null)}
          onDeleted={() => {
            setDeleteHike(null);
            refreshHikes();
          }}
        />
      )}
    </>
  );
}
