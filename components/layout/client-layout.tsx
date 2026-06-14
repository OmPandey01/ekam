"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Topbar from "@/components/topbar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider
      style={
        {
          // 1. Change the actual width of the sidebar panel
          "--sidebar-width": "18rem",

          // 2. Change the width when collapsed into an icon bar (Optional)
          "--sidebar-width-icon": "4.5rem",

          // 3. Adjust the gap spacing around the floating panel (Optional)
          "--sidebar-padding": "1rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <div className="flex flex-col flex-1 h-screen overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </SidebarProvider>
  );
}
