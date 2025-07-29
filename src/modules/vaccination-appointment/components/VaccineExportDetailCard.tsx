import type { VaccineExportDetail } from "@/modules/vaccine-export-detail/types/vaccine-export-detail.type";
import { formatData } from "@/shared/utils/format.utils";

interface Props {
  data: VaccineExportDetail;
}

export function VaccineExportDetailCard({ data }: Props) {
  return (
    <div className="rounded-md border bg-white p-4 shadow-sm">
      <h3 className="text-primary mb-4 text-lg font-semibold">
        Thông tin xuất kho
      </h3>
      <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
        <p>
          <strong>Mã phiếu:</strong> {data.vaccineExport.exportCode}
        </p>
        <p>
          <strong>Ngày xuất:</strong>{" "}
          {formatData.formatDate(data.vaccineExport.exportDate)}
        </p>
        <p>
          <strong>Mục đích:</strong> {data.purpose}
        </p>
        <p>
          <strong>Ghi chú:</strong> {data.notes}
        </p>
        <p>
          <strong>Mã lô:</strong> {data.vaccineBatch.batchNumber}
        </p>
        <p>
          <strong>Số lượng:</strong> {data.quantity}
        </p>
        <p>
          <strong>Hãng sản xuất:</strong> {data.vaccineBatch.manufacturer}
        </p>
        <p>
          <strong>Nguồn gốc:</strong> {data.vaccineBatch.source}
        </p>
        <p>
          <strong>Hạn sử dụng:</strong>{" "}
          {formatData.formatDate(data.vaccineBatch.expiryDate)}
        </p>
        <p>
          <strong>Mã vaccine:</strong>{" "}
          {data.vaccineBatch.vaccineResponseDTO.vaccineCode}
        </p>
        <p>
          <strong>Tên vaccine:</strong>{" "}
          {data.vaccineBatch.vaccineResponseDTO.name}
        </p>
        <div>
          <strong>Hình ảnh:</strong>
          <br />
          <img
            src={data.vaccineBatch.vaccineResponseDTO.image}
            alt="Vaccine"
            className="mt-1 h-24 w-auto rounded border"
          />
        </div>
      </div>
    </div>
  );
}
