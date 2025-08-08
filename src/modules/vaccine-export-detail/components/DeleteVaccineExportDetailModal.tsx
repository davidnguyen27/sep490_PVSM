import { useState } from "react";
import { Trash2 } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/shared";
import { useDeleteExportDetail } from "../hooks/useDeleteExportDetail";

interface DeleteVaccineExportDetailModalProps {
  trigger?: React.ReactNode;
  exportDetailId: number;
  batchNumber?: string;
  vaccineName?: string;
  quantity?: number;
}

export function DeleteVaccineExportDetailModal({
  trigger,
  exportDetailId,
  batchNumber,
  vaccineName,
  quantity,
}: DeleteVaccineExportDetailModalProps) {
  const [open, setOpen] = useState(false);
  const { mutate: deleteExportDetail, isPending } = useDeleteExportDetail();

  const handleDelete = () => {
    deleteExportDetail(exportDetailId, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        {trigger || (
          <Button variant="destructive" size="sm">
            <Trash2 size={16} />
            Xóa
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Trash2 size={20} className="text-red-600" />
            Xác nhận xóa chi tiết xuất kho
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p>Bạn có chắc chắn muốn xóa chi tiết xuất kho này không?</p>
            {(batchNumber || vaccineName || quantity) && (
              <div className="mt-4 rounded-lg bg-gray-50 p-3">
                <p className="mb-2 font-medium text-gray-900">
                  Thông tin chi tiết:
                </p>
                <div className="space-y-1 text-sm">
                  {batchNumber && (
                    <div>
                      <span className="text-gray-600">Số lô: </span>
                      <span className="font-medium text-blue-600">
                        {batchNumber}
                      </span>
                    </div>
                  )}
                  {vaccineName && (
                    <div>
                      <span className="text-gray-600">Vaccine: </span>
                      <span className="font-medium">{vaccineName}</span>
                    </div>
                  )}
                  {quantity && (
                    <div>
                      <span className="text-gray-600">Số lượng: </span>
                      <span className="font-medium text-green-600">
                        {quantity} đơn vị
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
            <p className="mt-4 font-medium text-red-600">
              ⚠️ Hành động này không thể hoàn tác!
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel} disabled={isPending}>
            Hủy
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isPending}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            {isPending ? (
              <>
                <Spinner />
                Đang xóa...
              </>
            ) : (
              <>
                <Trash2 size={16} />
                Xác nhận xóa
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
