import { useNavigate, useSearchParams } from "react-router-dom";
import type { Microchip } from "../types/microchip.type";
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
import { MicrochipModal } from "./MicrochipModal";
import { MicrochipModalUpdate } from "./MicrochipModalUpdate";

// hooks
import {
  useMicrochipDelete,
  useMicrochipDetail,
  useMicrochipUpdate,
} from "../hooks";

interface Props {
  microchips: Microchip[];
  isPending: boolean;
  currentPage: number;
  pageSize: number;
}

const tableHeaders = [
  "STT",
  "Mã vi mạch",
  "Tên microchip",
  "Mô tả ngắn",
  "Giá (VNĐ)",
  "Trạng thái",
  "Thao tác",
];

export function MicrochipTable({
  microchips,
  isPending,
  currentPage,
  pageSize,
}: Props) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const microchipId = searchParams.get("microchipId");
  const action = searchParams.get("action");

  const { data, isFetching } = useMicrochipDetail(
    microchipId ? Number(microchipId) : null,
  );
  const { mutate: updateMicrochip, isPending: isUpdating } =
    useMicrochipUpdate();
  const { mutate: deleteMicrochip, isPending: isDeleting } =
    useMicrochipDelete();

  const openDetail = Boolean(microchipId) && action !== "edit";
  const openUpdate = Boolean(microchipId) && action === "edit";

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
        ) : microchips.length > 0 ? (
          <TableBody>
            {microchips.map((item, idx) => (
              <TableRow
                key={item.microchipId}
                className="hover:bg-accent/10 transition-colors duration-150"
              >
                <TableCell className="text-dark font-nunito text-center text-sm">
                  {(currentPage - 1) * pageSize + idx + 1}
                </TableCell>
                <TableCell className="text-dark font-nunito max-w-[140px] truncate text-center text-sm">
                  {item.microchipCode}
                </TableCell>
                <TableCell className="text-dark font-nunito max-w-[140px] truncate text-center text-sm">
                  {item.name}
                </TableCell>
                <TableCell className="text-dark font-nunito text-center text-sm">
                  {item.description}
                </TableCell>
                <TableCell className="text-dark font-nunito text-center text-sm">
                  {item.price}
                </TableCell>
                <TableCell className="text-dark font-nunito text-center text-sm">
                  {item.status}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-3">
                    <BadgeInfo
                      size={16}
                      className="text-info cursor-pointer transition-transform hover:scale-110"
                      onClick={() =>
                        navigate(`?microchipId=${item.microchipId}`, {
                          replace: false,
                        })
                      }
                    />
                    <SquarePen
                      size={16}
                      className="text-purple cursor-pointer transition-transform hover:scale-110"
                      onClick={() =>
                        navigate(
                          `?microchipId=${item.microchipId}&action=edit`,
                          {
                            replace: false,
                          },
                        )
                      }
                    />
                    <ConfirmDelete
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
                    </ConfirmDelete>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : null}
      </Table>

      {!isPending && microchips.length === 0 && <EmptyTable />}

      <MicrochipModal
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
              payload: {
                microchipCode: payload.microchipCode,
                name: payload.name,
                description: payload.description,
                price: payload.price,
                notes: payload.notes,
                createMicrochipItemRequest: {
                  petId: payload.petId,
                  name: payload.itemName,
                  description: payload.itemDescription,
                  location: payload.location,
                  installationDate: payload.installationDate,
                },
              },
            })
          }
          isSubmitting={isUpdating}
          defaultValues={data}
        />
      )}
    </div>
  );
}
