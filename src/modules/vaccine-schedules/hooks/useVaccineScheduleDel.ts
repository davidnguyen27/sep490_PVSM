import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { vaccineScheduleService } from "../services/vaccine-schedule.service";

export const useVaccineScheduleDel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (scheduleId: number) =>
      vaccineScheduleService.deleteVaccinationSchedule(scheduleId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vaccine-schedules"],
      });
      toast.success("Xóa lịch tiêm thành công!");
    },
    onError: (error: unknown) => {
      console.error("Delete error:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Có lỗi xảy ra khi xóa lịch tiêm";
      toast.error(errorMessage);
    },
  });
};
