import AdminLayout from "@/shared/layouts/AdminLayout";
import { RoleGuard } from "@/routes/guards.route";
import { UserRole } from "@/shared/constants/roles.constants";
import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import StaffLayout from "@/shared/layouts/StaffLayout";
import VetLayout from "@/shared/layouts/VetLayout";

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
  {
    path: "/staff",
    element: (
      <RoleGuard allowedRole={[UserRole.STAFF]}>
        <StaffLayout />
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
  {
    path: "/vet",
    element: (
      <RoleGuard allowedRole={[UserRole.VET]}>
        <VetLayout />
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
