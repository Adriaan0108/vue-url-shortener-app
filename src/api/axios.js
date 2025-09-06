import axios from "axios";
import { useAuthStore } from "../store/modules/authStore";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Request interceptor to add the token
axiosInstance.interceptors.request.use(
  (config) => {
    const auth = useAuthStore();
    if (auth.user.token) {
      config.headers.Authorization = `Bearer ${auth.user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
