import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { Microchip } from "../types/microchip.type";
import Spinner from "@/components/shared/Spinner";
import { formatData } from "@/shared/utils/format.utils";

interface Props {
  open: boolean;
  onClose: () => void;
  microchip?: Microchip;
  isLoading?: boolean;
}

export function MicrochipModal({ open, onClose, microchip, isLoading }: Props) {
  if (!microchip) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl px-6 py-4">
        <DialogHeader>
          <DialogTitle className="font-nunito text-primary text-2xl">
            Thông tin chi tiết Microchip
          </DialogTitle>
          <DialogDescription className="text-muted-foreground font-nunito-300 text-xs">
            Các thông tin về microchip bạn đã chọn
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex h-40 items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="font-nunito text-dark mt-4 grid grid-cols-1 gap-6 text-sm md:grid-cols-2">
            <div className="space-y-2">
              <InfoItem label="Mã vi mạch" value={microchip.microchipCode} />
              <InfoItem label="Tên microchip" value={microchip.name} />
              <InfoItem label="Mô tả ngắn" value={microchip.description} />
              <InfoItem
                label="Giá tiền (vnđ)"
                value={String(formatData.formatCurrency(microchip.price))}
              />
              <InfoItem label="Ghi chú" value={microchip.notes} />
              <InfoItem label="Trạng thái" value={microchip.status} />
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function InfoItem({ label, value }: { label: string; value?: string }) {
  return (
    <p className="text-sm leading-5">
      <span className="font-nunito-600">{label}:</span>{" "}
      <span className="text-muted-foreground font-nunito">{value || "—"}</span>
    </p>
  );
}
