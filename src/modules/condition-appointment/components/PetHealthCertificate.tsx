import { forwardRef } from "react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import type { ConditionAppointments } from "../types/condition.type";

interface Props {
  data: ConditionAppointments;
}

export const PetHealthCertificate = forwardRef<HTMLDivElement, Props>(
  ({ data }, ref) => {
    const pet = data.appointment?.petResponseDTO;
    const customer = data.appointment?.customerResponseDTO;
    const healthCondition = data.healthCondition;
    const vaccine = data.vaccineBatch;
    const microchip = data.microchip;
    const vet = data.vet;

    const formatDate = (dateString: string) => {
      try {
        return format(new Date(dateString), "dd/MM/yyyy", { locale: vi });
      } catch {
        return dateString;
      }
    };

    const formatDateTime = (dateString: string) => {
      try {
        return format(new Date(dateString), "dd/MM/yyyy 'lúc' HH:mm", {
          locale: vi,
        });
      } catch {
        return dateString;
      }
    };

    return (
      <div ref={ref} className="mx-auto bg-white p-8">
        <style
          dangerouslySetInnerHTML={{
            __html: `
            @media print {
              @page {
                size: A4;
                margin: 1cm;
              }
              body {
                margin: 0 !important;
                padding: 0 !important;
                background: white !important;
              }
              .print\\:hidden {
                display: none !important;
              }
            }
          `,
          }}
        />

        {/* Certificate Content */}
        <div
          className="border-2 border-gray-800 bg-white shadow-lg print:shadow-none"
          style={{ fontFamily: "'Times New Roman', serif" }}
        >
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mb-4 flex items-center justify-center gap-4">
              <img
                src="/src/assets/images/vaxpet-logo.svg"
                alt="VaxPet Logo"
                className="h-16 w-16"
              />
              <div>
                <h1 className="text-2xl font-bold text-blue-800">
                  TRUNG TÂM CHĂM SÓC THÚ CƯNG VAXPET
                </h1>
                <p className="text-sm text-gray-600">
                  Địa chỉ: 7 Phan Đăng Lưu, Phường 1, Quận Bình Thạnh, Hồ Chí
                  Minh
                </p>
                <p className="text-sm text-gray-600">
                  Điện thoại: (028) 1234-5678 | Email: info@vaxpet.com
                </p>
              </div>
            </div>

            <div className="border-t-2 border-blue-800 pt-4">
              <h2 className="text-xl font-bold text-red-600">
                GIẤY CHỨNG NHẬN SỨC KHỎE THÚ CƯNG
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                PET HEALTH CERTIFICATE
              </p>
            </div>
          </div>

          {/* Certificate Number and Date */}
          <div className="mb-6 flex justify-between">
            <div>
              <p className="text-sm">
                <strong>Số giấy chứng nhận:</strong>{" "}
                {healthCondition?.conditionCode || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm">
                <strong>Ngày cấp:</strong>{" "}
                {formatDate(healthCondition?.checkDate || "")}
              </p>
            </div>
          </div>

          {/* Pet and Owner Information */}
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Pet Information */}
            <div className="rounded-lg border border-gray-300 p-4">
              <h3 className="mb-3 text-lg font-semibold text-blue-700">
                THÔNG TIN THÚ CƯNG
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Tên:</strong> {pet?.name || "N/A"}
                </p>
                <p>
                  <strong>Mã số:</strong> {pet?.petCode || "N/A"}
                </p>
                <p>
                  <strong>Loài:</strong> {pet?.species || "N/A"}
                </p>
                <p>
                  <strong>Giống:</strong> {pet?.breed || "N/A"}
                </p>
                <p>
                  <strong>Giới tính:</strong> {pet?.gender || "N/A"}
                </p>
                <p>
                  <strong>Ngày sinh:</strong>{" "}
                  {formatDate(pet?.dateOfBirth || "")}
                </p>
                <p>
                  <strong>Màu sắc:</strong> {pet?.color || "N/A"}
                </p>
                <p>
                  <strong>Cân nặng:</strong> {pet?.weight || "N/A"} kg
                </p>
                <p>
                  <strong>Quê quán:</strong> {pet?.nationality || "N/A"}
                </p>
                <p>
                  <strong>Triệt sản:</strong>{" "}
                  {pet?.isSterilized ? "Có" : "Không"}
                </p>
              </div>
            </div>

            {/* Owner Information */}
            <div className="rounded-lg border border-gray-300 p-4">
              <h3 className="mb-3 text-lg font-semibold text-blue-700">
                THÔNG TIN CHỦ SỞ HỮU
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Họ tên:</strong> {customer?.fullName || "N/A"}
                </p>
                <p>
                  <strong>Mã khách hàng:</strong>{" "}
                  {customer?.customerCode || "N/A"}
                </p>
                <p>
                  <strong>Số điện thoại:</strong>{" "}
                  {customer?.phoneNumber || "N/A"}
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  {customer?.accountResponseDTO?.email || "N/A"}
                </p>
                <p>
                  <strong>Ngày sinh:</strong>{" "}
                  {formatDate(customer?.dateOfBirth || "")}
                </p>
                <p>
                  <strong>Giới tính:</strong> {customer?.gender || "N/A"}
                </p>
                <p>
                  <strong>Địa chỉ:</strong> {customer?.address || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Microchip Information */}
          {microchip && (
            <div className="mb-6 rounded-lg border border-gray-300 p-4">
              <h3 className="mb-3 text-lg font-semibold text-green-700">
                THÔNG TIN MICROCHIP
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Mã Microchip:</strong> {microchip.microchipCode}
                  </p>
                  <p>
                    <strong>Tên sản phẩm:</strong> {microchip.name}
                  </p>
                  <p>
                    <strong>Mô tả:</strong> {microchip.description}
                  </p>
                </div>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Trạng thái:</strong>
                    <span className="ml-2 rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                      {microchip.status}
                    </span>
                  </p>
                  <p>
                    <strong>Ghi chú:</strong> {microchip.notes || "Không có"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Vaccination Information */}
          {vaccine && (
            <div className="mb-6 rounded-lg border border-gray-300 p-4">
              <h3 className="mb-3 text-lg font-semibold text-purple-700">
                THÔNG TIN VACCINE ĐÃ TIÊM
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Tên vaccine:</strong>{" "}
                    {vaccine.vaccineResponseDTO?.name}
                  </p>
                  <p>
                    <strong>Mã vaccine:</strong> {vaccine.vaccineCode}
                  </p>
                  <p>
                    <strong>Số lô:</strong> {vaccine.batchNumber}
                  </p>
                  <p>
                    <strong>Mô tả:</strong>{" "}
                    {vaccine.vaccineResponseDTO?.description}
                  </p>
                </div>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Ngày sản xuất:</strong>{" "}
                    {formatDate(vaccine.manufactureDate)}
                  </p>
                  <p>
                    <strong>Ngày hết hạn:</strong>{" "}
                    {formatDate(vaccine.expiryDate)}
                  </p>
                  <p>
                    <strong>Ngày tiêm:</strong>{" "}
                    {formatDateTime(data.appointmentDate)}
                  </p>
                  <p>
                    <strong>Trạng thái:</strong>
                    <span className="ml-2 rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                      Đã tiêm
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Health Examination Results */}
          <div className="mb-8 rounded-lg border border-gray-300 p-4">
            <h3 className="mb-3 text-lg font-semibold text-red-700">
              KẾT QUẢ KHÁM SỨC KHỎE
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Nhịp tim:</strong>{" "}
                  {healthCondition?.heartRate || "N/A"} bpm
                </p>
                <p>
                  <strong>Nhịp thở:</strong>{" "}
                  {healthCondition?.breathingRate || "N/A"} lần/phút
                </p>
                <p>
                  <strong>Cân nặng:</strong> {healthCondition?.weight || "N/A"}{" "}
                  kg
                </p>
                <p>
                  <strong>Nhiệt độ:</strong>{" "}
                  {healthCondition?.temperature || "N/A"}°C
                </p>
                <p>
                  <strong>Tai - Mắt - Mũi - Miệng:</strong>{" "}
                  {healthCondition?.ehnm || "N/A"}
                </p>
              </div>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Da và lông:</strong>{" "}
                  {healthCondition?.skinAFur || "N/A"}
                </p>
                <p>
                  <strong>Tiêu hóa:</strong>{" "}
                  {healthCondition?.digestion || "N/A"}
                </p>
                <p>
                  <strong>Hô hấp:</strong>{" "}
                  {healthCondition?.respiratory || "N/A"}
                </p>
                <p>
                  <strong>Bài tiết:</strong> {healthCondition?.excrete || "N/A"}
                </p>
                <p>
                  <strong>Hành vi:</strong> {healthCondition?.behavior || "N/A"}
                </p>
              </div>
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <p>
                <strong>Tâm lý:</strong> {healthCondition?.psycho || "N/A"}
              </p>
              <p>
                <strong>Khác biệt:</strong>{" "}
                {healthCondition?.different || "N/A"}
              </p>
              <div className="rounded-lg bg-blue-50 p-3">
                <p className="font-semibold text-blue-800">KẾT LUẬN:</p>
                <p className="mt-1 text-blue-700">
                  {healthCondition?.conclusion || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Veterinarian Information
          <div className="mb-8 rounded-lg border border-gray-300 p-4">
            <h3 className="mb-3 text-lg font-semibold text-indigo-700">
              THÔNG TIN BÁC SĨ THƯỜNG
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Họ tên:</strong> {vet?.name || "N/A"}
                </p>
                <p>
                  <strong>Mã bác sĩ:</strong> {vet?.vetCode || "N/A"}
                </p>
                <p>
                  <strong>Chuyên khoa:</strong> {vet?.specialization || "N/A"}
                </p>
              </div>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Số điện thoại:</strong> {vet?.phoneNumber || "N/A"}
                </p>
                <p>
                  <strong>Ngày sinh:</strong>{" "}
                  {formatDate(vet?.dateOfBirth || "")}
                </p>
                <p>
                  <strong>Trạng thái:</strong>{" "}
                  {vet?.isDeleted ? "Ngưng hoạt động" : "Đang hoạt động"}
                </p>
              </div>
            </div>
          </div> */}

          {/* Certificate Footer */}
          <div className="border-t-2 border-gray-300 pt-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Veterinarian Signature */}
              <div className="text-center">
                <p className="mb-2 text-sm font-semibold">BÁC SĨ THƯỜNG KHÁM</p>
                <p className="mb-4 text-xs text-gray-600">
                  (Ký và ghi rõ họ tên)
                </p>
                <div className="mb-2 h-16"></div>
                <p className="text-sm font-medium">{vet?.name || "N/A"}</p>
              </div>

              {/* Official Stamp */}
              <div className="text-center">
                <p className="mb-2 text-sm font-semibold">TRUNG TÂM VAXPET</p>
                <p className="mb-4 text-xs text-gray-600">(Dấu và chữ ký)</p>
                <div className="relative mb-2 flex h-16 items-center justify-center">
                  {/* Official Stamp Image */}
                  <img
                    src="/src/assets/images/stamp.svg"
                    alt="VaxPet Official Stamp"
                    className="h-16 w-16 opacity-80"
                  />
                </div>
                <p className="text-sm font-medium">Giám đốc trung tâm</p>
              </div>
            </div>

            {/* Certificate Notice */}
            <div className="mt-8 rounded-lg bg-yellow-50 p-4">
              <p className="text-xs text-gray-700">
                <strong>Lưu ý:</strong> Giấy chứng nhận này có giá trị trong
                vòng 6 tháng kể từ ngày cấp. Thú cưng cần được tái khám định kỳ
                theo lịch hẹn của bác sĩ thường. Mọi thắc mắc xin liên hệ trung
                tâm VaxPet qua hotline: (028) 1234-5678.
              </p>
            </div>

            {/* Certificate ID */}
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                Mã chứng nhận: {healthCondition?.conditionCode || "N/A"} | Ngày
                in: {format(new Date(), "dd/MM/yyyy HH:mm", { locale: vi })}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

PetHealthCertificate.displayName = "PetHealthCertificate";
