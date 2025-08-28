import { UserRole } from "./roles.constants";

export const LOGIN_ROUTES: Record<UserRole, string> = {
  [UserRole.ADMIN]: "/admin/login",
  [UserRole.STAFF]: "/staff/login",
  [UserRole.VET]: "/vet/login",
  [UserRole.CUSTOMER]: "/login", // Thêm route cho customer
};

export const DASHBOARD_ROUTES: Record<UserRole, string> = {
  [UserRole.ADMIN]: "/admin/dashboard",
  [UserRole.STAFF]: "/staff/dashboard",
  [UserRole.VET]: "/vet/dashboard",
  [UserRole.CUSTOMER]: "/", // Thêm route cho customer
};

export const LOGIN_API_ROUTES = ["/api/Auth/login", "/api/Auth/verify-otp"];
