import axiosInstance from "./axios";

export const getProjectReport = async (projectId) => {
  const response = await axiosInstance.get(`/reports/project/${projectId}`);

  return response.data;
};
