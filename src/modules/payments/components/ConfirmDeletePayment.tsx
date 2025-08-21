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
import type { Payment } from "../types/payment.type";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  payment: Payment | null;
  isDeleting: boolean;
}

export function ConfirmDeletePayment({
  isOpen,
  onClose,
  onConfirm,
  payment,
  isDeleting,
}: Props) {
  if (!payment) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xác nhận xóa thanh toán</AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p>Bạn có chắc chắn muốn xóa thanh toán này không?</p>
            <div className="rounded-md bg-gray-50 p-3 text-sm">
              <p>
                <strong>Mã thanh toán:</strong> {payment.paymentCode}
              </p>
              <p>
                <strong>Khách hàng ID:</strong> {payment.customerId}
              </p>
              <p>
                <strong>Số tiền:</strong>{" "}
                {payment.amount?.toLocaleString("vi-VN")}đ
              </p>
            </div>
            <p className="font-medium text-red-600">
              ⚠️ Hành động này không thể hoàn tác!
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Hủy</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700"
          >
            {isDeleting ? <ButtonSpinner className="mr-2" /> : null}
            {isDeleting ? "Đang xóa..." : "Xóa"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
