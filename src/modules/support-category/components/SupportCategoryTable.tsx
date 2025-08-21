import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Eye } from "lucide-react";
import type { SupportCategory } from "../types/support-category.type";

interface SupportCategoryTableProps {
  supportCategories: SupportCategory[];
  currentPage: number;
  pageSize: number;
  onView: (category: SupportCategory) => void;
  onEdit: (category: SupportCategory) => void;
  onDelete: (category: SupportCategory) => void;
}

export function SupportCategoryTable({
  supportCategories,
  currentPage,
  pageSize,
  onView,
  onEdit,
  onDelete,
}: SupportCategoryTableProps) {
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
              Tiêu đề
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              Mô tả
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              Trạng thái
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
          {supportCategories.map((category: SupportCategory, index: number) => (
            <tr key={category.supportCategoryId} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                {(currentPage - 1) * pageSize + index + 1}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                <div
                  className="max-w-xs truncate font-medium"
                  title={category.title}
                >
                  {category.title}
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                <div className="max-w-xs truncate" title={category.description}>
                  {category.description}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge
                  variant={!category.isDeleted ? "default" : "destructive"}
                  className="rounded-none"
                >
                  {!category.isDeleted ? "Hoạt động" : "Đã xóa"}
                </Badge>
              </td>
              <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                {formatDate(category.createdAt)}
              </td>
              <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                    title="Xem chi tiết"
                    onClick={() => onView(category)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-yellow-600 hover:bg-yellow-50 hover:text-yellow-700"
                    title="Chỉnh sửa"
                    onClick={() => onEdit(category)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-red-600 hover:bg-red-50 hover:text-red-700"
                    title="Xóa"
                    onClick={() => onDelete(category)}
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
