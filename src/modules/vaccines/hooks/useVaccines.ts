import { useQuery } from "@tanstack/react-query";
import { vaccineService } from "../services/vaccine.service";
import type { BaseListResponse } from "@/shared/types/api.type";
import type { Vaccine } from "../types/vaccine.type";

interface UseVaccinesParams {
  pageNumber: number;
  pageSize: number;
  keyWord: string;
}

export const useVaccines = (params: UseVaccinesParams) => {
  const {
    data,
    isLoading: isPending,
    error,
    refetch,
    isFetching,
  } = useQuery<BaseListResponse<Vaccine>>({
    queryKey: ["vaccines", params.pageNumber, params.pageSize, params.keyWord],
    queryFn: () => vaccineService.getAllVaccines(params),
    placeholderData: (previousData) => previousData,
    refetchOnWindowFocus: false,
  });

  return {
    data,
    isPending,
    isFetching,
    error,
    refetch,
  };
};
