import axiosInstance from "../api/axios";

export const login = async (data) => {
  const res = await axiosInstance.post("/auth/login", data);
  return res.data;
};
