import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { Vet } from "../types/vet.type";
import Spinner from "@/components/shared/Spinner";

interface Props {
  open: boolean;
  onClose: () => void;
  vet?: Vet;
  isLoading?: boolean;
}

export function VetModal({ open, onClose, vet, isLoading }: Props) {
  if (!vet) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl px-6 py-4">
        <DialogHeader>
          <DialogTitle className="font-nunito text-primary text-2xl">
            Thông tin chi tiết Bác sỹ
          </DialogTitle>
          <DialogDescription className="text-muted-foreground font-nunito-300 text-xs">
            Các thông tin về bác sỹ bạn đang xem
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex h-40 items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="font-nunito text-dark mt-4 grid grid-cols-1 gap-6 text-sm md:grid-cols-2">
            <div className="space-y-2">
              <InfoItem label="Mã bác sỹ" value={vet.vetCode} />
              <InfoItem label="Tên bác sỹ" value={vet.name} />
              <InfoItem label="Ngày sinh" value={vet.dateOfBirth} />
              <InfoItem label="Số điện thoại" value={vet.phoneNumber} />
              <InfoItem label="Chuyên môn" value={vet.specialization} />
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
