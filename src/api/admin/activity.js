import axiosInstance from "@/api/axios";

export const fetchActivitiesApi = async (days = 30, limit = 50) => {
  const { data } = await axiosInstance.get(
    `/activities?days=${days}&limit=${limit}`
  );

  return data;
};