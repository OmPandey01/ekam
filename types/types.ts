// types.ts (or whatever you named this file)

export enum PageType {
  Text = "text",
  TextWithMedia = "text-with-media",
  TextWithImage = "text-with-image", // <-- Uncommented and fixed
  Links = "links", // PascalCase to match the rest
  Quote = "quote",
  Collage = "collage",
}

type Page =
  | {
      pageId: string;
      type: PageType.Text;
      text: string;
    }
  | {
      pageId: string;
      type: PageType.TextWithImage;
      text: string;
      image: string;
    }
  | { pageId: string; type: PageType.Quote; quote: string }
  | { pageId: string; type: PageType.Collage; collage: string }
  | {
      pageId: string;
      type: PageType.Links;
      links?: string[];
    };

type CoreDocument = {
  pages: Page[];
  id: string;
  title: string;
  author?: string;
  thumbnailUrl?: string;
  description?: string;
  createdAt?: Date;
  category?: string[];
};

// Exporting everything clearly
export type { CoreDocument, Page };
