import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { VetScheduleWeekView } from "./VetScheduleWeekView";
import { VetScheduleMonthView } from "./VetScheduleMonthView";
import { VetScheduleForm } from "./VetScheduleForm";

interface ScheduleFormValues {
  date: string;
  timeSlot: string;
  status: "available" | "unavailable";
}

type SlotStatus = "available" | "unavailable" | "booked"; // Adjust as needed

interface VetScheduleCalendarProps {
  currentDate: Date;
  selectedDate: Date;
  viewMode: "week" | "month";
  isAddingSchedule: boolean;
  isEditingSchedule: boolean;
  selectedSlot: number | null;
  weekDays: Date[];
  onPreviousPeriod: () => void;
  onNextPeriod: () => void;
  onAddSchedule: (open: boolean) => void;
  onEditSchedule: (open: boolean) => void;
  onDayClick: (date: Date) => void;
  onSlotEdit: (date: Date, slotId: number) => void;
  onSubmitSchedule: (values: ScheduleFormValues) => void;
  formatDateToDMY: (date: Date) => string;
  getMonthName: (date: Date) => string;
  getSlotStatus: (date: Date, slotId: number) => SlotStatus;
}

export function VetScheduleCalendar({
  currentDate,
  selectedDate,
  viewMode,
  isAddingSchedule,
  isEditingSchedule,
  selectedSlot,
  weekDays,
  onPreviousPeriod,
  onNextPeriod,
  onAddSchedule,
  onEditSchedule,
  onDayClick,
  onSlotEdit,
  onSubmitSchedule,
  formatDateToDMY,
  getMonthName,
  getSlotStatus,
}: VetScheduleCalendarProps) {
  return (
    <div className="mb-6 rounded-lg bg-white p-6 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={onPreviousPeriod}>
            <ChevronLeft size={18} />
          </Button>

          <h2 className="text-xl font-semibold">
            {viewMode === "week"
              ? `${formatDateToDMY(weekDays[0])} - ${formatDateToDMY(weekDays[6])}`
              : getMonthName(currentDate)}
          </h2>

          <Button variant="outline" size="icon" onClick={onNextPeriod}>
            <ChevronRight size={18} />
          </Button>
        </div>

        <Dialog open={isAddingSchedule} onOpenChange={onAddSchedule}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus size={16} /> Thêm lịch làm việc
            </Button>
          </DialogTrigger>
          <VetScheduleForm
            mode="add"
            selectedDate={selectedDate}
            selectedSlot={selectedSlot}
            onSubmit={onSubmitSchedule}
            onClose={() => onAddSchedule(false)}
          />
        </Dialog>

        <Dialog open={isEditingSchedule} onOpenChange={onEditSchedule}>
          <VetScheduleForm
            mode="edit"
            selectedDate={selectedDate}
            selectedSlot={selectedSlot}
            onSubmit={onSubmitSchedule}
            onClose={() => onEditSchedule(false)}
          />
        </Dialog>
      </div>

      {viewMode === "week" ? (
        <VetScheduleWeekView
          weekDays={weekDays}
          selectedDate={selectedDate}
          onDayClick={onDayClick}
          onSlotEdit={onSlotEdit}
          getSlotStatus={getSlotStatus}
        />
      ) : (
        <VetScheduleMonthView />
      )}
    </div>
  );
}
