import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { vaccineDiseaseService } from "../services/vaccine-disease.service";
import { extractErrorMessage } from "@/shared/utils/error.utils";
import type { AxiosError } from "axios";
import type { VaccineDiseasePayload } from "../types/vaccine-disease.payload.type";

export const useUpdateVaccineDisease = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      vaccineDiseaseId,
      vaccineDiseaseData,
    }: {
      vaccineDiseaseId: number | null;
      vaccineDiseaseData: VaccineDiseasePayload;
    }) =>
      vaccineDiseaseService.updateVaccineDisease(
        vaccineDiseaseId,
        vaccineDiseaseData,
      ),
    onSuccess: () => {
      toast.success("Cập nhật thành công!");
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
