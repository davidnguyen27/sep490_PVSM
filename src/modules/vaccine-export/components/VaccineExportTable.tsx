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
import type { VaccineExport } from "../types/vaccine-export.type";

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
  if (isPending) {
    return <TableSkeleton columnCount={7} />;
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
            <TableHead>Mã xuất kho</TableHead>
            <TableHead>Ngày xuất kho</TableHead>
            <TableHead>Người tạo</TableHead>
            <TableHead>Ngày tạo</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="text-center">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={item.vaccineExportId}>
              <TableCell className="font-medium">
                {(currentPage - 1) * pageSize + index + 1}
              </TableCell>
              <TableCell className="text-primary font-medium">
                {item.exportCode}
              </TableCell>
              <TableCell>{formatData.formatDate(item.exportDate)}</TableCell>
              <TableCell>{item.createdBy}</TableCell>
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
                    <DropdownMenuItem
                      onClick={() => onViewDetail?.(item.vaccineExportId!)}
                      className="flex cursor-pointer items-center gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      Chi tiết
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onEdit?.(item.vaccineExportId!)}
                      disabled={item.isDeleted}
                      className="flex cursor-pointer items-center gap-2"
                    >
                      <Edit className="h-4 w-4" />
                      Sửa
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onDelete?.(item.vaccineExportId!)}
                      disabled={item.isDeleted}
                      className="flex cursor-pointer items-center gap-2 text-red-600 focus:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                      Xóa
                    </DropdownMenuItem>
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
