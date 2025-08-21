import { useMutation, useQueryClient } from "@tanstack/react-query";
import { faqService } from "../services/faq.service";
import type { BaseResponse } from "@/shared/types/api.type";
import type { Faq } from "../types/faq.type";

interface CreateFaqPayload {
  question: string;
  answer: string;
}

export function useFAQCreate() {
  const queryClient = useQueryClient();
  return useMutation<BaseResponse<Faq>, Error, CreateFaqPayload>({
    mutationFn: (payload) => faqService.createFaq(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
    },
  });
}
