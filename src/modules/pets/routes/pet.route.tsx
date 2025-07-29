import StaffLayout from "@/shared/layouts/StaffLayout";
import { RoleGuard } from "@/routes/guards.route";
import { UserRole } from "@/shared/constants/roles.constants";
import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const PetManagementPage = lazy(() => import("../pages/PetManagementPage"));
const PetUpdatePage = lazy(() => import("../pages/PetUpdatePage"));

export const petRoutes: RouteObject[] = [
  {
    path: "/staff",
    element: (
      <RoleGuard allowedRole={[UserRole.STAFF]}>
        <StaffLayout />
      </RoleGuard>
    ),
    children: [
      {
        path: "pet-profiles",
        children: [
          {
            index: true,
            element: <PetManagementPage />,
          },
          {
            path: "update",
            element: <PetUpdatePage />,
          },
        ],
      },
    ],
  },
];
