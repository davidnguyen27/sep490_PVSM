// React & External Libraries
import { useCallback, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { SendToBack } from "lucide-react";

// Shared Components
import { PageBreadcrumb, PageLoader } from "@/components/shared";

// Auth & External Modules
import { useAuth } from "@/modules/auth";
import { useVaccineBatchId } from "@/modules/vaccine-batch/hooks/useVaccineBatchId";

// Constants
import { UserRole } from "@/shared/constants/roles";

// Local Components
import { RejectModal, StepProgress } from "../components";
import { StepContent } from "../components/StepContent";

// Local Hooks
import { useVaccinationDetail } from "../hooks/useVaccinationDetail";
import { useVaccinationHandlers } from "../hooks/useVaccinationHandlers";
import { useVaccinationValidation } from "../hooks/useVaccinationValidation";

// Store
import { useVaccinationStore } from "../store/useVaccinationStore";
import { usePaymentStore } from "@/modules/payments";
import { APPOINTMENT_STATUS } from "../utils/status.utils";

export default function VaccinationAppDetailPage() {
  const [searchParams] = useSearchParams();
  const appointmentId = searchParams.get("appointmentId");
  const { user } = useAuth();

  const {
    formData,
    activeStep,
    showReject,
    setActiveStep,
    setShowReject,
    initializeFromAPI,
  } = useVaccinationStore();
  const { reset: resetPayment } = usePaymentStore();

  const { data, isPending: loading } = useVaccinationDetail(
    Number(appointmentId),
  );

  // Custom hooks for handlers and validation
  const {
    isPending,
    handleRejectConfirm,
    handleConfirmAppointment,
    handleProceedToInjection,
    handleCompleteInjection,
    handleCompleteVaccination,
    handleFinalizeVaccination,
    handleExportInvoice,
  } = useVaccinationHandlers({
    data,
    formData,
    appointmentId: Number(appointmentId),
  });

  const { isStep1Valid, isStep2Valid, isStep3Valid } =
    useVaccinationValidation(formData);

  const { data: vaccineBatchDetail } = useVaccineBatchId(
    formData.selectedVaccineBatchId,
  );

  const isVet = useMemo(() => user?.role === UserRole.VET, [user?.role]);
  const status = data?.appointment.appointmentStatus;

  const currentViewStatus = useMemo(
    () => activeStep ?? status ?? 0,
    [activeStep, status],
  );

  const canEdit = useCallback(
    (step: number) => {
      return step === (status ?? 0);
    },
    [status],
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
    }
    const payment = data?.payment;
    if (payment?.paymentId && payment?.paymentMethod) {
      const paymentMethod = payment.paymentMethod.toLowerCase() as
        | "cash"
        | "transfer";
      usePaymentStore.getState().setPaymentId(payment.paymentId);
      usePaymentStore.getState().setPaymentMethod(paymentMethod);
    }
  }, [data, initializeFromAPI]);

  useEffect(() => {
    if (status === APPOINTMENT_STATUS.COMPLETED) resetPayment();
  }, [status, resetPayment]);

  if (!data) return null;

  return (
    <PageLoader loading={loading}>
      <div className="space-y-2">
        <h1 className="text-primary font-inter-700 flex items-center gap-2 text-xl">
          <SendToBack /> Theo dõi quá trình tiêm
        </h1>
        <PageBreadcrumb items={["Dashboard", "Lịch tiêm chủng", "Chi tiết"]} />
      </div>

      <StepProgress currentStep={status ?? 0} onStepClick={handleStepClick} />

      <StepContent
        currentViewStatus={currentViewStatus}
        data={data}
        formData={formData}
        canEdit={canEdit}
        isVet={isVet}
        isPending={isPending}
        isStep1Valid={isStep1Valid}
        isStep2Valid={isStep2Valid}
        isStep3Valid={isStep3Valid}
        vaccineBatchDetail={vaccineBatchDetail}
        onConfirmAppointment={handleConfirmAppointment}
        onProceedToInjection={handleProceedToInjection}
        onCompleteInjection={handleCompleteInjection}
        onShowReject={() => setShowReject(true)}
        onPaymentSuccess={handleCompleteVaccination}
        onCompleteVaccination={handleCompleteVaccination}
        onFinalizeVaccination={handleFinalizeVaccination}
        onExportInvoice={() => handleExportInvoice()}
      />

      <RejectModal
        open={showReject}
        onClose={() => setShowReject(false)}
        onConfirm={handleRejectConfirm}
        loading={isPending}
      />
    </PageLoader>
  );
}
