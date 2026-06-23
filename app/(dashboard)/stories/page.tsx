"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import api from "@/api-controllers/api";
import { useEffect, useState } from "react";
import { IoLogOut } from "react-icons/io5";
import { CoreDocument } from "@/types/types";
import { useRouter } from "next/navigation";
import IntervalText from "@/components/Interval-text";
import ArticleCard from "@/components/article-card";
import { ProtectedRoute } from "@/components/ProtectedRoutes";

export default function TabsLine() {
  return (
    <ProtectedRoute>
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
    </ProtectedRoute>
  );
}

function UnlistedArticles() {
  const onDelete = async (id: string) => {
    const res = await api.delete(`/documents/${id}`, {
      withCredentials: true,
    });
    if (res.status === 200) {
      setData(data.filter((doc: any) => doc.id !== id));
    }
  };
  const [data, setData] = useState<any>(null);
  const router = useRouter();
  const unlistedMotivations = [
    "Go on to write your first article",
    "Your activities will appear here,but first you need to write something",
    "Go ahead and write your first article",
  ];

  useEffect(() => {
    const fetchUnlistedArticles = async () => {
      const response = await api.get("/documents/unpublished/me");
      const data = response.data.documents;
      console.log(" Published docs are   ", data);
      setData(data);
    };
    fetchUnlistedArticles();
  }, []);
  return (
    (data && (
      <div>
        {data.map((record: any, index: number) => (
          <div
            onClick={() => router.push(`/editor/?docId=${record.data.id}`)}
            key={index}
          >
            <ArticleCard
              onDelete={onDelete}
              deleteMode={true}
              document={record.data}
            ></ArticleCard>
          </div>
        ))}
      </div>
    )) || (
      <div className="flex justify-center items-center h-screen w-full">
        <NoDataAvailable data={unlistedMotivations} />
      </div>
    )
  );
}

function PublishedArticles() {
  const [data, setData] = useState<any>([]);
  const router = useRouter();
  const onDelete = async (id: string) => {
    const res = await api.delete(`/documents/${id}`, {
      withCredentials: true,
    });
    if (res.status === 200) {
      setData(data.filter((doc: any) => doc.id !== id));
    }
  };
  const toPublishMotivations = [
    "Go ahead and publish your first article",
    "Let the world see that you exist in this corner of the world by sharing your first article",
  ];

  useEffect(() => {
    const fetchUnlistedArticles = async () => {
      const response: {
        success: boolean;
        count: number;
        documents: any;
        data: any;
      } = await api.get("/documents/published/all");
      const data = response.data.documents;
      console.log("Published docs are ", data);
      setData(data);
    };
    fetchUnlistedArticles();
  }, []);
  return (
    (data && (
      <div>
        {data.map((entry: any, index: number) => (
          <div
            onClick={() => router.push(`/editor/?docId=${entry.document_id}`)}
            key={index}
          >
            <ArticleCard
              onDelete={onDelete}
              deleteMode={true}
              document={entry.document.data}
            ></ArticleCard>
          </div>
        ))}
      </div>
    )) || (
      <div className="flex justify-center items-center h-screen w-full">
        <NoDataAvailable data={toPublishMotivations} />
      </div>
    )
  );
}

function NoDataAvailable(props: { data: string[] }) {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <IntervalText data={props.data} />
    </div>
  );
}
