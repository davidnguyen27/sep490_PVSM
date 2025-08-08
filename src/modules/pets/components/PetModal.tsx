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
  isLoading?: boolean;
}

export function PetModal({ open, onClose, pet, isLoading = false }: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl px-6 py-4">
        <DialogHeader>
          <DialogTitle className="font-nunito text-primary flex items-center text-2xl">
            Thông tin chi tiết thú cưng
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-xs">
            Các thông tin cơ bản về thú cưng bạn đã chọn
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
          </div>
        ) : !pet ? (
          <div className="flex items-center justify-center py-8">
            <p className="text-gray-500">Không tìm thấy thông tin thú cưng</p>
          </div>
        ) : (
          <div className="font-nunito text-dark mt-4 grid grid-cols-1 gap-6 text-sm md:grid-cols-2">
            {/* Image */}
            <div className="col-span-1 flex justify-center md:col-span-2">
              {pet.image ? (
                <img
                  src={
                    typeof pet.image === "string"
                      ? pet.image
                      : pet.image instanceof File
                        ? URL.createObjectURL(pet.image)
                        : undefined
                  }
                  alt={pet.name}
                  className="border-border h-40 w-40 rounded-xl border object-cover shadow"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              ) : (
                <div className="border-border flex h-40 w-40 items-center justify-center rounded-xl border bg-gray-100 shadow">
                  <span className="text-xs text-gray-400">Không có ảnh</span>
                </div>
              )}
            </div>

            {/* Info left */}
            <div className="space-y-2">
              <InfoItem label="Mã thú cưng" value={pet.petCode} />
              <InfoItem label="Tên" value={pet.name} />
              <InfoItem
                label="Loài"
                value={
                  pet.species === "Dog"
                    ? "Chó"
                    : pet.species === "Cat"
                      ? "Mèo"
                      : pet.species
                }
              />
              <InfoItem label="Giống" value={pet.breed} />
              <InfoItem
                label="Giới tính"
                value={
                  pet.gender === "Male"
                    ? "Đực"
                    : pet.gender === "Female"
                      ? "Cái"
                      : pet.gender
                }
              />
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
        )}
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
