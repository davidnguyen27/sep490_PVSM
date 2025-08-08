import { Pagination } from "@/components/shared";
import { VaccineReceiptTable } from "./VaccineReceiptTable";
import type { VaccineReceipt } from "../types/vaccine-receipt.type";

interface ResultsSectionProps {
  vaccineReceipts: VaccineReceipt[];
  isPending: boolean;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  searchKeyword: string;
  onViewDetail: (vaccineReceiptId: number) => void;
  onEdit: (vaccineReceipt: VaccineReceipt) => void;
  onDelete: (vaccineReceiptId: number) => void;
}

export function ResultsSection({
  vaccineReceipts,
  isPending,
  currentPage,
  pageSize,
  totalPages,
  onPageChange,
  searchKeyword,
  onViewDetail,
  onEdit,
  onDelete,
}: ResultsSectionProps) {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-nunito-700 text-xl text-gray-900">
            Danh sách phiếu nhập vaccine
          </h2>
          <p className="font-nunito-400 mt-1 text-sm text-gray-500">
            {searchKeyword
              ? `Kết quả tìm kiếm cho "${searchKeyword}"`
              : "Tất cả phiếu nhập vaccine trong hệ thống"}
          </p>
        </div>
      </div>
      <VaccineReceiptTable
        data={vaccineReceipts}
        isPending={isPending}
        onViewDetail={onViewDetail}
        onEdit={onEdit}
        onDelete={onDelete}
      />{" "}
      {!isPending && vaccineReceipts.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="font-nunito-400 text-sm text-gray-500">
            Hiển thị {Math.min(pageSize, vaccineReceipts.length)} trên{" "}
            {vaccineReceipts.length} kết quả
          </p>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
}
