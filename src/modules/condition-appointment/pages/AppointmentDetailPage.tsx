import { useCallback, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { SendToBack } from "lucide-react";

import { PageBreadcrumb, StepProgress } from "@/components/shared";
import { RejectModal, StepContent } from "../components";

import { useConditionStore } from "../store/useConditionStore";
import { useConditionDetail } from "../hooks/useConditionDetail";
import { useConditionHandlers } from "../hooks/useConditionHandlers";
import { useConditionValidation } from "../hooks/useConditionValidation";
import { usePaymentStore } from "@/modules/payments";
import { useAuth } from "@/modules/auth";

import { CONDITION_APPOINTMENT_STEPS } from "../constants/steps.constants";
import { APPOINTMENT_STATUS } from "@/shared/constants/status.constants";
import { UserRole } from "@/shared/constants/roles.constants";

export default function AppointmentDetailPage() {
  const [searchParams] = useSearchParams();
  const appointmentDetailId = Number(searchParams.get("appointmentId"));
  const { user } = useAuth();

  const basePath =
    user?.role === 3
      ? "/vet/condition-appointments"
      : "/staff/condition-appointments";

  const {
    formData,
    activeStep,
    showReject,
    setActiveStep,
    setShowReject,
    initializeFromAPI,
  } = useConditionStore();
  const { reset: resetPayment } = usePaymentStore();

  const { data } = useConditionDetail(appointmentDetailId);
  const appointmentId = data?.appointmentId ?? null;

  const {
    isPending,
    handleConfirmAppointment,
    handleAssignVet,
    handleInject,
    handleReject,
    handlePayment,
    handleFinalizeCondition,
    handleExportInvoice,
  } = useConditionHandlers({
    data,
    formData,
    appointmentId,
  });

  const { isVetAssigned } = useConditionValidation(formData);

  const isVet = useMemo(() => user?.role === UserRole.VET, [user?.role]);
  const status = data?.appointmentStatus ?? 0;
  const effectiveStep = activeStep ?? status ?? 0;

  const currentViewStatus = useMemo(
    () => activeStep ?? status ?? 0,
    [activeStep, status],
  );

  const canEdit = useCallback(
    (step: number) => {
      return effectiveStep === step && status === step;
    },
    [effectiveStep, status],
  );

  const handleStepClick = useCallback(
    (step: number) => {
      if (step <= status) setActiveStep(step);
    },
    [status, setActiveStep],
  );

  useEffect(() => {
    if (data) {
      initializeFromAPI(data);

      // Get payment information from appointment detail
      const payment = data.payment;
      if (payment?.paymentId && payment?.paymentMethod) {
        // Format paymentMethod to match our app's expected format
        const paymentMethod =
          payment.paymentMethod === "CASH" ? "Cash" : "BankTransfer";

        // Set payment information in store
        usePaymentStore.getState().setPaymentId(payment.paymentId);
        usePaymentStore.getState().setPaymentMethod(paymentMethod);
      }
    }
  }, [data, initializeFromAPI]);

  useEffect(() => {
    if (status === APPOINTMENT_STATUS.COMPLETED) resetPayment();
  }, [status, resetPayment]);

  if (!data) return null;

  return (
    <>
      <div className="space-y-2">
        <h1 className="text-primary font-inter-700 flex items-center gap-2 text-xl">
          <SendToBack />
          Theo dõi quá trình cấp chứng nhận
        </h1>
        <PageBreadcrumb
          items={[{ label: "Danh sách lịch hẹn", path: basePath }, "Chi tiết"]}
        />
      </div>

      <StepProgress
        steps={CONDITION_APPOINTMENT_STEPS}
        currentStep={status}
        onStepClick={handleStepClick}
      />

      <StepContent
        currentViewStatus={currentViewStatus}
        data={data}
        formData={formData}
        isPending={isPending}
        isCheckedIn={isVetAssigned}
        canEdit={canEdit}
        isVet={isVet}
        onConfirmAppointment={handleConfirmAppointment}
        onAssignVet={handleAssignVet}
        onInject={handleInject}
        onShowReject={() => setShowReject(true)}
        onCompleteCondition={handlePayment}
        onFinalizeCondition={handleFinalizeCondition}
        onExportInvoice={() => handleExportInvoice()}
      />

      <RejectModal
        open={showReject}
        onClose={() => setShowReject(false)}
        onConfirm={handleReject}
        loading={isPending}
      />
    </>
  );
}
