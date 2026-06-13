// components/ProtectedRoute.tsx
"use client";

import useAuthStore from "@/data/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  loadingComponent?: React.ReactNode;
}

export const ProtectedRoute = ({
  children,
  redirectTo = "/login",
  loadingComponent,
}: ProtectedRouteProps) => {
  const { user, isLoading, checkAuth } = useAuthStore();
  const router = useRouter();
  const hasRedirected = useRef(false); // Prevent multiple redirects

  useEffect(() => {
    const verifyAuth = async () => {
      // Wait for initial auth check to complete
      if (isLoading) return;

      // If no user and haven't redirected yet
      if (!user && !hasRedirected.current) {
        hasRedirected.current = true;

        // Try to re-check auth one more time (in case cookie exists but store not updated)
        const isAuthenticated = await checkAuth();

        if (!isAuthenticated) {
          router.push(redirectTo);
        } else {
          hasRedirected.current = false; // Reset if authenticated
        }
      }
    };

    verifyAuth();
  }, [user, isLoading, router, redirectTo]);

  // Show loading while checking auth
  if (isLoading) {
    return (
      loadingComponent || (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Checking authentication...</p>
          </div>
        </div>
      )
    );
  }

  // User is authenticated, show protected content
  if (user) {
    return <>{children}</>;
  }

  // No user, but still checking? Show loading
  return (
    loadingComponent || (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  );
};
