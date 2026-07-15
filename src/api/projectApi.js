import axiosInstance from "./axios";

export const getProjects = async () => {
  const response = await axiosInstance.get("/projects");
  return response.data.data; // returns only the array
};

export const createProject = async (projectData) => {
  const response = await axiosInstance.post("/projects", projectData);
  return response.data.data; // returns only the project
};

export const getProjectById = async (id) => {
  const res = await axiosInstance.get(`/projects/${id}`);
  return res.data.data;
};

export const updateProject = async (id, data) => {
  const response = await axiosInstance.put(`/projects/${id}`, data);
  return response.data.data;
};

export const removeProject = async (id) => {
  const response = await axiosInstance.delete(`/projects/${id}`);
  return response.data;
};
export const getUsers = async () => {
  const { data } = await axiosInstance.get("/users");
  return data;
};
