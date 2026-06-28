"use client";

import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PageViewer from "@/components/article-page";
import { CoreDocument } from "@/store/documentStore";
import api from "@/api-controllers/api";
import { useRouter } from "next/navigation";
import { TiArrowLeftThick } from "react-icons/ti";

// ─── Animation Variants ──────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
  exit: {
    opacity: 0,
    y: -32,
    transition: { duration: 0.4, ease: "easeIn" as const },
  },
};

const containerStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
  exit: {},
};

// ─── Suggested Sites ─────────────────────────────────────────────────────────

const suggestions = [
  { label: "Medium", example: "https://medium.com/@..." },
  { label: "Substack", example: "https://substack.com/..." },
  { label: "Dev.to", example: "https://dev.to/..." },
  { label: "Wikipedia", example: "https://en.wikipedia.org/wiki/..." },
];

// ─── Component ───────────────────────────────────────────────────────────────

type Stage = "input" | "loading" | "reading" | "error";

const LOADING_MESSAGES = [
  { text: "Fetching article…", sub: "Reaching out to the web" },
  { text: "Extracting content…", sub: "Removing clutter, keeping the good stuff" },
  { text: "Crafting your reading experience…", sub: "Breaking into curiosity-driven pages" },
  { text: "Almost there…", sub: "Polishing the final touches" },
];

export default function ReadUrlPage() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [stage, setStage] = useState<Stage>("input");
  const [errorMsg, setErrorMsg] = useState("");
  const [document, setDocument] = useState<CoreDocument | null>(null);
  const [ollamaUsed, setOllamaUsed] = useState(false);
  const [loadMsgIndex, setLoadMsgIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const loadTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleRead = async () => {
    const trimmed = url.trim();
    if (!trimmed) {
      inputRef.current?.focus();
      return;
    }

    setStage("loading");
    setLoadMsgIndex(0);
    setErrorMsg("");

    // Cycle loading messages to keep user informed
    loadTimerRef.current = setInterval(() => {
      setLoadMsgIndex((prev) => Math.min(prev + 1, LOADING_MESSAGES.length - 1));
    }, 3500);

    try {
      const response = await api.post("/articles/read-url", { url: trimmed });
      const doc: CoreDocument = response.data.document;
      const aiUsed: boolean = (response.data.document as any).ollamaEnhanced ?? false;
      setDocument(doc);
      setOllamaUsed(aiUsed);
      setStage("reading");
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        "Something went wrong. Please try a different URL.";
      setErrorMsg(msg);
      setStage("error");
    } finally {
      if (loadTimerRef.current) clearInterval(loadTimerRef.current);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleRead();
  };

  const handleReset = () => {
    setStage("input");
    setUrl("");
    setDocument(null);
    setErrorMsg("");
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#f5f3ee]">
      {/* Animated background blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-violet-200/60 to-indigo-200/40 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
          className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-sky-200/50 to-emerald-200/40 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-amber-100/40 to-rose-100/30 blur-3xl"
        />
      </div>

      <AnimatePresence mode="wait">
        {/* ── INPUT STAGE ─────────────────────────────────────────────────── */}
        {stage === "input" && (
          <motion.div
            key="input"
            variants={containerStagger}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center"
          >
            {/* Back button */}
            <motion.button
              variants={fadeUp}
              onClick={() => router.back()}
              className="absolute top-6 left-6 flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors cursor-pointer group"
            >
              <TiArrowLeftThick className="group-hover:-translate-x-0.5 transition-transform" />
              Back
            </motion.button>

            {/* Header */}
            <motion.div variants={fadeUp} className="mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-semibold tracking-wide uppercase border border-violet-200">
                ✦ Read anything
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-4"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Paste a link.
              <br />
              <span className="bg-gradient-to-r from-violet-600 via-indigo-500 to-sky-500 bg-clip-text text-transparent">
                Read it beautifully.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-gray-500 text-lg mb-10 max-w-md"
            >
              Drop any article URL — from Medium, Substack, blogs, Wikipedia —
              and enjoy it as an animated reading experience.
            </motion.p>

            {/* URL Input */}
            <motion.div variants={fadeUp} className="w-full max-w-xl">
              <div className="relative flex items-center bg-white rounded-2xl shadow-[0_4px_32px_rgba(0,0,0,0.08)] border border-gray-200/80 overflow-hidden focus-within:border-violet-400 focus-within:shadow-[0_4px_32px_rgba(139,92,246,0.15)] transition-all duration-300">
                {/* URL icon */}
                <div className="pl-5 pr-3 text-gray-400 flex-shrink-0">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                    />
                  </svg>
                </div>

                <input
                  ref={inputRef}
                  id="article-url-input"
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="https://medium.com/..."
                  className="flex-1 py-4 pr-4 text-base text-gray-800 placeholder-gray-400 outline-none bg-transparent"
                  autoFocus
                  autoComplete="off"
                  spellCheck={false}
                />

                <motion.button
                  id="read-article-btn"
                  onClick={handleRead}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="m-2 px-6 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-xl text-sm shadow-md hover:shadow-lg hover:from-violet-700 hover:to-indigo-700 transition-all duration-200 cursor-pointer flex-shrink-0"
                >
                  Read →
                </motion.button>
              </div>

              {/* Suggestion chips */}
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s.label}
                    onClick={() => setUrl(s.example)}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-white border border-gray-200 text-gray-500 hover:border-violet-300 hover:text-violet-600 hover:bg-violet-50 transition-all duration-200 cursor-pointer"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Decorative page preview illustration */}
            <motion.div
              variants={fadeUp}
              className="mt-16 flex gap-3 opacity-40"
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut",
                  }}
                  className="w-16 h-20 rounded-xl bg-gradient-to-b from-gray-300 to-gray-200 shadow-md"
                />
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* ── LOADING STAGE ───────────────────────────────────────────────── */}
        {stage === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 flex flex-col items-center justify-center h-full gap-6"
          >
            {/* Animated book/page loader */}
            <div className="relative w-20 h-20">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-2xl border-2 border-violet-400"
                  animate={{
                    scale: [1, 1.6, 1],
                    opacity: [0.6, 0, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: "easeOut",
                  }}
                />
              ))}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-violet-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                  />
                </svg>
              </div>
            </div>

            <div className="text-center">
              <motion.p
                key={loadMsgIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-gray-800 font-semibold text-lg"
              >
                {LOADING_MESSAGES[loadMsgIndex].text}
              </motion.p>
              <motion.p
                key={`sub-${loadMsgIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gray-400 text-sm mt-1"
              >
                {LOADING_MESSAGES[loadMsgIndex].sub}
              </motion.p>
            </div>

            {/* Animated dots progress */}
            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-violet-500"
                  animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* ── ERROR STAGE ─────────────────────────────────────────────────── */}
        {stage === "error" && (
          <motion.div
            key="error"
            variants={containerStagger}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center gap-6"
          >
            <motion.div
              variants={fadeUp}
              className="w-16 h-16 rounded-2xl bg-rose-100 flex items-center justify-center"
            >
              <svg
                className="w-8 h-8 text-rose-500"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                />
              </svg>
            </motion.div>

            <motion.div variants={fadeUp}>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Couldn't read this article
              </h2>
              <p className="text-gray-500 text-base max-w-sm">{errorMsg}</p>
            </motion.div>

            <motion.button
              variants={fadeUp}
              id="try-again-btn"
              onClick={handleReset}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3 bg-gray-900 text-white rounded-xl font-semibold text-sm hover:bg-gray-800 transition-colors cursor-pointer shadow-sm"
            >
              ← Try another URL
            </motion.button>
          </motion.div>
        )}

        {/* ── READING STAGE ───────────────────────────────────────────────── */}
        {stage === "reading" && document && (
          <motion.div
            key="reading"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full h-full"
          >
            {/* Thin top banner showing source URL + back option */}
            <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-2.5 bg-white/80 backdrop-blur-md border-b border-gray-100 text-xs text-gray-500">
              <button
                id="back-to-url-input-btn"
                onClick={handleReset}
                className="flex items-center gap-1.5 hover:text-gray-800 transition-colors cursor-pointer"
              >
                <TiArrowLeftThick size={14} />
                Read another
              </button>
              <span className="truncate max-w-xs hidden sm:block opacity-60">
                {url}
              </span>
              <div className="flex items-center gap-2">
                {ollamaUsed && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 text-[10px] font-semibold border border-violet-200">
                    ✦ AI enhanced
                  </span>
                )}
                <span className="font-medium text-violet-600">
                  {document.pages.length} pages
                </span>
              </div>
            </div>

            {/* Full-screen PageViewer — reuses existing animated component */}
            <div className="pt-10 w-full h-full">
              <PageViewer data={document} title={document.title} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
