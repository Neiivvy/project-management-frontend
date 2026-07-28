import api from "./axios";

export const getComments = (taskId) => api.get("/comments", { params: { taskId } });
export const addComment = (taskId, text, attachments = []) =>
  api.post("/comments", { taskId, text, attachments });