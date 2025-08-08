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
import { Eye, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import type { VaccineReceipt } from "../types/vaccine-receipt.type";
import {
  formatReceiptCode,
  formatReceiptDate,
  formatCreatedDate,
  formatStatus,
  getStatusVariant,
} from "../utils";

interface VaccineReceiptTableProps {
  data: VaccineReceipt[];
  isPending: boolean;
  onViewDetail: (vaccineReceiptId: number) => void;
  onEdit: (vaccineReceipt: VaccineReceipt) => void;
  onDelete: (vaccineReceiptId: number) => void;
}

export function VaccineReceiptTable({
  data,
  isPending,
  onViewDetail,
  onEdit,
  onDelete,
}: VaccineReceiptTableProps) {
  if (isPending) {
    return (
      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
        <TableSkeleton columnCount={7} />
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

  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50/80">
            <TableHead className="font-nunito-700 text-gray-900">STT</TableHead>
            <TableHead className="font-nunito-700 text-gray-900">
              Mã phiếu
            </TableHead>
            <TableHead className="font-nunito-700 text-gray-900">
              Ngày nhập
            </TableHead>
            <TableHead className="font-nunito-700 text-gray-900">
              Ngày tạo
            </TableHead>
            <TableHead className="font-nunito-700 text-gray-900">
              Người tạo
            </TableHead>
            <TableHead className="font-nunito-700 text-gray-900">
              Trạng thái
            </TableHead>
            <TableHead className="font-nunito-700 text-center text-gray-900">
              Thao tác
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow
              key={item.vaccineReceiptId}
              className="hover:bg-gray-50/50"
            >
              <TableCell className="font-nunito-600 text-gray-800">
                {index + 1}
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <p className="font-nunito-700 text-primary text-lg">
                    {formatReceiptCode(item)}
                  </p>
                </div>
              </TableCell>
              <TableCell className="font-nunito-600 text-gray-900">
                {formatReceiptDate(item)}
              </TableCell>
              <TableCell className="font-nunito-400 text-gray-600">
                {formatCreatedDate(item)}
              </TableCell>
              <TableCell className="font-nunito-600 text-gray-900">
                {item.createdBy || "N/A"}
              </TableCell>
              <TableCell>
                <Badge
                  variant={getStatusVariant(item.isDeleted)}
                  className="font-nunito-500"
                >
                  {formatStatus(item.isDeleted)}
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
                      onClick={() => onViewDetail(item.vaccineReceiptId!)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Xem chi tiết
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit(item)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Chỉnh sửa
                    </DropdownMenuItem>
                    <ConfirmDelete
                      onConfirm={() => onDelete(item.vaccineReceiptId!)}
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
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
