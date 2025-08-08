import { RoleGuard } from "@/routes/guards.route";
import { UserRole } from "@/shared/constants/roles.constants";
import AdminLayout from "@/shared/layouts/AdminLayout";
import type { RouteObject } from "react-router-dom";
import { lazy } from "react";

const VaccineDiseaseListPage = lazy(
  () => import("../pages/VaccineDiseaseListPage"),
);

export const vaccineDiseaseRoutes: RouteObject[] = [
  {
    path: "/admin",
    element: (
      <RoleGuard allowedRole={[UserRole.ADMIN]}>
        <AdminLayout />
      </RoleGuard>
    ),
    children: [
      {
        path: "vaccine-diseases",
        element: <VaccineDiseaseListPage />,
      },
    ],
  },
];
