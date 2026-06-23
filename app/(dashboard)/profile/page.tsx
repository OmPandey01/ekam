"use client";
import api from "@/api-controllers/api";
import { useEffect, useState } from "react";
import { ProtectedRoute } from "@/components/ProtectedRoutes";

export default function ProfilePage() {
  const [user, setUser] = useState<null | { name: string; email: string }>(
    null,
  );
  useEffect(() => {
    const fetchUser = async () => {
      const response = await api.get("auth/me", {
        withCredentials: true,
      });
      console.log(response);
      const user = response.data;
      setUser(user);
    };
    fetchUser();
  }, []);
  return (
    <ProtectedRoute>
      user && (
      <div>
        <p>{user!.name}</p>
        <p>{user!.email}</p>
      </div>
      )
    </ProtectedRoute>
  );
}
