import { RoleGuard } from "@/routes/guards.route";
import { UserRole } from "@/shared/constants/roles.constants";
import AdminLayout from "@/shared/layouts/AdminLayout";
import StaffLayout from "@/shared/layouts/StaffLayout";
import type { RouteObject } from "react-router-dom";
import { lazy } from "react";

const VaccineListPage = lazy(() => import("../pages/VaccineListPage"));
const VaccineExportHistoryPage = lazy(
  () =>
    import("@/modules/vaccine-export-detail/pages/VaccineExportHistoryPage"),
);
const VaccineImportHistoryPage = lazy(
  () =>
    import("@/modules/vaccine-receipt-detail/pages/VaccineBatchHistoryPage"),
);

export const vaccineRoutes: RouteObject[] = [
  {
    path: "/admin",
    element: (
      <RoleGuard allowedRole={[UserRole.ADMIN]}>
        <AdminLayout />
      </RoleGuard>
    ),
    children: [
      {
        path: "vaccines",
        element: <VaccineListPage />,
      },
      {
        path: "vaccine-export-history",
        element: <VaccineExportHistoryPage />,
      },
      {
        path: "vaccine-import-history",
        element: <VaccineImportHistoryPage />,
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
        path: "vaccines",
        element: <VaccineListPage />,
      },
      {
        path: "vaccine-export-history",
        element: <VaccineExportHistoryPage />,
      },
      {
        path: "vaccine-import-history",
        element: <VaccineImportHistoryPage />,
      },
    ],
  },
];
