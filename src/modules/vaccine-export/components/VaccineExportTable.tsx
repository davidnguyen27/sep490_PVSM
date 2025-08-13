import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EmptyTable, TableSkeleton, ConfirmDelete } from "@/components/shared";
import { formatData } from "@/shared/utils/format.utils";
import {
  Edit,
  Trash2,
  MoreHorizontal,
  ArrowUp,
  ArrowDown,
  ArrowDownUp,
  Info,
} from "lucide-react";
import { useTableSorting } from "@/shared/hooks/useTableSorting";
import type { VaccineExport } from "../types/vaccine-export.type";

// Extended type for VaccineExport with STT
interface VaccineExportWithSTT extends VaccineExport {
  sttNumber: number;
  [key: string]: unknown; // Index signature for SortableItem compatibility
}

interface VaccineExportTableProps {
  data: VaccineExport[];
  isPending: boolean;
  currentPage: number;
  pageSize: number;
  onViewDetail?: (exportId: number) => void;
  onEdit?: (exportId: number) => void;
  onDelete?: (exportId: number) => void;
}

export function VaccineExportTable({
  data,
  isPending,
  currentPage,
  pageSize,
  onViewDetail,
  onEdit,
  onDelete,
}: VaccineExportTableProps) {
  // Use shared table sorting hook
  const { sortOrder, sortedData, handleSortClick, getSortIconName } =
    useTableSorting<VaccineExportWithSTT>({
      data: data as VaccineExportWithSTT[],
      idField: "vaccineExportId",
      currentPage,
      pageSize,
    });

  // Get sort icon component
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

  if (isPending) {
    return (
      <div className="bg-linen shadow-md">
        <TableSkeleton columnCount={7} rowCount={pageSize} />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-linen shadow-md">
        <EmptyTable />
      </div>
    );
  }

  return (
    <div className="bg-linen shadow-md">
      <Table>
        <TableHeader className="bg-primary">
          <TableRow className="hover:bg-transparent">
            <TableHead
              className={`font-nunito cursor-pointer px-4 py-2 text-center text-sm text-white transition-colors ${
                sortOrder !== null
                  ? "bg-green/20 hover:bg-green/30"
                  : "hover:bg-primary/80"
              }`}
              onClick={handleSortClick}
            >
              <div className="flex items-center justify-center gap-1">
                <span>STT</span>
                {getSortIcon()}
              </div>
            </TableHead>
            <TableHead className="font-nunito px-4 py-2 text-center text-sm text-white">
              Mã xuất kho
            </TableHead>
            <TableHead className="font-nunito px-4 py-2 text-center text-sm text-white">
              Ngày xuất kho
            </TableHead>
            <TableHead className="font-nunito px-4 py-2 text-center text-sm text-white">
              Ngày tạo
            </TableHead>
            <TableHead className="font-nunito px-4 py-2 text-center text-sm text-white">
              Người tạo
            </TableHead>
            <TableHead className="font-nunito px-4 py-2 text-center text-sm text-white">
              Trạng thái
            </TableHead>
            <TableHead className="font-nunito px-4 py-2 text-center text-sm text-white">
              Thao tác
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((item, index) => {
            const exportItem = item as VaccineExportWithSTT;
            const sttValue = exportItem.sttNumber || index + 1;

            return (
              <TableRow
                key={exportItem.vaccineExportId}
                className="hover:bg-accent/10 transition-colors duration-150"
              >
                <TableCell className="text-dark font-nunito-500 text-center text-sm">
                  {sttValue}
                </TableCell>
                <TableCell className="text-center">
                  <div className="space-y-1">
                    <p className="font-nunito-700 text-primary text-lg">
                      {exportItem.exportCode}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="font-nunito-600 text-center text-gray-900">
                  {formatData.formatDate(exportItem.exportDate)}
                </TableCell>
                <TableCell className="font-nunito-400 text-center text-gray-600">
                  {formatData.formatDateTime(exportItem.createdAt)}
                </TableCell>
                <TableCell className="font-nunito-600 text-center text-gray-900">
                  {exportItem.createdBy || "N/A"}
                </TableCell>
                <TableCell className="text-center">
                  <Badge
                    variant={exportItem.isDeleted ? "destructive" : "default"}
                    className="font-nunito-500"
                  >
                    {exportItem.isDeleted ? "Đã xóa" : "Hoạt động"}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Mở menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        className="text-info focus:text-info"
                        onClick={() =>
                          onViewDetail?.(exportItem.vaccineExportId!)
                        }
                      >
                        <Info className="text-info mr-2 h-4 w-4" />
                        Xem chi tiết
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-purple focus:text-purple"
                        onClick={() => onEdit?.(exportItem.vaccineExportId!)}
                        disabled={exportItem.isDeleted}
                      >
                        <Edit className="text-purple mr-2 h-4 w-4" />
                        Chỉnh sửa
                      </DropdownMenuItem>
                      <ConfirmDelete
                        onConfirm={() =>
                          onDelete?.(exportItem.vaccineExportId!)
                        }
                      >
                        <DropdownMenuItem
                          className="text-danger focus:text-danger"
                          disabled={exportItem.isDeleted}
                          onSelect={(e) => e.preventDefault()}
                        >
                          <Trash2 className="mr-2 h-4 w-4" color="#e63946" />
                          Xóa
                        </DropdownMenuItem>
                      </ConfirmDelete>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
