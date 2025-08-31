import { Button } from "@/components/ui";
import { useNavigate } from "react-router-dom";
import {
  PetInfoCard,
  AppointmentInfoCard,
  VetSelectionCard,
  GeneralHealthCheckCard,
  PaymentInfoCard,
  CompletedCard,
} from ".";
import { APPOINTMENT_STATUS } from "@/shared/constants/status.constants";
import type { ConditionFormData } from "../types/state.type";
import { useConditionStore } from "../store/useConditionStore";
import type { ConditionAppointments } from "../types/condition.type";
import { usePaymentStore } from "@/modules/payments";
import { FinalizedCard } from "@/components/shared";

interface Props {
  currentViewStatus: number;
  data: ConditionAppointments;
  formData: ConditionFormData;
  isPending: boolean;
  isCheckedIn: boolean;
  canEdit: (step: number) => boolean;
  isVet: boolean;
  onConfirmAppointment: () => void;
  onAssignVet: () => void;
  onInject: () => void;
  onShowReject: () => void;
  onCompleteCondition: () => void;
  onFinalizeCondition: () => void;
  onExportInvoice: () => void;
  onRefreshData?: () => void;
}

export function StepContent({
  currentViewStatus,
  data,
  formData,
  isPending,
  isCheckedIn,
  canEdit,
  isVet,
  onConfirmAppointment,
  onAssignVet,
  onInject,
  onShowReject,
  onCompleteCondition,
  onFinalizeCondition,
  onExportInvoice,
  onRefreshData,
}: Props) {
  const { setVetSelection } = useConditionStore();
  const navigate = useNavigate();

  const paymentMethod = usePaymentStore((state) => state.paymentMethod);
  const hasNewPendingPayment = usePaymentStore(
    (state) => state.hasNewPendingPayment,
  );
  const setPaymentId = usePaymentStore((state) => state.setPaymentId);
  const setPaymentMethod = usePaymentStore((state) => state.setPaymentMethod);
  const setHasNewPendingPayment = usePaymentStore(
    (state) => state.setHasNewPendingPayment,
  );
  const setHealthCheck = useConditionStore((state) => state.setHealthCheck);
  const setVitalSigns = useConditionStore((state) => state.setVitalSigns);

  const appointmentStatus = data.appointment.appointmentStatus;
  const paymentStatus = data?.payment?.paymentStatus;
  const savedPaymentMethod = data?.payment?.paymentMethod;
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
            Hủy
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

  const renderStepCheckIn = () => (
    <div className="space-y-6">
      {renderCommonInfo()}
      <VetSelectionCard
        appointmentDate={data?.appointmentDate}
        value={formData.vetSelection}
        onChange={setVetSelection}
        disabled={isPending || !isVet}
        canEdit={canEdit(APPOINTMENT_STATUS.CONFIRMED)}
      />
      {currentViewStatus === appointmentStatus && (
        <div className="flex justify-end gap-4">
          <Button
            key="next"
            className="bg-primary text-white"
            onClick={onAssignVet}
            disabled={isPending || !isCheckedIn}
          >
            Tiếp tục
          </Button>
        </div>
      )}
    </div>
  );

  const renderStepInject = () => (
    <div className="space-y-6">
      {renderCommonInfo()}

      <GeneralHealthCheckCard
        values={formData.healthCheck}
        vitalSigns={formData.vitalSigns}
        disabled={!isVet}
        canEdit={!canEdit(APPOINTMENT_STATUS.CHECKED_IN)}
        onChange={(section, field, value) => {
          if (section === "healthCheck") {
            setHealthCheck({ [field]: value });
          } else {
            setVitalSigns({ [field]: value });
          }
        }}
      />

      <div className="flex justify-end gap-4">
        <Button
          key="view-detail"
          variant="outline"
          className="border-primary text-primary"
          onClick={() => {
            const prefix = isVet
              ? "/vet/condition-appointments"
              : "/staff/condition-appointments";
            navigate(`${prefix}/pet-health-certificate`, { state: { data } });
          }}
        >
          Xem chi tiết
        </Button>
        {currentViewStatus === appointmentStatus && (
          <Button
            key="finish"
            className="bg-primary text-white"
            disabled={isPending || !isVet}
            onClick={onInject}
          >
            Tiếp tục
          </Button>
        )}
      </div>
    </div>
  );

  const renderStepPayment = () => (
    <div className="space-y-6">
      {renderCommonInfo()}
      {!isVet ? (
        <PaymentInfoCard
          ownerName={data.appointment.customerResponseDTO.fullName}
          petName={data.appointment.petResponseDTO.name}
          memberRank=""
          discountPercent={0}
          healthConditionCode={data.healthCondition?.conditionCode}
          unitPrice={data.healthCondition?.price}
          quantity={1}
          appointmentDetailId={data.appointmentDetailId}
          customerId={data.appointment.customerResponseDTO.customerId}
          healthConditionId={data.healthConditionId}
          invoiceData={data}
          appointmentId={data.appointment.appointmentId || 0}
          appointmentAddress={data.appointment.address}
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
      {!isVet &&
        ((paymentStatus === 1 && currentPaymentMethod === "Cash") ||
          (hasNewPendingPayment && currentPaymentMethod === "Cash")) && (
          <div className="flex justify-end">
            <Button
              className="bg-primary text-white"
              onClick={() => {
                onCompleteCondition();
                setHasNewPendingPayment(false); // Reset flag after confirmation
                // Refresh data to update payment status
                setTimeout(() => {
                  onRefreshData?.();
                }, 500);
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
          onClick={onFinalizeCondition}
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
