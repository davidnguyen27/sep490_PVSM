import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { extractErrorMessage } from "@/shared/utils/error.utils";
import type { AxiosError } from "axios";
import { diseaseService } from "../services/disease.service";
import type { DiseasePayload } from "../types/disease.payload.type";

export function useCreateDisease() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (diseaseData: DiseasePayload) =>
      diseaseService.createDisease(diseaseData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diseases"] });
      toast.success("Tạo bệnh mới thành công!");
      // Refresh page to show new data
      window.location.reload();
    },
    onError: (error) => toast.error(extractErrorMessage(error as AxiosError)),
  });
}
