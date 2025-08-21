import StaffLayout from "@/shared/layouts/StaffLayout";
import { RoleGuard } from "@/routes/guards.route";
import { UserRole } from "@/shared/constants/roles.constants";
import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const InvoicePage = lazy(() => import("../pages/InvoicePage"));
const PaymentListPage = lazy(() => import("../pages/PaymentListPage"));

export const paymentRoutes: RouteObject[] = [
  {
    path: "/staff",
    element: (
      <RoleGuard allowedRole={[UserRole.STAFF]}>
        <StaffLayout />
      </RoleGuard>
    ),
    children: [
      {
        path: "invoice",
        element: <InvoicePage />,
      },
      {
        path: "payments",
        element: <PaymentListPage />,
      },
    ],
  },
];
