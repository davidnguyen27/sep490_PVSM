import AdminLayout from "@/shared/layouts/AdminLayout";
import StaffLayout from "@/shared/layouts/StaffLayout";
import { RoleGuard } from "@/routes/guards.route";
import { UserRole } from "@/shared/constants/roles.constants";
import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const CustomerListPage = lazy(() => import("../pages/CustomerListPage"));
const CustomerDetailPage = lazy(() => import("../pages/CustomerDetailPage"));

export const customerRoutes: RouteObject[] = [
  {
    path: "/admin",
    element: (
      <RoleGuard allowedRole={[UserRole.ADMIN]}>
        <AdminLayout />
      </RoleGuard>
    ),
    children: [
      {
        path: "customers",
        element: <CustomerListPage />,
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
        path: "customer-profiles",
        children: [
          {
            index: true,
            element: <CustomerListPage />,
          },
          {
            path: "detail",
            element: <CustomerDetailPage />,
          },
        ],
      },
    ],
  },
];
