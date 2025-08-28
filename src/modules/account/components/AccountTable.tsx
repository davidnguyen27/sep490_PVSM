import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EmptyTable, TableSkeleton } from "@/components/shared";
import type { Account } from "../types/account.type";
import { UserRole } from "@/shared/constants/roles.constants";
import { SquarePen, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { ArrowUp, ArrowDown, ArrowDownUp } from "lucide-react";
import { AccountConfirmModal } from "./AccountConfirmModal";
import { useAccountDelete } from "../hooks/useAccountDelete";
import { AccountUpdateModal } from "./AccountUpdateModal";

const ROLE_LABELS: Record<number, string> = {
  [UserRole.ADMIN]: "Quản trị viên",
  [UserRole.STAFF]: "Nhân viên",
  [UserRole.VET]: "Bác sĩ",
  [UserRole.CUSTOMER]: "Khách hàng",
};

const tableHeaders = ["STT", "Email", "Role", "Thao tác"];

interface Props {
  accounts: Account[];
  isPending: boolean;
  currentPage: number;
  pageSize: number;
}

export function AccountTable({
  accounts,
  isPending,
  currentPage,
  pageSize,
}: Props) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState<Account | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
  const deleteAccount = useAccountDelete();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [accountToUpdate, setAccountToUpdate] = useState<Account | null>(null);

  const handleDeleteClick = (account: Account) => {
    setAccountToDelete(account);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (accountToDelete?.accountId) {
      deleteAccount.mutate(accountToDelete.accountId, {
        onSuccess: () => {
          setShowDeleteModal(false);
          setAccountToDelete(null);
        },
      });
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setAccountToDelete(null);
  };

  // Handle edit
  const handleEditClick = (account: Account) => {
    setAccountToUpdate(account);
    setShowUpdateModal(true);
  };

  // Handle STT sorting
  const handleSortClick = () => {
    if (sortOrder === null) {
      setSortOrder("asc");
    } else if (sortOrder === "asc") {
      setSortOrder("desc");
    } else {
      setSortOrder(null);
    }
  };

  // Sort accounts: Default newest first (by accountId desc), with STT sorting option
  const getSortedAccounts = () => {
    const sorted = [...accounts].sort((a, b) => {
      const aId = a.accountId ?? 0;
      const bId = b.accountId ?? 0;
      return bId - aId;
    });

    if (sortOrder === null) return sorted;

    const indexedAccounts = sorted.map((account, index) => ({
      ...account,
      originalIndex: (currentPage - 1) * pageSize + index + 1,
    }));

    return indexedAccounts.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.originalIndex - b.originalIndex;
      } else {
        return b.originalIndex - a.originalIndex;
      }
    });
  };

  const sortedAccounts = getSortedAccounts();

  // Get sort icon
  const getSortIcon = () => {
    if (sortOrder === "asc") {
      return <ArrowUp size={16} className="text-white" />;
    } else if (sortOrder === "desc") {
      return <ArrowDown size={16} className="text-white" />;
    } else {
      return <ArrowDownUp size={16} className="text-white/70" />;
    }
  };

  return (
    <div className="bg-linen shadow-md">
      <Table>
        <TableHeader className="bg-primary">
          <TableRow className="hover:bg-transparent">
            {tableHeaders.map((header, index) => (
              <TableHead
                key={header}
                className={`font-nunito px-4 py-2 text-center text-sm text-white ${
                  index === 0
                    ? `cursor-pointer transition-colors ${
                        sortOrder !== null
                          ? "bg-green/20 hover:bg-green/30"
                          : "hover:bg-primary/80"
                      }`
                    : ""
                }`}
                onClick={index === 0 ? handleSortClick : undefined}
              >
                {index === 0 ? (
                  <div className="flex items-center justify-center gap-1">
                    <span>{header}</span>
                    {getSortIcon()}
                  </div>
                ) : (
                  header
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        {isPending ? (
          <TableSkeleton columnCount={4} rowCount={pageSize} />
        ) : sortedAccounts.length > 0 ? (
          <TableBody>
            {sortedAccounts.map((item, idx) => (
              <TableRow
                key={item.accountId || `account-${idx}`}
                className="hover:bg-accent/10 transition-colors duration-150"
              >
                <TableCell className="text-dark font-nunito-500 text-center text-sm">
                  {(currentPage - 1) * pageSize + idx + 1}
                </TableCell>
                <TableCell className="text-dark font-nunito-400 text-center text-sm">
                  {item.email}
                </TableCell>
                <TableCell className="text-dark font-nunito-400 text-center text-sm">
                  {ROLE_LABELS[item.role] || item.role}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-3">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <SquarePen
                            size={16}
                            className="text-purple cursor-pointer transition-transform hover:scale-110"
                            onClick={() => handleEditClick(item)}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="font-nunito">Chỉnh sửa</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Trash2
                            size={16}
                            className="text-danger cursor-pointer transition-transform hover:scale-110"
                            onClick={() => handleDeleteClick(item)}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="font-nunito">Xóa</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : null}
      </Table>
      {!isPending && accounts.length === 0 && <EmptyTable />}
      <AccountConfirmModal
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
        email={accountToDelete?.email}
        isPending={deleteAccount.isPending}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
      <AccountUpdateModal
        open={showUpdateModal}
        onOpenChange={setShowUpdateModal}
        account={accountToUpdate}
      />
    </div>
  );
}
