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

interface Props {
  onConfirm: () => void;
  children: React.ReactNode;
  batchNumber: string;
  isDeleting?: boolean;
}

export function VaccineBatchDeleteConfirm({
  onConfirm,
  children,
  batchNumber,
  isDeleting = false,
}: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild disabled={isDeleting}>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xóa lô vaccine</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn có chắc chắn muốn xóa lô vaccine "{batchNumber}"?
            <br />
            <span className="font-medium text-red-600">
              Hành động này không thể hoàn tác.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Hủy</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700"
          >
            {isDeleting ? "Đang xóa..." : "Xóa"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
