import Page from "@/components/article-page";

import { collection } from "@/data/data";

import { doc1, CoreDocument } from "@/data/data";

export enum PageType {
  Text = "text",
  Links = "links",
  TextWithMedia = "text-with-media",
}

export default async function Article({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = collection.find((doc) => doc.id === id);
  console.log("😅", data);
  return (
    <div>
      {data && (
        <Page
          data={data}
          title="Here is the title"
          text="Hey Om you are stronger than you think"
        />
      )}{" "}
    </div>
  ) }