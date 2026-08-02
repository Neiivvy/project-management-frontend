import axiosInstance from "./axios";

export const getTasks = async () => {
  const res = await axiosInstance.get("/tasks");
  return res.data.data;
};

export const createTask = async (data) => {
  const res = await axiosInstance.post("/tasks", data);
  return res.data.data;
};

export const updateTask = async (id, data) => {
  const res = await axiosInstance.put(`/tasks/${id}`, data);
  return res.data.data;
};

export const getTaskById = async (id) => {
  const res = await axiosInstance.get(`/tasks/${id}`);
  return res.data.data;
};

export const deleteTask = async (id) => {
  const res = await axiosInstance.delete(`/tasks/${id}`);
  return res.data;
};

export const getTaskProgress = async (projectId) => {
  const response = await axiosInstance.get(
    `/tasks/progress/by-status?projectId=${projectId}`,
  );

  return response.data;
};
