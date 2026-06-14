import { create } from "zustand";

interface SidebarState {
  isOpen: boolean;
  toggle: () => void;
}

const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
export default useSidebarStore;
