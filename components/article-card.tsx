import { Document } from "../data/data";
import Image from "next/image";
import { BiRepost } from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";
import { PiHandsClapping } from "react-icons/pi";

const ArticleCard = ({ document }: { document: Document }) => {
  return (
    <div className="flex flex-row w-full h-40 justify-between bg-white  shadow-lg ">
      <div className="p-2 flex flex-col justify-between">
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

        <div className="flex flex-row justify-between items-center">
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
        </div>
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
  );
};

export default ArticleCard;
