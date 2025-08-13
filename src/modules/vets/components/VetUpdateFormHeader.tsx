import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { UserCheck } from "lucide-react";

export function VetUpdateFormHeader() {
  return (
    <DialogHeader className="relative border-b pb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 rounded-full p-2">
            <UserCheck className="text-primary h-6 w-6" />
          </div>
          <div>
            <DialogTitle className="font-nunito text-2xl font-bold text-gray-900">
              Chỉnh sửa thông tin bác sỹ
            </DialogTitle>
            <p className="font-inter mt-1 text-sm text-gray-600">
              Cập nhật thông tin và chuyên môn của bác sỹ
            </p>
          </div>
        </div>
      </div>
    </DialogHeader>
  );
}
