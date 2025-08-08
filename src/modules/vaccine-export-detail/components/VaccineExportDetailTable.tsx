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
import { EmptyTable, TableSkeleton } from "@/components/shared";
import { formatData } from "@/shared/utils/format.utils";
import { Eye, Edit, Trash2, MoreHorizontal } from "lucide-react";
import type { VaccineExportDetail } from "../types/vaccine-export-detail.type";
import { VaccineExportDetailViewModal } from "./VaccineExportDetailViewModal";
import { UpdateVaccineExportDetailModal } from "./UpdateVaccineExportDetailModal";
import { DeleteVaccineExportDetailModal } from "./DeleteVaccineExportDetailModal";

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
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">STT</TableHead>
            <TableHead>Batch vaccine</TableHead>
            <TableHead>Tên vaccine</TableHead>
            <TableHead>Số lượng</TableHead>
            <TableHead>Mục đích</TableHead>
            <TableHead>Ngày tạo</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="text-center">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={item.vaccineExportDetailId}>
              <TableCell className="font-medium">
                {(currentPage - 1) * pageSize + index + 1}
              </TableCell>
              <TableCell className="text-primary font-medium">
                {item.vaccineBatch?.batchNumber || "N/A"}
              </TableCell>
              <TableCell>
                {item.vaccineBatch?.vaccineResponseDTO?.name || "N/A"}
              </TableCell>
              <TableCell className="font-semibold">{item.quantity}</TableCell>
              <TableCell>{item.purpose}</TableCell>
              <TableCell>{formatData.formatDateTime(item.createdAt)}</TableCell>
              <TableCell>
                <Badge variant={item.isDeleted ? "destructive" : "default"}>
                  {item.isDeleted ? "Đã xóa" : "Hoạt động"}
                </Badge>
              </TableCell>
              <TableCell className="text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <VaccineExportDetailViewModal
                      exportDetailId={item.vaccineExportDetailId!}
                      trigger={
                        <DropdownMenuItem
                          onSelect={(e) => e.preventDefault()}
                          className="flex cursor-pointer items-center gap-2"
                        >
                          <Eye className="h-4 w-4" />
                          Chi tiết
                        </DropdownMenuItem>
                      }
                    />
                    <UpdateVaccineExportDetailModal
                      exportDetailId={item.vaccineExportDetailId!}
                      trigger={
                        <DropdownMenuItem
                          onSelect={(e) => e.preventDefault()}
                          disabled={item.isDeleted}
                          className="flex cursor-pointer items-center gap-2"
                        >
                          <Edit className="h-4 w-4" />
                          Sửa
                        </DropdownMenuItem>
                      }
                    />
                    <DeleteVaccineExportDetailModal
                      trigger={
                        <DropdownMenuItem
                          onSelect={(e) => e.preventDefault()}
                          disabled={item.isDeleted}
                          className="flex cursor-pointer items-center gap-2 text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                          Xóa
                        </DropdownMenuItem>
                      }
                      exportDetailId={item.vaccineExportDetailId!}
                      batchNumber={item.vaccineBatch?.batchNumber || ""}
                      vaccineName={
                        item.vaccineBatch?.vaccineResponseDTO?.name || ""
                      }
                      quantity={item.quantity}
                    />
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
