import { useState } from "react";
import { Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/shared";
import { formatData } from "@/shared/utils/format.utils";
import { useExportDetailById } from "../hooks";

interface VaccineExportDetailViewModalProps {
  trigger?: React.ReactNode;
  exportDetailId: number;
}

export function VaccineExportDetailViewModal({
  trigger,
  exportDetailId,
}: VaccineExportDetailViewModalProps) {
  const [open, setOpen] = useState(false);
  const { data: exportDetail, isPending } = useExportDetailById(
    open ? exportDetailId : null,
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Eye size={16} />
            Chi tiết
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye size={20} />
            Chi tiết xuất kho vaccine
          </DialogTitle>
        </DialogHeader>

        {isPending ? (
          <div className="flex h-96 items-center justify-center">
            <Spinner />
          </div>
        ) : exportDetail ? (
          <div className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Thông tin cơ bản</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      ID Chi tiết xuất kho
                    </label>
                    <p className="mt-1 text-sm font-semibold text-blue-600">
                      #{exportDetail.vaccineExportDetailId}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Trạng thái
                    </label>
                    <div className="mt-1">
                      <Badge
                        variant={
                          exportDetail.isDeleted ? "destructive" : "default"
                        }
                      >
                        {exportDetail.isDeleted ? "Đã xóa" : "Hoạt động"}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Số lượng xuất
                    </label>
                    <p className="mt-1 text-sm font-semibold text-green-600">
                      {exportDetail.quantity} đơn vị
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Mục đích xuất kho
                    </label>
                    <p className="mt-1 text-sm">{exportDetail.purpose}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Ngày tạo
                    </label>
                    <p className="mt-1 text-sm">
                      {formatData.formatDateTime(exportDetail.createdAt)}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Cập nhật lần cuối
                    </label>
                    <p className="mt-1 text-sm">
                      {formatData.formatDateTime(exportDetail.modifiedAt)}
                    </p>
                  </div>
                </div>

                {exportDetail.notes && (
                  <>
                    <Separator className="my-4" />
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Ghi chú
                      </label>
                      <p className="mt-1 rounded-md bg-gray-50 p-3 text-sm">
                        {exportDetail.notes}
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Vaccine Batch Information */}
            {exportDetail.vaccineBatch && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Thông tin lô vaccine
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Số lô
                      </label>
                      <p className="mt-1 text-sm font-semibold text-blue-600">
                        {exportDetail.vaccineBatch.batchNumber}
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Tên vaccine
                      </label>
                      <p className="mt-1 text-sm font-semibold">
                        {exportDetail.vaccineBatch.vaccineResponseDTO?.name ||
                          "N/A"}
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Nhà sản xuất
                      </label>
                      <p className="mt-1 text-sm">
                        {exportDetail.vaccineBatch.manufacturer || "N/A"}
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Số lượng tồn kho
                      </label>
                      <p className="mt-1 text-sm">
                        {exportDetail.vaccineBatch.quantity} đơn vị
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Ngày sản xuất
                      </label>
                      <p className="mt-1 text-sm">
                        {formatData.formatDate(
                          exportDetail.vaccineBatch.manufactureDate,
                        )}
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Ngày hết hạn
                      </label>
                      <p className="mt-1 text-sm">
                        {formatData.formatDate(
                          exportDetail.vaccineBatch.expiryDate,
                        )}
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Giá nhập
                      </label>
                      <p className="mt-1 text-sm font-semibold text-green-600">
                        {formatData.formatCurrency(
                          exportDetail.vaccineBatch.vaccineResponseDTO?.price ||
                            0,
                        )}
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Trạng thái lô
                      </label>
                      <div className="mt-1">
                        <Badge
                          variant={
                            exportDetail.vaccineBatch.vaccineResponseDTO
                              ?.isDeleted
                              ? "destructive"
                              : "default"
                          }
                        >
                          {exportDetail.vaccineBatch.vaccineResponseDTO
                            ?.isDeleted
                            ? "Đã xóa"
                            : "Hoạt động"}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {exportDetail.vaccineBatch.vaccineResponseDTO
                    ?.description && (
                    <>
                      <Separator className="my-4" />
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Mô tả vaccine
                        </label>
                        <p className="mt-1 rounded-md bg-gray-50 p-3 text-sm">
                          {
                            exportDetail.vaccineBatch.vaccineResponseDTO
                              .description
                          }
                        </p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          <div className="flex h-96 items-center justify-center">
            <p className="text-gray-500">Không tìm thấy thông tin chi tiết</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
