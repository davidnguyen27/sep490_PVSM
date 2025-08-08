import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface VaccineBatchFilterProps {
  status?: string;
  onChange?: (filters: { status: string }) => void;
}

export function VaccineBatchFilter({
  status,
  onChange,
}: VaccineBatchFilterProps) {
  const handleStatusChange = (value: string) => {
    // Convert "all" back to empty string for filtering logic
    const filterValue = value === "all" ? "" : value;
    onChange?.({ status: filterValue });
  };

  const clearFilters = () => {
    onChange?.({ status: "" });
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="font-nunito-500 text-sm">Trạng thái:</span>
        <Select value={status || "all"} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Tất cả" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="active">Còn hạn</SelectItem>
            <SelectItem value="expiring">Sắp hết hạn</SelectItem>
            <SelectItem value="expired">Hết hạn</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {status && (
        <Button
          variant="outline"
          size="sm"
          onClick={clearFilters}
          className="font-nunito-500"
        >
          Xóa bộ lọc
        </Button>
      )}
    </div>
  );
}
