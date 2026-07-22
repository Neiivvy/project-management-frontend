import api from "./axios";

// Member: get tasks assigned to the logged-in user
export const getMyTasks = () => {
  return api.get("/tasks", { params: { assignedToMe: true } });
};

export const getTask = (id) => {
  return api.get(`/tasks/${id}`);
};

// Member: can only update the status of their own task
export const updateTaskStatus = (id, status) => {
  return api.put(`/tasks/${id}`, { status });
};