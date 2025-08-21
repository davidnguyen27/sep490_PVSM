import { Syringe, Plus } from "lucide-react";

// components
import { Button } from "@/components/ui/button";
import {
  PageBreadcrumb,
  SearchLabel,
  Pagination,
  PageLoader,
  ButtonSpinner,
  InlineLoading,
} from "@/components/shared";
import { VaccineTable, VaccineModalCreate } from "../components";

// hooks
import { useEffect, useState } from "react";
import { useVaccines, useCreateVaccine } from "../hooks";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { VaccinePayload } from "../types/vaccine.payload.type";

export default function VaccineListPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const debouncedSearch = useDebounce(search, 500, { leading: true });

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const { mutate: createVaccine, isPending: isCreatingVaccine } =
    useCreateVaccine();

  const { data, isPending, isFetching } = useVaccines({
    pageNumber: page,
    pageSize: 10,
    keyWord: debouncedSearch,
  });

  // Check if we should show create modal from URL params
  const action = searchParams.get("action");
  const isCreateMode = action === "create";

  const pageData = data?.data.pageData ?? [];
  const totalPages = data?.data.pageInfo.totalPage ?? 1;

  const handleCreate = (payload: VaccinePayload) => {
    createVaccine(payload, {
      onSuccess: () => {
        navigate("", { replace: true });
      },
    });
  };

  const handleCreateVaccine = async () => {
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
      loadingText="Đang tải danh sách vaccine..."
    >
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Syringe color="#00B8A9" />
          <h1 className="text-primary font-inter-700 text-2xl">
            Quản lý vaccine
          </h1>
        </div>
        <PageBreadcrumb items={["Danh sách vắc-xin"]} />

        <div className="flex items-end justify-between">
          <div className="flex items-end justify-between">
            <SearchLabel value={search} onChange={setSearch} />
          </div>

          {/* Search loading indicator */}
          {debouncedSearch && isFetching && (
            <InlineLoading text="Đang tìm kiếm..." variant="muted" size="sm" />
          )}

          <Button
            onClick={handleCreateVaccine}
            disabled={isCreating}
            className="font-nunito-600 bg-primary hover:bg-secondary text-white"
          >
            {isCreating && <ButtonSpinner variant="white" size="sm" />}
            <Plus className="mr-2 h-4 w-4" />
            {isCreating ? "Đang tạo..." : "Thêm vaccine"}
          </Button>
        </div>

        <VaccineTable
          vaccines={pageData}
          isPending={isPending || isFetching}
          currentPage={page}
          pageSize={10}
        />

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) => setPage(newPage)}
        />

        {/* Create Modal */}
        <VaccineModalCreate
          open={isCreateMode}
          onClose={handleCloseModal}
          onSubmit={handleCreate}
          isSubmitting={isCreatingVaccine}
        />
      </div>
    </PageLoader>
  );
}
