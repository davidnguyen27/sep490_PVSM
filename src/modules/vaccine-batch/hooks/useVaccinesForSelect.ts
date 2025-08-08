import { vaccineService, type Vaccine } from "@/modules/vaccines";
import { useQuery } from "@tanstack/react-query";

export const useVaccinesForSelect = () => {
  const {
    data,
    isLoading: isPending,
    error,
  } = useQuery<Vaccine[]>({
    queryKey: ["vaccines-select"],
    queryFn: async () => {
      // Get all vaccines without pagination for select options
      const response = await vaccineService.getAllVaccines({
        pageNumber: 1,
        pageSize: 1000, // Large page size to get all vaccines
        keyWord: "",
      });
      return response.data?.pageData || [];
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    refetchOnWindowFocus: false,
  });

  return {
    vaccines: data || [],
    isPending,
    error,
  };
};
