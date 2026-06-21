"use client";
import useSidebarStore from "@/data/sideBarStore";
import { TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";
import { TbLayoutSidebarRightExpandFilled } from "react-icons/tb";
import { IntervalText } from "@/components/Interval-text";

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
      className={` flex items-center w-50 flex-col absolute top-13 right-10 rounded-2xl bg-slate-100 shadow-2xl ${isVisible ? "visible" : "hidden"} h-auto   flex  justify-center items-center`}
    >
      <div className="flex flex-row w-full  pr-10 items-center ">
        <div className="bg-gray-300 rounded-full p-2 m-3 select-none">
          <p className="font-coiny font-bold ">{props.userName}</p>
        </div>
        <p>Hi, {props.userName}</p>
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
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const toggle = useSidebarStore((state) => state.toggle);
  const isOpen = useSidebarStore((state) => state.isOpen);
  const userName = user?.name.split(" ")[0];

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
        <motion.div
          className="relative  flex items-center"
          initial={{ scale: 1 }}
          whileFocus={{
            scale: 1.6,
            width: "400",
            position: "relative",
            top: "5",
          }}
        >
          <FiSearch className="absolute left-3 h-4 w-4 text-gray-400" />
          <motion.input
            type="search"
            placeholder="Search..."
            // whileHover={{ scale: 1.2 }}
            // whileFocus={{ scale: 1.05, position: "relative", top: "5" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="  rounded-full  h-10 border-none bg-gray-100 pl-9 text-sm focus-visible:ring-1 focus-visible:ring-gray-300 w-[60vw]"
          />
        </motion.div>
      </div>

      {/* RIGHT SIDE: Write & Profile */}
      <div className="flex items-center gap-4 md:gap-6">
        {/* Mobile Search Icon (Shows only when the big search bar is hidden) */}

        {/* Write Button (Medium style) */}

        <Button
          variant="ghost"
          onClick={() => router.push("/editor")}
          className="flex items-center gap-2 text-gray-600 hover:bg-transparent hover:text-gray-900"
        >
          <FiEdit3 className="h-5 w-5" />
          <span className="hidden text-base md:inline-block">Write</span>
        </Button>
        <div
          onClick={() => setShowProfileOptions(!showProfileOptions)}
          className="bg-gray-300 rounded-full p-2"
        >
          <p className="font-coiny font-bold pointer-events-none select-none ">
            {userName}
          </p>
        </div>

        {/* User Profile Avatar */}

        <ProfileOptions
          userName={userName}
          setShowProfileOptions={setShowProfileOptions}
          isVisible={showProfileOptions}
        />
      </div>
    </header>
  );
}
