import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ButtonSpinner } from "@/components/shared";
import type { VaccineSchedule } from "../types/vaccine-schedule.type";

interface DeleteVaccineScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  schedule: VaccineSchedule | null;
  isLoading?: boolean;
}

export const DeleteVaccineScheduleModal = ({
  isOpen,
  onClose,
  onConfirm,
  schedule,
  isLoading = false,
}: DeleteVaccineScheduleModalProps) => {
  if (!schedule) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="rounded-none">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-inter-600 text-danger">
            Xác nhận xóa lịch tiêm
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p>
              Bạn có chắc chắn muốn xóa lịch tiêm{" "}
              <span className="font-nunito-500 text-danger">
                "{schedule.disease.name}"
              </span>{" "}
              ?
            </p>
            <div className="rounded-md bg-gray-50 p-3 text-sm">
              <p>
                <strong>Loài:</strong>{" "}
                {schedule.species === "Dog" ? "Chó" : "Mèo"}
              </p>
              <p>
                <strong>Liều thứ:</strong> {schedule.doseNumber}
              </p>
              <p>
                <strong>Khoảng cách:</strong> {schedule.ageInterval} tuần
              </p>
            </div>
            <p className="text-danger">
              Hành động này không thể hoàn tác được.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading} className="font-nunito-500">
            Hủy
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-danger hover:bg-danger/90 font-nunito-500"
          >
            {isLoading ? <ButtonSpinner /> : "Xóa"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
