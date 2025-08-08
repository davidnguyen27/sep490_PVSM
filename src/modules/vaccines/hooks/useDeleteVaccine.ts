import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { vaccineService } from "../services/vaccine.service";
import type { AxiosError } from "axios";
import { extractErrorMessage } from "@/shared/utils/error.utils";

export const useDeleteVaccine = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vaccineId: number) => vaccineService.deleteVaccine(vaccineId),
    onSuccess: ({ message }) => {
      // Invalidate and refetch vaccines list
      queryClient.invalidateQueries({ queryKey: ["vaccines"] });

      toast.success(message || "Xóa vaccine thành công!");
    },
    onError: (error: AxiosError) => {
      toast.error(extractErrorMessage(error));
    },
  });
};
