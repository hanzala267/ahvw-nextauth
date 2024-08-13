import { create } from "zustand";

const useCommentsStore = create((set) => ({
  comments: {},
  addComment: (serviceId, comment) =>
    set((state) => ({
      comments: {
        ...state.comments,
        [serviceId]: [...(state.comments[serviceId] || []), comment],
      },
    })),
  setComments: (serviceId, comments) =>
    set((state) => ({
      comments: {
        ...state.comments,
        [serviceId]: comments,
      },
    })),
  fetchComments: async (serviceId) => {
    try {
      const response = await fetch(
        `/api/customer/services/comments?serviceId=${serviceId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }
      const comments = await response.json();
      set((state) => ({
        comments: {
          ...state.comments,
          [serviceId]: comments,
        },
      }));
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  },
}));

export default useCommentsStore;
