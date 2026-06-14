// components/PublicRoute.tsx
"use client";

import useAuthStore from "@/data/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface PublicRouteProps {
  children: React.ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { isAuthenticated, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated()) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated()) {
    return null;
  }

  return <>{children}</>;
};
