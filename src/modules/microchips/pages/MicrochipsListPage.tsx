import { Cpu, PlusCircle } from "lucide-react";
import type { MicrochipSchema } from "../schemas/microchip.schema";
import type { MicrochipItem } from "../../microchip-item/types/microchip-item.type";

// components
import { Button } from "@/components/ui";
import {
  PageBreadcrumb,
  SearchLabel,
  Pagination,
  PageLoader,
  ButtonSpinner,
  InlineLoading,
} from "@/components/shared";
import {
  MicrochipFilter,
  MicrochipModalCreate,
  MicrochipTable,
} from "../components";

// hooks
import { useEffect, useState } from "react";
import { useMicrochipCreation } from "../hooks";
import { useMicrochipItems } from "../../microchip-item/hooks/useMicrochipItems";
import { useDebounce } from "@/shared/hooks/useDebounce";

export default function MicrochipsListPage() {
  const [search, setSearch] = useState("");
  const [openCreate, setOpenCreate] = useState(false);
  const [page, setPage] = useState(1);
  const [isCreating, setIsCreating] = useState(false);
  const [status, setStatus] = useState<string>("active");

  const debouncedSearch = useDebounce(search, 500, { leading: true });

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, status]);

  // Set document title for Microchip Management page
  useEffect(() => {
    document.title = "PVMS | Quản lý microchip";
    return () => {
      document.title = "PVMS | Quản lý microchip";
    };
  }, []);

  const { mutate: createMicrochip, isPending: isCreatingMicrochip } =
    useMicrochipCreation();
  const { data, isPending, isFetching } = useMicrochipItems({
    pageNumber: page,
    pageSize: 10,
    keyWord: debouncedSearch,
    isUsed: false,
  });

  let pageData: MicrochipItem[] = data?.data.pageData ?? [];
  if (status === "active") {
    pageData = pageData.filter(
      (item) => item.microchipResponse.isDeleted === false,
    );
  } else if (status === "deleted") {
    pageData = pageData.filter(
      (item) => item.microchipResponse.isDeleted === true,
    );
  }
  const totalPages = data?.data.pageInfo.totalPage ?? 1;

  const handleCreate = (payload: MicrochipSchema) => {
    createMicrochip(payload, {
      onSuccess: () => {
        setOpenCreate(false);
      },
    });
  };

  const handleCreateMicrochip = async () => {
    setIsCreating(true);
    try {
      setOpenCreate(true);
    } finally {
      setTimeout(() => setIsCreating(false), 100);
    }
  };

  return (
    <PageLoader
      loading={isPending && !isFetching}
      loadingText="Đang tải danh sách microchip..."
    >
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Cpu color="#00B8A9" />
          <h1 className="text-primary font-inter-700 text-2xl">
            Quản lý microchip
          </h1>
        </div>
        <PageBreadcrumb items={["Microchips"]} />

        <div className="flex items-end justify-between p-4">
          <div className="flex items-end justify-between gap-4">
            <SearchLabel value={search} onChange={setSearch} />
            <MicrochipFilter status={status} setStatus={setStatus} />
          </div>

          {/* Search loading indicator */}
          {debouncedSearch && isFetching && (
            <InlineLoading text="Đang tìm kiếm..." variant="muted" size="sm" />
          )}

          <Button
            onClick={handleCreateMicrochip}
            disabled={isCreating}
            className="font-nunito-600 bg-primary hover:bg-secondary text-white"
          >
            {isCreating && <ButtonSpinner variant="white" size="sm" />}
            <PlusCircle className="mr-2 h-4 w-4" />
            {isCreating ? "Đang tạo..." : "Thêm microchip"}
          </Button>
        </div>

        <MicrochipTable
          microchips={pageData}
          isPending={isPending || isFetching}
          currentPage={page}
          pageSize={10}
        />

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) => setPage(newPage)}
        />

        <MicrochipModalCreate
          open={openCreate}
          onClose={() => setOpenCreate(false)}
          submit={handleCreate}
          isSubmitting={isCreatingMicrochip}
        />
      </div>
    </PageLoader>
  );
}
