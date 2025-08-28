import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { vaccineScheduleService } from "../services/vaccine-schedule.service";

interface UpdateVaccineScheduleData {
  diseaseId: number | null;
  species: string;
  ageInterval: number;
}

export const useVaccineScheduleUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      scheduleId,
      scheduleData,
    }: {
      scheduleId: number | null;
      scheduleData: UpdateVaccineScheduleData;
    }) =>
      vaccineScheduleService.updateVaccinationSchedule(
        scheduleId,
        scheduleData,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vaccine-schedules"],
      });
      toast.success("Cập nhật lịch tiêm thành công!");
    },
    onError: (error: unknown) => {
      console.error("Update error:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Có lỗi xảy ra khi cập nhật lịch tiêm";
      toast.error(errorMessage);
    },
  });
};
