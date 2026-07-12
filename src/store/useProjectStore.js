import { create } from "zustand";
import { fetchProjectsApi } from "@/api/admin/project";

const useProjectStore = create((set) => ({
  projects: [],
  isLoading: false,
  error: null,

  fetchProjects: async () => {
    set({ isLoading: true, error: null });

    try {
      const data = await fetchProjectsApi();

      set({
        projects: data.data ?? [],
        isLoading: false,
      });
    } catch (err) {
      set({
        error:
          err?.response?.data?.message || "Failed to fetch projects",
        isLoading: false,
      });
    }
  },
}));

export default useProjectStore;