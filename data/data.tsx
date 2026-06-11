//Guideline for content
// I am making this platform specifically to make reading more engaging and interactive for everyone.
// So the content should be concise, engaging and informative.
//  It should be written in a way that captures the reader's attention and keeps them interested
// throughout the document.
//  The content should also be well-researched and accurate,
//  providing valuable information to the reader. Additionally,
//  it should be organized in a clear and logical manner, making it easy for readers to follow along
// and understand the key points being presented.

import { title } from "motion/react-client";

export enum PageType {
  Text = "text",
  Links = "links",
  TextWithMedia = "text-with-media",
}

type Media = {
  type: "image";
  url: string;
  description: string;
  height?: number;
  width?: number;
  details?: any;
};

type Link = {
  url: string;
  description: string;
  priority?: number;
};

type PageStyle = {
  backgroundType?: "color" | "image" | "gradient";
  backgroundColor?: string;
  backgroundImage?: string;
};

enum SoundEffect {
  None = "none",
  glass = "glass",
  paper = "paper",
  typing = "typing",
  nature = "nature",
  city = "city",
  crowd = "crowd",
  music = "music",
}

type BasePage = {
  pageId: string;
  text: string;
};

export type Page = BasePage &
  (
    | {
        type: PageType.Text;
      }
    | {
        type: PageType.Links;
        links: Link[];
      }
    | {
        type: PageType.TextWithMedia;
        media: Media[];
      }
  ) &
  PageStyle;

export type Document = {
  id: string;
  title: string;
  thumbnailUrl?: string;
  stats?: { likes: string; repost: string; upvote: string };
  pages: Page[];
  author?: string;
  date?: string;
  music?: SoundEffect;
};

export const human_evolution: Document = {
  id: "human_evolution_1",
  title: "Let's Explore Human Evolution",
  thumbnailUrl:
    "https://cdn.pixabay.com/photo/2019/04/10/03/38/kid-4116127_1280.jpg",
  author: "Om Pandey",
  date: "12-05-2026",
  stats: { likes: "23", repost: "22", upvote: "122" },
  pages: [
    {
      pageId: "human_evolution_page_1",
      type: PageType.Text,
      text: "human evolution, the process by which human beings developed on Earth from now-extinct primates.",
    },
    {
      pageId: "human_evolution_page_2",
      type: PageType.TextWithMedia,
      text: " we humans are Homo sapiens, a culture-bearing upright-walking species that lives on the ground and very likely first evolved in Africa about 315,000 years ago.",
      media: [
        {
          type: "image",
          url: "https://cdn.pixabay.com/photo/2024/10/02/18/32/ai-generated-9091918_1280.jpg",
          description: "Image of a Homosepien",
          height: 200,
          width: 400,
        },
        {
          type: "image",
          url: "https://cdn.pixabay.com/photo/2016/09/16/21/19/death-1675157_1280.jpg",
          description: "Remains of a Human Head",
          height: 200,
          width: 400,
        },
      ],
    },
    {
      pageId: "human_evolution_page_3",
      type: PageType.Text,
      text: "We are now the only living members of what many zoologists refer to as the human tribe, Hominini,",
    },
    {
      pageId: "human_evolution_page_4",
      type: PageType.Text,
      text: "but there is abundant fossil evidence to indicate that we were preceded for millions of years by other hominins, such as Ardipithecus, Australopithecus, and other species of Homo, and that our species also lived for a time contemporaneously with at least one other member of our genus, H. neanderthalensis (the Neanderthals). ",
    },
    {
      pageId: "human_evolution_page_5",
      type: PageType.TextWithMedia,
      text: " In addition, we and our predecessors have always shared Earth with other apelike primates, from the modern-day gorilla to the long-extinct Dryopithecus.",
      media: [
        {
          type: "image",
          url: "https://cdn.pixabay.com/photo/2023/06/21/08/58/monkey-8078840_1280.jpg",
          description: "Priamate",
        },
        {
          type: "image",
          url: "https://cdn.pixabay.com/photo/2017/04/02/06/21/monkey-2195107_1280.jpg",
          description: "Priamate",
        },
      ],
    },
    {
      pageId: "human_evolution_page_6",
      type: PageType.Text,
      text: "Darwin never claimed, as some of his Victorian contemporaries insisted he had, that “man was descended from the apes,” and modern scientists would view such a statement as a useless simplification—just as they would dismiss any popular notions that a certain extinct species is the “missing link” between humans and the apes. ",
    },
    {
      pageId: "human_evolution_page_7",
      type: PageType.Text,
      text: 'There is theoretically, however, a common ancestor that existed millions of years ago. This ancestral species does not constitute a "missing link" along a lineage but rather a node for divergence into separate lineages.',
    },
    {
      pageId: "human_evolution_page_8",
      type: PageType.Text,
      text: 'There is theoretically, however, a common ancestor that existed millions of years ago. This ancestral species does not constitute a "missing link" along a lineage but rather a node for divergence into separate lineages.',
    },
    {
      pageId: "human_evolution_page_9",
      type: PageType.Text,
      text: "This ancient primate has not been identified and may never be known with certainty, because fossil relationships are unclear even within the human lineage, which is more recent. In fact, the human “family tree” may be better described as a “family bush,” within which it is impossible to connect a full chronological series of species, leading to Homo sapiens, that experts can agree upon.",
    },
  ],
};
export const human_evolution1: Document = {
  id: "human_evolution_2",
  title: "Let's Explore Human Evolution Again",
  thumbnailUrl:
    "https://cdn.pixabay.com/photo/2019/04/10/03/38/kid-4116127_1280.jpg",
  author: "Om Pandey",
  date: "12-05-2026",
  stats: { likes: "223", repost: "12", upvote: "122" },
  pages: [
    {
      pageId: "human_evolution_page_1",
      type: PageType.Text,
      text: "Om you are re-reading the same thing human evolution, the process by which human beings developed on Earth from now-extinct primates.",
    },
    {
      pageId: "human_evolution_page_2",
      type: PageType.TextWithMedia,
      text: " we humans are Homo sapiens, a culture-bearing upright-walking species that lives on the ground and very likely first evolved in Africa about 315,000 years ago.",
      media: [
        {
          type: "image",
          url: "https://cdn.pixabay.com/photo/2024/10/02/18/32/ai-generated-9091918_1280.jpg",
          description: "Image of a Homosepien",
          height: 200,
          width: 400,
        },
        {
          type: "image",
          url: "https://cdn.pixabay.com/photo/2016/09/16/21/19/death-1675157_1280.jpg",
          description: "Remains of a Human Head",
          height: 200,
          width: 400,
        },
      ],
    },
    {
      pageId: "human_evolution_page_3",
      type: PageType.Text,
      text: "We are now the only living members of what many zoologists refer to as the human tribe, Hominini,",
    },
    {
      pageId: "human_evolution_page_4",
      type: PageType.Text,
      text: "but there is abundant fossil evidence to indicate that we were preceded for millions of years by other hominins, such as Ardipithecus, Australopithecus, and other species of Homo, and that our species also lived for a time contemporaneously with at least one other member of our genus, H. neanderthalensis (the Neanderthals). ",
    },
    {
      pageId: "human_evolution_page_5",
      type: PageType.TextWithMedia,
      text: " In addition, we and our predecessors have always shared Earth with other apelike primates, from the modern-day gorilla to the long-extinct Dryopithecus.",
      media: [
        {
          type: "image",
          url: "https://cdn.pixabay.com/photo/2023/06/21/08/58/monkey-8078840_1280.jpg",
          description: "Priamate",
        },
        {
          type: "image",
          url: "https://cdn.pixabay.com/photo/2017/04/02/06/21/monkey-2195107_1280.jpg",
          description: "Priamate",
        },
      ],
    },
    {
      pageId: "human_evolution_page_6",
      type: PageType.Text,
      text: "Darwin never claimed, as some of his Victorian contemporaries insisted he had, that “man was descended from the apes,” and modern scientists would view such a statement as a useless simplification—just as they would dismiss any popular notions that a certain extinct species is the “missing link” between humans and the apes. ",
    },
    {
      pageId: "human_evolution_page_7",
      type: PageType.Text,
      text: 'There is theoretically, however, a common ancestor that existed millions of years ago. This ancestral species does not constitute a "missing link" along a lineage but rather a node for divergence into separate lineages.',
    },
    {
      pageId: "human_evolution_page_8",
      type: PageType.Text,
      text: 'There is theoretically, however, a common ancestor that existed millions of years ago. This ancestral species does not constitute a "missing link" along a lineage but rather a node for divergence into separate lineages.',
    },
    {
      pageId: "human_evolution_page_9",
      type: PageType.Text,
      text: "This ancient primate has not been identified and may never be known with certainty, because fossil relationships are unclear even within the human lineage, which is more recent. In fact, the human “family tree” may be better described as a “family bush,” within which it is impossible to connect a full chronological series of species, leading to Homo sapiens, that experts can agree upon.",
    },
  ],
};

export const doc1 = human_evolution;
// Initial Mock data

export const doc12 = {
  id: "doc_climate_change_india",
  title: "Climate Change in India",
  pages: [
    {
      pageId: "climate_page_1",
      type: PageType.Text,
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

export const doc13 = {
  id: "climate-impact-india-001",
  music: "nature",
  pages: [
    {
      pageId: "p1-thermal-shift",
      type: "text-with-media",
      text: "India's climate baseline is undergoing rapid destabilization. Between 1901 and 2018, the national average temperature rose by approximately 0.7°C. This thermal shift accelerates the retreat of Himalayan glaciers—the primary hydrological regulators for the Ganges and Brahmaputra river basins. The immediate consequence is a critical disruption in the perennial water supply infrastructure that sustains northern India.",
      media: [
        {
          url: "https://plus.unsplash.com/premium_photo-1664298311043-46b3814a511f?q=80&w=1766&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          description:
            "Barren rocky terrain illustrating the geological impact of changing arid conditions.",
          height: 1080,
          width: 1920,
        },
      ],
      backgroundType: "color",
      backgroundColor: "#121212",
    },
    {
      pageId: "p2-monsoon-volatility",
      type: "text-with-media",
      text: "The Indian monsoon system acts as the primary driver for the agricultural sector. However, atmospheric warming has induced severe volatility in precipitation cycles. Meteorological data indicates a sharp increase in the frequency of extreme, concentrated rainfall events juxtaposed with prolonged dry spells. This structural shift degrades soil mechanics, suppresses crop yields, and directly threatens the nation's food supply chain.",
      media: [
        {
          url: "https://images.unsplash.com/photo-1647193618898-23d2294048af?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          description: "Agricultural fields under changing weather patterns.",
          height: 1080,
          width: 1920,
        },
      ],
      backgroundType: "color",
      backgroundColor: "#18181b",
    },
    {
      pageId: "p3-coastal-inundation",
      type: "text-with-media",
      text: "India's 7,500-kilometer coastline exposes massive metropolitan centers and logistical hubs to rising sea levels. Cyclonic activity in the Arabian Sea has intensified by over 50% in recent decades due to elevated sea surface temperatures. The resulting storm surges induce severe coastal flooding, while subsurface saltwater intrusion fundamentally ruins coastal freshwater aquifers.",
      media: [
        {
          url: "https://images.unsplash.com/photo-1741836315165-89e7dfd61613?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          description:
            "Vessels navigating encroaching water levels near coastal infrastructures.",
          height: 1080,
          width: 1920,
        },
      ],
      backgroundType: "color",
      backgroundColor: "#0f172a",
    },
    {
      pageId: "p4-macroeconomic-strain",
      type: "text",
      text: "The macroeconomic impact is highly quantifiable. Extreme heatwaves severely reduce labor productivity, particularly in the construction and agricultural sectors, projecting a potential loss of up to 4.5% of India's GDP by 2030. Concurrently, changing temperature gradients allow vector-borne diseases to migrate into previously unaffected higher altitudes, systematically increasing the operational strain on public healthcare infrastructure.",
      backgroundType: "color",
      backgroundColor: "#1e1b4b",
    },
    {
      pageId: "p5-mitigation-protocols",
      type: "links",
      text: "Addressing these systemic shifts requires aggressive mitigation and adaptation protocols. The government and economic sectors are beginning to implement structural changes, ranging from green taxonomy and carbon market integration to massive expansions in renewable energy infrastructure. Review the technical reports and articles below to explore India's climate trajectory and policy responses.",
      links: [
        {
          url: "https://www.grantthornton.in/insights/articles/in-2026-climate-change-to-become-indias-defining-economic-variable/",
          description:
            "In 2026, climate change to become India's defining economic variable - Grant Thornton",
          priority: 1,
        },
        {
          url: "https://www.drishtiias.com/daily-updates/daily-news-analysis/state-of-indias-environment-2026",
          description:
            "State of India's Environment 2026 - Drishti IAS Report on Planetary Boundaries",
          priority: 2,
        },
        {
          url: "https://ccpi.org/country/ind/",
          description:
            "India – Climate Performance Ranking 2026 | CCPI Analysis",
          priority: 3,
        },
        {
          url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2268795",
          description:
            "India's Green Transformation - Press Information Bureau (PIB) 2026 Update",
          priority: 4,
        },
      ],
      backgroundType: "color",
      backgroundColor: "#0f172a",
    },
  ],
};

export const collection: Document[] = [doc1, human_evolution1];
