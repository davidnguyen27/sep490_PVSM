import { UserRole } from "@/shared/constants/roles.constants";
import {
  LOGIN_API_ROUTES,
  LOGIN_ROUTES,
} from "@/shared/constants/routes.constants";

export const isLoginRoute = (url?: string): boolean => {
  if (!url) return false;
  return LOGIN_API_ROUTES.some((route) => url.includes(route));
};

export const getLoginPathByRole = (): string => {
  const role = Number(localStorage.getItem("role")) as UserRole;
  return LOGIN_ROUTES[role];
};
