import { RoleGuard } from "@/routes/guards.route";
import { UserRole } from "@/shared/constants/roles.constants";
import StaffLayout from "@/shared/layouts/StaffLayout";
import VetLayout from "@/shared/layouts/VetLayout";
import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const ConditionAppointmentPage = lazy(
  () => import("../pages/ListAppointmentPage"),
);
const ConditionDetailPage = lazy(
  () => import("../pages/AppointmentDetailPage"),
);
const ConditionPaymentSuccessPage = lazy(
  () => import("../pages/ConditionPaymentSuccessPage"),
);

export const conditionAppRoutes: RouteObject[] = [
  {
    path: "/staff",
    element: (
      <RoleGuard allowedRole={[UserRole.STAFF]}>
        <StaffLayout />
      </RoleGuard>
    ),
    children: [
      {
        path: "condition-appointments",
        children: [
          {
            index: true,
            element: <ConditionAppointmentPage />,
          },
          {
            path: "detail",
            element: <ConditionDetailPage />,
          },
          {
            path: "success",
            element: <ConditionPaymentSuccessPage />,
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
        path: "condition-appointments",
        children: [
          {
            index: true,
            element: <ConditionAppointmentPage />,
          },
          {
            path: "detail",
            element: <ConditionDetailPage />,
          },
        ],
      },
    ],
  },
];
