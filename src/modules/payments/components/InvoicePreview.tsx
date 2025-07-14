import type { InvoiceData } from "@/shared/types/invoice.type";
import { isMicrochipInvoice } from "@/shared/types/invoice.type";

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

  const serviceName = isMicrochip ? "Cấy microchip" : "Tiêm vaccine";
  const detailName = isMicrochip
    ? (data.microchip.microchipItem?.name ?? "Microchip")
    : (data.vaccineBatch.vaccineResponseDTO ?? "Vaccine");

  return (
    <div className="space-y-4 rounded-md bg-white p-6 text-sm leading-relaxed shadow-md">
      <h2 className="text-center text-xl font-semibold uppercase">
        Hóa đơn thanh toán
      </h2>

      {/* Thông tin khách hàng */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p>
            <strong>Khách hàng:</strong> {customer.fullName}
          </p>
          <p>
            <strong>SĐT:</strong> {customer.phoneNumber}
          </p>
          <p>
            <strong>Địa chỉ:</strong> {customer.address}
          </p>
        </div>
        <div>
          <p>
            <strong>Mã hóa đơn:</strong> {payment.paymentCode}
          </p>
          <p>
            <strong>Ngày thanh toán:</strong> {payment.paymentDate}
          </p>
          <p>
            <strong>Phương thức:</strong> {payment.paymentMethod}
          </p>
        </div>
      </div>

      {/* Thông tin thú cưng */}
      <div className="mt-4">
        <p>
          <strong>Thú cưng:</strong> {pet.name}
        </p>
        <p>
          <strong>Giống loài:</strong> {pet.breed} ({pet.species})
        </p>
        <p>
          <strong>Màu sắc:</strong> {pet.color}
        </p>
        <p>
          <strong>Trọng lượng:</strong> {pet.weight} kg
        </p>
      </div>

      {/* Bảng dịch vụ */}
      <table className="mt-6 w-full border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Dịch vụ</th>
            <th className="border p-2">Chi tiết</th>
            <th className="border p-2 text-right">Số lượng</th>
            <th className="border p-2 text-right">Đơn giá</th>
            <th className="border p-2 text-right">Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2">{serviceName}</td>
            <td className="border p-2">{detailName}</td>
            <td className="border p-2 text-right">1</td>
            <td className="border p-2 text-right">
              {payment.amount.toLocaleString()} đ
            </td>
            <td className="border p-2 text-right">
              {payment.amount.toLocaleString()} đ
            </td>
          </tr>
        </tbody>
      </table>

      {/* Tổng cộng */}
      <div className="mt-2 text-right text-base font-bold">
        Tổng cộng: {payment.amount.toLocaleString()} đ
      </div>
    </div>
  );
};
