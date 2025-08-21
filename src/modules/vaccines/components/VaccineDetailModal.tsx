import { Calendar, User, FileText, Tag, Image } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/shared";

import { formatData } from "@/shared/utils/format.utils";
import type { Vaccine } from "../types/vaccine.type";

interface VaccineDetailModalProps {
  open: boolean;
  onClose: () => void;
  vaccine?: Vaccine;
  isLoading?: boolean;
}

export function VaccineDetailModal({
  open,
  onClose,
  vaccine,
  isLoading = false,
}: VaccineDetailModalProps) {
  if (isLoading) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="modal-scrollbar font-inter max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-center py-20">
            <div className="space-y-4 text-center">
              <Spinner className="mx-auto h-8 w-8" />
              <p className="font-nunito text-gray-500">
                Đang tải thông tin vaccine...
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!vaccine) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="modal-scrollbar font-inter max-w-2xl">
          <div className="py-10 text-center">
            <FileText className="mx-auto mb-4 h-16 w-16 text-gray-400" />
            <p className="font-nunito text-gray-500">
              Không tìm thấy thông tin vaccine
            </p>
            <Button variant="outline" onClick={onClose} className="mt-4">
              Đóng
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="modal-scrollbar font-inter flex max-h-[90vh] flex-col p-0">
        {/* Header cố định */}
        <DialogHeader className="sticky top-0 z-10 border-b bg-white px-6 pt-6 pb-4">
          <DialogTitle className="text-primary font-nunito-700 flex items-center gap-2 text-2xl">
            <FileText className="h-6 w-6" />
            Chi tiết vaccine
          </DialogTitle>
        </DialogHeader>

        {/* Nội dung cuộn */}
        <div className="font-nunito flex-1 space-y-6 overflow-y-auto px-6 py-6">
          {/* Header Info */}
          <div className="font-nunito rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
            <div className="flex items-start gap-6">
              {/* Image */}
              <div className="flex-shrink-0">
                {vaccine.image ? (
                  <img
                    src={vaccine.image}
                    alt={vaccine.name}
                    className="h-32 w-32 rounded-lg border object-cover shadow-sm"
                  />
                ) : (
                  <div className="flex h-32 w-32 items-center justify-center rounded-lg border bg-gray-200">
                    <Image className="h-12 w-12 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Basic Info */}
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="font-nunito-500 text-2xl text-gray-900">
                    {vaccine.name}
                  </h3>
                  <p className="mt-1 flex items-center gap-2 text-gray-600">
                    <Tag className="h-4 w-4" />
                    Mã vaccine:{" "}
                    <span className="font-nunito-500">
                      {vaccine.vaccineCode}
                    </span>
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <Badge
                    variant={
                      vaccine.status === "Active"
                        ? "default"
                        : vaccine.status === "Inactive"
                          ? "secondary"
                          : "destructive"
                    }
                    className="text-sm"
                  >
                    {vaccine.status === "Active"
                      ? "Hoạt động"
                      : vaccine.status === "Inactive"
                        ? "Không hoạt động"
                        : vaccine.status}
                  </Badge>

                  <div className="font-nunito-600 flex items-center gap-1 text-green-600">
                    <Tag className="h-4 w-4" />
                    {formatData.formatCurrency(vaccine.price)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Detailed Information */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Description */}
              <div className="font-nunito rounded-lg border bg-white p-4">
                <h4 className="font-nunito-600 mb-3 flex items-center gap-2 text-gray-900">
                  <FileText className="h-4 w-4 text-blue-500" />
                  Mô tả chi tiết
                </h4>
                <p className="leading-relaxed text-gray-700">
                  {vaccine.description || "Chưa có mô tả"}
                </p>
              </div>

              {/* Notes */}
              {vaccine.notes && (
                <div className="font-nunito rounded-lg border border-amber-200 bg-amber-50 p-4">
                  <h4 className="font-nunito-600 mb-3 flex items-center gap-2 text-amber-800">
                    <FileText className="h-4 w-4 text-amber-600" />
                    Ghi chú
                  </h4>
                  <p className="leading-relaxed text-amber-700">
                    {vaccine.notes}
                  </p>
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Creation Info */}
              <div className="font-nunito rounded-lg border bg-white p-4">
                <h4 className="font-nunito-600 mb-4 flex items-center gap-2 text-gray-900">
                  <Calendar className="h-4 w-4 text-blue-500" />
                  Thông tin tạo
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Ngày tạo:</span>
                    <span className="font-nunito-500">
                      {formatData.formatDateTime(vaccine.createdAt)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Người tạo:</span>
                    <span className="font-nunito-500 flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {vaccine.createdBy || "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Modification Info */}
              <div className="font-nunito rounded-lg border bg-white p-4">
                <h4 className="font-nunito-600 mb-4 flex items-center gap-2 text-gray-900">
                  <Calendar className="h-4 w-4 text-green-500" />
                  Thông tin cập nhật
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Ngày cập nhật:</span>
                    <span className="font-nunito-500">
                      {vaccine.modifiedAt
                        ? formatData.formatDateTime(vaccine.modifiedAt)
                        : "Chưa cập nhật"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Người cập nhật:</span>
                    <span className="font-nunito-500 flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {vaccine.modifiedBy || "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Technical Info */}
              <div className="font-nunito rounded-lg border bg-gray-50 p-4">
                <h4 className="font-nunito-600 mb-4 flex items-center gap-2 text-gray-900">
                  <Tag className="h-4 w-4 text-gray-500" />
                  Thông tin kỹ thuật
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">ID:</span>
                    <span className="font-mono text-gray-800">
                      #{vaccine.vaccineId}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Mã vaccine:</span>
                    <span className="font-mono text-gray-800">
                      {vaccine.vaccineCode}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom cố định */}
        <div className="z-10 flex justify-end gap-3 border-t bg-white px-6 pt-4 pb-6">
          <Button variant="outline" onClick={onClose}>
            Đóng
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
