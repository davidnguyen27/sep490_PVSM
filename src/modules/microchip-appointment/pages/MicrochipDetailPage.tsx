// React & External Libraries
import { useCallback, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { SendToBack } from "lucide-react";

// Shared Components
import { PageBreadcrumb, StepProgress, RejectModal } from "@/components/shared";

// Local Components
import { StepContent } from "../components";

// Store & Hooks
import { useMicrochipStore } from "../store/useMicrochipStore";
import { useMicrochipAppDetail } from "../hooks/useMicrochipDetail";
import { useMicrochipHandlers } from "../hooks/useMicrochipHandlers";
import { useMicrochipValidation } from "../hooks/useMicrochipValidation";
import { useAuth } from "@/modules/auth";
import { usePaymentStore } from "@/modules/payments";

// Constants
import { UserRole } from "@/shared/constants/roles.constants";
import { MICROCHIP_APPOINTMENT_STEPS } from "../constants/steps.constants";
import { APPOINTMENT_STATUS } from "@/shared/constants/status.constants";

export default function MicrochipAppDetailPage() {
  const [searchParams] = useSearchParams();
  const appointmentId = Number(searchParams.get("appointmentId"));
  const { user } = useAuth();

  const basePath =
    user?.role === 3
      ? "/vet/microchip-appointments"
      : "/staff/microchip-appointments";

  const {
    formData,
    activeStep,
    showReject,
    setActiveStep,
    setShowReject,
    initializeFromAPI,
  } = useMicrochipStore();
  const { reset: resetPayment } = usePaymentStore();

  const { data } = useMicrochipAppDetail(appointmentId);

  const {
    isPending,
    handleConfirm,
    handleCheckIn,
    handleInject,
    handleReject,
    handlePayment,
    handleFinalize,
    handleExportInvoice,
  } = useMicrochipHandlers({
    data,
    formData,
    appointmentId,
  });

  const { isStep2Valid, isStep3Valid } = useMicrochipValidation(formData);

  const isVet = useMemo(() => user?.role === UserRole.VET, [user?.role]);
  const status = data?.microchip?.appointment?.appointmentStatus;
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
      if (step <= (status ?? 0)) {
        setActiveStep(step);
      }
    },
    [status, setActiveStep],
  );

  useEffect(() => {
    if (data) {
      initializeFromAPI(data);

      // Get payment information from appointment detail
      const payment = data.microchip.payment;
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
          <SendToBack /> Theo dõi quá trình cấy microchip
        </h1>
        <PageBreadcrumb
          items={[{ label: "Danh sách lịch hẹn", path: basePath }, "Chi tiết"]}
        />
      </div>

      <StepProgress
        steps={MICROCHIP_APPOINTMENT_STEPS}
        currentStep={status ?? 0}
        onStepClick={handleStepClick}
      />

      <StepContent
        currentViewStatus={currentViewStatus}
        data={data}
        formData={formData}
        isPending={isPending}
        isStep2Valid={isStep2Valid}
        isStep3Valid={isStep3Valid}
        canEdit={canEdit}
        isVet={isVet}
        onConfirmAppointment={handleConfirm}
        onAssignVet={handleCheckIn}
        onInjectMicrochip={handleInject}
        onShowReject={() => setShowReject(true)}
        onCompleteMicrochip={handlePayment}
        onFinalizeMicrochip={handleFinalize}
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
