import type { Booking } from "@/types";

const colors: Record<string, string> = {
  polling:   "bg-blue-50 border-blue-300 text-blue-800",
  available: "bg-green-50 border-green-500 text-green-900 font-semibold",
  success:   "bg-green-100 border-green-600 text-green-900",
  failed:    "bg-red-50 border-red-300 text-red-800",
  expired:   "bg-gray-50 border-gray-300 text-gray-600",
  cancelled: "bg-gray-50 border-gray-300 text-gray-600",
};

const messages: Record<string, string> = {
  polling:   "Checking every 10s…",
  available: "Spot open! Complete your booking now.",
  success:   "Booking completed.",
  failed:    "Polling failed. Try again.",
  expired:   "Session expired.",
  cancelled: "Polling stopped.",
};

export function StatusBanner({ booking }: { booking: Booking }) {
  return (
    <div className={`border rounded-lg px-4 py-3 ${colors[booking.status] ?? "bg-gray-50"}`}>
      <span className="capitalize">{booking.status}</span>
      {messages[booking.status] && (
        <span className="ml-2 text-sm font-normal opacity-80">{messages[booking.status]}</span>
      )}
    </div>
  );
}
