import axiosInstance from "./axios";

export const signup = (data) => {
  return axiosInstance.post("/auth/register", data);
};

export const login = (data) => {
  return axiosInstance.post("/auth/login", data);
};

export const getCurrentUser = () => {
  return axiosInstance.get("/auth/me");
};
