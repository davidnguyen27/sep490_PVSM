import { Badge } from "@/components/ui/badge";
import type { VaccineSchedule } from "../types/vaccine-schedule.type";

interface TimelineViewProps {
  schedules: VaccineSchedule[];
  species: "dog" | "cat";
}

export function TimelineView({ schedules, species }: TimelineViewProps) {
  // Sort schedules by age interval
  const sortedSchedules = [...schedules].sort(
    (a, b) => a.ageInterval - b.ageInterval,
  );

  const speciesColors = {
    dog: {
      line: "border-info",
      node: "bg-info border-info text-white",
      accent: "bg-info/10 border-info/30",
    },
    cat: {
      line: "border-warning",
      node: "bg-warning border-warning text-dark",
      accent: "bg-warning/10 border-warning/30",
    },
  };

  const colors = speciesColors[species];

  return (
    <div className="py-4">
      <div className="relative">
        {/* Timeline line */}
        <div
          className={`absolute top-0 bottom-0 left-4 w-0.5 ${colors.line} border-l-2`}
        ></div>

        {/* Timeline nodes */}
        <div className="space-y-6">
          {sortedSchedules.map((schedule) => (
            <div
              key={schedule.vaccinationScheduleId}
              className="relative flex items-center gap-4"
            >
              {/* Timeline node */}
              <div
                className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 ${colors.node} font-nunito-700 text-xs`}
              >
                {schedule.doseNumber}
              </div>

              {/* Content */}
              <div className={`flex-1 rounded-lg border p-4 ${colors.accent}`}>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-dark font-nunito-700 text-sm">
                        Liều {schedule.doseNumber}
                      </span>
                      <Badge
                        variant="outline"
                        className="text-primary border-primary font-nunito-500 text-xs"
                      >
                        {schedule.ageInterval} tháng tuổi
                      </Badge>
                    </div>
                    <p className="text-dark/70 font-nunito-500 text-xs">
                      Thời gian: {schedule.ageInterval} tháng tuổi
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Badge
                      variant="outline"
                      className="text-info border-info font-nunito-500 text-xs"
                    >
                      Xem
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-warning border-warning font-nunito-500 text-xs"
                    >
                      Sửa
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Age indicators */}
        <div className="text-dark/60 font-nunito-500 mt-6 flex items-center justify-between text-xs">
          <span>Sơ sinh</span>
          <span>→ Thời gian phát triển →</span>
          <span>Trưởng thành</span>
        </div>
      </div>
    </div>
  );
}
