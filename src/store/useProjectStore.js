import { create } from "zustand";

import {
  fetchProjectsApi,
  fetchProjectByIdApi,
} from "@/api/admin/project";

import { fetchTasksByProjectApi } from "@/api/admin/task";

const useProjectStore = create((set) => ({
  // ==========================
  // Project List
  // ==========================
  projects: [],
  isLoading: false,
  error: null,

  // ==========================
  // Single Project
  // ==========================
  currentProject: null,
  isLoadingProject: false,
  projectError: null,

  // ==========================
  // Project Tasks
  // ==========================
  projectTasks: [],
  isLoadingTasks: false,
  taskError: null,

  // ==========================
  // Fetch All Projects
  // ==========================
  fetchProjects: async () => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const data = await fetchProjectsApi();

      set({
        projects: data.data ?? [],
        isLoading: false,
      });
    } catch (err) {
      set({
        error:
          err?.response?.data?.message ||
          "Failed to fetch projects",
        isLoading: false,
      });
    }
  },

  // ==========================
  // Fetch Single Project
  // ==========================
  fetchProjectById: async (id) => {
    set({
      isLoadingProject: true,
      projectError: null,
      currentProject: null,
    });

    try {
      const data = await fetchProjectByIdApi(id);

      set({
        currentProject: data.data ?? null,
        isLoadingProject: false,
      });
    } catch (err) {
      set({
        projectError:
          err?.response?.data?.message ||
          "Failed to fetch project",
        isLoadingProject: false,
      });
    }
  },

  // ==========================
  // Fetch Tasks for Project
  // ==========================
  fetchProjectTasks: async (projectId) => {
    set({
      isLoadingTasks: true,
      taskError: null,
      projectTasks: [],
    });

    try {
      const data = await fetchTasksByProjectApi(projectId);

      set({
        projectTasks: data.data ?? [],
        isLoadingTasks: false,
      });
    } catch (err) {
      set({
        taskError:
          err?.response?.data?.message ||
          "Failed to fetch project tasks",
        isLoadingTasks: false,
      });
    }
  },

  // ==========================
  // Clear Detail Page
  // ==========================
  clearCurrentProject: () =>
    set({
      currentProject: null,
      projectError: null,

      projectTasks: [],
      taskError: null,
    }),
}));

export default useProjectStore;