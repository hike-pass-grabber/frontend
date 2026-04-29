"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export function LoadingScreen() {
  const [showNote, setShowNote] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowNote(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <div className="w-[240px] h-[240px] rounded-full border-2 border-black overflow-hidden flex-shrink-0">
        <Image
          src="/loading.gif"
          alt="Loading..."
          width={240}
          height={240}
          className="w-full h-full object-cover"
          unoptimized
        />
      </div>
      {showNote && (
        <p className="text-sm text-gray-400 text-center max-w-xs">
          This may take 1–2 minutes to boot after 15 minutes of inactivity.
        </p>
      )}
    </div>
  );
}
