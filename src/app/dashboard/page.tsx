"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { NavBar } from "@/components/NavBar";
import { StatusBanner } from "@/components/StatusBanner";
import { AlertPopup } from "@/components/AlertPopup";
import { useAuth } from "@/hooks/useAuth";
import { useBookingStatus } from "@/hooks/useBookingStatus";
import { useLocalStatus } from "@/hooks/useLocalStatus";
import { api } from "@/lib/api";

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const { bookings, refresh } = useBookingStatus();
  const localStatus = useLocalStatus(user);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [loading, user, router]);

  if (loading || !user) return <div className="flex justify-center items-center h-screen"><div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin" /></div>;

  const active = bookings.find(b => b.status === "polling" || b.status === "available");

  async function handleStop(bookingId: string) {
    await api.post(`/bookings/${bookingId}/stop`).catch(() => {});
    refresh();
  }

  return (
    <>
      <NavBar role={user.role} />
      <AlertPopup bookings={bookings} />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h1>

        <div className="flex items-center gap-2 mb-6 text-sm">
          {localStatus === "ready" && (
            <>
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" />
              <span className="text-gray-600">Local program running and ready</span>
            </>
          )}
          {localStatus === "unauthenticated" && (
            <>
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block" />
              <span className="text-gray-600">Local program running — not signed in, automation won&apos;t work</span>
            </>
          )}
          {localStatus === "mismatch" && (
            <>
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block" />
              <span className="text-gray-600">Local program signed in as a different account — automation won&apos;t work</span>
            </>
          )}
          {localStatus === "offline" && (
            <>
              <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" />
              <span className="text-gray-500">Local program not detected — automation won&apos;t work</span>
            </>
          )}
        </div>

        {active ? (
          <div className="mb-8">
            <StatusBanner booking={active} />
            {active.status === "polling" && (
              <button
                onClick={() => handleStop(active.id)}
                className="mt-2 text-sm text-red-600 hover:underline"
              >
                Stop polling
              </button>
            )}
          </div>
        ) : (
          <p className="text-gray-400 text-sm mb-8">No active polling session.</p>
        )}

        <h2 className="text-lg font-semibold text-gray-700 mb-3">History</h2>
        {bookings.length === 0 ? (
          <p className="text-gray-400 text-sm">No bookings yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-gray-500">
                <th className="pb-2 font-medium">Hike</th>
                <th className="pb-2 font-medium">Date</th>
                <th className="pb-2 font-medium">Status</th>
                <th className="pb-2 font-medium">Started</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(b => (
                <tr key={b.id} className="border-b last:border-0">
                  <td className="py-2">{b.hike_name ?? "—"}</td>
                  <td className="py-2">{b.hike_date}</td>
                  <td className="py-2 capitalize">{b.status}</td>
                  <td className="py-2 text-gray-400">
                    {b.started_at ? new Date(b.started_at).toLocaleString() : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
