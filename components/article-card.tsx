import { CoreDocument } from "../data/data";
import Image from "next/image";
import { BiRepost } from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";
import { PiHandsClapping } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Calendar, Heart, Play, User } from "lucide-react";
import { CLIENT_PUBLIC_FILES_PATH } from "next/dist/shared/lib/constants";
import { Button } from "./ui/button";

const ArticleCard = ({
  document,
  isVertical = false,
}: {
  document: CoreDocument;
  isVertical?: boolean;
  isFeatured?: boolean;
}) => {
  const router = useRouter();
  return (
    (!isVertical && (
      <div
        onClick={() => router.push(`article/${document.id}`)}
        className=" flex flex-row w-full  h-40 justify-between bg-blue-100 my-12 rounded-2xl "
      >
        <div className="p-2 flex flex-col justify-between ">
          <div className="flex flex-row items-center">
            <div className="h-5 w-5 rounded-full bg-blue-500"></div>
            <h2 className="mt-2 m-2 text-gray-400">
              {document.author} {document.date}
            </h2>
          </div>
          <h2 className="text-gray-600 font-bold text-2xl">{document.title}</h2>
          <p className="text-gray-500">{document.author}</p>
          <p className="text-gray-500">{document.date}</p>
          <p>{document.music}</p>

          {/*<div className="flex flex-row justify-between items-center">
            <div className="flex flex-row items-center">
              <AiFillLike />
              <p className="m-1">{document.stats?.likes}</p>
            </div>
            <div className="flex flex-row items-center">
              <BiRepost />
              <p className="m-1">{document.stats?.repost}</p>
            </div>
            <div className="flex flex-row items-center">
              <PiHandsClapping />
              <p className="m-1">{document.stats?.upvote}</p>
            </div>
          </div>*/}
        </div>
        {document.thumbnailUrl && (
          <Image
            height={200}
            width={200}
            src={document.thumbnailUrl}
            alt={document.title}
            className=" w-auto m-5"
          />
        )}
      </div>
    )) ||
    (isVertical && (
      <div className=" m-5 rounded-2xl w-[400px] bg-gray-50  flex flex-col ">
        {document.thumbnailUrl && (
          <div className="overflow-clip w-full h-40 rounded-t-2xl ">
            <Image
              height={300}
              width={300}
              src={document.thumbnailUrl}
              alt={document.title}
              className=" h-[300px] w-auto object-cover"
            />
          </div>
        )}
        <div className="flex mt-5 flex-col w-auto pl-5  justify-centeritems-center">
          <p className="  font-bold text-2xl">{document.title}</p>
          <p className="text-gray-500">{document.author}</p>
        </div>
        <div className="flex flex-col w-auto pl-3  justify-centeritems-center">
          <ColoredTags tags={["Psychology", "History", "Humanities"]} />
        </div>
        <div className="flex flex-col w-auto  justify-center items-center">
          <Button
            className="bg-lime-300 font-bold text-black w-full hover:bg-lime-400 rounded-b-full rounded-r-full h-10"
            onClick={() => router.push(`article/${document.id}`)}
          >
            Read It
          </Button>
        </div>

        {/*
        <div className="flex flex-row justify-between items-center pl-5 pr-5">
          <div className="flex flex-row items-center">
            <AiFillLike />
            <p className="m-1">{document.stats?.likes}</p>
          </div>
          <div className="flex flex-row items-center">
            <BiRepost />
            <p className="m-1">{document.stats?.repost}</p>
          </div>
          <div className="flex flex-row items-center">
            <PiHandsClapping />
            <p className="m-1">{document.stats?.upvote}</p>
          </div>
        </div>*/}
      </div>
    ))
  );
};

type FeaturedArticleProps = {
  document: CoreDocument;
};

export function ColoredTags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-row">
      {tags.map((tag, index) => (
        <div
          key={index}
          onClick={() =>
            alert(
              "You can access all article in this category, this feature is coming later this week.",
            )
          }
          className="bg-blue-100  hover:bg-blue-400 active:bg-blue-800 m-1 flex flex-row justify-center items-center text-white rounded-full px-3 py-1 text-sm font-medium"
        >
          <div className="bg-blue-500  rounded-full h-2 w-2 m-2"></div>
          <span className="font-black text-black ">{tag}</span>
        </div>
      ))}
    </div>
  );
}

export function FeaturedArticle({ document }: FeaturedArticleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm"
    >
      <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
        {/* Thumbnail */}
        <div className="relative h-[320px] overflow-hidden">
          <img
            src={document.thumbnailUrl || "/placeholder.jpg"}
            alt={document.title}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          />

          <span className="absolute left-5 top-5 rounded-full bg-black/70 px-4 py-1 text-sm font-medium text-white backdrop-blur">
            Featured
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between p-8">
          <div>
            {document.music && (
              <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                Motion Reading
              </span>
            )}

            <h2 className="mt-4 text-4xl font-bold leading-tight text-neutral-900">
              {document.title}
            </h2>

            <p className="mt-4 text-lg leading-7 text-neutral-500">
              Experience this story with animated transitions and synchronized
              visuals.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-neutral-500">
              {document.author && (
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span>{document.author}</span>
                </div>
              )}

              {document.date && (
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{document.date}</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex gap-6 text-sm text-neutral-600">
              <div className="flex items-center gap-2">
                <Play size={16} />
                <span>
                  {document.pages.length} scene
                  {document.pages.length !== 1 ? "s" : ""}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Heart size={16} />
                <span>{document.stats?.likes ?? 0}</span>
              </div>

              <div>👁 {document.stats?.upvote ?? 0}</div>
            </div>

            <button className="rounded-full bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800">
              Continue →
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
export default ArticleCard;
