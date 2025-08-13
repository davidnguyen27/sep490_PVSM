import {
  BadgeInfo,
  SquarePen,
  Trash2,
  ArrowUp,
  ArrowDown,
  ArrowDownUp,
} from "lucide-react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import TableSkeleton from "@/components/shared/TableSkeleton";
import EmptyTable from "@/components/shared/EmptyTable";
import ConfirmDelete from "@/components/shared/ConfirmDelete";

import type { Vet } from "../types/vet.type";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useVetDelete, useVetDetail } from "../hooks";
import { VetModal } from "./VetModal";

const tableHeaders = [
  "STT",
  "Mã bác sỹ",
  "Tên bác sỹ",
  "Chuyên môn",
  "Số điện thoại",
  "Trạng thái",
  "Thao tác",
];

interface Props {
  vets: Vet[];
  isPending: boolean;
  currentPage: number;
  pageSize: number;
  statusFilter: "all" | "active" | "deleted";
}

export function VetTable(props: Props) {
  const { vets, isPending, pageSize, statusFilter } = props;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);

  const vetId = searchParams.get("vetId");
  const action = searchParams.get("action");

  const { data, isFetching } = useVetDetail(vetId ? Number(vetId) : null);
  const { mutate: deleteVet, isPending: isDeleting } = useVetDelete();

  const openDetail = Boolean(vetId) && action !== "edit";

  // Handle STT sorting
  const handleSortClick = () => {
    if (sortOrder === null) {
      setSortOrder("asc");
    } else if (sortOrder === "asc") {
      setSortOrder("desc");
    } else {
      setSortOrder(null);
    }
  };

  // Sort vets: Default newest first (by vetId desc), with STT sorting option
  const getSortedVets = () => {
    // First filter by status
    const filteredVets = vets.filter((vet) => {
      if (statusFilter === "active") return !vet.isDeleted;
      if (statusFilter === "deleted") return vet.isDeleted;
      return true; // "all" - show everything
    });

    // Sort by vetId desc to show newest vets first
    const newestFirstVets = filteredVets.sort((a, b) => {
      const aId = a.vetId ?? 0;
      const bId = b.vetId ?? 0;
      return bId - aId;
    });

    if (sortOrder === null) return newestFirstVets;

    // Apply STT sorting on filtered data with correct indexing
    const indexedVets = newestFirstVets.map((vet, index) => ({
      ...vet,
      displayIndex: index + 1, // STT based on filtered data position
    }));

    return indexedVets.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.displayIndex - b.displayIndex;
      } else {
        return b.displayIndex - a.displayIndex;
      }
    });
  };

  const sortedVets = getSortedVets();

  // Get sort icon
  const getSortIcon = () => {
    if (sortOrder === "asc") {
      return <ArrowUp size={16} className="text-white" />;
    } else if (sortOrder === "desc") {
      return <ArrowDown size={16} className="text-white" />;
    } else {
      return <ArrowDownUp size={16} className="text-white/70" />;
    }
  };

  return (
    <div className="bg-linen shadow-md">
      <Table>
        <TableHeader className="bg-primary">
          <TableRow className="hover:bg-transparent">
            {tableHeaders.map((header, index) => (
              <TableHead
                key={header}
                className={`font-nunito px-4 py-2 text-center text-sm text-white ${
                  index === 0
                    ? `cursor-pointer transition-colors ${
                        sortOrder !== null
                          ? "bg-green/20 hover:bg-green/30"
                          : "hover:bg-primary/80"
                      }`
                    : ""
                }`}
                onClick={index === 0 ? handleSortClick : undefined}
              >
                {index === 0 ? (
                  <div className="flex items-center justify-center gap-1">
                    <span>{header}</span>
                    {getSortIcon()}
                  </div>
                ) : (
                  header
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {isPending ? (
          <TableSkeleton
            columnCount={tableHeaders.length}
            rowCount={pageSize}
          />
        ) : sortedVets.length > 0 ? (
          <TableBody>
            {sortedVets.map((item, idx) => {
              // Calculate STT based on sorted data position
              const sttValue = idx + 1;

              return (
                <TableRow
                  key={item.vetId}
                  className={`transition-colors duration-150 ${
                    item.isDeleted
                      ? "bg-red-50 opacity-75 hover:bg-red-100"
                      : "hover:bg-accent/10"
                  }`}
                >
                  <TableCell
                    className={`text-dark font-nunito text-center text-sm ${
                      item.isDeleted ? "text-gray-500 line-through" : ""
                    }`}
                  >
                    {sttValue}
                  </TableCell>
                  <TableCell
                    className={`text-dark font-nunito max-w-[140px] truncate text-center text-sm ${
                      item.isDeleted ? "text-gray-500 line-through" : ""
                    }`}
                  >
                    {item.vetCode}
                  </TableCell>
                  <TableCell
                    className={`text-dark font-nunito max-w-[140px] truncate text-center text-sm ${
                      item.isDeleted ? "text-gray-500 line-through" : ""
                    }`}
                  >
                    {item.name}
                  </TableCell>
                  <TableCell
                    className={`text-dark font-nunito text-center text-sm ${
                      item.isDeleted ? "text-gray-500 line-through" : ""
                    }`}
                  >
                    {item.specialization}
                  </TableCell>
                  <TableCell
                    className={`text-dark font-nunito text-center text-sm ${
                      item.isDeleted ? "text-gray-500 line-through" : ""
                    }`}
                  >
                    {item.phoneNumber}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant={item.isDeleted ? "destructive" : "default"}>
                      {item.isDeleted ? "Đã xóa" : "Hoạt động"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-3">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <BadgeInfo
                              size={16}
                              className="text-info cursor-pointer transition-transform hover:scale-110"
                              onClick={() =>
                                navigate(`?vetId=${item.vetId}`, {
                                  replace: false,
                                })
                              }
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="font-nunito">Chi tiết</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <SquarePen
                              size={16}
                              className="text-purple cursor-pointer transition-transform hover:scale-110"
                              onClick={() =>
                                navigate(`?vetId=${item.vetId}&action=edit`, {
                                  replace: false,
                                })
                              }
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="font-nunito">Chỉnh sửa</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <ConfirmDelete
                              onConfirm={() => deleteVet(item.vetId)}
                            >
                              <Trash2
                                size={16}
                                className={`cursor-pointer transition-transform hover:scale-110 ${
                                  isDeleting
                                    ? "pointer-events-none opacity-50"
                                    : "text-red-500"
                                }`}
                              />
                            </ConfirmDelete>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="font-nunito">Xóa</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        ) : null}
      </Table>

      {!isPending && sortedVets.length === 0 && <EmptyTable />}

      <VetModal
        open={openDetail}
        onClose={() => navigate("/admin/vets", { replace: true })}
        vet={data ?? undefined}
        isLoading={isFetching}
      />
    </div>
  );
}
