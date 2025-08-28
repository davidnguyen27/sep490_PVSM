import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Spinner } from "@/components/shared";

interface AccountConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email?: string;
  isPending: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function AccountConfirmModal({
  open,
  onOpenChange,
  email,
  isPending,
  onCancel,
  onConfirm,
}: AccountConfirmModalProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xác nhận xóa tài khoản</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn có chắc chắn muốn xóa tài khoản "{email}"? Hành động này không
            thể hoàn tác.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel} disabled={isPending}>
            Hủy
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isPending}
            className="bg-red-500 hover:bg-red-600"
          >
            {isPending ? (
              <>
                <Spinner />
                <span className="ml-2">Đang xóa...</span>
              </>
            ) : (
              "Xóa"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
