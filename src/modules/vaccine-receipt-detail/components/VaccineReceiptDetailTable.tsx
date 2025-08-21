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
import { EmptyTable, TableSkeleton } from "@/components/shared";
import { Eye } from "lucide-react";
import type { VaccineReceiptDetail } from "../types/vaccine-receipt-detal.type";

interface VaccineReceiptDetailTableProps {
  data: VaccineReceiptDetail[];
  isPending: boolean;
  onViewDetail?: (item: VaccineReceiptDetail) => void;
}

export function VaccineReceiptDetailTable({
  data,
  isPending,
  onViewDetail,
}: VaccineReceiptDetailTableProps) {
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
    <div className="bg-linen overflow-hidden rounded-none border border-gray-100">
      <Table>
        <TableHeader>
          <TableRow className="bg-primary hover:bg-primary">
            <TableHead className="font-nunito-500 text-white">STT</TableHead>
            <TableHead className="font-nunito-500 text-white">
              Lô vaccine
            </TableHead>
            <TableHead className="font-nunito-500 text-white">
              Nhà cung cấp
            </TableHead>
            <TableHead className="font-nunito-500 text-white">
              Số lượng
            </TableHead>
            <TableHead className="font-nunito-500 text-white">
              Trạng thái
            </TableHead>
            <TableHead className="font-nunito-500 text-white">
              Ghi chú
            </TableHead>
            <TableHead className="font-nunito-500 text-white">
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
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewDetail?.(item)}
                  className="h-8 px-3 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Xem chi tiết
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
