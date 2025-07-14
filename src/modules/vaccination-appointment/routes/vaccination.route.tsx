import StaffLayout from "@/shared/layouts/StaffLayout";
import VetLayout from "@/shared/layouts/VetLayout";
import { RoleGuard } from "@/routes/guards.route";
import { UserRole } from "@/shared/constants/roles";
import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const VaccinationAppListPage = lazy(
  () => import("../pages/VaccinationListPage"),
);
const VaccinationAppDetailPage = lazy(
  () => import("../pages/VaccinationDetailPage"),
);

export const vaccinationAppRoutes: RouteObject[] = [
  {
    path: "/staff",
    element: (
      <RoleGuard allowedRole={[UserRole.STAFF]}>
        <StaffLayout />
      </RoleGuard>
    ),
    children: [
      {
        path: "vaccination-appointments",
        children: [
          {
            index: true,
            element: <VaccinationAppListPage />,
          },
          {
            path: "detail",
            element: <VaccinationAppDetailPage />,
          },
        ],
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
        path: "vaccination-appointments",
        children: [
          {
            index: true,
            element: <VaccinationAppListPage />,
          },
          {
            path: "detail",
            element: <VaccinationAppDetailPage />,
          },
        ],
      },
    ],
  },
];
