import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { vaccineScheduleService } from "../services/vaccine-schedule.service";
import type { VaccineSchedulePayload } from "../types/vaccine-schedule.payload.type";

export function useVaccineScheduleCreate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: VaccineSchedulePayload) =>
      vaccineScheduleService.createVaccinationSchedule(data),
    onSuccess: (data) => {
      console.log("Vaccine schedule created successfully:", data);

      // Invalidate all vaccine schedule queries to ensure UI updates
      queryClient.invalidateQueries({
        queryKey: ["vaccine-schedules"],
        exact: false,
      });

      // Also refetch current query to immediately update UI
      queryClient.refetchQueries({
        queryKey: ["vaccine-schedules"],
        exact: false,
      });

      toast.success("Tạo lịch tiêm thành công!", {
        description: `Đã tạo lịch tiêm cho ${data.species === "Dog" ? "chó" : "mèo"} với ${data.doseNumber} mũi tiêm`,
      });
    },
    onError: (error: unknown) => {
      console.error("Error creating vaccine schedule:", error);

      let errorMessage = "Có lỗi xảy ra khi tạo lịch tiêm";

      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
        };
        errorMessage = axiosError.response?.data?.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error("Tạo lịch tiêm thất bại!", {
        description: errorMessage,
      });
    },
  });
}
