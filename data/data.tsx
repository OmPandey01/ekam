//Guideline for content
// I am making this platform specifically to make reading more engaging and interactive for everyone.
// So the content should be concise, engaging and informative.
//  It should be written in a way that captures the reader's attention and keeps them interested
// throughout the CoreDocument.
//  The content should also be well-researched and accurate,
//  providing valuable information to the reader. Additionally,
//  it should be organized in a clear and logical manner, making it easy for readers to follow along
// and understand the key points being presented.
// import {
//   rumi_guest_house,
//   rumi_only_breath,
//   rumi_two_intelligences,
// } from "./rumiData";

import { Page, PageType, CoreDocument } from "@/store/documentStore";

import { title } from "motion/react-client";

// enum SoundEffect {
//   None = "none",
//   glass = "glass",
//   paper = "paper",
//   typing = "typing",
//   nature = "nature",
//   city = "city",
//   crowd = "crowd",
//   music = "music",
// }

// export enum PageType {
//   Text = "text",
//   Links = "links",
//   TextWithMedia = "text-with-media",
// }

// export type Media = {
//   type: "image";
//   url: string;
//   description: string;
//   height?: number;
//   width?: number;
//   details?: any;
// };

// type Link = {
//   url: string;
//   description: string;
//   priority?: number;
// };

// type PageStyle = {
//   backgroundType?: "color" | "image" | "gradient";
//   backgroundColor?: string;
//   backgroundImage?: string;
// };

// export type BasePage = {
//   pageId: string;
//   text: string;
// };

// export type Page = BasePage &
//   (
//     | {
//         type: PageType.Text;
//         pageId: string;
//         text: string;
//       }
//     | {
//         pageId: string;
//         text: string;
//         type: PageType.Links;
//         links: Link[];
//       }
//     | {
//         pageId: string;
//         text: string;
//         type: PageType.TextWithMedia;
//         media: Media[];
//       }
//   ) &
//   PageStyle;

// export type CoreDocument = {
//   id: string;
//   title: string;
//   thumbnailUrl?: string;
//   stats?: { likes: string; repost: string; upvote: string };
//   pages: Page[];
//   author?: string;
//   date?: string;
//   music?: SoundEffect;
// };
export const collection: CoreDocument[] = [];

export const whyEkam = [
  "Long articles feel heavy. Most people skim, not read.",
  "We add subtle motion so your eyes don't get lost.",
  "Did you noticed that you eye are atracted to this area, why?",
  "Because our brain is designed this way.",
  "No dancing graphics. Just gentle, purposeful movement.",
  "You finish what you start. That's the real metric.",
  "Built for deep reading, not addictive scrolling.",
  "Ekam helps you stay in flow, not fight for it.",
];
