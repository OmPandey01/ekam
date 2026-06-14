import { create } from "zustand";

const useSidebarStore = create((set) => ({
  isOpen: true,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
export default useSidebarStore;
