import { Card, CardContent } from "@/components/ui/card";
import { formatData } from "@/shared/utils/format.utils";
import { useState } from "react";
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Home,
  MapPin,
  Phone,
  Receipt,
  User,
  Badge,
  Stethoscope,
  Clock,
} from "lucide-react";
import type { VaccinationDetail } from "../types/detail.type";

interface Props {
  data: VaccinationDetail;
}

export function AppointmentInfoCard({ data }: Props) {
  const [open, setOpen] = useState(true);

  return (
    <Card className="bg-linen rounded-none">
      <CardContent className="space-y-4 p-6">
        {/* Header */}
        <div
          className="flex cursor-pointer items-center justify-between border-b pb-3"
          onClick={() => setOpen(!open)}
        >
          <h2 className="font-nunito-700 text-primary flex items-center gap-2 text-lg underline">
            <Clock size={16} />
            Thông tin lịch hẹn
          </h2>
          {open ? (
            <ChevronUp
              size={20}
              className="text-primary transition-transform"
            />
          ) : (
            <ChevronDown
              size={20}
              className="text-primary transition-transform"
            />
          )}
        </div>

        {/* Content */}
        {open && (
          <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2 lg:grid-cols-3">
            <InfoItem
              icon={<Badge size={16} />}
              label="Mã lịch hẹn"
              value={data.appointment.appointmentCode}
            />
            <InfoItem
              icon={<User size={16} />}
              label="Tên khách hàng"
              value={data.appointment.customerResponseDTO.fullName}
            />
            <InfoItem
              icon={<Stethoscope size={16} />}
              label="Dịch vụ"
              value={
                data.appointment.serviceType === 1
                  ? "Tiêm chủng"
                  : data.appointment.serviceType === 2
                    ? "Cấy microchip"
                    : "Cấp chứng nhận"
              }
            />
            <InfoItem
              icon={<Home size={16} />}
              label="Địa điểm"
              value={
                data.appointment.location === 1 ? "Tại trung tâm" : "Tại nhà"
              }
            />
            <InfoItem
              icon={<MapPin size={16} />}
              label="Địa chỉ liên hệ"
              value={
                data.appointment.customerResponseDTO.accountResponseDTO.email
              }
            />
            <InfoItem
              icon={<Phone size={16} />}
              label="Số điện thoại"
              value={data.appointment.customerResponseDTO.phoneNumber}
            />
            <InfoItem
              icon={<Calendar size={16} />}
              label="Ngày hẹn"
              value={formatData.formatDateTime(
                data.appointment.appointmentDate,
              )}
            />
            <InfoItem
              icon={<MapPin size={16} />}
              label="Địa chỉ cụ thể"
              value={data.appointment.address}
            />
            <InfoItem
              icon={<Receipt size={16} />}
              label="Bệnh muốn tiêm"
              value={data.disease?.name}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface InfoItemProps {
  label: string;
  value: string | number | undefined;
  icon: React.ReactNode;
}

function InfoItem({ label, value, icon }: InfoItemProps) {
  return (
    <div className="flex items-start gap-2 rounded-lg border border-[#E3E3E3] bg-[#FFFDFB] p-3">
      <div className="text-primary mt-1">{icon}</div>
      <div className="flex flex-col">
        <span className="text-dark font-nunito-600 text-xs">{label}</span>
        <span className="text-primary text-sm break-words">
          {value || "---"}
        </span>
      </div>
    </div>
  );
}
