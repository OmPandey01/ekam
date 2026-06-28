import { motion } from "framer-motion";

function SkeletonCard() {
  return (
    <motion.div
      className="flex gap-6 p-6 rounded-3xl bg-white shadow-sm border"
      animate={{ opacity: [0.55, 1, 0.55] }}
      transition={{
        repeat: Infinity,
        duration: 1.3,
      }}
    >
      <div className="w-72 h-44 rounded-2xl bg-gray-200" />

      <div className="flex-1 space-y-4">
        <div className="h-8 w-2/3 rounded bg-gray-200" />
        <div className="h-5 w-1/4 rounded bg-gray-200" />
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-4/5 rounded bg-gray-200" />
        <div className="h-10 w-36 rounded-xl bg-gray-200 mt-8" />
      </div>
    </motion.div>
  );
}

export default function Loading() {
  return (
    <div className="space-y-6">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}
