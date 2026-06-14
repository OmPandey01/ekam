// app/layout.tsx - Server Component
import type { Metadata } from "next";
import { Geist, Geist_Mono, Playwrite_GB_J, Coiny } from "next/font/google";
import "../globals.css";
import ClientLayout from "@/components/layout/client-layout";

// ... font definitions ...

// app/(dashboard)/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // No <html> or <body> here!
    <ClientLayout>{children}</ClientLayout>
  );
}
