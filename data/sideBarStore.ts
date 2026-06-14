import { create } from "zustand";

const useSidebarStore = create((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
export default useSidebarStore;
