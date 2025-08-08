import { useQuery } from "@tanstack/react-query";
import { diseaseService } from "../services/disease.service";

export function useDiseaseStats() {
  return useQuery({
    queryKey: ["disease-stats"],
    queryFn: async () => {
      // Lấy tất cả diseases để tính thống kê
      const allData = await diseaseService.getAllDiseases({
        pageNumber: 1,
        pageSize: 1000, // Số lớn để lấy tất cả
      });

      const diseases = allData.data.pageData;
      const totalCount = diseases.length;
      const dogCount = diseases.filter(
        (disease) => disease.species === "Dog",
      ).length;
      const catCount = diseases.filter(
        (disease) => disease.species === "Cat",
      ).length;

      return {
        totalCount,
        dogCount,
        catCount,
      };
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
}
