import { RoleGuard } from "@/routes/guards.route";
import { UserRole } from "@/shared/constants/roles.constants";
import AdminLayout from "@/shared/layouts/AdminLayout";
import StaffLayout from "@/shared/layouts/StaffLayout";
import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const VetManagementPage = lazy(() => import("../pages/VetManagementPage"));

export const vetRoutes: RouteObject[] = [
  {
    path: "/admin",
    element: (
      <RoleGuard allowedRole={[UserRole.ADMIN]}>
        <AdminLayout />
      </RoleGuard>
    ),
    children: [
      {
        path: "vets",
        element: <VetManagementPage />,
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
        path: "vets",
        element: <VetManagementPage />,
      },
    ],
  },
];
