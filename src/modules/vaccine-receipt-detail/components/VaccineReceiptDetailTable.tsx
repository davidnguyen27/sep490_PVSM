import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { Badge } from "@/components/ui";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EmptyTable, TableSkeleton, ConfirmDelete } from "@/components/shared";
import { MoreHorizontal, Trash2, Edit } from "lucide-react";
import type { VaccineReceiptDetail } from "../types/vaccine-receipt-detal.type";
import { useDeleteVaccineReceiptDetail } from "../hooks/useDelete";

interface VaccineReceiptDetailTableProps {
  data: VaccineReceiptDetail[];
  isPending: boolean;
  onEdit?: (item: VaccineReceiptDetail) => void;
}

export function VaccineReceiptDetailTable({
  data,
  isPending,
  onEdit,
}: VaccineReceiptDetailTableProps) {
  const { mutate: deleteDetail } = useDeleteVaccineReceiptDetail();

  const handleConfirmDelete = (item: VaccineReceiptDetail) => {
    if (item.vaccineReceiptDetailId) {
      deleteDetail(item.vaccineReceiptDetailId);
    }
  };
  if (isPending) {
    return (
      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
        <TableSkeleton columnCount={6} />
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
        <EmptyTable />
      </div>
    );
  }

  const formatVaccineStatus = (status: string): string => {
    switch (status?.toLowerCase()) {
      case "active":
        return "Hoạt động";
      case "inactive":
        return "Không hoạt động";
      case "expired":
        return "Hết hạn";
      default:
        return status || "N/A";
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "default";
      case "inactive":
        return "secondary";
      case "expired":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50/80">
            <TableHead className="font-nunito-700 text-gray-900">STT</TableHead>
            <TableHead className="font-nunito-700 text-gray-900">
              Lô vaccine
            </TableHead>
            <TableHead className="font-nunito-700 text-gray-900">
              Nhà cung cấp
            </TableHead>
            <TableHead className="font-nunito-700 text-gray-900">
              Số lượng
            </TableHead>
            <TableHead className="font-nunito-700 text-gray-900">
              Trạng thái
            </TableHead>
            <TableHead className="font-nunito-700 text-gray-900">
              Ghi chú
            </TableHead>
            <TableHead className="font-nunito-700 text-gray-900">
              Thao tác
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow
              key={item.vaccineReceiptDetailId}
              className="hover:bg-gray-50/50"
            >
              <TableCell className="font-nunito-600 text-gray-800">
                {index + 1}
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <p className="font-nunito-600 text-gray-900">
                    {item.vaccineBatch?.batchNumber || "N/A"}
                  </p>
                </div>
              </TableCell>
              <TableCell className="font-nunito-500 text-gray-900">
                {item.suppiler || "N/A"}
              </TableCell>
              <TableCell className="font-nunito-600 text-gray-900">
                {item.quantity?.toLocaleString("vi-VN") || 0}
              </TableCell>
              <TableCell>
                <Badge
                  variant={getStatusVariant(item.vaccineStatus)}
                  className="font-nunito-500"
                >
                  {formatVaccineStatus(item.vaccineStatus)}
                </Badge>
              </TableCell>
              <TableCell className="font-nunito-400 max-w-xs truncate text-gray-600">
                {item.notes || "Không có ghi chú"}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Mở menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {onEdit && (
                      <DropdownMenuItem
                        onClick={() => onEdit(item)}
                        className="text-blue-600 focus:text-blue-600"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Sửa
                      </DropdownMenuItem>
                    )}
                    <ConfirmDelete onConfirm={() => handleConfirmDelete(item)}>
                      <DropdownMenuItem
                        onSelect={(e) => e.preventDefault()}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Xóa
                      </DropdownMenuItem>
                    </ConfirmDelete>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
