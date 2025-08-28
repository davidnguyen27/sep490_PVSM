// components
import {
  PageBreadcrumb,
  SearchLabel,
  Pagination,
  PageLoader,
  ButtonSpinner,
  InlineLoading,
} from "@/components/shared";
import {
  VetTable,
  VetFilter,
  VetModal,
  VetModalUpdate,
  VetModalCreate,
} from "../components";
import { Button } from "@/components/ui";

// hooks
import { useState } from "react";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useVets } from "../hooks/useVets";
import { useVetDetail } from "../hooks/useVetDetail";
import { useNavigate, useSearchParams } from "react-router-dom";

// icons
import { UserCheck } from "lucide-react";

export default function VetManagementPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isCreating, setIsCreating] = useState(false);
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "deleted"
  >("active");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Get URL params for modals
  const vetId = searchParams.get("vetId");
  const action = searchParams.get("action");
  const parsedVetId = vetId ? parseInt(vetId, 10) : undefined;

  // Vet data for list view - frontend sorting handles newest first
  const debouncedSearch = useDebounce(search, 500, { leading: true });
  const { data, isPending, isFetching } = useVets({
    pageNumber: page,
    pageSize: 10,
    keyWord: debouncedSearch,
  });

  // Get vet detail for modals when needed
  const { data: selectedVet, isLoading: isLoadingVet } = useVetDetail(
    parsedVetId || null,
  );

  // Check modal states
  const isDetailMode = Boolean(parsedVetId) && action !== "edit";
  const isEditMode = Boolean(parsedVetId) && action === "edit";
  const isCreateMode = action === "create";

  const pageData = data?.data.pageData ?? [];
  const totalPages = data?.data.pageInfo.totalPage ?? 1;

  const handleCreateVet = async () => {
    setIsCreating(true);
    try {
      navigate("?action=create");
    } finally {
      // Reset loading state after navigate
      setTimeout(() => setIsCreating(false), 100);
    }
  };

  const handleCloseModal = () => {
    navigate("", { replace: true });
  };

  return (
    <PageLoader
      loading={isPending && !isFetching}
      loadingText="Đang tải danh sách bác sĩ..."
    >
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <UserCheck color="#00B8A9" />
          <h1 className="text-primary font-inter-700 text-2xl">
            Quản lý bác sĩ
          </h1>
        </div>
        <PageBreadcrumb items={["Bác sĩ"]} />

        <div className="flex items-end justify-between p-4">
          <div className="flex items-end justify-between gap-4">
            <SearchLabel value={search} onChange={setSearch} />
            <VetFilter
              onFilterChange={setStatusFilter}
              currentFilter={statusFilter}
            />
          </div>

          {/* Search loading indicator */}
          {debouncedSearch && isFetching && (
            <InlineLoading text="Đang tìm kiếm..." variant="muted" size="sm" />
          )}

          <Button
            onClick={handleCreateVet}
            disabled={isCreating}
            className="font-nunito-600 bg-primary hover:bg-secondary text-white"
          >
            {isCreating && <ButtonSpinner variant="white" size="sm" />}
            {isCreating ? "Đang tạo..." : "+ Thêm bác sĩ"}
          </Button>
        </div>

        <VetTable
          vets={pageData}
          isPending={isPending || isFetching}
          currentPage={page}
          pageSize={10}
          statusFilter={statusFilter}
        />

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) => setPage(newPage)}
        />

        {/* Detail Modal */}
        <VetModal
          open={isDetailMode}
          onClose={handleCloseModal}
          vet={selectedVet || undefined}
          isLoading={isLoadingVet}
        />

        {/* Edit Modal */}
        <VetModalUpdate
          open={isEditMode}
          onClose={handleCloseModal}
          vetId={parsedVetId}
        />

        {/* Create Modal */}
        <VetModalCreate open={isCreateMode} onClose={handleCloseModal} />
      </div>
    </PageLoader>
  );
}
