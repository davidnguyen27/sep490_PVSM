import StaffLayout from "@/shared/layouts/StaffLayout";
import { RoleGuard } from "@/routes/guards.route";
import { UserRole } from "@/shared/constants/roles";
import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import VetLayout from "@/shared/layouts/VetLayout";

const MicrochipListPage = lazy(() => import("../pages/MicrochipListPage"));
const MicrochipDetailPage = lazy(() => import("../pages/MicrochipDetailPage"));

export const appointmentChipRoutes: RouteObject[] = [
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
            path: "detail",
            element: <MicrochipDetailPage />,
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
          {
            path: "detail",
            element: <MicrochipDetailPage />,
          },
        ],
      },
    ],
  },
];
