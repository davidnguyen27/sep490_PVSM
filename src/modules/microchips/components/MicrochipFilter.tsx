import { Label } from "@/components/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MicrochipFilterProps {
  status: string;
  setStatus: (status: string) => void;
}

export function MicrochipFilter({ status, setStatus }: MicrochipFilterProps) {
  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor="status" className="font-nunito-500 text-xs">
        Trạng thái
      </Label>
      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger id="status">
          <SelectValue placeholder="Đang hoạt động" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="active">Đang hoạt động</SelectItem>
          <SelectItem value="deleted">Đã xóa</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
