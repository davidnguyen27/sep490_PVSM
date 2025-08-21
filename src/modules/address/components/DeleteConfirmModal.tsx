import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useAddressDelete } from "../hooks/useAddressDelete";
import type { Address } from "../types/address.type";

interface DeleteConfirmModalProps {
  open: boolean;
  onClose: () => void;
  address: Address | null;
}

export function DeleteConfirmModal({
  open,
  onClose,
  address,
}: DeleteConfirmModalProps) {
  const deleteMutation = useAddressDelete();

  const handleDelete = async () => {
    if (!address?.addressId) return;

    try {
      await deleteMutation.mutateAsync(address.addressId);
      onClose();
    } catch (error) {
      // Error handling is done in the hook
      console.error("Delete error:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-none">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Xác nhận xóa
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Bạn có chắc chắn muốn xóa địa chỉ này không? Hành động này không thể
            hoàn tác.
          </DialogDescription>
        </DialogHeader>

        {address && (
          <div className="rounded border-l-4 border-l-red-500 bg-gray-50 p-3">
            <p className="text-sm font-medium text-gray-900">
              Địa chỉ sẽ bị xóa:
            </p>
            <p className="mt-1 text-sm text-gray-700">{address.location}</p>
          </div>
        )}

        <div className="flex justify-end gap-2 border-t pt-4">
          <Button
            type="button"
            variant="outline"
            className="rounded-none"
            onClick={onClose}
            disabled={deleteMutation.isPending}
          >
            Hủy
          </Button>
          <Button
            type="button"
            variant="destructive"
            className="rounded-none"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? "Đang xóa..." : "Xóa"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
