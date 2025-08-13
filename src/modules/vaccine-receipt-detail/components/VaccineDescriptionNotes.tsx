import type { VaccineReceiptDetail } from "../types/vaccine-receipt-detal.type";

interface VaccineDescriptionNotesProps {
  detail: VaccineReceiptDetail;
}

export function VaccineDescriptionNotes({
  detail,
}: VaccineDescriptionNotesProps) {
  if (!detail.vaccineBatch?.vaccineResponseDTO?.description && !detail.notes) {
    return null;
  }

  return (
    <div className="space-y-4">
      {detail.vaccineBatch?.vaccineResponseDTO?.description && (
        <div className="rounded-lg border border-gray-100 p-4">
          <h4 className="font-nunito-600 mb-2 text-gray-900">Mô tả vaccine</h4>
          <p className="font-nunito-400 leading-relaxed text-gray-600">
            {detail.vaccineBatch.vaccineResponseDTO.description}
          </p>
        </div>
      )}

      {detail.notes && (
        <div className="rounded-lg border border-gray-100 p-4">
          <h4 className="font-nunito-600 mb-2 text-gray-900">Ghi chú</h4>
          <p className="font-nunito-400 leading-relaxed text-gray-600">
            {detail.notes}
          </p>
        </div>
      )}
    </div>
  );
}
