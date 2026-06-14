"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { FaPlus } from "react-icons/fa";
import ArticleCard from "@/components/article-card";
import { collection } from "@/data/data";
import { ProtectedRoute } from "@/components/ProtectedRoutes";

export default function Home() {
  const router = useRouter();
  return (
    <ProtectedRoute>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className=" ml-5   h-screen w-screen flex justify-between items-center "
      >
        <div className="  h-screen w-auto  p-2">
          {collection.map((doc, index) => (
            <ArticleCard key={index} document={doc} />
          ))}
        </div>
        <div className=" bg-amber-100 h-screen hidden md:block  w-[30vw] p-10">
          <h1 className="text-4xl font-bold">Recent Articles</h1>
        </div>
        <motion.button
          initial={{ opacity: 0, scale: 0, borderRadius: 50 }}
          animate={{ opacity: 1, scale: 1, transition: { duration: 0.8 } }}
          whileHover={{
            scale: 1.1,
            borderRadius: 50,
            border: "2px solid lightblue",
            boxShadow: "5px 5px 10px rgba(0, 0, 0.4, 0.3)",
          }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={() => {
            router.push("/editor");
          }}
          className="bg-gray-100  h-20 m-10 w-50 flex justify-center items-center p-10 absolute bottom-10 right-5"
        >
          <FaPlus className="mr-2" size={20} />
          <p className="font-bold text-2xl">Create</p>
        </motion.button>
      </motion.div>
    </ProtectedRoute>
  );
}
