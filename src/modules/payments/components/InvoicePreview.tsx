import type { InvoiceData } from "@/shared/types/invoice.type";
import { isMicrochipInvoice } from "@/shared/types/invoice.type";
import { formatData } from "@/shared/utils/format.utils";
import stampImage from "@/assets/images/stamp.svg";

interface Props {
  data: InvoiceData;
}

export const InvoicePreview = ({ data }: Props) => {
  const isMicrochip = isMicrochipInvoice(data);

  const appointment = isMicrochip
    ? data.microchip.appointment
    : data.appointment;
  const payment = isMicrochip ? data.microchip.payment : data.payment;
  const customer = appointment.customerResponseDTO;
  const pet = appointment.petResponseDTO;

  // Determine service type and details
  const getServiceInfo = () => {
    if (isMicrochip) {
      return {
        serviceName: "Cấy microchip",
        detailName: data.microchip.microchipItem?.name ?? "Microchip"
      };
    } else if (data.vaccineBatch) {
      // Vaccination service
      const vaccineDTO = data.vaccineBatch.vaccineResponseDTO;
      let vaccineName = "Vaccine";

      if (typeof vaccineDTO === "string") {
        vaccineName = vaccineDTO;
      } else if (
        vaccineDTO &&
        typeof vaccineDTO === "object" &&
        "name" in vaccineDTO
      ) {
        vaccineName = (vaccineDTO as { name: string }).name;
      }

      return {
        serviceName: "Tiêm vaccine",
        detailName: vaccineName
      };
    } else {
      // Health certificate service
      return {
        serviceName: "Cấp giấy chứng nhận sức khỏe",
        detailName: "Giấy chứng nhận sức khỏe thú cưng"
      };
    }
  };

  const { serviceName, detailName } = getServiceInfo();

  return (
    <div
      className="relative bg-white text-xs leading-relaxed"
      style={{
        width: "210mm",
        minHeight: "297mm",
        maxHeight: "297mm",
        padding: "15mm",
        margin: "0 auto",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {/* Decorative corner elements */}
      <div className="border-primary absolute top-3 left-3 h-8 w-8 border-t-2 border-l-2"></div>
      <div className="border-primary absolute top-3 right-3 h-8 w-8 border-t-2 border-r-2"></div>
      <div className="border-primary absolute bottom-3 left-3 h-8 w-8 border-b-2 border-l-2"></div>
      <div className="border-primary absolute right-3 bottom-3 h-8 w-8 border-r-2 border-b-2"></div>

      {/* Header with logo and title */}
      <div className="mb-3 flex items-center justify-between border-b pb-2">
        <div className="flex items-center">
          <div className="bg-primary rounded p-1.5 text-white">
            <span className="text-sm font-bold">VAXPET</span>
          </div>
        </div>
        <h2 className="text-primary text-center text-base font-semibold uppercase">
          Hóa đơn thanh toán
        </h2>
        <div className="text-right text-[10px] text-gray-500">
          <p>Mã số thuế: 45000</p>
        </div>
      </div>

      {/* Thông tin khách hàng */}
      <div className="mb-3 grid grid-cols-2 gap-4 rounded border bg-gray-50 p-2.5">
        <div>
          <h3 className="text-primary mb-1.5 border-b border-gray-200 pb-0.5 text-xs font-medium">
            Thông tin khách hàng
          </h3>
          <p className="mb-1 flex items-start gap-1">
            <span className="w-20 text-[11px] font-semibold">Khách hàng:</span>
            <span className="text-[11px]">{customer.fullName}</span>
          </p>
          <p className="mb-1 flex items-start gap-1">
            <span className="w-20 text-[11px] font-semibold">Điện thoại:</span>
            <span className="text-[11px]">{customer.phoneNumber}</span>
          </p>
          <p className="mb-1 flex items-start gap-1">
            <span className="w-20 text-[11px] font-semibold">Địa chỉ:</span>
            <span className="text-[11px] break-words">{customer.address}</span>
          </p>
        </div>
        <div>
          <h3 className="text-primary mb-1.5 border-b border-gray-200 pb-0.5 text-xs font-medium">
            Thông tin hóa đơn
          </h3>
          <p className="mb-1 flex items-start gap-1">
            <span className="w-20 text-[11px] font-semibold">Mã hóa đơn:</span>
            <span className="text-[11px]">{payment.paymentCode}</span>
          </p>
          <p className="mb-1 flex items-start gap-1">
            <span className="w-20 text-[11px] font-semibold">Ngày thanh toán:</span>
            <span className="text-[11px]">
              {formatData.formatDateTime(payment.paymentDate)}
            </span>
          </p>
          <p className="mb-1 flex items-start gap-1">
            <span className="w-20 text-[11px] font-semibold">Phương thức:</span>
            <span
              className={`rounded-full px-1.5 py-0.5 text-[10px] ${payment.paymentMethod === "Cash" ||
                payment.paymentMethod === "CASH"
                ? "bg-green-100 text-green-800"
                : "bg-blue-100 text-blue-800"
                }`}
            >
              {payment.paymentMethod === "Cash" ||
                payment.paymentMethod === "CASH"
                ? "Tiền mặt"
                : "Chuyển khoản"}
            </span>
          </p>
        </div>
      </div>

      {/* Thông tin thú cưng */}
      <div className="mb-3 rounded border bg-gray-50 p-2.5">
        <h3 className="text-primary mb-2 border-b border-gray-200 pb-0.5 text-xs font-medium">
          Thông tin thú cưng
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="mb-1 flex items-start gap-1">
              <span className="w-20 text-[11px] font-semibold">
                Tên thú cưng:
              </span>
              <span className="text-primary text-[11px]">{pet.name}</span>
            </p>
            <p className="mb-1 flex items-start gap-1">
              <span className="w-20 text-[11px] font-semibold">
                Giống loài:
              </span>
              <span className="text-[11px]">
                {pet.breed} ({pet.species.toLocaleLowerCase() === "dog" ? "Chó" : "Mèo"})
              </span>
            </p>
          </div>
          <div>
            <p className="mb-1 flex items-start gap-1">
              <span className="w-20 text-[11px] font-semibold">Màu sắc:</span>
              <span className="text-[11px]">{pet.color}</span>
            </p>
            <p className="mb-1 flex items-start gap-1">
              <span className="w-20 text-[11px] font-semibold">
                Trọng lượng:
              </span>
              <span className="text-[11px]">{pet.weight} kg</span>
            </p>
          </div>
        </div>
      </div>

      {/* Bảng dịch vụ */}
      <div className="mb-3">
        <h3 className="text-primary mb-2 text-xs font-medium">
          Dịch vụ sử dụng
        </h3>
        <table className="w-full overflow-hidden rounded border border-gray-200">
          <thead className="bg-primary text-white">
            <tr>
              <th className="border-primary-dark border-r p-1.5 text-left text-[11px]">
                Dịch vụ
              </th>
              <th className="border-primary-dark border-r p-1.5 text-left text-[11px]">
                Chi tiết
              </th>
              <th className="border-primary-dark border-r p-1.5 text-center text-[11px]">
                SL
              </th>
              <th className="border-primary-dark border-r p-1.5 text-right text-[11px]">
                Đơn giá
              </th>
              <th className="p-1.5 text-right text-[11px]">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-t border-r border-gray-200 p-2 text-[11px] font-medium">
                {serviceName}
              </td>
              <td className="border-t border-r border-gray-200 p-2 text-[11px]">
                {detailName}
              </td>
              <td className="border-t border-r border-gray-200 p-2 text-center text-[11px]">
                1
              </td>
              <td className="border-t border-r border-gray-200 p-2 text-right text-[11px]">
                {payment.amount.toLocaleString()} đ
              </td>
              <td className="border-t border-gray-200 p-2 text-right text-[11px] font-semibold">
                {payment.amount.toLocaleString()} đ
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Tổng cộng */}
      <div className="mb-4 flex items-center justify-between rounded border bg-gray-50 p-2.5">
        <div className="text-[10px]">
          <p className="mb-1 text-gray-600">
            Lưu ý: Hóa đơn điện tử này có giá trị pháp lý tương đương hóa đơn
            giấy
          </p>
          <p className="text-gray-600">
            Cảm ơn quý khách đã lựa chọn dịch vụ của chúng tôi
          </p>
        </div>
        <div className="text-right">
          <p className="mb-1 text-[11px] font-medium text-gray-600">
            Tổng tiền dịch vụ:
          </p>
          <p className="text-primary text-lg font-bold">
            {payment.amount.toLocaleString()} đ
          </p>
        </div>
      </div>

      {/* Chữ ký và dấu mộc */}
      <div className="mb-4 flex justify-between">
        <div className="w-1/3 text-center">
          <p className="text-[11px] font-semibold text-gray-700">Khách hàng</p>
          <p className="mb-2 text-[10px] text-gray-500">(Ký, ghi rõ họ tên)</p>
          <div className="mb-1 h-12 border-b border-dashed border-gray-300"></div>
          <p className="text-[11px] font-medium">{customer.fullName}</p>
        </div>

        <div className="relative w-1/3 text-center">
          <p className="text-[11px] font-semibold text-gray-700">
            Đại diện cơ sở
          </p>
          <p className="mb-2 text-[10px] text-gray-500">(Ký, đóng dấu)</p>
          <div className="relative mb-1 h-12 border-b border-dashed border-gray-300">
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 transform">
              <img
                src={stampImage}
                alt="Dấu mộc"
                className="h-16 w-16 rotate-[-15deg] opacity-80"
              />
            </div>
          </div>
          <p className="text-[11px] font-medium">VaxPet</p>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 pt-2 text-center text-[10px] text-gray-500">
        <p className="mb-1">
          Mọi thắc mắc về hóa đơn, vui lòng liên hệ: hotro@vaxpet.vn | Hotline:
          1900.1234
        </p>
        <p>
          © {new Date().getFullYear()} VaxPet - Hệ thống tiêm chủng và chăm sóc
          thú cưng
        </p>
      </div>
    </div>
  );
};
