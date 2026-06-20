"use client";

import { useEffect } from "react";
import { useDocumentStore } from "@/store/documentStore";
import { collection } from "@/data/data";

export function StoreSync() {
  const isHydrated = useDocumentStore((state) => state.isHydrated);
  const syncWithCollection = useDocumentStore(
    (state) => state.syncWithCollection,
  );

  useEffect(() => {
    if (isHydrated) {
      syncWithCollection(collection);
    }
  }, [isHydrated, syncWithCollection]);

  return null; // This component does not render anything
}
