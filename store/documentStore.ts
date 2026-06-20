import { create } from "zustand";
import { persist } from "zustand/middleware";

import { collection } from "@/data/data";

// ─── Types ──────────────────────────────────────────────────────
export enum PageType {
  Text = "text",
  TextWithMedia = "text-with-media",
  links = "links",
  Quote = "Quote",
  Collage = "Collage",
}

export type Page =
  | { pageId: string; type: PageType.Text; text: string }
  | {
      pageId: string;
      type: PageType.TextWithMedia;
      text: string;
      image: string;
    }
  | { pageId: string; type: PageType.Quote; quote: string }
  | { pageId: string; type: PageType.Collage; collage: string }
  | { pageId: string; type: PageType.links; links?: string[] };

export type CoreDocument = {
  id: string; // Added ID for store management
  pages: Page[];
  title: string;
  author?: string;
  thumbnailUrl?: string;
  description?: string;
  createdAt?: Date;
  modifiedAt?: Date;
  category?: string[];
};

// ─── Helpers ────────────────────────────────────────────────────
const generateId = () =>
  `${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;

const createTextPage = (): Page => ({
  pageId: generateId(),
  type: PageType.Text,
  text: "",
});

// ─── Store Interface ────────────────────────────────────────────

// ... [Keep all your Types and Helpers exactly the same] ...

// ... [Keep all your Types and Helpers exactly the same] ...

// ─── Store Interface ────────────────────────────────────────────
interface DocumentStore {
  documents: Record<string, CoreDocument>;
  isHydrated: boolean; // Ensure this is here

  // Actions
  syncWithCollection: (collection: CoreDocument[]) => void;
  createDocument: () => string;
  updateDocument: (id: string, updates: Partial<CoreDocument>) => void;
  addPage: (docId: string) => void;
  deletePage: (docId: string, pageId: string) => void;
  updatePageText: (docId: string, pageId: string, text: string) => void;
  setHydrated: (state: boolean) => void; // Ensure this is here
}

// ─── Store Implementation ───────────────────────────────────────
// Add the generic <DocumentStore> type to the persist middleware to fix TS error
export const useDocumentStore = create<DocumentStore>()(
  persist(
    (set, get) => ({
      documents: {},
      isHydrated: false,

      syncWithCollection: (collection) => {
        set((state) => {
          const updatedDocuments = { ...state.documents };
          collection.forEach((doc) => {
            if (!updatedDocuments[doc.id]) {
              updatedDocuments[doc.id] = doc;
            }
          });
          return { documents: updatedDocuments };
        });
      },

      createDocument: () => {
        const newId = generateId();
        const newDoc: CoreDocument = {
          id: newId,
          title: "Untitled Document",
          pages: [createTextPage()],
          createdAt: new Date(),
          modifiedAt: new Date(),
        };
        set((state) => ({
          documents: { ...state.documents, [newId]: newDoc },
        }));
        return newId;
      },

      updateDocument: (id, updates) => {
        set((state) => {
          const existingDoc = state.documents[id];
          if (!existingDoc) return state;
          return {
            documents: {
              ...state.documents,
              [id]: { ...existingDoc, ...updates },
            },
          };
        });
      },

      addPage: (docId) => {
        set((state) => {
          const doc = state.documents[docId];
          if (!doc) return state;
          return {
            documents: {
              ...state.documents,
              [docId]: {
                ...doc,
                pages: [...doc.pages, createTextPage()],
              },
            },
          };
        });
      },

      deletePage: (docId, pageId) => {
        set((state) => {
          const doc = state.documents[docId];
          if (!doc || doc.pages.length <= 1) return state;
          return {
            documents: {
              ...state.documents,
              [docId]: {
                ...doc,
                pages: doc.pages.filter((p) => p.pageId !== pageId),
              },
            },
          };
        });
      },

      updatePageText: (docId, pageId, text) => {
        set((state) => {
          const doc = state.documents[docId];
          if (!doc) return state;
          return {
            documents: {
              ...state.documents,
              [docId]: {
                ...doc,
                pages: doc.pages.map((page) =>
                  page.pageId === pageId ? { ...page, text } : page,
                ),
              },
            },
          };
        });
      },

      setHydrated: (state) => set({ isHydrated: state }),
    }),
    {
      name: "core-document-store",
      onRehydrateStorage: () => {
        return (state, error) => {
          if (!error && state) {
            state.setHydrated(true);
          }
        };
      },
    },
  ),
);
