import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Membership } from "../types/membership.type";

interface MembershipCustomerModalProps {
  open: boolean;
  onClose: () => void;
  customer: Membership["customer"][number] | null;
}

export function MembershipCustomerModal({
  open,
  onClose,
  customer,
}: MembershipCustomerModalProps) {
  if (!customer) return null;
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg rounded-none">
        <DialogHeader>
          <DialogTitle>Chi tiết khách hàng</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div className="flex items-center space-x-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
              {customer.image ? (
                <img
                  src={customer.image}
                  alt={customer.fullName}
                  className="h-16 w-16 rounded-full object-cover"
                />
              ) : (
                <span className="text-2xl font-bold text-white">
                  {customer.fullName?.charAt(0) || "?"}
                </span>
              )}
            </div>
            <div>
              <div className="text-xl font-semibold text-gray-900">
                {customer.fullName}
              </div>
              <div className="text-sm text-gray-500">
                {customer.customerCode}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-500 uppercase">
                Số điện thoại
              </div>
              <div className="font-medium">{customer.phoneNumber}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase">Email</div>
              <div className="font-medium">
                {customer.accountResponseDTO?.email || "-"}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase">Ngày sinh</div>
              <div className="font-medium">{customer.dateOfBirth || "-"}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase">Giới tính</div>
              <div className="font-medium">{customer.gender || "-"}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase">
                Điểm hiện tại
              </div>
              <div className="font-medium text-blue-600">
                {customer.currentPoints?.toLocaleString() || 0}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase">
                Điểm đổi được
              </div>
              <div className="font-medium text-green-600">
                {customer.redeemablePoints?.toLocaleString() || 0}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase">
                Tổng chi tiêu
              </div>
              <div className="font-medium text-purple-600">
                {customer.totalSpent?.toLocaleString() || 0} VNĐ
              </div>
            </div>
            <div className="col-span-2">
              <div className="text-xs text-gray-500 uppercase">Địa chỉ</div>
              <div className="font-medium">{customer.address || "-"}</div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose} className="rounded-none" variant="outline">
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
