import axios from "axios";
import useAuthStore from "@/store/useAuthStore";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});


// Attach JWT token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// Global response handling
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {

    if (error.response?.status === 403) {
      // User does not have permission
        window.location.replace("/forbidden");
    }


    if (error.response?.status === 401) {
      // Token expired or invalid
      useAuthStore.getState().logout();

      window.location.href = "/login";
    }


    return Promise.reject(error);
  }
);


export default axiosInstance;