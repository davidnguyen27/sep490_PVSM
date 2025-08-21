import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, BookOpen } from "lucide-react";
import { useHandbookDelete } from "../hooks/useHandbookDelete";
import type { Handbook } from "../types/handbook.type";

interface DeleteConfirmModalProps {
  open: boolean;
  onClose: () => void;
  handbook: Handbook | null;
}

export function DeleteConfirmModal({
  open,
  onClose,
  handbook,
}: DeleteConfirmModalProps) {
  const deleteMutation = useHandbookDelete();

  const handleDelete = () => {
    if (!handbook?.handbookId) return;

    deleteMutation.mutate(handbook.handbookId, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  if (!handbook) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-none">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Xác nhận xóa
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-gray-700">
            Bạn có chắc chắn muốn xóa handbook này không?
          </p>

          <div className="rounded border bg-gray-50 p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                {handbook.imageUrl ? (
                  <img
                    src={handbook.imageUrl}
                    alt={handbook.title}
                    className="h-16 w-16 rounded object-cover"
                  />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded bg-gray-200">
                    <BookOpen className="h-8 w-8 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="mb-1 text-sm text-gray-600">Tiêu đề:</p>
                <p className="font-medium text-gray-900" title={handbook.title}>
                  {handbook.title}
                </p>
                <p
                  className="mt-1 text-xs text-gray-500"
                  title={handbook.highlight}
                >
                  {handbook.highlight}
                </p>
              </div>
            </div>
          </div>

          <p className="text-sm text-red-600">
            Hành động này không thể hoàn tác.
          </p>
        </div>

        <div className="flex justify-end gap-2 border-t pt-4">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={deleteMutation.isPending}
            className="rounded-none"
          >
            Hủy
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="rounded-none"
          >
            {deleteMutation.isPending ? "Đang xóa..." : "Xóa"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
