import { create } from "zustand";

const useServicesStore = create((set) => ({
  services: [],
  loading: false,
  error: null,
  setServices: (services) => set({ services }),
  addComment: (serviceId, comment) =>
    set((state) => ({
      services: state.services.map((service) =>
        service.id === serviceId
          ? { ...service, comments: [...service.comments, comment] }
          : service
      ),
    })),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));

export default useServicesStore;
