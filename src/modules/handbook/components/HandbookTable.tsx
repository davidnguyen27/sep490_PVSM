import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Eye, BookOpen } from "lucide-react";
import type { Handbook } from "../types/handbook.type";

interface HandbookTableProps {
  handbooks: Handbook[];
  currentPage: number;
  pageSize: number;
  onView: (handbook: Handbook) => void;
  onEdit: (handbook: Handbook) => void;
  onDelete: (handbook: Handbook) => void;
}

export function HandbookTable({
  handbooks,
  currentPage,
  pageSize,
  onView,
  onEdit,
  onDelete,
}: HandbookTableProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="border-b border-gray-200 bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              STT
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              Hình ảnh
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              Tiêu đề
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              Giới thiệu
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              Trạng thái
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              Người tạo
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              Ngày tạo
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {handbooks.map((handbook: Handbook, index: number) => (
            <tr key={handbook.handbookId} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                {(currentPage - 1) * pageSize + index + 1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {handbook.imageUrl ? (
                  <img
                    src={handbook.imageUrl}
                    alt={handbook.title}
                    className="h-12 w-12 rounded object-cover"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded bg-gray-200">
                    <BookOpen className="h-6 w-6 text-gray-400" />
                  </div>
                )}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                <div className="max-w-xs">
                  <div className="truncate font-medium" title={handbook.title}>
                    {handbook.title}
                  </div>
                  <div
                    className="mt-1 truncate text-xs text-gray-500"
                    title={handbook.highlight}
                  >
                    {handbook.highlight}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                <div
                  className="max-w-xs truncate"
                  title={handbook.introduction}
                >
                  {handbook.introduction}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge
                  variant={!handbook.isDeleted ? "default" : "destructive"}
                  className="rounded-none"
                >
                  {!handbook.isDeleted ? "Hoạt động" : "Đã xóa"}
                </Badge>
              </td>
              <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                {handbook.createdBy}
              </td>
              <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                {formatDate(handbook.createdAt)}
              </td>
              <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                    title="Xem chi tiết"
                    onClick={() => onView(handbook)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-yellow-600 hover:bg-yellow-50 hover:text-yellow-700"
                    title="Chỉnh sửa"
                    onClick={() => onEdit(handbook)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-red-600 hover:bg-red-50 hover:text-red-700"
                    title="Xóa"
                    onClick={() => onDelete(handbook)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
