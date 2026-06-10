import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import Image from "next/image";

// Importing icons from react-icons (using Feather icons here as an example)
import { FiHome, FiCompass, FiBook, FiUser, FiSettings } from "react-icons/fi";

// Define your navigation items in an array for clean rendering
const navItems = [
  { title: "Home", url: "/", icon: FiHome },
  { title: "Explore", url: "/explore", icon: FiCompass },
  { title: "Library", url: "/library", icon: FiBook },
  { title: "Profile", url: "/profile", icon: FiUser },
  { title: "Settings", url: "/settings", icon: FiSettings },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="bg-white">
      {/* HEADER: Usually for your App Logo */}
      <SidebarHeader className="p-4">
        <div className="flex h-20 items-center gap-3 font-bold text-lg">
          <Image
            src="/ekam-logo.png"
            alt="Ekam"
            width={50}
            height={50}
            className="h-10 w-10 rounded"
          />
          <span className=" font-bold text-2xl truncate data-[collapsed=true]:hidden">
            EKAM
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          {/* Optional Label (hides when collapsed) */}
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* FOOTER: Usually for Logout or User Mini-profile */}
      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/settings" className="flex items-center gap-2">
                <FiSettings className="h-4 w-4 shrink-0" />
                <span>Preferences</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
