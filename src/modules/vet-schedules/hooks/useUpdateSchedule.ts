import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { vetScheduleService } from "../services/vet-schedule.service";
import type { VetSchedulePayload } from "../types/vet-schedule.payload.type";

export const useUpdateSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: VetSchedulePayload) =>
      vetScheduleService.updateSchedule(payload),
    onSuccess: () => {
      toast.success("Cập nhật lịch làm việc thành công!");

      // Invalidate và refetch schedules để cập nhật UI
      queryClient.invalidateQueries({
        queryKey: ["vet-schedules"],
      });
    },
    onError: (error: Error) => {
      const errorMessage =
        (error as unknown as { response?: { data?: { message?: string } } })
          ?.response?.data?.message ||
        error?.message ||
        "Có lỗi xảy ra khi cập nhật lịch làm việc";

      toast.error(errorMessage);
      console.error("Update schedule error:", error);
    },
  });
};
