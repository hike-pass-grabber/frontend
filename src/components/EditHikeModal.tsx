"use client";
import { useState } from "react";
import { Modal } from "./Modal";
import { api } from "@/lib/api";
import type { Hike } from "@/types";

interface Props {
  hike: Hike;
  onClose: () => void;
  onUpdated: () => void;
}

export function EditHikeModal({ hike, onClose, onUpdated }: Props) {
  const [name, setName] = useState(hike.name);
  const [url, setUrl] = useState(hike.availability_url);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.patch(`/hikes/${hike.id}`, { name, availability_url: url });
      onUpdated();
      onClose();
    } catch {
      setError("Failed to update hike.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal title="Edit Hike" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Availability URL</label>
          <input
            value={url}
            onChange={e => setUrl(e.target.value)}
            className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 disabled:opacity-50 text-sm font-medium"
        >
          {loading ? "Saving…" : "Save Changes"}
        </button>
      </form>
    </Modal>
  );
}
