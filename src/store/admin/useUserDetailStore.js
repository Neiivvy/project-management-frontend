import { create } from "zustand";
import { fetchUserByIdApi } from "@/api/admin/users";
import { fetchProjectsApi } from "@/api/admin/project";
import { fetchTasksByProjectApi } from "@/api/admin/task"; // adjust path to match where this file actually lives

const useUserDetailStore = create((set) => ({
  user: null,
  projects: [],
  tasks: [],
  isLoading: false,
  error: null,

  fetchUserDetail: async (userId) => {
    set({ isLoading: true, error: null, user: null, projects: [], tasks: [] });

    try {
      const userRes = await fetchUserByIdApi(userId);
      const user = userRes.data;

      const projectsRes = await fetchProjectsApi();
      const allProjects = projectsRes.data ?? [];

      let relatedProjects = [];
      if (user.role === "project_manager") {
        relatedProjects = allProjects.filter((p) => p.manager?._id === userId);
      } else if (user.role === "member") {
        relatedProjects = allProjects.filter((p) =>
          p.teamMembers?.some((m) => m._id === userId)
        );
      }

      let tasks = [];
      if (user.role === "member" && relatedProjects.length > 0) {
        const taskLists = await Promise.all(
          relatedProjects.map((p) => fetchTasksByProjectApi(p._id))
        );
        tasks = taskLists
          .flatMap((res) => res.data ?? [])
          .filter((t) => t.assignedTo?._id === userId);
      }

      set({ user, projects: relatedProjects, tasks, isLoading: false });
    } catch (err) {
      set({
        error: err?.response?.data?.message || "Failed to load user details",
        isLoading: false,
      });
    }
  },
}));

export default useUserDetailStore;