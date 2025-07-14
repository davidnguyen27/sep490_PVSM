import { Label } from "@/components/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  location: string;
  status: string;
  onChange: (filters: { location: string; status: string }) => void;
}

export function AppointmentFilter({ location, status, onChange }: Props) {
  return (
    <>
      <div className="flex flex-col gap-1">
        <Label htmlFor="status" className="font-nunito-600 text-xs">
          Trạng thái
        </Label>
        <Select
          value={status}
          onValueChange={(val) => {
            onChange({ location, status: val === "default" ? "" : val });
          }}
        >
          <SelectTrigger id="status">
            <SelectValue placeholder="Tất cả" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Tất cả</SelectItem>
            <SelectItem value="1">Đang xử lý</SelectItem>
            <SelectItem value="2">Đã xác nhận</SelectItem>
            <SelectItem value="3">Đã đến</SelectItem>
            <SelectItem value="4">Đã xử lý</SelectItem>
            <SelectItem value="9">Hoàn tất</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="status" className="font-nunito-600 text-xs">
          Dịch vụ
        </Label>
        <Select
          value={location}
          onValueChange={(val) =>
            onChange({ location: val === "default" ? "" : val, status })
          }
        >
          <SelectTrigger id="location">
            <SelectValue placeholder="Tất cả" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Tất cả</SelectItem>
            <SelectItem value="1">Tại trung tâm</SelectItem>
            <SelectItem value="2">Tại nhà</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
