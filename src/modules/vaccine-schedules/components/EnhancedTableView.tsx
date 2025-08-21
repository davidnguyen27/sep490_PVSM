import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import type { VaccineSchedule } from "../types/vaccine-schedule.type";
import { formatData } from "@/shared/utils/format.utils";

interface EnhancedTableViewProps {
  schedules: VaccineSchedule[];
  activeTab: "dog" | "cat";
  selectedItems: string[];
  onSelectionChange: (selected: string[]) => void;
}

type SortField = "disease" | "ageInterval" | "doseNumber" | "createdAt";
type SortDirection = "asc" | "desc";

export function EnhancedTableView({
  schedules,
  activeTab,
  selectedItems,
  onSelectionChange,
}: EnhancedTableViewProps) {
  const [sortField, setSortField] = useState<SortField>("ageInterval");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);

  // Filtering
  const filteredSchedules = schedules.filter(
    (schedule) =>
      schedule.disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.disease.description
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()),
  );

  // Sorting
  const sortedSchedules = [...filteredSchedules].sort((a, b) => {
    let aValue: string | number | Date;
    let bValue: string | number | Date;

    switch (sortField) {
      case "disease":
        aValue = a.disease.name.toLowerCase();
        bValue = b.disease.name.toLowerCase();
        break;
      case "ageInterval":
        aValue = a.ageInterval;
        bValue = b.ageInterval;
        break;
      case "doseNumber":
        aValue = a.doseNumber;
        bValue = b.doseNumber;
        break;
      case "createdAt":
        aValue = new Date(a.createdAt);
        bValue = new Date(b.createdAt);
        break;
      default:
        return 0;
    }

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4" />;
    return sortDirection === "asc" ? (
      <ArrowUp className="h-4 w-4" />
    ) : (
      <ArrowDown className="h-4 w-4" />
    );
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = sortedSchedules
        .map((s) => s.vaccinationScheduleId?.toString())
        .filter((id): id is string => id !== undefined);
      onSelectionChange(allIds);
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedItems, id]);
    } else {
      onSelectionChange(selectedItems.filter((item) => item !== id));
    }
  };

  const colors = {
    dog: {
      primary: "border-info/30 bg-info/5",
      accent: "text-info",
      badge: "bg-info text-white",
    },
    cat: {
      primary: "border-warning/30 bg-warning/5",
      accent: "text-warning",
      badge: "bg-warning text-dark",
    },
  }[activeTab];

  return (
    <div className="space-y-4">
      {/* Advanced Search & Filter Bar */}
      <Card className={colors.primary}>
        <CardHeader className="pb-3">
          <CardTitle className="font-inter-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Search className={`h-5 w-5 ${colors.accent}`} />
              Tìm kiếm và lọc nâng cao
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="font-nunito-600">
                <Download className="mr-1 h-4 w-4" />
                Xuất Excel
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAdvancedFilter(!showAdvancedFilter)}
                className="font-nunito-600"
              >
                <Filter className="mr-1 h-4 w-4" />
                {showAdvancedFilter ? "Ẩn" : "Hiện"} bộ lọc
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Basic Search */}
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            <Input
              placeholder="Tìm kiếm theo tên bệnh hoặc mô tả..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="font-nunito-500 pl-10"
            />
          </div>

          {/* Advanced Filters */}
          {showAdvancedFilter && (
            <div className="grid grid-cols-1 gap-4 rounded-lg border bg-white/50 p-4 md:grid-cols-3">
              <div className="space-y-2">
                <label className="font-nunito-600 text-dark text-sm">
                  Khoảng tuổi
                </label>
                <div className="flex gap-2">
                  <Input placeholder="Từ" className="font-nunito-500" />
                  <Input placeholder="Đến" className="font-nunito-500" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="font-nunito-600 text-dark text-sm">
                  Số liều
                </label>
                <div className="flex gap-2">
                  <Input placeholder="Từ" className="font-nunito-500" />
                  <Input placeholder="Đến" className="font-nunito-500" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="font-nunito-600 text-dark text-sm">
                  Ngày tạo
                </label>
                <Input type="date" className="font-nunito-500" />
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <span className="font-nunito-600 text-dark">
                Hiển thị {sortedSchedules.length} / {schedules.length} lịch tiêm
              </span>
              {selectedItems.length > 0 && (
                <Badge className={colors.badge}>
                  {selectedItems.length} đã chọn
                </Badge>
              )}
            </div>
            <div className="text-dark/60 flex items-center gap-2">
              <span className="font-nunito-500">Sắp xếp theo:</span>
              <Badge variant="outline" className="font-nunito-500">
                {sortField === "disease"
                  ? "Tên bệnh"
                  : sortField === "ageInterval"
                    ? "Tuổi"
                    : sortField === "doseNumber"
                      ? "Liều"
                      : "Ngày tạo"}
                {sortDirection === "asc" ? " ↑" : " ↓"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Table */}
      <Card className="bg-linen">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-primary">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-12 text-center">
                  <Checkbox
                    checked={
                      selectedItems.length === sortedSchedules.length &&
                      sortedSchedules.length > 0
                    }
                    onCheckedChange={handleSelectAll}
                    className="data-[state=checked]:text-primary border-white data-[state=checked]:bg-white"
                  />
                </TableHead>
                <TableHead className="font-nunito-700 text-white">
                  STT
                </TableHead>
                <TableHead
                  className="font-nunito-700 cursor-pointer text-white hover:bg-white/10"
                  onClick={() => handleSort("disease")}
                >
                  <div className="flex items-center gap-1">
                    Tên bệnh
                    {getSortIcon("disease")}
                  </div>
                </TableHead>
                <TableHead className="font-nunito-700 text-center text-white">
                  Loài
                </TableHead>
                <TableHead
                  className="font-nunito-700 cursor-pointer text-center text-white hover:bg-white/10"
                  onClick={() => handleSort("ageInterval")}
                >
                  <div className="flex items-center justify-center gap-1">
                    Tuổi (tháng)
                    {getSortIcon("ageInterval")}
                  </div>
                </TableHead>
                <TableHead
                  className="font-nunito-700 cursor-pointer text-center text-white hover:bg-white/10"
                  onClick={() => handleSort("doseNumber")}
                >
                  <div className="flex items-center justify-center gap-1">
                    Liều
                    {getSortIcon("doseNumber")}
                  </div>
                </TableHead>
                <TableHead
                  className="font-nunito-700 cursor-pointer text-center text-white hover:bg-white/10"
                  onClick={() => handleSort("createdAt")}
                >
                  <div className="flex items-center justify-center gap-1">
                    Ngày tạo
                    {getSortIcon("createdAt")}
                  </div>
                </TableHead>
                <TableHead className="font-nunito-700 text-center text-white">
                  Thao tác
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedSchedules.map((schedule, index) => {
                const isSelected = selectedItems.includes(
                  schedule.vaccinationScheduleId?.toString() || "",
                );

                return (
                  <TableRow
                    key={schedule.vaccinationScheduleId}
                    className={`transition-all duration-200 ${
                      isSelected
                        ? "bg-primary/5 border-primary/20"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <TableCell className="text-center">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={(checked) =>
                          handleSelectItem(
                            schedule.vaccinationScheduleId?.toString() || "",
                            !!checked,
                          )
                        }
                        className="data-[state=checked]:bg-primary"
                      />
                    </TableCell>
                    <TableCell className="font-nunito-600 text-center">
                      {index + 1}
                    </TableCell>
                    <TableCell className="font-nunito-600">
                      <div className="space-y-1">
                        <div className="font-nunito-700 text-dark">
                          {schedule.disease.name}
                        </div>
                        {schedule.disease.description && (
                          <div className="font-nunito-400 text-dark/60 text-xs">
                            {schedule.disease.description}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant="default"
                        className={
                          activeTab === "dog"
                            ? "bg-info text-white"
                            : "bg-warning text-dark"
                        }
                      >
                        {activeTab === "dog" ? "Chó" : "Mèo"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant="outline"
                        className="border-primary text-primary font-nunito-600"
                      >
                        {schedule.ageInterval} tháng
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant="outline"
                        className="font-nunito-600 border-gray-300"
                      >
                        Liều {schedule.doseNumber}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-nunito-500 text-center text-sm">
                      {formatData.formatDate(schedule.createdAt)}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0"
                        >
                          <Eye className="text-info h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0"
                        >
                          <Edit className="text-warning h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0"
                        >
                          <Trash2 className="h-3 w-3 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
