// React & External Libraries
import { useCallback, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { SendToBack } from "lucide-react";

// Shared Components
import { PageBreadcrumb, StepProgress } from "@/components/shared";

// Auth & External Modules
import { useAuth } from "@/modules/auth";
import { useVaccineBatchById } from "@/modules/vaccine-batch/hooks/useVaccineBatchById";

// Constants
import { UserRole } from "@/shared/constants/roles.constants";
import { APPOINTMENT_STATUS } from "@/shared/constants/status.constants";
import { VACCINATION_APPOINTMENT_STEPS } from "../constants/steps.constants";

// Shared Components (continued)
import { RejectModal } from "@/components/shared";

// Local Components
import { StepContent } from "../components/StepContent";

// Local Hooks
import { useVaccinationDetail } from "../hooks/useVaccinationDetail";
import { useVaccinationHandlers } from "../hooks/useVaccinationHandlers";
import { useVaccinationValidation } from "../hooks/useVaccinationValidation";

// Store
import { useVaccinationStore } from "../store/useVaccinationStore";
import { usePaymentStore } from "@/modules/payments";

export default function VaccinationAppDetailPage() {
  const [searchParams] = useSearchParams();
  const appointmentId = searchParams.get("appointmentId");
  const { user } = useAuth();

  // Determine base path for breadcrumb by role
  const basePath =
    user?.role === 3
      ? "/vet/vaccination-appointments"
      : "/staff/vaccination-appointments";

  const {
    formData,
    activeStep,
    showReject,
    setActiveStep,
    setShowReject,
    initializeFromAPI,
  } = useVaccinationStore();
  const { reset: resetPayment } = usePaymentStore();

  const { data } = useVaccinationDetail(Number(appointmentId));

  // Custom hooks for handlers and validation
  const {
    isPending,
    handleReject,
    handleConfirm,
    handleCheckIn,
    handleInjection,
    handlePayment,
    handleFinalizeVaccination,
    handleExportInvoice,
  } = useVaccinationHandlers({
    data,
    formData,
    appointmentId: Number(appointmentId),
  });

  const { isConfirmValid, isCheckInValid, isInjectValid } =
    useVaccinationValidation(formData);

  const { data: vaccineBatchDetail } = useVaccineBatchById(
    formData.selectedVaccineBatchId,
  );

  const isVet = useMemo(() => user?.role === UserRole.VET, [user?.role]);
  const status = data?.appointment.appointmentStatus;
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
          <SendToBack /> Theo dõi quá trình tiêm
        </h1>
        <PageBreadcrumb
          items={[{ label: "Danh sách lịch hẹn", path: basePath }, "Chi tiết"]}
        />
      </div>

      <StepProgress
        steps={VACCINATION_APPOINTMENT_STEPS}
        currentStep={status ?? 0}
        onStepClick={handleStepClick}
      />

      <StepContent
        currentViewStatus={currentViewStatus}
        data={data}
        formData={formData}
        canEdit={canEdit}
        isVet={isVet}
        isPending={isPending}
        isConfirmValid={isConfirmValid}
        isCheckInValid={isCheckInValid}
        isInjectValid={isInjectValid}
        vaccineBatchDetail={vaccineBatchDetail}
        onConfirmAppointment={handleConfirm}
        onProceedToInjection={handleCheckIn}
        onCompleteInjection={handleInjection}
        onShowReject={() => setShowReject(true)}
        onPaymentSuccess={handlePayment}
        onCompleteVaccination={handlePayment}
        onFinalizeVaccination={handleFinalizeVaccination}
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
