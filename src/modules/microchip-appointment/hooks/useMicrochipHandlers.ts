import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { useMicrochipAppUpdate } from "./useMicrochipUpdate";
import { useMicrochipStore } from "../store/useMicrochipStore";
import { useAssignMicrochip } from "@/modules/microchip-item";

import type { MicrochipFormData } from "../types/state.type";
import type { MicrochipDetail } from "../types/detail.type";
import type { UpdateStatusParams } from "../types/param.type";
import { usePaymentStore } from "@/modules/payments";
import { useUpdatePayment } from "@/modules/payments/hooks/useUpdatePayment";
import { APPOINTMENT_STATUS } from "@/shared/constants/status.constants";

interface UseMicrochipHandlersProps {
  data?: MicrochipDetail;
  formData: MicrochipFormData;
  appointmentId: number;
  onSuccess?: () => void;
}

export function useMicrochipHandlers({
  data,
  formData,
  appointmentId,
  onSuccess,
}: UseMicrochipHandlersProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { setActiveStep, setShowReject } = useMicrochipStore();

  const paymentId = usePaymentStore((state) => state.paymentId);
  const { mutate: updatePaymentStatus } = useUpdatePayment();

  const { mutate, isPending } = useMicrochipAppUpdate({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["microchips", "detail", appointmentId],
      });
      setActiveStep(null);
      onSuccess?.();
    },
  });

  const { mutate: assignMicrochip, isPending: isAssigningMicrochip } =
    useAssignMicrochip();

  const handleStatusUpdate = useCallback(
    (params: UpdateStatusParams) => {
      mutate(params);
    },
    [mutate],
  );

  const handleReject = useCallback(
    (note: string) => {
      if (!data?.microchip?.appointmentId) return;

      handleStatusUpdate({
        appointmentId: data.microchip?.appointmentId,
        appointmentStatus: APPOINTMENT_STATUS.CANCELLED,
        note,
      });
      setShowReject(false);
    },
    [data, handleStatusUpdate, setShowReject],
  );

  const handleConfirm = useCallback(() => {
    if (!data?.microchip.appointmentId) return;

    handleStatusUpdate({
      appointmentId: data.microchip.appointmentId,
      appointmentStatus: APPOINTMENT_STATUS.CONFIRMED,
    });
  }, [data?.microchip.appointmentId, handleStatusUpdate]);

  const handleCheckIn = useCallback(() => {
    const appointmentId = data?.microchip?.appointmentId;
    if (!appointmentId || !formData.vetSelection?.vetId) return;

    handleStatusUpdate({
      appointmentId: appointmentId,
      appointmentStatus: APPOINTMENT_STATUS.CHECKED_IN,
      vetId: formData.vetSelection?.vetId,
    });
  }, [
    data?.microchip?.appointmentId,
    formData.vetSelection?.vetId,
    handleStatusUpdate,
  ]);

  const handleInject = useCallback(() => {
    if (
      !data?.microchip?.appointmentId ||
      !data.microchip?.vet?.vetId ||
      !formData.microchipItemId ||
      !formData.result.description
    )
      return;

    // Đầu tiên gắn microchip vào thú cưng
    const petId = data?.microchip.appointment?.petResponseDTO?.petId;
    if (petId && formData.microchipItemId) {
      assignMicrochip(
        {
          microchipItemId: formData.microchipItemId,
          petId: petId,
        },
        {
          onSuccess: () => {
            // Sau khi gắn microchip thành công, cập nhật status appointment (KHÔNG truyền vetId)
            handleStatusUpdate({
              appointmentId: data.microchip?.appointmentId,
              appointmentStatus: APPOINTMENT_STATUS.PROCESSED,
              microchipItemId: formData.microchipItemId,
              description: formData.result.description,
              note: formData.result.note,
            });
          },
          onError: () => {
            // Nếu gắn microchip thất bại, vẫn có thể tiếp tục update status (KHÔNG truyền vetId)
            console.warn(
              "Failed to assign microchip, proceeding with status update",
            );
            handleStatusUpdate({
              appointmentId: data.microchip?.appointmentId,
              appointmentStatus: APPOINTMENT_STATUS.PROCESSED,
              microchipItemId: formData.microchipItemId,
              description: formData.result.description,
              note: formData.result.note,
            });
          },
        },
      );
    } else {
      // Nếu không có petId hoặc microchipItemId, chỉ update status (KHÔNG truyền vetId)
      handleStatusUpdate({
        appointmentId: data.microchip?.appointmentId,
        appointmentStatus: APPOINTMENT_STATUS.PROCESSED,
        microchipItemId: formData.microchipItemId,
        description: formData.result.description,
        note: formData.result.note,
      });
    }
  }, [
    data?.microchip?.appointmentId,
    data?.microchip?.vet?.vetId,
    data?.microchip.appointment?.petResponseDTO?.petId,
    formData,
    assignMicrochip,
    handleStatusUpdate,
  ]);

  const handlePayment = useCallback(() => {
    if (!data?.microchip.appointmentId || !paymentId) return;

    updatePaymentStatus(
      {
        paymentId,
        paymentStatus: 2,
      },
      {
        onSuccess: () => {
          setActiveStep(APPOINTMENT_STATUS.PAID);
          onSuccess?.();
        },
      },
    );
  }, [data, paymentId, updatePaymentStatus, onSuccess, setActiveStep]);

  const handleFinalize = useCallback(() => {
    if (!data?.microchip?.appointmentId) return;

    handleStatusUpdate({
      appointmentId: data.microchip?.appointmentId,
      appointmentStatus: APPOINTMENT_STATUS.COMPLETED,
      microchipItemId: data?.microchip?.microchipItemId,
      description: formData.result.description,
      note: formData.result.note,
    });
  }, [data, formData, handleStatusUpdate]);

  const handleExportInvoice = useCallback(() => {
    if (!data?.microchip?.payment?.paymentId) return;

    navigate("/staff/invoice", {
      state: {
        invoiceData: data,
      },
    });
  }, [data, navigate]);

  return {
    isPending: isPending || isAssigningMicrochip,
    handleReject,
    handleConfirm,
    handleCheckIn,
    handleInject,
    handlePayment,
    handleFinalize,
    handleExportInvoice,
  };
}
