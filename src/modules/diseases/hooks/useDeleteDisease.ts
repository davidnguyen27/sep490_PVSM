import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { extractErrorMessage } from "@/shared/utils/error.utils";
import type { AxiosError } from "axios";
import { diseaseService } from "../services/disease.service";

export function useDeleteDisease() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (diseaseId: number) => diseaseService.deleteDisease(diseaseId),
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({ queryKey: ["diseases"] });
      toast.success(message);
    },
    onError: (error) => toast.error(extractErrorMessage(error as AxiosError)),
  });
}
