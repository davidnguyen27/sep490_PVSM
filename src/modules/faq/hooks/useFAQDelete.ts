import { useMutation, useQueryClient } from "@tanstack/react-query";
import { faqService } from "../services/faq.service";
import type { BaseResponse } from "@/shared/types/api.type";
import type { Faq } from "../types/faq.type";

export function useFAQDelete() {
  const queryClient = useQueryClient();
  return useMutation<BaseResponse<Faq>, Error, number>({
    mutationFn: (faqId) => faqService.deleteFaq(faqId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
    },
  });
}
