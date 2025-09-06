import { useMutation, useQuery } from "@tanstack/vue-query";
import { login, postUrl, getUrls } from "../services/apiService";

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

export function useGetUrls() {
  return useQuery({
    queryKey: ["urls"], // unique key for caching
    queryFn: getUrls,
  });
}
