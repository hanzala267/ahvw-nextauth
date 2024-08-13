import { create } from "zustand";

const useServiceStore = create((set) => ({
  hasAddedHours: false,
  setHasAddedHours: (value) => set({ hasAddedHours: value }),
  resetHasAddedHours: () => set({ hasAddedHours: false }),
}));

export default useServiceStore;
