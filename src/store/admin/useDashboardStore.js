import { create } from "zustand";
import { fetchDashboardSummaryApi } from "@/api/admin/dashboard";

const useDashboardStore = create((set) => ({
  summary: null,
  isLoading: false,
  error: null,

  fetchSummary: async () => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const data = await fetchDashboardSummaryApi();

      set({
        summary: data.data,
        isLoading: false,
      });
    } catch (err) {
      set({
        error:
          err?.response?.data?.message ||
          "Failed to fetch dashboard",
        isLoading: false,
      });
    }
  },
}));

export default useDashboardStore;