import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Package, Edit, Trash2, Plus } from "lucide-react";

import { PageBreadcrumb } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import { formatData } from "@/shared/utils/format.utils";

import { useVaccineExportById, useVaccineExportDel } from "../hooks";
import { useExportDetailByExport } from "@/modules/vaccine-export-detail/hooks";
import {
  VaccineExportDetailTable,
  AddVaccineExportDetailModal,
} from "@/modules/vaccine-export-detail/components";

export default function VaccineExportDetailPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const exportId = searchParams.get("vaccineExportId");

  const { data: vaccineExport, isPending } = useVaccineExportById(
    Number(exportId),
  );
  const { data: exportDetails, isPending: isLoadingDetails } =
    useExportDetailByExport(Number(exportId));
  const deleteVaccineExport = useVaccineExportDel();

  const handleGoBack = () => {
    setSearchParams({});
  };

  const handleEdit = () => {
    navigate(`/admin/vaccine-exports/edit?exportId=${exportId}`);
  };

  const handleDelete = () => {
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (exportId) {
      await deleteVaccineExport.mutateAsync(Number(exportId));
      setDeleteConfirmOpen(false);
      setSearchParams({});
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmOpen(false);
  };

  if (isPending) {
    return (
      <div className="flex min-h-96 items-center justify-center">
        <div className="text-center">
          <div className="border-primary mx-auto h-12 w-12 animate-spin rounded-full border-b-2"></div>
          <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  if (!vaccineExport) {
    return (
      <div className="flex min-h-96 items-center justify-center">
        <div className="text-center">
          <Package className="mx-auto mb-4 h-16 w-16 text-gray-400" />
          <p className="text-gray-600">Không tìm thấy thông tin xuất kho</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={handleGoBack}>
            <ArrowLeft size={16} />
          </Button>
          <h1 className="text-primary font-inter-600 flex items-center gap-2 text-xl">
            <Package /> Chi tiết xuất kho vaccine
          </h1>
        </div>
        <PageBreadcrumb items={["Trang chủ", "Xuất kho vaccine", "Chi tiết"]} />
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Package size={20} />
              Thông tin phiếu xuất kho
            </CardTitle>
            {!vaccineExport.isDeleted && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleEdit}
                  className="flex items-center gap-2"
                >
                  <Edit size={16} />
                  Chỉnh sửa
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDelete}
                  className="flex items-center gap-2"
                >
                  <Trash2 size={16} />
                  Xóa
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Mã xuất kho
                </label>
                <p className="text-primary mt-1 text-sm font-semibold">
                  {vaccineExport.exportCode}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Ngày xuất kho
                </label>
                <p className="mt-1 text-sm">
                  {formatData.formatDate(vaccineExport.exportDate)}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Trạng thái
                </label>
                <div className="mt-1">
                  <Badge
                    variant={
                      vaccineExport.isDeleted ? "destructive" : "default"
                    }
                  >
                    {vaccineExport.isDeleted ? "Đã xóa" : "Hoạt động"}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Người tạo
                </label>
                <p className="mt-1 text-sm">{vaccineExport.createdBy}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Ngày tạo
                </label>
                <p className="mt-1 text-sm">
                  {formatData.formatDateTime(vaccineExport.createdAt)}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Lần sửa cuối
                </label>
                <p className="mt-1 text-sm">
                  {formatData.formatDateTime(vaccineExport.modifiedAt)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Export Details Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Package size={20} />
              Danh sách chi tiết xuất kho
            </CardTitle>
            <AddVaccineExportDetailModal
              vaccineExportId={Number(exportId)}
              trigger={
                <Button>
                  <Plus size={16} />
                  Thêm lô vaccine
                </Button>
              }
            />
          </div>
        </CardHeader>
        <CardContent>
          <VaccineExportDetailTable
            data={exportDetails || []}
            isPending={isLoadingDetails}
          />
        </CardContent>
      </Card>

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
    </div>
  );
}
