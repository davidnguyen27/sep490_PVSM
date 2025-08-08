import { Calendar } from "lucide-react";
import { Button } from "@/components/ui";

interface ScheduleHeaderProps {
  viewMode: "week" | "month";
  onViewModeChange: (mode: "week" | "month") => void;
}

export const ScheduleHeader = ({
  viewMode,
  onViewModeChange,
}: ScheduleHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-900">Lịch làm việc</h1>
      <div className="flex gap-2">
        <Button
          variant={viewMode === "week" ? "default" : "outline"}
          onClick={() => onViewModeChange("week")}
          size="sm"
        >
          <Calendar className="mr-2 h-4 w-4" />
          Tuần
        </Button>
        <Button
          variant={viewMode === "month" ? "default" : "outline"}
          onClick={() => onViewModeChange("month")}
          size="sm"
        >
          <Calendar className="mr-2 h-4 w-4" />
          Tháng
        </Button>
      </div>
    </div>
  );
};
