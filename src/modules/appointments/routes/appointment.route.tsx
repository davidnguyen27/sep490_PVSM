import StaffLayout from "@/shared/layouts/StaffLayout";
import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import { RoleGuard } from "@/routes/guards.route";
import { UserRole } from "@/shared/constants/roles";
import VetLayout from "@/shared/layouts/VetLayout";

const AppointmentListPage = lazy(() => import("../pages/AppointmentListPage"));
const DetailPage = lazy(() => import("../pages/DetailPage"));

export const appointmentRoutes: RouteObject[] = [
  {
    path: "/staff",
    element: (
      <RoleGuard allowedRole={[UserRole.STAFF]}>
        <StaffLayout />
      </RoleGuard>
    ),
    children: [
      {
        path: "appointments/vaccination",
        children: [
          {
            index: true,
            element: <AppointmentListPage />,
          },
          {
            path: "detail",
            element: <DetailPage />,
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
        path: "appointments/vaccination",
        element: <AppointmentListPage />,
      },
    ],
  },
];
