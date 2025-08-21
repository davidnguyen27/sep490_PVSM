import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TimelineView } from "./TimelineView";
import { VaccineScheduleTable } from "./VaccineScheduleTable";
import {
  Search,
  Calendar,
  Clock,
  Stethoscope,
  Activity,
  Eye,
  Edit,
  Plus,
  BarChart3,
  Table2,
} from "lucide-react";
import type { VaccineSchedule } from "../types/vaccine-schedule.type";

interface MasterDetailLayoutProps {
  groupedSchedules: Record<
    string,
    {
      disease: VaccineSchedule["disease"];
      schedules: VaccineSchedule[];
    }
  >;
  activeTab: "dog" | "cat";
  currentPage: number;
  pageSize: number;
}

export function MasterDetailLayout({
  groupedSchedules,
  activeTab,
  currentPage,
  pageSize,
}: MasterDetailLayoutProps) {
  const [selectedDisease, setSelectedDisease] = useState<string | null>(
    Object.keys(groupedSchedules)[0] || null,
  );
  const [detailViewMode, setDetailViewMode] = useState<"table" | "timeline">(
    "timeline",
  );
  const [searchTerm, setSearchTerm] = useState("");

  const diseaseEntries = Object.entries(groupedSchedules);
  const filteredDiseases = diseaseEntries.filter(([diseaseName]) =>
    diseaseName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const selectedDiseaseData = selectedDisease
    ? groupedSchedules[selectedDisease]
    : null;

  const speciesColors = {
    dog: {
      primary: "border-info/30 bg-info/5",
      accent: "text-info",
      badge: "bg-info text-white",
      button: "bg-info hover:bg-info/90 text-white",
    },
    cat: {
      primary: "border-warning/30 bg-warning/5",
      accent: "text-warning",
      badge: "bg-warning text-dark",
      button: "bg-warning hover:bg-warning/90 text-dark",
    },
  };

  const colors = speciesColors[activeTab];

  return (
    <div className="grid h-[800px] grid-cols-12 gap-6">
      {/* Master Panel - Disease List */}
      <div className="col-span-4">
        <Card className={`h-full ${colors.primary}`}>
          <CardHeader className="pb-3">
            <CardTitle className="font-inter-700 flex items-center gap-2 text-lg">
              <Stethoscope className={`h-5 w-5 ${colors.accent}`} />
              Danh sách bệnh ({filteredDiseases.length})
            </CardTitle>
            <div className="relative">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
              <Input
                placeholder="Tìm kiếm bệnh..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="font-nunito-500 pl-10 text-sm"
              />
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="h-[650px] overflow-auto">
              <div className="space-y-2 p-4">
                {filteredDiseases.map(([diseaseName, diseaseData]) => (
                  <div
                    key={diseaseName}
                    onClick={() => setSelectedDisease(diseaseName)}
                    className={`cursor-pointer rounded-lg border p-4 transition-all duration-200 ${
                      selectedDisease === diseaseName
                        ? `${colors.primary} border-2 shadow-md`
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-nunito-700 text-dark text-sm">
                          {diseaseName}
                        </h3>
                        <Badge
                          variant="outline"
                          className={`text-xs ${selectedDisease === diseaseName ? colors.badge : "border-gray-300"}`}
                        >
                          {diseaseData.schedules.length} liều
                        </Badge>
                      </div>

                      {diseaseData.disease.description && (
                        <p className="text-dark/60 font-nunito-400 line-clamp-2 text-xs">
                          {diseaseData.disease.description}
                        </p>
                      )}

                      <div className="text-dark/50 flex items-center gap-4 text-xs">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>
                            {Math.min(
                              ...diseaseData.schedules.map(
                                (s) => s.ageInterval,
                              ),
                            )}{" "}
                            -{" "}
                            {Math.max(
                              ...diseaseData.schedules.map(
                                (s) => s.ageInterval,
                              ),
                            )}{" "}
                            tháng
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{diseaseData.schedules.length} lần tiêm</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detail Panel */}
      <div className="col-span-8">
        {selectedDiseaseData ? (
          <Card className="bg-linen h-full">
            <CardHeader
              className={`bg-gradient-to-r ${activeTab === "dog" ? "from-info to-secondary text-white" : "from-warning text-dark to-yellow-500"}`}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="font-inter-700 flex items-center gap-3 text-xl">
                  <Activity className="h-6 w-6" />
                  <div>
                    <h2>{selectedDisease}</h2>
                    {selectedDiseaseData.disease.description && (
                      <p
                        className={`font-nunito-500 mt-1 text-sm ${activeTab === "dog" ? "text-white/90" : "text-dark/80"}`}
                      >
                        {selectedDiseaseData.disease.description}
                      </p>
                    )}
                  </div>
                </CardTitle>

                <div className="flex items-center gap-2">
                  <Button
                    variant={
                      detailViewMode === "timeline" ? "secondary" : "ghost"
                    }
                    size="sm"
                    onClick={() => setDetailViewMode("timeline")}
                    className={`${activeTab === "dog" ? "text-white hover:bg-white/10" : "text-dark hover:bg-dark/10"}`}
                  >
                    <BarChart3 className="mr-1 h-4 w-4" />
                    Timeline
                  </Button>
                  <Button
                    variant={detailViewMode === "table" ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setDetailViewMode("table")}
                    className={`${activeTab === "dog" ? "text-white hover:bg-white/10" : "text-dark hover:bg-dark/10"}`}
                  >
                    <Table2 className="mr-1 h-4 w-4" />
                    Bảng
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              {/* Quick Stats */}
              <div className="border-b border-gray-200 bg-white/50 p-4">
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-dark font-nunito-700 text-lg">
                      {selectedDiseaseData.schedules.length}
                    </div>
                    <div className="text-dark/60 font-nunito-500 text-xs">
                      Tổng liều
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-dark font-nunito-700 text-lg">
                      {Math.min(
                        ...selectedDiseaseData.schedules.map(
                          (s) => s.ageInterval,
                        ),
                      )}
                    </div>
                    <div className="text-dark/60 font-nunito-500 text-xs">
                      Tuổi bắt đầu
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-dark font-nunito-700 text-lg">
                      {Math.max(
                        ...selectedDiseaseData.schedules.map(
                          (s) => s.ageInterval,
                        ),
                      )}
                    </div>
                    <div className="text-dark/60 font-nunito-500 text-xs">
                      Tuổi kết thúc
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-dark font-nunito-700 text-lg">
                      {Math.max(
                        ...selectedDiseaseData.schedules.map(
                          (s) => s.ageInterval,
                        ),
                      ) -
                        Math.min(
                          ...selectedDiseaseData.schedules.map(
                            (s) => s.ageInterval,
                          ),
                        )}
                    </div>
                    <div className="text-dark/60 font-nunito-500 text-xs">
                      Thời gian (tháng)
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="border-b border-gray-200 bg-gray-50 p-4">
                <div className="flex items-center justify-between">
                  <div className="text-dark font-nunito-600 text-sm">
                    Lịch tiêm chi tiết cho {selectedDisease}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="font-nunito-600"
                    >
                      <Eye className="mr-1 h-4 w-4" />
                      Xem tất cả
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="font-nunito-600"
                    >
                      <Edit className="mr-1 h-4 w-4" />
                      Chỉnh sửa
                    </Button>
                    <Button
                      size="sm"
                      className={`font-nunito-600 ${colors.button}`}
                    >
                      <Plus className="mr-1 h-4 w-4" />
                      Thêm liều
                    </Button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="h-[400px] overflow-auto p-6">
                {detailViewMode === "timeline" ? (
                  <TimelineView
                    schedules={selectedDiseaseData.schedules}
                    species={activeTab}
                  />
                ) : (
                  <VaccineScheduleTable
                    schedules={selectedDiseaseData.schedules}
                    isPending={false}
                    currentPage={currentPage}
                    pageSize={pageSize}
                    isGrouped={true}
                  />
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-linen flex h-full items-center justify-center">
            <CardContent className="text-center">
              <Stethoscope className="mx-auto mb-4 h-12 w-12 text-gray-400" />
              <h3 className="font-inter-700 text-dark mb-2 text-lg">
                Chọn bệnh để xem chi tiết
              </h3>
              <p className="text-dark/60 font-nunito-500">
                Chọn một bệnh từ danh sách bên trái để xem lịch tiêm chi tiết
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
