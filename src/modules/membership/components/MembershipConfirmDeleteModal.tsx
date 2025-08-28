import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Membership } from "../types/membership.type";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  membership?: Membership | null;
  isLoading?: boolean;
}

export default function MembershipConfirmDeleteModal({
  open,
  onClose,
  onConfirm,
  membership,
  isLoading,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Xác nhận xóa hạng thành viên</DialogTitle>
        </DialogHeader>
        <div className="py-4 text-center">
          <p>
            Bạn có chắc chắn muốn xóa hạng thành viên <b>{membership?.name}</b>?
          </p>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Hủy
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Đang xóa..." : "Xóa"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
