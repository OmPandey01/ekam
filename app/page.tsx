"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { FaPlus } from "react-icons/fa";

export default function Home() {
  const router = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-yellow-50 rounded-3xl h-screen w-full flex justify-center items-center p-10"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.8 } }}
        whileHover={{ scale: 1.1 }}
        exit={{ opacity: 0, scale: 0 }}
        onClick={() => {
          router.push("/article");
        }}
        className="bg-blue-400 rounded-3xl h-30 w-70 flex justify-center items-center p-10"
      >
        <p>Articles on strongness</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.8 } }}
        whileHover={{
          scale: 1.1,
          borderRadius: 100,
          border: "5px solid lightblue",
          boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)",
        }}
        exit={{ opacity: 0, scale: 0 }}
        onClick={() => {
          router.push("/editor");
        }}
        className="bg-gray-500 rounded-full h-20 m-10 w-40 flex justify-center items-center p-10"
      >
        <FaPlus className="mr-2" />
        <p>Create</p>
      </motion.div>
    </motion.div>
  );
}
