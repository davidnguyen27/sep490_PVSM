import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { vaccineService } from "../services/vaccine.service";
import type { VaccinePayload } from "../types/vaccine.payload.type";
import type { AxiosError } from "axios";
import { extractErrorMessage } from "@/shared/utils/error.utils";

interface UpdateVaccineParams {
  vaccineId: number;
  payload: VaccinePayload;
}

export const useUpdateVaccine = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ vaccineId, payload }: UpdateVaccineParams) =>
      vaccineService.updateVaccine(payload, vaccineId),

    onSuccess: (response, { vaccineId }) => {
      // Invalidate and refetch vaccine list
      queryClient.invalidateQueries({
        queryKey: ["vaccines"],
      });

      // Update individual vaccine cache if response has data
      if (response?.data) {
        queryClient.setQueryData(["vaccine", vaccineId], response.data);
      }

      toast.success("Cập nhật vaccine thành công!");
    },

    onError: (error: AxiosError) => {
      toast.error(extractErrorMessage(error));
    },
  });
};
