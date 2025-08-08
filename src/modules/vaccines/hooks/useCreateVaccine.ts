import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { vaccineService } from "../services/vaccine.service";
import type { VaccinePayload } from "../types/vaccine.payload.type";
import type { AxiosError } from "axios";
import { extractErrorMessage } from "@/shared/utils/error.utils";

export const useCreateVaccine = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: VaccinePayload) =>
      vaccineService.createVaccine(payload),
    onSuccess: ({ message }) => {
      // Invalidate and refetch vaccines list
      queryClient.invalidateQueries({ queryKey: ["vaccines"] });
      toast.success(message);
    },
    onError: (error: AxiosError) => {
      toast.error(extractErrorMessage(error));
    },
  });
};
