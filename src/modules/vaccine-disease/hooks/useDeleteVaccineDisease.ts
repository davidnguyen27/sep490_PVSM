import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { vaccineDiseaseService } from "../services/vaccine-disease.service";
import { extractErrorMessage } from "@/shared/utils/error.utils";
import type { AxiosError } from "axios";

export const useDeleteVaccineDisease = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vaccineDiseaseId: number | null) =>
      vaccineDiseaseService.deleteVaccineDisease(vaccineDiseaseId),
    onSuccess: () => {
      toast.success("Xóa thành công!");
      queryClient.invalidateQueries({
        queryKey: ["vaccine-diseases"],
      });
      queryClient.invalidateQueries({
        queryKey: ["vaccine-disease"],
      });
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error as AxiosError));
    },
  });
};
