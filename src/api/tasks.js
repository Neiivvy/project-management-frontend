import axiosInstance from "./axios";

// Member: get tasks assigned to the logged-in user
export const getMyTasks = () => {
  return axiosInstance.get("/tasks", { params: { assignedToMe: true } });
};

export const getTask = (id) => {
  return axiosInstance.get(`/tasks/${id}`);
};

// Member: can only update the status of their own task
export const updateTaskStatus = (id, status) => {
  return axiosInstance.put(`/tasks/${id}`, { status });
};
