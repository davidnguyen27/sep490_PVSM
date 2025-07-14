import { useState } from "react";
import { Button } from "@/components/ui";
import StepProgress from "../../vaccination-appointment/components/StepProgress";
import PetInfoCard from "../../vaccination-appointment/components/PetInfoCard";
import AppointmentInfoCard from "../../vaccination-appointment/components/AppointmentInfoCard";
import { useSearchParams } from "react-router-dom";
import { useUpdateStatus } from "../hooks/useUpdateStatus";
import { VetSelection } from "../../vaccination-appointment/components/VetSelection";
import VaccineInjectionTable from "../../vaccination-appointment/components/VaccineInjectionTable";
import { useAppointmentDetail } from "../hooks/useDetail";
import { PageBreadcumb, PageLoader } from "@/components/shared";
import { DiseaseChoiceCard } from "../../vaccination-appointment/components/DiseaseChoiceCard";
import { HealthCheckCard } from "../../vaccination-appointment/components/HealthCheckCard";

export default function DetailPage() {
  const [searchParams] = useSearchParams();
  const appointmentId = searchParams.get("appointmentId");

  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [selectedDiseaseId, setSelectedDiseaseId] = useState<number | null>(
    null,
  );

  const { data, isLoading, refetch } = useAppointmentDetail(
    Number(appointmentId),
  );
  const { mutate, isPending } = useUpdateStatus({
    onSuccess: () => {
      refetch();
      setActiveStep(null);
    },
  });

  const getStepFromStatus = (status: number) => {
    switch (status) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 3:
        return 3;
      case 4:
        return 4;
      case 5:
        return 5;
      default:
        return 1;
    }
  };

  if (!data) return null;
  const currentViewStatus = activeStep ?? data.appointment.appointmentStatus;

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-2">
        <h1 className="text-primary text-2xl font-bold">
          Theo dõi quá trình tiêm
        </h1>
        <PageBreadcumb items={["Lịch tiêm chủng", "Chi tiết"]} />
      </div>

      <StepProgress
        currentStep={getStepFromStatus(data.appointment.appointmentStatus)}
        onStepClick={(step) => {
          if (step <= data.appointment.appointmentStatus) {
            setActiveStep(step);
          }
        }}
      />

      {currentViewStatus === 1 && (
        <PageLoader loading={isLoading}>
          <PetInfoCard data={data} />
          <AppointmentInfoCard data={data} />
          <DiseaseChoiceCard
            selectedDiseaseId={selectedDiseaseId}
            onSelect={(id: number) => setSelectedDiseaseId(id)}
          />

          <div className="flex justify-end gap-4">
            <Button variant="destructive">Từ chối</Button>
            <Button
              variant="default"
              className="bg-primary text-white"
              onClick={() =>
                mutate({
                  appointmentId: data.appointment.appointmentId,
                  appointmentStatus: 2,
                  diseaseId: selectedDiseaseId ?? undefined,
                })
              }
              disabled={isPending || selectedDiseaseId === null}
            >
              Xác nhận lịch
            </Button>
          </div>
        </PageLoader>
      )}

      {currentViewStatus === 2 && (
        <>
          <PetInfoCard data={data} />
          <AppointmentInfoCard data={data} />
          <VetSelection />
          <HealthCheckCard />

          <div className="flex justify-end gap-2">
            <Button variant="destructive">Từ chối</Button>
            <Button
              variant="default"
              className="bg-primary text-white"
              onClick={() =>
                mutate({
                  appointmentId: data.appointment.appointmentId,
                  appointmentStatus: 3,
                  diseaseId: selectedDiseaseId ?? undefined,
                })
              }
              disabled={isPending}
            >
              Xác nhận
            </Button>
          </div>
        </>
      )}

      {currentViewStatus === 3 && (
        <>
          <PetInfoCard data={data} />
          <VaccineInjectionTable />

          <Button className="bg-primary text-white" disabled={isPending}>
            Tiếp tục
          </Button>
        </>
      )}

      {currentViewStatus === 4 && <></>}
    </div>
  );
}
