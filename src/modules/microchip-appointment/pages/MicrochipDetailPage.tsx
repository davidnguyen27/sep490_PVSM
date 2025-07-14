// React & External Libraries
import { useCallback, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { SendToBack } from "lucide-react";

// Shared Components
import { PageBreadcrumb, PageLoader } from "@/components/shared";

// Local Components
import { StepProgress, StepContent } from "../components";

// Store & Hooks
import { useMicrochipStore } from "../store/useMicrochipStore";
import { useMicrochipAppDetail } from "../hooks/useMicrochipDetail";
import { useMicrochipHandlers } from "../hooks/useMicrochipHandlers";
import { useMicrochipValidation } from "../hooks/useMicrochipValidation";
import { useAuth } from "@/modules/auth";
import { RejectModal } from "@/modules/vaccination-appointment/components";

// Constants
import { UserRole } from "@/shared/constants/roles";

export default function MicrochipAppDetailPage() {
  const [searchParams] = useSearchParams();
  const appointmentId = Number(searchParams.get("appointmentId"));
  const { user } = useAuth();

  const {
    formData,
    activeStep,
    showReject,
    setActiveStep,
    setShowReject,
    initializeFromAPI,
  } = useMicrochipStore();

  const { data, isPending: loading } = useMicrochipAppDetail(appointmentId);

  const {
    isPending,
    handleConfirmAppointment,
    handleAssignVet,
    handleInjectMicrochip,
    handleReject,
    handleCreatePayment,
    handleFinalizeMicrochip,
    handleExportInvoice,
  } = useMicrochipHandlers({
    data,
    formData,
    appointmentId,
  });

  const { isStep2Valid, isStep3Valid } = useMicrochipValidation(formData);

  const status = data?.microchip.appointmentStatus ?? 0;

  const currentViewStatus = useMemo(
    () => activeStep ?? status,
    [activeStep, status],
  );

  const canEdit = useCallback((step: number) => step === status, [status]);
  const isVet = useMemo(() => user?.role === UserRole.VET, [user?.role]);

  const handleStepClick = useCallback(
    (step: number) => {
      if (step <= status) {
        setActiveStep(step);
      }
    },
    [status, setActiveStep],
  );

  useEffect(() => {
    if (data) {
      initializeFromAPI(data);
    }
  }, [data, initializeFromAPI]);

  if (!data) return null;

  return (
    <PageLoader loading={loading}>
      <div className="space-y-2">
        <h1 className="text-primary font-inter-700 flex items-center gap-2 text-xl">
          <SendToBack /> Theo dõi quá trình cấy microchip
        </h1>
        <PageBreadcrumb
          items={["Dashboard", "Lịch cấy microchip", "Chi tiết"]}
        />
      </div>

      <StepProgress currentStep={status} onStepClick={handleStepClick} />

      <StepContent
        currentViewStatus={currentViewStatus}
        data={data}
        formData={formData}
        isPending={isPending}
        isStep2Valid={isStep2Valid}
        isStep3Valid={isStep3Valid}
        canEdit={canEdit}
        isVet={isVet}
        onConfirmAppointment={handleConfirmAppointment}
        onAssignVet={handleAssignVet}
        onInjectMicrochip={handleInjectMicrochip}
        onShowReject={() => setShowReject(true)}
        onCompleteMicrochip={handleCreatePayment}
        onFinalizeMicrochip={handleFinalizeMicrochip}
        onExportInvoice={() => handleExportInvoice()}
      />

      <RejectModal
        open={showReject}
        onClose={() => setShowReject(false)}
        onConfirm={handleReject}
        loading={isPending}
      />
    </PageLoader>
  );
}
