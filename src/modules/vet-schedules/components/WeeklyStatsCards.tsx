import { Clock, BarChart3, Calendar, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui";

interface WeeklyStatsCardsProps {
  stats: {
    totalShifts: number;
    availableSlots: number;
    bookedAppointments: number;
    lateAppointments: number;
  };
  onAddSchedule?: () => void;
  disableAdd?: boolean;
}

export const WeeklyStatsCards = ({
  stats,
  onAddSchedule,
  disableAdd = false,
}: WeeklyStatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-100 p-2">
              <Clock className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Tổng ca</p>
              <p className="text-xl font-semibold">{stats.totalShifts}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-green-100 p-2">
              <BarChart3 className="text-primary h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Trống</p>
              <p className="text-xl font-semibold">{stats.availableSlots}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-100 p-2">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Đã đặt</p>
              <p className="text-xl font-semibold">
                {stats.bookedAppointments}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-orange-100 p-2">
              <Clock className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Trễ hẹn</p>
              <p className="text-xl font-semibold">{stats.lateAppointments}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {onAddSchedule && (
        <Card>
          <CardContent className="p-4">
            <Button
              onClick={onAddSchedule}
              className="h-full min-h-[60px] w-full"
              variant="outline"
              disabled={disableAdd}
              title={
                disableAdd
                  ? "Không thể tạo lịch cho ngày hiện tại hoặc quá khứ"
                  : undefined
              }
            >
              <Plus className="mr-2 h-5 w-5" />
              Thêm lịch
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
