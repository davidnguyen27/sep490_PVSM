import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { VaccineBatchAddForm } from "./VaccineBatchAddForm";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function VaccineBatchAddModal({ isOpen, onClose }: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-800">
            Thêm lô vaccine mới
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <VaccineBatchAddForm onSuccess={onClose} onCancel={onClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
