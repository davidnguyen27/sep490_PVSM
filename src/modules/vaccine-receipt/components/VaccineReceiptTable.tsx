import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { Badge, Button } from "@/components/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EmptyTable, TableSkeleton, ConfirmDelete } from "@/components/shared";
import {
  Eye,
  MoreHorizontal,
  Edit,
  Trash2,
  ArrowUp,
  ArrowDown,
  ArrowDownUp,
} from "lucide-react";
import type { VaccineReceipt } from "../types/vaccine-receipt.type";
import { useTableSorting } from "@/shared/hooks/useTableSorting";
import {
  formatReceiptCode,
  formatReceiptDate,
  formatCreatedDate,
  formatStatus,
  getStatusVariant,
} from "../utils";

// Extended type for VaccineReceipt with STT
interface VaccineReceiptWithSTT extends VaccineReceipt {
  sttNumber: number;
  [key: string]: unknown; // Index signature for SortableItem compatibility
}

interface VaccineReceiptTableProps {
  data: VaccineReceipt[];
  isPending: boolean;
  currentPage: number;
  pageSize: number;
  onViewDetail: (vaccineReceiptId: number) => void;
  onEdit: (vaccineReceipt: VaccineReceipt) => void;
  onDelete: (vaccineReceiptId: number) => void;
}

export function VaccineReceiptTable({
  data,
  isPending,
  currentPage,
  pageSize,
  onViewDetail,
  onEdit,
  onDelete,
}: VaccineReceiptTableProps) {
  // Use shared table sorting hook
  const { sortOrder, sortedData, handleSortClick, getSortIconName } =
    useTableSorting<VaccineReceiptWithSTT>({
      data: data as VaccineReceiptWithSTT[],
      idField: "vaccineReceiptId",
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

  if (!data.length) {
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
              Mã phiếu
            </TableHead>
            <TableHead className="font-nunito px-4 py-2 text-center text-sm text-white">
              Ngày nhập
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
            const receiptItem = item as VaccineReceiptWithSTT;
            const sttValue = receiptItem.sttNumber || index + 1;

            return (
              <TableRow
                key={receiptItem.vaccineReceiptId}
                className="hover:bg-accent/10 transition-colors duration-150"
              >
                <TableCell className="text-dark font-nunito-500 text-center text-sm">
                  {sttValue}
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <p className="font-nunito-700 text-primary text-lg">
                      {formatReceiptCode(receiptItem)}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="font-nunito-600 text-gray-900">
                  {formatReceiptDate(receiptItem)}
                </TableCell>
                <TableCell className="font-nunito-400 text-gray-600">
                  {formatCreatedDate(receiptItem)}
                </TableCell>
                <TableCell className="font-nunito-600 text-gray-900">
                  {receiptItem.createdBy || "N/A"}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={getStatusVariant(receiptItem.isDeleted)}
                    className="font-nunito-500"
                  >
                    {formatStatus(receiptItem.isDeleted)}
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
                        onClick={() =>
                          onViewDetail(receiptItem.vaccineReceiptId!)
                        }
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Xem chi tiết
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(receiptItem)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Chỉnh sửa
                      </DropdownMenuItem>
                      <ConfirmDelete
                        onConfirm={() =>
                          onDelete(receiptItem.vaccineReceiptId!)
                        }
                      >
                        <DropdownMenuItem
                          className="text-red-600 focus:text-red-600"
                          onSelect={(e) => e.preventDefault()}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
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
