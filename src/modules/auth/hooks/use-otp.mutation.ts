import { useMutation } from "@tanstack/react-query";
import { authService } from "../services/auth.service";
import { toast } from "sonner";

export function useSendOTP() {
  return useMutation({
    mutationFn: authService.sendOTP,
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: () => {
      toast.error("Gửi mã OTP thất bại", {
        description: "Vui lòng kiểm tra lại mã OTP",
      });
    },
  });
}
