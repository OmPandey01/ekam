"use client";
import { useState } from "react";
import Source from "./source";
import NextButton from "@/components/page-turn-button";


import { AnimatePresence, motion } from "motion/react";
import { Coiny } from "next/font/google";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { StarIcon } from "@animateicons/react/lucide";
import { ShareIcon } from "@animateicons/react/lucide";
import { TiArrowLeftThick } from "react-icons/ti";
import { TiArrowRightThick } from "react-icons/ti";
import { ImFontSize } from "react-icons/im";

import Dock from "@/components/Dock";
import { Text } from "lucide-react";

  
const coiny = Coiny({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-coiny",
});

export interface MediaItem {
  type: string;
  url: string;
  description: string;
  height: number;
  width: number;
}

export interface LinkItem {
  text: string;
  url: string;
}

export interface PageData {
  pageId: string;
  type: string;
  text?: string;
  media?: MediaItem[];
  links?: LinkItem[];
}

export interface DocData {
  id: string;
  pages: PageData[];
}

const imagesContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // each image appears 0.2s after previous
    },
  },
};

const imageItemVariants = {
  hidden: { opacity: 0, x: -200, filter: "blur(20px)" }, // extreme left
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { type: "spring" as const, stiffness: 200, damping: 20 },
  },
};

const containerVariants = {
  hidden: { opacity: 0, filter: "blur(1px)" },
  visible: {
    opacity: 1,
    filter: "none",
    transition: {
      staggerChildren: 0.2,
      duration: 0.9,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 90, filter: "blur(100px)" },
  visible: {
    filter: "none",
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 200, damping: 15 },
  },
};

const imageVariant = {
  hidden: { opacity: 0, y: -90, filter: "blur(20px)" },
  visible: {
    filter: "none",
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 20,
      staggerChildren: 0.8,
      type: "spring" as const,
      stiffness: 200,
      damping: 15,
    },
  },
};

export default function Page(props: {
  data: DocData;
  title?: string;
  index?: number;
  onNext?: () => void;
  text?: string;
}) {


    const handleNext = () => {
    const nextIndex = (index + 1) % pages.length;
    setIndex(nextIndex);
  };
  const handlePrev = () => {
    const prevIndex = (index - 1 + pages.length) % pages.length;
    setIndex(prevIndex);
  };

 const items = [
    {
    icon: <TiArrowLeftThick />,
    label: " Previous Page",
    className: "!bg-green-200  !border-gray-200 !text-black",
    onClick:handlePrev,
  },
  {
    icon: <StarIcon size={30} duration={1.05} color="black" />,
    label: "Star the page",
    className: "!bg-amber-50 !border-gray-200 !text-black",
    onClick: () => alert("Page Starred!"),
  },
  {
    icon: <ShareIcon size={30} duration={1.05} color="black" />,
    label: "Share the page",
    className: "!bg-green-50  !border-gray-200 !text-black",
    onClick: () => alert("Page Starred!"),
  },

  {
    icon: <ImFontSize />,
    label: "Change Font Size",
    className: "!bg-blue-100  !border-gray-200 !text-black",
    onClick: () => alert("Camera!"),
  },

  {
    icon: <TiArrowRightThick />,
    label: "Next Page",
    className: "!bg-green-200  !border-gray-200 !text-black",
    onClick:handleNext,
  },
];





  const doc = props.data;
  const pages = doc.pages;
  const [index, setIndex] = useState(0);
  const page = pages[index];


  return (
    <div
      className={`${coiny.className} bg-yellow-50 dark:bg-black w-screen h-screen flex flex-col justify-center items-center px-6 overflow-hidden`}
    >
      <PageContent page={page} onNext={handleNext} onPrev={handlePrev} />
      <div className="absolute bottom-0 w-full flex justify-center z-50 pointer-events-none">
        <div className="pointer-events-auto">
          <Dock className="bg-blue-200" items={items}></Dock>
        </div>
      </div>
    </div>
  );
}

export function PageContent(props: { page: PageData; onNext: () => void ;onPrev:()=>void}) {
  const page = props.page;
  const router = useRouter();

  const items = [
    {
    icon: <TiArrowLeftThick />,
    label: " Previous Page",
    className: "!bg-green-200  !border-gray-200 !text-black",
    onClick:props.onPrev,
  },
  {
    icon: <StarIcon size={30} duration={1.05} color="black" />,
    label: "Star the page",
    className: "!bg-amber-50 !border-gray-200 !text-black",
    onClick: () => alert("Page Starred!"),
  },
  {
    icon: <ShareIcon size={30} duration={1.05} color="black" />,
    label: "Share the page",
    className: "!bg-green-50  !border-gray-200 !text-black",
    onClick: () => alert("Page Starred!"),
  },

  {
    icon: <ImFontSize />,
    label: "Change Font Size",
    className: "!bg-blue-100  !border-gray-200 !text-black",
    onClick: () => alert("Camera!"),
  },

  {
    icon: <TiArrowRightThick />,
    label: "Next Page",
    className: "!bg-green-200  !border-gray-200 !text-black",
    onClick:props.onNext,
  },
];


  if (!page) return null;

  switch (page.type) {
    case "text":
      return (
        <motion.div>
          <motion.div
            key={page.pageId}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={` font-playwrite  bg-yellow-50 mb-30  dark:bg-black w-[50vw] h-[80vh] flex flex-row flex-wrap  justify-center items-center px-6 my-10 `}
          >
          <TextRenderer
            onAnimationComplete={() => {}}
            text={page.text || ""}
            index={0}
          ></TextRenderer>
          </motion.div>


       

        </motion.div>
      );

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
              onClick={() => router.push(link.url)}
              key={`${page.pageId}-${index}`}
            >
              <p className="px-4 text-center truncate">{link.text}</p>
            </motion.div>
          ))}
      
         
        </motion.div>
      );

    case "text-with-media":
      return <TextWithMedia data={page} onNext={props.onNext}></TextWithMedia>;

    default:
      return <p>{"Got Error" + page.type}</p>;
  }
}

export function PageContent1(props: {
  page: PageData;
  index?: number;
  onNext: () => void;
}) {
  const page = props.page;
  const router = useRouter();

  if (!page) return null;

  switch (page.type) {
    case "text":
      return (
        <motion.div
          key={props.index}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 100 }}
          className={`${coiny.className} bg-yellow-50 w-screen h-screen flex flex-col justify-center items-center px-6 md:px-0`}
        >
          <div className="  flex flex-row flex-wrap justify-center content-center gap-y-2 ">
            {(page.text || "").split(" ").map((word, index) => (
              <motion.p
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                className="text-3xl md:text-4xl mx-1 my-0.5"
                key={`${page.pageId}-${index * 32}`}
              >
                {word}
              </motion.p>
            ))}
          </div>

      
        </motion.div>
      );

    case "links":
      return (
        <motion.div
          key={page.pageId}
          className={` bg-yellow-50 w-screen h-screen flex flex-col justify-center items-center px-4`}
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
              onClick={() => router.push(link.url)}
              key={`${page.pageId}-${index}`}
            >
              <p className="px-4 text-center truncate">{link.text}</p>
            </motion.div>
          ))}
        
        </motion.div>
      );

    case "text-with-media":
      return <TextWithMedia data={page} onNext={props.onNext}></TextWithMedia>;

    default:
      return <p>{"Got Error" + page.type}</p>;
  }
}

function TextWithMedia(props: {
  data: PageData;
  onNext: () => void;
  index?: number;
}) {
  const [textDone, setTextDone] = useState(false);
  const [currImage, setCurrImage] = useState<number | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);

  function handleImageHoverStart() {
    setCurrImage(slideIndex);
  }
  function handleImageHoverEnd() {
    setCurrImage(null);
  }

  const page = props.data;

  const handleNextSlide = () => {
    if (page.media) {
      setSlideIndex((prev) => (prev + 1) % page.media!.length);
    }
  };

  const handlePrevSlide = () => {
    if (page.media) {
      setSlideIndex((prev) => (prev - 1 + page.media!.length) % page.media!.length);
    }
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
              <TiArrowLeftThick size={24} className="md:w-10 md:h-10"/>
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={slideIndex}
                initial={{ opacity: 0, y: 100, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -100, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
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
              <TiArrowRightThick size={24} className="md:w-10 md:h-10"/>
            </button>
          </>
        )}
      </div>

      <div className="w-full md:w-1/2 h-1/2 md:h-full flex justify-center items-center px-4 overflow-hidden relative">
        <TextRenderer
          onAnimationComplete={() => setTextDone(true)}
          text={page.text || ""}
          index={props.index}
        ></TextRenderer>
      </div>

      <AnimatePresence>
        {currImage !== null && page.media && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 50, x: "-50%", transition: { duration: 0.3 } }}
            className="absolute left-1/4 bottom-20 z-20 h-auto bg-green-200 shadow-2xl rounded-xl p-4 w-[400px] flex flex-col justify-center items-center text-black pointer-events-none"
          >
            <p className="text-2xl text-center">{page.media[currImage].description}</p>
          </motion.div>
        )}
      </AnimatePresence>
     
    </motion.div>
  );
}

function TextRenderer(props: {
  text: string;
  index?: number;
  onAnimationComplete?: () => void;
}) {
  return (
    <motion.div
      key={props.index}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onAnimationComplete={props.onAnimationComplete}
      className={` ${coiny.className} h-full w-full overflow-y-auto flex flex-col px-4`}
    >
      <div className="flex flex-row flex-wrap justify-center items-center w-full max-w-2xl shrink-0 my-auto mx-auto py-12">
        {props.text.split(" ").map((word, index) => (
          <motion.p
            variants={wordVariants}
            className="text-2xl sm:text-3xl md:text-4xl mx-1 my-0.5"
            key={`${props.index}-${index}`}
          >
            {word}
          </motion.p>
        ))}
      </div>
    </motion.div>
  );
}
