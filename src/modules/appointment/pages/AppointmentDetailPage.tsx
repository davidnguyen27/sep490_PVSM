import { useSearchParams, useNavigate } from "react-router-dom";
import { useAppointmentDetail } from "../hooks/useAppointmentDetail";
import { PageLoader, PageBreadcrumb } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar } from "lucide-react";
import { AppStatusMapped, getBadgeColor } from "@/shared/utils/status.utils";
import { formatData } from "@/shared/utils/format.utils";

export default function AppointmentDetailPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const appointmentId = searchParams.get("appointmentId");

  const { data: appointment, isPending } = useAppointmentDetail(
    appointmentId ? Number(appointmentId) : null,
  );

  const handleBack = () => {
    navigate("/admin/appointments", { replace: true });
  };

  if (isPending) {
    return (
      <PageLoader loading={true} loadingText="Đang tải thông tin lịch hẹn...">
        <div />
      </PageLoader>
    );
  }

  if (!appointment) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Calendar color="#00B8A9" />
          <h1 className="text-primary font-inter-700 text-2xl">
            Không tìm thấy lịch hẹn
          </h1>
        </div>
        <Button onClick={handleBack} variant="outline">
          <ArrowLeft size={16} className="mr-2" />
          Quay lại danh sách
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Calendar color="#00B8A9" />
        <h1 className="text-primary font-inter-700 text-2xl">
          Chi tiết lịch hẹn
        </h1>
      </div>

      <PageBreadcrumb items={["Lịch hẹn", "Chi tiết"]} />

      <div className="flex items-center gap-4">
        <Button onClick={handleBack} variant="outline">
          <ArrowLeft size={16} className="mr-2" />
          Quay lại danh sách
        </Button>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-md">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-800">
              Thông tin lịch hẹn
            </h3>
            <div className="space-y-3">
              <div>
                <span className="font-medium text-gray-600">Mã lịch hẹn:</span>
                <span className="ml-2 text-gray-900">
                  {appointment.appointmentCode}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-600">Ngày hẹn:</span>
                <span className="ml-2 text-gray-900">
                  {formatData.formatDateTime(appointment.appointmentDate)}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-600">Địa điểm:</span>
                <span className="ml-2 text-gray-900">
                  {appointment.location === 1 ? "Tại trung tâm" : "Tại nhà"}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-600">Địa chỉ:</span>
                <span className="ml-2 text-gray-900">
                  {appointment.address || "-"}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-600">Trạng thái:</span>
                <span
                  className={`ml-2 inline-block rounded-full border px-3 py-1 text-xs font-semibold ${getBadgeColor(appointment.appointmentStatus)}`}
                >
                  {AppStatusMapped[appointment.appointmentStatus] ||
                    "Không xác định"}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-800">
              Thông tin khách hàng & thú cưng
            </h3>
            <div className="space-y-3">
              <div>
                <span className="font-medium text-gray-600">Khách hàng:</span>
                <span className="ml-2 text-gray-900">
                  {appointment.customerResponseDTO?.fullName || "-"}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-600">
                  Số điện thoại:
                </span>
                <span className="ml-2 text-gray-900">
                  {appointment.customerResponseDTO?.phoneNumber || "-"}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-600">Thú cưng:</span>
                <span className="ml-2 text-gray-900">
                  {appointment.petResponseDTO?.name || "-"}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-600">Loài:</span>
                <span className="ml-2 text-gray-900">
                  {appointment.petResponseDTO?.species || "-"}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-600">Giống:</span>
                <span className="ml-2 text-gray-900">
                  {appointment.petResponseDTO?.breed || "-"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
