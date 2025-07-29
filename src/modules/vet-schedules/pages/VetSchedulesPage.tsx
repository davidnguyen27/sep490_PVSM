import { useState } from "react";
import { PageBreadcrumb } from "@/components/shared";
import { useScheduleByVet } from "../hooks/useScheduleByVet";
import { useDateNavigation } from "../hooks/useDateNavigation";
import { useScheduleModal } from "../hooks/useScheduleModal";
import { useDateFormatting } from "../hooks/useDateFormatting";

import {
  VetScheduleHeader,
  VetScheduleCalendar,
  VetScheduleStats,
  VetScheduleStatusLegend,
  VetScheduleUpcoming,
} from "../components";

type SlotStatus = "available" | "unavailable" | "booked" | "completed";

interface ScheduleFormValues {
  date: string;
  timeSlot: string;
  status: "available" | "unavailable";
}

const VetSchedulesPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"week" | "month">("week");

  // Custom hooks
  const { currentDate, weekDays, handlePreviousPeriod, handleNextPeriod } =
    useDateNavigation();
  const {
    isAddingSchedule,
    isEditingSchedule,
    selectedSlot,
    openAddModal,
    closeAddModal,
    openEditModal,
    closeEditModal,
  } = useScheduleModal();
  const { formatDateToDMY, getMonthName } = useDateFormatting();

  // Lấy lịch làm việc của bác sĩ hiện tại
  const {
    data: vetSchedules,
    isLoading: isLoadingVetSchedules,
    error: vetSchedulesError,
  } = useScheduleByVet();

  // Debug logging
  console.log("=== VetSchedulesPage Debug ===");
  console.log("vetSchedules data:", vetSchedules);
  console.log("isLoadingVetSchedules:", isLoadingVetSchedules);
  console.log("vetSchedulesError:", vetSchedulesError);
  console.log("vetSchedules length:", vetSchedules?.length);

  // Kiểm tra cấu trúc dữ liệu chi tiết
  if (vetSchedules && vetSchedules.length > 0) {
    console.log("First schedule item:", vetSchedules[0]);
    console.log(
      "Schedule dates:",
      vetSchedules.map((s) => s?.scheduleDate),
    );
    console.log(
      "Schedule sample properties:",
      Object.keys(vetSchedules[0] || {}),
    );

    // Kiểm tra các schedule không hợp lệ
    const invalidSchedules = vetSchedules.filter((s) => !s || !s.scheduleDate);
    if (invalidSchedules.length > 0) {
      console.warn("Found invalid schedules:", invalidSchedules);
    }

    // Log chi tiết schedule đầu tiên
    if (vetSchedules[0]) {
      console.log("First schedule detailed:", {
        scheduleDate: vetSchedules[0].scheduleDate,
        slotNumber: vetSchedules[0].slotNumber,
        status: vetSchedules[0].status,
        allProperties: vetSchedules[0],
      });
    }
  }
  console.log("==============================");

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

  // Debug validVetSchedules
  console.log("=== validVetSchedules Debug ===");
  console.log("validVetSchedules length:", validVetSchedules.length);
  if (validVetSchedules.length > 0) {
    console.log("First valid schedule:", validVetSchedules[0]);
    console.log("Valid schedule sample:", {
      scheduleDate: validVetSchedules[0]?.scheduleDate,
      slotNumber: validVetSchedules[0]?.slotNumber,
      status: validVetSchedules[0]?.status,
    });

    // Log tất cả schedule dates và slots để debug
    console.log("All schedule dates and slots:");
    validVetSchedules.slice(0, 5).forEach((schedule, index) => {
      console.log(`Schedule ${index}:`, {
        scheduleDate: schedule.scheduleDate,
        formattedDate: schedule.scheduleDate.split("T")[0],
        slotNumber: schedule.slotNumber,
        status: schedule.status,
      });
    });
  }
  console.log("=====================================");

  // Tính toán thống kê từ dữ liệu thực (sử dụng validVetSchedules)
  const weeklyStats = {
    totalShifts: validVetSchedules.length,
    bookedAppointments: validVetSchedules.filter(
      (schedule) => schedule.status === 2,
    ).length,
    availableSlots: validVetSchedules.filter(
      (schedule) => schedule.status === 1,
    ).length,
  };

  const upcomingAppointments = [
    {
      id: "1",
      type: "Khám sức khỏe cho chó",
      date: "Hôm nay",
      time: "10:00 - 12:00",
      customerName: "Nguyễn Văn A",
    },
    {
      id: "2",
      type: "Tiêm phòng cho mèo",
      date: "Ngày mai",
      time: "08:00 - 10:00",
      customerName: "Trần Thị B",
    },
  ];

  // Event handlers
  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleSlotEdit = (date: Date, slotId: number) => {
    setSelectedDate(date);
    openEditModal(slotId);
  };

  const onSubmitSchedule = (values: ScheduleFormValues) => {
    console.log("Submitted values:", values);
    // Here you would call your API to save the schedule
    closeAddModal();
    closeEditModal();
  };

  const getSlotStatus = (date: Date, slotId: number): SlotStatus => {
    console.log("=== getSlotStatus Debug ===");
    console.log("Input date:", date);
    console.log("Input slotId:", slotId);
    console.log("validVetSchedules available:", !!validVetSchedules);
    console.log("validVetSchedules length:", validVetSchedules.length);

    if (!validVetSchedules || validVetSchedules.length === 0) {
      console.log("No valid vetSchedules data, returning unavailable");
      return "unavailable";
    }

    // Format date để so sánh với dữ liệu từ API
    const dateString = date.toISOString().split("T")[0];
    console.log("Formatted dateString:", dateString);

    // Debug: Show available dates and slots
    console.log("Available schedule dates and slots:");
    const availableDatesSlots = validVetSchedules.map((s) => ({
      date: s.scheduleDate.split("T")[0],
      slot: s.slotNumber,
      status: s.status,
    }));
    console.log(availableDatesSlots);

    // Check if we have any matches for the date first
    const dateMatches = validVetSchedules.filter(
      (s) => s.scheduleDate.split("T")[0] === dateString,
    );
    console.log(`Schedules for date ${dateString}:`, dateMatches);

    // Check if we have any matches for the slot
    const slotMatches = validVetSchedules.filter(
      (s) => s.slotNumber === slotId,
    );
    console.log(`Schedules for slot ${slotId}:`, slotMatches);

    // Tìm lịch làm việc tương ứng với ngày và slot
    const schedule = validVetSchedules.find((schedule) => {
      // Dữ liệu đã được validate, không cần kiểm tra thêm
      const scheduleDateString = schedule.scheduleDate.split("T")[0];
      const dateMatch = scheduleDateString === dateString;
      const slotMatch = schedule.slotNumber === slotId;

      console.log(`Checking schedule:`, {
        scheduleDate: schedule.scheduleDate,
        scheduleDateString,
        slotNumber: schedule.slotNumber,
        dateMatch,
        slotMatch,
        status: schedule.status,
      });

      return dateMatch && slotMatch;
    });

    console.log("Found schedule:", schedule);

    if (!schedule) {
      console.log("No matching schedule found, returning unavailable");
      return "unavailable";
    }

    // Map status từ API sang SlotStatus (giả sử status là number)
    let result: SlotStatus;
    switch (schedule.status) {
      case 1: // Available
        result = "available";
        break;
      case 0: // Unavailable
        result = "unavailable";
        break;
      case 2: // Booked
        result = "booked";
        break;
      case 3: // Completed
        result = "completed";
        break;
      default:
        result = "unavailable";
        break;
    }

    console.log(`Status mapping: ${schedule.status} -> ${result}`);
    console.log("========================");
    return result;
  };

  const handleViewAll = () => {
    // Navigate to full appointments page
    console.log("Navigate to appointments page");
  };

  // Hiển thị lỗi nếu có
  if (vetSchedulesError) {
    console.error("Error loading vet schedules:", vetSchedulesError);
  }

  return (
    <div className="container mx-auto p-6">
      <PageBreadcrumb items={["Trang chủ", "Lịch làm việc"]} />

      <VetScheduleHeader viewMode={viewMode} onViewModeChange={setViewMode} />

      <VetScheduleCalendar
        currentDate={currentDate}
        selectedDate={selectedDate}
        viewMode={viewMode}
        isAddingSchedule={isAddingSchedule}
        isEditingSchedule={isEditingSchedule}
        selectedSlot={selectedSlot}
        weekDays={weekDays}
        onPreviousPeriod={() => handlePreviousPeriod(viewMode)}
        onNextPeriod={() => handleNextPeriod(viewMode)}
        onAddSchedule={openAddModal}
        onEditSchedule={closeEditModal}
        onDayClick={handleDayClick}
        onSlotEdit={handleSlotEdit}
        onSubmitSchedule={onSubmitSchedule}
        formatDateToDMY={formatDateToDMY}
        getMonthName={getMonthName}
        getSlotStatus={getSlotStatus}
      />

      {/* Thống kê & thông tin bổ sung */}
      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        <VetScheduleStats weeklyStats={weeklyStats} />
        <VetScheduleStatusLegend />
        <VetScheduleUpcoming
          appointments={upcomingAppointments}
          isLoading={isLoadingVetSchedules}
          onViewAll={handleViewAll}
        />
      </div>
    </div>
  );
};

export default VetSchedulesPage;
