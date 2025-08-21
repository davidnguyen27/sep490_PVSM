import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Phone, Eye } from "lucide-react";
import type { Membership } from "../types/membership.type";

interface CustomerTableProps {
  customers: Membership["customer"];
  onViewDetail?: (customer: Membership["customer"][number]) => void;
}

export function CustomerTable({ customers, onViewDetail }: CustomerTableProps) {
  return (
    <div className="hidden overflow-x-auto rounded-none border md:block">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-16 text-center font-semibold text-gray-900">
              STT
            </TableHead>
            <TableHead className="min-w-[120px] text-center font-semibold text-gray-900">
              Mã khách hàng
            </TableHead>
            <TableHead className="min-w-[200px] text-center font-semibold text-gray-900">
              Họ tên
            </TableHead>
            <TableHead className="min-w-[140px] text-center font-semibold text-gray-900">
              Số điện thoại
            </TableHead>
            <TableHead className="min-w-[120px] text-center font-semibold text-gray-900">
              Điểm hiện tại
            </TableHead>
            <TableHead className="min-w-[120px] text-center font-semibold text-gray-900">
              Điểm đổi được
            </TableHead>
            <TableHead className="min-w-[140px] text-center font-semibold text-gray-900">
              Tổng chi tiêu
            </TableHead>
            <TableHead className="min-w-[120px] text-center font-semibold text-gray-900">
              Thao tác
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer, index) => (
            <TableRow
              key={customer.customerId}
              className="transition-colors hover:bg-gray-50"
            >
              <TableCell className="text-center font-medium">
                {index + 1}
              </TableCell>
              <TableCell className="text-center">
                <span className="rounded border border-blue-200 bg-blue-50 px-2 py-1 font-mono text-sm text-blue-700">
                  {customer.customerCode}
                </span>
              </TableCell>
              <TableCell className="text-center">
                <div className="font-medium text-gray-900">
                  {customer.fullName}
                </div>
                {customer.accountResponseDTO?.email && (
                  <div className="text-xs text-gray-500">
                    {customer.accountResponseDTO.email}
                  </div>
                )}
              </TableCell>
              <TableCell className="text-center">
                <div className="flex items-center justify-center space-x-1">
                  <Phone className="h-3 w-3 text-gray-500" />
                  <span className="text-sm">{customer.phoneNumber}</span>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <div className="rounded border border-blue-200 bg-blue-50 px-2 py-1 font-semibold text-blue-600">
                  {customer.currentPoints?.toLocaleString() || 0}
                </div>
              </TableCell>
              <TableCell className="text-center">
                <div className="rounded border border-green-200 bg-green-50 px-2 py-1 font-semibold text-green-600">
                  {customer.redeemablePoints?.toLocaleString() || 0}
                </div>
              </TableCell>
              <TableCell className="text-center">
                <div className="rounded border border-purple-200 bg-purple-50 px-2 py-1 font-semibold text-purple-600">
                  {customer.totalSpent?.toLocaleString() || 0} VNĐ
                </div>
              </TableCell>
              <TableCell className="text-center">
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-none transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                  onClick={() => onViewDetail && onViewDetail(customer)}
                >
                  <Eye className="mr-1 h-3 w-3" />
                  Chi tiết
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
