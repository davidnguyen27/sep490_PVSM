import { useEffect, useState } from "react";
import { useMemberships } from "../hooks/useMemberships";
import { useDebounce } from "@/shared/hooks/useDebounce";
import {
  PageLoader,
  Pagination,
  SearchLabel,
  PageBreadcrumb,
} from "@/components/shared";
import { MembershipTable } from "../components/MembershipTable";
import MembershipUpdateModal from "../components/MembershipUpdateModal";
import { MembershipCreateModal } from "../components/MembershipCreateModal";
import MembershipConfirmDeleteModal from "../components/MembershipConfirmDeleteModal";
import { useMembershipDelete } from "../hooks/useMembershipDelete";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

import type { Membership } from "../types/membership.type";

export default function MemberShipListPage() {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingMembership, setDeletingMembership] =
    useState<Membership | null>(null);
  const deleteMutation = useMembershipDelete();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedMembership, setSelectedMembership] =
    useState<Membership | null>(null);

  const debouncedSearch = useDebounce(search, 500, { leading: true });

  useEffect(() => {
    document.title = "PVMS | Danh sách hội viên";
    return () => {
      document.title = "PVMS | Danh sách hội viên";
    };
  }, []);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const { data, isPending, isFetching, refetch } = useMemberships({
    pageNumber: page,
    pageSize: 10,
    keyword: debouncedSearch,
  });

  const pageData = data?.data.pageData ?? [];
  const totalPages = data?.data.pageInfo.totalPage ?? 1;

  const handleEdit = (membership: Membership) => {
    setSelectedMembership(membership);
    setUpdateModalOpen(true);
  };

  const handleUpdateSuccess = () => {
    setUpdateModalOpen(false);
    setSelectedMembership(null);
    refetch();
  };

  const handleDelete = (membership: Membership) => {
    setDeletingMembership(membership);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!deletingMembership) return;
    deleteMutation.mutate(deletingMembership.membershipId, {
      onSuccess: () => {
        setDeleteModalOpen(false);
        setDeletingMembership(null);
        refetch();
      },
      onError: () => {
        setDeleteModalOpen(false);
        setDeletingMembership(null);
      },
    });
  };

  return (
    <PageLoader
      loading={isPending && !isFetching}
      loadingText="Đang tải danh sách hội viên..."
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-primary font-inter-700 text-2xl">
            Danh sách hội viên
          </h1>
        </div>
        <PageBreadcrumb items={[{ label: "Quản lý hội viên" }]} />

        <div className="flex items-end justify-between space-x-2">
          <SearchLabel value={search} onChange={setSearch} />
          <Button
            className="bg-primary flex items-center gap-2 text-white"
            onClick={() => setCreateModalOpen(true)}
          >
            <Plus size={18} />
            Thêm hội viên
          </Button>
        </div>
        <MembershipTable
          data={pageData}
          isPending={isPending}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <MembershipConfirmDeleteModal
          open={deleteModalOpen}
          onClose={() => {
            setDeleteModalOpen(false);
            setDeletingMembership(null);
          }}
          onConfirm={handleConfirmDelete}
          membership={deletingMembership}
          isLoading={deleteMutation.isPending}
        />
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
        <MembershipUpdateModal
          open={updateModalOpen}
          onClose={() => setUpdateModalOpen(false)}
          membership={selectedMembership}
          onSuccess={handleUpdateSuccess}
        />
        <MembershipCreateModal
          open={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onSuccess={() => {
            setCreateModalOpen(false);
            refetch();
          }}
        />
      </div>
    </PageLoader>
  );
}
