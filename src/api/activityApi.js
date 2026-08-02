import axiosInstance from "./axios";

export const getActivities = async (params = {}) => {
  const response = await axiosInstance.get("/activities", {
    params,
  });

  return response.data;
};
