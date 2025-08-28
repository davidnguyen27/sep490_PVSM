import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const LandingPage = lazy(() => import("@/shared/pages/LandingPage"));
const LoginPage = lazy(() => import("@/modules/auth/pages/LoginPage"));
const AdminLoginPage = lazy(() => import("@/modules/auth/pages/AdminPage"));
const StaffLoginPage = lazy(() => import("@/modules/auth/pages/StaffPage"));
const VetLoginPage = lazy(() => import("@/modules/auth/pages/VetPage"));
const ResetPasswordPage = lazy(
  () => import("@/shared/pages/ResetPasswordPage"),
);
const NotFoundPage = lazy(() => import("@/shared/pages/NotFoundPage"));

export const authRoutes: RouteObject[] = [
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/admin/login",
    element: <AdminLoginPage />,
  },
  {
    path: "/staff/login",
    element: <StaffLoginPage />,
  },
  {
    path: "/vet/login",
    element: <VetLoginPage />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
