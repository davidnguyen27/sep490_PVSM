import { Button } from "@/components/ui";

interface Appointment {
  id: string;
  type: string;
  date: string;
  time: string;
  customerName: string;
}

interface VetScheduleUpcomingProps {
  appointments: Appointment[];
  isLoading: boolean;
  onViewAll: () => void;
}

export function VetScheduleUpcoming({
  appointments,
  isLoading,
  onViewAll,
}: VetScheduleUpcomingProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h3 className="mb-3 text-lg font-semibold">Lịch hẹn sắp tới</h3>
      {isLoading ? (
        <div className="py-4 text-center">Đang tải...</div>
      ) : (
        <div className="space-y-3">
          {appointments.length > 0 ? (
            <>
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="rounded-lg border bg-blue-50 p-3"
                >
                  <div className="font-medium">{appointment.type}</div>
                  <div className="text-sm text-gray-600">
                    {appointment.date}, {appointment.time}
                  </div>
                  <div className="text-sm font-medium text-blue-600">
                    Khách hàng: {appointment.customerName}
                  </div>
                </div>
              ))}
              <Button variant="link" className="pl-0" onClick={onViewAll}>
                Xem tất cả lịch hẹn
              </Button>
            </>
          ) : (
            <div className="py-4 text-center text-gray-500">
              Không có lịch hẹn sắp tới
            </div>
          )}
        </div>
      )}
    </div>
  );
}
