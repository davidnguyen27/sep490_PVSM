import { Button } from "@/components/ui";
import type { VaccinationDetail } from "../types/detail.type";

interface Props {
  data: VaccinationDetail;
  onExportInvoice?: () => void;
}

export function CompletedCard({ data, onExportInvoice }: Props) {
  const pet = data.appointment.petResponseDTO;
  const customer = data.appointment.customerResponseDTO;
  const payment = data.payment;

  return (
    <div className="rounded-md border p-6 shadow-sm">
      <h2 className="text-primary mb-4 text-lg font-semibold">
        ✅ Tiêm chủng đã hoàn tất
      </h2>

      <div className="grid grid-cols-2 gap-y-3 text-sm">
        <p>
          <span className="font-medium">Thú cưng:</span> {pet.name}
        </p>
        <p>
          <span className="font-medium">Chủ nuôi:</span> {customer.fullName}
        </p>
        <p>
          <span className="font-medium">Ngày tiêm:</span> {data.appointmentDate}
        </p>
        <p>
          <span className="font-medium">Phản ứng sau tiêm:</span>{" "}
          {data.reaction || "Không có"}
        </p>
        <p>
          <span className="font-medium">Ghi chú:</span>{" "}
          {data.notes || "Không có"}
        </p>
        <p>
          <span className="font-medium">Tình trạng thanh toán:</span>{" "}
          <span
            className={
              payment.paymentStatus === 2
                ? "font-medium text-green-600"
                : "font-medium text-red-600"
            }
          >
            {payment.paymentStatus === 2 ? "Đã thanh toán" : "Chưa thanh toán"}
          </span>
        </p>
      </div>

      {payment.paymentStatus === 2 && onExportInvoice && (
        <div className="mt-6 flex justify-end">
          <Button variant="secondary" onClick={onExportInvoice}>
            Xuất hóa đơn
          </Button>
        </div>
      )}
    </div>
  );
}
