import { Calendar } from "lucide-react";
import { Button } from "@/components/ui";

interface VetScheduleHeaderProps {
  viewMode: "week" | "month";
  onViewModeChange: (mode: "week" | "month") => void;
}

export function VetScheduleHeader({
  viewMode,
  onViewModeChange,
}: VetScheduleHeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h1 className="text-3xl font-bold text-gray-800">
        Quản lý lịch làm việc
      </h1>

      <div className="flex gap-2">
        <Button
          variant={viewMode === "week" ? "default" : "outline"}
          onClick={() => onViewModeChange("week")}
          className="flex items-center gap-2"
        >
          <Calendar size={16} /> Tuần
        </Button>
        <Button
          variant={viewMode === "month" ? "default" : "outline"}
          onClick={() => onViewModeChange("month")}
          className="flex items-center gap-2"
        >
          <Calendar size={16} /> Tháng
        </Button>
      </div>
    </div>
  );
}
