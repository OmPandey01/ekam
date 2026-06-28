"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

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

const HistoryTopics = [
  {
    name: "Ancient Rome",
    tagline: "Explore the rise and fall of the Roman Empire.",
    thumbnail: "",
    category: "History, Rome, Ancient",
  },
  {
    name: "World War II",
    tagline: "Understand the global conflict that shaped the modern world.",
    thumbnail: "",
    category: "History, War, 20th Century",
  },
  {
    name: "Indus Valley Civilization",
    tagline: "Discover one of the earliest urban cultures of the world.",
    thumbnail: "",
    category: "History, India, Ancient",
  },
];

const EvolutionTopics = [
  {
    name: "Human Evolution",
    tagline: "Trace the journey of Homosapiens from our earliest ancestors.",
    thumbnail: "",
    category: "Evolution, Biology, Human",
  },
  {
    name: "Darwin's Theory",
    tagline: "Learn about natural selection and the origin of species.",
    thumbnail: "",
    category: "Evolution, Science, Darwin",
  },
  {
    name: "Dinosaur Extinction",
    tagline: "Uncover the events that led to the end of the dinosaurs.",
    thumbnail: "",
    category: "Evolution, Paleontology, Dinosaurs",
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
  {
    category: "History",
    topics: HistoryTopics,
  },
  {
    category: "Evolution",
    topics: EvolutionTopics,
  },
];

export function ListOfTopics({
  topics,
  category,
}: {
  topics: Topic[];
  category: string;
}) {
  const router = useRouter();
  
  return (
    <div className="ml-5 mt-4">
      <div className=" border-b-2 border-b-black my-3 mr-6">
        <p className="text-2xl font-bold font-coiny">{category}</p>
      </div>

      <div className=" w-full flex flex-row overflow-x-auto pb-6 gap-4 pr-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style>{`.overflow-x-auto::-webkit-scrollbar { display: none; }`}</style>
        {topics.map((topic, index) => (
          <motion.div
            key={index}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.9,
              staggerChildren: 3,
            }}
            onClick={() => router.push(`/search?q=${encodeURIComponent(topic.name)}`)}
            className="cursor-pointer shrink-0"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="bg-amber-100 rounded-2xl w-[350px] shadow-sm hover:shadow-md transition-all h-[300px] flex flex-col overflow-hidden hover:scale-[1.02]"
            >
              {topic.thumbnail ? (
                <div className="h-[150px] w-full relative bg-gray-200 shrink-0">
                  <Image
                    src={topic.thumbnail}
                    alt={topic.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ) : (
                <div className="h-[150px] w-full shrink-0 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                  <span className="text-white text-5xl font-coiny opacity-50 select-none">
                    {topic.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              
              <div className="flex flex-col p-4 flex-1 justify-start">
                <p className="text-2xl font-bold font-coiny mb-2 text-gray-900 line-clamp-1">
                  {topic.name}
                </p>
                <p className="text-sm font-semibold font-coiny text-gray-600 line-clamp-3">
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
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className=" rounded-3xl h-full w-full flex flex-col p-0 overflow-hidden bg-amber-50"
    >
      <div className="h-full overflow-y-auto pb-20">
        <div className="p-6 pb-2">
          <h1 className="text-4xl font-bold font-coiny text-gray-800">Explore</h1>
          <p className="text-gray-500 mt-2">Discover new ideas and topics.</p>
        </div>
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
