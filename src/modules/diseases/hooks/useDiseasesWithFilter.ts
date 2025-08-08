import { useQuery } from "@tanstack/react-query";
import { diseaseService } from "../services/disease.service";

interface Params {
  pageNumber: number;
  pageSize: number;
  keyWord?: string;
  species?: "All" | "Dog" | "Cat";
}

export function useDiseasesWithFilter(params: Params) {
  return useQuery({
    queryKey: ["diseases-filtered", params],
    queryFn: async () => {
      // Lấy tất cả diseases với search keyword
      const allData = await diseaseService.getAllDiseases({
        pageNumber: 1,
        pageSize: 1000, // Lấy tất cả để filter
        keyWord: params.keyWord,
      });

      let filteredDiseases = allData.data.pageData;

      // Filter theo species ở client
      if (params.species && params.species !== "All") {
        filteredDiseases = filteredDiseases.filter(
          (disease) => disease.species === params.species,
        );
      }

      // Tính toán pagination
      const totalItems = filteredDiseases.length;
      const totalPages = Math.ceil(totalItems / params.pageSize);
      const startIndex = (params.pageNumber - 1) * params.pageSize;
      const endIndex = startIndex + params.pageSize;
      const paginatedData = filteredDiseases.slice(startIndex, endIndex);

      return {
        data: {
          pageData: paginatedData,
          pageInfo: {
            totalPage: totalPages,
            totalItem: totalItems,
          },
        },
      };
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    placeholderData: (prev) => prev,
  });
}
