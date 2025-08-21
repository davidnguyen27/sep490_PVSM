import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { useUpdateStatus } from "./useVaccinationUpdate";
import { useVaccinationStore } from "../store/useVaccinationStore";
import { useUpdatePayment } from "@/modules/payments/hooks/useUpdatePayment";
import { usePaymentStore } from "@/modules/payments";
import { useVaccineExportDetail } from "@/modules/vaccine-export-detail/hooks/useVaccineExportDetail";

import { APPOINTMENT_STATUS } from "@/shared/constants/status.constants";
import type { UpdateStatusParams } from "../types/params.type";
import type { VaccinationDetail } from "../types/detail.type";
import type { VaccinationFormData } from "../types/state.type";

interface UseVaccinationHandlersProps {
  data?: VaccinationDetail;
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
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: updateStatus, isPending } = useUpdateStatus({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["vaccination", "detail", appointmentId],
      });
      setActiveStep(null);
      onSuccess?.();
    },
  });

  const { mutate: updatePaymentStatus } = useUpdatePayment();
  const { refetch: refetchExportDetail } = useVaccineExportDetail(
    data?.appointmentDetailId ?? null,
  );

  // Zustand store
  const {
    setActiveStep,
    setShowReject,
    setExportDetail,
    setExportDetailVisible,
  } = useVaccinationStore.getState();
  const paymentId = usePaymentStore((s) => s.paymentId);

  // --- Handlers ---

  const handleStatusUpdate = useCallback(
    (params: UpdateStatusParams) => updateStatus(params),
    [updateStatus],
  );

  const handleReject = useCallback(
    (notes: string) => {
      if (!data?.appointment?.appointmentId) return;

      handleStatusUpdate({
        appointmentId: data.appointment.appointmentId,
        appointmentStatus: APPOINTMENT_STATUS.CANCELLED,
        notes,
      });
      setShowReject(false);
    },
    [data, handleStatusUpdate, setShowReject],
  );

  const handleConfirm = useCallback(() => {
    const appointmentId = data?.appointment?.appointmentId;
    if (!appointmentId || !formData.diseaseId) return;

    handleStatusUpdate({
      appointmentId,
      appointmentStatus: APPOINTMENT_STATUS.CONFIRMED,
      diseaseId: formData.diseaseId,
    });
  }, [data, formData.diseaseId, handleStatusUpdate]);

  const handleCheckIn = useCallback(() => {
    const appointmentId = data?.appointment?.appointmentId;
    if (!appointmentId || !formData.vetSelection.vetId) return;

    handleStatusUpdate({
      appointmentId,
      appointmentStatus: APPOINTMENT_STATUS.CHECKED_IN,
      diseaseId: formData.diseaseId ?? undefined,
      vetId: formData.vetSelection.vetId,
    });
  }, [data, formData, handleStatusUpdate]);

  const handleInjection = useCallback(() => {
    const appointmentId = data?.appointment?.appointmentId;
    if (!appointmentId || !formData.selectedVaccineBatchId) return;

    handleStatusUpdate({
      appointmentId,
      appointmentStatus: APPOINTMENT_STATUS.PROCESSED,
      diseaseId: formData.diseaseId ?? undefined,
      vaccineBatchId: formData.selectedVaccineBatchId,
      reaction: formData.resultData.reaction,
      notes: formData.resultData.notes,
      temperature: formData.healthData.temperature,
      heartRate: formData.healthData.heartRate,
      generalCondition: formData.healthData.generalCondition,
      others: formData.healthData.others,
    });
  }, [data, formData, handleStatusUpdate]);

  const handlePayment = useCallback(() => {
    const appointmentId = data?.appointment?.appointmentId;
    if (!appointmentId || !paymentId) return;

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

  const handleFinalizeVaccination = useCallback(() => {
    const appointmentId = data?.appointment?.appointmentId;
    if (!appointmentId) return;

    const {
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
    const paymentId = data?.payment?.paymentId;
    if (!paymentId) return;

    navigate("/staff/invoice", {
      state: {
        invoiceData: data,
      },
    });
  }, [data, navigate]);

  const handleShowExportDetail = useCallback(async () => {
    if (!data?.appointmentDetailId) return;

    try {
      const { data: detail } = await refetchExportDetail();
      setExportDetail(detail ?? null);
      setExportDetailVisible(!!detail);
    } catch {
      setExportDetail(null);
      setExportDetailVisible(false);
    }
  }, [
    data?.appointmentDetailId,
    refetchExportDetail,
    setExportDetail,
    setExportDetailVisible,
  ]);

  return {
    isPending,
    handleReject,
    handleConfirm,
    handleCheckIn,
    handleInjection,
    handlePayment,
    handleFinalizeVaccination,
    handleExportInvoice,
    handleShowExportDetail,
  };
}
