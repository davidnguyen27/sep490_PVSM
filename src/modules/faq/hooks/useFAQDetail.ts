import { useQuery } from "@tanstack/react-query";
import { faqService } from "../services/faq.service";
import type { Faq } from "../types/faq.type";

export function useFAQDetail(faqId: number | null) {
  return useQuery<Faq, Error>({
    queryKey: ["faq", faqId],
    queryFn: () => faqService.getFaqById(faqId),
    enabled: !!faqId,
  });
}
