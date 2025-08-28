import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { vetScheduleService } from "../services/vet-schedule.service";
import type { VetSchedulePayload } from "../types/vet-schedule.payload.type";

interface StaffCreateScheduleParams {
  vetId: number;
  scheduleDate: string;
  slotNumber: number;
  status: number;
}

export function useStaffCreateSchedule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: StaffCreateScheduleParams) => {
      const payload: VetSchedulePayload = {
        vetId: params.vetId,
        schedules: [
          {
            scheduleDate: params.scheduleDate,
            slotNumbers: [params.slotNumber],
          },
        ],
        status: params.status,
      };
      return vetScheduleService.createSchedule(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      toast.success("Tạo lịch làm việc thành công!");
    },
    onError: (error: unknown) => {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "Có lỗi xảy ra khi tạo lịch làm việc";
      toast.error(errorMessage);
    },
  });
}
