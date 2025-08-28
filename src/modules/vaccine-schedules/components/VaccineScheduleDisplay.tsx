import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  Syringe,
  Plus,
  Edit,
  Trash2,
  CalendarRange,
} from "lucide-react";
import { EmptyTable } from "@/components/shared";
import type { VaccineSchedule } from "../types/vaccine-schedule.type";

interface VaccineScheduleDisplayProps {
  schedules: VaccineSchedule[];
  diseaseName: string;
  isLoading?: boolean;
  onEdit?: (schedule: VaccineSchedule) => void;
  onDelete?: (schedule: VaccineSchedule) => void;
  onView?: (schedule: VaccineSchedule) => void;
  onCreateNew?: () => void;
}

export function VaccineScheduleDisplay({
  schedules,
  diseaseName,
  isLoading = false,
  onEdit,
  onDelete,
  onCreateNew,
}: VaccineScheduleDisplayProps) {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-8">
            <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
            <span className="ml-2">Đang tải lịch tiêm...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Sort schedules by dose number
  const sortedSchedules = [...schedules].sort(
    (a, b) => a.doseNumber - b.doseNumber,
  );

  return (
    <Card className="rounded-none">
      <CardHeader className="flex items-center justify-between bg-gradient-to-r from-green-50 to-blue-50 py-2">
        <CardTitle className="text-primary flex items-center gap-2">
          <CalendarRange className="h-5 w-5" />
          Lịch tiêm phòng - {diseaseName}
        </CardTitle>
        {onCreateNew && (
          <Button
            onClick={onCreateNew}
            size="sm"
            className="bg-primary hover:bg-secondary"
          >
            <Plus className="mr-1 h-4 w-4" />
            Thêm lịch tiêm
          </Button>
        )}
      </CardHeader>

      <CardContent className="p-6">
        {sortedSchedules.length === 0 ? (
          <EmptyTable />
        ) : (
          <div className="space-y-4">
            {/* Summary */}
            <div className="bg-linen flex items-center gap-4 rounded-none p-4">
              <div className="flex items-center gap-2">
                <Syringe className="text-info h-4 w-4" />
                <span className="font-nunito-700 text-dark text-sm">
                  Tổng số liều:{" "}
                  <span className="text-info">{sortedSchedules.length}</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="text-warning h-4 w-4" />
                <span className="font-nunito-700 text-dark text-sm">
                  Thời gian:{" "}
                  <span className="text-warning">
                    {Math.min(...sortedSchedules.map((s) => s.ageInterval))} -{" "}
                    {Math.max(...sortedSchedules.map((s) => s.ageInterval))}{" "}
                    tuần tuổi
                  </span>
                </span>
              </div>
            </div>

            {/* Schedule Timeline */}
            <div className="space-y-3">
              {sortedSchedules.map((schedule, index) => (
                <div
                  key={schedule.vaccinationScheduleId}
                  className="border-primary/20 bg-linen relative rounded-md border p-4 transition-shadow hover:shadow-md"
                >
                  {/* Timeline connector */}
                  {index < sortedSchedules.length - 1 && (
                    <div className="bg-primary/50 absolute top-20 left-10 h-5 w-px -translate-x-1/2"></div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Dose number badge */}
                      <div className="bg-info/10 text-info border-info/20 relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 font-bold">
                        {schedule.doseNumber}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-nunito-600 text-dark">
                            Liều {schedule.doseNumber}
                          </h4>
                          <Badge variant="default">Đang áp dụng</Badge>
                        </div>

                        <div className="text-dark/70 font-nunito-600 flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Clock className="text-warning h-3 w-3" />
                            <span>{schedule.ageInterval} tuần tuổi</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="text-info h-3 w-3" />
                            <span>
                              Loài: {schedule.species === "Dog" ? "Chó" : "Mèo"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2">
                      {onEdit && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-secondary hover:bg-secondary/10 border-secondary/20"
                          onClick={() => onEdit(schedule)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                      )}
                      {onDelete && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-danger hover:bg-danger/10 hover:text-danger border-danger/20"
                          onClick={() => onDelete(schedule)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
