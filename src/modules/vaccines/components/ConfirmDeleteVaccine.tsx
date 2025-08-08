import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Spinner } from "@/components/shared";

interface ConfirmDeleteVaccineProps {
  onConfirm: () => void;
  children: React.ReactNode;
  vaccineName: string;
  isDeleting?: boolean;
}

export const ConfirmDeleteVaccine: React.FC<ConfirmDeleteVaccineProps> = ({
  onConfirm,
  children,
  vaccineName,
  isDeleting = false,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-600">
            Xác nhận xóa vaccine
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p>
              Bạn có chắc chắn muốn xóa vaccine{" "}
              <span className="font-semibold text-gray-900">
                "{vaccineName}"
              </span>{" "}
              không?
            </p>
            <p className="text-sm text-red-500">
              ⚠️ Hành động này không thể hoàn tác và sẽ xóa vĩnh viễn vaccine
              khỏi hệ thống.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Hủy</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            {isDeleting ? (
              <>
                <Spinner className="mr-2 h-4 w-4" />
                Đang xóa...
              </>
            ) : (
              "Xóa vaccine"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
