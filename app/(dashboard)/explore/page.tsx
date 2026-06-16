"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { FaPlus } from "react-icons/fa";
import ArticleCard from "@/components/article-card";
import { collection } from "@/data/data";
import { BiCategory } from "react-icons/bi";

const SpritualityTopics = [
  {
    name: "Rabindranath Tagore",
    tagline: "His writings will inspire you to live a life of peace and love.",
    thumbnail:
      "https://res.cloudinary.com/dtw828to0/image/upload/v1781462085/Rabindranath_Ji_gdj8ui.webp",
    category: "Sprituality, Writings, Poems, life_lessons",
  },
  {
    name: "Rumi",
    tagline: "Her poetry will guide you on your journey to self-discovery.",
    thumbnail:
      "https://res.cloudinary.com/dtw828to0/image/upload/v1781462228/Rumi-Persian-Poet_ruen1s.webp",
    category: "Sprituality, Writings, Poems, life_lessons",
  },
  {
    name: "Swami Vivekananda",
    tagline:
      "His teachings will guide you on your path to spiritual enlightenment and Practical Vedanta.",
    thumbnail:
      "https://res.cloudinary.com/dtw828to0/image/upload/v1781462518/swami-vivekananda-jayanti-2024-120006920-16x9_oinsyy.avif",
    category: "Sprituality, Writings, Poems, life_lessons",
  },
  {
    name: "Kabeer Das",
    tagline:
      "His writings will guide you on your journey to spiritual enlightenment.",
    thumbnail:
      "https://res.cloudinary.com/dtw828to0/image/upload/v1781463105/2f338efb038d4c992d108837e8ce40e8_pa0agb.jpg",
    category: "Sprituality, Writings, Poems, life_lessons",
  },
];

type Topic = {
  name: string;
  tagline: string;
  thumbnail: string;
  category: string;
};

const Categories = [
  {
    category: "Sprituality",
    topics: SpritualityTopics,
  },
];

export function ListOfTopics({
  topics,
  category,
}: {
  topics: Topic[];
  category: string;
}) {
  return (
    <div className="ml-5">
      <div className=" border-b-2 border-b-black my-3">
        <p className="text-2xl font-bold font-coiny">{category}</p>
      </div>

      <div className=" w-screen flex flex-row overflow-scroll">
        {topics.map((topic, index) => (
          <motion.div
            key={index}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.9,
              staggerChildren: 3,
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="mx-2 bg-amber-100 rounded-2xl"
            >
              <div className="h-[150px] w-[350px] rounded-t-2xl overflow-hidden  ">
                <Image
                  src={topic.thumbnail}
                  alt={topic.name}
                  height={200}
                  width={200}
                  objectFit="cover"
                  className="w-200 overflow-clip "
                />
              </div>
              <div className="h-[150px] w-[350px] rounded-b-2xl overflow-hidden ">
                <p className="text-2xl font-bold font-coiny my-4 mx-3">
                  {topic.name}
                </p>
                <p className="text-sm font-bold font-coiny my-2 mx-3">
                  {topic.tagline}
                </p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function Explore() {
  const router = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className=" rounded-3xl h-screen w-full flex justify-between items-center p-0"
    >
      <div className="h-screen">
        {Categories.map((category, index) => (
          <ListOfTopics
            key={index}
            topics={category.topics}
            category={category.category}
          />
        ))}
      </div>
    </motion.div>
  );
}
