import { useNavigate, useSearchParams } from "react-router-dom";
import type { MicrochipItem } from "../../microchip-item/types/microchip-item.type";
import { BadgeInfo, SquarePen, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
import { useMicrochipDetail, useMicrochipUpdate } from "../hooks";
import { useDeleteMicrochipItem } from "../../microchip-item/hooks/useDeleteMicrochipItem";
import { formatData } from "@/shared/utils/format.utils";

interface Props {
  microchips: MicrochipItem[];
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
  const { mutate: deleteMicrochipItem, isPending: isDeleting } =
    useDeleteMicrochipItem();

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
                key={item.microchipItemId}
                className="hover:bg-accent/10 transition-colors duration-150"
              >
                <TableCell className="text-dark font-nunito text-center text-sm">
                  {(currentPage - 1) * pageSize + idx + 1}
                </TableCell>
                <TableCell className="text-dark font-nunito max-w-[140px] truncate text-center text-sm">
                  {item.microchipResponse.microchipCode}
                </TableCell>
                <TableCell className="text-dark font-nunito max-w-[140px] truncate text-center text-sm">
                  {item.microchipResponse.name}
                </TableCell>
                <TableCell className="text-dark font-nunito text-center text-sm">
                  {item.microchipResponse.description}
                </TableCell>
                <TableCell className="text-dark font-nunito text-center text-sm">
                  {formatData.formatCurrency(item.microchipResponse.price)}
                </TableCell>
                <TableCell className="text-dark font-nunito text-center text-sm">
                  {item.microchipResponse.status === "Active" ? (
                    <Badge variant="default">Hoạt động</Badge>
                  ) : (
                    <Badge variant="destructive">Không hoạt động</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-3">
                    <BadgeInfo
                      size={16}
                      className="text-info cursor-pointer transition-transform hover:scale-110"
                      onClick={() =>
                        navigate(
                          `?microchipId=${item.microchipResponse.microchipId}`,
                          {
                            replace: false,
                          },
                        )
                      }
                    />
                    <SquarePen
                      size={16}
                      className="text-purple cursor-pointer transition-transform hover:scale-110"
                      onClick={() =>
                        navigate(
                          `?microchipId=${item.microchipResponse.microchipId}&action=edit`,
                          {
                            replace: false,
                          },
                        )
                      }
                    />
                    <ConfirmDelete
                      onConfirm={() =>
                        deleteMicrochipItem(item.microchipItemId)
                      }
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
                  location: payload.location,
                  installationDate: payload.installationDate,
                },
              },
            })
          }
          isSubmitting={isUpdating}
          defaultValues={{
            microchipCode: data.microchipCode,
            name: data.name,
            description: data.description,
            price: data.price,
            notes: data.notes,
            createMicrochipItemRequest: {
              petId: 0,
              location: "",
              installationDate: new Date().toISOString().split("T")[0],
            },
          }}
        />
      )}
    </div>
  );
}
