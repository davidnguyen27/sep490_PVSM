import { useState } from "react";

// components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import TableSkeleton from "@/components/shared/TableSkeleton";
import EmptyTable from "@/components/shared/EmptyTable";

import type { VaccineSchedule } from "../types/vaccine-schedule.type";
import { formatData } from "@/shared/utils/format.utils";

const tableHeaders = [
  "STT",
  "Bệnh",
  "Loài",
  "Khoảng cách tiêm (tuần)",
  "Liều",
  "Ngày tạo",
  "Thao tác",
];

// Headers for grouped mode (no disease column)
const groupedHeaders = [
  "STT",
  "Loài",
  "Khoảng cách tiêm (tuần)",
  "Liều",
  "Ngày tạo",
  "Thao tác",
];

interface Props {
  schedules: VaccineSchedule[];
  isPending: boolean;
  currentPage: number;
  pageSize: number;
  isGrouped?: boolean;
}

export function VaccineScheduleTable({
  schedules,
  isPending,
  currentPage,
  pageSize,
  isGrouped = false,
}: Props) {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("desc");
    }
  };

  const getSpeciesBadge = (species: string) => {
    switch (species.toLowerCase()) {
      case "dog":
        return (
          <Badge
            variant="default"
            className="bg-info font-nunito-600 text-white"
          >
            Chó
          </Badge>
        );
      case "cat":
        return (
          <Badge
            variant="default"
            className="bg-warning text-dark font-nunito-600"
          >
            Mèo
          </Badge>
        );
      default:
        return (
          <Badge
            variant="outline"
            className="font-nunito-600 text-dark border-dark"
          >
            {species}
          </Badge>
        );
    }
  };

  const currentHeaders = isGrouped ? groupedHeaders : tableHeaders;

  return (
    <div
      className={`${isGrouped ? "rounded-none" : "bg-linen rounded-lg shadow-md"}`}
    >
      <Table>
        <TableHeader className={`${isGrouped ? "bg-linen" : "bg-primary"}`}>
          <TableRow className="hover:bg-transparent">
            {currentHeaders.map((header, index) => (
              <TableHead
                key={header}
                className={`font-nunito-700 px-4 py-3 text-center text-sm ${
                  isGrouped ? "text-dark" : "text-white"
                }`}
                onClick={() => {
                  if (index > 0 && index < currentHeaders.length) {
                    handleSort(header);
                  }
                }}
              >
                {index === 0 ? (
                  header
                ) : (
                  <div className="flex items-center justify-center">
                    <span>{header}</span>
                  </div>
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {isPending ? (
          <TableSkeleton
            columnCount={currentHeaders.length}
            rowCount={pageSize}
          />
        ) : schedules.length > 0 ? (
          <TableBody>
            {schedules.map((schedule, index) => (
              <TableRow
                key={schedule.vaccinationScheduleId}
                className={`transition-all duration-200 ${
                  isGrouped
                    ? "border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
                    : "hover:bg-accent/10"
                }`}
              >
                <TableCell className="text-dark font-nunito-600 text-center text-sm">
                  {(currentPage - 1) * pageSize + index + 1}
                </TableCell>
                {!isGrouped && (
                  <TableCell className="text-dark font-nunito-600 max-w-[200px] text-center text-sm">
                    <div className="flex flex-col items-center gap-1">
                      <span
                        className="font-nunito-700 text-dark truncate"
                        title={schedule.disease.name}
                      >
                        {schedule.disease.name}
                      </span>
                      {schedule.disease.description && (
                        <span
                          className="text-muted-foreground font-nunito-400 truncate text-xs"
                          title={schedule.disease.description}
                        >
                          {schedule.disease.description}
                        </span>
                      )}
                    </div>
                  </TableCell>
                )}
                <TableCell className="font-nunito-600 text-center">
                  {getSpeciesBadge(schedule.species)}
                </TableCell>
                <TableCell className="text-dark font-nunito-600 text-center text-sm">
                  <span className="font-nunito-700 text-primary">
                    {schedule.ageInterval} tuần
                  </span>
                </TableCell>
                <TableCell className="text-dark font-nunito-600 text-center text-sm">
                  <Badge
                    variant="outline"
                    className="font-nunito-600 text-dark border-primary"
                  >
                    Liều {schedule.doseNumber}
                  </Badge>
                </TableCell>
                <TableCell className="text-dark font-nunito-600 text-center text-sm">
                  <span
                    className="truncate"
                    title={formatData.formatDate(schedule.createdAt)}
                  >
                    {formatData.formatDate(schedule.createdAt)}
                  </span>
                </TableCell>
                <TableCell className="text-dark font-nunito-600 text-center text-sm">
                  <div className="flex justify-center gap-2">
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : null}
      </Table>

      {!isPending && schedules.length === 0 && <EmptyTable />}
    </div>
  );
}
