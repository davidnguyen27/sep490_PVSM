// components
import {
  PageBreadcrumb,
  PageLoader,
  SearchLabel,
  Pagination,
  ButtonSpinner,
  InlineLoading,
} from "@/components/shared";
import {
  VaccineReceiptTable,
  VaccineReceiptModalCreate,
  VaccineReceiptEditModal,
} from "../components";
import { Button } from "@/components/ui/button";
import VaccineReceiptDetailPage from "./VaccineReceiptDetailPage";

// hooks
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useVaccineReceipts, useVaccineReceiptDelete } from "../hooks";
import type { VaccineReceipt } from "../types/vaccine-receipt.type";

// icons
import { FileText, Plus } from "lucide-react";

// constants
import { VACCINE_RECEIPT_PAGE_SIZES } from "../constants";

export default function VaccineReceiptListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedReceiptForEdit, setSelectedReceiptForEdit] =
    useState<VaccineReceipt | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Set document title
  useEffect(() => {
    document.title = "PVMS | Quản lý phiếu nhập vaccine";

    return () => {
      document.title = "PVMS";
    };
  }, []);

  // Get vaccineReceiptId from URL params for view detail
  const viewReceiptIdParam = searchParams.get("vaccineReceipt");
  const selectedReceiptIdForView = viewReceiptIdParam
    ? parseInt(viewReceiptIdParam)
    : null;
  const showDetailPage = !!selectedReceiptIdForView;

  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const { data, isPending, isFetching } = useVaccineReceipts({
    pageNumber: page,
    pageSize: VACCINE_RECEIPT_PAGE_SIZES.DEFAULT,
    keyword: debouncedSearch,
  });

  const { mutate: deleteVaccineReceipt } = useVaccineReceiptDelete();

  const pageData = data?.data.pageData ?? [];
  const totalPages = data?.data.pageInfo.totalPage ?? 1;

  const handleViewDetail = (vaccineReceiptId: number) => {
    // Add vaccineReceipt query parameter to current URL
    const currentParams = new URLSearchParams(searchParams);
    currentParams.set("vaccineReceipt", vaccineReceiptId.toString());
    setSearchParams(currentParams);
  };

  const handleEdit = (vaccineReceipt: VaccineReceipt) => {
    setSelectedReceiptForEdit(vaccineReceipt);
    setShowEditModal(true);
  };

  const handleDelete = (vaccineReceiptId: number) => {
    deleteVaccineReceipt(vaccineReceiptId);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedReceiptForEdit(null);
  };

  const handleCreateVaccineReceipt = async () => {
    setIsCreating(true);
    try {
      setShowCreateModal(true);
    } finally {
      setTimeout(() => setIsCreating(false), 100);
    }
  };

  // If vaccineReceipt query param exists, show detail page instead of list
  if (showDetailPage) {
    return <VaccineReceiptDetailPage />;
  }

  return (
    <PageLoader
      loading={isPending && !isFetching}
      loadingText="Đang tải danh sách phiếu nhập vaccine..."
    >
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <FileText color="#00B8A9" />
          <h1 className="text-primary font-inter-700 text-2xl">
            Quản lý phiếu nhập vaccine
          </h1>
        </div>
        <PageBreadcrumb items={["Phiếu nhập vaccine"]} />

        <div className="bg-linen flex items-end justify-between p-4 shadow-md">
          <div className="flex items-end justify-between gap-4">
            <SearchLabel value={search} onChange={setSearch} />
            {/* TODO: Add VaccineReceiptFilter component when ready */}
            {/* <VaccineReceiptFilter /> */}
          </div>

          {/* Search loading indicator */}
          {debouncedSearch && isFetching && (
            <InlineLoading text="Đang tìm kiếm..." variant="muted" size="sm" />
          )}

          <Button
            onClick={handleCreateVaccineReceipt}
            disabled={isCreating}
            className="font-nunito-600 bg-primary hover:bg-secondary text-white"
          >
            {isCreating && <ButtonSpinner variant="white" size="sm" />}
            <Plus className="mr-2 h-4 w-4" />
            {isCreating ? "Đang tạo..." : "Thêm phiếu nhập"}
          </Button>
        </div>

        <VaccineReceiptTable
          data={pageData}
          isPending={isPending || isFetching}
          currentPage={page}
          pageSize={VACCINE_RECEIPT_PAGE_SIZES.DEFAULT}
          onViewDetail={handleViewDetail}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) => setPage(newPage)}
        />

        <VaccineReceiptModalCreate
          open={showCreateModal}
          onOpenChange={setShowCreateModal}
        />

        <VaccineReceiptEditModal
          open={showEditModal}
          onOpenChange={handleCloseEditModal}
          vaccineReceipt={selectedReceiptForEdit}
        />
      </div>
    </PageLoader>
  );
}
