import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FiSearch, FiEdit3 } from "react-icons/fi";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-50 flex h-auto p-1 w-full items-center justify-between border-b bg-white px-4 shadow-sm md:px-6">
      {/* LEFT SIDE: Sidebar Toggle & Search */}
      <div className="flex items-center gap-4">
        {/* This trigger automatically talks to your SidebarProvider */}
        <SidebarTrigger className="text-gray-600 hover:text-gray-900" />

        {/* Search Bar - hidden on very small screens, visible on medium+ */}
        <div className="relative hidden sm:flex items-center">
          <FiSearch className="absolute left-3 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-[240px] rounded-full border-none bg-gray-100 pl-9 text-sm focus-visible:ring-1 focus-visible:ring-gray-300 md:w-[300px]"
          />
        </div>
      </div>

      {/* RIGHT SIDE: Write & Profile */}
      <div className="flex items-center gap-4 md:gap-6">
        {/* Mobile Search Icon (Shows only when the big search bar is hidden) */}
        <Button variant="ghost" size="icon" className="sm:hidden text-gray-500">
          <FiSearch className="h-5 w-5" />
        </Button>

        {/* Write Button (Medium style) */}
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-gray-600 hover:bg-transparent hover:text-gray-900"
        >
          <FiEdit3 className="h-5 w-5" />
          <span className="hidden text-base md:inline-block">Write</span>
        </Button>

        {/* User Profile Avatar */}
        <Avatar className="h-8 w-8 cursor-pointer ring-2 ring-transparent transition-all hover:ring-gray-200">
          <AvatarImage src="https://github.com/shadcn.png" alt="@user" />
          <AvatarFallback className="bg-gray-800 text-white text-xs">
            US
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
