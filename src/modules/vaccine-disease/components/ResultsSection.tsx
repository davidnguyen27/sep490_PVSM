import { Pagination } from "@/components/shared";
import { VaccineDiseaseTable } from "./VaccineDiseaseTable";
import type { VaccineDisease } from "../types/vaccine-disease.type";

interface ResultsSectionProps {
  vaccineDiseases: VaccineDisease[];
  isPending: boolean;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  searchKeyword: string;
  onViewDetail: (vaccineDiseaseId: number) => void;
}

export function ResultsSection({
  vaccineDiseases,
  isPending,
  currentPage,
  pageSize,
  totalPages,
  onPageChange,
  searchKeyword,
  onViewDetail,
}: ResultsSectionProps) {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-nunito-700 text-xl text-gray-900">
            Danh sách mối liên kết vaccine-bệnh
          </h2>
          <p className="font-nunito-400 mt-1 text-sm text-gray-500">
            {searchKeyword
              ? `Kết quả tìm kiếm cho "${searchKeyword}"`
              : "Tất cả mối liên kết vaccine và bệnh tật"}
          </p>
        </div>
      </div>

      <VaccineDiseaseTable
        data={vaccineDiseases}
        isPending={isPending}
        onViewDetail={onViewDetail}
      />

      {!isPending && vaccineDiseases.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="font-nunito-400 text-sm text-gray-500">
            Hiển thị {Math.min(pageSize, vaccineDiseases.length)} trên{" "}
            {vaccineDiseases.length} kết quả
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
