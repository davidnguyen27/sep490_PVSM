interface VetScheduleStatsProps {
  weeklyStats: {
    totalShifts: number;
    bookedAppointments: number;
    availableSlots: number;
  };
}

export function VetScheduleStats({ weeklyStats }: VetScheduleStatsProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h3 className="mb-3 text-lg font-semibold">Thống kê tuần này</h3>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Ca làm việc:</span>
          <span className="font-medium">{weeklyStats.totalShifts} ca</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Lịch hẹn đã đặt:</span>
          <span className="font-medium">
            {weeklyStats.bookedAppointments} lịch
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Còn trống:</span>
          <span className="font-medium">{weeklyStats.availableSlots} ca</span>
        </div>
      </div>
    </div>
  );
}
