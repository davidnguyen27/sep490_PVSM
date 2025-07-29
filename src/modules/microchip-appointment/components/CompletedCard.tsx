import {
  CalendarCheck,
  User,
  PawPrint,
  StickyNote,
  FileText,
  CheckCircle,
  Printer,
  CreditCard,
  Stethoscope,
  Hash,
  MapPin,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui";
import { formatData } from "@/shared/utils/format.utils";
import type { MicrochipDetail } from "../types/detail.type";

interface Props {
  data: MicrochipDetail;
  onExportInvoice?: () => void;
}

export function CompletedCard({ data, onExportInvoice }: Props) {
  const pet = data?.microchip.appointment?.petResponseDTO;
  const customer = data?.microchip.appointment?.customerResponseDTO;
  const payment = data?.microchip?.payment;
  const vet = data?.microchip?.vet;
  const microchipItem = data?.microchip?.microchipItem;

  const isPaid = payment?.paymentStatus === 2;

  return (
    <div className="bg-linen rounded-none border p-6">
      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <CheckCircle className="text-primary" size={28} />
        <h2 className="text-primary font-nunito-600 text-xl">
          Kết quả cấy microchip hoàn thành
        </h2>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
        {/* Thông tin thú cưng */}
        <InfoItem
          icon={<PawPrint size={16} />}
          label="Thú cưng"
          value={pet?.name}
        />
        <InfoItem
          icon={<User size={16} />}
          label="Chủ nuôi"
          value={customer?.fullName}
        />

        {/* Thông tin microchip */}
        <InfoItem
          icon={<Hash size={16} />}
          label="Mã microchip"
          value={microchipItem?.microchipResponse?.microchipCode}
        />
        <InfoItem
          icon={<FileText size={16} />}
          label="Tên microchip"
          value={microchipItem?.microchipResponse?.name}
        />

        {/* Thông tin lịch hẹn */}
        <InfoItem
          icon={<CalendarCheck size={16} />}
          label="Ngày cấy"
          value={formatData.formatDateTime(data?.microchip?.appointmentDate)}
        />
        <InfoItem
          icon={<Clock size={16} />}
          label="Ngày lắp đặt"
          value={formatData.formatDateTime(microchipItem?.installationDate)}
        />

        {/* Thông tin bác sĩ */}
        <InfoItem
          icon={<Stethoscope size={16} />}
          label="Bác sĩ thực hiện"
          value={vet?.name}
        />
        <InfoItem
          icon={<MapPin size={16} />}
          label="Địa điểm"
          value={data?.microchip.appointment?.address}
        />

        {/* Thông tin thanh toán */}
        <InfoItem
          icon={<CreditCard size={16} />}
          label="Số tiền"
          value={
            payment?.amount
              ? `${payment.amount.toLocaleString()} VND`
              : "Chưa có"
          }
        />
        <InfoItem
          icon={<FileText size={16} />}
          label="Tình trạng thanh toán"
          value={
            <span
              className={
                isPaid
                  ? "text-primary font-nunito-600"
                  : "text-danger font-nunito-600"
              }
            >
              {isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
            </span>
          }
        />

        {/* Ghi chú */}
        <InfoItem
          icon={<StickyNote size={16} />}
          label="Ghi chú microchip"
          value={microchipItem?.microchipResponse?.notes || "Không có ghi chú"}
        />
        <InfoItem
          icon={<StickyNote size={16} />}
          label="Mô tả"
          value={microchipItem?.description || "Không có mô tả"}
        />
      </div>

      {/* Export Invoice */}
      {isPaid && onExportInvoice && (
        <div className="mt-6 flex justify-end">
          <Button
            variant="outline"
            className="text-dark"
            onClick={onExportInvoice}
          >
            <Printer /> In hóa đơn
          </Button>
        </div>
      )}
    </div>
  );
}

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}

function InfoItem({ icon, label, value }: InfoItemProps) {
  return (
    <div className="flex items-start gap-2">
      <div className="text-muted-foreground mt-1">{icon}</div>
      <div>
        <div className="text-muted-foreground font-nunito-500 text-xs">
          {label}
        </div>
        <div className="text-foreground font-nunito-500 text-sm">{value}</div>
      </div>
    </div>
  );
}
