"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NavBar } from "@/components/NavBar";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/lib/api";
import type { AlertPreference } from "@/types";

type BoolKey = "email_enabled" | "sms_enabled" | "sound_enabled" | "popup_enabled";

const TOGGLES: { label: string; key: BoolKey; note?: string }[] = [
  { label: "Email alerts",   key: "email_enabled" },
  { label: "SMS alerts",     key: "sms_enabled" },
  { label: "Sound alerts",   key: "sound_enabled", note: "local program only" },
  { label: "Popup alerts",   key: "popup_enabled", note: "local program only" },
];

export default function SettingsPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [prefs, setPrefs] = useState<AlertPreference | null>(null);
  const [draft, setDraft] = useState<AlertPreference | null>(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (!user) return;
    api.get<AlertPreference>("/preferences").then(p => {
      setPrefs(p);
      setDraft(p);
    }).catch(() => {});
  }, [user]);

  if (loading || !user) return <div className="flex justify-center items-center h-screen"><div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin" /></div>;

  function handleToggle(key: BoolKey) {
    if (!draft) return;
    setDraft({ ...draft, [key]: !draft[key] });
  }

  async function handleSave() {
    if (!draft) return;
    setSaving(true);
    try {
      await api.patch("/preferences", {
        email_enabled: draft.email_enabled,
        sms_enabled:   draft.sms_enabled,
        sound_enabled: draft.sound_enabled,
        popup_enabled: draft.popup_enabled,
      });
      setPrefs(draft);
      setEditing(false);
    } catch {
      // revert draft on failure
      setDraft(prefs);
    } finally {
      setSaving(false);
    }
  }

  function handleEdit() {
    setDraft(prefs);
    setEditing(true);
  }

  return (
    <>
      <NavBar role={user.role} />
      <div className="max-w-lg mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>

        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-700">Alert preferences</h2>
            <button
              onClick={editing ? handleSave : handleEdit}
              disabled={saving}
              className={`px-4 py-1.5 rounded text-sm font-medium transition-colors disabled:opacity-50 ${
                editing
                  ? "bg-green-700 text-white hover:bg-green-800"
                  : "border border-gray-300 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {saving ? "Saving…" : editing ? "Save" : "Edit"}
            </button>
          </div>

          <div className="space-y-4">
            {draft && TOGGLES.map(({ label, key, note }) => (
              <label
                key={key}
                className={`flex items-center justify-between ${editing ? "cursor-pointer" : "cursor-default"}`}
              >
                <span className={`text-sm ${editing ? "text-gray-700" : "text-gray-400"}`}>
                  {label}
                  {note && <span className="ml-1 text-xs text-gray-400">({note})</span>}
                </span>
                <input
                  type="checkbox"
                  checked={draft[key]}
                  onChange={() => handleToggle(key)}
                  disabled={!editing}
                  className="w-4 h-4 accent-green-600 disabled:opacity-40"
                />
              </label>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold text-gray-700 mb-2">Local program</h2>
          <p className="text-sm text-gray-500 mb-4">
            Download the local program to get sound alerts, popup notifications, and browser auto-fill
            when a pass opens. Run it alongside the web app.
          </p>
          <Link href="/download" className="inline-block bg-green-700 text-white px-4 py-2 rounded text-sm hover:bg-green-800">
            Download for Windows / Mac
          </Link>
        </div>
      </div>
    </>
  );
}
