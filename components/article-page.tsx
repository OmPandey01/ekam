"use client";
import { useState } from "react";
import NextButton from "@/components/page-turn-button";

// FIX: Import types from the single source of truth (your store), not data.ts
import { CoreDocument, Page, PageType } from "@/store/documentStore";

import { AnimatePresence, motion, number, Variant } from "framer-motion"; // Cleaned up motion imports
import { useRouter } from "next/navigation";
import Image from "next/image";

import { StarIcon } from "@animateicons/react/lucide";
import { ShareIcon } from "@animateicons/react/lucide";
import { TiArrowLeftThick } from "react-icons/ti";
import { TiArrowRightThick } from "react-icons/ti";
import { ImFontSize } from "react-icons/im";
import { HouseIcon } from "@animateicons/react/lucide";
import { PlayIcon } from "@animateicons/react/lucide";

import Dock from "@/components/Dock";
import ComingSoonDialog from "@/components/ComingSoonDialog";
import { Variants } from "framer-motion";

// Removed local re-declarations of MediaItem, LinkItem, PageData, DocData
// to rely entirely on the Zustand store types.

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    filter: "none",
    transition: {
      staggerChildren: 0.05,
      duration: 0.4,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
      when: "afterChildren",
    },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 10, filter: "blur(10px)", color: "#C2C8FF" },
  visible: {
    filter: "blur(0px)",
    color: "#000000",
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      type: "tween",
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    filter: "blur(10px)",
    transition: {
      duration: 0.3,
    },
  },
};

const imagesContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const imageItemVariants: Variants = {
  hidden: { opacity: 0, x: -200, filter: "blur(20px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { type: "spring" as const, stiffness: 200, damping: 20 },
  },
};

export default function PageViewer(props: {
  data: CoreDocument;
  title?: string;
  index?: number;
  onNext?: () => void;
  text?: string;
}) {
  const router = useRouter();
  const data = props.data.data;
  const pages = data.pages;
  console.log("👊🎁 🇮🇳", data);

  const [index, setIndex] = useState(props.index ?? 0);

  const handleNext = () => {
    const nextIndex = (index + 1) % pages.length;
    setIndex(nextIndex);
  };
  const handlePrev = () => {
    const prevIndex = (index - 1 + pages.length) % pages.length;
    setIndex(prevIndex);
  };

  const [comingSoonOpen, setComingSoonOpen] = useState(false);
  const handleComingSoonPopup = () => setComingSoonOpen(!comingSoonOpen);

  const items = [
    {
      icon: <TiArrowLeftThick />,
      label: " Previous Page",
      className: "!bg-green-200  !border-gray-200 !text-black",
      onClick: handlePrev,
    },
    {
      icon: <StarIcon size={30} duration={1.05} color="black" />,
      label: "Star the page",
      className: "!bg-amber-50 !border-gray-200 !text-black",
      onClick: handleComingSoonPopup,
    },
    {
      icon: <ShareIcon size={30} duration={1.05} color="black" />,
      label: "Share the page",
      className: "!bg-green-50  !border-gray-200 !text-black",
      onClick: handleComingSoonPopup,
    },
    {
      icon: <HouseIcon size={30} duration={1.05} color="black" />,
      label: "Go to Home",
      className: "!bg-green-50 !border-gray-200 !text-black",
      onClick: () => router.push("/"),
    },
    {
      icon: <PlayIcon size={30} duration={1.05} color="black" />,
      label: "Start as slideshow",
      className: "!bg-green-50 !border-gray-200 !text-black",
      onClick: handleComingSoonPopup,
    },
    {
      icon: <ImFontSize />,
      label: "Change Font Size",
      className: "!bg-blue-100  !border-gray-200 !text-black",
      onClick: handleComingSoonPopup,
    },
    {
      icon: <TiArrowRightThick />,
      label: "Next Page",
      className: "!bg-green-200  !border-gray-200 !text-black",
      onClick: handleNext,
    },
  ];

  console.log("👊🎁", pages);
  const page = pages[index];

  return (
    <div
      className={`bg-linear-to-r from-green-50 to-yellow-50 dark:bg-black w-screen h-screen flex flex-col justify-center items-center px-6 overflow-hidden`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={page.pageId} // Uses pageId (camelCase)
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          className="w-full h-full flex justify-center items-center absolute"
        >
          <PageContent page={page} onNext={handleNext} onPrev={handlePrev} />
          <ComingSoonDialog
            open={comingSoonOpen}
            onOpenChange={handleComingSoonPopup}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-0 w-full flex justify-center z-50 pointer-events-none">
        <div className="pointer-events-auto">
          <Dock className="bg-blue-200" items={items}></Dock>
        </div>
      </div>
    </div>
  );
}

export function PageContent(props: {
  page: Page;
  onNext: () => void;
  onPrev: () => void;
}) {
  const page = props.page;
  const router = useRouter();

  if (!page) return null;

  // FIX: Use the enum values or exact strings from the store
  switch (page.type) {
    case PageType.Text:
    case "text": // Fallback string check
      return (
        <div key={page.pageId}>
          <TextRenderer
            onAnimationComplete={() => {}}
            text={page.text || ""}
            index={page.pageId}
          />
        </div>
      );

    case PageType.Links:
    case "links":
      return (
        <motion.div
          key={page.pageId}
          className={`font-playwrite bg-yellow-50 dark:bg-black w-screen h-screen flex flex-col justify-center items-center px-4`}
        >
          {page.links?.map((link, index) => (
            <motion.div
              className="h-12 w-full max-w-xs rounded-3xl bg-blue-200 m-4 flex justify-center items-center cursor-pointer"
              whileHover={{ scale: 1.5, backgroundColor: "lightBlue" }}
              initial={{ scale: 0 }}
              animate={{
                scale: 1,
                transition: {
                  type: "spring" as const,
                  stiffness: 100,
                  damping: 8,
                },
              }}
              onClick={() => router.push(link)}
              key={`${page.pageId}-${index}`}
            >
              {/* FIX: Use link.text or link.description based on your store type */}
              <p className="px-4 text-center truncate">{link || link}</p>
            </motion.div>
          ))}
        </motion.div>
      );

    case PageType.TextWithMedia:
    case "text-with-media":
      return <TextWithMedia data={page as any} onNext={props.onNext} />;

    default:
      return <p>{"Got Error: Unknown type " + page.type}</p>;
  }
}

function TextWithMedia(props: {
  data: Page & { media?: any[] };
  onNext: () => void;
  index?: number;
}) {
  const [textDone, setTextDone] = useState(false);
  const [currImage, setCurrImage] = useState<number | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);

  const page = props.data;

  function handleImageHoverStart() {
    setCurrImage(slideIndex);
  }
  function handleImageHoverEnd() {
    setCurrImage(null);
  }

  const handleNextSlide = () => {
    if (page.media) setSlideIndex((prev) => (prev + 1) % page.media!.length);
  };

  const handlePrevSlide = () => {
    if (page.media)
      setSlideIndex(
        (prev) => (prev - 1 + page.media!.length) % page.media!.length,
      );
  };

  return (
    <motion.div
      key={page.pageId}
      className="bg-yellow-50 dark:bg-black w-screen h-screen flex flex-col md:flex-row justify-center items-center relative overflow-hidden"
    >
      <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-row justify-center items-center relative p-4 md:p-8 shrink-0">
        {page.media && page.media.length > 0 && (
          <>
            <button
              onClick={handlePrevSlide}
              className="absolute left-2 md:left-8 z-10 p-2 md:p-3 bg-blue-100 text-black rounded-full hover:bg-blue-300 transition-colors shadow-lg cursor-pointer"
            >
              <TiArrowLeftThick size={24} className="md:w-10 md:h-10" />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={slideIndex}
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.9 }}
                transition={{ duration: 0.1 }}
                onMouseEnter={handleImageHoverStart}
                onMouseLeave={handleImageHoverEnd}
                className="w-full h-full flex justify-center items-center"
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src={page.media[slideIndex].url}
                  height={800}
                  width={800}
                  alt="Image"
                  className="rounded-3xl object-contain max-h-[40vh] md:max-h-[80vh] w-auto shadow-2xl"
                />
              </motion.div>
            </AnimatePresence>

            <button
              onClick={handleNextSlide}
              className="absolute right-2 md:right-8 z-10 p-2 md:p-3 bg-blue-100 text-black rounded-full hover:bg-blue-300 transition-colors shadow-lg cursor-pointer"
            >
              <TiArrowRightThick size={24} className="md:w-10 md:h-10" />
            </button>
          </>
        )}
      </div>

      <div className="w-full md:w-1/2 h-1/2 md:h-full flex justify-center items-center px-4 overflow-hidden relative">
        <TextRenderer
          onAnimationComplete={() => setTextDone(true)}
          text={"text" in page ? page.text : ""}
          index={props.index}
        />
      </div>

      <AnimatePresence>
        {currImage !== null && page.media && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{
              opacity: 0,
              y: 50,
              x: "-50%",
              transition: { duration: 0.3 },
            }}
            className="absolute left-1/4 bottom-20 z-20 h-auto bg-green-200 shadow-2xl rounded-xl p-4 w-[400px] flex flex-col justify-center items-center text-black pointer-events-none"
          >
            <p className="text-2xl text-center">
              {page.media[currImage].description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function TextRenderer(props: {
  text: string;

  index?: number | string; // Updated to accept string pageId
  onAnimationComplete?: () => void;
  size?: "sm" | "md" | "lg";
  height?: number;
}) {
  const uniqueKey =
    props.index !== undefined ? props.index : props.text.substring(0, 2);
  const tokens = props.text.match(/\S+|\n/g) || [];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={uniqueKey}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onAnimationComplete={props.onAnimationComplete}
        className={`h-full w-full overflow-y-auto flex flex-col px-4`}
      >
        <div className="flex flex-row flex-wrap justify-center items-center w-full max-w-2xl shrink-0 my-auto mx-auto py-12">
          {tokens.map((token, index) => {
            if (token === "\n") {
              return (
                <div key={`${uniqueKey}-${index}`} className="w-full h-0" />
              );
            }

            return (
              <motion.p
                variants={wordVariants}
                style={props.height ? { height: `${props.height}px` } : {}}
                className={`text-2xl sm:text-3xl md:text-4xl mx-1 my-0.5 ${
                  props.size === "sm"
                    ? "text-sm"
                    : props.size === "md"
                      ? "text-md"
                      : "text-lg"
                }`}
                key={`${uniqueKey}-${index}`}
              >
                {token}
              </motion.p>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
