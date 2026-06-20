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
      type: PageType.links;
      links?: string[];
    };

export type CoreDocument = {
  pages: Page[];
  id: string;
  title: string;
  author?: string;
  thumbnailUrl?: string;
  description?: string;
  createdAt?: Date;
  category?: string[];
};
