import axiosInstance from "./axios";

export const getUsers = async () => {
  const response = await axiosInstance.get("/users");
  return response.data;
};
