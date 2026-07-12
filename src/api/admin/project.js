import axiosInstance from "../axios";

export const fetchProjectsApi = async () => {
  const { data } = await axiosInstance.get("/projects");
  return data;
};