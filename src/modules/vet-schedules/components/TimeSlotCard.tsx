import { MoreVertical, Trash2, Edit3 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ConfirmDelete } from "@/components/shared";

interface TimeSlot {
  id: number;
  time: string;
  label: string;
}

interface StatusConfig {
  color: string;
  label: string;
}

interface TimeSlotCardProps {
  slot: TimeSlot;
  status: "available" | "unavailable" | "booked" | "late";
  statusConfig: Record<string, StatusConfig>;
  onClick: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
}

export const TimeSlotCard = ({
  slot,
  status,
  statusConfig,
  onClick,
  onEdit,
  onDelete,
  showActions = false,
}: TimeSlotCardProps) => {
  const config = statusConfig[status];
  const hasSchedule =
    status === "available" || status === "booked" || status === "late";

  return (
    <div
      className={`relative cursor-pointer rounded-md border p-2 text-xs transition-all hover:shadow-sm ${config.color}`}
      onClick={onClick}
    >
      <div className="font-medium">{slot.time}</div>
      <div className="mt-1">{config.label}</div>

      {/* Dropdown menu chỉ hiển thị khi có schedule */}
      {hasSchedule && showActions && (
        <div className="absolute top-1 right-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 hover:bg-black/10"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              {onEdit && (
                <DropdownMenuItem onClick={onEdit} className="text-xs">
                  <Edit3 className="mr-2 h-3 w-3" />
                  Chỉnh sửa
                </DropdownMenuItem>
              )}
              {onDelete && (
                <ConfirmDelete onConfirm={onDelete}>
                  <DropdownMenuItem
                    className="text-xs text-red-600 focus:text-red-600"
                    onSelect={(e) => e.preventDefault()}
                  >
                    <Trash2 className="mr-2 h-3 w-3" />
                    Xóa
                  </DropdownMenuItem>
                </ConfirmDelete>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
};
