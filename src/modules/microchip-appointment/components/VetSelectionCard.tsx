import { Stethoscope, CalendarDays, Clock, UserRound } from "lucide-react";
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
import {
  extractSlotFromAppointmentDate,
  mapStatus,
} from "../utils/map-slot.utils";
import { useEffect } from "react";

interface Props {
  appointmentDate: string;
  value: { vetId: number | null };
  onChange: (value: { vetId: number | null }) => void;
  disabled?: boolean;
  canEdit?: boolean;
  readOnly?: boolean;
}

export function VetSelectionCard({
  value,
  onChange,
  disabled,
  appointmentDate,
  canEdit,
}: Props) {
  const slot = extractSlotFromAppointmentDate(appointmentDate);
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

  useEffect(() => {
    if (value.vetId === null && availableVets.length > 0) {
      onChange({ vetId: availableVets[0].vetId });
    }
  }, [availableVets, value.vetId, onChange]);

  return (
    <Card className="bg-linen space-y-4 rounded-none p-6">
      <h2 className="text-primary font-nunito-700 mb-4 flex items-center gap-2 text-lg">
        <Stethoscope size={20} /> Thông tin bác sĩ phụ trách
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <CalendarDays className="text-primary" size={18} />
          <div>
            <Label className="font-nunito-700 text-dark">Ngày tiêm</Label>
            <p className="text-primary font-nunito text-sm">
              {formatData.formatDate(appointmentDate)}
            </p>
          </div>
        </div>

        {slot !== null && (
          <div className="flex items-center gap-2">
            <Clock className="text-primary" size={18} />
            <div>
              <Label className="font-nunito-700 text-dark">Ca trực</Label>
              <p className="text-primary font-nunito text-sm">{slot}</p>
            </div>
          </div>
        )}
      </div>

      {/* Select bác sĩ */}
      {slot !== null && (
        <div className="mt-6 space-y-2">
          <Label className="font-nunito-700">Chọn bác sĩ phụ trách</Label>
          {isFetching ? (
            <Skeleton className="h-10 w-full rounded-md" />
          ) : canEdit ? (
            <Select
              value={value.vetId?.toString() ?? ""}
              onValueChange={(val) => onChange({ vetId: Number(val) })}
              disabled={availableVets.length === 0 || disabled}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn bác sĩ" />
              </SelectTrigger>
              <SelectContent>
                {availableVets.map((doctor) => (
                  <SelectItem
                    key={doctor.vetId}
                    value={doctor.vetId.toString()}
                  >
                    👨‍⚕️ {doctor.name} — {doctor.vetCode}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <div className="bg-muted text-muted-foreground rounded-md border px-4 py-2 text-sm">
              {availableVets.find((v) => v.vetId === value.vetId)
                ? `👨‍⚕️ ${
                    availableVets.find((v) => v.vetId === value.vetId)?.name
                  } — ${
                    availableVets.find((v) => v.vetId === value.vetId)?.vetCode
                  }`
                : "Không có bác sĩ được chọn"}
            </div>
          )}
        </div>
      )}

      {/* Lịch bác sĩ */}
      {slot !== null && filteredSchedules.length > 0 && (
        <div className="mt-6 space-y-2">
          <Label className="font-nunito-700">Lịch làm việc bác sĩ</Label>
          <div className="grid gap-4 md:grid-cols-2">
            {filteredSchedules.map((schedule) => {
              const vet = schedule.vetResponse;
              return (
                <div
                  key={schedule.vetScheduleId}
                  className="hover:border-primary/60 rounded-xl border border-gray-200 bg-gray-50 p-4 shadow-sm transition-all"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <div className="text-primary flex items-center gap-2 font-semibold">
                      <UserRound size={16} />
                      {vet.name}
                    </div>
                    <Badge className="text-xs" variant="outline">
                      {mapStatus(schedule.status)}
                    </Badge>
                  </div>
                  <ul className="text-muted-foreground font-nunito space-y-1 text-sm">
                    <li>
                      📆 Ngày: {formatData.formatDate(schedule.scheduleDate)}
                    </li>
                    <li>⏱️ Ca trực: {schedule.slotNumber}</li>
                    <li>🆔 Mã bác sĩ: {vet.vetCode}</li>
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
