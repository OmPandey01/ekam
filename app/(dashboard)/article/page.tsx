"use client";
import Page from "@/components/article-page";

import Source from "@/components/source";
import { useState } from "react";
import { PiFireSimpleBold } from "react-icons/pi";

import { StarIcon } from "@animateicons/react/lucide";
import { ShareIcon } from "@animateicons/react/lucide";
import { ImFontSize } from "react-icons/im";

import {doc1} from "@/data/data";

import Dock from "@/components/Dock";

export enum PageType {
  Text = "text",
  Links = "links",
  TextWithMedia = "text-with-media",
}

const items = [
  {
    icon: <StarIcon size={30} duration={1.05} color="black" />,
    label: "Star the page",
    className: "!bg-amber-50 !border-gray-200 !text-black",
    onClick: () => alert("Page Starred!"),
  },
  {
    icon: <ShareIcon size={30} duration={1.05} color="black" />,
    label: "Share the page",
    className: "!bg-green-50  !border-gray-200 !text-black",
    onClick: () => alert("Page Starred!"),
  },

  {
    icon: <ImFontSize />,
    label: "Change Font Size",
    className: "!bg-blue-100  !border-gray-200 !text-black",
    onClick: () => alert("Camera!"),
  },
];





const doc12 = {
  id: "doc_poverty_india",
  pages: [
    {
      pageId: "poverty_page_4",
      type: PageType.TextWithMedia,
      text: "By 2025, the national extreme poverty rate could drop to 4-4.5%, nearing complete eradication.",
      media: [
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1591866497533-403d44694fa1?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          description:
            "An aerial view of a bustling yet improvised urban neighborhood in India",
          height: 200,
          width: 200,
        },
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1591866497533-403d44694fa1?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          description:
            "An aerial view of a bustling yet improvised urban neighborhood in India",
          height: 200,
          width: 200,
        },
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1591866497533-403d44694fa1?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          description:
            "An aerial view of a bustling yet improvised urban neighborhood in India",
          height: 200,
          width: 200,
        },
      ],
    },
    {
      pageId: "poverty_page_5",
      type: PageType.TextWithMedia,
      text: "By 2025, the national extreme poverty rate could drop to 4-4.5%, nearing complete eradication.",
      media: [
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1591866497533-403d44694fa1?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          description:
            "An aerial view of a bustling yet improvised urban neighborhood in India",
          height: 200,
          width: 200,
        },
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1591866497533-403d44694fa1?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          description:
            "An aerial view of a bustling yet improvised urban neighborhood in India",
          height: 200,
          width: 200,
        },
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1591866497533-403d44694fa1?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          description:
            "An aerial view of a bustling yet improvised urban neighborhood in India",
          height: 200,
          width: 200,
        },
      ],
    },
  ],
};
const data = [
  {
    text: "Hey Om you are stronger than you think, And to prove this here are some links that you must go through atleast once, And to prove this here are some links that you must go through atleast once, And to prove this here are some links that you must go through atleast once",
    type: "text",
  },
  {
    text: "And to prove this here are some links that you must go through atleast once",
    type: "text",
  },
  {
    type: "links",
    links: [
      {
        text: "Ap article",
        url: "https://acharyaprashant.org//",
      },
      {
        text: "Psychology",
        url: "https://psychology.org//",
      },
      {
        text: "Ap article",
        url: "https://acharyaprashant.org//",
      },
      {
        text: "Psychology",
        url: "https://psychology.org//",
      },
    ],
  },
];

export default function Article() {
  const [idx, setIdx] = useState(0);

  const handleNext = () => {
    setIdx((prevIdx) => (prevIdx + 1) % data.length);
  };
  const handlePrev = () => {
    setIdx((prevIdx) => (prevIdx - 1 + data.length) % data.length);
  };
  return (
    <div>
      <Page
        data={doc1}
        title="Here is the title"
        index={idx}
        onNext={handleNext}
        text="Hey Om you are stronger than you think"
      ></Page>

     
    </div>
  );
}
