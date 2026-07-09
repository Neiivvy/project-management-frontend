import axiosInstance from "./axios";

export const fetchUsersApi = async () => {
  const { data } = await axiosInstance.get("/users");
  return data;
};

export const promoteUserApi = async (userId) => {
  const { data } = await axiosInstance.put(`/users/${userId}/promote`);
  return data;
};