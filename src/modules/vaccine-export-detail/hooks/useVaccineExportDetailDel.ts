import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosInstance from "@/lib/axios";
import type { BaseResponse } from "@/shared/types/api.type";

export const useVaccineExportDetailDel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (detailId: number): Promise<BaseResponse<null>> => {
      return await axiosInstance
        .delete(
          `/api/VaccineExportDetail/delete-vaccine-export-detail/${detailId}`,
        )
        .then((res) => res.data);
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Chi tiết xuất kho đã được xóa thành công!");
        // Invalidate export details queries
        queryClient.invalidateQueries({
          queryKey: ["export-details"],
        });
      } else {
        toast.error(data.message || "Có lỗi xảy ra khi xóa chi tiết xuất kho!");
      }
    },
    onError: (error: unknown) => {
      console.error("Delete export detail error:", error);
      const errorMessage =
        (
          error as {
            response?: { data?: { message?: string } };
            message?: string;
          }
        )?.response?.data?.message ||
        (error as { message?: string })?.message ||
        "Có lỗi xảy ra khi xóa chi tiết xuất kho!";
      toast.error(errorMessage);
    },
  });
};
