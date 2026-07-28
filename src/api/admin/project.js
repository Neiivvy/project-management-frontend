import axiosInstance from "../axios";

export const fetchProjectsApi = async () => {
  const { data } = await axiosInstance.get("/projects");
  return data;
};

export const fetchProjectByIdApi = async (id) => {
  const { data } = await axiosInstance.get(`/projects/${id}`);
  return data;
};