import axiosInstance from "../api/axios";

export const login = async (data) => {
  const res = await axiosInstance.post("/auth/login", data);
  return res.data;
};

export const register = async (data) => {
  const res = await axiosInstance.post("/auth/register", data);
  return res.data;
};

export const postUrl = async (data) => {
  const res = await axiosInstance.post("/url", data);
  return res.data;
};

export const getUrls = async () => {
  const res = await axiosInstance.get("/url/all");
  return res.data;
};

export const postUrlClick = async (data) => {
  const res = await axiosInstance.post("/url/click", data);
  return res.data;
};

export const getProfitGrowth = async () => {
  const res = await axiosInstance.get("/url/profit-growth");
  return res.data;
};
