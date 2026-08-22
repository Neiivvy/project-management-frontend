import { create } from "zustand";

import { getComments, createComment, deleteComment } from "@/api/commentApi";

const useCommentStore = create((set) => ({
  comments: [],
  loading: false,

  // ==================================================
  // Fetch comments
  // ==================================================

  fetchComments: async (taskId) => {
    try {
      set({
        loading: true,
      });

      const res = await getComments(taskId);

      set({
        comments: res.data,
        loading: false,
      });

      return true;
    } catch (error) {
      console.log(error);

      set({
        loading: false,
      });

      return false;
    }
  },

  // ==================================================
  // Add comment
  // ==================================================

  addComment: async (data) => {
    try {
      set({
        loading: true,
      });

      const res = await createComment(data);

      set((state) => ({
        comments: [...state.comments, res.data],
        loading: false,
      }));

      return true;
    } catch (error) {
      console.log(error);

      set({
        loading: false,
      });

      return false;
    }
  },

  // ==================================================
  // Delete own comment
  // ==================================================

  removeComment: async (id) => {
    try {
      set({
        loading: true,
      });

      await deleteComment(id);

      set((state) => ({
        comments: state.comments.filter((comment) => comment._id !== id),
        loading: false,
      }));

      return true;
    } catch (error) {
      console.log(error);

      set({
        loading: false,
      });

      return false;
    }
  },
}));

export default useCommentStore;
