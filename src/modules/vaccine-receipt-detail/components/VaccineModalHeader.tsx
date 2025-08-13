import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { VaccineReceiptDetail } from "../types/vaccine-receipt-detal.type";

interface VaccineModalHeaderProps {
  detail: VaccineReceiptDetail | undefined;
}

export function VaccineModalHeader({ detail }: VaccineModalHeaderProps) {
  return (
    <DialogHeader className="flex flex-row items-center justify-between border-b pb-4">
      <DialogTitle className="font-nunito-700 text-xl text-gray-900">
        Chi tiết lô vaccine: {detail?.vaccineBatch?.batchNumber || "N/A"}
      </DialogTitle>
    </DialogHeader>
  );
}
