import { useState } from "react";
import { format } from "date-fns";
import { PageBreadcrumb } from "@/components/shared";
import { useScheduleByVet } from "../hooks/useScheduleByVet";
import { useDateNavigation } from "../hooks/useDateNavigation";
import { useDateFormatting } from "../hooks/useDateFormatting";
import {
  WeeklyStatsCards,
  ScheduleHeader,
  WeeklyCalendar,
  StatusLegend,
  ScheduleLoadingSkeleton,
  ScheduleErrorState,
} from "../components";

// Types
type SlotStatus = "available" | "unavailable" | "booked" | "late";

// Constants
const timeSlots = [
  { id: 8, time: "08:00 - 09:00", label: "Ca 1" },
  { id: 9, time: "09:00 - 10:00", label: "Ca 2" },
  { id: 10, time: "10:00 - 11:00", label: "Ca 3" },
  { id: 11, time: "11:00 - 12:00", label: "Ca 4" },
  { id: 13, time: "13:00 - 14:00", label: "Ca 5" },
  { id: 14, time: "14:00 - 15:00", label: "Ca 6" },
  { id: 15, time: "15:00 - 16:00", label: "Ca 7" },
  { id: 16, time: "16:00 - 17:00", label: "Ca 8" },
];

const statusConfig = {
  available: {
    color: "bg-green-100 text-green-800 border-green-200",
    label: "Trống",
  },
  unavailable: {
    color: "bg-gray-100 text-gray-600 border-gray-200",
    label: "Không có lịch",
  },
  booked: {
    color: "bg-blue-100 text-blue-800 border-blue-200",
    label: "Đã đặt",
  },
  late: {
    color: "bg-orange-100 text-orange-800 border-orange-200",
    label: "Trễ hẹn",
  },
};

// Utility functions
const getDayName = (date: Date) => {
  const days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  return days[date.getDay()];
};

const isToday = (date: Date) => {
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

const isSameDay = (date1: Date, date2: Date) => {
  return date1.toDateString() === date2.toDateString();
};

const VetSchedulesPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"week" | "month">("week");

  // Custom hooks
  const { weekDays, handlePreviousPeriod, handleNextPeriod } =
    useDateNavigation();
  const { formatDateToDMY } = useDateFormatting();

  // Lấy lịch làm việc của bác sĩ hiện tại
  const {
    data: vetSchedules,
    isLoading: isLoadingVetSchedules,
    error: vetSchedulesError,
  } = useScheduleByVet();

  // Lọc và làm sạch dữ liệu vetSchedules
  const validVetSchedules =
    vetSchedules?.filter(
      (schedule) =>
        schedule &&
        schedule.scheduleDate &&
        typeof schedule.scheduleDate === "string" &&
        typeof schedule.slotNumber === "number" &&
        typeof schedule.status === "number",
    ) || [];

  // Tính toán thống kê từ dữ liệu thực
  const weeklyStats = {
    totalShifts: validVetSchedules.length,
    bookedAppointments: validVetSchedules.filter(
      (schedule) => schedule.status === 3, // Đã đặt
    ).length,
    availableSlots: validVetSchedules.filter(
      (schedule) => schedule.status === 1, // Trống
    ).length,
    lateAppointments: validVetSchedules.filter(
      (schedule) => schedule.status === 2, // Trễ hẹn
    ).length,
  };

  // Event handlers
  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
  };

  const getSlotStatus = (date: Date, slotId: number): SlotStatus => {
    if (!validVetSchedules || validVetSchedules.length === 0) {
      return "unavailable";
    }

    const dateString = format(date, "yyyy-MM-dd");

    const schedule = validVetSchedules.find((schedule) => {
      const scheduleDateString = schedule.scheduleDate.split("T")[0];
      return (
        scheduleDateString === dateString && schedule.slotNumber === slotId
      );
    });

    if (!schedule) {
      return "unavailable";
    }

    // Map status từ API sang SlotStatus theo mapping.utils.ts
    // 1: Trống (available), 2: Trễ hẹn (late), 3: Đã đặt (booked)
    switch (schedule.status) {
      case 1:
        return "available"; // Trống
      case 2:
        return "late"; // Trễ hẹn
      case 3:
        return "booked"; // Đã đặt
      default:
        return "unavailable"; // Không rõ
    }
  };

  // Hiển thị lỗi nếu có
  if (vetSchedulesError) {
    return <ScheduleErrorState />;
  }

  // Loading state
  if (isLoadingVetSchedules) {
    return <ScheduleLoadingSkeleton />;
  }

  return (
    <div className="container mx-auto space-y-6 p-6">
      <PageBreadcrumb items={["Trang chủ", "Lịch làm việc"]} />

      {/* Header đơn giản */}
      <ScheduleHeader viewMode={viewMode} onViewModeChange={setViewMode} />

      {/* Thống kê nhanh */}
      <WeeklyStatsCards stats={weeklyStats} />

      {/* Lịch tuần đơn giản */}
      <WeeklyCalendar
        weekDays={weekDays}
        timeSlots={timeSlots}
        statusConfig={statusConfig}
        selectedDate={selectedDate}
        formatDateToDMY={formatDateToDMY}
        getDayName={getDayName}
        isToday={isToday}
        isSameDay={isSameDay}
        getSlotStatus={getSlotStatus}
        onDayClick={handleDayClick}
        onPreviousPeriod={() => handlePreviousPeriod(viewMode)}
        onNextPeriod={() => handleNextPeriod(viewMode)}
      />

      {/* Legend đơn giản */}
      <StatusLegend statusConfig={statusConfig} />
    </div>
  );
};

export default VetSchedulesPage;
