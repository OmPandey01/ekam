"use client";
import { useState } from "react";
import Source from "./source";
import NextButton from "@/components/page-turn-button";
import TimerControl from "@/components/timer";

import { AnimatePresence, motion } from "motion/react";
import { Coiny } from "next/font/google";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
  const doc = props.data;
  const pages = doc.pages;
  const [index, setIndex] = useState(0);
  const page = pages[index];

  const handleNext = () => {
    const nextIndex = (index + 1) % pages.length;
    setIndex(nextIndex);
  };
  return (
    <div
      className={`${coiny.className} bg-yellow-50 dark:bg-black w-screen h-screen flex flex-col justify-center items-center px-6`}
    >
      <PageContent page={page} onNext={handleNext} />
    </div>
  );
}

export function PageContent(props: { page: PageData; onNext: () => void }) {
  const page = props.page;
  const router = useRouter();

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
            className={`${coiny.className} bg-yellow-50  dark:bg-black w-[50vw] h-40 flex flex-row flex-wrap  justify-center items-center px-6`}
          >
            {(page.text || "").split(" ").map((word, index) => (
              <motion.p
                variants={wordVariants}
                className="text-3xl md:text-4xl mx-1 my-0.5"
                key={`${page.pageId}-${index}`}
              >
                {word}
              </motion.p>
            ))}
          </motion.div>

          <div className="w-[150px] h-[70px] rounded-full flex flex-col justify-center items-center absolute top-20 right-10">
            <TimerControl onClick={props.onNext} />
          </div>
          <div className="w-[150px] h-[70px] rounded-full flex flex-col justify-center items-center absolute bottom-10 right-10">
            <NextButton onClick={props.onNext} />
          </div>
        </motion.div>
      );

    case "links":
      return (
        <motion.div
          key={page.pageId}
          className={`${coiny.className} bg-yellow-50 dark:bg-black w-screen h-screen flex flex-col justify-center items-center px-4`}
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
          <div className="w-[150px] h-[70px] rounded-full flex flex-col justify-center items-center absolute top-20 right-10">
            <TimerControl onClick={props.onNext} />
          </div>
          <div className="w-[150px] h-[70px] rounded-full flex flex-col justify-center items-center absolute bottom-10 right-10">
            <NextButton onClick={props.onNext} />
          </div>
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
          className={`${coiny.className} bg-yellow-50 w-screen h-screen flex flex-col justify-center items-center px-6`}
        >
          <div className="  flex flex-row flex-wrap justify-center content-center gap-y-2 max-w-xl">
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

          <div className="w-[150px] h-[70px] rounded-full flex flex-col justify-center items-center absolute top-20 right-10">
            <TimerControl onClick={props.onNext} />
          </div>
          <div className="w-[150px] h-[70px] rounded-full flex flex-col justify-center items-center absolute bottom-10 right-10">
            <NextButton onClick={props.onNext} />
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
          <div className="w-[150px] h-[70px] rounded-full flex flex-col justify-center items-center absolute top-20 right-10">
            <TimerControl onClick={props.onNext} />
          </div>
          <div className="w-[150px] h-[70px] rounded-full flex flex-col justify-center items-center absolute bottom-10 right-10">
            <NextButton onClick={props.onNext} />
          </div>
          <div className="w-[150px] h-[70px] rounded-full flex flex-col justify-center items-center absolute bottom-10 right-10">
            <NextButton onClick={props.onPrev} />
          </div>
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

  function handleImageHoverStart(index: number) {
    setCurrImage(index);
  }
  function handleImageHoverEnd(index: number) {
    setCurrImage(null);
  }
  const page = props.data;
  return (
    <motion.div
      key={page.pageId}
      className="bg-yellow-50dark:bg-black w-screen  flex flex-row justify-center items-center relative"
    >
      <motion.div
        className=" h-auto relative w-full  overflow-x-auto scroll-smooth snap-y snap-mandatory flex flex-col justify-center items-center"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2  h-auto w-full items-center justify-center gap-4 px-8"
        >
          {page.media?.map((mediaItem, index) => (
            <motion.div
              key={index}
              variants={imageVariant}
              initial="hidden"
              animate="visible"
              whileHover={{
                scale: 1.1,
                marginLeft: 30,
                marginRight: 10,
              }}
              onMouseEnter={() => handleImageHoverStart(index)}
              onMouseLeave={() => handleImageHoverEnd(index)}
              className="col-start-auto snap-start shrink-0"
            >
              <Image
                src={mediaItem.url}
                height={400}
                width={400}
                alt="Image"
                className="rounded-3xl object-cover my-5"
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      <div>
        <TextRenderer
          onAnimationComplete={() => setTextDone(true)}
          text={page.text || ""}
          index={props.index}
        ></TextRenderer>
      </div>

      <AnimatePresence>
        {currImage !== null && page.media && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: -10 }}
            exit={{ opacity: 0.5, x: 10, transition: { duration: 1 } }}
            className="absolute right-10 bottom-20  h-auto mt-2 bg-green-200 shadow-2xl rounded-lg p-2 w-128 flex flex-col justify-center items-center"
          >
            <p className="text-2xl">{page.media[currImage].description}</p>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="w-[150px] h-[70px] rounded-full flex flex-row justify-center items-center  absolute bottom-14 right-10">
        <NextButton onClick={props.onNext} />
      </div>
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
      className={` ${coiny.className} h-full flex flex-col justify-center items-center px-10`}
    >
      <div className="  flex flex-row flex-wrap m-3 justify-center items-center h-screen  w-[70vw] content-center max-w-2xl">
        {props.text.split(" ").map((word, index) => (
          <motion.p
            variants={wordVariants}
            className="text-3xl md:text-4xl mx-1 my-0.5"
            key={`${props.index}-${index}`}
          >
            {word}
          </motion.p>
        ))}
      </div>
    </motion.div>
  );
}
