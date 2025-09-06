import { useMutation, useQuery } from "@tanstack/vue-query";
import { login, postUrl, getUrls, postUrlClick } from "../services/apiService";

export function useLogin() {
  return useMutation({
    mutationFn: login,
  });
}

export function usePostUrl() {
  return useMutation({
    mutationFn: postUrl,
  });
}

export function usePostUrlClick() {
  return useMutation({
    mutationFn: postUrlClick,
  });
}

export function useGetUrls() {
  return useQuery({
    queryKey: ["urls"], // unique key for caching
    queryFn: getUrls,
  });
}
