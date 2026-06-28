"use client";

import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { ProtectedRoute } from "@/components/ProtectedRoutes";
import { useState, useEffect, Suspense } from "react";
import api from "@/api-controllers/api";
import Image from "next/image";
import { TextRenderer } from "@/components/article-page";

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [collection, setCollection] = useState<any[]>([]);
  const [filteredCollection, setFilteredCollection] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const defaultMessages = [
    "Enter the query to fetch the search result.",
    "Search Homosapiens",
    "Search Evolution",
    "Discover ideas that matter...",
  ];
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    if (!query) {
      const interval = setInterval(() => {
        setMsgIndex((prev) => (prev + 1) % defaultMessages.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [query]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await api.get("articles/published/featured");
        const data = response.data?.feed || [];
        setCollection(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!query) {
      setFilteredCollection(collection);
      return;
    }
    const lowerQuery = query.toLowerCase();
    const filtered = collection.filter((entry) => {
      const titleMatch = entry.title?.toLowerCase().includes(lowerQuery);
      const catMatch = entry.categories?.some((cat: string) =>
        cat.toLowerCase().includes(lowerQuery),
      );
      return titleMatch || catMatch;
    });
    setFilteredCollection(filtered);
  }, [query, collection]);

  return (
    <ProtectedRoute>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="h-full bg-amber-50 w-full flex flex-row justify-center items-center overflow-hidden"
      >
        <div className="m-0 h-full w-full overflow-scroll p-2 flex flex-col">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-800">
              {query ? `Search results for "${query}"` : "All Documents"}
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Found {filteredCollection.length} result
              {filteredCollection.length !== 1 ? "s" : ""}
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : !query ? (
            <div className="flex-1 flex justify-center items-center w-full h-full">
              <TextRenderer
                size={7}
                text={defaultMessages[msgIndex]}
                index={`msg-${msgIndex}`}
              />
            </div>
          ) : (
            <ul className="overflow-scroll flex flex-col gap-4 p-4">
              {filteredCollection.map((entry, index) => {
                const hasThumbnail =
                  entry.thumbnail && entry.thumbnail !== "null";

                // Fallback gradient colors cycling
                const gradients = [
                  "from-indigo-400 to-purple-500",
                  "from-rose-400 to-pink-500",
                  "from-amber-400 to-orange-500",
                  "from-emerald-400 to-teal-500",
                  "from-sky-400 to-blue-500",
                ];
                const gradientClass = gradients[index % gradients.length];

                // Format date if available
                const formattedDate =
                  entry.createdAt || entry.publishedAt
                    ? new Date(
                        entry.createdAt || entry.publishedAt,
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : null;

                // Reading time estimate
                const readingTime = entry.readingTime
                  ? `${entry.readingTime} min read`
                  : entry.wordCount
                    ? `${Math.max(1, Math.ceil(entry.wordCount / 200))} min read`
                    : null;

                return (
                  <li
                    key={entry.id || entry.document_id}
                    className="list-none group"
                  >
                    <motion.div
                      whileHover={{ y: -3 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }}
                      className="relative bg-white rounded-2xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_2px_6px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)] transition-shadow duration-500 flex flex-col md:flex-row w-full h-full border border-gray-100/80"
                    >
                      {/* Subtle accent line on the left (desktop) / top (mobile) */}
                      <div
                        className={`absolute top-0 left-0 w-full h-[3px] md:w-[3px] md:h-full bg-gradient-to-b ${gradientClass} opacity-60 group-hover:opacity-100 transition-opacity duration-500`}
                      />

                      {/* Thumbnail / Gradient Fallback */}
                      <div className="w-full md:w-56 lg:w-64 h-44 md:h-auto flex-shrink-0 relative overflow-hidden bg-gray-50">
                        {hasThumbnail ? (
                          <Image
                            src={entry.thumbnail}
                            alt={entry.title || "Article thumbnail"}
                            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                            width={260}
                            height={180}
                          />
                        ) : (
                          <div
                            className={`w-full h-full bg-gradient-to-br ${gradientClass} flex items-center justify-center`}
                          >
                            <span className="text-white/80 text-5xl font-light select-none">
                              {(entry.title || "U")[0].toUpperCase()}
                            </span>
                          </div>
                        )}

                        {/* Category badge */}
                        {entry.categories && entry.categories.length > 0 && (
                          <div className="absolute top-3 left-3 flex gap-1 flex-wrap">
                            {entry.categories.map((cat: string, i: number) => (
                              <span
                                key={i}
                                className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wider text-white bg-black/40 backdrop-blur-md border border-white/10"
                              >
                                {cat}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Content Container */}
                      <div className="p-5 md:p-6 lg:p-7 flex flex-col justify-between flex-grow min-w-0">
                        {/* Top section */}
                        <div className="min-w-0">
                          {/* Meta row */}
                          <div className="flex items-center gap-2.5 mb-2.5 flex-wrap">
                            {formattedDate && (
                              <time className="text-xs text-gray-400 font-medium tabular-nums">
                                {formattedDate}
                              </time>
                            )}
                            {formattedDate && readingTime && (
                              <span className="w-1 h-1 rounded-full bg-gray-300 flex-shrink-0" />
                            )}
                            {readingTime && (
                              <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
                                <svg
                                  className="w-3 h-3"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={2}
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                  />
                                </svg>
                                {readingTime}
                              </span>
                            )}
                          </div>

                          {/* Title */}
                          <h3 className="text-lg md:text-xl font-semibold text-gray-900 line-clamp-2 leading-snug mb-2 group-hover:text-gray-700 transition-colors duration-300">
                            {entry.title || "Untitled"}
                          </h3>

                          {/* Excerpt */}
                          {entry.excerpt && (
                            <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-3">
                              {entry.excerpt}
                            </p>
                          )}

                          {/* Author */}
                          <div className="flex items-center gap-2.5">
                            {entry.author?.avatar ? (
                              <Image
                                src={entry.author.avatar}
                                alt={entry.author.name || "Author"}
                                className="w-6 h-6 rounded-full object-cover ring-2 ring-white"
                                width={24}
                                height={24}
                              />
                            ) : (
                              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center ring-2 ring-white">
                                <span className="text-[10px] font-bold text-gray-500"></span>
                              </div>
                            )}
                            <span className="text-sm text-gray-500">
                              <span className="font-medium text-gray-700">
                                {entry.author?.name || "Unknown"}
                              </span>
                            </span>
                          </div>
                        </div>

                        {/* Action row */}
                        <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {/* Optional: like / bookmark icons */}
                            {entry.likes != null && (
                              <span className="flex items-center gap-1 text-xs text-gray-400">
                                <svg
                                  className="w-3.5 h-3.5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.8}
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48a4.53 4.53 0 0 1-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m7.598-4.027A9.042 9.042 0 0 0 8.5 10.25H6.633"
                                  />
                                </svg>
                                {entry.likes}
                              </span>
                            )}
                          </div>

                          <button
                            onClick={() => router.push(`/article/${entry.id}`)}
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 active:scale-[0.97] transition-all duration-200 cursor-pointer group/btn shadow-sm hover:shadow-md"
                          >
                            Read
                            <svg
                              className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform duration-200"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2.5}
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </li>
                );
              })}
              {filteredCollection.length === 0 && (
                <li className="text-gray-500 text-center py-10">
                  No results found for "{query}". Try a different search term.
                </li>
              )}
            </ul>
          )}
        </div>
      </motion.div>
    </ProtectedRoute>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-full w-full">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
