import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { useMicrochipAppUpdate } from "./useMicrochipUpdate";
import { useMicrochipStore } from "../store/useMicrochipStore";
import { APPOINTMENT_STATUS } from "../utils/status.utils";

import type { MicrochipFormData } from "../types/state.type";
import type { MicrochipDetail } from "../types/detail.type";
import type { UpdateStatusParams } from "../utils/param.type";
import { usePaymentStore } from "@/modules/payments";
import { useUpdatePayment } from "@/modules/payments/hooks/useUpdatePayment";

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

  const handleStatusUpdate = useCallback(
    (params: UpdateStatusParams) => {
      mutate(params);
    },
    [mutate],
  );

  const handleReject = useCallback(() => {
    if (!data?.microchip.appointmentDetailId || !data?.microchip.appointmentId)
      return;

    handleStatusUpdate({
      appointmentId: data.microchip.appointmentId,
      appointmentStatus: APPOINTMENT_STATUS.REJECTED,
    });
    setShowReject(false);
  }, [
    data?.microchip.appointmentDetailId,
    data?.microchip.appointmentId,
    handleStatusUpdate,
    setShowReject,
  ]);

  const handleConfirmAppointment = useCallback(() => {
    if (!data?.microchip.appointmentId) return;

    handleStatusUpdate({
      appointmentId: data.microchip.appointmentId,
      appointmentStatus: APPOINTMENT_STATUS.CHECK_IN,
    });
  }, [data?.microchip.appointmentId, handleStatusUpdate]);

  const handleAssignVet = useCallback(() => {
    if (!data?.microchip.appointmentId || !formData.vetSelection.vetId) return;

    handleStatusUpdate({
      appointmentId: data.microchip.appointmentId,
      appointmentStatus: APPOINTMENT_STATUS.IN_PROGRESS,
      vetId: formData.vetSelection.vetId,
    });
  }, [
    data?.microchip.appointmentId,
    formData.vetSelection.vetId,
    handleStatusUpdate,
  ]);

  const handleInjectMicrochip = useCallback(() => {
    if (
      !data?.microchip.appointmentId ||
      !data.microchip.vet.vetId ||
      !formData.microchipItemId ||
      !formData.result.description
    )
      return;

    handleStatusUpdate({
      appointmentId: data.microchip.appointmentId,
      appointmentStatus: APPOINTMENT_STATUS.PAYMENT,
      vetId: data.microchip.vet.vetId,
      microchipItemId: formData.microchipItemId,
      description: formData.result.description,
      note: formData.result.note,
    });
  }, [
    data?.microchip.appointmentId,
    data?.microchip.vet?.vetId,
    formData,
    handleStatusUpdate,
  ]);

  const handleCreatePayment = useCallback(() => {
    if (!data?.microchip.appointmentId || !paymentId) return;

    updatePaymentStatus({
      paymentId,
      paymentStatus: 2,
    });
  }, [data?.microchip.appointmentId, paymentId, updatePaymentStatus]);

  const handleFinalizeMicrochip = useCallback(() => {
    if (!data?.microchip.appointmentId) return;

    handleStatusUpdate({
      appointmentId: data.microchip.appointmentId,
      appointmentStatus: APPOINTMENT_STATUS.COMPLETED,
      vetId: data.microchip?.vet?.vetId,
      microchipItemId: data?.microchip?.microchipItemId,
      description: formData.result.description,
      note: formData.result.note,
    });
  }, [data, formData, handleStatusUpdate]);

  const handleExportInvoice = useCallback(() => {
    if (!data?.microchip.payment.paymentId) return;

    navigate("/staff/invoice", {
      state: {
        invoiceData: data,
      },
    });
  }, [data, navigate]);

  return {
    isPending,
    handleReject,
    handleConfirmAppointment,
    handleAssignVet,
    handleInjectMicrochip,
    handleCreatePayment,
    handleFinalizeMicrochip,
    handleExportInvoice,
  };
}
