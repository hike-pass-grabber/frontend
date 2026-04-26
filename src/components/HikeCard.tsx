import { Trash2, Pencil } from "lucide-react";
import type { Hike } from "@/types";

interface Props {
  hike: Hike;
  isAdmin?: boolean;
  onClick: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function HikeCard({ hike, isAdmin, onClick, onEdit, onDelete }: Props) {
  return (
    <div className="flex items-center border border-gray-200 rounded-lg bg-white hover:border-green-400 transition-colors">
      <button
        onClick={onClick}
        className="flex-1 text-left px-4 py-3"
      >
        <p className="font-medium">{hike.name}</p>
      </button>
      {isAdmin && (
        <div className="flex items-center gap-1 pr-3">
          <button
            onClick={onEdit}
            className="p-1.5 text-gray-400 hover:text-blue-500 transition-colors"
            title="Edit hike"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
            title="Delete hike"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
