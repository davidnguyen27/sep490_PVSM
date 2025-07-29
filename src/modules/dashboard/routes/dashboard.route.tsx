import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import { RoleGuard } from "@/routes/guards.route";
import { UserRole } from "@/shared/constants/roles.constants";
import AdminLayout from "@/shared/layouts/AdminLayout";
import StaffLayout from "@/shared/layouts/StaffLayout";
import VetLayout from "@/shared/layouts/VetLayout";

const AdminDashboardPage = lazy(() => import("../pages/AdminDashboardPage"));
const StaffDashboardPage = lazy(() => import("../pages/StaffDashboardPage"));
const VetDashboardPage = lazy(() => import("../pages/VetDashboardPage"));

export const dashboardRoutes: RouteObject[] = [
  {
    path: "/admin",
    element: (
      <RoleGuard allowedRole={[UserRole.ADMIN]}>
        <AdminLayout />
      </RoleGuard>
    ),
    children: [
      {
        path: "dashboard",
        element: <AdminDashboardPage />,
      },
    ],
  },
  {
    path: "/staff",
    element: (
      <RoleGuard allowedRole={[UserRole.STAFF]}>
        <StaffLayout />
      </RoleGuard>
    ),
    children: [
      {
        path: "dashboard",
        element: <StaffDashboardPage />,
      },
    ],
  },
  {
    path: "/vet",
    element: (
      <RoleGuard allowedRole={[UserRole.VET]}>
        <VetLayout />
      </RoleGuard>
    ),
    children: [
      {
        path: "dashboard",
        element: <VetDashboardPage />,
      },
    ],
  },
];
