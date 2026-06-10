"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { FaPlus } from "react-icons/fa";
import ArticleCard from "@/components/article-card";
import { doc1 } from "@/data/data";

export default function Home() {
  const router = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-yellow-50 rounded-3xl h-screen w-full flex justify-between items-center p-0"
    >
      <motion.div
        initial={{ opacity: 1, y: -20 }}
        animate={{ y: 0, transition: { duration: 0.3 } }}
        whileHover={{ scale: 1.05 }}
        exit={{ opacity: 0, y: -100 }}
        onClick={() => {
          router.push("/article");
        }}
        className="rounded-3xl h-40 flex justify-between items-center p-5"
      >
        <ArticleCard document={doc1} />
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
