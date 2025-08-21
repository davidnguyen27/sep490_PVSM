import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import TableSkeleton from "@/components/shared/TableSkeleton";
import EmptyTable from "@/components/shared/EmptyTable";
import type { Address } from "../types/address.type";
import { Edit, Trash2 } from "lucide-react";

interface Props {
  data: Address[];
  isLoading: boolean;
  onEdit: (address: Address) => void;
  onDelete: (address: Address) => void;
}

const tableHeaders = ["STT", "Mã địa chỉ", "Địa chỉ", "Thao tác"];

export function AddressTable({ data, isLoading, onEdit, onDelete }: Props) {
  return (
    <div className="rounded-none border bg-white shadow-md">
      <Table>
        <TableHeader className="bg-primary">
          <TableRow className="hover:bg-transparent">
            {tableHeaders.map((header) => (
              <TableHead
                key={header}
                className="font-nunito px-4 py-3 text-center text-sm font-semibold text-white"
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        {isLoading ? (
          <TableSkeleton columnCount={tableHeaders.length} rowCount={8} />
        ) : data.length > 0 ? (
          <TableBody>
            {data.map((address, index) => (
              <TableRow key={address.addressId} className="hover:bg-gray-50">
                <TableCell className="text-center font-medium">
                  {index + 1}
                </TableCell>
                <TableCell className="text-center">
                  #{address.addressId}
                </TableCell>
                <TableCell className="px-4 py-3">
                  <div className="max-w-md">
                    <p className="line-clamp-2 text-sm text-gray-900">
                      {address.location}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 rounded-none p-0"
                      onClick={() => onEdit(address)}
                      title="Chỉnh sửa"
                    >
                      <Edit className="h-4 w-4 text-blue-600" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 rounded-none border-red-200 p-0 hover:bg-red-50"
                      onClick={() => onDelete(address)}
                      title="Xóa"
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : null}
      </Table>
      {!isLoading && data.length === 0 && <EmptyTable />}
    </div>
  );
}
