"use client";
import api from "@/api-contollers/api";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
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
    user && (
      <div>
        <p>{user.name}</p>
        <p>{user.email}</p>
      </div>
    )
  );
}
