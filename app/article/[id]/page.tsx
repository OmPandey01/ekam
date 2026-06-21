"use client";
import Page from "@/components/article-page";

// import { collection } from "@/data/data";

import { doc1 } from "@/data/data";
import { useDocumentStore } from "@/store/documentStore";
import { CoreDocument } from "@/types/types";
import { useState, useEffect } from "react";
export enum PageType {
  Text = "text",
  Links = "links",
  TextWithMedia = "text-with-media",
}

export default function Article({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [id, setId] = useState("");
  useEffect(() => {
    const getId = async () => {
      const { id } = await params;
      setId(id);
    };
    getId();
  }, [id]);
  const collection = useDocumentStore((state) => state.documents);
  const data = collection[id];
  // console.log("😅", data);
  return <div>{data && <Page data={data} title="Here is the title" />} </div>;
}
