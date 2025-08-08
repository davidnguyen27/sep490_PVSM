// components
import { PageBreadcrumb } from "@/components/shared";
import {
  FilterSection,
  ResultsSection,
  VaccineReceiptModalCreate,
  VaccineReceiptEditModal,
} from "../components";
import VaccineReceiptDetailPage from "./VaccineReceiptDetailPage";

// hooks
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useVaccineReceipts, useVaccineReceiptDelete } from "../hooks";
import type { VaccineReceipt } from "../types/vaccine-receipt.type";

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

  // If vaccineReceipt query param exists, show detail page instead of list
  if (showDetailPage) {
    return <VaccineReceiptDetailPage />;
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="space-y-2 bg-white p-6">
        <h1 className="text-primary font-inter-700 text-3xl">
          Quản lý phiếu nhập vaccine
        </h1>
        <PageBreadcrumb items={["Trang chủ", "Phiếu nhập vaccine"]} />
      </div>

      <FilterSection
        search={search}
        onSearchChange={setSearch}
        onCreateClick={() => setShowCreateModal(true)}
      />

      <ResultsSection
        vaccineReceipts={pageData}
        isPending={isPending || isFetching}
        currentPage={page}
        pageSize={VACCINE_RECEIPT_PAGE_SIZES.DEFAULT}
        searchKeyword={search}
        totalPages={totalPages}
        onPageChange={(newPage) => setPage(newPage)}
        onViewDetail={handleViewDetail}
        onEdit={handleEdit}
        onDelete={handleDelete}
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
  );
}
