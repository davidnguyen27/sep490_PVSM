import { useQuery } from "@tanstack/react-query";
import { vaccineReceiptDetailService } from "../services/vaccine-receipt-detail.service";

export const useGetVaccineReceiptDetailById = (id: number) => {
  return useQuery({
    queryKey: ["vaccine-receipt-detail", id],
    queryFn: () => vaccineReceiptDetailService.getVaccineReceiptDetailById(id),
    enabled: !!id,
  });
};
