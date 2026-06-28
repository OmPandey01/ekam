"use client";

import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  Suspense,
} from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Save,
  Plus,
  Trash2,
  Pencil,
  Check,
  X,
  Type,
  AlignLeft,
  ChevronLeft,
  FileText,
  UploadCloudIcon,
  Globe,
  Loader2,
} from "lucide-react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { useDocumentStore, PageType } from "@/store/documentStore";

import { GrSync } from "react-icons/gr";

import api from "@/api-controllers/api";
import type { Page as CorePage } from "@/store/documentStore";

import Page from "@/components/article-page";
import ImageDropZone from "@/components/ImageDropZone"; // Imported ImageDropZone
import { SiDocsdotrs } from "react-icons/si";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const thumbVariants = {
  initial: { opacity: 0, scale: 0.88, y: 16 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.88, x: -40 },
};

const slideVariants = {
  initial: { opacity: 0, scale: 0.97, y: 8 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.97, y: -8 },
};

const getPageTypeLabel = (type: PageType): string => {
  switch (type) {
    case PageType.Text:
      return "Text";
    case PageType.TextWithMedia:
      return "Text + Media";
    case PageType.Quote:
      return "Quote";
    case PageType.Collage:
      return "Collage";
    case PageType.Links:
      return "Links";
    default:
      return "Page";
  }
};

function Toast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 40, x: "-50%" }}
          transition={{ type: "spring", damping: 24, stiffness: 300 }}
          className="fixed bottom-8 left-1/2 z-50 flex items-center gap-2 bg-[#1D1D1F]/90 backdrop-blur-xl text-white px-5 py-3 rounded-2xl text-sm font-medium shadow-2xl"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.15, type: "spring", damping: 12 }}
          >
            <Check size={15} className="text-[#30D158]" />
          </motion.div>
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ConfirmModal({
  open,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
          onClick={onCancel}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 10 }}
            transition={{ type: "spring", damping: 24, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl p-6 w-[340px] flex flex-col gap-5"
          >
            <div className="flex flex-col gap-1.5">
              <h3 className="text-[17px] font-semibold text-[#1D1D1F]">
                Delete Page
              </h3>
              <p className="text-[13px] text-[#86868B] leading-relaxed">
                This page and its content will be permanently removed.
              </p>
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={onCancel}
                className="px-4 py-2 text-[13px] font-medium rounded-xl bg-[#F5F5F7] text-[#1D1D1F] hover:bg-[#E8E8ED] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 text-[13px] font-medium rounded-xl bg-[#FF3B30] text-white hover:bg-[#DC2E25] transition-colors"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DocumentEditorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const docId = searchParams.get("docId");

  const {
    documents,
    createDocument,
    updateDocument,
    addPage,
    deletePage,
    updatePageText,
    isHydrated,
    syncWithServer,
    getDocumentFromServer,
  } = useDocumentStore();

  const [activePageIndex, setActivePageIndex] = useState(0);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState("");
  const [toast, setToast] = useState({ message: "", visible: false });
  const [hoveredThumb, setHoveredThumb] = useState<number | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [saveFlash, setSaveFlash] = useState(false);
  const [synced, setSynced] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [showPublishForm, setShowPublishForm] = useState(false);
  const [showPreview, setShowPreview] = useState<boolean>(false);

  // Added state for thumbnailUrl in the parent component
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  const handlePublish = () => {
    // Pre-fill the thumbnail state when opening the publish form
    if (currentDoc?.thumbnailUrl) {
      setThumbnailUrl(currentDoc.thumbnailUrl);
    } else {
      setThumbnailUrl("");
    }
    setShowPublishForm(!showPublishForm);
  };

  const showToast = useCallback((message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast((p) => ({ ...p, visible: false })), 2600);
  }, []);

  const handleSync = useCallback(async () => {
    setToast({ message: "Syncing...", visible: true });
    if (!docId) return;
    setIsSyncing(true);
    const success = await syncWithServer(docId);
    if (success) {
      setSynced(true);
      setToast({ message: "Synced with server", visible: true });
    } else {
      setSynced(false);
      setToast({ message: "Failed to sync with server", visible: true });
    }
    setTimeout(() => setToast({ message: "", visible: false }), 1000);
    setIsSyncing(false);
  }, [docId, syncWithServer]);

  const titleInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentDoc = docId ? documents[docId] : null;

  useEffect(() => {
    if (!docId) return;
    const getDoc = async () => {
      setIsSyncing(true);
      setSynced(false);
      const doc = await getDocumentFromServer(docId);
      if (doc) {
        setIsSyncing(false);
        setSynced(true);
      }
    };
    getDoc();
  }, [docId, getDocumentFromServer]);

  useEffect(() => {
    const syncInterval = setInterval(async () => {
      await handleSync();
    }, 10000);
    return () => clearInterval(syncInterval);
  }, [handleSync]);

  useEffect(() => {
    if (!isHydrated) return;
    if (!docId || !currentDoc) {
      const newId = createDocument();
      router.replace(`/editor?docId=${newId}`);
    }
  }, [docId, isHydrated, currentDoc, createDocument, router]);

  useEffect(() => {
    setActivePageIndex(0);
  }, [docId]);

  useEffect(() => {
    if (!currentDoc || currentDoc.pages.length === 0) return;
    if (activePageIndex >= currentDoc.pages.length) {
      setActivePageIndex(currentDoc.pages.length - 1);
    }
  }, [currentDoc, activePageIndex]);

  const handleAddPage = useCallback(() => {
    if (!docId) return;
    addPage(docId);
    if (currentDoc) {
      const newIdx = currentDoc.pages.length;
      setActivePageIndex(newIdx);
      setTimeout(() => {
        scrollRef.current?.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 120);
    }
  }, [docId, addPage, currentDoc]);

  const confirmDelete = useCallback(() => {
    if (!deleteTarget || !docId || !currentDoc) return;
    if (currentDoc.pages.length <= 1) {
      showToast("Document must have at least one page");
      setDeleteTarget(null);
      return;
    }
    const idx = currentDoc.pages.findIndex((p) => p.pageId === deleteTarget);
    deletePage(docId, deleteTarget);
    if (activePageIndex === idx) {
      setActivePageIndex(Math.min(idx, currentDoc.pages.length - 2));
    } else if (activePageIndex > idx) {
      setActivePageIndex((p) => p - 1);
    }
    setDeleteTarget(null);
  }, [deleteTarget, docId, currentDoc, activePageIndex, deletePage, showToast]);

  const startEditingTitle = useCallback(() => {
    if (!currentDoc) return;
    setTitleDraft(currentDoc.title);
    setIsEditingTitle(true);
    setTimeout(() => titleInputRef.current?.focus(), 60);
  }, [currentDoc]);

  const saveTitle = useCallback(() => {
    if (!docId) return;
    const trimmed = titleDraft.trim();
    updateDocument(docId, { title: trimmed || "Untitled Document" });
    setIsEditingTitle(false);
  }, [docId, titleDraft, updateDocument]);

  const cancelEditTitle = useCallback(() => setIsEditingTitle(false), []);
  const handleTitleKey = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") saveTitle();
      if (e.key === "Escape") cancelEditTitle();
    },
    [saveTitle, cancelEditTitle],
  );

  const renderThumbContent = (page: CorePage) => {
    if ("text" in page) {
      if (page.type === PageType.Text || page.type === PageType.TextWithMedia) {
        const text = page.text || "";
        if (!text) {
          return (
            <div className="flex flex-col items-center justify-center h-full gap-1 opacity-30">
              <AlignLeft size={14} />
              <span className="text-[7px] font-medium">Empty</span>
            </div>
          );
        }
        const lines = text.split("\n");
        return (
          <div className="space-y-[3px] px-1 mt-1">
            {lines.slice(0, 5).map((line, li) => (
              <div key={li} className="flex gap-[2px] items-center">
                {line.length === 0 ? (
                  <div className="h-[3px] w-4 bg-[#E8E8ED] rounded-full" />
                ) : (
                  <div
                    className="h-[3px] rounded-full bg-[#1D1D1F]/20"
                    style={{
                      width: `${Math.min(95, Math.max(20, (line.length / 60) * 100))}%`,
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        );
      }
    }
    return null;
  };

  if (!isHydrated || !currentDoc) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#E8E8ED]">
        <div className="w-6 h-6 border-2 border-[#007AFF] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const activePage = currentDoc.pages[activePageIndex];

  return (
    <div
      className={`flex h-screen overflow-hidden bg-[#E8E8ED] ${jakarta.variable}`}
      style={{
        fontFamily:
          'var(--font-jakarta), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <PublishForm
        handlePublishPopup={handlePublish}
        isVisible={showPublishForm}
        document_id={docId}
        title={currentDoc.title}
        thumbnailUrl={thumbnailUrl}
        setThumbnailUrl={setThumbnailUrl}
        onSuccess={(msg) => showToast(msg)}
      />

      {/* LEFT SIDEBAR */}
      <div className="w-[272px] min-w-[272px] flex flex-col bg-[#F5F5F7] border-r border-[#D2D2D7]/50 select-none">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#D2D2D7]/40 bg-[#FAFAFA]/70 backdrop-blur-md">
          <button
            onClick={() => router.push("/")}
            className="flex justify-start w-full items-center gap-2 text-[#86868B] hover:text-[#1D1D1F] transition-colors px-2.5 py-1.5 rounded-lg hover:bg-[#E8E8ED]/80 active:scale-[0.97]"
          >
            <ChevronLeft size={16} strokeWidth={2.5} />
            <span className="text-[12px] font-semibold tracking-tight">
              Home
            </span>
          </button>

          <div className="w-50 h-auto">
            <motion.button
              whileTap={{ scale: 0.93 }}
              onClick={handleSync}
              className="relative flex items-center gap-1.5 bg-[#007AFF] hover:bg-[#0062D9] text-white px-3.5 py-[7px] rounded-lg text-[12px] font-semibold transition-colors shadow-sm shadow-[#007AFF]/20"
            >
              <UploadCloudIcon size={13} />
              <span>Sync</span>
              {isSyncing && (
                <motion.div
                  initial={{ opacity: 0.6, scale: 1 }}
                  animate={{ opacity: 0, scale: 2.5 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 rounded-lg bg-white/30"
                />
              )}
            </motion.button>
          </div>
        </div>

        <div className="px-5 pt-4 pb-2">
          <span className="text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">
            Pages
          </span>
        </div>

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-3 pb-2 space-y-2 page-scroll"
        >
          <style>{`.page-scroll::-webkit-scrollbar { width: 5px; } .page-scroll::-webkit-scrollbar-track { background: transparent; } .page-scroll::-webkit-scrollbar-thumb { background: #C7C7CC; border-radius: 10px; }`}</style>
          <AnimatePresence mode="popLayout">
            {currentDoc.pages.map((page, index) => {
              const isActive = index === activePageIndex;
              const isHovered = index === hoveredThumb;
              return (
                <motion.div
                  key={page.pageId}
                  layout="position"
                  variants={thumbVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{
                    duration: 0.22,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  onMouseEnter={() => setHoveredThumb(index)}
                  onMouseLeave={() => setHoveredThumb(null)}
                  onClick={() => setActivePageIndex(index)}
                  className={`relative my-4 group cursor-pointer rounded-xl transition-all duration-200 ${isActive ? "ring-[2.5px] ring-[#007AFF] ring-offset-[3px] ring-offset-[#F5F5F7] shadow-lg shadow-[#007AFF]/10" : "ring-1 ring-[#D2D2D7]/70 hover:ring-[#007AFF]/30"}`}
                >
                  <div className="aspect-[16/10] bg-white rounded-[10px] overflow-hidden relative">
                    <div className="absolute top-[5px] left-[5px] flex items-center gap-[3px] bg-[#F5F5F7]/90 backdrop-blur-sm rounded-[4px] px-[5px] py-[2px]">
                      <Type size={6} className="text-[#86868B]" />
                      <span className="text-[6.5px] text-[#86868B] font-semibold">
                        {getPageTypeLabel(page.type)}
                      </span>
                    </div>
                    {renderThumbContent(page)}
                  </div>
                  <div className="absolute bottom-[5px] right-[7px] text-[8px] text-[#86868B]/70 font-semibold tabular-nums">
                    {index + 1}
                  </div>
                  <AnimatePresence>
                    {(isHovered || isActive) && currentDoc.pages.length > 1 && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.7 }}
                        transition={{ duration: 0.12 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteTarget(page.pageId);
                        }}
                        className="absolute top-[4px] right-[4px] p-[4px] bg-white/95 hover:bg-[#FFEBE9] rounded-[6px] shadow-sm border border-[#D2D2D7]/40 transition-colors z-10"
                      >
                        <Trash2 size={9} className="text-[#FF3B30]" />
                      </motion.button>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="p-3 border-t border-[#D2D2D7]/40 bg-[#F5F5F7]">
          <motion.button
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleAddPage}
            className="w-full flex items-center justify-center gap-2 py-[11px] rounded-xl border-[1.5px] border-dashed border-[#C7C7CC] hover:border-[#007AFF] text-[#86868B] hover:text-[#007AFF] transition-colors text-[13px] font-semibold bg-white/40 hover:bg-[#007AFF]/[0.04]"
          >
            <Plus size={16} strokeWidth={2.5} />
            <span>Add Page</span>
          </motion.button>
        </div>
      </div>

      {/* RIGHT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center justify-between px-8 py-4 bg-[#F5F5F7]/60 border-b border-[#D2D2D7]/30 backdrop-blur-md">
          <div className="flex items-center gap-3 min-w-0">
            <AnimatePresence mode="wait">
              {isEditingTitle ? (
                <motion.div
                  key="editing"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="flex items-center gap-2"
                >
                  <input
                    ref={titleInputRef}
                    type="text"
                    value={titleDraft}
                    onChange={(e) => setTitleDraft(e.target.value)}
                    onKeyDown={handleTitleKey}
                    className="text-[15px] font-semibold text-[#1D1D1F] bg-white border border-[#D2D2D7] rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#007AFF] min-w-[240px]"
                    placeholder="Document title"
                  />
                  <button
                    onClick={saveTitle}
                    className="p-2 rounded-lg bg-[#007AFF] text-white hover:bg-[#0062D9] transition-colors"
                  >
                    <Check size={14} />
                  </button>
                  <button
                    onClick={cancelEditTitle}
                    className="p-2 rounded-lg bg-[#E8E8ED] text-[#86868B] transition-colors"
                  >
                    <X size={14} />
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="display"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.18 }}
                  className="flex items-center gap-2.5"
                >
                  <h1 className="text-[16px] font-bold text-[#1D1D1F] truncate max-w-[320px]">
                    {currentDoc.title}
                  </h1>
                  <button
                    onClick={startEditingTitle}
                    className="p-1.5 rounded-lg text-[#86868B] hover:text-[#007AFF] hover:bg-[#007AFF]/10 transition-all"
                  >
                    <Pencil size={12} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-4 bg-white/80 backdrop-blur-sm border border-[#D2D2D7]/60 p-1 rounded-xl">
            <button
              onClick={() => setShowPreview(false)}
              className={`px-4 py-1.5 text-[13px] font-medium rounded-lg transition-all ${!showPreview ? "bg-[#007AFF] text-white shadow-sm" : "text-[#86868B] hover:text-[#1D1D1F]"}`}
            >
              Editor
            </button>
            <button
              onClick={() => setShowPreview(true)}
              className={`px-4 py-1.5 text-[13px] font-medium rounded-lg transition-all ${showPreview ? "bg-[#007AFF] text-white shadow-sm" : "text-[#86868B] hover:text-[#1D1D1F]"}`}
            >
              Preview
            </button>
          </div>

          <div className="flex items-center gap-4 text-[12px] text-[#86868B] font-medium shrink-0">
            <span className="tabular-nums flex items-center gap-1.5">
              <FileText size={13} />
              Page {activePageIndex + 1} of {currentDoc.pages.length}
            </span>

            <motion.button
              onClick={handlePublish}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 bg-[#1D1D1F] hover:bg-[#323236] text-white text-[13px] font-semibold rounded-xl transition-colors shadow-sm flex items-center gap-1.5"
            >
              <Globe size={13} />
              Publish
            </motion.button>
          </div>
        </div>

        <div
          className="flex-1 flex bg-[#E8E8ED] items-center justify-center p-6 md:p-10 overflow-auto relative"
          style={{
            backgroundImage:
              "radial-gradient(circle, #C7C7CC 0.5px, transparent 0.5px)",
            backgroundSize: "20px 20px",
          }}
        >
          <AnimatePresence mode="wait">
            {!showPreview ? (
              <motion.div
                key={activePage.pageId}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.24 }}
                className="w-full max-w-[920px] aspect-[16/9] bg-white rounded-2xl flex flex-col overflow-hidden relative shadow-xl border border-[#D2D2D7]/40"
              >
                <div className="flex-shrink-0 flex items-center justify-between px-7 pt-5 pb-1">
                  <div className="flex items-center gap-2 bg-[#F5F5F7] rounded-lg px-3 py-[5px]">
                    <Type size={12} className="text-[#86868B]" />
                    <span className="text-[11px] text-[#86868B] font-semibold">
                      {getPageTypeLabel(activePage.type)} Page
                    </span>
                  </div>
                  <span className="text-[11px] text-[#C7C7CC] font-medium tabular-nums">
                    {activePageIndex + 1}
                  </span>
                </div>

                <div className="flex-1 px-7 pb-7 pt-2 min-h-0">
                  <textarea
                    value={activePage.text || ""}
                    onChange={(e) =>
                      docId &&
                      updatePageText(docId, activePage.pageId, e.target.value)
                    }
                    className="w-full h-full text-[16px] leading-[1.75] bg-transparent resize-none focus:outline-none text-[#1D1D1F] placeholder:text-[#C7C7CC]/80 font-medium"
                    placeholder="Start writing something remarkable..."
                    spellCheck
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="preview-pane"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className=" h-full w-full"
              >
                <Page data={currentDoc} title={currentDoc.title} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Toast message={toast.message} visible={toast.visible} />
      <ConfirmModal
        open={deleteTarget !== null}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}

export default function DocumentEditor() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-[#E8E8ED]">
          <div className="w-6 h-6 border-2 border-[#007AFF] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <DocumentEditorContent />
    </Suspense>
  );
}

interface PublishFormProps {
  handlePublishPopup: () => void;
  isVisible: boolean;
  document_id: string | null;
  title: string;
  thumbnailUrl: string;
  setThumbnailUrl: (url: string) => void;
  onSuccess: (message: string) => void;
}

export const PublishForm = ({
  handlePublishPopup,
  isVisible,
  document_id,
  title,
  thumbnailUrl,
  setThumbnailUrl,
  onSuccess,
}: PublishFormProps) => {
  const [publishTitle, setPublishTitle] = useState(title);
  const [categoriesStr, setCategoriesStr] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setPublishTitle(title);
      setCategoriesStr("");
    }
  }, [isVisible, title]);

  const defaultImages = [
    "https://res.cloudinary.com/dtw828to0/image/upload/v1782412343/thumbnail_1_zkx6sr.jpg",
    "https://cdn.pixabay.com/photo/2025/06/26/04/12/hill-9681095_1280.jpg",
    "https://res.cloudinary.com/dtw828to0/image/upload/v1782434053/milaoktasafitri-hill-9026381_640_hnerje.png",
    "https://cdn.pixabay.com/photo/2025/10/27/15/30/lighthouse-9920690_1280.png"
  ];

  const handlePublishSubmit = async () => {
    if (!document_id) return;
    setIsPublishing(true);

    try {
      const finalThumbnail = thumbnailUrl || defaultImages[Math.floor(Math.random() * defaultImages.length)];

      const categoriesArray = categoriesStr
        .split(",")
        .map(c => c.trim())
        .filter(c => c.length > 0);

      await api.post(`/documents/${document_id}/publish`, {
        title: publishTitle.trim() || "Untitled Production Document",
        thumbnailUrl: finalThumbnail,
        categories: categoriesArray,
      });
      onSuccess("Document published successfully");
      handlePublishPopup();
    } catch (err: any) {
      console.error("Publishing runtime error:", err);
      onSuccess("Failed to publish document");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={handlePublishPopup}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#FAFAFA] dark:bg-[#242424] rounded-[12px] shadow-2xl w-[480px] flex flex-col select-none overflow-hidden border border-[#E5E5E5] dark:border-[#333333]"
            style={{ fontFamily: "Cantarell, 'Inter', sans-serif" }}
          >
            {/* Header / Titlebar - Gnome Style */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#EBEBEB] dark:bg-[#303030] border-b border-[#D4D4D4] dark:border-[#1F1F1F]">
              <div className="flex-1"></div>
              <h3 className="text-[14px] font-bold text-[#3D3D3D] dark:text-[#E6E6E6] flex-1 text-center whitespace-nowrap">
                Publish Document
              </h3>
              <div className="flex-1 flex justify-end">
                <button
                  onClick={handlePublishPopup}
                  className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-[#D4D4D4] dark:hover:bg-[#424242] text-[#3D3D3D] dark:text-[#E6E6E6] transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-[12px] font-medium text-[#5E5E5E] dark:text-[#A1A1A1]">
                  Title
                </label>
                <input
                  type="text"
                  value={publishTitle}
                  onChange={(e) => setPublishTitle(e.target.value)}
                  disabled={isPublishing}
                  className="w-full text-[14px] text-[#3D3D3D] dark:text-[#E6E6E6] bg-white dark:bg-[#1E1E1E] border border-[#D4D4D4] dark:border-[#333333] rounded-[8px] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3584E4] transition-all disabled:opacity-50"
                  placeholder="Enter custom deployment title..."
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[12px] font-medium text-[#5E5E5E] dark:text-[#A1A1A1]">
                  Categories (comma separated)
                </label>
                <input
                  type="text"
                  value={categoriesStr}
                  onChange={(e) => setCategoriesStr(e.target.value)}
                  disabled={isPublishing}
                  className="w-full text-[14px] text-[#3D3D3D] dark:text-[#E6E6E6] bg-white dark:bg-[#1E1E1E] border border-[#D4D4D4] dark:border-[#333333] rounded-[8px] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3584E4] transition-all disabled:opacity-50"
                  placeholder="e.g. Technology, Guide, Tutorial"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[12px] font-medium text-[#5E5E5E] dark:text-[#A1A1A1]">
                  Thumbnail Image
                </label>
                <div className="rounded-[8px] overflow-hidden border border-[#D4D4D4] dark:border-[#333333]">
                  <ImageDropZone
                    onUpload={(url) => setThumbnailUrl(url)}
                  />
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[12px] font-medium text-[#5E5E5E] dark:text-[#A1A1A1] whitespace-nowrap">
                    OR enter image URL:
                  </span>
                  <input
                    type="url"
                    value={thumbnailUrl}
                    onChange={(e) => setThumbnailUrl(e.target.value)}
                    disabled={isPublishing}
                    className="flex-1 text-[13px] text-[#3D3D3D] dark:text-[#E6E6E6] bg-white dark:bg-[#1E1E1E] border border-[#D4D4D4] dark:border-[#333333] rounded-[6px] px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#3584E4] transition-all disabled:opacity-50"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex gap-3 justify-end px-6 py-4 bg-[#FAFAFA] dark:bg-[#242424]">
              <button
                onClick={handlePublishPopup}
                disabled={isPublishing}
                className="px-5 py-2 text-[14px] font-medium rounded-[8px] bg-[#EBEBEB] dark:bg-[#383838] text-[#3D3D3D] dark:text-[#E6E6E6] hover:bg-[#D4D4D4] dark:hover:bg-[#424242] transition-colors border border-[#D4D4D4] dark:border-[#1F1F1F] disabled:opacity-50 shadow-sm"
              >
                Cancel
              </button>
              <button
                onClick={handlePublishSubmit}
                disabled={isPublishing}
                className="px-5 py-2 text-[14px] font-medium rounded-[8px] bg-[#3584E4] text-white hover:bg-[#1C71D8] transition-colors flex items-center gap-2 disabled:opacity-70 min-w-[100px] justify-center shadow-sm"
              >
                {isPublishing ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>
                    <Globe size={16} />
                    Publish
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
