import { Label } from "@/components/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function PetFilter() {
  return (
    <>
      <div className="flex flex-col gap-1">
        <Label htmlFor="status" className="font-nunito-600 text-xs">
          Giới tính
        </Label>
        <Select value={status?.toString()}>
          <SelectTrigger id="status">
            <SelectValue placeholder="Mặc định" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Tất cả</SelectItem>
            <SelectItem value="1">Đực</SelectItem>
            <SelectItem value="2">Cái</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="status" className="font-nunito-600 text-xs">
          Loài
        </Label>
        <Select value={status?.toString()}>
          <SelectTrigger id="status">
            <SelectValue placeholder="Mặc định" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Tất cả</SelectItem>
            <SelectItem value="1">Chó</SelectItem>
            <SelectItem value="2">Mèo</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
