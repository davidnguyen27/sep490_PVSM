import { Clock, Edit2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type SlotStatus = "available" | "unavailable" | "booked" | "completed";

interface VetScheduleWeekViewProps {
  weekDays: Date[];
  selectedDate: Date;
  onDayClick: (date: Date) => void;
  onSlotEdit: (date: Date, slotId: number) => void;
  getSlotStatus: (date: Date, slotId: number) => SlotStatus;
}

const timeSlots = [
  { id: 1, time: "08:00 - 10:00", label: "Sáng sớm" },
  { id: 2, time: "10:00 - 12:00", label: "Trưa" },
  { id: 3, time: "13:00 - 15:00", label: "Chiều sớm" },
  { id: 4, time: "15:00 - 17:00", label: "Chiều muộn" },
  { id: 5, time: "18:00 - 20:00", label: "Tối" },
];

const statusColorMap: Record<SlotStatus, string> = {
  available: "bg-emerald-100 text-emerald-800",
  unavailable: "bg-gray-100 text-gray-500",
  booked: "bg-blue-100 text-blue-800",
  completed: "bg-purple-100 text-purple-800",
};

const getDayName = (date: Date) => {
  const days = [
    "Chủ Nhật",
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
  ];
  return days[date.getDay()];
};

const isSameDay = (date1: Date, date2: Date) => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

export function VetScheduleWeekView({
  weekDays,
  selectedDate,
  onDayClick,
  onSlotEdit,
  getSlotStatus,
}: VetScheduleWeekViewProps) {
  return (
    <div className="mt-4 grid grid-cols-7 gap-4">
      {weekDays.map((day, index) => (
        <div
          key={index}
          className={`cursor-pointer rounded-lg border p-4 ${
            isSameDay(day, new Date())
              ? "border-blue-300 bg-blue-50"
              : isSameDay(day, selectedDate)
                ? "bg-gray-100"
                : ""
          }`}
          onClick={() => onDayClick(day)}
        >
          <div className="mb-2 text-center">
            <div className="font-medium">{getDayName(day)}</div>
            <div
              className={`text-lg font-bold ${
                isSameDay(day, new Date()) ? "text-blue-600" : ""
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
                  className={`rounded-md p-2 ${statusColorMap[status]} relative cursor-pointer transition-all duration-200 hover:shadow-md`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSlotEdit(day, slot.id);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      <span className="text-sm">{slot.time}</span>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button className="rounded-full p-1 hover:bg-gray-100">
                            <Edit2 size={14} />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Chỉnh sửa ca làm việc</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <div className="mt-1 text-xs">
                    {status === "available" && "Có thể nhận lịch hẹn"}
                    {status === "unavailable" && "Không thể nhận lịch hẹn"}
                    {status === "booked" && "Đã có lịch hẹn"}
                    {status === "completed" && "Đã hoàn thành"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
