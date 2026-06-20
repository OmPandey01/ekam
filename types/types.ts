//i am making this bcs i face circuler dependecy problem
// file 1 contained types but file 2 used types but file 1 was importing file 2 and file 2 was importing file 1
//

export enum PageType {
  Text = "text",
  TextWithMedia = "text-with-media",
  // TextWithImage = "TextWithImage",
  links = "links",
  Quote = "Quote",
  Collage = "Collage",
}

export type Page =
  | {
      page_id: string;
      type: PageType.Text;
      text: string;
    }
  | {
      page_id: string;
      type: PageType.TextWithImage;
      text: string;
      image: string;
    }
  | { page_id: string; type: PageType.Quote; quote: string }
  | { page_id: string; type: PageType.Collage; collage: string }
  | {
      page_id: string;
      type: PageType.links;
      links?: string[];
    };

export type CoreDocument = {
  pages: Page[];
  title: string;
  author?: string;
  thumbnailUrl?: string;
  description?: string;
  createdAt?: Date;
  category?: string[];
};
