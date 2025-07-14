import { Label } from "@/components/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function VetFilter() {
  return (
    <>
      <div className="flex flex-col gap-1">
        <Label htmlFor="status" className="font-nunito-600 text-xs">
          Trạng thái
        </Label>
        <Select value={status?.toString()}>
          <SelectTrigger id="status">
            <SelectValue placeholder="Mặc định" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Tất cả</SelectItem>
            <SelectItem value="Active">Đã xóa</SelectItem>
            <SelectItem value="Available">Đã kích hoạt</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
