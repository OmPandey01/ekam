"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import api from "@/api-controllers/api";
import { useEffect, useState } from "react";
import { IoLogOut } from "react-icons/io5";
import { CoreDocument } from "@/types/types";
import { useRouter } from "next/navigation";

export default function TabsLine() {
  return (
    <Tabs defaultValue="Unlisted">
      <TabsList variant="line">
        <TabsTrigger className=" w-[50vw]" value="Unlisted">
          Unlisted
        </TabsTrigger>
        <TabsTrigger value="published">Published</TabsTrigger>
        <TabsTrigger value="ideas">Ideas</TabsTrigger>
      </TabsList>
      <TabsContent value="Unlisted">
        <UnlistedArticles />
      </TabsContent>
      <TabsContent value="published">
        <PublishedArticles />
      </TabsContent>
      {/*<TabsContent value="ideas">
        <IdeasArticles />
      </TabsContent>*/}
    </Tabs>
  );
}

function UnlistedArticles() {
  const [data, setData] = useState<Record<string, CoreDocument>>();
  const router = useRouter();

  useEffect(() => {
    const fetchUnlistedArticles = async () => {
      const response: {
        success: boolean;
        count: number;
        documents: Record<string, CoreDocument>;
      } = await api.get("/documents/unpublished/me");
      const data = response.documents;
      setData(data);
    };
    fetchUnlistedArticles();
  }, []);
  return (
    (data && (
      <div>
        {Object.values(data).map((doc) => (
          <div onClick={() => router.push(`/editor/${doc.id}`)} key={doc.id}>
            {doc.title}
          </div>
        ))}
      </div>
    )) || (
      <div className="flex justify-center items-center h-screen w-full">
        <p>No articles yet</p>
      </div>
    )
  );
}

function PublishedArticles() {
  const [data, setData] = useState<Record<string, CoreDocument>>({});
  const router = useRouter();

  useEffect(() => {
    const fetchUnlistedArticles = async () => {
      const response: {
        success: boolean;
        count: number;
        documents: Record<string, CoreDocument>;
      } = await api.get("/documents/published/all");
      const data = response.documents;
      setData(data);
    };
    fetchUnlistedArticles();
  }, []);
  return (
    (data && (
      <div>
        {Object.values(data).map((doc) => (
          <div onClick={() => router.push(`/article/${doc.id}`)} key={doc.id}>
            {doc.title}
          </div>
        ))}
      </div>
    )) || (
      <div className="flex justify-center items-center h-screen w-full">
        <p>No published articles</p>
      </div>
    )
  );
}

function NoDataAvailable() {
  const unlistedMotivations = [
    "Go on to write your first article",
    "Your activities will appear here,but first you need to write something",
    "Go ahead and write your first article",
  ];
  const toPublishMotivations = [
    "Go ahead and publish your first article",
    "Let the world see that you exist in this corner of the world by sharing your first article",
  ];
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <p>No data available</p>
    </div>
  );
}
