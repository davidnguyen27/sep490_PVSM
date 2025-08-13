import { useSearchParams } from "react-router-dom";
import { lazy, Suspense } from "react";
import { PageLoader } from "@/components/shared";

const VaccineExportsPage = lazy(() => import("../pages/VaccineExportsPage"));
const VaccineExportCreatePage = lazy(
  () => import("../pages/VaccineExportCreatePage"),
);
const EditVaccineExportPage = lazy(
  () => import("../pages/EditVaccineExportPage"),
);

export function VaccineExportRouter() {
  const [searchParams] = useSearchParams();
  const action = searchParams.get("action");
  const exportId = searchParams.get("exportId");

  // Determine which component to render based on query parameters
  let ComponentToRender = VaccineExportsPage;

  if (action === "create") {
    ComponentToRender = VaccineExportCreatePage;
  } else if (action === "edit" && exportId) {
    ComponentToRender = EditVaccineExportPage;
  }

  return (
    <Suspense
      fallback={
        <PageLoader loading={true} loadingText="Đang tải trang...">
          <div />
        </PageLoader>
      }
    >
      <ComponentToRender />
    </Suspense>
  );
}
