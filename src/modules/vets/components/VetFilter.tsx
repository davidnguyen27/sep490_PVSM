import { Label } from "@/components/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  onFilterChange: (filter: "all" | "active" | "deleted") => void;
  currentFilter: "all" | "active" | "deleted";
}

export function VetFilter({ onFilterChange, currentFilter }: Props) {
  return (
    <>
      <div className="flex flex-col gap-1">
        <Label htmlFor="status" className="font-nunito-600 text-xs">
          Trạng thái
        </Label>
        <Select
          value={currentFilter}
          onValueChange={(value: "all" | "active" | "deleted") =>
            onFilterChange(value)
          }
        >
          <SelectTrigger id="status">
            <SelectValue placeholder="Mặc định" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="active">Đang hoạt động</SelectItem>
            <SelectItem value="deleted">Đã xóa</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
