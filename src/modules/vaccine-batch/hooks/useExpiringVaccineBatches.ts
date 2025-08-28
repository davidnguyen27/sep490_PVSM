import { useQuery } from "@tanstack/react-query";
import { vaccineBatchService } from "../services/vaccine-batch.service";
import type { VaccineBatch } from "../types/vaccine-batch.type";

interface ExpiringBatch {
  id: number;
  name: string;
  batchNumber: string;
  expiryDate: string;
  daysUntilExpiry: number;
  vaccineId: number;
}

const useExpiringVaccineBatches = () => {
  return useQuery({
    queryKey: ["expiring-vaccine-batches"],
    queryFn: async (): Promise<ExpiringBatch[]> => {
      // Lấy tất cả lô vắc-xin với pageSize lớn để đảm bảo lấy được hết
      const response = await vaccineBatchService.getAllVaccineBatches({
        pageNumber: 1,
        pageSize: 1000, // Hoặc có thể tạo API riêng để lấy tất cả
      });

      if (!response?.data?.pageData) return [];

      const currentDate = new Date();
      const sevenDaysFromNow = new Date();
      sevenDaysFromNow.setDate(currentDate.getDate() + 7);

      // Filter và map các lô sắp hết hạn trong 7 ngày
      const expiringBatches: ExpiringBatch[] = response.data.pageData
        .filter((batch: VaccineBatch) => {
          const expiryDate = new Date(batch.expiryDate);
          // Kiểm tra nếu ngày hết hạn trong vòng 7 ngày tới
          return expiryDate >= currentDate && expiryDate <= sevenDaysFromNow;
        })
        .map((batch: VaccineBatch) => {
          const expiryDate = new Date(batch.expiryDate);
          const diffTime = expiryDate.getTime() - currentDate.getTime();
          const daysUntilExpiry = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          return {
            id: batch.vaccineBatchId,
            name: batch.vaccineResponseDTO?.name || batch.vaccineCode,
            batchNumber: batch.batchNumber,
            expiryDate: batch.expiryDate,
            daysUntilExpiry,
            vaccineId: batch.vaccineId,
          };
        })
        .sort(
          (a: ExpiringBatch, b: ExpiringBatch) =>
            a.daysUntilExpiry - b.daysUntilExpiry,
        ); // Sắp xếp theo thứ tự sắp hết hạn nhất

      return expiringBatches;
    },
    refetchInterval: 5 * 60 * 1000, // Refetch mỗi 5 phút
    staleTime: 2 * 60 * 1000, // Data stale sau 2 phút
  });
};

export default useExpiringVaccineBatches;
export type { ExpiringBatch };
