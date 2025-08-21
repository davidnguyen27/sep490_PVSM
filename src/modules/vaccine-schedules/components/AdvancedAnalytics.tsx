import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  TrendingUp,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity,
} from "lucide-react";
import type { VaccineSchedule } from "../types/vaccine-schedule.type";

interface AdvancedAnalyticsProps {
  schedules: VaccineSchedule[];
  groupedSchedules: Record<
    string,
    {
      disease: VaccineSchedule["disease"];
      schedules: VaccineSchedule[];
    }
  >;
  activeTab: "dog" | "cat";
}

export function AdvancedAnalytics({
  schedules,
  groupedSchedules,
  activeTab,
}: AdvancedAnalyticsProps) {
  // Calculate analytics data
  const totalDiseases = Object.keys(groupedSchedules).length;
  const totalSchedules = schedules.length;
  const averageSchedulesPerDisease = Math.round(totalSchedules / totalDiseases);

  // Age distribution analysis
  const ageDistribution = schedules.reduce(
    (acc, schedule) => {
      const ageGroup =
        schedule.ageInterval <= 6
          ? "early"
          : schedule.ageInterval <= 12
            ? "middle"
            : "late";
      acc[ageGroup] = (acc[ageGroup] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  // Most complex diseases (most doses)
  const diseaseComplexity = Object.entries(groupedSchedules)
    .map(([name, data]) => ({
      name,
      doses: data.schedules.length,
      ageSpan:
        Math.max(...data.schedules.map((s) => s.ageInterval)) -
        Math.min(...data.schedules.map((s) => s.ageInterval)),
    }))
    .sort((a, b) => b.doses - a.doses);

  const colors = {
    dog: {
      primary: "border-info/30 bg-info/5",
      accent: "text-info",
      badge: "bg-info text-white",
      chart: "bg-gradient-to-r from-info/20 to-secondary/20",
    },
    cat: {
      primary: "border-warning/30 bg-warning/5",
      accent: "text-warning",
      badge: "bg-warning text-dark",
      chart: "bg-gradient-to-r from-warning/20 to-yellow-500/20",
    },
  }[activeTab];

  return (
    <div className="space-y-6">
      {/* Overview Metrics */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card className="border-primary/20">
          <CardContent className="p-6 text-center">
            <Activity className="text-primary mx-auto mb-2 h-8 w-8" />
            <div className="font-inter-700 text-dark text-2xl">
              {totalDiseases}
            </div>
            <div className="font-nunito-500 text-dark/60 text-sm">
              Tổng bệnh
            </div>
          </CardContent>
        </Card>

        <Card className="border-info/20">
          <CardContent className="p-6 text-center">
            <Calendar className="text-info mx-auto mb-2 h-8 w-8" />
            <div className="font-inter-700 text-dark text-2xl">
              {totalSchedules}
            </div>
            <div className="font-nunito-500 text-dark/60 text-sm">
              Tổng lịch tiêm
            </div>
          </CardContent>
        </Card>

        <Card className="border-warning/20">
          <CardContent className="p-6 text-center">
            <BarChart3 className="text-warning mx-auto mb-2 h-8 w-8" />
            <div className="font-inter-700 text-dark text-2xl">
              {averageSchedulesPerDisease}
            </div>
            <div className="font-nunito-500 text-dark/60 text-sm">
              TB liều/bệnh
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-500/20">
          <CardContent className="p-6 text-center">
            <TrendingUp className="mx-auto mb-2 h-8 w-8 text-green-500" />
            <div className="font-inter-700 text-dark text-2xl">
              {Math.max(...Object.values(ageDistribution))}
            </div>
            <div className="font-nunito-500 text-dark/60 text-sm">
              Nhóm tuổi phổ biến
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Age Distribution Chart */}
      <Card className={colors.primary}>
        <CardHeader>
          <CardTitle className="font-inter-700 flex items-center gap-2">
            <BarChart3 className={`h-5 w-5 ${colors.accent}`} />
            Phân bố theo độ tuổi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { key: "early", label: "Sớm (≤6 tháng)", color: "bg-green-500" },
              {
                key: "middle",
                label: "Trung bình (7-12 tháng)",
                color: "bg-yellow-500",
              },
              { key: "late", label: "Muộn (>12 tháng)", color: "bg-red-500" },
            ].map(({ key, label, color }) => {
              const count = ageDistribution[key] || 0;
              const percentage =
                totalSchedules > 0 ? (count / totalSchedules) * 100 : 0;

              return (
                <div key={key} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-nunito-600 text-dark text-sm">
                      {label}
                    </span>
                    <Badge variant="outline" className="font-nunito-600">
                      {count} ({percentage.toFixed(1)}%)
                    </Badge>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-200">
                    <div
                      className={`${color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Disease Complexity Analysis */}
      <Card className="bg-linen">
        <CardHeader>
          <CardTitle className="font-inter-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Độ phức tạp bệnh
            </div>
            <Button variant="outline" size="sm" className="font-nunito-600">
              Xem chi tiết
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {diseaseComplexity.slice(0, 5).map((disease, index) => (
              <div
                key={disease.name}
                className="flex items-center justify-between rounded-lg border bg-white p-3"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`font-nunito-700 flex h-8 w-8 items-center justify-center rounded-full text-sm ${
                      index === 0
                        ? "bg-red-100 text-red-600"
                        : index === 1
                          ? "bg-orange-100 text-orange-600"
                          : index === 2
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-nunito-700 text-dark text-sm">
                      {disease.name}
                    </div>
                    <div className="font-nunito-500 text-dark/60 text-xs">
                      Thời gian: {disease.ageSpan} tháng
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={`font-nunito-600 ${
                      disease.doses >= 4
                        ? "border-red-300 text-red-600"
                        : disease.doses >= 3
                          ? "border-orange-300 text-orange-600"
                          : "border-green-300 text-green-600"
                    }`}
                  >
                    {disease.doses} liều
                  </Badge>
                  <div
                    className={`font-nunito-600 rounded px-2 py-1 text-xs ${
                      disease.doses >= 4
                        ? "bg-red-100 text-red-600"
                        : disease.doses >= 3
                          ? "bg-orange-100 text-orange-600"
                          : "bg-green-100 text-green-600"
                    }`}
                  >
                    {disease.doses >= 4
                      ? "Phức tạp"
                      : disease.doses >= 3
                        ? "Trung bình"
                        : "Đơn giản"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Insights */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="mt-1 h-5 w-5 text-blue-600" />
              <div>
                <h4 className="font-nunito-700 text-dark mb-1 text-sm">
                  Insight tích cực
                </h4>
                <p className="font-nunito-500 text-dark/70 text-xs">
                  {Math.round(
                    ((ageDistribution.early || 0) / totalSchedules) * 100,
                  )}
                  % lịch tiêm được thực hiện sớm, giúp bảo vệ{" "}
                  {activeTab === "dog" ? "chó" : "mèo"} từ nhỏ.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Clock className="mt-1 h-5 w-5 text-amber-600" />
              <div>
                <h4 className="font-nunito-700 text-dark mb-1 text-sm">
                  Cần chú ý
                </h4>
                <p className="font-nunito-500 text-dark/70 text-xs">
                  Bệnh "{diseaseComplexity[0]?.name}" có{" "}
                  {diseaseComplexity[0]?.doses} liều, cần lập kế hoạch tiêm cẩn
                  thận.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
