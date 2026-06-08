"use client";
import Page from "@/components/article-page";

import Source from "@/components/source";
import { useState } from "react";
import { PiFireSimpleBold } from "react-icons/pi";

import { StarIcon } from "@animateicons/react/lucide";
import { ShareIcon } from "@animateicons/react/lucide";
import { ImFontSize } from "react-icons/im";

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

const doc2 = {
  id: "doc_id_1",
  pages: [
    {
      pageId: "page_1",
      type: PageType.Text,
      text: "India is a Seculer Country and that is it's superpower",
    },
    {
      pageId: "page_1",
      type: PageType.TextWithMedia,
      text: "India is a Seculer Country and that is it's superpower",
      media: [
        {
          type: "image",
          url: "/moon.jpg",
          description:
            "This is first image and this is how you would see the details of the image",
          height: 200,
          width: 200,
        },
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1776890880096-ce552a6ffd53?q=80&w=1337&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          description:
            "This is Second image and this is how you would see the details of the image",
          height: 200,
          width: 200,
        },
      ],
    },
    {
      pageId: "page_3",
      type: PageType.Links,
      links: [
        {
          text: "Ap article",
          url: "https://acharyaprashant.org//",
        },
        {
          text: "Unsplash",
          url: "https://unsplash.com",
        },
      ],
    },
  ],
};

const doc11 = {
  id: "doc_sant_kabeer_das",
  pages: [
    {
      pageId: "kabir_page_1",
      type: PageType.Text,
      text: "Sant Kabeer Das (15th century) was a mystic poet and saint who challenged religious orthodoxy, caste discrimination, and empty rituals. His dohas (couplets) emphasize a direct, personal connection with the divine (which he called 'Ram' or 'Khuda') without need for priests, temples, or mosques. He united Hindu and Muslim thought, preaching love, equality, and self-knowledge.",
    },
    {
      pageId: "kabir_page_2",
      type: PageType.TextWithMedia,
      text: "Kabir's teachings are remarkably relevant today: 'The servant Kabir says, only he who knows how to love, knows God.' He rejected both caste hierarchy and religious violence, famously stating: 'Pothi padh padh jag mua, pandit bhayo na koi – Eke aksar prem ke padhe, so pandit hoye.' (Reading scripture after scripture no one became wise – only one who reads the letter of love becomes wise).",
      media: [
        {
          type: "image",
          url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Kabir_004.jpg/800px-Kabir_004.jpg",
          description:
            "A 19th century painting of Sant Kabir weaving cloth at his loom",
          height: 200,
          width: 200,
        },
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1545504176-8771f02cf0c2?q=80&w=2070&auto=format&fit=crop",
          description:
            "A page from a handwritten manuscript of Kabir's couplets in old Hindi",
          height: 200,
          width: 200,
        },
      ],
    },
    {
      pageId: "kabir_page_3",
      type: PageType.Links,
      links: [
        {
          text: "Full text of Kabir's 'Bijak' (sacred book)",
          url: "https://archive.org/details/BijakOfKabir",
        },
        {
          text: "Kabir Project – contemporary relevance of Kabir's poetry",
          url: "https://kabirproject.org/",
        },
        {
          text: "BBC article: Why Kabir remains India's most beloved poet",
          url: "https://www.bbc.com/news/world-asia-india-39791814",
        },
      ],
    },
  ],
};

const doc1 = {
  id: "doc_climate_change_india",
  pages: [
    {
      pageId: "climate_page_1",
      type: "text",
      text: "Climate change refers to long-term shifts in temperature and weather patterns. Human activities since the 1800s—especially burning fossil fuels—have accelerated these changes. Deforestation, landfills, industrialisation, transport and construction are major contributors to greenhouse gas emissions.",
    },
    {
      pageId: "climate_page_2",
      type: PageType.TextWithMedia,
      text: "Greenhouse gas concentrations are at their highest levels in 2 million years. Emissions continue to rise, and Earth is now about 1.1°C warmer than in the late 1800s. The decade 2011–2020 was the warmest on record. If global temperatures rise by 1.5–2°C, low-income countries with less resilient crop infrastructure will suffer far more in terms of food security than wealthy nations.",
      media: [
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1624324378932-68e20f332982?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          description:
            "Graph showing rising global temperatures and greenhouse gas concentrations",
          height: 200,
          width: 200,
        },
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1624324378932-68e20f332982?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          description:
            "Graph showing rising global temperatures and greenhouse gas concentrations",
          height: 200,
          width: 200,
        },
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1624324378932-68e20f332982?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          description:
            "Graph showing rising global temperatures and greenhouse gas concentrations",
          height: 200,
          width: 200,
        },
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1624324378932-68e20f332982?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          description:
            "Graph showing rising global temperatures and greenhouse gas concentrations",
          height: 200,
          width: 200,
        },
      ],
    },
    {
      pageId: "climate_page_3",
      type: "text",
      text: "The Indian Council of Agricultural Research (ICAR) finds that out of 573 rural districts, 109 districts are at very high risk and 201 districts are at risk from climate change. By 2049, the mean temperature in these districts is projected to rise by at least 1.3°C.",
    },
    {
      pageId: "climate_page_4",
      type: PageType.TextWithMedia,
      text: "Globally, crop yields could fall by up to 30% by 2050 without successful adaptation. Approximately 750 million people experienced extreme food insecurity in 2019, and the number of undernourished people is increasing. Climate change will raise food prices, reduce food supply, and promote instability over water and arable land.",
      media: [
        {
          type: "image",
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgDt-OeIMplR3kXX6pb4E-HPh58UA6NwuTxg&s",
          description:
            "Map of India showing districts at very high and moderate climate risk",
          height: 200,
          width: 200,
        },
      ],
    },
    {
      pageId: "climate_page_5",
      type: PageType.TextWithMedia,
      text: "Under the National Innovations in Climate Resilient Agriculture (NICRA) project: Rainfed rice yields to reduce <2.5% (2050-80); Irrigated rice yields to reduce 7%; Wheat yields to reduce 6–25% by 2100; Maize yields to reduce 18–23%. In contrast, chickpea production may increase by 54%.",
      media: [
        {
          type: "image",
          url: "https://www.theguardian.com/environment/2018/jul/20/crop-failure-and-bankruptcy-threaten-farmers-as-drought-grips-europe",
          description:
            "Dry, cracked earth with failed crops in a farmer's field",
          height: 200,
          width: 200,
        },
      ],
    },
    {
      pageId: "climate_page_6",
      type: "text",
      text: "The Children’s Climate Risk Index states: 'Climate crisis is a child crisis.' An estimated 850 million children worldwide (1–3 years old) live in areas where climatic shocks overlap. Children require more food and water per body weight and have less resilience to extreme weather.",
    },
    {
      pageId: "climate_page_7",
      type: PageType.TextWithMedia,
      text: "According to UNICEF, without action, climate change could result in an additional 28 million children experiencing acute malnutrition (wasting) and 40 million facing chronic malnutrition (stunting) by mid‑century, plus many more micronutrient deficiencies. India has already witnessed rising mean temperature and increased extreme rainfall over the last three decades.",
      media: [
        {
          type: "image",
          url: "add image for children at a nutrition rehabilitation centre here",
          description:
            "Health workers measuring a child's arm for malnutrition screening",
          height: 200,
          width: 200,
        },
      ],
    },
    {
      pageId: "climate_page_8",
      type: "text",
      text: "Three types of action: reducing emissions, adapting to impacts, and financing adjustments. Switching from fossil fuels to renewables like solar and wind will lower emissions. Around half of emissions reduction must be done by 2030 to keep warming below 1.5°C. Between 2020 and 2030, fossil fuel production must drop by about 6% yearly.",
    },
    {
      pageId: "climate_page_9",
      type: PageType.TextWithMedia,
      text: "At COP 26, India pledged to become a net‑zero carbon emitter by 2070 and generate 500 gigawatts of non‑fossil energy capacity by 2030. The 2021 UN Food Systems Summit convened governments and civil society to transform food systems to meet SDGs and Paris Agreement targets.",
      media: [
        {
          type: "image",
          url: "add image for solar panels or wind turbines in India here",
          description: "Large solar farm or wind turbines in rural India",
          height: 200,
          width: 200,
        },
      ],
    },
    {
      pageId: "climate_page_10",
      type: "text",
      text: "ICAR has developed 2,122 crop varieties, of which 1,752 are climate‑stress resilient. Climate‑resilient technologies are being demonstrated on farmers’ fields covering 446 villages. Agromet advisories reach farmers through m‑Kisan portal, WhatsApp and SMS. Government implements National Action Plan on Climate Change and 'Per drop more crop' schemes.",
    },
    {
      pageId: "climate_page_11",
      type: PageType.TextWithMedia,
      text: "Action Against Hunger works in over 45 countries, including India. Their Food Security and Livelihoods programmes boost agricultural production, support micro‑enterprises, and improve access to sustainable food. In India, they promote nutri‑gardens and millet consumption in remote areas to build food and nutrition security for marginalised communities.",
      media: [
        {
          type: "image",
          url: "add image for Action Against Hunger team with a community in India here",
          description:
            "Community members planting a nutri-garden with NGO staff",
          height: 200,
          width: 200,
        },
      ],
    },
    {
      pageId: "climate_page_12",
      type: PageType.TextWithMedia,
      text: "Burning fossil fuels produces emissions that act like a blanket around Earth, trapping heat. Carbon dioxide and methane are key. Garbage landfills are a primary source of methane. Major emitters include energy, industry, transport, buildings, agriculture and land use.",
      media: [
        {
          type: "image",
          url: "add image for methane satellite cloud near landfill in India here",
          description:
            "Satellite view or photo of landfill with methane plumes",
          height: 200,
          width: 200,
        },
      ],
    },
    {
      pageId: "climate_page_13",
      type: "links",
      links: [
        {
          text: "UN: What is climate change?",
          url: "https://www.un.org/en/climatechange/what-is-climate-change",
        },
        {
          text: "ScienceDirect: Climate change and food production",
          url: "https://www.sciencedirect.com/science/article/abs/pii/S0013935122020011",
        },
        {
          text: "UNICEF: One billion children at extreme climate risk",
          url: "https://www.unicef.org/press-releases/one-billion-children-extremely-high-risk-impacts-climate-crisis-unicef",
        },
        {
          text: "IPCC: Halve emissions by 2030",
          url: "https://www.ipcc.ch/2022/04/04/ipcc-ar6-wgiii-pressrelease",
        },
        {
          text: "PIB: India's climate resilient agriculture",
          url: "https://pib.gov.in/PressReleasePage.aspx?PRID=1696468",
        },
      ],
    },
  ],
};

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
