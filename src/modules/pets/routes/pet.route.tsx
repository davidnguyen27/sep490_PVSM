import StaffLayout from "@/shared/layouts/StaffLayout";
import { RoleGuard } from "@/routes/guards.route";
import { UserRole } from "@/shared/constants/roles.constants";
import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import AdminLayout from "@/shared/layouts/AdminLayout";
import VetLayout from "@/shared/layouts/VetLayout";

const PetManagementPage = lazy(() => import("../pages/PetManagementPage"));
// const PetUpdatePage = lazy(() => import("../pages/PetUpdatePage"));

export const petRoutes: RouteObject[] = [
  {
    path: "/admin",
    element: (
      <RoleGuard allowedRole={[UserRole.ADMIN]}>
        <AdminLayout />
      </RoleGuard>
    ),
    children: [
      {
        path: "pets",
        element: <PetManagementPage />,
      },
    ],
  },
  {
    path: "/staff",
    element: (
      <RoleGuard allowedRole={[UserRole.STAFF]}>
        <StaffLayout />
      </RoleGuard>
    ),
    children: [
      {
        path: "pets",
        element: <PetManagementPage />,
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
        path: "pets",
        element: <PetManagementPage />,
      },
    ],
  },
];
