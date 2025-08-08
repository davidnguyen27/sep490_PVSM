import { Calendar, Package, Pill, DollarSign, User, Clock } from "lucide-react";
import type { VaccineBatch } from "../types/vaccine-batch.type";

// Components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Utils
import { formatData } from "@/shared/utils/format.utils";

interface Props {
  vaccineBatch: VaccineBatch;
}

export function VaccineBatchDetail({ vaccineBatch }: Props) {
  const getStatusBadgeColor = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const timeDiff = expiry.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (daysDiff < 0) {
      return "destructive"; // Expired
    } else if (daysDiff <= 30) {
      return "secondary"; // Expiring soon
    } else {
      return "default"; // Active
    }
  };

  const getStatusText = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const timeDiff = expiry.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (daysDiff < 0) {
      return "Hết hạn";
    } else if (daysDiff <= 30) {
      return "Sắp hết hạn";
    } else {
      return "Còn hạn";
    }
  };

  const vaccine = vaccineBatch.vaccineResponseDTO;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Chi tiết lô vaccine
          </h2>
          <p className="mt-1 text-gray-600">
            Thông tin chi tiết về lô vaccine {vaccineBatch.batchNumber}
          </p>
        </div>
        <Badge variant={getStatusBadgeColor(vaccineBatch.expiryDate)}>
          {getStatusText(vaccineBatch.expiryDate)}
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {/* Thông tin lô vaccine */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Thông tin lô vaccine
            </CardTitle>
            <CardDescription>
              Chi tiết về lô vaccine và thông tin kỹ thuật
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Số lô
                </label>
                <p className="text-sm font-semibold text-gray-900">
                  {vaccineBatch.batchNumber}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Mã vaccine
                </label>
                <p className="text-sm font-semibold text-gray-900">
                  {vaccineBatch.vaccineCode}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Số lượng
                </label>
                <p className="text-primary text-lg font-bold">
                  {vaccineBatch?.quantity.toLocaleString()} liều
                </p>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div>
                <label className="flex items-center gap-1 text-sm font-medium text-gray-500">
                  <Calendar className="h-4 w-4" />
                  Ngày sản xuất
                </label>
                <p className="text-sm font-semibold text-gray-900">
                  {formatData.formatDate(vaccineBatch.manufactureDate)}
                </p>
              </div>
              <div>
                <label className="flex items-center gap-1 text-sm font-medium text-gray-500">
                  <Calendar className="h-4 w-4" />
                  Ngày hết hạn
                </label>
                <p className="text-sm font-semibold text-gray-900">
                  {formatData.formatDate(vaccineBatch.expiryDate)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Thông tin vaccine */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Pill className="h-5 w-5" />
              Thông tin vaccine
            </CardTitle>
            <CardDescription>
              Chi tiết về loại vaccine trong lô này
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">
                Tên vaccine
              </label>
              <p className="text-lg font-semibold text-gray-900">
                {vaccine?.name}
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500">Mô tả</label>
              <p className="text-sm text-gray-700">
                {vaccine?.description || "Không có mô tả"}
              </p>
            </div>

            <Separator />

            <div className="space-y-3">
              <div>
                <label className="flex items-center gap-1 text-sm font-medium text-gray-500">
                  <DollarSign className="h-4 w-4" />
                  Giá (VNĐ)
                </label>
                <p className="text-lg font-bold text-green-600">
                  {vaccine?.price.toLocaleString()}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Trạng thái
                </label>
                <Badge
                  variant={
                    vaccine.status === "Active" ? "default" : "secondary"
                  }
                >
                  {vaccine.status === "Active"
                    ? "Hoạt động"
                    : "Không hoạt động"}
                </Badge>
              </div>
            </div>

            {vaccine.notes && (
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Ghi chú
                </label>
                <p className="text-sm text-gray-700">{vaccine.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Thông tin hệ thống - Card thứ 3 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Thông tin hệ thống
            </CardTitle>
            <CardDescription>Lịch sử tạo và cập nhật</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <h4 className="flex items-center gap-1 font-medium text-gray-900">
                <User className="h-4 w-4" />
                Thông tin tạo
              </h4>
              <div className="space-y-1 text-sm text-gray-600">
                <p>
                  <span className="font-medium">Người tạo:</span>{" "}
                  {vaccineBatch?.createdBy}
                </p>
                <p>
                  <span className="font-medium">Thời gian:</span>{" "}
                  {formatData.formatDateTime(vaccineBatch?.createdAt)}
                </p>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="flex items-center gap-1 font-medium text-gray-900">
                <User className="h-4 w-4" />
                Thông tin cập nhật
              </h4>
              <div className="space-y-1 text-sm text-gray-600">
                <p>
                  <span className="font-medium">Người cập nhật:</span>{" "}
                  {vaccineBatch?.modifiedBy}
                </p>
                <p>
                  <span className="font-medium">Thời gian:</span>{" "}
                  {formatData.formatDateTime(vaccineBatch?.modifiedAt)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
