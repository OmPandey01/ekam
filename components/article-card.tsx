import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Calendar, User, Trash2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

// Types
export type Page = any;

export type CoreDocument = {
  id: string;
  pages: Page[];
  title: string;
  author?: string;
  thumbnailUrl?: string;
  description?: string;
  createdAt?: Date;
  modifiedAt?: Date;
  category?: string[];
  lastSync?: Date;
};

interface ArticleCardProps {
  document: CoreDocument;
  deleteMode?: boolean;
  onDelete?: (id: string) => void;
}

export default function ArticleCard({
  document,
  deleteMode = false,
  onDelete,
}: ArticleCardProps) {
  const router = useRouter();

  // Helper to format date cleanly
  const formatDate = (date?: Date) => {
    if (!date) return null;
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(date));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="group  flex w-full flex-col sm:flex-row gap-6 rounded-3xl border border-neutral-100 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-neutral-200/80"
    >
      {/* Left Column: Thumbnail or Beautiful Abstract Minimal Graphic */}
      <div className="relative h-44 w-full sm:w-44 sm:min-w-[11rem] flex-shrink-0 overflow-hidden rounded-2xl">
        {document.thumbnailUrl ? (
          <Image
            src={document.thumbnailUrl}
            alt={document.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          /* Beautiful Textless Placeholder Graphic */
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-tr from-indigo-100/90 via-purple-100/90 to-pink-50/60 rounded-2xl">
            {/* Background Dot Matrix Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:14px_14px] opacity-70" />

            {/* Dotted Inner Frame */}
            <div className="absolute inset-3 rounded-xl border-[2px] border-dotted border-indigo-400" />

            {/* Minimal Ambient Shapes */}
            <div className="absolute h-20 w-20 rounded-full bg-gradient-to-br from-indigo-400/20 to-purple-400/20 blur-md translate-x-3 -translate-y-3" />
            <div className="absolute h-16 w-16 rounded-full bg-gradient-to-br from-pink-400/10 to-rose-400/20 blur-md -translate-x-4 translate-y-4 mix-blend-multiply" />

            {/* Centerpiece Minimal Geometric Representation (Simulated abstract page layout) */}
            {/*<div className="relative z-10 flex h-11 w-9 flex-col justify-between rounded-lg bg-white/75 p-2 shadow-[0_4px_12px_rgba(165,180,252,0.15)] backdrop-blur-[2px] border border-white/60">
              <div className="h-1 w-full rounded-full bg-indigo-300/60" />
              <div className="h-1 w-5/6 rounded-full bg-indigo-300/40" />
              <div className="h-1 w-2/3 rounded-full bg-indigo-300/40" />
              <div className="mt-1 h-2 w-full rounded-sm bg-gradient-to-r from-purple-200/50 to-pink-200/50" />
            </div>*/}
          </div>
        )}
      </div>

      {/* Right Column: Content */}
      <div className="flex flex-1 flex-col justify-between py-0.5">
        <div>
          {/* Categories / Tags (Optional) */}
          {document.category && document.category.length > 0 && (
            <div className="mb-2.5 flex flex-wrap gap-1.5">
              {document.category.map((cat, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center rounded-full bg-neutral-50 border border-neutral-200/60 px-2.5 py-0.5 text-xs font-medium text-neutral-600"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 line-clamp-2 leading-snug group-hover:text-neutral-800 transition-colors">
            {document.title}
          </h2>

          {/* Meta Information (Author & Date) */}
          {document.author ||
            (document.createdAt && (
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-neutral-400">
                {document.author && (
                  <div className="flex items-center gap-1">
                    <User size={13} className="text-neutral-300" />
                  </div>
                )}

                {document.createdAt && (
                  <div className="flex items-center gap-1">
                    <Calendar size={13} className="text-neutral-300" />
                    <span>{formatDate(document.createdAt)}</span>
                  </div>
                )}
              </div>
            ))}

          {/* Description (Optional) */}
          {document.description && (
            <p className="mt-3 text-sm leading-relaxed text-neutral-500 line-clamp-2">
              {document.description}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-5 flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => router.push(`/article/${document.id}`)}
            className="flex items-center gap-1.5 rounded-full bg-neutral-900 px-5 py-2 text-sm font-medium text-white transition-all hover:bg-neutral-800 active:bg-neutral-950 shadow-sm"
          >
            Read Article
            <ArrowRight size={14} />
          </button>

          {deleteMode && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onDelete) onDelete(document.id);
              }}
              className="flex items-center gap-1.5 rounded-full bg-red-50 border border-red-100 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100/70 hover:text-red-700 active:bg-red-200"
            >
              <Trash2 size={14} />
              Delete
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
