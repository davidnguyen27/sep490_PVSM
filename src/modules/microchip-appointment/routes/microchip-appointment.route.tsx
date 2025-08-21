import StaffLayout from "@/shared/layouts/StaffLayout";
import { RoleGuard } from "@/routes/guards.route";
import { UserRole } from "@/shared/constants/roles.constants";
import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import VetLayout from "@/shared/layouts/VetLayout";

const MicrochipListPage = lazy(() => import("../pages/MicrochipListPage"));
// const MicrochipDetailPage = lazy(() => import("../pages/MicrochipDetailPage"));
const MicrochipPaymentSuccessPage = lazy(
  () => import("../pages/MicrochipPaymentSuccessPage"),
);
const MicrochipPaymentCancelPage = lazy(
  () => import("../pages/MicrochipPaymentCancelPage"),
);

export const microchipAppRoutes: RouteObject[] = [
  {
    path: "/staff",
    element: (
      <RoleGuard allowedRole={[UserRole.STAFF]}>
        <StaffLayout />
      </RoleGuard>
    ),
    children: [
      {
        path: "microchip-appointments",
        children: [
          {
            index: true,
            element: <MicrochipListPage />,
          },
          {
            path: "success",
            element: <MicrochipPaymentSuccessPage />,
          },
          {
            path: "cancel",
            element: <MicrochipPaymentCancelPage />,
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
        path: "microchip-appointments",
        children: [
          {
            index: true,
            element: <MicrochipListPage />,
          },
        ],
      },
    ],
  },
];
