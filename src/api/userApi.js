import axiosInstance from "./axios";

export const getUsers = async () => {
  const response = await axiosInstance.get("/users");
  return response.data;
};

// GET /api/profile — view own profile
export const getProfile = async () => {
  const response = await axiosInstance.get("/profile");
  return response.data;
};

// PUT /api/profile — edit own name, email, phone
export const updateProfile = async (data) => {
  const response = await axiosInstance.put("/profile", data);
  return response.data;
};

// PUT /api/profile/password — change own password
export const changePassword = async (data) => {
  const response = await axiosInstance.put("/profile/password", data);
  return response.data;
};
