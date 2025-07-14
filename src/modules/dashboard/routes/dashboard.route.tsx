import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import { RoleGuard } from "@/routes/guards.route";
import { UserRole } from "@/shared/constants/roles";

const AdminDashboardPage = lazy(() => import("../pages/AdminDashboardPage"));
const StaffDashboardPage = lazy(() => import("../pages/StaffDashboardPage"));
const VetDashboardPage = lazy(() => import("../pages/VetDashboardPage"));

export const dashboardRoutes: RouteObject[] = [
  {
    path: "/admin/dashboard",
    element: (
      <RoleGuard allowedRole={[UserRole.ADMIN]}>
        <AdminDashboardPage />
      </RoleGuard>
    ),
  },
  {
    path: "/staff/dashboard",
    element: (
      <RoleGuard allowedRole={[UserRole.STAFF]}>
        <StaffDashboardPage />
      </RoleGuard>
    ),
  },
  {
    path: "/vet/dashboard",
    element: (
      <RoleGuard allowedRole={[UserRole.VET]}>
        <VetDashboardPage />
      </RoleGuard>
    ),
  },
];
