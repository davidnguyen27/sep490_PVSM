interface VaccineManagementProps {
  totalVaccines: number;
  totalVaccineBatches: number;
  totalVaccineExports: number;
  totalVaccineReceipts: number;
  totalVaccineReceiptDetails: number;
}

export default function VaccineManagement({
  totalVaccines,
  totalVaccineBatches,
  totalVaccineExports,
  totalVaccineReceipts,
  totalVaccineReceiptDetails,
}: VaccineManagementProps) {
  return (
    <div className="border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="border-b border-gray-200 p-6">
        <h2 className="font-inter-600 text-lg text-gray-900">
          Quản lý vaccine
        </h2>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 py-2">
            <span className="font-nunito-400 text-sm text-gray-600">
              Tổng vaccine
            </span>
            <span className="font-nunito-600 text-lg text-gray-900">
              {totalVaccines}
            </span>
          </div>
          <div className="flex items-center justify-between border-b border-gray-100 py-2">
            <span className="font-nunito-400 text-sm text-gray-600">
              Lô vaccine
            </span>
            <span className="font-nunito-600 text-lg text-gray-900">
              {totalVaccineBatches}
            </span>
          </div>
          <div className="flex items-center justify-between border-b border-gray-100 py-2">
            <span className="font-nunito-400 text-sm text-gray-600">
              Xuất kho
            </span>
            <span className="font-nunito-600 text-lg text-gray-900">
              {totalVaccineExports}
            </span>
          </div>
          <div className="flex items-center justify-between border-b border-gray-100 py-2">
            <span className="font-nunito-400 text-sm text-gray-600">
              Hóa đơn
            </span>
            <span className="font-nunito-600 text-lg text-gray-900">
              {totalVaccineReceipts}
            </span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="font-nunito-400 text-sm text-gray-600">
              Chi tiết hóa đơn
            </span>
            <span className="font-nunito-600 text-lg text-gray-900">
              {totalVaccineReceiptDetails}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
