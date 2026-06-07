"use client";
import { useState, useEffect } from "react";

import { HTMLProjectionNode, motion, transform } from "motion/react";

import logo from "./logo.png";

import Image from "next/image";
import { TiTime } from "react-icons/ti";

interface TimerControlProps {
  size?: number;
  onClick?: () => void;
}

export default function TimerControl(props: TimerControlProps) {
  console.log(props.size);
  const [showControls, setShowControls] = useState(false);

  const handleHover = () => {
    setTimeout(() => setShowControls(true), 200);
  };
  const handleHoverEnd = () => {
    setTimeout(() => setShowControls(false), 10);
  };
  return (
    <motion.div
      style={{ transformOrigin: "right center" }}
      className=" right-20 absolute origin-right bg-amber-300 w-[150px] h-[70px] rounded-full flex flex-row justify-center items-end p-3 m-3"
      initial={{ scale: 1, width: 30, background: "transparent" }}
      whileHover={{
        background: "yellow",
        scale: 1,
        width: 300,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 10,
          duration: 1,
          delayChildren: 0.4,
          staggerChildren: 0.3,
        },
      }}
      onHoverEnd={() => ({ width: 0 })}
    >
      {showControls && <p>Controlls coming soon</p>}
      <motion.div
        onHoverStart={handleHover}
        onHoverEnd={handleHoverEnd}
        onClick={props.onClick}
        className="bg-cyan-300 rounded-2xl p-2 m-2 absolute right-0 m-3"
        initial={{ scale: 2 }}
        whileHover={{
          rotate: 90,
          scale: 2.5,
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 10,
            duration: 1,
          },
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 10,
        }}
      >
        <TiTime />
      </motion.div>
    </motion.div>
  );
}
