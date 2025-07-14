import { RoleGuard } from "@/routes/guards.route";
import { UserRole } from "@/shared/constants/roles";
import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const AdminPage = lazy(() => import("../pages/admin"));
const StaffPage = lazy(() => import("../pages/staff"));

export const vetRoutes: RouteObject[] = [
  {
    path: "/admin/vets",
    element: (
      <RoleGuard allowedRole={[UserRole.ADMIN]}>
        <AdminPage />
      </RoleGuard>
    ),
  },
  {
    path: "/admin/vets",
    element: (
      <RoleGuard allowedRole={[UserRole.STAFF]}>
        <StaffPage />
      </RoleGuard>
    ),
  },
];
