import AdminLayout from "@/shared/layouts/AdminLayout";
import { RoleGuard } from "@/routes/guards.route";
import { UserRole } from "@/shared/constants/roles.constants";
import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const VaccineExportsPage = lazy(() => import("../pages/VaccineExportsPage"));
const CreateVaccineExportPage = lazy(
  () => import("../pages/CreateVaccineExportPage"),
);
const EditVaccineExportPage = lazy(
  () => import("../pages/EditVaccineExportPage"),
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
        children: [
          {
            index: true,
            element: <VaccineExportsPage />,
          },
          {
            path: "create",
            element: <CreateVaccineExportPage />,
          },
          {
            path: "edit",
            element: <EditVaccineExportPage />,
          },
        ],
      },
    ],
  },
];
