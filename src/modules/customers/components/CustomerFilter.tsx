import { Label } from "@/components/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  status: string;
  onStatusChange: (status: string) => void;
}

export function CustomerFilter({ status, onStatusChange }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor="status" className="font-nunito text-xs">
        Trạng thái
      </Label>
      <Select value={status} onValueChange={onStatusChange}>
        <SelectTrigger id="status">
          <SelectValue placeholder="Tất cả" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tất cả</SelectItem>
          <SelectItem value="active">Đang hoạt động</SelectItem>
          <SelectItem value="deleted">Đã xóa</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
