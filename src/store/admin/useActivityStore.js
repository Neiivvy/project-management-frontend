import { create } from "zustand";
import { fetchActivitiesApi } from "@/api/admin/activity";

const useActivityStore = create((set) => ({
  activities: [],
  isLoading: false,
  error: null,

  fetchActivities: async (days = 30, limit = 50, category = "all") => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const data = await fetchActivitiesApi({ days, limit, category });

      set({
        activities: data.data || [],
        isLoading: false,
      });
    } catch (err) {
      set({
        error:
          err?.response?.data?.message ||
          "Failed to fetch activities",
        isLoading: false,
      });
    }
  },
}));

export default useActivityStore;