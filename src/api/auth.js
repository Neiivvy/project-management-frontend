import api from "./axios";

export const signup = (data) => {
  return api.post("/auth/register", data);
};

export const login = (data) => {
  return api.post("/auth/login", data);
};

export const getCurrentUser = () => {
  return api.get("/auth/me");
};
