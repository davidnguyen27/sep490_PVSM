import { Label } from "@/components/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AccountFilterProps {
  status: string;
  onStatusChange: (status: string) => void;
}

export function AccountFilter({ status, onStatusChange }: AccountFilterProps) {
  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor="status" className="font-nunito-500 text-xs">
        Trạng thái
      </Label>
      <Select value={status} onValueChange={onStatusChange}>
        <SelectTrigger id="status">
          <SelectValue placeholder="Đang hoạt động" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="true">Đang hoạt động</SelectItem>
          <SelectItem value="false">Chưa xác thực</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
