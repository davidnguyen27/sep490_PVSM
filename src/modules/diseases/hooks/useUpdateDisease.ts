import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { extractErrorMessage } from "@/shared/utils/error.utils";
import type { AxiosError } from "axios";
import { diseaseService } from "../services/disease.service";
import type { DiseasePayload } from "../types/disease.payload.type";

export function useUpdateDisease() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      diseaseId,
      diseaseData,
    }: {
      diseaseId: number;
      diseaseData: DiseasePayload;
    }) => diseaseService.updateDisease(diseaseId, diseaseData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diseases"] });
      toast.success("Cập nhật thông tin bệnh thành công!");
    },
    onError: (error) => toast.error(extractErrorMessage(error as AxiosError)),
  });
}
