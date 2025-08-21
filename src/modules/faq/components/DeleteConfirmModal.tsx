import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useFAQDelete } from "../hooks/useFAQDelete";
import type { Faq } from "../types/faq.type";

interface DeleteConfirmModalProps {
  open: boolean;
  onClose: () => void;
  faq: Faq | null;
}

export function DeleteConfirmModal({
  open,
  onClose,
  faq,
}: DeleteConfirmModalProps) {
  const deleteMutation = useFAQDelete();

  const handleDelete = () => {
    if (!faq?.faqItemId) return;

    deleteMutation.mutate(faq.faqItemId, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  if (!faq) return null;

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
            Bạn có chắc chắn muốn xóa FAQ này không?
          </p>

          <div className="rounded border bg-gray-50 p-3">
            <p className="mb-1 text-sm text-gray-600">Câu hỏi:</p>
            <p
              className="truncate font-medium text-gray-900"
              title={faq.question}
            >
              {faq.question}
            </p>
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
