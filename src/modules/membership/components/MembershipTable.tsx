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
import type { Membership } from "../types/membership.type";
import { formatData } from "@/shared/utils/format.utils";
import { BadgeInfo, SquarePen, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ConfirmDelete from "@/components/shared/ConfirmDelete";
import { useMembershipDelete } from "../hooks/useMembershipDelete";

type Props = {
  data: Membership[];
  isPending: boolean;
  onEdit?: (membership: Membership) => void;
  onDelete?: (membership: Membership) => void;
};

const tableHeaders = [
  "STT",
  "Mã hội viên",
  "Tên mức hội viên",
  "Điểm tối thiểu",
  "Quyền lợi",
  "Mô tả",
  "Ngày tạo",
  "Trạng thái",
  "Thao tác",
];

export function MembershipTable({ data, isPending, onEdit, onDelete }: Props) {
  const navigate = useNavigate();
  const { mutate: deleteMembership, isPending: isDeleting } =
    useMembershipDelete();

  const handleViewDetail = (membershipId: number) => {
    navigate(`/admin/memberships?membershipId=${membershipId}`);
  };

  return (
    <div className="bg-linen font-nunito rounded-none shadow-md">
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
          <TableSkeleton columnCount={tableHeaders.length} rowCount={8} />
        ) : data.length > 0 ? (
          <TableBody>
            {data.map((item, idx) => (
              <TableRow key={item.membershipId}>
                <TableCell className="text-center">{idx + 1}</TableCell>
                <TableCell
                  className="max-w-[120px] truncate text-center"
                  title={item.membershipCode}
                >
                  {item.membershipCode}
                </TableCell>
                <TableCell
                  className="max-w-[120px] truncate text-center"
                  title={item.name}
                >
                  {item.name ?? ""}
                </TableCell>
                <TableCell className="text-center">{item.minPoints}</TableCell>
                <TableCell
                  className="max-w-[120px] truncate text-center"
                  title={item.benefits}
                >
                  {item.benefits ?? ""}
                </TableCell>
                <TableCell
                  className="max-w-[120px] truncate text-center"
                  title={item.description}
                >
                  {item.description}
                </TableCell>
                <TableCell
                  className="max-w-[120px] truncate text-center"
                  title={formatData.formatDateTime(item.createdAt)}
                >
                  {formatData.formatDateTime(item.createdAt)}
                </TableCell>
                <TableCell className="text-center">
                  {item.isDeleted ? (
                    <span className="bg-danger font-nunito inline-block rounded-full px-3 py-1 text-xs text-white">
                      Không hoạt động
                    </span>
                  ) : (
                    <span className="bg-primary font-nunito inline-block rounded-full px-3 py-1 text-xs text-white">
                      Đang hoạt động
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-3">
                    <BadgeInfo
                      size={16}
                      className="text-info cursor-pointer transition-transform hover:scale-110"
                      onClick={() => handleViewDetail(item.membershipId)}
                    />
                    <SquarePen
                      size={16}
                      className="text-purple cursor-pointer transition-transform hover:scale-110"
                      onClick={() => onEdit && onEdit(item)}
                    />
                    <ConfirmDelete
                      onConfirm={() =>
                        onDelete ? onDelete(item) : deleteMembership(item.membershipId)
                      }
                    >
                      <Trash2
                        size={16}
                        className={`cursor-pointer transition-transform hover:scale-110 ${isDeleting
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
      {!isPending && data.length === 0 && <EmptyTable />}
    </div>
  );
}
