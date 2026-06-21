import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "@/api-controllers/api";

import { collection } from "@/data/data";
import { error } from "node:console";

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
  lastSync?: Date;
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
  getDocumentFromServer: (id: string) => Promise<boolean>;

  // Actions
  syncWithCollection: (collection: CoreDocument[]) => void;
  syncWithServer: (docId: string) => Promise<boolean | undefined>;
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
      syncWithServer: async (docId: string) => {
        const doc = get().documents[docId];
        if (!doc) return;
        try {
          const response = await api.post(`/documents/syncDocument/`, {
            document_id: docId,
            document: doc,
          });

          set((state) => ({
            documents: {
              ...state.documents,
              [docId]: { ...state.documents[docId], lastSync: new Date() },
            },
          }));

          return true;
        } catch (e) {
          console.error(e);
          return false;
        }

        //first check if doc is already there on syncWithServer
      },

      getDocumentFromServer: async (id: string) => {
        try {
          const response = await api.get(`/documents/${id}/`);
          const doc = response.data;
          if (!doc) return false;

          set((state) => ({
            documents: {
              ...state.documents,
              [id]: { ...doc, lastSync: new Date() },
            },
          }));

          return true;
        } catch (e) {
          if (e.response?.status === 404) {
            return false;
          }

          // Only log unexpected errors
          // console.error("Unexpected error:", e);

          // Show user message
          console.log("Failed to load document");
          return false;
        }
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
              [id]: { ...existingDoc, ...updates, modifiedAt: new Date() },
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
                modifiedAt: new Date(),
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
                modifiedAt: new Date(),
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
                modifiedAt: new Date(),
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
