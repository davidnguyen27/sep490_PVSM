import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { VaccineBatchUpdateForm } from "./VaccineBatchUpdateForm";
import type { VaccineBatch } from "../types/vaccine-batch.type";

interface Props {
  vaccineBatch: VaccineBatch | null;
  isOpen: boolean;
  onClose: () => void;
}

export function VaccineBatchUpdateModal({
  vaccineBatch,
  isOpen,
  onClose,
}: Props) {
  if (!vaccineBatch) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto rounded-none">
        <DialogHeader>
          <DialogTitle className="font-nunito-700 text-primary text-xl">
            Cập nhật lô vaccine: {vaccineBatch.batchNumber}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <VaccineBatchUpdateForm
            vaccineBatch={vaccineBatch}
            onSuccess={onClose}
            onCancel={onClose}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
