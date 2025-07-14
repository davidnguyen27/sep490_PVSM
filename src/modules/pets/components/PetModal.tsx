import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { formatData } from "@/shared/utils/format.utils";
import type { Pet } from "../types/pet.type";

interface Props {
  open: boolean;
  onClose: () => void;
  pet?: Pet;
}

export function PetModal({ open, onClose, pet }: Props) {
  if (!pet) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl px-6 py-4">
        <DialogHeader>
          <DialogTitle className="font-nunito text-primary text-2xl">
            🐶 Thông tin chi tiết thú cưng
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-xs">
            Các thông tin cơ bản về thú cưng bạn đã chọn
          </DialogDescription>
        </DialogHeader>

        <div className="font-nunito text-dark mt-4 grid grid-cols-1 gap-6 text-sm md:grid-cols-2">
          {/* Image */}
          <div className="col-span-1 flex justify-center md:col-span-2">
            <img
              src={pet.image}
              alt={pet.name}
              className="border-border h-40 w-40 rounded-xl border object-cover shadow"
            />
          </div>

          {/* Info left */}
          <div className="space-y-2">
            <InfoItem label="Mã thú cưng" value={pet.petCode} />
            <InfoItem label="Tên" value={pet.name} />
            <InfoItem label="Loài" value={pet.species} />
            <InfoItem label="Giống" value={pet.breed} />
            <InfoItem label="Giới tính" value={pet.gender} />
            <InfoItem
              label="Ngày sinh"
              value={formatData.formatDate(pet.dateOfBirth)}
            />
          </div>

          {/* Info right */}
          <div className="space-y-2">
            <InfoItem label="Cân nặng" value={`${pet.weight} kg`} />
            <InfoItem label="Màu sắc" value={pet.color} />
            <InfoItem label="Nơi sinh" value={pet.placeOfBirth} />
            <InfoItem label="Nơi ở hiện tại" value={pet.placeToLive} />
            <InfoItem label="Quốc tịch" value={pet.nationality} />
            <InfoItem
              label="Triệt sản"
              value={pet.isSterilized ? "Đã triệt sản" : "Chưa triệt sản"}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function InfoItem({ label, value }: { label: string; value?: string }) {
  return (
    <p className="text-sm leading-5">
      <span className="font-semibold">{label}:</span>{" "}
      <span className="text-muted-foreground">{value || "—"}</span>
    </p>
  );
}
