import { Button } from "@/components/ui";
import { FinalizedCard } from "@/components/shared";
import { APPOINTMENT_STATUS } from "@/shared/constants/status.constants";
import { useVaccinationHandlers } from "../hooks/useVaccinationHandlers";

// Local components
import {
  AppointmentInfoCard,
  DiseaseChoiceCard,
  HealthCheckCard,
  PaymentInfoCard,
  PetInfoCard,
  ResultCard,
  VaccineInjectionTable,
  VetSelection,
  VaccineExportDetailCard,
  CompletedCard,
} from ".";

// Store
import { useVaccinationStore } from "../store/useVaccinationStore";
import { usePaymentStore } from "@/modules/payments";

// Types
import type { VaccineBatch } from "@/modules/vaccine-batch";
import type { VaccinationFormData } from "../types/state.type";
import type { VaccinationDetail } from "../types/detail.type";

interface Props {
  currentViewStatus: number;
  data: VaccinationDetail;
  formData: VaccinationFormData;
  canEdit: (step: number) => boolean;
  isVet: boolean;
  isPending: boolean;
  isConfirmValid: boolean;
  isCheckInValid: boolean;
  isInjectValid: boolean;
  vaccineBatchDetail?: VaccineBatch;
  onConfirmAppointment: () => void;
  onProceedToInjection: () => void;
  onCompleteInjection: () => void;
  onShowReject: () => void;
  onPaymentSuccess: () => void;
  onCompleteVaccination: () => void;
  onFinalizeVaccination: () => void;
  onExportInvoice: () => void;
}

export function StepContent({
  currentViewStatus,
  data,
  formData,
  canEdit,
  isVet,
  isPending,
  isConfirmValid,
  isCheckInValid,
  isInjectValid,
  vaccineBatchDetail,
  onConfirmAppointment,
  onProceedToInjection,
  onCompleteInjection,
  onShowReject,
  onCompleteVaccination,
  onFinalizeVaccination,
  onExportInvoice,
}: Props) {
  const {
    setSelectedDiseaseId,
    setVetSelection,
    setHealthData,
    setResultData,
  } = useVaccinationStore();
  const paymentId = usePaymentStore((state) => state.paymentId);
  const paymentMethod = usePaymentStore((state) => state.paymentMethod);
  const setPaymentId = usePaymentStore((state) => state.setPaymentId);
  const setPaymentMethod = usePaymentStore((state) => state.setPaymentMethod);
  const showExportInfo = useVaccinationStore((s) => s.exportDetailVisible);
  const exportDetail = useVaccinationStore((s) => s.exportDetail);

  const appointmentStatus = data.appointment.appointmentStatus;
  const isPaymentCompleted = Boolean(paymentId && paymentMethod);

  const { handleShowExportDetail } = useVaccinationHandlers({
    data,
    formData,
    appointmentId: data.appointment.appointmentId,
  });

  const renderCommonCards = () => (
    <>
      <PetInfoCard data={data} />
      <AppointmentInfoCard data={data} />
    </>
  );

  const renderStepConfirm = () => (
    <div className="space-y-6">
      {renderCommonCards()}
      <DiseaseChoiceCard
        selectedDiseaseId={formData.diseaseId}
        onSelect={setSelectedDiseaseId}
        disabled={!canEdit(APPOINTMENT_STATUS.PROCESSING)}
      />
      {currentViewStatus === appointmentStatus && (
        <div className="flex justify-end gap-4">
          <Button variant="destructive" onClick={onShowReject}>
            Hủy
          </Button>
          <Button
            className="bg-primary text-white"
            onClick={onConfirmAppointment}
            disabled={
              isPending ||
              !isConfirmValid ||
              !canEdit(APPOINTMENT_STATUS.PROCESSING)
            }
          >
            Xác nhận lịch
          </Button>
        </div>
      )}
    </div>
  );

  const renderStepCheckIn = () => (
    <div className="space-y-6">
      {renderCommonCards()}
      <VetSelection
        value={formData.vetSelection}
        onChange={setVetSelection}
        disabled={isPending || !canEdit(APPOINTMENT_STATUS.CONFIRMED)}
        appointmentDate={data?.appointmentDate}
        canEdit={!canEdit(APPOINTMENT_STATUS.CONFIRMED)}
      />
      {currentViewStatus === appointmentStatus && (
        <div className="flex justify-end gap-2">
          <Button
            className="bg-primary text-white"
            onClick={onProceedToInjection}
            disabled={
              isPending ||
              !isCheckInValid ||
              !canEdit(APPOINTMENT_STATUS.CONFIRMED)
            }
          >
            Tiếp tục
          </Button>
        </div>
      )}
    </div>
  );

  const renderStepInjection = () => (
    <div className="space-y-6">
      {renderCommonCards()}
      <HealthCheckCard
        data={formData.healthData}
        onChange={setHealthData}
        disabled={!isVet}
        canEdit={!canEdit(APPOINTMENT_STATUS.CHECKED_IN)}
      />
      <VaccineInjectionTable
        diseaseId={formData.diseaseId!}
        canEdit={!canEdit(APPOINTMENT_STATUS.CHECKED_IN)}
        disabled={!isVet}
      />
      <ResultCard
        vaccineType={data.disease?.name}
        values={formData.resultData}
        canEdit={!canEdit(APPOINTMENT_STATUS.CHECKED_IN)}
        onChange={(field, value) =>
          setResultData((prev) => ({ ...prev, [field]: value }))
        }
        disabled={!isVet}
      />
      {currentViewStatus === appointmentStatus && (
        <div className="flex justify-end">
          <Button
            className="bg-primary text-white"
            onClick={onCompleteInjection}
            disabled={isPending || !isInjectValid}
          >
            Tiếp tục
          </Button>
        </div>
      )}
    </div>
  );

  const renderStepPayment = () => (
    <div className="space-y-6">
      {renderCommonCards()}
      <PaymentInfoCard
        ownerName={data.appointment.customerResponseDTO.fullName}
        petName={data.appointment.petResponseDTO.name}
        memberRank=""
        discountPercent={0}
        productName={vaccineBatchDetail?.vaccineResponseDTO.name ?? ""}
        unitPrice={vaccineBatchDetail?.vaccineResponseDTO.price ?? 0}
        quantity={1}
        appointmentDetailId={data.appointmentDetailId}
        customerId={data.appointment.customerResponseDTO.customerId}
        vaccineBatchId={formData.selectedVaccineBatchId!}
        invoiceData={data}
        onPaymentSuccess={(paymentId, method) => {
          setPaymentId(paymentId);
          setPaymentMethod(method);
        }}
        onExportInvoice={onExportInvoice}
      />
      {isPaymentCompleted && paymentMethod !== "BankTransfer" && (
        <div className="flex justify-end">
          <Button
            className="bg-primary text-white"
            onClick={onCompleteVaccination}
            disabled={isPending}
          >
            Xác nhận thanh toán
          </Button>
        </div>
      )}
    </div>
  );

  const renderStepCompleted = () => (
    <div className="space-y-6">
      <CompletedCard data={data} onExportInvoice={onExportInvoice} />

      <div className="flex justify-end">
        <Button
          className="bg-primary text-white"
          disabled={isPending}
          onClick={onFinalizeVaccination}
        >
          Hoàn thành
        </Button>
      </div>
    </div>
  );

  const renderFinalized = () => (
    <div className="space-y-6">
      {renderCommonCards()}
      <FinalizedCard />

      <div className="flex justify-end gap-2">
        <Button onClick={handleShowExportDetail}>Chi tiết vaccine</Button>
      </div>

      {showExportInfo && exportDetail && (
        <VaccineExportDetailCard data={exportDetail} />
      )}
    </div>
  );

  switch (currentViewStatus) {
    case APPOINTMENT_STATUS.PROCESSING:
      return renderStepConfirm();
    case APPOINTMENT_STATUS.CONFIRMED:
      return renderStepCheckIn();
    case APPOINTMENT_STATUS.CHECKED_IN:
      return renderStepInjection();
    case APPOINTMENT_STATUS.PROCESSED:
      return renderStepPayment();
    case APPOINTMENT_STATUS.PAID:
      return renderStepCompleted();
    default:
      return renderFinalized();
  }
}
