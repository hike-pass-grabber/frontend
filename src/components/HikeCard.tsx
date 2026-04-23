import type { Hike } from "@/types";

interface Props {
  hike: Hike;
  selected: boolean;
  onClick: () => void;
}

export function HikeCard({ hike, selected, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 border rounded-lg transition-colors ${
        selected
          ? "border-green-600 bg-green-50 text-green-900"
          : "border-gray-200 hover:border-green-400 bg-white"
      }`}
    >
      <p className="font-medium">{hike.name}</p>
    </button>
  );
}
