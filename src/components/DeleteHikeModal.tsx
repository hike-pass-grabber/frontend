"use client";
import { useState } from "react";
import { Modal } from "./Modal";
import { api } from "@/lib/api";
import type { Hike } from "@/types";

interface Props {
  hike: Hike;
  onClose: () => void;
  onDeleted: () => void;
}

export function DeleteHikeModal({ hike, onClose, onDeleted }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    setLoading(true);
    setError("");
    try {
      await api.delete(`/hikes/${hike.id}`);
      onDeleted();
      onClose();
    } catch {
      setError("Failed to delete hike.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal title="Delete Hike" onClose={onClose}>
      <p className="text-gray-600 text-sm mb-6">
        Are you sure you want to delete <span className="font-semibold">{hike.name}</span>? This cannot be undone.
      </p>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <div className="flex gap-3 justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm rounded border border-gray-300 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="px-4 py-2 text-sm rounded bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
        >
          {loading ? "Deleting…" : "Delete"}
        </button>
      </div>
    </Modal>
  );
}
