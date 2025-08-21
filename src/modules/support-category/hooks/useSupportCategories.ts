import { useQuery } from "@tanstack/react-query";
import { supportCategoryService } from "../services/support-category.service";
import type { BaseListResponse } from "@/shared/types/api.type";
import type { SupportCategory } from "../types/support-category.type";

interface UseSupportCategoriesParams {
  pageNumber: number;
  pageSize: number;
  keyword?: string;
  status?: boolean;
}

export function useSupportCategories(params: UseSupportCategoriesParams) {
  return useQuery<BaseListResponse<SupportCategory>, Error>({
    queryKey: ["supportCategories", params],
    queryFn: () => supportCategoryService.getAllSupportCategories(params),
    placeholderData: (prev) => prev,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
