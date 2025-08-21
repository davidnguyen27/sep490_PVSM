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
// ...
import { EmptyTable, TableSkeleton } from "@/components/shared";
import { formatData } from "@/shared/utils/format.utils";
import { Eye } from "lucide-react";
import type { VaccineExportDetail } from "../types/vaccine-export-detail.type";
import { VaccineExportDetailViewModal } from "./VaccineExportDetailViewModal";

interface VaccineExportDetailTableProps {
  data: VaccineExportDetail[];
  isPending: boolean;
  currentPage?: number;
  pageSize?: number;
}

export function VaccineExportDetailTable({
  data,
  isPending,
  currentPage = 1,
  pageSize = 10,
}: VaccineExportDetailTableProps) {
  if (isPending) {
    return <TableSkeleton columnCount={8} />;
  }

  if (!data || data.length === 0) {
    return <EmptyTable />;
  }

  return (
    <div className="bg-linen rounded-none">
      <Table>
        <TableHeader>
          <TableRow className="bg-primary hover:bg-primary">
            <TableHead className="font-nunito text-center text-white">
              STT
            </TableHead>
            <TableHead className="font-nunito text-center text-white">
              Batch vaccine
            </TableHead>
            <TableHead className="font-nunito text-center text-white">
              Tên vaccine
            </TableHead>
            <TableHead className="font-nunito text-center text-white">
              Số lượng
            </TableHead>
            <TableHead className="font-nunito text-center text-white">
              Mục đích
            </TableHead>
            <TableHead className="font-nunito text-center text-white">
              Ngày tạo
            </TableHead>
            <TableHead className="font-nunito text-center text-white">
              Trạng thái
            </TableHead>
            <TableHead className="font-nunito text-center text-white">
              Thao tác
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={item.vaccineExportDetailId}>
              <TableCell className="font-nunito text-center">
                {(currentPage - 1) * pageSize + index + 1}
              </TableCell>
              <TableCell className="text-primary font-nunito-600 text-center">
                {item.vaccineBatch?.batchNumber || "N/A"}
              </TableCell>
              <TableCell className="font-nunito text-center">
                {item.vaccineBatch?.vaccineResponseDTO?.name || "N/A"}
              </TableCell>
              <TableCell className="font-nunito text-center">
                {item.quantity}
              </TableCell>
              <TableCell className="font-nunito text-center">
                {item.purpose}
              </TableCell>
              <TableCell className="font-nunito text-center">
                {formatData.formatDateTime(item.createdAt)}
              </TableCell>
              <TableCell className="font-nunito text-center">
                <Badge variant={item.isDeleted ? "destructive" : "default"}>
                  {item.isDeleted ? "Đã xóa" : "Hoạt động"}
                </Badge>
              </TableCell>
              <TableCell className="text-center">
                <VaccineExportDetailViewModal
                  exportDetailId={item.vaccineExportDetailId!}
                  trigger={
                    <Button
                      variant="ghost"
                      className="flex h-8 items-center gap-2 px-3 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                    >
                      <Eye className="h-4 w-4" />
                      Chi tiết
                    </Button>
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
