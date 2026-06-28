"use client";
import api from "@/api-controllers/api";
import { useEffect, useState } from "react";
import { ProtectedRoute } from "@/components/ProtectedRoutes";

export default function ProfilePage() {
  const [user, setUser] = useState<null | { name: string; email: string }>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("auth/me", {
          withCredentials: true,
        });
        console.log("Got the response ", response);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Extract first letter for the logo/avatar
  const firstLetter = user?.name ? user.name.charAt(0).toUpperCase() : "?";

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
        {loading ? (
          <p className="text-sm text-slate-400 animate-pulse">Loading...</p>
        ) : user ? (
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-sm border border-slate-100 transition-all">
            <div className="flex flex-col items-center text-center space-y-4">
              {/* Soft Colored Avatar Logo */}
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-xl font-semibold text-indigo-600 select-none">
                {firstLetter}
              </div>

              {/* User Details */}
              <div className="space-y-1">
                <h2 className="text-lg font-medium text-slate-800">
                  {user.name}
                </h2>
                <p className="text-sm text-slate-500">{user.email}</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-rose-400">
            Failed to load profile details.
          </p>
        )}
      </div>
    </ProtectedRoute>
  );
}
