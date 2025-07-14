import { Button } from "@/components/ui";
import { APPOINTMENT_STATUS } from "../utils/status.utils";

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
  CompletedCard,
} from ".";

// Store
import { useVaccinationStore } from "../store/useVaccinationStore";
import { usePaymentStore } from "@/modules/payments";

// Types
import type { VaccineBatch } from "@/modules/vaccine-batch";
import type { VaccinationFormData } from "../types/state.type";
import type { VaccinationDetail } from "../types/detail.type";
import { Loader2 } from "lucide-react";

interface Props {
  currentViewStatus: number;
  data: VaccinationDetail;
  formData: VaccinationFormData;
  canEdit: (step: number) => boolean;
  isVet: boolean;
  isPending: boolean;
  isStep1Valid: boolean;
  isStep2Valid: boolean;
  isStep3Valid: boolean;
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
  isStep1Valid,
  isStep2Valid,
  isStep3Valid,
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
    setSelectedVaccineBatchId,
    setResultData,
  } = useVaccinationStore();
  const paymentId = usePaymentStore((state) => state.paymentId);
  const paymentMethod = usePaymentStore((state) => state.paymentMethod);
  const isPaymentLoading = usePaymentStore((state) => state.isPaymentLoading);
  const setPaymentId = usePaymentStore((state) => state.setPaymentId);
  const setPaymentMethod = usePaymentStore((state) => state.setPaymentMethod);

  const isPaymentCompleted = Boolean(paymentId && paymentMethod);

  const renderCommonCards = () => (
    <>
      <PetInfoCard data={data} />
      <AppointmentInfoCard data={data} />
    </>
  );

  const renderStepProcessing = () => (
    <div className="space-y-6">
      {renderCommonCards()}
      <DiseaseChoiceCard
        selectedDiseaseId={formData.diseaseId}
        onSelect={setSelectedDiseaseId}
        disabled={!canEdit(1)}
      />
      <div className="flex justify-end gap-4">
        <Button variant="destructive" onClick={onShowReject}>
          Hủy
        </Button>
        <Button
          className="bg-primary text-white"
          onClick={onConfirmAppointment}
          disabled={isPending || !isStep1Valid || !canEdit(1)}
        >
          Xác nhận lịch
        </Button>
      </div>
    </div>
  );

  console.log("VetSelection value", formData.vetSelection);

  const renderStepCheckIn = () => (
    <div className="space-y-6">
      {renderCommonCards()}
      <VetSelection
        value={formData.vetSelection}
        onChange={setVetSelection}
        disabled={isPending}
        appointmentDate={data?.appointmentDate}
      />
      <HealthCheckCard
        data={formData.healthData}
        onChange={setHealthData}
        disabled={!canEdit(2)}
      />
      {currentViewStatus === data.appointment.appointmentStatus && (
        <div className="flex justify-end gap-2">
          <Button variant="destructive" onClick={onShowReject}>
            Từ chối
          </Button>
          <Button
            className="bg-primary text-white"
            onClick={onProceedToInjection}
            disabled={isPending || !isStep2Valid || !canEdit(2)}
          >
            Tiến hành
          </Button>
        </div>
      )}
    </div>
  );

  const renderStepInjection = () => (
    <div className="space-y-6">
      {renderCommonCards()}
      <VaccineInjectionTable
        diseaseId={formData.diseaseId!}
        onChange={(batch) =>
          setSelectedVaccineBatchId(batch?.vaccineBatchId ?? null)
        }
        canEdit={!canEdit(3)}
      />
      <ResultCard
        vaccineType={data.disease.name}
        values={formData.resultData}
        canEdit={!canEdit(3)}
        onChange={(field, value) =>
          setResultData((prev) => ({ ...prev, [field]: value }))
        }
        disabled={!isVet}
      />
      {currentViewStatus === data.appointment.appointmentStatus && (
        <div className="flex justify-end">
          <Button
            className="bg-primary text-white"
            onClick={onCompleteInjection}
            disabled={isPending || !isStep3Valid}
          >
            Hoàn thành
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
        onPaymentSuccess={(paymentId, method) => {
          setPaymentId(paymentId);
          setPaymentMethod(method);
        }}
        onExportInvoice={onExportInvoice}
      />
      {isPaymentCompleted && (
        <div className="flex justify-end">
          <Button
            className="bg-primary text-white"
            onClick={onCompleteVaccination}
            disabled={isPending}
          >
            {isPaymentLoading && (
              <Loader2 className="mr-2 animate-spin" size={16} />
            )}
            Hoàn thành
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

  switch (currentViewStatus) {
    case APPOINTMENT_STATUS.PROCESSING:
      return renderStepProcessing();
    case APPOINTMENT_STATUS.CHECK_IN:
      return renderStepCheckIn();
    case APPOINTMENT_STATUS.IN_PROGRESS:
      return renderStepInjection();
    case APPOINTMENT_STATUS.PAYMENT:
      return renderStepPayment();
    case APPOINTMENT_STATUS.PAID:
      return renderStepCompleted();
    default:
      return null;
  }
}
