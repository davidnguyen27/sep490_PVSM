import { TimeSlotCard } from "./TimeSlotCard";

interface TimeSlot {
  id: number;
  time: string;
  label: string;
}

interface StatusConfig {
  color: string;
  label: string;
}

interface DayCardProps {
  day: Date;
  timeSlots: TimeSlot[];
  statusConfig: Record<string, StatusConfig>;
  isToday: boolean;
  isSelected: boolean;
  getDayName: (date: Date) => string;
  getSlotStatus: (
    date: Date,
    slotId: number,
  ) => "available" | "unavailable" | "booked" | "late";
  onDayClick: (date: Date) => void;
  onSlotEdit?: (date: Date, slotId: number) => void;
  onSlotDelete?: (date: Date, slotId: number) => void;
}

export const DayCard = ({
  day,
  timeSlots,
  statusConfig,
  isToday,
  isSelected,
  getDayName,
  getSlotStatus,
  onDayClick,
  onSlotEdit,
  onSlotDelete,
}: DayCardProps) => {
  return (
    <div
      className={`rounded-lg border p-3 ${
        isToday ? "border-blue-200 bg-blue-50" : "border-gray-200"
      } ${isSelected ? "ring-2 ring-blue-500" : ""}`}
      onClick={() => onDayClick(day)}
    >
      <div className="mb-3 text-center">
        <div className="font-nunito-600 text-sm text-gray-600">
          {getDayName(day)}
        </div>
        <div
          className={`font-nunito-700 text-lg ${
            isToday ? "text-blue-500" : "text-gray-900"
          }`}
        >
          {day.getDate()}
        </div>
      </div>

      <div className="space-y-2">
        {timeSlots.map((slot) => {
          const status = getSlotStatus(day, slot.id);

          return (
            <div
              key={slot.id}
              onClick={(e) => {
                e.stopPropagation();
                onSlotEdit?.(day, slot.id);
              }}
            >
              <TimeSlotCard
                slot={slot}
                status={status}
                statusConfig={statusConfig}
                onClick={() => {}}
                showActions={!!onSlotEdit || !!onSlotDelete}
                onEdit={
                  onSlotEdit
                    ? () => {
                        onSlotEdit(day, slot.id);
                      }
                    : undefined
                }
                onDelete={
                  onSlotDelete
                    ? () => {
                        onSlotDelete(day, slot.id);
                      }
                    : undefined
                }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
