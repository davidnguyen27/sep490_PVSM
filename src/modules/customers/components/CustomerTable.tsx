import { BadgeInfo, SquarePen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Customer } from "../types/customer.type";
import { EmptyTable, TableSkeleton } from "@/components/shared";

const tableHeaders = [
  "STT",
  "Mã khách hàng",
  "Tên khách hàng",
  "Ngày sinh",
  "Số điện thoại",
  "Địa chỉ",
  "Hành động",
];

interface Props {
  customers: Customer[];
  isPending: boolean;
  currentPage: number;
  pageSize: number;
}

export function CustomerTable({
  customers,
  isPending,
  currentPage,
  pageSize,
}: Props) {
  const navigate = useNavigate();

  return (
    <div className="bg-linen shadow-md">
      <Table>
        <TableHeader className="bg-primary">
          <TableRow className="hover:bg-transparent">
            {tableHeaders.map((header) => (
              <TableHead
                key={header}
                className="font-nunito px-4 py-2 text-center text-sm text-white"
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {isPending ? (
          <TableSkeleton
            columnCount={tableHeaders.length}
            rowCount={pageSize}
          />
        ) : customers.length > 0 ? (
          <TableBody>
            {customers.map((item, idx) => (
              <TableRow
                key={item.customerId}
                className="hover:bg-accent/10 transition-colors duration-150"
              >
                <TableCell className="text-dark font-nunito text-center text-sm">
                  {(currentPage - 1) * pageSize + idx + 1}
                </TableCell>
                <TableCell className="text-dark font-nunito max-w-[140px] truncate text-center text-sm">
                  {item.customerCode}
                </TableCell>
                <TableCell className="text-dark font-nunito max-w-[140px] truncate text-center text-sm">
                  {item.fullName}
                </TableCell>
                <TableCell className="text-dark font-nunito text-center text-sm">
                  {item.dateOfBirth}
                </TableCell>
                <TableCell className="text-dark font-nunito text-center text-sm">
                  {item.phoneNumber}
                </TableCell>
                <TableCell className="text-dark font-nunito text-center text-sm">
                  {item.address}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-3">
                    <BadgeInfo
                      size={16}
                      className="text-info cursor-pointer transition-transform hover:scale-110"
                      onClick={() =>
                        navigate(`?customerId=${item.customerId}`, {
                          replace: false,
                        })
                      }
                    />
                    <SquarePen
                      size={16}
                      className="text-purple cursor-pointer transition-transform hover:scale-110"
                      onClick={() =>
                        navigate(`?customerId=${item.customerId}&action=edit`, {
                          replace: false,
                        })
                      }
                    />
                    {/* <ConfirmDelete
                      onConfirm={() => deleteMicrochip(item.microchipId)}
                    >
                      <Trash2
                        size={16}
                        className={`cursor-pointer transition-transform hover:scale-110 ${
                          isDeleting
                            ? "pointer-events-none opacity-50"
                            : "text-danger"
                        }`}
                      />
                    </ConfirmDelete> */}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : null}
      </Table>

      {!isPending && customers.length === 0 && <EmptyTable />}

      {/* <MicrochipModal
        open={openDetail}
        onClose={() => navigate("/admin/microchips", { replace: true })}
        microchip={data ?? undefined}
        isLoading={isFetching}
      />

      {openUpdate && data && (
        <MicrochipModalUpdate
          open={openUpdate}
          onClose={() => navigate("/admin/microchips", { replace: true })}
          submit={(payload) =>
            updateMicrochip({
              microchipId: Number(microchipId),
              payload,
            })
          }
          isSubmitting={isUpdating}
          defaultValues={data}
        />
      )} */}
    </div>
  );
}
