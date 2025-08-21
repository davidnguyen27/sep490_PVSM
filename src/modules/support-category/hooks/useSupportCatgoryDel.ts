import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supportCategoryService } from "../services/support-category.service";
import type { BaseResponse } from "@/shared/types/api.type";
import type { SupportCategory } from "../types/support-category.type";

export function useSupportCategoryDel() {
  const queryClient = useQueryClient();
  return useMutation<BaseResponse<SupportCategory>, Error, number>({
    mutationFn: (supportCategoryId) =>
      supportCategoryService.deleteSupportCategory(supportCategoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supportCategories"] });
    },
  });
}
