import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HeadphonesIcon } from "lucide-react";
import type { SupportCategory } from "../types/support-category.type";

interface SupportCategoryDetailModalProps {
  open: boolean;
  onClose: () => void;
  category: SupportCategory | null;
}

export function SupportCategoryDetailModal({
  open,
  onClose,
  category,
}: SupportCategoryDetailModalProps) {
  if (!category) return null;

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
          <DialogTitle className="flex items-center gap-2">
            <HeadphonesIcon className="h-5 w-5 text-blue-600" />
            Chi tiết danh mục hỗ trợ
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">ID</label>
              <p className="text-gray-900">{category.supportCategoryId}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Trạng thái
              </label>
              <div className="mt-1">
                <Badge
                  variant={!category.isDeleted ? "default" : "destructive"}
                  className="rounded-none"
                >
                  {!category.isDeleted ? "Hoạt động" : "Đã xóa"}
                </Badge>
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">Tiêu đề</label>
            <div className="mt-2 rounded border bg-gray-50 p-3">
              <h2 className="text-lg font-bold text-gray-900">
                {category.title}
              </h2>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">Mô tả</label>
            <div className="mt-2 rounded border border-blue-200 bg-blue-50 p-3">
              <p className="whitespace-pre-wrap text-blue-800">
                {category.description}
              </p>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">
              Nội dung chi tiết
            </label>
            <div className="mt-2 rounded border bg-gray-50 p-4">
              <p className="leading-relaxed whitespace-pre-wrap text-gray-900">
                {category.content}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">
                Ngày tạo
              </label>
              <p className="text-gray-900">{formatDate(category.createdAt)}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Ngày cập nhật
              </label>
              <p className="text-gray-900">{formatDate(category.modifiedAt)}</p>
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
