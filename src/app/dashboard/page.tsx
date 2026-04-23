"use client";
import { useRouter } from "next/navigation";
import { NavBar } from "@/components/NavBar";
import { StatusBanner } from "@/components/StatusBanner";
import { AlertPopup } from "@/components/AlertPopup";
import { useAuth } from "@/hooks/useAuth";
import { useBookingStatus } from "@/hooks/useBookingStatus";
import { api } from "@/lib/api";

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const { bookings, refresh } = useBookingStatus();

  if (loading) return null;
  if (!user) { router.push("/login"); return null; }

  const active = bookings.find(b => b.status === "polling" || b.status === "available");

  async function handleStop(bookingId: string) {
    await api.post(`/bookings/${bookingId}/stop`);
    refresh();
  }

  return (
    <>
      <NavBar role={user.role} />
      <AlertPopup bookings={bookings} />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

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
                <th className="pb-2 font-medium">Date</th>
                <th className="pb-2 font-medium">Status</th>
                <th className="pb-2 font-medium">Started</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(b => (
                <tr key={b.id} className="border-b last:border-0">
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
