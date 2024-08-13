import { create } from "zustand";

const useServiceStore = create((set) => ({
  serviceHours: [],
  hasAddedHours: false,
  selectedService: null,

  setServiceHours: (hours) => set({ serviceHours: hours }),
  setHasAddedHours: (status) => set({ hasAddedHours: status }),
  resetHasAddedHours: () => set({ hasAddedHours: false }),
  setSelectedService: (service) => set({ selectedService: service }),
}));

export default useServiceStore;
