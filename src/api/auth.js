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

export const sendVerificationCode = (email) => {
  return api.post("/auth/send-verification-code", { email });
};

export const forgotPassword = (email) => {
  return api.post("/auth/forgot-password", { email });
};

export const resetPassword = (data) => {
  return api.post("/auth/reset-password", data);
};