"use client";
import useSidebarStore from "@/data/sideBarStore";
import { TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";
import { TbLayoutSidebarRightExpandFilled } from "react-icons/tb";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FiSearch, FiX, FiEdit3, FiLogOut, FiBookmark } from "react-icons/fi";
import { useState } from "react";
import { motion } from "framer-motion";
import useAuthStore from "@/data/authStore";
import { useRouter } from "next/navigation";

function ProfileOptions(props: any) {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  let isVisible = props.isVisible;

  const ProfileOptionsItems = [
    {
      label: "Edit Profile",
      icon: <FiEdit3 />,
      action: () => router.push("/profile"),
    },
    {
      label: "Bookmarks",
      icon: <FiBookmark />,
      action: () => router.push("/library"),
    },
    {
      label: "log out",
      icon: <FiLogOut />,
      action: () => {
        logout();
        window.location.reload();
      },
    },
    {
      label: "Close Popup",
      icon: <FiX />,
      action: () => {
        props.setShowProfileOptions(false);
      },
    },
  ];
  return (
    <motion.div
      initial={{ y: 10, x: -50 }}
      animate={{ opacity: isVisible ? 1 : 0, y: 0, x: 0 }}
      transition={{ duration: 0.5 }}
      className={` flex items-center w-50 flex-col absolute top-13 right-10 rounded-2xl bg-lime-200 shadow-2xl ${isVisible ? "visible" : "hidden"} h-auto   flex  justify-center items-center`}
    >
      <div className="flex flex-row w-full  pr-10 items-center ">
        <div className="  my-5 bg-blue-300 m-3 h-10 w-10 rounded-full"></div>
        <p>Hi, Om</p>
      </div>
      {ProfileOptionsItems.map((option, index) => (
        <div
          key={index}
          onClick={option.action}
          className="hover:bg-blue-200 w-full h-10 p-2 first:rounded-t-2xl last:rounded-b-2xl  flex justify-start  items-center gap-2"
        >
          {option.icon}
          <span>{option.label}</span>
        </div>
      ))}
    </motion.div>
  );
}

export default function Topbar() {
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const toggle = useSidebarStore((state) => state.toggle);
  const isOpen = useSidebarStore((state) => state.isOpen);

  return (
    <header className="sticky top-0 z-50 flex h-[60px] p-1 w-full items-center justify-between border-b bg-white px-4 shadow-sm md:px-6">
      {/* LEFT SIDE: Sidebar Toggle & Search */}

      <div>
        <Button
          variant="ghost"
          onClick={toggle}
          className="text-gray-600 md:hidden hover:text-gray-900 h-10 w-10 bg-gray-200"
        >
          {isOpen ? (
            <TbLayoutSidebarRightExpandFilled size={30} scale={30} />
          ) : (
            <TbLayoutSidebarLeftExpandFilled size={30} className="h-10 w-5" />
          )}
        </Button>
      </div>
      <div className="flex items-center gap-4">
        {/* This trigger automatically talks to your SidebarProvider */}
        {/*<SidebarTrigger className="text-gray-600 hover:text-gray-900" />*/}

        {/* Search Bar - hidden on very small screens, visible on medium+ */}
        <div className="relative  flex items-center">
          <FiSearch className="absolute left-3 h-4 w-4 text-gray-400" />
          <motion.input
            type="search"
            placeholder="Search..."
            // whileHover={{ scale: 1.2 }}
            whileFocus={{ scale: 1.2, position: "relative", top: "5" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="  rounded-full  h-10 border-none bg-gray-100 pl-9 text-sm focus-visible:ring-1 focus-visible:ring-gray-300 w-[60vw]"
          />
        </div>
      </div>

      {/* RIGHT SIDE: Write & Profile */}
      <div className="flex items-center gap-4 md:gap-6">
        {/* Mobile Search Icon (Shows only when the big search bar is hidden) */}

        {/* Write Button (Medium style) */}
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-gray-600 hover:bg-transparent hover:text-gray-900"
        >
          <FiEdit3 className="h-5 w-5" />
          <span className="hidden text-base md:inline-block">Write</span>
        </Button>

        {/* User Profile Avatar */}
        <Avatar
          onMouseDown={() =>
            setShowProfileOptions(showProfileOptions ? false : true)
          }
          className="h-8 w-8 cursor-pointer ring-2 ring-transparent transition-all hover:ring-gray-200"
        >
          <AvatarImage src="https://github.com/shadcn.png" alt="@user" />
          <AvatarFallback className="bg-gray-800 text-white text-xs">
            US
          </AvatarFallback>
        </Avatar>
        <ProfileOptions
          setShowProfileOptions={setShowProfileOptions}
          isVisible={showProfileOptions}
        />
      </div>
    </header>
  );
}
