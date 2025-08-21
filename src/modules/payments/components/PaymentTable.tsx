import {
  BadgeInfo,
  Trash2,
  ArrowUp,
  ArrowDown,
  ArrowDownUp,
  CreditCard,
  Banknote,
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

import type { Payment } from "../types/payment.type";
import { formatData } from "@/shared/utils/format.utils";

const tableHeaders = [
  "STT",
  "Mã thanh toán",
  "Khách hàng",
  "Số tiền",
  "Phương thức",
  "Trạng thái",
  "Ngày thanh toán",
  "Thao tác",
];

interface Props {
  payments: Payment[];
  isPending: boolean;
  currentPage: number;
  pageSize: number;
  onViewDetail: (payment: Payment) => void;
  onDelete?: (payment: Payment) => void;
}

export function PaymentTable({
  payments,
  isPending,
  currentPage,
  pageSize,
  onViewDetail,
  onDelete,
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

  const getSortIcon = (column: string) => {
    if (sortColumn !== column) {
      return <ArrowDownUp className="ml-1 h-4 w-4" />;
    }
    return sortDirection === "asc" ? (
      <ArrowUp className="ml-1 h-4 w-4" />
    ) : (
      <ArrowDown className="ml-1 h-4 w-4" />
    );
  };

  const getPaymentStatusText = (status: number) => {
    switch (status) {
      case 1:
        return "Chờ thanh toán";
      case 2:
        return "Đã thanh toán";
      case 3:
        return "Đã hủy";
      case 4:
        return "Hoàn tiền";
      default:
        return "Không xác định";
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method.toLowerCase()) {
      case "cash":
        return <Banknote className="h-4 w-4" />;
      case "payos":
      case "banking":
      case "banktransfer":
        return <CreditCard className="h-4 w-4" />;
      default:
        return <CreditCard className="h-4 w-4" />;
    }
  };

  const getPaymentMethodText = (method: string) => {
    switch (method.toLowerCase()) {
      case "cash":
        return "Tiền mặt";
      case "banktransfer":
        return "Chuyển khoản";
      default:
        return method;
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
                className="font-nunito px-4 py-2 text-center text-sm text-white"
                onClick={() => {
                  if (index > 0 && index < tableHeaders.length - 1) {
                    handleSort(header);
                  }
                }}
              >
                {index === 0 ? (
                  header
                ) : (
                  <div className="flex items-center justify-center">
                    <span>{header}</span>
                    {index > 0 && index < tableHeaders.length - 1
                      ? getSortIcon(header)
                      : null}
                  </div>
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
        ) : payments.length > 0 ? (
          <TableBody>
            {payments.map((payment, index) => (
              <TableRow
                key={payment.paymentId}
                className={`transition-colors duration-150 ${
                  payment.isDeleted
                    ? "bg-red-50 opacity-75 hover:bg-red-100"
                    : "hover:bg-accent/10"
                }`}
              >
                <TableCell
                  className={`text-dark font-nunito text-center text-sm ${
                    payment.isDeleted ? "text-gray-500 line-through" : ""
                  }`}
                >
                  {(currentPage - 1) * pageSize + index + 1}
                </TableCell>
                <TableCell
                  className={`text-dark font-nunito max-w-[140px] truncate text-center text-sm ${
                    payment.isDeleted ? "text-gray-500 line-through" : ""
                  }`}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="truncate" title={payment.paymentCode}>
                      {payment.paymentCode}
                    </span>
                    {payment.isDeleted && (
                      <Badge variant="destructive" className="text-xs">
                        Đã xóa
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell
                  className={`text-dark font-nunito max-w-[140px] truncate text-center text-sm ${
                    payment.isDeleted ? "text-gray-500 line-through" : ""
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <span
                      className="truncate"
                      title={`ID: ${payment.customerId}`}
                    >
                      ID: {payment.customerId}
                    </span>
                    <span
                      className="text-muted-foreground truncate text-sm"
                      title={`Cuộc hẹn: ${payment.appointmentDetailId}`}
                    >
                      Cuộc hẹn: {payment.appointmentDetailId}
                    </span>
                  </div>
                </TableCell>
                <TableCell
                  className={`text-dark font-nunito text-center text-sm ${
                    payment.isDeleted ? "text-gray-500 line-through" : ""
                  }`}
                >
                  <span
                    className="truncate"
                    title={formatData.formatCurrency(payment.amount)}
                  >
                    {formatData.formatCurrency(payment.amount)}
                  </span>
                </TableCell>
                <TableCell
                  className={`text-dark font-nunito text-center text-sm ${
                    payment.isDeleted ? "text-gray-500 line-through" : ""
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    {getPaymentMethodIcon(payment.paymentMethod)}
                    <span
                      className="capitalize"
                      title={getPaymentMethodText(payment.paymentMethod)}
                    >
                      {getPaymentMethodText(payment.paymentMethod)}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="font-nunito text-center">
                  {payment.isDeleted ? (
                    <Badge variant="destructive">Đã xóa</Badge>
                  ) : payment.paymentStatus === 1 ? (
                    <Badge className="text-warning border-warning bg-yellow-50">
                      {getPaymentStatusText(payment.paymentStatus)}
                    </Badge>
                  ) : (
                    <Badge variant="default">
                      {getPaymentStatusText(payment.paymentStatus)}
                    </Badge>
                  )}
                </TableCell>
                <TableCell
                  className={`text-dark font-nunito text-center text-sm ${
                    payment.isDeleted ? "text-gray-500 line-through" : ""
                  }`}
                >
                  <span
                    className="truncate"
                    title={formatData.formatDate(payment.paymentDate)}
                  >
                    {formatData.formatDate(payment.paymentDate)}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-3">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <BadgeInfo
                            size={16}
                            className="text-info cursor-pointer transition-transform hover:scale-110"
                            onClick={() => onViewDetail(payment)}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="font-nunito">Xem chi tiết</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    {onDelete && !payment.isDeleted && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Trash2
                              size={16}
                              className="cursor-pointer text-red-500 transition-transform hover:scale-110"
                              onClick={() => onDelete(payment)}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="font-nunito">Xóa thanh toán</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : null}
      </Table>

      {!isPending && payments.length === 0 && <EmptyTable />}
    </div>
  );
}
