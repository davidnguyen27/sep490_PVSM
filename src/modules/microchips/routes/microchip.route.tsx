import AdminLayout from "@/shared/layouts/AdminLayout";
import { RoleGuard } from "@/routes/guards.route";
import { UserRole } from "@/shared/constants/roles.constants";
import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import StaffLayout from "@/shared/layouts/StaffLayout";

const MicrochipManagementPage = lazy(
  () => import("../pages/MicrochipsListPage"),
);

export const microchipRoutes: RouteObject[] = [
  {
    path: "/admin",
    element: (
      <RoleGuard allowedRole={[UserRole.ADMIN]}>
        <AdminLayout />
      </RoleGuard>
    ),
    children: [
      {
        path: "microchips",
        element: <MicrochipManagementPage />,
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
        path: "microchips",
        element: <MicrochipManagementPage />,
      },
    ],
  },
];
