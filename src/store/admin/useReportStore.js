import { create } from "zustand";

const useReportStore = create((set) => ({
  overview: null,
  userReport: null,
  projectReport: null,

  selectedUser: "",
  selectedProject: "",

  setOverview: (overview) => set({ overview }),

  setUserReport: (userReport) => set({ userReport }),

  setProjectReport: (projectReport) => set({ projectReport }),

  setSelectedUser: (selectedUser) => set({ selectedUser }),

  setSelectedProject: (selectedProject) => set({ selectedProject }),

  clearReports: () =>
    set({
      userReport: null,
      projectReport: null,
      selectedUser: "",
      selectedProject: "",
    }),
}));

export default useReportStore;