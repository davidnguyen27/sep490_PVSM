import {
  CalendarCheck,
  User,
  PawPrint,
  StickyNote,
  FileText,
  SmilePlus,
  CheckCircle,
  Printer,
} from "lucide-react";
import { Button } from "@/components/ui";
import type { VaccinationDetail } from "../types/detail.type";
import { formatData } from "@/shared/utils/format.utils";

interface Props {
  data: VaccinationDetail;
  onExportInvoice?: () => void;
}

export function CompletedCard({ data, onExportInvoice }: Props) {
  const pet = data.appointment.petResponseDTO;
  const customer = data.appointment.customerResponseDTO;
  const payment = data.payment;

  const isPaid = payment?.paymentStatus === 2;

  return (
    <div className="bg-linen rounded-none border p-6">
      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <CheckCircle className="text-primary" size={28} />
        <h2 className="text-primary font-nunito-600 text-xl">
          Tiêm chủng đã hoàn tất
        </h2>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
        <InfoItem
          icon={<PawPrint size={16} />}
          label="Thú cưng"
          value={pet.name}
        />
        <InfoItem
          icon={<User size={16} />}
          label="Chủ nuôi"
          value={customer.fullName}
        />
        <InfoItem
          icon={<CalendarCheck size={16} />}
          label="Ngày tiêm"
          value={formatData.formatDateTime(data?.appointmentDate)}
        />
        <InfoItem
          icon={<SmilePlus size={16} />}
          label="Phản ứng sau tiêm"
          value={data.reaction || "Không có"}
        />
        <InfoItem
          icon={<StickyNote size={16} />}
          label="Ghi chú"
          value={data.notes || "Không có"}
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
