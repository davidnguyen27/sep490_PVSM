import { useState } from "react";
import { format } from "date-fns";
import { PageBreadcrumb } from "@/components/shared";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { User, Loader2 } from "lucide-react";
import { useVets } from "@/modules/vets/hooks/useVets";
import { useVetScheduleByVetId } from "../hooks/useVetScheduleByVetId";
import { useDeleteSchedule } from "../hooks/useDeleteSchedule";
import { useDateNavigation } from "../hooks/useDateNavigation";
import { useDateFormatting } from "../hooks/useDateFormatting";
import type { VetSchedule } from "../types/vet-schedule.type";
import {
  WeeklyStatsCards,
  WeeklyCalendar,
  StatusLegend,
  ScheduleLoadingSkeleton,
  ScheduleErrorState,
  StaffScheduleModal,
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

const StaffVetSchedulesPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  // Removed viewMode state (week/month filter)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [existingSchedule, setExistingSchedule] = useState<VetSchedule | null>(
    null,
  );
  const [selectedVetId, setSelectedVetId] = useState<string>("");

  // Custom hooks
  const { weekDays, handlePreviousPeriod, handleNextPeriod } =
    useDateNavigation();
  const { formatDateToDMY } = useDateFormatting();
  const { mutate: deleteSchedule } = useDeleteSchedule();

  // Lấy danh sách bác sĩ
  const { data: vetsResponse, isLoading: isLoadingVets } = useVets({
    pageNumber: 1,
    pageSize: 100,
    keyWord: "",
  });

  const vets = vetsResponse?.data?.pageData || [];

  // Lấy lịch làm việc của bác sĩ được chọn
  const {
    data: vetSchedules,
    isLoading: isLoadingVetSchedules,
    error: vetSchedulesError,
    refetch: refetchVetSchedules,
  } = useVetScheduleByVetId(selectedVetId ? parseInt(selectedVetId) : null);

  // Lọc và làm sạch dữ liệu vetSchedules
  const validVetSchedules = (vetSchedules || []).filter(
    (schedule: VetSchedule) =>
      schedule &&
      schedule.scheduleDate &&
      typeof schedule.scheduleDate === "string" &&
      typeof schedule.slotNumber === "number" &&
      typeof schedule.status === "number",
  );

  // Tính toán thống kê từ dữ liệu thực
  const weeklyStats = {
    totalShifts: validVetSchedules.length,
    bookedAppointments: validVetSchedules.filter(
      (schedule: VetSchedule) => schedule.status === 3, // Đã đặt
    ).length,
    availableSlots: validVetSchedules.filter(
      (schedule: VetSchedule) => schedule.status === 1, // Trống
    ).length,
    lateAppointments: validVetSchedules.filter(
      (schedule: VetSchedule) => schedule.status === 2, // Trễ hẹn
    ).length,
  };

  // Event handlers
  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleAddSchedule = () => {
    setModalMode("add");
    setExistingSchedule(null);
    setIsModalOpen(true);
  };

  const handleSlotEdit = (date: Date, slotId: number) => {
    setSelectedDate(date);

    // Tìm schedule tương ứng
    const dateString = format(date, "yyyy-MM-dd");
    const schedule = validVetSchedules.find((schedule: VetSchedule) => {
      const scheduleDateString = schedule.scheduleDate.split("T")[0];
      return (
        scheduleDateString === dateString && schedule.slotNumber === slotId
      );
    });

    if (schedule) {
      // Nếu có schedule -> edit mode
      setExistingSchedule(schedule);
      setModalMode("edit");
    } else {
      // Nếu không có schedule -> add mode
      setExistingSchedule(null);
      setModalMode("add");
    }

    setIsModalOpen(true);
  };

  const handleSlotDelete = (date: Date, slotId: number) => {
    // Tìm schedule tương ứng để lấy ID
    const dateString = format(date, "yyyy-MM-dd");
    const schedule = validVetSchedules.find((schedule: VetSchedule) => {
      const scheduleDateString = schedule.scheduleDate.split("T")[0];
      return (
        scheduleDateString === dateString && schedule.slotNumber === slotId
      );
    });

    if (schedule?.vetScheduleId) {
      deleteSchedule(schedule.vetScheduleId);
    }
  };

  const getSlotStatus = (date: Date, slotId: number): SlotStatus => {
    if (!validVetSchedules || validVetSchedules.length === 0) {
      return "unavailable";
    }

    const dateString = format(date, "yyyy-MM-dd");

    const schedule = validVetSchedules.find((schedule: VetSchedule) => {
      const scheduleDateString = schedule.scheduleDate.split("T")[0];
      return (
        scheduleDateString === dateString && schedule.slotNumber === slotId
      );
    });

    if (!schedule) {
      return "unavailable";
    }

    // Map status từ API sang SlotStatus
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

  const selectedVet = vets.find(
    (vet) => vet.vetId.toString() === selectedVetId,
  );

  // Hiển thị lỗi nếu có
  if (vetSchedulesError) {
    return <ScheduleErrorState />;
  }

  return (
    <div className="mx-auto space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="font-nunito space-y-1">
          <h1 className="font-inter-700 text-primary text-2xl">
            Quản lý lịch làm việc bác sĩ
          </h1>
          <p className="ml-1 text-sm text-gray-400">
            Chọn bác sĩ để xem và quản lý lịch làm việc
          </p>
        </div>
      </div>

      <PageBreadcrumb items={["Quản lý lịch làm việc bác sĩ"]} />

      {/* Filter chọn bác sĩ */}
      <Card className="py-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Chọn bác sĩ
          </CardTitle>
          <CardDescription>
            Vui lòng chọn bác sĩ để xem lịch làm việc
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Select value={selectedVetId} onValueChange={setSelectedVetId}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn bác sĩ thú y" />
                </SelectTrigger>
                <SelectContent>
                  {isLoadingVets ? (
                    <div className="flex items-center justify-center p-4">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="ml-2">Đang tải...</span>
                    </div>
                  ) : vets.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                      Không có bác sĩ nào
                    </div>
                  ) : (
                    vets.map((vet) => (
                      <SelectItem key={vet.vetId} value={vet.vetId.toString()}>
                        <div className="flex flex-col">
                          <span className="font-nunito-600">{vet.name}</span>
                          <span className="text-sm text-gray-500">
                            {vet.specialization} - {vet.vetCode}
                          </span>
                        </div>
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
            {selectedVet && (
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  {selectedVet.name}
                </Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {!selectedVetId ? (
        // Hiển thị thông báo khi chưa chọn bác sĩ
        <Card className="py-4">
          <CardContent className="py-12">
            <div className="text-center text-gray-500">
              <User className="mx-auto mb-4 h-16 w-16 opacity-50" />
              <h3 className="mb-2 text-lg font-medium">Chưa chọn bác sĩ</h3>
              <p>
                Vui lòng chọn bác sĩ ở phần filter trên để xem lịch làm việc
              </p>
            </div>
          </CardContent>
        </Card>
      ) : isLoadingVetSchedules ? (
        // Loading state
        <ScheduleLoadingSkeleton />
      ) : (
        <>
          {/* Thống kê nhanh */}
          <WeeklyStatsCards
            stats={weeklyStats}
            onAddSchedule={handleAddSchedule}
            disableAdd={
              selectedDate <= new Date(new Date().setHours(0, 0, 0, 0))
            }
          />

          {/* Lịch tuần */}
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
            onSlotEdit={handleSlotEdit}
            onSlotDelete={handleSlotDelete}
            onPreviousPeriod={() => handlePreviousPeriod("week")}
            onNextPeriod={() => handleNextPeriod("week")}
          />

          {/* Legend */}
          <StatusLegend statusConfig={statusConfig} />
        </>
      )}

      {/* Modal form */}
      <StaffScheduleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        existingSchedule={existingSchedule}
        selectedDate={selectedDate}
        selectedVetId={selectedVetId}
        onSuccess={() => refetchVetSchedules()}
      />
    </div>
  );
};

export default StaffVetSchedulesPage;
