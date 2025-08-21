import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VaccineScheduleTable } from "./VaccineScheduleTable";
import { TimelineView } from "./TimelineView";
import { Table2, BarChart3, ChevronDown, ChevronUp } from "lucide-react";
import type { VaccineSchedule } from "../types/vaccine-schedule.type";

interface EnhancedDiseaseCardProps {
  diseaseName: string;
  disease: VaccineSchedule["disease"];
  schedules: VaccineSchedule[];
  activeTab: "dog" | "cat";
  currentPage: number;
  pageSize: number;
  defaultExpanded?: boolean;
}

export function EnhancedDiseaseCard({
  diseaseName,
  disease,
  schedules,
  activeTab,
  currentPage,
  pageSize,
  defaultExpanded = false,
}: EnhancedDiseaseCardProps) {
  const [viewMode, setViewMode] = useState<"table" | "timeline">("table");
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const headerColors = {
    dog: {
      gradient: "bg-gradient-to-r from-info to-secondary",
      text: "text-white",
      dot: "bg-white",
      badge: "border-white/30 bg-white/20 text-white",
    },
    cat: {
      gradient: "bg-gradient-to-r from-warning to-yellow-500",
      text: "text-dark",
      dot: "bg-dark",
      badge: "border-dark/30 bg-dark/10 text-dark",
    },
  };

  const colors = headerColors[activeTab];

  // Calculate stats
  const totalDoses = schedules.length;
  const ageRange =
    schedules.length > 0
      ? `${Math.min(...schedules.map((s) => s.ageInterval))} - ${Math.max(...schedules.map((s) => s.ageInterval))} tuần`
      : "Chưa có lịch";

  return (
    <Card className="bg-linen overflow-hidden rounded-none border-0 shadow-lg transition-all duration-200 hover:shadow-xl">
      <CardHeader className={`${colors.gradient} ${colors.text}`}>
        <div className="flex items-center justify-between">
          <CardTitle className="font-inter-700 flex items-center justify-between py-4 text-xl">
            <div className="flex items-center gap-3">
              <div className={`h-3 w-3 rounded-full ${colors.dot}`}></div>
              <div className="space-y-1">
                <h3 className="font-inter-700 text-xl">{diseaseName}</h3>
                {disease.description && (
                  <p
                    className={`font-nunito-500 text-sm ${activeTab === "dog" ? "text-white/90" : "text-dark/80"}`}
                  >
                    {disease.description}
                  </p>
                )}
              </div>
            </div>
          </CardTitle>

          <div className="flex items-center gap-3">
            {/* Stats */}
            <div className="hidden items-center gap-4 text-sm md:flex">
              <div className="text-center">
                <div className={`font-nunito-700 text-lg ${colors.text}`}>
                  {totalDoses}
                </div>
                <div
                  className={`font-nunito-500 text-xs ${activeTab === "dog" ? "text-white/80" : "text-dark/70"}`}
                >
                  Liều
                </div>
              </div>
              <div className="text-center">
                <div className={`font-nunito-700 text-sm ${colors.text}`}>
                  {ageRange}
                </div>
              </div>
            </div>

            <Badge
              variant="outline"
              className={`${colors.badge} font-nunito-600`}
            >
              {schedules.length} lịch tiêm
            </Badge>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className={`${colors.text} hover:bg-white/10`}
            >
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="p-0">
          {/* View Mode Switcher */}
          <div className="border-b border-gray-200 bg-gray-50 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "table" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("table")}
                  className="font-nunito-600"
                >
                  <Table2 className="mr-1 h-4 w-4" />
                  Bảng
                </Button>
                <Button
                  variant={viewMode === "timeline" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("timeline")}
                  className="font-nunito-600"
                >
                  <BarChart3 className="mr-1 h-4 w-4" />
                  Timeline
                </Button>
              </div>

              <div className="text-dark/60 font-nunito-500 text-sm">
                {schedules.length} lịch tiêm được tìm thấy
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            {viewMode === "table" ? (
              <VaccineScheduleTable
                schedules={schedules}
                isPending={false}
                currentPage={currentPage}
                pageSize={pageSize}
                isGrouped={true}
              />
            ) : (
              <TimelineView schedules={schedules} species={activeTab} />
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
