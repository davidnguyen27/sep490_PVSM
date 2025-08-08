import { useVaccineBatchById } from "../hooks/useVaccineBatchById";

// Components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { VaccineBatchDetail } from "./VaccineBatchDetail";
import Spinner from "@/components/shared/Spinner";

interface Props {
  vaccineBatchId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

export function VaccineBatchDetailModal({
  vaccineBatchId,
  isOpen,
  onClose,
}: Props) {
  const {
    data: vaccineBatch,
    isLoading,
    error,
  } = useVaccineBatchById(vaccineBatchId);

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[95vh] max-w-[95vw] overflow-hidden p-6">
        <DialogHeader className="flex-shrink-0 pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">
              {vaccineBatch
                ? `Lô vaccine: ${vaccineBatch.batchNumber}`
                : "Chi tiết lô vaccine"}
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="custom-scrollbar max-h-[calc(95vh-120px)] overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Spinner />
              <span className="ml-3 text-base text-gray-600">
                Đang tải thông tin...
              </span>
            </div>
          ) : error ? (
            <div className="py-12 text-center">
              <p className="mb-4 text-base text-red-600">
                Có lỗi xảy ra khi tải thông tin lô vaccine.
              </p>
              <Button variant="outline" onClick={onClose} size="lg">
                Đóng
              </Button>
            </div>
          ) : vaccineBatch ? (
            <VaccineBatchDetail vaccineBatch={vaccineBatch} />
          ) : (
            <div className="py-12 text-center">
              <p className="mb-4 text-base text-gray-600">
                Không tìm thấy thông tin lô vaccine.
              </p>
              <Button variant="outline" onClick={onClose} size="lg">
                Đóng
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
