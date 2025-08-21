import { RoleGuard } from "@/routes/guards.route";
import { UserRole } from "@/shared/constants/roles.constants";
import AdminLayout from "@/shared/layouts/AdminLayout";
import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const SettingPage = lazy(() => import("@/shared/pages/SettingPage"));
const AddressManagementPage = lazy(
  () => import("../pages/AddressManagementPage"),
);

export const addressRoutes: RouteObject[] = [
  {
    path: "/admin",
    element: (
      <RoleGuard allowedRole={[UserRole.ADMIN]}>
        <AdminLayout />
      </RoleGuard>
    ),
    children: [
      {
        path: "settings",
        element: <SettingPage />,
      },
      {
        path: "settings/addresses",
        element: <AddressManagementPage />,
      },
    ],
  },
];
