import { BadgeInfo, SquarePen, Trash2 } from "lucide-react";

// components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableSkeleton from "@/components/shared/TableSkeleton";
import EmptyTable from "@/components/shared/EmptyTable";
import ConfirmDelete from "@/components/shared/ConfirmDelete";

import type { Vet } from "../types/vet.type";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useVetDelete, useVetDetail } from "../hooks";
import { VetModal } from "./VetModal";

const tableHeaders = [
  "STT",
  "Mã bác sỹ",
  "Tên bác sỹ",
  "Chuyên môn",
  "Số điện thoại",
  "Hành động",
];

interface Props {
  vets: Vet[];
  isPending: boolean;
  currentPage: number;
  pageSize: number;
}

export function VetTable({ vets, isPending, currentPage, pageSize }: Props) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const vetId = searchParams.get("vetId");
  const action = searchParams.get("action");

  const { data, isFetching } = useVetDetail(vetId ? Number(vetId) : null);
  const { mutate: deleteVet, isPending: isDeleting } = useVetDelete();

  const openDetail = Boolean(vetId) && action !== "edit";

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
        ) : vets.length > 0 ? (
          <TableBody>
            {vets.map((item, idx) => (
              <TableRow
                key={item.vetId}
                className="hover:bg-accent/10 transition-colors duration-150"
              >
                <TableCell className="text-dark font-nunito text-center text-sm">
                  {(currentPage - 1) * pageSize + idx + 1}
                </TableCell>
                <TableCell className="text-dark font-nunito max-w-[140px] truncate text-center text-sm">
                  {item.vetCode}
                </TableCell>
                <TableCell className="text-dark font-nunito max-w-[140px] truncate text-center text-sm">
                  {item.name}
                </TableCell>
                <TableCell className="text-dark font-nunito text-center text-sm">
                  {item.specialization}
                </TableCell>
                <TableCell className="text-dark font-nunito text-center text-sm">
                  {item.phoneNumber}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-3">
                    <BadgeInfo
                      size={16}
                      className="text-info cursor-pointer transition-transform hover:scale-110"
                      onClick={() =>
                        navigate(`?vetId=${item.vetId}`, {
                          replace: false,
                        })
                      }
                    />
                    <SquarePen
                      size={16}
                      className="text-purple cursor-pointer transition-transform hover:scale-110"
                      // onClick={() =>
                      //   navigate(
                      //     `?microchipId=${item.microchipId}&action=edit`,
                      //     {
                      //       replace: false,
                      //     },
                      //   )
                      // }
                    />
                    <ConfirmDelete onConfirm={() => deleteVet(item.vetId)}>
                      <Trash2
                        size={16}
                        className={`cursor-pointer transition-transform hover:scale-110 ${
                          isDeleting
                            ? "pointer-events-none opacity-50"
                            : "text-danger"
                        }`}
                      />
                    </ConfirmDelete>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : null}
      </Table>

      {!isPending && vets.length === 0 && <EmptyTable />}

      <VetModal
        open={openDetail}
        onClose={() => navigate("/admin/vets", { replace: true })}
        vet={data ?? undefined}
        isLoading={isFetching}
      />
    </div>
  );
}
