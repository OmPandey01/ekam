"use client";
import { useState, useEffect } from "react";

import { motion } from "motion/react";

import logo from "./logo.png";

import Image from "next/image";

interface SourceProps {
  size?: number;
}

export default function Source(props: SourceProps) {
  console.log(props.size);
  return (
    <motion.div
      className={`bg-orange-600 size-40 rounded-3xl flex flex-col  justify-center items-center`}
      initial={{ scale: 2 }}
      whileHover={{
        rotate: 360,
        scale: 3,
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
      <Image
        src={logo}
        alt="h"
        width={100}
        height={100}
        className="rounded-full"
      ></Image>
    </motion.div>
  );
}
