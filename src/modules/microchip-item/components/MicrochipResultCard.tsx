// 📁 src/features/microchip/MicrochipResultCard.tsx
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  ClipboardList,
  Info,
  MapPin,
  PawPrint,
  Phone,
  Search,
  Tag,
  User,
} from "lucide-react";
import { formatData } from "@/shared/utils/format.utils";
import { AppStatusMapped, getBadgeColor } from "@/shared/utils/status.utils";
import type { MicrochipItemByCode } from "../types/microchip-item-by-code.type";
import { useAppointmentDetail } from "../hooks/useAppointmentDetail";
import { AppointmentDetailDialog } from "./MicrochipAppointmentDetail";

interface Props {
  searchCode: string;
  isLoading: boolean;
  error: unknown;
  petInfo: MicrochipItemByCode | undefined;
}

export function MicrochipResultCard({
  searchCode,
  isLoading,
  error,
  petInfo,
}: Props) {
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<
    number | null
  >(null);

  // fetch chi tiết lịch hẹn qua hook đã tách
  const {
    data: appointmentDetail,
    isFetching: isDetailLoading,
    error: detailError,
  } = useAppointmentDetail(selectedAppointmentId, detailOpen);

  const onViewDetail = (appointmentId: number | null) => {
    if (appointmentId == null) return;
    setSelectedAppointmentId(appointmentId);
    setDetailOpen(true);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center gap-2 py-8 text-blue-700">
          <Search className="h-6 w-6 animate-spin" />
          <span>Đang tìm kiếm thông tin...</span>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-red-200">
        <CardContent className="flex items-center justify-center gap-2 py-8">
          <AlertCircle className="h-6 w-6 text-red-500" />
          <span className="text-red-600">
            Không tìm thấy thông tin cho mã microchip này
          </span>
        </CardContent>
      </Card>
    );
  }

  if (petInfo?.pet) {
    const pet = petInfo.pet;
    const customer = pet.customer;

    return (
      <>
        <Card className="rounded-none border-green-200 py-4">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <CardTitle className="font-inter-600 text-green-700">
                Thông tin thú cưng
              </CardTitle>
            </div>
            <CardDescription className="font-nunito-400 flex items-center gap-1">
              <Tag className="h-4 w-4 text-gray-500" /> Đã tìm thấy thông tin
              cho mã microchip:
              <code className="rounded bg-gray-100 px-1.5 py-0.5">
                {searchCode}
              </code>
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <PetInfoBlock pet={pet} />
              <OwnerInfoBlock customer={customer} />
            </div>

            <Separator />

            <MicrochipInfoBlock
              searchCode={searchCode}
              installationDate={petInfo.installationDate}
              status={petInfo.status}
            />

            {pet.appointmentDetails?.length > 0 && (
              <AppointmentTable
                appointments={pet.appointmentDetails}
                onViewDetail={onViewDetail}
              />
            )}
          </CardContent>
        </Card>

        <AppointmentDetailDialog
          open={detailOpen}
          onOpenChange={setDetailOpen}
          isLoading={isDetailLoading}
          error={detailError as unknown}
          detail={appointmentDetail?.data}
        />
      </>
    );
  }

  if (searchCode && !petInfo?.pet && !isLoading) {
    return (
      <Card className="border-amber-200">
        <CardContent className="flex items-center justify-center gap-2 py-8 text-amber-700">
          <Info className="h-5 w-5" />
          <span>Không có dữ liệu thú cưng cho mã microchip này.</span>
        </CardContent>
      </Card>
    );
  }

  return null;
}

const PetInfoBlock = ({ pet }: { pet: MicrochipItemByCode["pet"] }) => (
  <div className="space-y-3">
    <h4 className="font-inter-600 flex items-center gap-2 text-gray-900">
      <PawPrint className="h-5 w-5 text-teal-600" /> Thông tin thú cưng
    </h4>
    <div className="space-y-2">
      <InfoRow label="Tên" value={pet.name} fallback="Chưa có tên" />
      <InfoRow label="Loài" value={pet.species} />
      <InfoRow label="Giống" value={pet.breed} />
      <InfoRow label="Màu sắc" value={pet.color} />
      <InfoRow label="Giới tính" value={pet.gender} />
      <InfoRow label="Cân nặng" value={pet.weight} />
      <div className="flex items-center gap-2">
        <ClipboardList className="h-4 w-4 text-gray-500" />
        <span className="font-nunito-500">Triệt sản:</span>
        <Badge variant={pet.isSterilized ? "default" : "secondary"}>
          {pet.isSterilized ? "Đã triệt sản" : "Chưa triệt sản"}
        </Badge>
      </div>
    </div>
  </div>
);

const OwnerInfoBlock = ({
  customer,
}: {
  customer: MicrochipItemByCode["pet"]["customer"];
}) => (
  <div className="space-y-3">
    <h4 className="font-inter-600 flex items-center gap-2 text-gray-900">
      <User className="h-5 w-5 text-amber-600" /> Thông tin chủ sở hữu
    </h4>
    <div className="space-y-2">
      <InfoRow
        icon={<User className="h-4 w-4 text-gray-500" />}
        label="Tên"
        value={customer?.fullName}
      />
      <InfoRow
        icon={<Phone className="h-4 w-4 text-gray-500" />}
        label="SĐT"
        value={customer?.phoneNumber}
      />
      <InfoRow
        icon={<MapPin className="h-4 w-4 text-gray-500" />}
        label="Địa chỉ"
        value={customer?.address}
      />
      <InfoRow
        icon={<Info className="h-4 w-4 text-gray-500" />}
        label="Email"
        value={customer?.accountResponseDTO?.email}
      />
    </div>
  </div>
);

const MicrochipInfoBlock = ({
  searchCode,
  installationDate,
  status,
}: Pick<MicrochipItemByCode, "installationDate" | "status"> & {
  searchCode: string;
}) => (
  <div className="space-y-3">
    <h4 className="font-inter-600 text-dark flex items-center gap-2">
      <Tag className="h-5 w-5 text-indigo-600" /> Thông tin microchip
    </h4>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <InfoRow
        icon={<Tag className="h-4 w-4 text-gray-500" />}
        label="Mã chip"
        value={searchCode}
        isCode
      />
      <InfoRow
        icon={<Calendar className="h-4 w-4 text-gray-500" />}
        label="Ngày cấy"
        value={formatData.formatDate(installationDate)}
      />
      <div className="flex items-center gap-2">
        <ClipboardList className="h-4 w-4 text-gray-500" />
        <span className="font-nunito-500">Trạng thái:</span>
        <Badge
          className="text-white"
          variant={status === "active" ? "default" : "secondary"}
        >
          {status === "active" ? "Hoạt động" : status}
        </Badge>
      </div>
    </div>
  </div>
);

const AppointmentTable = ({
  appointments,
  onViewDetail,
}: {
  appointments: MicrochipItemByCode["pet"]["appointmentDetails"];
  onViewDetail: (appointmentId: number | null) => void;
}) => (
  <div className="mt-6">
    <h4 className="font-inter-600 text-primary mb-2 flex items-center gap-2 text-base">
      <Calendar className="h-5 w-5" /> Lịch hẹn liên quan
    </h4>
    <div className="overflow-x-auto rounded-none shadow-md">
      <table className="bg-linen min-w-full text-sm">
        <thead>
          <tr className="bg-primary text-white">
            <th className="font-nunito-500 px-3 py-2 text-left">Mã lịch hẹn</th>
            <th className="font-nunito-500 px-3 py-2 text-left">Ngày hẹn</th>
            <th className="font-nunito-500 px-3 py-2 text-left">
              Loại dịch vụ
            </th>
            <th className="font-nunito-500 px-3 py-2 text-left">Trạng thái</th>
            <th className="font-nunito-500 px-3 py-2 text-left">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((a) => (
            <tr key={a.appointmentDetailId} className="border-t">
              <td className="font-nunito-500 px-3 py-2">
                {a.appointmentDetailCode}
              </td>
              <td className="font-nunito-400 px-3 py-2">
                {a.appointmentDate
                  ? formatData.formatDateTime(a.appointmentDate)
                  : "-"}
              </td>
              <td className="font-nunito-400 px-3 py-2">
                {formatData.formatServiceType(a.serviceType)}
              </td>
              <td className="font-nunito-400 px-3 py-2">
                <span
                  className={`font-nunito-600 rounded border px-2 py-0.5 text-xs ${getBadgeColor(a.appointmentStatus)}`}
                >
                  {AppStatusMapped[a.appointmentStatus] || "Không xác định"}
                </span>
              </td>
              <td className="px-3 py-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onViewDetail(a.appointmentId)}
                >
                  Xem chi tiết
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const InfoRow = ({
  icon,
  label,
  value,
  fallback = "Chưa xác định",
  isCode = false,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string | number | null | undefined;
  fallback?: string;
  isCode?: boolean;
}) => (
  <div className="flex items-center gap-2">
    {icon}
    <span className="font-nunito-500">{label}:</span>
    {isCode ? (
      <code className="rounded bg-gray-100 px-2 py-1 text-sm">
        {value || fallback}
      </code>
    ) : (
      <span>{value || fallback}</span>
    )}
  </div>
);
