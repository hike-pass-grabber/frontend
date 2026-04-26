"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { clearToken } from "@/lib/auth";

const links = [
  { href: "/",          label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/settings",  label: "Settings" },
];

export function NavBar({ role }: { role?: string }) {
  const router = useRouter();
  const pathname = usePathname();

  function handleLogout() {
    clearToken();
    router.push("/login");
  }

  function navClass(href: string) {
    const active = pathname === href;
    return `text-sm pb-0.5 ${active ? "text-white font-semibold border-b-2 border-white" : "opacity-75 hover:opacity-100"}`;
  }

  return (
    <nav className="text-white px-6 py-3 flex items-center gap-6" style={{ backgroundColor: "#404E3B", color: "#E8F0E3" }}>
      <Link href="/" className="font-bold text-lg mr-2 text-white">Hike Pass Grabber</Link>
      {links.map(({ href, label }) => (
        <Link key={href} href={href} className={navClass(href)}>{label}</Link>
      ))}
      {role === "admin" && (
        <Link href="/admin" className={navClass("/admin")}>Admin</Link>
      )}
      <button onClick={handleLogout} className="ml-auto text-sm opacity-75 hover:opacity-100">
        Log out
      </button>
    </nav>
  );
}
