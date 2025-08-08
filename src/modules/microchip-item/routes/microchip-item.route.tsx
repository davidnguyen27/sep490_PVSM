import AdminLayout from "@/shared/layouts/AdminLayout";
import { RoleGuard } from "@/routes/guards.route";
import { UserRole } from "@/shared/constants/roles.constants";
import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const ScanMicrochipPage = lazy(() => import("../pages/ScanMicrochipPage"));

export const microchipItemRoutes: RouteObject[] = [
  {
    path: "/admin",
    element: (
      <RoleGuard allowedRole={[UserRole.ADMIN]}>
        <AdminLayout />
      </RoleGuard>
    ),
    children: [
      {
        path: "scan-microchip",
        element: <ScanMicrochipPage />,
      },
      {
        path: "scan-microchip/:microchipCode",
        element: <ScanMicrochipPage />,
      },
    ],
  },
];
