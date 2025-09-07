import axios from "axios";
import { useAuthStore } from "../store/modules/authStore";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Request interceptor to add the token
axiosInstance.interceptors.request.use(
  (config) => {
    const auth = useAuthStore();
    const token = auth.user?.token; // safe optional chaining
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
