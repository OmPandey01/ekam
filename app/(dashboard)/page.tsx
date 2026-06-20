"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";
import ArticleCard from "@/components/article-card";
import { useDocumentStore } from "@/store/documentStore";
import { ProtectedRoute } from "@/components/ProtectedRoutes";

export default function Home() {
  // state.documents is a Record<string, CoreDocument> (an object)
  // We use Object.values() to convert it into an array of CoreDocument[]
  const documents = useDocumentStore((state) => state.documents);
  const collection = Object.entries(documents);

  console.log("collection 🇮🇳", collection);

  const router = useRouter();

  return (
    <ProtectedRoute>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="h-full w-full flex flex-row justify-center items-center overflow-hidden"
      >
        <div className="m-0 h-full w-auto overflow-scroll max-w-fit p-2">
          <ul className="overflow-scroll flex flex-col gap-4 p-4">
            {/* Now collection is an array and .map() works perfectly */}
            {collection.map((entry, index) => (
              // Use doc.id instead of index for a more stable React key
              <li key={`${entry[0]}+${index}`}>
                <ArticleCard isVertical={false} document={entry[1]} />
              </li>
            ))}

            {/* Optional: Show a message if the store is empty */}
            {collection.length === 0 && (
              <li className="text-gray-500 text-center py-10">
                No documents yet. Create your first one!
              </li>
            )}
          </ul>
        </div>

        {/*<div className=" bg-emerald-100 h-screen hidden md:block  w-[30vw] p-10">
          <h1 className="text-4xl font-bold">Recent Articles</h1>
        </div>*/}

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
          className="bg-gray-100 h-20 m-10 w-50 flex justify-center items-center p-10 absolute bottom-10 right-5"
        >
          <FaPlus className="mr-2" size={20} />
          <p className="font-bold text-2xl">Create</p>
        </motion.button>
      </motion.div>
    </ProtectedRoute>
  );
}
