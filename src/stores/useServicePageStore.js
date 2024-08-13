// File: stores/useServicePageStore.js
import { create } from "zustand";

const useServicePageStore = create((set) => ({
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

  fetchServices: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch("/api/customer/services");
      if (!response.ok) {
        throw new Error("Failed to fetch services");
      }
      const data = await response.json();
      set({ services: data, loading: false });
    } catch (error) {
      console.error("Error fetching services:", error);
      set({ error: "Failed to fetch services", loading: false });
    }
  },

  submitComment: async (serviceId, content) => {
    try {
      const response = await fetch("/api/customer/services/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ serviceId, content }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit comment");
      }

      const newComment = await response.json();
      set((state) => ({
        services: state.services.map((service) =>
          service.id === serviceId
            ? { ...service, comments: [...service.comments, newComment] }
            : service
        ),
      }));

      return { success: true };
    } catch (error) {
      console.error("Error submitting comment:", error);
      return { success: false, error: "Failed to add comment" };
    }
  },
}));

export default useServicePageStore;
