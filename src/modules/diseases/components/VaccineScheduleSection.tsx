import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Calendar,
  Clock,
  Syringe,
  Plus,
  Activity,
  Dog,
  Cat,
} from "lucide-react";
import { useVaccineScheduleByDisease } from "@/modules/vaccine-schedules/hooks/useVaccineScheduleByDisease";
import type { VaccineSchedule } from "@/modules/vaccine-schedules/types/vaccine-schedule.type";

// Types
interface VaccineScheduleSectionProps {
  diseaseId: number | null;
  diseaseName: string;
  diseaseSpecies: string;
}

// Constants
const SPECIES_CONFIG = {
  Dog: {
    icon: Dog,
    label: "Chó",
    emoji: <Dog />,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
  },
  Cat: {
    icon: Cat,
    label: "Mèo",
    emoji: <Cat />,
    color: "text-pink-600",
    bgColor: "bg-pink-50",
  },
  Both: {
    icon: Activity,
    label: "Cả hai",
    emoji: <Dog />,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
} as const;

// Helper functions
const getSpeciesConfig = (species: string) => {
  return (
    SPECIES_CONFIG[species as keyof typeof SPECIES_CONFIG] ||
    SPECIES_CONFIG.Both
  );
};

const calculateAgeFromInterval = (ageInterval: number) => {
  if (ageInterval === 0) {
    return "Ngay khi sinh";
  } else if (ageInterval < 30) {
    return `${ageInterval} tuần tuổi`;
  } else if (ageInterval < 365) {
    const months = Math.floor(ageInterval / 30);
    const days = ageInterval % 30;
    return days > 0
      ? `${months} tháng ${days} tuần tuổi`
      : `${months} tháng tuổi`;
  } else {
    const years = Math.floor(ageInterval / 365);
    const remainingDays = ageInterval % 365;
    const months = Math.floor(remainingDays / 30);
    if (months > 0) {
      return `${years} năm ${months} tháng tuổi`;
    }
    return `${years} năm tuổi`;
  }
};

const renderSpeciesBadge = (species: string) => {
  const config = getSpeciesConfig(species);
  const IconComponent = config.icon;

  return (
    <div className="flex items-center gap-2">
      <div className={`rounded-lg p-1 ${config.bgColor}`}>
        <IconComponent className={`h-4 w-4 ${config.color}`} />
      </div>
      <Badge variant="outline" className="font-nunito">
        {config.emoji} {config.label}
      </Badge>
    </div>
  );
};

const ScheduleTableRow: React.FC<{
  schedule: VaccineSchedule;
  index: number;
}> = ({ schedule, index }) => (
  <TableRow className="hover:bg-gray-50">
    <TableCell className="font-nunito text-center">{index + 1}</TableCell>
    <TableCell className="font-nunito text-center">
      <Badge variant="default" className="font-nunito">
        Liều {schedule.doseNumber}
      </Badge>
    </TableCell>
    <TableCell>{renderSpeciesBadge(schedule.species)}</TableCell>
    <TableCell className="font-nunito">
      {calculateAgeFromInterval(schedule.ageInterval)}
    </TableCell>
  </TableRow>
);

export function VaccineScheduleSection({
  diseaseId,
  diseaseName,
  diseaseSpecies,
}: VaccineScheduleSectionProps) {
  const { data: scheduleData, isLoading } =
    useVaccineScheduleByDisease(diseaseId);

  const schedules = scheduleData?.data?.schedules || [];

  // Sort schedules by dose number
  const sortedSchedules = [...schedules].sort(
    (a, b) => a.doseNumber - b.doseNumber,
  );

  if (isLoading) {
    return (
      <Card className="border-l-4 border-l-orange-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="rounded-lg bg-orange-100 p-2">
              <Calendar className="h-5 w-5 text-orange-600" />
            </div>
            Lịch tiêm vaccine theo định kỳ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-orange-600"></div>
            <span className="ml-2 text-gray-500">Đang tải lịch tiêm...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-l-4 border-l-orange-500 py-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xl">
            <div className="rounded-lg bg-orange-100 p-2">
              <Calendar className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <h3 className="font-nunito-700 text-lg text-gray-900">
                Lịch tiêm vaccine theo định kỳ
              </h3>
              <p className="font-nunito text-sm text-gray-500">
                Bệnh: {diseaseName}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="default" className="font-nunito">
              {sortedSchedules.length} lịch tiêm
            </Badge>
            <Button
              size="sm"
              variant="outline"
              className="font-nunito"
              onClick={() => {
                // Navigate to vaccine schedule management
                window.open(
                  `/admin/vaccine-schedules?diseaseId=${diseaseId}`,
                  "_blank",
                );
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Quản lý lịch tiêm
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {sortedSchedules.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Clock className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="font-nunito-600 mt-4 text-lg text-gray-900">
              Chưa có lịch tiêm nào
            </h3>
            <p className="font-nunito mt-2 text-gray-500">
              Bệnh này chưa có lịch tiêm vaccine theo định kỳ nào được thiết
              lập.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                window.open(
                  `/admin/vaccine-schedules?diseaseId=${diseaseId}`,
                  "_blank",
                );
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Tạo lịch tiêm đầu tiên
            </Button>
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="mb-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-none border border-blue-200 bg-blue-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-blue-100 p-2">
                    <Syringe className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-nunito-600 text-sm text-blue-600">
                      Tổng số mũi tiêm
                    </p>
                    <p className="font-nunito-700 text-2xl text-blue-600">
                      {sortedSchedules.length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-none border border-green-200 bg-green-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-green-100 p-2">
                    <Clock className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-nunito-600 text-sm text-green-600">
                      Loài áp dụng
                    </p>
                    <p className="font-nunito-700 text-lg text-green-600">
                      {diseaseSpecies === "Dog"
                        ? "Chó"
                        : diseaseSpecies === "Cat"
                          ? "Mèo"
                          : "Cả hai"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-none border border-purple-200 bg-purple-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-purple-100 p-2">
                    <Calendar className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-nunito-600 text-sm text-purple-600">
                      Khoảng cách tối đa
                    </p>
                    <p className="font-nunito-700 text-lg text-purple-600">
                      {Math.max(...sortedSchedules.map((s) => s.ageInterval))}{" "}
                      tuần
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Schedule Table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-nunito-600 text-center">
                      STT
                    </TableHead>
                    <TableHead className="font-nunito-600 text-center">
                      Liều tiêm
                    </TableHead>
                    <TableHead className="font-nunito-600">Loài</TableHead>
                    <TableHead className="font-nunito-600">Tuổi tiêm</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedSchedules.map((schedule, index) => (
                    <ScheduleTableRow
                      key={schedule.vaccinationScheduleId}
                      schedule={schedule}
                      index={index}
                    />
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Schedule Timeline */}
            <div className="mt-6">
              <h4 className="font-nunito-600 mb-4 text-sm tracking-wide text-gray-600 uppercase">
                Lịch trình tiêm vaccine
              </h4>
              <div className="relative">
                {sortedSchedules.map((schedule, index) => (
                  <div
                    key={schedule.vaccinationScheduleId}
                    className="flex items-center gap-4 pb-4"
                  >
                    {/* Timeline dot */}
                    <div className="relative flex items-center">
                      <div className="font-nunito-600 flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-sm text-white">
                        {schedule.doseNumber}
                      </div>
                      {index < sortedSchedules.length - 1 && (
                        <div className="absolute top-8 left-1/2 h-6 w-px -translate-x-1/2 bg-orange-300"></div>
                      )}
                    </div>

                    {/* Schedule info */}
                    <div className="flex-1 rounded-lg border bg-gray-50 p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-nunito-600 text-gray-900">
                            Liều thứ {schedule.doseNumber}
                          </p>
                          <p className="font-nunito text-sm text-gray-600">
                            {calculateAgeFromInterval(schedule.ageInterval)}
                          </p>
                        </div>
                        {renderSpeciesBadge(schedule.species)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
