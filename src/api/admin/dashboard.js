import axiosInstance from "../axios";

export const fetchDashboardSummaryApi = async () => {
  const { data } = await axiosInstance.get("/dashboard/summary");
  return data;
};