import { Loader2, FileX } from "lucide-react";
import { DiseaseTable } from "./DiseaseTable";
import { Pagination } from "@/components/shared";
import type { Disease } from "../types/disease.type";

interface ResultsSectionProps {
  diseases: Disease[];
  isPending: boolean;
  currentPage: number;
  pageSize: number;
  searchKeyword: string;
  totalPages: number;
  onPageChange: (page: number) => void;
  selectedSpecies: "All" | "Dog" | "Cat";
}

export function ResultsSection({
  diseases,
  isPending,
  currentPage,
  pageSize,
  searchKeyword,
  totalPages,
  onPageChange,
  selectedSpecies,
}: ResultsSectionProps) {
  if (isPending) {
    return (
      <div className="p-6">
        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
          <div className="flex h-64 items-center justify-center">
            <div className="text-center">
              <Loader2 className="text-primary mx-auto mb-4 h-8 w-8 animate-spin" />
              <p className="font-nunito-500 text-gray-500">
                Đang tải dữ liệu...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (diseases.length === 0) {
    const isFiltered = searchKeyword || selectedSpecies !== "All";

    return (
      <div className="p-6">
        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
          <div className="flex h-64 items-center justify-center">
            <div className="max-w-md text-center">
              <FileX className="mx-auto mb-4 h-12 w-12 text-gray-300" />
              <h3 className="font-nunito-600 mb-2 text-lg text-gray-700">
                {isFiltered ? "Không tìm thấy kết quả" : "Chưa có dữ liệu"}
              </h3>
              <p className="font-nunito-400 text-gray-500">
                {isFiltered
                  ? "Hãy thử thay đổi từ khóa tìm kiếm hoặc bộ lọc loài"
                  : "Hệ thống chưa có bệnh nào được tạo"}
              </p>
              {searchKeyword && (
                <div className="mt-3 inline-block rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
                  Từ khóa: "{searchKeyword}"
                </div>
              )}
              {selectedSpecies !== "All" && (
                <div className="mt-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
                  Loài: {selectedSpecies === "Dog" ? "Chó" : "Mèo"}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <DiseaseTable
          diseases={diseases}
          isPending={isPending}
          currentPage={currentPage}
          pageSize={pageSize}
          searchKeyword={searchKeyword}
        />
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      )}
    </div>
  );
}
