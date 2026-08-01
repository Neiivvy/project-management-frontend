import api from "./axios";

// Returns projects where the logged-in user is manager or team member
export const getMyProjects = () => {
  return api.get("/projects");
};

export const getProject = (id) => {
  return api.get(`/projects/${id}`);
};

