import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  onStatusChange: (
    status: "all" | "pending" | "paid" | "cancelled" | "refunded",
  ) => void;
  onMethodChange: (method: "all" | "cash" | "payos") => void;
  onDeletedStatusChange: (deletedStatus: "all" | "active" | "deleted") => void;
  currentStatus: "all" | "pending" | "paid" | "cancelled" | "refunded";
  currentMethod: "all" | "cash" | "payos";
  currentDeletedStatus: "all" | "active" | "deleted";
}

export function PaymentFilter({
  onStatusChange,
  onMethodChange,
  onDeletedStatusChange,
  currentStatus,
  currentMethod,
  currentDeletedStatus,
}: Props) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-1">
        <Label htmlFor="status" className="font-nunito-600 text-xs">
          Trạng thái thanh toán
        </Label>
        <Select
          value={currentStatus}
          onValueChange={(
            value: "all" | "pending" | "paid" | "cancelled" | "refunded",
          ) => onStatusChange(value)}
        >
          <SelectTrigger id="status" className="w-48">
            <SelectValue placeholder="Chọn trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="pending">Chờ thanh toán</SelectItem>
            <SelectItem value="paid">Đã thanh toán</SelectItem>
            <SelectItem value="cancelled">Đã hủy</SelectItem>
            <SelectItem value="refunded">Hoàn tiền</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="method" className="font-nunito-600 text-xs">
          Phương thức thanh toán
        </Label>
        <Select
          value={currentMethod}
          onValueChange={(value: "all" | "cash" | "payos") =>
            onMethodChange(value)
          }
        >
          <SelectTrigger id="method" className="w-48">
            <SelectValue placeholder="Chọn phương thức" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="cash">Tiền mặt</SelectItem>
            <SelectItem value="payos">PayOS</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="deletedStatus" className="font-nunito-600 text-xs">
          Trạng thái dữ liệu
        </Label>
        <Select
          value={currentDeletedStatus}
          onValueChange={(value: "all" | "active" | "deleted") =>
            onDeletedStatusChange(value)
          }
        >
          <SelectTrigger id="deletedStatus" className="w-48">
            <SelectValue placeholder="Chọn trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="active">Đang hoạt động</SelectItem>
            <SelectItem value="deleted">Đã xóa</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
