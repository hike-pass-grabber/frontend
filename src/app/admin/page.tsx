"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { NavBar } from "@/components/NavBar";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/lib/api";
import type { User } from "@/types";

export default function AdminPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [users, setUsers] = useState<User[]>([]);

  async function loadUsers() {
    api.get<User[]>("/users/").then(setUsers).catch(() => {});
  }

  useEffect(() => {
    if (user?.role === "admin") loadUsers();
  }, [user]);

  if (loading) return null;
  if (!user || user.role !== "admin") { router.push("/"); return null; }

  async function setRole(userId: string, role: string) {
    await api.patch(`/users/${userId}/role?role=${role}`);
    loadUsers();
  }

  const pending = users.filter(u => u.role === "unauthorized");
  const rest    = users.filter(u => u.role !== "unauthorized");

  return (
    <>
      <NavBar role={user.role} />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin</h1>

        <h2 className="font-semibold text-gray-700 mb-3">
          Pending approval <span className="text-gray-400 font-normal">({pending.length})</span>
        </h2>
        {pending.length === 0 ? (
          <p className="text-gray-400 text-sm mb-8">No pending users.</p>
        ) : (
          <div className="space-y-2 mb-8">
            {pending.map(u => (
              <div key={u.id} className="flex items-center justify-between bg-white rounded-lg shadow px-4 py-3">
                <div>
                  <p className="font-medium text-sm">{u.name}</p>
                  <p className="text-xs text-gray-400">{u.email}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setRole(u.id, "hiker")}
                    className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => setRole(u.id, "unauthorized")}
                    className="bg-gray-100 text-gray-600 px-3 py-1 rounded text-xs hover:bg-gray-200"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <h2 className="font-semibold text-gray-700 mb-3">All users</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-gray-500">
              <th className="pb-2 font-medium">Name</th>
              <th className="pb-2 font-medium">Email</th>
              <th className="pb-2 font-medium">Role</th>
              <th className="pb-2 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {rest.map(u => (
              <tr key={u.id} className="border-b last:border-0">
                <td className="py-2">{u.name}</td>
                <td className="py-2 text-gray-400 text-xs">{u.email}</td>
                <td className="py-2 capitalize">{u.role}</td>
                <td className="py-2 flex gap-3">
                  {u.role === "hiker" && (
                    <button onClick={() => setRole(u.id, "unauthorized")} className="text-red-500 hover:underline text-xs">
                      Revoke
                    </button>
                  )}
                  {u.role !== "admin" && u.id !== user.id && (
                    <button onClick={() => setRole(u.id, "admin")} className="text-blue-500 hover:underline text-xs">
                      Make admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
