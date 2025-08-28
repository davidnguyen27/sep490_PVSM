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
      <DialogContent className="font-nunito max-h-[90vh] max-w-2xl overflow-y-auto rounded-none">
        <DialogHeader>
          <DialogTitle className="font-nunito-700 text-primary text-lg">
            Thêm lô vắc-xin mới
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <VaccineBatchAddForm onSuccess={onClose} onCancel={onClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
