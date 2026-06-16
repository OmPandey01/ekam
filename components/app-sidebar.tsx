"use client";
import useSidebarStore from "@/data/sideBarStore";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiHome, FiCompass, FiBook, FiUser } from "react-icons/fi";
import { useRouter } from "next/navigation";

const navItems = [
  { title: "Home", url: "/", icon: FiHome },
  { title: "Explore", url: "/explore", icon: FiCompass },
  { title: "Library", url: "/library", icon: FiBook },
  { title: "Profile", url: "/profile", icon: FiUser },
];

export function AppSidebar() {
  const isOpen = useSidebarStore((state) => state.isOpen);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const router = useRouter();

  // Detect mobile screen size (no auto-toggling of store)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Visibility: on mobile always visible, on desktop controlled by toggle button (isOpen)
  const shouldShow = isMobile ? isOpen : true;

  // Expansion: on mobile always expanded (200px), on desktop expand on hover
  const shouldExpand = isMobile ? true : isExpanded;
  const sidebarWidth = shouldExpand ? 200 : 50;

  // Disable hover animations on mobile for performance
  const hoverWidthAnim = isMobile ? {} : { width: 400 };
  const hoverBgAnim = isMobile ? {} : { backgroundColor: "#0ea5e9" };

  return (
    <motion.div
      initial={{ width: sidebarWidth }}
      animate={{ width: sidebarWidth }}
      whileHover={hoverWidthAnim}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.3,
      }}
      style={{ display: shouldShow ? "block" : "none" }}
      onHoverStart={() => !isMobile && setIsExpanded(true)}
      onHoverEnd={() => !isMobile && setIsExpanded(false)}
      className={` bg-white shadow-2xl   ${isMobile ? "w-screen" : "w-[50px]"}  ${isMobile ? "absolute left-2 top-2 h-screen" : ""}  block   `}
    >
      <div className="relative flex flex-col rounded-2xl justify-between items-baseline w-full h-full">
        {navItems.map((item) => (
          <motion.button
            onClick={() => router.push(item.url)}
            key={item.title}
            whileHover={hoverBgAnim}
            className=" p-4 w-full transform-gpu backdrop-blur-md flex h-full items-center justify-center first:rounded-t-xl last:rounded-b-xl"
          >
            <div className="flex h-20 min-w-20 w-full justify-center items-center">
              <item.icon size={25} />
              <span className={`px-5 ${shouldExpand ? "block" : "hidden"}`}>
                {item.title}
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
