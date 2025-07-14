import { UserRole } from "./roles";

export const LOGIN_ROUTES: Record<UserRole, string> = {
  [UserRole.ADMIN]: "/admin/login",
  [UserRole.STAFF]: "/staff/login",
  [UserRole.VET]: "/vet/login",
};

export const DASHBOARD_ROUTES: Record<UserRole, string> = {
  [UserRole.ADMIN]: "/admin/dashboard",
  [UserRole.STAFF]: "/staff/dashboard",
  [UserRole.VET]: "/vet/dashboard",
};

export const LOGIN_API_ROUTES = ["/api/Auth/login", "/api/Auth/verify-otp"];
