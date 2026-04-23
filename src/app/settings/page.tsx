"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { NavBar } from "@/components/NavBar";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/lib/api";
import type { AlertPreference } from "@/types";

type BoolKey = "email_enabled" | "sms_enabled" | "sound_enabled" | "popup_enabled";

const TOGGLES: { label: string; key: BoolKey; note?: string }[] = [
  { label: "Email alerts",   key: "email_enabled" },
  { label: "SMS alerts",     key: "sms_enabled" },
  { label: "Sound alerts",   key: "sound_enabled",  note: "local program only" },
  { label: "Popup alerts",   key: "popup_enabled",  note: "local program only" },
];

export default function SettingsPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [prefs, setPrefs] = useState<AlertPreference | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!user) return;
    api.get<AlertPreference>("/preferences").then(setPrefs).catch(() => {});
  }, [user]);

  if (loading) return null;
  if (!user) { router.push("/login"); return null; }

  async function toggle(key: BoolKey) {
    if (!prefs) return;
    const next = !prefs[key];
    setPrefs({ ...prefs, [key]: next });
    await api.patch("/preferences", { [key]: next });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <>
      <NavBar role={user.role} />
      <div className="max-w-lg mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>

        <div className="bg-white rounded-xl shadow p-6 space-y-4 mb-6">
          <h2 className="font-semibold text-gray-700">Alert preferences</h2>
          {prefs && TOGGLES.map(({ label, key, note }) => (
            <label key={key} className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-gray-700">
                {label}
                {note && <span className="ml-1 text-xs text-gray-400">({note})</span>}
              </span>
              <input
                type="checkbox"
                checked={prefs[key]}
                onChange={() => toggle(key)}
                className="w-4 h-4 accent-green-600"
              />
            </label>
          ))}
          {saved && <p className="text-green-600 text-sm">Saved</p>}
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold text-gray-700 mb-2">Local program</h2>
          <p className="text-sm text-gray-500 mb-4">
            Download the local program to get sound alerts, popup notifications, and browser auto-fill
            when a pass opens. Run it alongside the web app.
          </p>
          <a
            href="https://github.com/YOUR_USERNAME/hike-pass-grabber/releases/latest"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-700 text-white px-4 py-2 rounded text-sm hover:bg-green-800"
          >
            Download for Windows / Mac
          </a>
        </div>
      </div>
    </>
  );
}
