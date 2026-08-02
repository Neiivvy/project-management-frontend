import { create } from "zustand";

import { getComments, createComment, deleteComment } from "@/api/commentApi";

const useCommentStore = create((set) => ({
  comments: [],
  loading: false,

  fetchComments: async (taskId) => {
    try {
      set({ loading: true });

      const res = await getComments(taskId);

      set({
        comments: res.data,
        loading: false,
      });
    } catch (error) {
      console.log(error);

      set({
        loading: false,
      });
    }
  },

  addComment: async (data) => {
    const res = await createComment(data);

    set((state) => ({
      comments: [...state.comments, res.data],
    }));
  },

  removeComment: async (id) => {
    await deleteComment(id);

    set((state) => ({
      comments: state.comments.filter((c) => c._id !== id),
    }));
  },
}));

export default useCommentStore;
