import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  getProjects,
  createProject,
  updateProject,
  getProjectById,
  removeProject,
  assignMembersToProject,
  assignManagerToProject,
} from "@/api/projectApi";

const useProjectStore = create(
  persist(
    (set, get) => ({
      projects: [],
      users: [],
      project: null,
      loading: false,
      error: null,

      // Fetch All Projects
      fetchProjects: async () => {
        try {
          set({ loading: true, error: null });

          const projects = await getProjects();

          set({
            projects,
            loading: false,
          });
        } catch (error) {
          set({
            loading: false,
            error: error.response?.data?.message || "Failed to fetch projects",
          });
        }
      },

      // Fetch Single Project
      fetchProjectById: async (id) => {
        try {
          set({ loading: true, error: null });

          const project = await getProjectById(id);

          set({
            project,
            loading: false,
          });

          return project;
        } catch (error) {
          set({
            loading: false,
            error: error.response?.data?.message || "Failed to fetch project",
          });

          return null;
        }
      },

      // Add Project
      addProject: async (projectData) => {
        try {
          set({ loading: true, error: null });

          const newProject = await createProject(projectData);

          set((state) => ({
            projects: [...state.projects, newProject],
            loading: false,
          }));

          return true;
        } catch (error) {
          set({
            loading: false,
            error: error.response?.data?.message || "Failed to create project",
          });

          return false;
        }
      },
      // Update Project
      editProject: async (id, projectData) => {
        try {
          set({ loading: true, error: null });
          console.log(id);
          console.log(projectData);

          const updatedProject = await updateProject(id, projectData);

          set((state) => ({
            project: updatedProject,
            projects: state.projects.map((project) =>
              project._id === id ? updatedProject : project,
            ),
            loading: false,
          }));

          return true;
        } catch (error) {
          set({
            loading: false,
            error: error.response?.data?.message || "Failed to update project",
          });

          return false;
        }
      },

      assignMemberToProject: async (projectId, memberIds) => {
        try {
          const updatedProject = await assignMembersToProject(projectId, [
            memberIds._id,
          ]);

          set((state) => ({
            projects: state.projects.map((project) =>
              project._id === projectId ? updatedProject : project,
            ),
          }));

          return true;
        } catch (error) {
          console.log(error.response?.data);
          return false;
        }
      },

      assignManager: async (projectId, managerId) => {
        try {
          set({ loading: true, error: null });

          const updatedProject = await assignManagerToProject(
            projectId,
            managerId,
          );

          set((state) => ({
            project: updatedProject,
            projects: state.projects.map((project) =>
              project._id === projectId ? updatedProject : project,
            ),
            loading: false,
          }));

          return true;
        } catch (error) {
          set({
            loading: false,
            error:
              error.response?.data?.message || "Failed to reassign manager",
          });
          return false;
        }
      },

      deleteProject: async (id) => {
        try {
          set({ loading: true, error: null });

          await removeProject(id);

          set((state) => ({
            projects: state.projects.filter((project) => project._id !== id),
            loading: false,
          }));

          return true;
        } catch (error) {
          set({
            loading: false,
            error: error.response?.data?.message || "Failed to delete project",
          });

          return false;
        }
      },

      clearProject: () =>
        set({
          project: null,
        }),

      clearProjects: () =>
        set({
          projects: [],
          project: null,
          error: null,
          loading: false,
        }),
    }),
    {
      name: "project-storage",
      partialize: (state) => ({
        projects: state.projects,
        project: state.project,
      }),
    },
  ),
);

export default useProjectStore;
