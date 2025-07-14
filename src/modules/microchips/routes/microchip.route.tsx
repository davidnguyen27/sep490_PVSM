import AdminLayout from "@/shared/layouts/AdminLayout";
import { RoleGuard } from "@/routes/guards.route";
import { UserRole } from "@/shared/constants/roles";
import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

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
];
