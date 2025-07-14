import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateStatus } from "./useVaccinationUpdate";
import { useVaccinationStore } from "../store/useVaccinationStore";
import { APPOINTMENT_STATUS } from "../utils/status.utils";
import type { UpdateStatusParams } from "../types/params.type";
import type { VaccinationDetail } from "../types/detail.type";
import type { VaccinationFormData } from "../types/state.type";
import { useUpdatePayment } from "@/modules/payments/hooks/useUpdatePayment";
import { usePaymentStore } from "@/modules/payments";
import { useNavigate } from "react-router-dom";

interface UseVaccinationHandlersProps {
  data: VaccinationDetail | undefined;
  formData: VaccinationFormData;
  appointmentId: number;
  onSuccess?: () => void;
}

export function useVaccinationHandlers({
  data,
  formData,
  appointmentId,
  onSuccess,
}: UseVaccinationHandlersProps) {
  const queryClient = useQueryClient();
  const { setActiveStep, setShowReject } = useVaccinationStore();
  const navigate = useNavigate();

  const { mutate, isPending } = useUpdateStatus({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["vaccination", "detail", appointmentId],
      });
      setActiveStep(null);
      onSuccess?.();
    },
  });

  const paymentId = usePaymentStore((state) => state.paymentId);
  const { mutate: updatePaymentStatus } = useUpdatePayment();

  const handleStatusUpdate = useCallback(
    (params: UpdateStatusParams) => {
      mutate(params);
    },
    [mutate],
  );

  const handleRejectConfirm = useCallback(
    (notes: string) => {
      if (!data?.appointment.appointmentId) return;

      handleStatusUpdate({
        appointmentId: data.appointment.appointmentId,
        appointmentStatus: APPOINTMENT_STATUS.REJECTED,
        notes,
      });
      setShowReject(false);
    },
    [data?.appointment.appointmentId, handleStatusUpdate, setShowReject],
  );

  const handleConfirmAppointment = useCallback(() => {
    if (!data?.appointment.appointmentId || !formData.diseaseId) return;

    handleStatusUpdate({
      appointmentId: data.appointment.appointmentId,
      appointmentStatus: APPOINTMENT_STATUS.CHECK_IN,
      diseaseId: formData.diseaseId,
    });
  }, [data?.appointment.appointmentId, formData.diseaseId, handleStatusUpdate]);

  const handleProceedToInjection = useCallback(() => {
    if (!data?.appointment.appointmentId || !formData.vetSelection.vetId)
      return;

    handleStatusUpdate({
      appointmentId: data.appointment.appointmentId,
      appointmentStatus: APPOINTMENT_STATUS.IN_PROGRESS,
      diseaseId: formData.diseaseId ?? undefined,
      vetId: formData.vetSelection.vetId,
      temperature: formData.healthData.temperature,
      heartRate: formData.healthData.heartRate,
      generalCondition: formData.healthData.generalCondition,
      others: formData.healthData.others,
    });
  }, [data?.appointment.appointmentId, formData, handleStatusUpdate]);

  const handleCompleteInjection = useCallback(() => {
    if (!data?.appointment.appointmentId || !formData.selectedVaccineBatchId)
      return;

    handleStatusUpdate({
      appointmentId: data.appointment.appointmentId,
      appointmentStatus: APPOINTMENT_STATUS.PAYMENT,
      diseaseId: formData.diseaseId ?? undefined,
      vaccineBatchId: formData.selectedVaccineBatchId,
      reaction: formData.resultData.reaction,
      notes: formData.resultData.notes,
    });
  }, [data?.appointment.appointmentId, formData, handleStatusUpdate]);

  const handleCompleteVaccination = useCallback(() => {
    if (!data?.appointment.appointmentId || !paymentId) return;

    updatePaymentStatus({
      paymentId,
      paymentStatus: 2,
    });
  }, [data?.appointment.appointmentId, paymentId, updatePaymentStatus]);

  const handleFinalizeVaccination = useCallback(() => {
    if (!data?.appointment.appointmentId) return;

    const {
      appointment: { appointmentId },
      vet,
      vaccineBatch,
      disease,
      reaction,
      notes,
      temperature,
      heartRate,
      generalCondition,
      others,
    } = data;

    handleStatusUpdate({
      appointmentId,
      appointmentStatus: APPOINTMENT_STATUS.COMPLETED,
      vetId: vet?.vetId,
      vaccineBatchId: vaccineBatch?.vaccineBatchId,
      diseaseId: disease?.diseaseId,
      temperature,
      heartRate,
      generalCondition,
      others,
      reaction,
      notes,
    });
  }, [data, handleStatusUpdate]);

  const handleExportInvoice = useCallback(() => {
    if (!data?.payment?.paymentId) return;

    navigate("/staff/invoice", {
      state: {
        invoiceData: data,
      },
    });
  }, [data, navigate]);

  return {
    isPending,
    handleRejectConfirm,
    handleConfirmAppointment,
    handleProceedToInjection,
    handleCompleteInjection,
    handleCompleteVaccination,
    handleFinalizeVaccination,
    handleExportInvoice,
  };
}
