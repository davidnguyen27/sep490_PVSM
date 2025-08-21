import { useQuery } from "@tanstack/react-query";
import { supportCategoryService } from "../services/support-category.service";
import type { SupportCategory } from "../types/support-category.type";

export function useSupportCategoryDetail(supportCategoryId: number | null) {
  return useQuery<SupportCategory, Error>({
    queryKey: ["supportCategory", supportCategoryId],
    queryFn: () =>
      supportCategoryService.getSupportCategoryById(supportCategoryId),
    enabled: !!supportCategoryId,
  });
}
