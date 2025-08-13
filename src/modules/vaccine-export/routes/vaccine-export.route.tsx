import AdminLayout from "@/shared/layouts/AdminLayout";
import { RoleGuard } from "@/routes/guards.route";
import { UserRole } from "@/shared/constants/roles.constants";
import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const VaccineExportRouter = lazy(() =>
  import("../components/VaccineExportRouter").then((module) => ({
    default: module.VaccineExportRouter,
  })),
);

export const vaccineExportRoutes: RouteObject[] = [
  {
    path: "/admin",
    element: (
      <RoleGuard allowedRole={[UserRole.ADMIN]}>
        <AdminLayout />
      </RoleGuard>
    ),
    children: [
      {
        path: "vaccine-exports",
        element: <VaccineExportRouter />,
      },
    ],
  },
];
