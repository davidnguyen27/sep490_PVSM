import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import type { BaseListResponse } from "@/shared/types/api.type";

export interface Disease {
  diseaseId: number;
  name: string;
  species: string;
  description: string;
}

export const diseaseService = {
  async getAllDiseases(params: {
    pageNumber: number;
    pageSize: number;
    keyWord?: string;
  }): Promise<BaseListResponse<Disease>> {
    return await axiosInstance
      .get("/api/Disease/get-all-diseases", { params })
      .then((res) => res.data);
  },
};

export function useDiseases(species?: string) {
  return useQuery({
    queryKey: ["diseases", species],
    queryFn: () =>
      diseaseService.getAllDiseases({
        pageNumber: 1,
        pageSize: 100, // Lấy nhiều bệnh để có đủ lựa chọn
        keyWord: species || undefined,
      }),
    select: (data) => {
      const diseases = data?.data?.pageData || [];
      if (species) {
        return diseases.filter(
          (disease) => disease.species.toLowerCase() === species.toLowerCase(),
        );
      }
      return diseases;
    },
  });
}
