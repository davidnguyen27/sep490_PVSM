import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Phone,
  Calendar,
  Stethoscope,
  IdCard,
  UserCheck,
} from "lucide-react";
import type { Vet } from "../types/vet.type";
import { Spinner } from "@/components/shared";
import { formatData } from "@/shared/utils/format.utils";

interface Props {
  open: boolean;
  onClose: () => void;
  vet?: Vet;
  isLoading?: boolean;
}

export function VetModal({ open, onClose, vet, isLoading }: Props) {
  if (!vet) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
        {/* Header with Close Button */}
        <DialogHeader className="relative border-b pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 rounded-full p-2">
                <UserCheck className="text-primary h-6 w-6" />
              </div>
              <div>
                <DialogTitle className="font-nunito text-2xl font-bold text-gray-900">
                  Thông tin bác sỹ
                </DialogTitle>
                <p className="font-inter mt-1 text-sm text-gray-600">
                  Chi tiết thông tin và chuyên môn của bác sỹ
                </p>
              </div>
            </div>
          </div>
        </DialogHeader>

        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="space-y-6 py-6">
            {/* Doctor Avatar & Status */}
            <div className="text-center">
              <div className="bg-primary/10 mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border-4 border-white shadow-lg">
                <User size={40} className="text-primary" />
              </div>
              <h2 className="font-nunito mb-2 text-xl font-bold text-gray-900">
                {vet.name}
              </h2>
              <Badge
                variant="outline"
                className="border-primary text-primary bg-primary/5"
              >
                <Stethoscope className="mr-1 h-3 w-3" />
                Bác sỹ thú y
              </Badge>
            </div>

            {/* Information Cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Basic Information */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="from-primary/5 to-primary/10 border-b-0 bg-gradient-to-r px-6 py-4">
                  <CardTitle className="font-inter text-primary flex items-center gap-3">
                    <div className="bg-primary/10 rounded-lg p-2">
                      <IdCard size={20} />
                    </div>
                    <span className="font-nunito text-lg font-semibold">
                      Thông tin cơ bản
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 px-6 py-4">
                  <InfoItem
                    icon={<IdCard size={16} className="text-primary" />}
                    label="Mã bác sỹ"
                    value={vet.vetCode}
                  />
                  <InfoItem
                    icon={<User size={16} className="text-green-600" />}
                    label="Họ và tên"
                    value={vet.name}
                  />
                  <InfoItem
                    icon={<Calendar size={16} className="text-orange-600" />}
                    label="Ngày sinh"
                    value={formatData.formatDateYMD(vet.dateOfBirth)}
                  />
                  <InfoItem
                    icon={<Phone size={16} className="text-blue-600" />}
                    label="Số điện thoại"
                    value={vet.phoneNumber}
                  />
                </CardContent>
              </Card>

              {/* Professional Information */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="border-b-0 bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4">
                  <CardTitle className="font-inter flex items-center gap-3 text-blue-700">
                    <div className="rounded-lg bg-blue-100 p-2">
                      <Stethoscope size={20} />
                    </div>
                    <span className="font-nunito text-lg font-semibold">
                      Thông tin chuyên môn
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 px-6 py-4">
                  <InfoItem
                    icon={<Stethoscope size={16} className="text-purple-600" />}
                    label="Chuyên môn"
                    value={vet.specialization}
                  />
                  <div className="mt-4 rounded-lg bg-blue-50 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <UserCheck size={16} className="text-blue-600" />
                      <span className="font-inter text-sm font-medium text-blue-700">
                        Trạng thái hoạt động
                      </span>
                    </div>
                    <Badge className="border-green-200 bg-green-100 text-green-700">
                      Đang hoạt động
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode;
  label: string;
  value?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      {icon && <div className="mt-0.5 flex-shrink-0">{icon}</div>}
      <div className="min-w-0 flex-1">
        <p className="font-inter mb-1 text-sm font-medium text-gray-700">
          {label}
        </p>
        <p className="font-nunito text-sm break-words text-gray-900">
          {value || "—"}
        </p>
      </div>
    </div>
  );
}
