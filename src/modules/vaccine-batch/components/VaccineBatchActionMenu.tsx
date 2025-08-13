import {
  MoreHorizontal,
  BadgeInfo,
  ExternalLink,
  SquarePen,
  Trash2,
  History,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { VaccineBatchDeleteConfirm } from "./VaccineBatchDeleteConfirm";

interface Props {
  batchNumber: string;
  isDeleting: boolean;
  onQuickView: () => void;
  onDetailView: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onViewHistory: () => void;
}

export function VaccineBatchActionMenu({
  batchNumber,
  isDeleting,
  onQuickView,
  onDetailView,
  onEdit,
  onDelete,
  onViewHistory,
}: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0 hover:bg-gray-100"
          disabled={isDeleting}
        >
          <span className="sr-only">Mở menu thao tác</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={onQuickView} className="cursor-pointer">
          <BadgeInfo className="mr-2 h-4 w-4 text-blue-600" />
          Xem chi tiết nhanh
        </DropdownMenuItem>

        <DropdownMenuItem onClick={onDetailView} className="cursor-pointer">
          <ExternalLink className="mr-2 h-4 w-4 text-blue-600" />
          Mở trang chi tiết
        </DropdownMenuItem>

        <DropdownMenuItem onClick={onViewHistory} className="cursor-pointer">
          <History className="mr-2 h-4 w-4 text-green-600" />
          Xem lịch sử
        </DropdownMenuItem>

        <DropdownMenuItem onClick={onEdit} className="cursor-pointer">
          <SquarePen className="mr-2 h-4 w-4 text-purple-600" />
          Chỉnh sửa
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <VaccineBatchDeleteConfirm
          onConfirm={onDelete}
          batchNumber={batchNumber}
          isDeleting={isDeleting}
        >
          <DropdownMenuItem
            onSelect={(e: Event) => e.preventDefault()}
            className="cursor-pointer text-red-600 focus:text-red-600"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Xóa
          </DropdownMenuItem>
        </VaccineBatchDeleteConfirm>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
