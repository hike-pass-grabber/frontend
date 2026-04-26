"use client";
import { useState } from "react";
import { Modal } from "./Modal";
import { api } from "@/lib/api";

interface Props {
  onClose: () => void;
  onAdded: () => void;
}

export function AddHikeModal({ onClose, onAdded }: Props) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.post("/hikes/", { name, availability_url: url });
      onAdded();
      onClose();
    } catch {
      setError("Failed to add hike.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal title="Add Hike" onClose={onClose}>
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
            placeholder="https://..."
            className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 disabled:opacity-50 text-sm font-medium"
        >
          {loading ? "Adding…" : "Add Hike"}
        </button>
      </form>
    </Modal>
  );
}
