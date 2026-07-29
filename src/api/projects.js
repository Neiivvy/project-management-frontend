import axiosInstance from "./axios";

// Returns projects where the logged-in user is manager or team member
export const getMyProjects = () => {
  return axiosInstance.get("/projects");
};

export const getProject = (id) => {
  return axiosInstance.get(`/projects/${id}`);
};
