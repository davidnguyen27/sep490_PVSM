import { Button } from "@/components/ui";
import { PetInfoCard } from "./PetInfoCard";
import { AppointmentInfoCard } from "./AppointmentInfoCard";
import { VetSelectionCard } from "./VetSelectionCard";
import { MicrochipSelectionCard } from "./MicrochipSelectionCard";
import { ResultCard } from "./ResultCard";
import { APPOINTMENT_STATUS } from "../utils/status.utils";
import type { MicrochipFormData } from "../types/state.type";
import type { MicrochipDetail } from "../types/detail.type";
import { useMicrochipStore } from "../store/useMicrochipStore";
import type { JSX } from "react";
import { PaymentInfoCard } from "./PaymentInfoCard";
import { usePaymentStore } from "@/modules/payments";
import { CompletedCard } from "./CompletedCard";

interface Props {
  currentViewStatus: number;
  data: MicrochipDetail;
  formData: MicrochipFormData;
  isPending: boolean;
  isStep2Valid: boolean;
  isStep3Valid: boolean;
  canEdit: (step: number) => boolean;
  isVet: boolean;
  onConfirmAppointment: () => void;
  onAssignVet: () => void;
  onInjectMicrochip: () => void;
  onShowReject: () => void;
  onCompleteMicrochip: () => void;
  onFinalizeMicrochip: () => void;
  onExportInvoice: () => void;
}

export function StepContent({
  currentViewStatus,
  data,
  formData,
  isPending,
  isStep2Valid,
  isStep3Valid,
  canEdit,
  isVet,
  onConfirmAppointment,
  onAssignVet,
  onInjectMicrochip,
  onShowReject,
  onCompleteMicrochip,
  onFinalizeMicrochip,
  onExportInvoice,
}: Props) {
  const { setVetSelection, setFormData, setResult } = useMicrochipStore();

  const paymentId = usePaymentStore((state) => state.paymentId);
  const paymentMethod = usePaymentStore((state) => state.paymentMethod);
  // const isPaymentLoading = usePaymentStore((state) => state.isPaymentLoading);
  const setPaymentId = usePaymentStore((state) => state.setPaymentId);
  const setPaymentMethod = usePaymentStore((state) => state.setPaymentMethod);

  const isPaymentCompleted = Boolean(paymentId && paymentMethod);

  const renderCommonInfo = () => (
    <>
      <PetInfoCard data={data} />
      <AppointmentInfoCard data={data} />
    </>
  );

  const renderActionButtons = (actions: JSX.Element[]) => (
    <div className="flex justify-end gap-2">{actions}</div>
  );

  const renderStepCheckIn = () => (
    <div className="space-y-6">
      {renderCommonInfo()}
      {renderActionButtons([
        <Button key="reject" variant="destructive" onClick={onShowReject}>
          Hủy
        </Button>,
        <Button
          key="confirm"
          className="bg-primary text-white"
          onClick={onConfirmAppointment}
          disabled={isPending}
        >
          Xác nhận lịch
        </Button>,
      ])}
    </div>
  );

  const renderStepAssignVet = () => (
    <div className="space-y-6">
      {renderCommonInfo()}
      <VetSelectionCard
        appointmentDate={data.microchip.appointmentDate}
        value={formData.vetSelection}
        onChange={setVetSelection}
        disabled={isPending || !isVet}
        canEdit={!canEdit(APPOINTMENT_STATUS.CHECK_IN)}
      />
      {renderActionButtons([
        <Button key="reject" variant="destructive" onClick={onShowReject}>
          Từ chối
        </Button>,
        <Button
          key="next"
          className="bg-primary text-white"
          onClick={onAssignVet}
          disabled={isPending || !isStep2Valid}
        >
          Tiến hành
        </Button>,
      ])}
    </div>
  );

  const renderStepInject = () => (
    <div className="space-y-6">
      {renderCommonInfo()}
      <MicrochipSelectionCard
        selectedId={formData.microchipItemId}
        onChange={(id) => setFormData({ microchipItemId: id })}
        disabled={!isVet}
      />
      <ResultCard
        values={formData.result}
        onChange={(field, value) => setResult({ [field]: value })}
        readOnly={!isVet}
      />
      {renderActionButtons([
        <Button
          key="finish"
          className="bg-primary text-white"
          disabled={isPending || !isStep3Valid}
          onClick={onInjectMicrochip}
        >
          Hoàn thành
        </Button>,
      ])}
    </div>
  );

  const renderStepPayment = () => (
    <div className="space-y-6">
      {renderCommonInfo()}
      <PaymentInfoCard
        ownerName={data.microchip.appointment.customerResponseDTO.fullName}
        petName={data.microchip.appointment.petResponseDTO.name}
        memberRank=""
        discountPercent={0}
        productName={data.microchip.microchipItem.name}
        unitPrice={data.microchip.microchipItem.microchipResponse.price}
        quantity={1}
        appointmentDetailId={data.microchip.appointmentDetailId}
        customerId={data.microchip.appointment.customerResponseDTO.customerId}
        microchipItemId={data.microchip.microchipItemId}
        onPaymentSuccess={(paymentId, method) => {
          setPaymentId(paymentId);
          setPaymentMethod(method);
        }}
        onExportInvoice={onExportInvoice}
      />
      {isPaymentCompleted &&
        renderActionButtons([
          <Button
            className="bg-primary text-white"
            disabled={isPending}
            onClick={onCompleteMicrochip}
          >
            Tiếp tục
          </Button>,
        ])}
    </div>
  );

  const renderStepCompleted = () => (
    <div className="space-y-6">
      <CompletedCard data={data} onExportInvoice={onExportInvoice} />

      <div className="flex justify-end">
        <Button
          className="bg-primary text-white"
          disabled={isPending}
          onClick={onFinalizeMicrochip}
        >
          Hoàn thành
        </Button>
      </div>
    </div>
  );

  switch (currentViewStatus) {
    case APPOINTMENT_STATUS.PROCESSING:
      return renderStepCheckIn();
    case APPOINTMENT_STATUS.CHECK_IN:
      return renderStepAssignVet();
    case APPOINTMENT_STATUS.IN_PROGRESS:
      return renderStepInject();
    case APPOINTMENT_STATUS.PAYMENT:
      return renderStepPayment();
    case APPOINTMENT_STATUS.PAID:
      return renderStepCompleted();
    default:
      return null;
  }
}
