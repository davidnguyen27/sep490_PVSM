import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { vetScheduleService } from "../services/vet-schedule.service";

export const useDeleteSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (scheduleId: number | null) =>
      vetScheduleService.deleteSchedule(scheduleId),
    onSuccess: () => {
      // Invalidate và refetch schedule data
      queryClient.invalidateQueries({
        queryKey: ["vet-schedules"],
      });

      toast.success("Xóa lịch làm việc thành công!");
    },
    onError: (error: Error) => {
      console.error("Error deleting schedule:", error);
      const apiError = error as { response?: { data?: { message?: string } } };
      toast.error(
        apiError?.response?.data?.message ||
          "Có lỗi xảy ra khi xóa lịch làm việc",
      );
    },
  });
};
