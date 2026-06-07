"use client";

import { motion } from "motion/react";

import { TiArrowRightThick } from "react-icons/ti";

interface NextButtonProps {
  onClick?: () => void;
}

export default function NextButton(props: NextButtonProps) {
  return (
    <motion.div
      onClick={props.onClick}
      className="bg-cyan-300 rounded-2xl p-2 m-2"
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
      <TiArrowRightThick />
    </motion.div>
  );
}
