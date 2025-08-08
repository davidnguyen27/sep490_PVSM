import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Package, Plus } from "lucide-react";
import { toast } from "sonner";

import { useDebounce } from "@/shared/hooks/useDebounce";
import { PageBreadcrumb, SearchLabel, Pagination } from "@/components/shared";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useVaccineExports, useVaccineExportDel } from "../hooks";
import { VaccineExportTable, VaccineExportModalCreate } from "../components";
import VaccineExportDetailPage from "./VaccineExportDetailPage";

export default function VaccineExportsPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedExportId, setSelectedExportId] = useState<number | null>(null);
  const pageSize = 10;

  // Check if we're viewing details
  const vaccineExportId = searchParams.get("vaccineExportId");
  const isViewingDetail = !!vaccineExportId;

  const debouncedSearch = useDebounce(search, 500, { leading: true });
  const deleteVaccineExport = useVaccineExportDel();

  const { data, isPending, isFetching, refetch } = useVaccineExports({
    pageNumber: page,
    pageSize,
    keyWord: debouncedSearch,
  });

  // Check if we should show success message after creating/updating
  useEffect(() => {
    // Don't show success messages when viewing detail
    if (isViewingDetail) return;

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
  }, [searchParams, setSearchParams, refetch, isViewingDetail]);

  const vaccineExports = data?.data.pageData ?? [];
  const totalPages = data?.data.pageInfo.totalPage ?? 1;

  const handleViewDetail = (exportId: number) => {
    setSearchParams({ vaccineExportId: exportId.toString() });
  };

  const handleEdit = (exportId: number) => {
    navigate(`/admin/vaccine-exports/edit?exportId=${exportId}`);
  };

  const handleCreateNew = () => {
    setShowCreateModal(true);
  };

  const handleDelete = (exportId: number) => {
    setSelectedExportId(exportId);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedExportId) {
      await deleteVaccineExport.mutateAsync(selectedExportId);
      setDeleteConfirmOpen(false);
      setSelectedExportId(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmOpen(false);
    setSelectedExportId(null);
  };

  // If viewing detail, render the detail page
  if (isViewingDetail) {
    return <VaccineExportDetailPage />;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-primary font-inter-600 flex items-center gap-2 text-xl">
          <Package /> Danh sách xuất kho vaccine
        </h1>
        <PageBreadcrumb items={["Xuất kho vaccine"]} />
      </div>

      <div className="bg-linen flex flex-wrap items-end justify-between gap-4 p-4 shadow-md">
        <SearchLabel value={search} onChange={setSearch} />
        <Button onClick={handleCreateNew} className="flex items-center gap-2">
          <Plus size={16} />
          Tạo phiếu xuất kho
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

      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa phiếu xuất kho</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa phiếu xuất kho này? Hành động này không
              thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelDelete}>
              Hủy
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={deleteVaccineExport.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteVaccineExport.isPending ? "Đang xóa..." : "Xóa"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <VaccineExportModalCreate
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
      />
    </div>
  );
}
