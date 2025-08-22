import { format } from "date-fns";
import { vi } from "date-fns/locale";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Button,
  Badge,
} from "@/components/ui";
import { ConfirmDelete } from "@/components/shared";
import { Edit, Trash2, Eye } from "lucide-react";
import type { Voucher } from "../types/voucher.type";

interface VoucherTableProps {
  vouchers: Voucher[];
  onEdit: (voucher: Voucher) => void;
  onDelete: (voucherId: number) => void;
  onView: (voucher: Voucher) => void;
  isLoading?: boolean;
}

export function VoucherTable({
  vouchers,
  onEdit,
  onDelete,
  onView,
  isLoading = false,
}: VoucherTableProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy", { locale: vi });
  };

  const isExpired = (expirationDate: string) => {
    return new Date(expirationDate) < new Date();
  };

  if (isLoading) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã voucher</TableHead>
              <TableHead>Tên voucher</TableHead>
              <TableHead>Điểm yêu cầu</TableHead>
              <TableHead>Giảm giá</TableHead>
              <TableHead>Ngày hết hạn</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
                </TableCell>
                <TableCell>
                  <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
                </TableCell>
                <TableCell>
                  <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
                </TableCell>
                <TableCell>
                  <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                </TableCell>
                <TableCell>
                  <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
                </TableCell>
                <TableCell>
                  <div className="h-6 w-16 animate-pulse rounded bg-gray-200" />
                </TableCell>
                <TableCell>
                  <div className="flex justify-end space-x-2">
                    <div className="h-8 w-8 animate-pulse rounded bg-gray-200" />
                    <div className="h-8 w-8 animate-pulse rounded bg-gray-200" />
                    <div className="h-8 w-8 animate-pulse rounded bg-gray-200" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã voucher</TableHead>
              <TableHead>Tên voucher</TableHead>
              <TableHead>Điểm yêu cầu</TableHead>
              <TableHead>Giảm giá</TableHead>
              <TableHead>Ngày hết hạn</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vouchers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="py-8 text-center">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <p className="text-muted-foreground">
                      Không có voucher nào được tìm thấy
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              vouchers.map((voucher) => (
                <TableRow key={voucher.voucherId}>
                  <TableCell className="font-medium">
                    {voucher.voucherCode}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{voucher.voucherName}</p>
                      <p className="text-muted-foreground line-clamp-2 text-sm">
                        {voucher.description}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {voucher.pointsRequired.toLocaleString()} điểm
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium text-green-600">
                    {formatCurrency(voucher.discountAmount)}
                  </TableCell>
                  <TableCell>
                    <span
                      className={
                        isExpired(voucher.expirationDate)
                          ? "text-red-600"
                          : "text-gray-900"
                      }
                    >
                      {formatDate(voucher.expirationDate)}
                    </span>
                  </TableCell>
                  <TableCell>
                    {voucher.isDeleted ? (
                      <Badge variant="destructive">Đã xóa</Badge>
                    ) : isExpired(voucher.expirationDate) ? (
                      <Badge variant="secondary">Hết hạn</Badge>
                    ) : (
                      <Badge variant="default">Hoạt động</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onView(voucher)}
                        title="Xem chi tiết"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(voucher)}
                        disabled={voucher.isDeleted}
                        title="Chỉnh sửa"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <ConfirmDelete
                        onConfirm={() => onDelete(voucher.voucherId!)}
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={voucher.isDeleted}
                          title="Xóa"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </ConfirmDelete>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
