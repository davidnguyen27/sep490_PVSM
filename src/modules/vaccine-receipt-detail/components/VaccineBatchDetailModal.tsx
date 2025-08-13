import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useGetVaccineReceiptDetailById } from "../hooks";
import {
  VaccineModalHeader,
  VaccineModalLoadingState,
  VaccineBatchInfoSection,
  VaccinePricingStats,
  VaccineStatusSection,
  VaccineDescriptionNotes,
  VaccineSystemInfo,
} from "./index";

interface VaccineBatchDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vaccineReceiptDetailId: number | null;
}

export function VaccineBatchDetailModal({
  open,
  onOpenChange,
  vaccineReceiptDetailId,
}: VaccineBatchDetailModalProps) {
  const {
    data: detail,
    isPending,
    error,
  } = useGetVaccineReceiptDetailById(vaccineReceiptDetailId || 0);

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="modal-scrollbar max-h-[80vh] max-w-[40vw] overflow-y-auto">
        <VaccineModalHeader detail={detail} />

        <VaccineModalLoadingState isPending={isPending} error={error} />

        {!isPending && !error && detail && (
          <div className="space-y-6">
            <VaccineBatchInfoSection detail={detail} />
            <VaccinePricingStats detail={detail} />
            <VaccineStatusSection detail={detail} />
            <VaccineDescriptionNotes detail={detail} />
            <VaccineSystemInfo detail={detail} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
