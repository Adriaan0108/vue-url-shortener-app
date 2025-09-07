import { useAuthStore } from "../store/modules/authStore";

export function isAuthenticated() {
  const auth = useAuthStore();
  const user = auth.user;

  if (!user || !user.token) return false;

  const now = new Date().getTime();
  if (user.expiresAt && now > new Date(user.expiresAt).getTime()) {
    auth.logout();
    return false;
  }

  return true;
}
