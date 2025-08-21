import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { useConditionUpdate } from "./useConditionUpdate";
import { useConditionStore } from "../store/useConditionStore";
import { APPOINTMENT_STATUS } from "@/shared/constants/status.constants";

import type { ConditionFormData } from "../types/state.type";
import type { ConditionAppointments } from "../types/condition.type";
import type { UpdateStatusPayload } from "../types/payload.type";
import { usePaymentStore } from "@/modules/payments";
import { useUpdatePayment } from "@/modules/payments/hooks/useUpdatePayment";
import { PAYMENT_STATUS } from "@/shared/constants/payments.constants";

interface handlersProps {
  data?: ConditionAppointments;
  formData: ConditionFormData;
  appointmentId: number | null;
  onSuccess?: () => void;
}

export function useConditionHandlers({
  data,
  formData,
  appointmentId,
  onSuccess,
}: handlersProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { setActiveStep, setShowReject } = useConditionStore();

  const paymentId = usePaymentStore((state) => state.paymentId);
  const { mutate: updatePaymentStatus } = useUpdatePayment();

  const { mutate, isPending } = useConditionUpdate({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["conditions", "detail", appointmentId],
      });
      setActiveStep(null);
      onSuccess?.();
    },
  });

  const buildPayloadFromForm = useCallback(
    (status: number, assignVetMode = false): UpdateStatusPayload | null => {
      if (!data?.appointmentId) return null;

      if (assignVetMode) {
        // Only appointmentId as param, vetId and appointmentStatus in body
        return {
          appointmentId: data.appointmentId,
          vetId: formData.vetSelection.vetId,
          appointmentStatus: status,
        } as UpdateStatusPayload;
      }

      const basePayload: UpdateStatusPayload = {
        appointmentId: data.appointmentId,
        appointmentStatus: status,
        appointmentDate: formData.vetSelection.appointmentDate,
        petId: formData.petId,
        healthConditionId: formData.healthConditionId,
        microchipItemId: formData.microchipItemId,
        note: formData.note,
        ...formData.vitalSigns,
        ...formData.healthCheck,
      };

      return basePayload;
    },
    [data?.appointmentId, formData],
  );

  const handleStatusUpdate = useCallback(
    (payload: UpdateStatusPayload | null) => {
      if (!payload) return;
      mutate(payload);
    },
    [mutate],
  );

  const handleReject = useCallback(
    (note: string) => {
      if (!data?.appointment?.appointmentId) return;

      const payload = buildPayloadFromForm(APPOINTMENT_STATUS.CANCELLED);
      if (payload) {
        payload.note = note;
        handleStatusUpdate(payload);
      }
      setShowReject(false);
    },
    [data, buildPayloadFromForm, handleStatusUpdate, setShowReject],
  );

  const handleConfirmAppointment = useCallback(() => {
    const payload = buildPayloadFromForm(APPOINTMENT_STATUS.CONFIRMED);
    handleStatusUpdate(payload);
  }, [buildPayloadFromForm, handleStatusUpdate]);

  const handleAssignVet = useCallback(() => {
    // Only appointmentId as param, vetId and appointmentStatus in body
    const payload = buildPayloadFromForm(APPOINTMENT_STATUS.CHECKED_IN, true);
    handleStatusUpdate(payload);
  }, [buildPayloadFromForm, handleStatusUpdate]);

  const handleInject = useCallback(() => {
    const payload = buildPayloadFromForm(APPOINTMENT_STATUS.PROCESSED);
    handleStatusUpdate(payload);
  }, [buildPayloadFromForm, handleStatusUpdate]);

  const handlePayment = useCallback(() => {
    if (!data?.appointmentId || !paymentId) return;

    updatePaymentStatus({
      paymentId,
      paymentStatus: PAYMENT_STATUS.PAID,
    });
  }, [data?.appointmentId, paymentId, updatePaymentStatus]);

  const handleFinalizeCondition = useCallback(() => {
    const payload = buildPayloadFromForm(APPOINTMENT_STATUS.COMPLETED);
    handleStatusUpdate(payload);
  }, [buildPayloadFromForm, handleStatusUpdate]);

  const handleExportInvoice = useCallback(() => {
    const paymentId = data?.payment?.paymentId;
    if (!paymentId) return;

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
    handleInject,
    handlePayment,
    handleFinalizeCondition,
    handleExportInvoice,
  };
}
