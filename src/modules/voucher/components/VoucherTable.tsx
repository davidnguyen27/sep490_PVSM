import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Badge,
} from "@/components/ui";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ConfirmDelete, TableSkeleton, EmptyTable } from "@/components/shared";
import {
  BadgeInfo,
  SquarePen,
  Trash2,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import type { Voucher } from "../types/voucher.type";
import { formatData } from "@/shared/utils/format.utils";

interface VoucherTableProps {
  vouchers: (Voucher & { sttNumber?: number })[];
  onEdit: (voucher: Voucher) => void;
  onDelete: (voucherId: number) => void;
  onView: (voucher: Voucher) => void;
  isLoading?: boolean;
  pageSize?: number;
  sttSortOrder?: "asc" | "desc" | null;
  onSttSort?: () => void;
}

const tableHeaders = [
  "STT",
  "Mã voucher",
  "Tên voucher",
  "Điểm yêu cầu",
  "Giảm giá (%)",
  "Ngày hết hạn",
  "Trạng thái",
  "Thao tác",
];

export function VoucherTable({
  vouchers,
  onEdit,
  onDelete,
  onView,
  isLoading = false,
  pageSize = 10,
  sttSortOrder = null,
  onSttSort,
}: VoucherTableProps) {
  const isExpired = (expirationDate: string) => {
    return new Date(expirationDate) < new Date();
  };

  // Get sort icon for STT column
  const getSortIcon = () => {
    if (sttSortOrder === "asc") {
      return <ArrowUp size={14} className="text-white" />;
    } else if (sttSortOrder === "desc") {
      return <ArrowDown size={14} className="text-white" />;
    } else {
      return <ArrowUpDown size={14} className="text-white/70" />;
    }
  };

  if (isLoading) {
    return (
      <div className="bg-linen shadow-md">
        <Table>
          <TableHeader className="bg-primary">
            <TableRow className="hover:bg-transparent">
              {tableHeaders.map((header) => (
                <TableHead
                  key={header}
                  className="font-nunito px-4 py-2 text-center text-sm text-white"
                >
                  {header === "STT" && onSttSort ? (
                    <div className="flex items-center justify-center gap-1">
                      <span>{header}</span>
                      <button
                        onClick={onSttSort}
                        className="flex items-center justify-center rounded p-1 transition-colors hover:bg-white/10"
                        title="Sắp xếp theo STT"
                      >
                        {getSortIcon()}
                      </button>
                    </div>
                  ) : (
                    header
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableSkeleton
            columnCount={tableHeaders.length}
            rowCount={pageSize}
          />
        </Table>
      </div>
    );
  }

  return (
    <div className="bg-linen shadow-md">
      <Table>
        <TableHeader className="bg-primary">
          <TableRow className="hover:bg-transparent">
            {tableHeaders.map((header) => (
              <TableHead
                key={header}
                className="font-nunito px-4 py-2 text-center text-sm text-white"
              >
                {header === "STT" && onSttSort ? (
                  <div className="flex items-center justify-center gap-1">
                    <span>{header}</span>
                    <button
                      onClick={onSttSort}
                      className="flex items-center justify-center rounded p-1 transition-colors hover:bg-white/10"
                      title="Sắp xếp theo STT"
                    >
                      {getSortIcon()}
                    </button>
                  </div>
                ) : (
                  header
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {vouchers.length > 0 ? (
          <TableBody>
            {vouchers.map((voucher, index) => (
              <TableRow
                key={voucher.voucherId}
                className="hover:bg-accent/10 transition-colors duration-150"
              >
                <TableCell className="text-dark font-nunito-500 text-center text-sm">
                  {voucher.sttNumber || index + 1}
                </TableCell>
                <TableCell className="text-dark font-nunito-400 max-w-[140px] truncate text-center text-sm">
                  {voucher.voucherCode}
                </TableCell>
                <TableCell className="text-center">
                  <div>
                    <p className="text-dark font-nunito-500 text-sm">
                      {voucher.voucherName}
                    </p>
                    <p className="text-muted-foreground font-nunito-400 line-clamp-2 text-xs">
                      {voucher.description}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="secondary" className="font-nunito-400">
                    {voucher.pointsRequired.toLocaleString()} điểm
                  </Badge>
                </TableCell>
                <TableCell className="font-nunito-500 text-center text-sm text-green-600">
                  {voucher.discountAmount}
                </TableCell>
                <TableCell className="text-dark font-nunito-400 text-center text-sm">
                  <span
                    className={
                      isExpired(voucher.expirationDate)
                        ? "text-red-600"
                        : "text-gray-900"
                    }
                  >
                    {formatData.formatDateTime(voucher.expirationDate)}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  {voucher.isDeleted ? (
                    <Badge variant="destructive">Đã xóa</Badge>
                  ) : isExpired(voucher.expirationDate) ? (
                    <Badge variant="secondary">Hết hạn</Badge>
                  ) : (
                    <Badge variant="default">Hoạt động</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-3">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <BadgeInfo
                            size={16}
                            className="text-info cursor-pointer transition-transform hover:scale-110"
                            onClick={() => onView(voucher)}
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
                            onClick={() => onEdit(voucher)}
                            style={{
                              opacity: voucher.isDeleted ? 0.5 : 1,
                              pointerEvents: voucher.isDeleted
                                ? "none"
                                : "auto",
                            }}
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
                            onConfirm={() => onDelete(voucher.voucherId!)}
                          >
                            <Trash2
                              size={16}
                              className="text-danger cursor-pointer transition-transform hover:scale-110"
                              style={{
                                opacity: voucher.isDeleted ? 0.5 : 1,
                                pointerEvents: voucher.isDeleted
                                  ? "none"
                                  : "auto",
                              }}
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
            ))}
          </TableBody>
        ) : null}
      </Table>

      {!isLoading && vouchers.length === 0 && <EmptyTable />}
    </div>
  );
}
