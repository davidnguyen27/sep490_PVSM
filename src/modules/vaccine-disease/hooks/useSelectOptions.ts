import { useQuery } from "@tanstack/react-query";
import { vaccineService } from "@/modules/vaccines/services/vaccine.service";
import { diseaseService } from "@/modules/diseases/services/disease.service";

export function useVaccinesForSelect() {
  return useQuery({
    queryKey: ["vaccines-for-select"],
    queryFn: () =>
      vaccineService.getAllVaccines({
        pageNumber: 1,
        pageSize: 1000,
        keyWord: "",
      }),
    staleTime: 10 * 60 * 1000, // 10 minutes
    select: (data) => data?.data.pageData || [],
  });
}

export function useDiseasesForSelect() {
  return useQuery({
    queryKey: ["diseases-for-select"],
    queryFn: () =>
      diseaseService.getAllDiseases({
        pageNumber: 1,
        pageSize: 1000,
        keyWord: "",
      }),
    staleTime: 10 * 60 * 1000, // 10 minutes
    select: (data) => data?.data.pageData || [],
  });
}
