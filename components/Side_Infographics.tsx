"use client";
import { motion, Variants } from "framer-motion";
import { TextRenderer } from "@/components/article-page";
import { BookOpen, Sparkles, Zap, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { whyEkam } from "@/data/data";
import Image from "next/image";

const features = [
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: "Motion-First",
    description: "Reading that breathes with you",
  },
  {
    icon: <BookOpen className="h-5 w-5" />,
    title: "Deep Focus",
    description: "No noise. Just words that matter",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Instant Flow",
    description: "Zero friction. Pure immersion",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 12, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const slideInLeft: Variants = {
  hidden: { x: -40, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export function TextRendererWithTimer({ data }: { data: string[] }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!data || data.length <= 1) {
      setIdx(0);
      return;
    }
    const timer = setTimeout(() => {
      setIdx((prevIdx) => (prevIdx + 1) % data.length);
    }, 5000);
    return () => clearTimeout(timer);
  }, [idx, data?.length]);

  const textToRender = data && data[idx] ? data[idx] : "";

  return (
    <div className="min-h-[60vh]">
      <TextRenderer text={textToRender} />
    </div>
  );
}

export default function SideInfoGraphics({ data }: { data: string[] }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={slideInLeft}
      className="relative h hidden lg:flex flex-col bg-yellow-50 dark:bg-neutral-950 border-r border-neutral-200 dark:border-neutral-800 p-10 xl:p-14 overflow-y-auto"
    >
      <div className="relative bg-b z-10 flex flex-col h-full gap-12">
        {/* Brand */}
        {/*<motion.div variants={itemVariants}>
          <div className="flex items-center gap-2">
            <Image
              src="/ekam-logo.png"
              alt="Ekam"
              width={48}
              height={24}
              className="rounded-full"
            />
            <span className="font-mono text-xs tracking-wider text-neutral-400 uppercase">
              Ekam
            </span>
          </div>
        </motion.div>*/}

        {/* Rotating message - high contrast, clean typography */}
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="text-4xl sm:text-5xl font-medium tracking-tight text-neutral-900 dark:text-neutral-50 leading-[1.2]">
            <TextRendererWithTimer data={data} />
          </div>

          <p className="text-black font-bold  dark:text-neutral-400 text-base leading-relaxed max-w-sm">
            Early access — Please Note that Ekam is in very early stages, we
            will be very happy if you could give us some feedback.
          </p>
        </motion.div>

        {/* Features - minimal, scannable */}
        {/*<motion.div variants={containerVariants} className="space-y-5">
          <p className="text-xs font-mono tracking-wider text-neutral-400 uppercase">
            Why it works
          </p>
          <div className="space-y-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-center gap-3 group cursor-default"
              >
                <div className="text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors duration-200">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-neutral-400">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>*/}

        {/* Footer - subtle, no fake quotes */}
        <motion.div variants={itemVariants} className="mt-auto pt-8">
          <div className="border-t border-neutral-100 dark:border-neutral-800 pt-6">
            <button className="group flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
              Learn more
              <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
