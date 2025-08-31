import { Button } from "@/components/ui";
import { FinalizedCard } from "@/components/shared";
import {
  PetInfoCard,
  AppointmentInfoCard,
  VetSelectionCard,
  MicrochipSelectionCard,
  ResultCard,
  PaymentInfoCard,
  CompletedCard,
} from ".";

import type { MicrochipFormData } from "../types/state.type";
import type { MicrochipDetail } from "../types/detail.type";

import { useMicrochipStore } from "../store/useMicrochipStore";
import { usePaymentStore } from "@/modules/payments";

import { APPOINTMENT_STATUS } from "@/shared/constants/status.constants";

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
  onRefreshData?: () => void;
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
  onRefreshData,
}: Props) {
  const { setVetSelection, setFormData, setResult } = useMicrochipStore();

  const paymentMethod = usePaymentStore((state) => state.paymentMethod);
  const hasNewPendingPayment = usePaymentStore(
    (state) => state.hasNewPendingPayment,
  );
  const setPaymentId = usePaymentStore((state) => state.setPaymentId);
  const setPaymentMethod = usePaymentStore((state) => state.setPaymentMethod);
  const setHasNewPendingPayment = usePaymentStore(
    (state) => state.setHasNewPendingPayment,
  );

  const appointmentStatus = data.microchip.appointmentStatus;
  const paymentStatus = data?.microchip?.payment?.paymentStatus;

  // Lấy paymentMethod từ payment data nếu có, otherwise từ store
  const savedPaymentMethod = data?.microchip?.payment?.paymentMethod;
  const currentPaymentMethod =
    savedPaymentMethod === "Cash" ||
    savedPaymentMethod === "CASH" ||
    savedPaymentMethod === "1"
      ? "Cash"
      : savedPaymentMethod === "BankTransfer" ||
          savedPaymentMethod === "BANK_TRANSFER" ||
          savedPaymentMethod === "2"
        ? "BankTransfer"
        : paymentMethod;

  const renderCommonInfo = () => (
    <>
      <PetInfoCard data={data} />
      <AppointmentInfoCard data={data} />
    </>
  );

  const renderStepConfirm = () => (
    <div className="space-y-6">
      {renderCommonInfo()}
      {currentViewStatus === appointmentStatus && (
        <div className="flex justify-end gap-4">
          <Button key="reject" variant="destructive" onClick={onShowReject}>
            Từ chối
          </Button>
          <Button
            key="confirm"
            className="bg-primary text-white"
            onClick={onConfirmAppointment}
            disabled={isPending || !canEdit(APPOINTMENT_STATUS.PROCESSING)}
          >
            Xác nhận lịch
          </Button>
        </div>
      )}
    </div>
  );

  const renderStepCheckIn = () => {
    // If vet is already assigned, use it; otherwise use form data
    const vetSelectionValue = data.microchip.vet
      ? { vetId: data.microchip.vet.vetId }
      : formData.vetSelection;

    return (
      <div className="space-y-6">
        {renderCommonInfo()}

        <VetSelectionCard
          value={vetSelectionValue}
          onChange={setVetSelection}
          disabled={isPending || !canEdit(APPOINTMENT_STATUS.CONFIRMED)}
          appointmentDate={data?.microchip.appointmentDate}
          canEdit={canEdit(APPOINTMENT_STATUS.CONFIRMED)}
          assignedVet={
            data.microchip.vet
              ? {
                  vetId: data.microchip.vet.vetId,
                  vetCode: data.microchip.vet.vetCode,
                  name: data.microchip.vet.name,
                }
              : undefined
          }
        />
        {currentViewStatus === appointmentStatus && (
          <div className="flex justify-end">
            <Button key="reject" variant="destructive" onClick={onShowReject}>
              Hủy lịch hẹn
            </Button>
            <Button
              className="bg-primary text-white"
              onClick={onAssignVet}
              disabled={
                isPending ||
                !isStep2Valid ||
                !canEdit(APPOINTMENT_STATUS.CONFIRMED)
              }
            >
              Tiếp tục
            </Button>
          </div>
        )}
      </div>
    );
  };

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
      {currentViewStatus === appointmentStatus && (
        <div className="flex justify-end">
          <Button
            key="finish"
            className="bg-primary text-white"
            disabled={isPending || !isStep3Valid}
            onClick={onInjectMicrochip}
          >
            Tiếp tục
          </Button>
        </div>
      )}
    </div>
  );

  const renderStepPayment = () => (
    <div className="space-y-6">
      {renderCommonInfo()}
      {!isVet ? (
        <PaymentInfoCard
          ownerName={data.microchip.appointment?.customerResponseDTO?.fullName}
          petName={data.microchip.appointment?.petResponseDTO?.name}
          memberRank=""
          discountPercent={0}
          productName={data.microchip?.microchipItem?.name}
          unitPrice={data.microchip?.microchipItem?.microchipResponse?.price}
          quantity={1}
          appointmentDetailId={data.microchip?.appointmentDetailId}
          customerId={
            data.microchip.appointment?.customerResponseDTO?.customerId
          }
          microchipItemId={formData.microchipItemId!}
          invoiceData={data}
          appointmentId={data.microchip.appointment?.appointmentId || 0}
          appointmentAddress={data.microchip.appointment?.address}
          onPaymentSuccess={(paymentId, method) => {
            setPaymentId(paymentId);
            setPaymentMethod(method);
          }}
          onExportInvoice={onExportInvoice}
          onRefreshData={onRefreshData}
        />
      ) : (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
          <div className="text-center text-gray-600">
            <p className="text-lg font-medium">Bước thanh toán</p>
            <p className="mt-2 text-sm">
              Bạn không có quyền thực hiện thanh toán.
            </p>
          </div>
        </div>
      )}
      {/* Hiển thị button Xác nhận thanh toán khi payment method là Cash */}
      {!isVet &&
        ((paymentStatus === 1 && currentPaymentMethod === "Cash") ||
          (hasNewPendingPayment && currentPaymentMethod === "Cash")) && (
          <div className="flex justify-end">
            <Button
              className="bg-primary text-white"
              onClick={() => {
                onCompleteMicrochip();
                setHasNewPendingPayment(false); // Reset flag after confirmation
              }}
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
          onClick={onFinalizeMicrochip}
        >
          Hoàn thành
        </Button>
      </div>
    </div>
  );

  const renderFinally = () => (
    <div className="space-y-6">
      {renderCommonInfo()}
      <FinalizedCard />
    </div>
  );

  switch (currentViewStatus) {
    case APPOINTMENT_STATUS.PROCESSING:
      return renderStepConfirm();
    case APPOINTMENT_STATUS.CONFIRMED:
      return renderStepCheckIn();
    case APPOINTMENT_STATUS.CHECKED_IN:
      return renderStepInject();
    case APPOINTMENT_STATUS.PROCESSED:
      return renderStepPayment();
    case APPOINTMENT_STATUS.PAID:
      return renderStepCompleted();
    default:
      return renderFinally();
  }
}
