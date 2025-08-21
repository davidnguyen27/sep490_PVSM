import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import type { Handbook } from "../types/handbook.type";

interface HandbookDetailModalProps {
  open: boolean;
  onClose: () => void;
  handbook: Handbook | null;
}

export function HandbookDetailModal({
  open,
  onClose,
  handbook,
}: HandbookDetailModalProps) {
  if (!handbook) return null;

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
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto rounded-none">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-600" />
            Chi tiết Handbook
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Info */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="text-sm font-medium text-gray-500">ID</label>
              <p className="text-gray-900">{handbook.handbookId}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Trạng thái
              </label>
              <div className="mt-1">
                <Badge
                  variant={!handbook.isDeleted ? "default" : "destructive"}
                  className="rounded-none"
                >
                  {!handbook.isDeleted ? "Hoạt động" : "Đã xóa"}
                </Badge>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Người tạo
              </label>
              <p className="text-gray-900">{handbook.createdBy}</p>
            </div>
          </div>

          {/* Image and Title */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            <div className="md:col-span-1">
              <label className="text-sm font-medium text-gray-500">
                Hình ảnh
              </label>
              <div className="mt-2">
                {handbook.imageUrl ? (
                  <img
                    src={handbook.imageUrl}
                    alt={handbook.title}
                    className="h-48 w-full rounded border object-cover"
                  />
                ) : (
                  <div className="flex h-48 w-full items-center justify-center rounded border bg-gray-200">
                    <BookOpen className="h-12 w-12 text-gray-400" />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4 md:col-span-3">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Tiêu đề
                </label>
                <div className="mt-2 rounded border bg-gray-50 p-3">
                  <h2 className="text-xl font-bold text-gray-900">
                    {handbook.title}
                  </h2>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">
                  Điểm nổi bật
                </label>
                <div className="mt-2 rounded border border-blue-200 bg-blue-50 p-3">
                  <p className="font-medium text-blue-800">
                    {handbook.highlight}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Introduction */}
          <div>
            <label className="text-sm font-medium text-gray-500">
              Giới thiệu
            </label>
            <div className="mt-2 rounded border bg-gray-50 p-4">
              <p className="leading-relaxed whitespace-pre-wrap text-gray-900">
                {handbook.introduction}
              </p>
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="text-sm font-medium text-gray-500">
              Nội dung chi tiết
            </label>
            <div className="mt-2 rounded border bg-gray-50 p-4">
              <div className="leading-relaxed whitespace-pre-wrap text-gray-900">
                {handbook.content}
              </div>
            </div>
          </div>

          {/* Important Note */}
          {handbook.importantNote && (
            <div>
              <label className="text-sm font-medium text-gray-500">
                Lưu ý quan trọng
              </label>
              <div className="mt-2 rounded border border-yellow-200 bg-yellow-50 p-4">
                <p className="font-medium whitespace-pre-wrap text-yellow-800">
                  {handbook.importantNote}
                </p>
              </div>
            </div>
          )}

          {/* Timestamps */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-gray-500">
                Ngày tạo
              </label>
              <p className="text-gray-900">{formatDate(handbook.createdAt)}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Ngày cập nhật
              </label>
              <p className="text-gray-900">{formatDate(handbook.modifiedAt)}</p>
            </div>
          </div>

          {handbook.modifiedBy && (
            <div>
              <label className="text-sm font-medium text-gray-500">
                Người cập nhật
              </label>
              <p className="text-gray-900">{handbook.modifiedBy}</p>
            </div>
          )}
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
