"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";

const FIELDS = [
  { placeholder: "Full name",         key: "name",     type: "text"     },
  { placeholder: "Email",             key: "email",    type: "email"    },
  { placeholder: "Password",          key: "password", type: "password" },
  { placeholder: "Phone (optional)",  key: "phone",    type: "tel"      },
] as const;

type FormKey = (typeof FIELDS)[number]["key"];

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState<Record<FormKey, string>>({ name: "", email: "", password: "", phone: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (k: FormKey) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.post("/auth/register", {
        email: form.email,
        password: form.password,
        name: form.name,
        phone: form.phone || null,
      });
      router.push("/login");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-xl shadow p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Create account</h1>
        <p className="text-sm text-gray-500 mb-6">Your account will be pending until an admin approves it.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {FIELDS.map(({ placeholder, key, type }) => (
            <input
              key={key} type={type} placeholder={placeholder} value={form[key]}
              onChange={set(key)} required={key !== "phone"}
              className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          ))}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit" disabled={loading}
            className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 disabled:opacity-50 text-sm font-medium"
          >
            {loading ? "Creating account…" : "Create account"}
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-500 text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-green-700 hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
