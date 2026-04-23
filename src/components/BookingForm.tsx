"use client";
import { useState } from "react";
import { api } from "@/lib/api";
import type { Hike, Booking } from "@/types";

interface Props {
  hike: Hike;
  onStarted: (booking: Booking) => void;
}

const FIELDS = [
  { label: "Date",       key: "hike_date",   type: "date"   },
  { label: "Party size", key: "party_size",  type: "number" },
  { label: "# Passes",  key: "num_passes",  type: "number" },
  { label: "Car plate",  key: "car_plate",   type: "text"   },
  { label: "First name", key: "first_name",  type: "text"   },
  { label: "Last name",  key: "last_name",   type: "text"   },
] as const;

type FormKey = (typeof FIELDS)[number]["key"];

export function BookingForm({ hike, onStarted }: Props) {
  const [form, setForm] = useState<Record<FormKey, string>>({
    hike_date: "", party_size: "1", num_passes: "1",
    car_plate: "", first_name: "", last_name: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k: FormKey) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const booking = await api.post<Booking>("/bookings/start", {
        hike_id:    hike.id,
        hike_date:  form.hike_date,
        party_size: Number(form.party_size),
        num_passes: Number(form.num_passes),
        car_plate:  form.car_plate,
        first_name: form.first_name,
        last_name:  form.last_name,
      });
      onStarted(booking);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to start");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {FIELDS.map(({ label, key, type }) => (
        <div key={key}>
          <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
          <input
            type={type}
            value={form[key]}
            onChange={set(key)}
            required
            className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      ))}
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 disabled:opacity-50 text-sm font-medium"
      >
        {loading ? "Starting…" : "Start Polling"}
      </button>
    </form>
  );
}
