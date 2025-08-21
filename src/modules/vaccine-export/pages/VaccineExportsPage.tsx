import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Package, Plus } from "lucide-react";
import { toast } from "sonner";

import { useDebounce } from "@/shared/hooks/useDebounce";
import { PageBreadcrumb, SearchLabel, Pagination } from "@/components/shared";
import { Button } from "@/components/ui/button";

import { useVaccineExports, useVaccineExportDel } from "../hooks";
import { VaccineExportTable } from "../components";
import VaccineExportDetailPage from "./VaccineExportDetailPage";
import VaccineExportCreatePage from "./VaccineExportCreatePage";

export default function VaccineExportsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Set document title
  useEffect(() => {
    document.title = "PVMS | Quản lý phiếu xuất vắc-xin";

    return () => {
      document.title = "PVMS | Phiếu xuất vắc-xin";
    };
  }, []);

  // Check if we're viewing details or creating new
  const vaccineExportId = searchParams.get("vaccineExportId");
  const action = searchParams.get("action");
  const isViewingDetail = !!vaccineExportId;
  const isCreating = action === "create";

  const debouncedSearch = useDebounce(search, 500, { leading: true });
  const { mutate: deleteVaccineExport } = useVaccineExportDel();

  const { data, isPending, isFetching, refetch } = useVaccineExports({
    pageNumber: page,
    pageSize,
    keyWord: debouncedSearch,
  });

  // Check if we should show success message after creating/updating
  useEffect(() => {
    // Don't show success messages when viewing detail or creating new
    if (isViewingDetail || isCreating) return;

    const created = searchParams.get("created");
    const updated = searchParams.get("updated");

    if (created === "true") {
      toast.success("Phiếu xuất kho đã được tạo thành công!");
      // Clean up URL
      setSearchParams({}, { replace: true });
      // Refresh data
      refetch();
    } else if (updated === "true") {
      toast.success("Phiếu xuất kho đã được cập nhật thành công!");
      // Clean up URL
      setSearchParams({}, { replace: true });
      // Refresh data
      refetch();
    }
  }, [searchParams, setSearchParams, refetch, isViewingDetail, isCreating]);

  const vaccineExports = data?.data.pageData ?? [];
  const totalPages = data?.data.pageInfo.totalPage ?? 1;

  const handleViewDetail = (exportId: number) => {
    setSearchParams({ vaccineExportId: exportId.toString() });
  };

  const handleEdit = (exportId: number) => {
    setSearchParams({ exportId: exportId.toString(), action: "edit" });
  };

  const handleCreateNew = () => {
    setSearchParams({ action: "create" });
  };

  const handleDelete = (exportId: number) => {
    deleteVaccineExport(exportId);
  };

  // If viewing detail, render the detail page
  if (isViewingDetail) {
    return <VaccineExportDetailPage />;
  }

  // If creating new, render the create page
  if (isCreating) {
    return <VaccineExportCreatePage />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Package color="#00B8A9" />
        <h1 className="text-primary font-nunito-700 text-2xl">
          Quản lý xuất kho vaccine
        </h1>
      </div>
      <PageBreadcrumb items={["Xuất kho vaccine"]} />

      <div className="flex items-end justify-between p-4">
        <div className="flex items-end justify-between gap-4">
          <SearchLabel value={search} onChange={setSearch} />
        </div>

        <Button
          onClick={handleCreateNew}
          className="font-nunito-600 bg-primary hover:bg-secondary text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          Thêm phiếu xuất kho
        </Button>
      </div>

      <VaccineExportTable
        data={vaccineExports}
        isPending={isPending || isFetching}
        currentPage={page}
        pageSize={pageSize}
        onViewDetail={handleViewDetail}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
}
