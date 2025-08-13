import { Hash, Calendar, Package, User, Clock } from "lucide-react";
import { VaccineExportDetailItemInfo } from "./VaccineExportDetailItemInfo";
import type { VaccineExport } from "../types/vaccine-export.type";
import { formatData } from "@/shared/utils/format.utils";

interface VaccineExportMainInfoProps {
  vaccineExport: VaccineExport;
}

// Utility functions similar to vaccine-receipt
const formatExportCode = (vaccineExport: VaccineExport) => {
  return vaccineExport.exportCode || "N/A";
};

const formatExportDate = (vaccineExport: VaccineExport) => {
  return formatData.formatDate(vaccineExport.exportDate);
};

const formatCreatedDate = (vaccineExport: VaccineExport) => {
  return formatData.formatDateTime(vaccineExport.createdAt);
};

const formatStatus = (isDeleted: boolean) => {
  return isDeleted ? "Đã xóa" : "Hoạt động";
};

const getStatusVariant = (isDeleted: boolean) => {
  return isDeleted ? "destructive" : "default";
};

export default function VaccineExportMainInfo({
  vaccineExport,
}: VaccineExportMainInfoProps) {
  return (
    <div className="rounded-none border border-gray-100 bg-white shadow-sm">
      {/* Card Header */}
      <div className="border-b border-gray-100 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 rounded-lg p-2">
            <Hash className="text-primary h-5 w-5" />
          </div>
          <div>
            <h3 className="font-nunito-700 text-lg text-gray-900">
              {formatExportCode(vaccineExport)}
            </h3>
            <p className="font-nunito-400 text-sm text-gray-500">
              Mã phiếu xuất vaccine
            </p>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <div className="space-y-6">
          {/* Basic Information */}
          <div>
            <h4 className="font-nunito-600 mb-4 flex items-center gap-2 text-sm text-gray-700">
              <div className="bg-primary h-1 w-1 rounded-full"></div>
              Thông tin cơ bản
            </h4>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <VaccineExportDetailItemInfo
                icon={Calendar}
                label="Ngày xuất"
                value={formatExportDate(vaccineExport)}
              />
              <VaccineExportDetailItemInfo
                icon={Package}
                label="Trạng thái"
                value="Tình trạng phiếu"
                badge={{
                  variant: getStatusVariant(vaccineExport?.isDeleted ?? false),
                  text: formatStatus(vaccineExport?.isDeleted ?? false),
                }}
              />
            </div>
          </div>

          {/* System Information */}
          <div className="border-t border-gray-50 pt-6">
            <h4 className="font-nunito-600 mb-4 flex items-center gap-2 text-sm text-gray-700">
              <div className="h-1 w-1 rounded-full bg-blue-500"></div>
              Thông tin hệ thống
            </h4>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <VaccineExportDetailItemInfo
                icon={User}
                label="Người tạo"
                value={vaccineExport?.createdBy || "N/A"}
              />
              <VaccineExportDetailItemInfo
                icon={Clock}
                label="Ngày tạo"
                value={formatCreatedDate(vaccineExport)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
