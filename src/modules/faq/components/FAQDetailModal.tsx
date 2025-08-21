import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Faq } from "../types/faq.type";

interface FAQDetailModalProps {
  open: boolean;
  onClose: () => void;
  faq: Faq | null;
}

export function FAQDetailModal({ open, onClose, faq }: FAQDetailModalProps) {
  if (!faq) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl rounded-none">
        <DialogHeader>
          <DialogTitle>Chi tiết FAQ</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">ID</label>
              <p className="text-gray-900">{faq.faqItemId}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Trạng thái
              </label>
              <div className="mt-1">
                <Badge
                  variant={!faq.isDeleted ? "default" : "destructive"}
                  className="rounded-none"
                >
                  {!faq.isDeleted ? "Hoạt động" : "Đã xóa"}
                </Badge>
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">Câu hỏi</label>
            <div className="mt-2 rounded border bg-gray-50 p-3">
              <p className="whitespace-pre-wrap text-gray-900">
                {faq.question}
              </p>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">
              Câu trả lời
            </label>
            <div className="mt-2 rounded border bg-gray-50 p-3">
              <p className="whitespace-pre-wrap text-gray-900">{faq.answer}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">
                Ngày tạo
              </label>
              <p className="text-gray-900">{formatDate(faq.createdAt)}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Ngày cập nhật
              </label>
              <p className="text-gray-900">{formatDate(faq.modifiedAt)}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end border-t pt-4">
          <Button onClick={onClose} variant="outline" className="rounded-none">
            Đóng
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
