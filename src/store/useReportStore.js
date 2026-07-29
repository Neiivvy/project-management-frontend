import { create } from "zustand";
import { getProjectReport } from "@/api/reportApi";

const useReportStore = create((set) => ({
  report: null,
  loading: false,
  error: null,

  fetchReport: async (projectId) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const res = await getProjectReport(projectId);

      set({
        report: res.data,
        loading: false,
      });
    } catch (error) {
      console.log("Report fetch error:", error);

      set({
        error: error.message,
        loading: false,
      });
    }
  },

  clearReport: () =>
    set({
      report: null,
    }),
}));

export default useReportStore;
