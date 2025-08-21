import { RoleGuard } from "@/routes/guards.route";
import { UserRole } from "@/shared/constants/roles.constants";
import StaffLayout from "@/shared/layouts/StaffLayout";
import VetLayout from "@/shared/layouts/VetLayout";
import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import ConditionPaymentSuccessPage from "../pages/ConditionPaymentSuccessPage";

const ConditionAppointmentPage = lazy(
  () => import("../pages/ListAppointmentPage"),
);

const PetHealthCertificatePage = lazy(
  () => import("../pages/PetHealthCertificatePage"),
);

const ConditionPaymentCancelPage = lazy(
  () => import("../pages/ConditionPaymentCancelPage"),
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
            path: "success",
            element: <ConditionPaymentSuccessPage />,
          },
          {
            path: "cancel",
            element: <ConditionPaymentCancelPage />,
          },
          {
            path: "pet-health-certificate",
            element: <PetHealthCertificatePage />,
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
            path: "pet-health-certificate",
            element: <PetHealthCertificatePage />,
          },
        ],
      },
    ],
  },
];
