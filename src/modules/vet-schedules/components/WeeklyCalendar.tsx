import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui";
import { DayCard } from "./DayCard";

interface TimeSlot {
  id: number;
  time: string;
  label: string;
}

interface StatusConfig {
  color: string;
  label: string;
}

interface WeeklyCalendarProps {
  weekDays: Date[];
  timeSlots: TimeSlot[];
  statusConfig: Record<string, StatusConfig>;
  selectedDate: Date;
  formatDateToDMY: (date: Date) => string;
  getDayName: (date: Date) => string;
  isToday: (date: Date) => boolean;
  isSameDay: (date1: Date, date2: Date) => boolean;
  getSlotStatus: (
    date: Date,
    slotId: number,
  ) => "available" | "unavailable" | "booked" | "late";
  onDayClick: (date: Date) => void;
  onSlotEdit?: (date: Date, slotId: number) => void;
  onSlotDelete?: (date: Date, slotId: number) => void;
  onPreviousPeriod: () => void;
  onNextPeriod: () => void;
}

export const WeeklyCalendar = ({
  weekDays,
  timeSlots,
  statusConfig,
  selectedDate,
  formatDateToDMY,
  getDayName,
  isToday,
  isSameDay,
  getSlotStatus,
  onDayClick,
  onSlotEdit,
  onSlotDelete,
  onPreviousPeriod,
  onNextPeriod,
}: WeeklyCalendarProps) => {
  return (
    <Card className="py-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">
            {formatDateToDMY(weekDays[0])} - {formatDateToDMY(weekDays[6])}
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onPreviousPeriod}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={onNextPeriod}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-7 gap-3">
          {weekDays.map((day, dayIndex) => (
            <DayCard
              key={dayIndex}
              day={day}
              timeSlots={timeSlots}
              statusConfig={statusConfig}
              isToday={isToday(day)}
              isSelected={isSameDay(day, selectedDate)}
              getDayName={getDayName}
              getSlotStatus={getSlotStatus}
              onDayClick={onDayClick}
              onSlotEdit={onSlotEdit}
              onSlotDelete={onSlotDelete}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
