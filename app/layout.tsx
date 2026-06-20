// app/layout.tsx - Server Component
import type { Metadata } from "next";
import { Geist, Geist_Mono, Playwrite_GB_J, Coiny } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/layout/client-layout";

import useAuthStore from "@/data/authStore";

// ... font definitions ...

export const metadata: Metadata = {
  title: "Ekam",
  description: "Motion-First Reading",
  icons: {
    icon: "/ekam-logo.png", // Path to your logo in the public folder
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //check auth by sending req at /auth/me

  return (
    <html lang="en" className={`... fonts ...`}>
      <body className="min-h-full flex flex-col">
        {children} {/* ← ONLY this */}
      </body>
    </html>
  );
}
