"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";
import ArticleCard from "@/components/article-card";
import { useDocumentStore } from "@/store/documentStore";
import { ProtectedRoute } from "@/components/ProtectedRoutes";
import { useState, useEffect } from "react";
import api from "@/api-controllers/api";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const [collection, setCollection] = useState<any[]>([]);
  const thumbnailUrls: string[] = [
    "/thumbnails/thumbnail_1.jpg",
    "/thumbnails/thumbnail_2.jpg",
  ];

  const [thumbnailIndex, setThumbnailIndex] = useState(0);

  // Note: state.documents is available here if you need it locally later
  const documents = useDocumentStore((state) => state.documents);

  useEffect(() => {
    const makeDocumentArray = async (data: any[]): Promise<any[]> => {
      return Promise.all(
        data.map(async (item, index) => {
          const response = await api.get(`/articles/${item.id}`);
          return {
            key: `${item.id}-${index}`,
            ...response.data,
          };
        }),
      );
    };

    const getThumbnailUrl = (): string => {
      setThumbnailIndex((prevIndex) => (prevIndex + 1) % thumbnailUrls.length);
      return thumbnailUrls[thumbnailIndex];
    };

    const fetchData = async () => {
      try {
        const response = await api.get("articles/published/featured");
        // console.log("Response from server:", response);

        const data = response.data?.feed || [];

        console.log(data[[0]]);

        setCollection(data);
        // console.log("Document array processed:", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ProtectedRoute>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="h-full bg-amber-50 w-full flex flex-row justify-center items-center overflow-hidden"
      >
        <div className="m-0 h-full w-full  overflow-scroll  p-2">
          <ul className="overflow-scroll flex flex-col gap-4 p-4">
            {collection.map((entry) => {
              // Check if thumbnail is genuinely missing or the string "null"
              const hasThumbnail =
                entry.thumbnail && entry.thumbnail !== "null";

              return (
                <li key={entry.document_id} className="list-none">
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm flex flex-col md:flex-row w-full  h-auto md:h-28"
                  >
                    {/* Thumbnail / Gradient Container */}
                    <div className="w-full md:w-48 h-22 md:h-full flex-shrink-0">
                      <Image
                        src={thumbnailUrls[0]}
                        alt={entry.title}
                        className="w-full h-full object-cover"
                        width={200}
                        height={200}
                      />
                    </div>

                    {/* Content Container */}
                    <div className="p-5 flex flex-col justify-between flex-grow">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 line-clamp-1 mb-1">
                          {entry.title || "Untitled"}
                        </h3>

                        {/* Author Display (Safely accessing the object) */}
                        <p className="text-sm text-gray-500 font-medium">
                          By{" "}
                          <span className="text-gray-700 font-semibold">
                            {entry.author?.name || "Unknown"}
                          </span>
                        </p>
                      </div>

                      {/* Action Button */}
                      <div className="mt-4 md:mt-0 flex justify-end">
                        <button
                          onClick={() => router.push(`/article/${entry.id}`)}
                          className="px-4 py-2 bg-gray-900 text-white rounded-lg font-medium text-sm hover:bg-gray-800 active:scale-95 transition-all cursor-pointer"
                        >
                          Read Article
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </li>
              );
            })}

            {collection.length === 0 && (
              <li className="text-gray-500 text-center py-10">
                No documents yet. Create your first one!
              </li>
            )}
          </ul>
        </div>

        <motion.button
          initial={{ opacity: 0, scale: 0, borderRadius: 50 }}
          animate={{ opacity: 1, scale: 1, transition: { duration: 0.8 } }}
          whileHover={{
            scale: 1.1,
            borderRadius: 50,
            border: "2px solid lightblue",
            boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)",
          }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={() => router.push("/editor")}
          className="bg-gray-100 h-20 m-10 w-50 flex justify-center items-center p-10 absolute bottom-10 right-5"
        >
          <FaPlus className="mr-2" size={20} />
          <p className="font-bold text-2xl">Create</p>
        </motion.button>
      </motion.div>
    </ProtectedRoute>
  );
}
