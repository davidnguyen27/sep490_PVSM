import { RoleGuard } from "@/routes/guards.route";
import { UserRole } from "@/shared/constants/roles.constants";
import VetLayout from "@/shared/layouts/VetLayout";
import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const VetSchedulesPage = lazy(() => import("../pages/VetSchedulesPage"));

export const vetScheduleRoutes: RouteObject[] = [
  {
    path: "/vet",
    element: (
      <RoleGuard allowedRole={[UserRole.VET]}>
        <VetLayout />
      </RoleGuard>
    ),
    children: [
      {
        path: "vet-schedules",
        element: <VetSchedulesPage />,
      },
    ],
  },
];
