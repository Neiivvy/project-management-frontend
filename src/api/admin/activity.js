import axiosInstance from "@/api/axios";

export const fetchActivitiesApi = async ({
  days = 30,
  limit = 50,
  category = "all",
} = {}) => {
  const params = new URLSearchParams({
    days,
    limit,
  });

  if (category !== "all") {
    params.append("category", category);
  }

  const { data } = await axiosInstance.get(
    `/activities?${params.toString()}`
  );

  return data;
};