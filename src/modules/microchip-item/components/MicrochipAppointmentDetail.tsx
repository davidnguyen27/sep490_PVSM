import { useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Search, AlertCircle } from "lucide-react";
import { AppStatusMapped } from "@/shared/utils/status.utils";
import { formatData } from "@/shared/utils/format.utils";
import type { AppointmentDetail } from "../types/appointment-detail.type";

interface AppointmentDetailDialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  isLoading: boolean;
  error: unknown;
  detail: AppointmentDetail | undefined;
}

export function AppointmentDetailDialog({
  open,
  onOpenChange,
  isLoading,
  error,
  detail,
}: AppointmentDetailDialogProps) {
  const mapLocation = (v: number | null | undefined) => {
    switch (v) {
      case 1:
        return "Tại phòng khám";
      case 2:
        return "Tại nhà";
      default:
        return "Khác";
    }
  };

  const overview = useMemo(() => {
    if (!detail) return [] as Array<{ label: string; value: string }>;
    return [
      { label: "Mã lịch hẹn", value: detail.appointmentCode },
      {
        label: "Thời gian",
        value: detail.appointmentDate
          ? formatData.formatDateTime(detail.appointmentDate)
          : "-",
      },
      {
        label: "Loại dịch vụ",
        value: formatData.formatServiceType(detail.serviceType),
      },
      {
        label: "Trạng thái",
        value:
          AppStatusMapped[detail.appointmentStatus] ??
          String(detail.appointmentStatus),
      },
      { label: "Hình thức", value: mapLocation(detail.location) },
      { label: "Địa chỉ", value: detail.address || "-" },
    ];
  }, [detail]);

  const customer = useMemo(() => {
    const c = detail?.customerResponseDTO;
    if (!c) return [] as Array<{ label: string; value: string }>;
    return [
      { label: "Mã khách hàng", value: c.customerCode },
      { label: "Họ tên", value: c.fullName },
      { label: "SĐT", value: c.phoneNumber || "-" },
      { label: "Email", value: c.accountResponseDTO?.email || "-" },
      {
        label: "Hạng thành viên",
        value: c.membershipResponseDTO?.name
          ? `${c.membershipResponseDTO.name} (${c.membershipResponseDTO.rank})`
          : "-",
      },
      { label: "Điểm hiện tại", value: (c.currentPoints ?? 0).toString() },
      { label: "Địa chỉ", value: c.address || "-" },
    ];
  }, [detail]);

  const pet = useMemo(() => {
    const p = detail?.petResponseDTO;
    if (!p)
      return {
        info: [] as Array<{ label: string; value: string }>,
        image: null as string | null,
      };
    return {
      image: p.image,
      info: [
        { label: "Mã thú cưng", value: p.petCode },
        { label: "Tên", value: p.name },
        { label: "Loài/Giống", value: `${p.species} / ${p.breed}` },
        { label: "Giới tính", value: p.gender },
        {
          label: "Ngày sinh",
          value: p.dateOfBirth ? formatData.formatDate(p.dateOfBirth) : "-",
        },
        { label: "Màu sắc", value: p.color || "-" },
        { label: "Cân nặng", value: p.weight || "-" },
        {
          label: "Triệt sản",
          value: p.isSterilized ? "Đã triệt sản" : "Chưa triệt sản",
        },
        { label: "Nơi sống", value: p.placeToLive || "-" },
      ],
    };
  }, [detail]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* p-0 để tự kiểm soát padding từng vùng; flex-col + max-h để body cuộn */}
      <DialogContent className="p-0 sm:max-w-2xl">
        <div className="flex max-h-[80vh] flex-col sm:max-h-[85vh]">
          {/* Header (không cuộn) */}
          <div className="px-6 pt-6">
            <DialogHeader className="p-0">
              <DialogTitle>Chi tiết lịch hẹn</DialogTitle>
              <DialogDescription>
                Thông tin tổng quan, khách hàng và thú cưng.
              </DialogDescription>
            </DialogHeader>
          </div>

          {/* Body cuộn */}
          <div className="modal-scrollbar overflow-y-auto px-6 py-4">
            {isLoading ? (
              <div className="flex items-center gap-2 py-6">
                <Search className="h-5 w-5 animate-spin" />
                Đang tải chi tiết…
              </div>
            ) : error ? (
              <div className="flex items-center gap-2 py-6 text-red-600">
                <AlertCircle className="h-5 w-5" />
                Không thể tải chi tiết.
              </div>
            ) : detail ? (
              <div className="space-y-6">
                {/* Tổng quan */}
                <Section title="Tổng quan cuộc hẹn" items={overview} />

                {/* Khách hàng */}
                <Section title="Khách hàng" items={customer} />

                {/* Thú cưng */}
                <div className="space-y-3">
                  <h4 className="font-inter-600 text-base">Thú cưng</h4>
                  <div className="flex items-start gap-4">
                    {pet.image ? (
                      <img
                        src={pet.image}
                        alt="pet"
                        className="h-20 w-20 rounded-xl object-cover ring-1 ring-gray-200"
                      />
                    ) : null}
                    <div className="grid grid-cols-1 gap-2">
                      {pet.info.map((f) => (
                        <Row key={f.label} label={f.label} value={f.value} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-muted-foreground py-6 text-sm">
                Không có dữ liệu.
              </div>
            )}
          </div>

          {/* Footer (không cuộn) */}
          <div className="bg-card border-t px-6 py-4">
            <DialogFooter className="p-0">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Đóng
              </Button>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// —— UI helpers ——
function Section({
  title,
  items,
}: {
  title: string;
  items: Array<{ label: string; value: string }>;
}) {
  return (
    <div className="space-y-3">
      <h4 className="font-inter-600 text-base">{title}</h4>
      <div className="grid grid-cols-1 gap-2">
        {items.map((f) => (
          <Row key={f.label} label={f.label} value={f.value} />
        ))}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="font-nunito-600 w-40 shrink-0">{label}:</span>
      <span className="font-nunito-400">{value}</span>
    </div>
  );
}
