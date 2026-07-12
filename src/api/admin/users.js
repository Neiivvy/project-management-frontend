import axiosInstance from "@/api/axios";


// GET all users
export const fetchUsersApi = async () => {
  const { data } = await axiosInstance.get("/users");
  return data;
};


// Promote member -> project_manager
export const promoteUserApi = async (id) => {
  const { data } = await axiosInstance.put(
    `/users/${id}/promote`
  );

  return data;
};


// Demote project_manager -> member
export const demoteUserApi = async (id) => {
  const { data } = await axiosInstance.put(
    `/users/${id}/demote`
  );

  return data;
};


// Update user name/email
export const updateUserApi = async (id, body) => {
  const { data } = await axiosInstance.put(
    `/users/${id}`,
    body
  );

  return data;
};


// Delete user
export const deleteUserApi = async (id) => {
  const { data } = await axiosInstance.delete(
    `/users/${id}`
  );

  return data;
};