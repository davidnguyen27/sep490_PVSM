import { useNavigate, useSearchParams } from "react-router-dom";
import type { Vaccine } from "../types/vaccine.type";
import {
  BadgeInfo,
  SquarePen,
  Trash2,
  ArrowUp,
  ArrowDown,
  ArrowDownUp,
} from "lucide-react";

// components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import TableSkeleton from "@/components/shared/TableSkeleton";
import EmptyTable from "@/components/shared/EmptyTable";
import { ConfirmDeleteVaccine } from "./ConfirmDeleteVaccine";
import { VaccineDetailModal } from "./VaccineDetailModal";
import { VaccineUpdateModal } from "./VaccineUpdateModal";
import { formatData } from "@/shared/utils/format.utils";

// hooks
import { useDeleteVaccine, useVaccineDetail, useUpdateVaccine } from "../hooks";
import { useTableSorting } from "@/shared/hooks/useTableSorting";

// Extend Vaccine to make it compatible with SortableItem
interface VaccineWithSTT extends Vaccine {
  sttNumber: number;
  [key: string]: unknown; // Index signature for SortableItem compatibility
}

interface Props {
  vaccines: Vaccine[];
  isPending: boolean;
  currentPage: number;
  pageSize: number;
}

const tableHeaders = [
  "STT",
  "Hình ảnh",
  "Mã vaccine",
  "Tên vaccine",
  "Mô tả",
  "Giá (VNĐ)",
  "Trạng thái",
  "Thao tác",
];

export function VaccineTable({
  vaccines,
  isPending,
  currentPage,
  pageSize,
}: Props) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const vaccineId = searchParams.get("vaccineId");
  const action = searchParams.get("action");

  const { mutate: deleteVaccine, isPending: isDeleting } = useDeleteVaccine();
  const { mutate: updateVaccine, isPending: isUpdating } = useUpdateVaccine();

  // Use shared table sorting hook with proper typing
  const { sortOrder, sortedData, handleSortClick, getSortIconName } =
    useTableSorting<VaccineWithSTT>({
      data: vaccines as VaccineWithSTT[],
      idField: "vaccineId",
      currentPage,
      pageSize,
    });

  // Vaccine detail modal logic
  const { data: vaccineDetail, isFetching } = useVaccineDetail(
    vaccineId ? Number(vaccineId) : null,
  );
  const openDetail = Boolean(vaccineId) && action !== "edit";
  const openUpdate = Boolean(vaccineId) && action === "edit";

  const handleDelete = (vaccineId: number) => {
    deleteVaccine(vaccineId);
  };

  // Get sort icon component based on current sort order
  const getSortIcon = () => {
    const iconName = getSortIconName();
    if (iconName === "ArrowUp") {
      return <ArrowUp size={16} className="text-white" />;
    } else if (iconName === "ArrowDown") {
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
                className={`font-nunito px-4 py-2 text-center text-sm text-white ${index === 0
                  ? `cursor-pointer transition-colors ${sortOrder !== null
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
        ) : vaccines.length > 0 ? (
          <TableBody>
            {sortedData.map((item, idx) => {
              // Use STT from sorted data
              const vaccineItem = item as VaccineWithSTT;
              const sttValue = vaccineItem.sttNumber || idx + 1;

              return (
                <TableRow
                  key={vaccineItem.vaccineId}
                  className="hover:bg-accent/10 transition-colors duration-150"
                >
                  <TableCell className="text-dark font-nunito-500 text-center text-sm">
                    {sttValue}
                  </TableCell>
                  <TableCell className="text-center">
                    {vaccineItem.image ? (
                      <div className="flex justify-center">
                        <img
                          src={vaccineItem.image}
                          alt={vaccineItem.name}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex justify-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-200">
                          <span className="text-xs text-gray-400">No img</span>
                        </div>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-dark font-nunito-400 max-w-[140px] truncate text-center text-sm">
                    {vaccineItem.vaccineCode}
                  </TableCell>
                  <TableCell className="text-dark font-nunito-500 max-w-[140px] truncate text-center text-sm">
                    {vaccineItem.name}
                  </TableCell>
                  <TableCell className="text-dark font-nunito-400 max-w-[200px] truncate text-center text-sm">
                    {vaccineItem.description}
                  </TableCell>
                  <TableCell className="text-dark font-nunito-400 text-center text-sm">
                    {formatData.formatCurrency(vaccineItem.price)}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={
                        vaccineItem.status === "Active"
                          ? "default"
                          : vaccineItem.status === "Inactive"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {vaccineItem.status === "Active"
                        ? "Hoạt động"
                        : vaccineItem.status === "Inactive"
                          ? "Không hoạt động"
                          : vaccineItem.status}
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
                                navigate(
                                  `?vaccineId=${vaccineItem.vaccineId}`,
                                  {
                                    replace: false,
                                  },
                                )
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
                                navigate(
                                  `?vaccineId=${vaccineItem.vaccineId}&action=edit`,
                                  {
                                    replace: false,
                                  },
                                )
                              }
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="font-nunito">Chỉnh sửa</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <div className="flex items-center gap-2">
                        <ConfirmDeleteVaccine
                          onConfirm={() => handleDelete(vaccineItem.vaccineId!)}
                          vaccineName={vaccineItem.name}
                          isDeleting={isDeleting}
                        >
                          <button
                            type="button"
                            className={`p-1 rounded hover:bg-gray-100 ${isDeleting
                              ? "pointer-events-none opacity-50"
                              : ""
                              }`}
                          >
                            <Trash2
                              size={16}
                              className="text-danger cursor-pointer transition-transform hover:scale-110"
                            />
                          </button>
                        </ConfirmDeleteVaccine>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        ) : null}
      </Table>

      {!isPending && vaccines.length === 0 && <EmptyTable />}

      {/* Vaccine Detail Modal */}
      <VaccineDetailModal
        open={openDetail}
        onClose={() => navigate("/admin/vaccines", { replace: true })}
        vaccine={vaccineDetail}
        isLoading={isFetching}
      />

      {/* Vaccine Update Modal */}
      {openUpdate && vaccineDetail && (
        <VaccineUpdateModal
          open={openUpdate}
          onClose={() => navigate("/admin/vaccines", { replace: true })}
          onSubmit={(payload) =>
            updateVaccine({
              vaccineId: Number(vaccineId),
              payload,
            })
          }
          isSubmitting={isUpdating}
          defaultValues={vaccineDetail}
        />
      )}
    </div>
  );
}
