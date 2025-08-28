import { RoleGuard } from "@/routes/guards.route";
import { UserRole } from "@/shared/constants/roles.constants";
import AdminLayout from "@/shared/layouts/AdminLayout";

import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const VaccineScheduleByDiseasePage = lazy(
  () => import("../pages/VaccineScheduleByDiseasePage"),
);

export const vaccineScheduleRoutes: RouteObject[] = [
  {
    path: "/admin",
    element: (
      <RoleGuard allowedRole={[UserRole.ADMIN]}>
        <AdminLayout />
      </RoleGuard>
    ),
    children: [
      {
        path: "vaccine-schedules",
        element: <VaccineScheduleByDiseasePage />,
      },
    ],
  },
];
