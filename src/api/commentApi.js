import axiosInstance from "./axios";

export const getComments = async (taskId) => {
  const res = await axiosInstance.get(`/comments?taskId=${taskId}`);

  return res.data;
};

export const createComment = async (data) => {
  const res = await axiosInstance.post("/comments", data);

  return res.data;
};

export const deleteComment = async (id) => {
  const res = await axiosInstance.delete(`/comments/${id}`);

  return res.data;
};
