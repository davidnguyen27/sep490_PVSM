import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown,
  Download,
  Edit,
  Trash2,
  Copy,
  FileText,
  CheckCircle2,
  XCircle,
} from "lucide-react";

interface BulkOperationsProps {
  selectedItems: string[];
  totalItems: number;
  onSelectAll: (checked: boolean) => void;
  onBulkEdit: () => void;
  onBulkDelete: () => void;
  onBulkExport: () => void;
  onBulkDuplicate: () => void;
  onBulkActivate: () => void;
  onBulkDeactivate: () => void;
}

export function BulkOperations({
  selectedItems,
  totalItems,
  onSelectAll,
  onBulkEdit,
  onBulkDelete,
  onBulkExport,
  onBulkDuplicate,
  onBulkActivate,
  onBulkDeactivate,
}: BulkOperationsProps) {
  const [isAllSelected, setIsAllSelected] = useState(false);

  const handleSelectAll = (checked: boolean) => {
    setIsAllSelected(checked);
    onSelectAll(checked);
  };

  const hasSelection = selectedItems.length > 0;

  return (
    <div
      className={`transition-all duration-300 ${hasSelection ? "bg-primary/5 border-primary/20" : "border-gray-200 bg-gray-50"} rounded-none border p-4`}
    >
      <div className="flex items-center justify-between">
        {/* Selection Controls */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={isAllSelected}
              onCheckedChange={handleSelectAll}
              className="data-[state=checked]:bg-primary border-primary"
            />
            <label className="font-nunito-600 text-dark text-sm">
              Chọn tất cả ({totalItems})
            </label>
          </div>

          {hasSelection && (
            <Badge
              variant="default"
              className="bg-primary font-nunito-600 text-white"
            >
              {selectedItems.length} đã chọn
            </Badge>
          )}
        </div>

        {/* Bulk Actions */}
        {hasSelection && (
          <div className="flex items-center gap-2">
            {/* Quick Actions */}
            <Button
              variant="outline"
              size="sm"
              onClick={onBulkExport}
              className="font-nunito-600 border-primary/30 text-primary hover:bg-primary/5"
            >
              <Download className="mr-1 h-4 w-4" />
              Xuất
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onBulkEdit}
              className="font-nunito-600 border-info/30 text-info hover:bg-info/5"
            >
              <Edit className="mr-1 h-4 w-4" />
              Sửa
            </Button>

            {/* More Actions Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="font-nunito-600 border-gray-300 hover:bg-gray-50"
                >
                  Thêm
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={onBulkDuplicate}>
                  <Copy className="mr-2 h-4 w-4" />
                  Nhân bản lịch tiêm
                </DropdownMenuItem>

                <DropdownMenuItem onClick={onBulkActivate}>
                  <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                  Kích hoạt
                </DropdownMenuItem>

                <DropdownMenuItem onClick={onBulkDeactivate}>
                  <XCircle className="mr-2 h-4 w-4 text-orange-500" />
                  Tạm ngừng
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem>
                  <FileText className="mr-2 h-4 w-4" />
                  Tạo template
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={onBulkDelete}
                  className="text-red-600 focus:text-red-600"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Xóa đã chọn
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  );
}
