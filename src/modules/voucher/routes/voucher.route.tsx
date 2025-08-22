import { RoleGuard } from "@/routes/guards.route";
import { UserRole } from "@/shared/constants/roles.constants";
import StaffLayout from "@/shared/layouts/StaffLayout";
import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const VoucherListPage = lazy(() => import("../pages/VoucherListPage"));

export const voucherRoutes: RouteObject[] = [
  {
    path: "/staff",
    element: (
      <RoleGuard allowedRole={[UserRole.STAFF]}>
        <StaffLayout />
      </RoleGuard>
    ),
    children: [
      {
        path: "vouchers",
        element: <VoucherListPage />,
      },
    ],
  },
];
