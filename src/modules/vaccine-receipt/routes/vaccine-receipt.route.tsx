import { RoleGuard } from "@/routes/guards.route";
import { UserRole } from "@/shared/constants/roles.constants";
import AdminLayout from "@/shared/layouts/AdminLayout";
import StaffLayout from "@/shared/layouts/StaffLayout";
import type { RouteObject } from "react-router-dom";
import { lazy } from "react";

const VaccineReceiptListPage = lazy(
  () => import("../pages/VaccineReceiptListPage"),
);

export const vaccineReceiptRoutes: RouteObject[] = [
  {
    path: "/admin",
    element: (
      <RoleGuard allowedRole={[UserRole.ADMIN]}>
        <AdminLayout />
      </RoleGuard>
    ),
    children: [
      {
        path: "vaccine-receipts",
        element: <VaccineReceiptListPage />,
      },
    ],
  },
  {
    path: "/staff",
    element: (
      <RoleGuard allowedRole={[UserRole.STAFF, UserRole.VET]}>
        <StaffLayout />
      </RoleGuard>
    ),
    children: [
      {
        path: "vaccine-receipts",
        element: <VaccineReceiptListPage />,
      },
    ],
  },
];
