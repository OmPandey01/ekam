"use client";
import Page from "@/components/article-page";
import api from "@/api-controllers/api";

// import { collection } from "@/data/data";

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
  const [data, setData] = useState(null);
  useEffect(() => {
    const getId = async () => {
      const { id } = await params;
      setId(id);
    };
    getId();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const response = await api.get(`/articles/${id}`);
        const data = response.data.document.data;
        console.log("data👌", data);
        setData(data);
      }
    };
    fetchData();
  }, [id]);

  console.log("😅", data);
  return <div>{data && <Page data={data} title="Here is the title" />} </div>;
}
