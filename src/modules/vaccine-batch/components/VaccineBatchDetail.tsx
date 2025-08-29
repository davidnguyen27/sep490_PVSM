import { Calendar, Package, Pill, Tag, User, Clock } from "lucide-react";
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

function getStatusBadgeColor(expiryDate: string) {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const timeDiff = expiry.getTime() - today.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  if (daysDiff < 0) return "destructive";
  if (daysDiff <= 30) return "secondary";
  return "default";
}

function getStatusText(expiryDate: string) {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const timeDiff = expiry.getTime() - today.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  if (daysDiff < 0) return "Hết hạn";
  if (daysDiff <= 30) return "Sắp hết hạn";
  return "Còn hạn";
}

export function VaccineBatchDetail({ vaccineBatch }: Props) {
  const vaccine = vaccineBatch.vaccineResponseDTO;

  return (
    <div className="font-nunito space-y-6">
      {/* Tổng quan lô vaccine */}
      <div className="flex flex-col gap-4 rounded-none border bg-gradient-to-r from-blue-50 to-indigo-50 p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <Package className="text-primary h-7 w-7" />
            <span className="text-2xl font-bold text-gray-900">
              Lô: {vaccineBatch.batchNumber}
            </span>
            <Badge
              variant={getStatusBadgeColor(vaccineBatch.expiryDate)}
              className="ml-2 px-3 py-1 text-base"
            >
              {getStatusText(vaccineBatch.expiryDate)}
            </Badge>
          </div>
          <div className="mt-2 flex flex-wrap gap-6 text-sm text-gray-700">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" /> NSX:{" "}
              <b>{formatData.formatDate(vaccineBatch.manufactureDate)}</b>
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" /> HSD:{" "}
              <b>{formatData.formatDate(vaccineBatch.expiryDate)}</b>
            </span>
            <span className="flex items-center gap-1">
              <Pill className="h-4 w-4" /> Số lượng:{" "}
              <b>{vaccineBatch.quantity.toLocaleString()} liều</b>
            </span>
            <span className="flex items-center gap-1">
              <Tag className="h-4 w-4" /> Giá:{" "}
              <b className="text-green-600">
                {vaccine?.price?.toLocaleString()} VNĐ
              </b>
            </span>
          </div>
        </div>
        <div className="flex min-w-[180px] flex-col items-end gap-2">
          <span className="text-xs text-gray-500">Mã vaccine</span>
          <span className="font-nunito text-lg text-gray-800">
            {vaccineBatch.vaccineResponseDTO.vaccineCode}
          </span>
        </div>
      </div>

      {/* Thông tin vaccine */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="bg-linen rounded-none py-4 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Pill className="text-primary h-5 w-5" />
              Thông tin vaccine
            </CardTitle>
            <CardDescription>Loại vaccine trong lô này</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="font-nunito-500 text-sm text-gray-500">
                Tên vaccine
              </label>
              <p className="font-nunito-700 mt-1 text-xl text-gray-900">
                {vaccine?.name}
              </p>
            </div>
            <div>
              <label className="font-nunito-500 text-sm text-gray-500">
                Mô tả
              </label>
              <p className="mt-1 text-sm text-gray-700">
                {vaccine?.description || "Không có mô tả"}
              </p>
            </div>
            <div>
              <label className="font-nunito-500 text-sm text-gray-500">
                Trạng thái
              </label>
              <div className="mt-1">
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
                <label className="font-nunito-500 text-sm text-gray-500">
                  Ghi chú
                </label>
                <p className="mt-1 text-sm text-gray-700">{vaccine.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Thông tin hệ thống */}
        <Card className="bg-linen rounded-none py-4 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="text-primary h-5 w-5" />
              Thông tin hệ thống
            </CardTitle>
            <CardDescription>Lịch sử tạo & cập nhật</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-nunito-600 mb-1 flex items-center gap-1 text-gray-900">
                <User className="h-4 w-4" /> Thông tin tạo
              </h4>
              <div className="space-y-1 text-sm text-gray-600">
                <p>
                  <span className="font-nunito-500">Người tạo:</span>{" "}
                  {vaccineBatch?.createdBy}
                </p>
                <p>
                  <span className="font-nunito-500">Thời gian:</span>{" "}
                  {formatData.formatDateTime(vaccineBatch?.createAt)}
                </p>
              </div>
            </div>
            <Separator />
            <div>
              <h4 className="font-nunito-600 mb-1 flex items-center gap-1 text-gray-900">
                <User className="h-4 w-4" /> Thông tin cập nhật
              </h4>
              <div className="space-y-1 text-sm text-gray-600">
                <p>
                  <span className="font-nunito-500">Người cập nhật:</span>{" "}
                  {vaccineBatch?.modifiedBy}
                </p>
                <p>
                  <span className="font-nunito-500">Thời gian:</span>{" "}
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
