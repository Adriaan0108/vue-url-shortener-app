import { useMutation } from "@tanstack/vue-query";
import { login } from "../services/apiService";

export function useLogin() {
  return useMutation({
    mutationFn: login,
  });
}
