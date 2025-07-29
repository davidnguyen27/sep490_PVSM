import {
  Stethoscope,
  CalendarDays,
  Clock,
  UserRound,
  ShieldCheck,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useVetScheduleByDate } from "@/modules/vet-schedules";
import { formatData } from "@/shared/utils/format.utils";
import { Utils } from "@/shared/utils/utils.utils";
import { mappingUtils } from "@/shared/utils/mapping.utils";
import { cn } from "@/lib/utils";

interface Props {
  appointmentDate: string;
  value: { vetId: number | null };
  onChange: (value: { vetId: number | null }) => void;
  disabled?: boolean;
  canEdit?: boolean;
  readOnly?: boolean;
}

export function VetSelection({
  value,
  onChange,
  disabled,
  appointmentDate,
  canEdit,
}: Props) {
  const slot = Utils.extractSlotFromAppointmentDate(appointmentDate);
  const dateOnly = appointmentDate.split("T")[0];

  const { data: schedulesData, isFetching } = useVetScheduleByDate(
    dateOnly,
    slot ?? 0,
  );

  const vetSchedules = Array.isArray(schedulesData)
    ? schedulesData.map((item) => item?.data).filter(Boolean)
    : [];

  const filteredSchedules = vetSchedules.filter((schedule) => {
    const scheduleDateOnly = schedule.scheduleDate.split("T")[0];
    return scheduleDateOnly === dateOnly && schedule.slotNumber === slot;
  });

  const availableVets = Array.from(
    new Map(
      filteredSchedules.map((schedule) => [
        schedule.vetResponse.vetId,
        schedule.vetResponse,
      ]),
    ).values(),
  );

  const selectedVet = availableVets.find((v) => v.vetId === value.vetId);

  return (
    <Card className="bg-linen space-y-4 rounded-none p-6">
      <div className="flex items-center gap-2">
        <Stethoscope className="text-primary" size={16} />
        <h2 className="font-nunito-700 text-primary flex items-center gap-2 text-lg underline">
          Thông tin bác sĩ phụ trách
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <CalendarDays className="text-dark" size={15} />
          <div>
            <Label className="text-dark font-nunito-600 text-sm">
              Ngày tiêm
            </Label>
            <p className="text-primary font-nunito text-sm">
              {formatData.formatDate(appointmentDate)}
            </p>
          </div>
        </div>

        {slot !== null && (
          <div className="flex items-center gap-3">
            <Clock className="text-dark" size={15} />
            <div>
              <Label className="text-dark font-nunito-600 text-sm">
                Ca trực
              </Label>
              <p className="text-primary font-nunito text-sm">
                {mappingUtils.mapSlotToTime(slot)}
              </p>
            </div>
          </div>
        )}
      </div>

      {slot !== null && (
        <div className="space-y-2">
          <Label className="text-dark font-nunito-600 text-sm">
            Chọn bác sĩ phụ trách
          </Label>

          {isFetching ? (
            <Skeleton className="h-10 w-full rounded-md" />
          ) : canEdit ? (
            <Select
              value={value.vetId?.toString() ?? ""}
              onValueChange={(val) => onChange({ vetId: Number(val) })}
              disabled={availableVets.length === 0 || disabled}
            >
              <SelectTrigger className="h-12 rounded-md border px-4">
                <SelectValue placeholder="Chọn bác sĩ" />
              </SelectTrigger>
              <SelectContent>
                {availableVets.map((doctor) => (
                  <SelectItem
                    key={doctor.vetId}
                    value={doctor.vetId.toString()}
                    className="flex items-center gap-2 py-2"
                  >
                    <UserRound size={16} className="text-muted-foreground" />
                    <div>
                      <div className="font-nunito-500 text-dark text-sm">
                        {doctor.name}
                      </div>
                      <div className="text-muted-foreground font-nunito text-xs">
                        Mã: {doctor.vetCode}
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <div className="bg-muted flex items-center gap-3 rounded-md border px-4 py-3 text-sm">
              <UserRound size={18} className="text-muted-foreground" />
              <div>
                {selectedVet ? (
                  <>
                    <div className="text-foreground font-nunito-500">
                      {selectedVet.name}
                    </div>
                    <div className="text-muted-foreground font-nunito text-xs">
                      Mã: {selectedVet.vetCode}
                    </div>
                  </>
                ) : (
                  <span>Chưa chọn bác sĩ</span>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {slot !== null && filteredSchedules.length > 0 && (
        <div className="space-y-2">
          <Label className="text-dark font-nunito-600 text-sm">
            Lịch làm việc bác sĩ
          </Label>
          <div className="grid gap-4 md:grid-cols-2">
            {filteredSchedules.map((schedule) => {
              const vet = schedule.vetResponse;
              return (
                <div
                  key={schedule.vetScheduleId}
                  className={cn(
                    "bg-muted hover:border-primary cursor-pointer rounded-lg border p-4 shadow-sm transition-all",
                    value.vetId === vet.vetId &&
                      "border-primary ring-primary ring-1",
                  )}
                  onClick={() => {
                    if (!canEdit) return;
                    onChange({ vetId: vet.vetId });
                  }}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <div className="text-primary flex items-center gap-2 font-medium">
                      <UserRound size={16} />
                      {vet.name}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {mappingUtils.mapStatus(schedule.status)}
                    </Badge>
                  </div>
                  <ul className="text-muted-foreground space-y-1 pl-1 text-sm">
                    <li className="font-nunito flex items-center">
                      <CalendarDays size={14} className="mr-1 inline" />
                      Ngày: {formatData.formatDate(schedule.scheduleDate)}
                    </li>
                    <li className="font-nunito flex items-center">
                      <Clock size={14} className="mr-1 inline" />
                      Ca trực: {mappingUtils.mapSlotToTime(schedule.slotNumber)}
                    </li>
                    <li className="font-nunito flex items-center">
                      <ShieldCheck size={14} className="mr-1 inline" />
                      Mã bác sĩ: {vet.vetCode}
                    </li>
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Card>
  );
}
