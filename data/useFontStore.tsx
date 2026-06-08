import { create } from "zustand";

const useFontStore = create((set) => ({
  fonts: [],
  currFont: 0,
  changeFont: (index: number) => set({ currFont: index }),
}));

export default useFontStore;
