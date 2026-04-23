"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { clearToken } from "@/lib/auth";

export function NavBar({ role }: { role?: string }) {
  const router = useRouter();

  function handleLogout() {
    clearToken();
    router.push("/login");
  }

  return (
    <nav className="bg-green-800 text-white px-6 py-3 flex items-center gap-6">
      <Link href="/" className="font-bold text-lg">Hike Pass Grabber</Link>
      <Link href="/dashboard" className="text-sm hover:underline">Dashboard</Link>
      <Link href="/settings" className="text-sm hover:underline">Settings</Link>
      {role === "admin" && (
        <Link href="/admin" className="text-sm hover:underline">Admin</Link>
      )}
      <button onClick={handleLogout} className="ml-auto text-sm hover:underline">
        Log out
      </button>
    </nav>
  );
}
