import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { UserPlus } from "lucide-react";

export function VetCreateFormHeader() {
  return (
    <DialogHeader className="relative border-b pb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 rounded-full p-2">
            <UserPlus className="text-primary h-6 w-6" />
          </div>
          <div>
            <DialogTitle className="font-nunito text-2xl font-bold text-gray-900">
              Thêm bác sỹ mới
            </DialogTitle>
            <p className="font-inter mt-1 text-sm text-gray-600">
              Tạo thông tin bác sỹ mới cho hệ thống
            </p>
          </div>
        </div>
      </div>
    </DialogHeader>
  );
}
