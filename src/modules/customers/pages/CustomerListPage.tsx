// components
import {
  PageBreadcrumb,
  SearchLabel,
  Pagination,
  PageLoader,
  InlineLoading,
} from "@/components/shared";
import {
  CustomerTable,
  CustomerFilter,
  CustomerEditModal,
} from "../components";
import { CustomerDetailPage } from "../index";

// hooks
import { useEffect, useState } from "react";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useCustomers, useCustomerById, useCustomerUpdate } from "../hooks";
import { useSearchParams } from "react-router-dom";

import { useCustomerDetailNavigation } from "../hooks/useCustomerDetailNavigation";

// icons
import { User } from "lucide-react";

export default function CustomerManagementPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<string>("all"); // all | active | deleted
  const [sttSortOrder, setSttSortOrder] = useState<"asc" | "desc" | null>(null);
  const [searchParams] = useSearchParams();
  const { handleGoBack } = useCustomerDetailNavigation();

  const customerId = searchParams.get("customerId");
  const action = searchParams.get("action");

  useEffect(() => {
    document.title = "PVMS | Quản lý khách hàng";

    return () => {
      document.title = "PVMS | Quản lý khách hàng";
    };
  }, []);

  // Customer data for list view - fetch with large pageSize to get most data
  const debouncedSearch = useDebounce(search, 500, { leading: true });
  const { data, isPending, isFetching } = useCustomers({
    pageNumber: 1,
    pageSize: 1000, // Get a large amount of data
    keyWord: debouncedSearch,
  });

  // Reset page to 1 when search or status changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, status]);

  const allCustomers = data?.data?.pageData ?? [];

  // Apply status filter and sort by customerId in descending order (newest first)
  const filteredData = allCustomers
    .filter((customer) => {
      if (status === "all") return true;
      if (status === "active") return !customer.isDeleted;
      if (status === "deleted") return customer.isDeleted;
      return true;
    })
    .sort((a, b) => (b.customerId ?? 0) - (a.customerId ?? 0));

  // Add STT numbers to all data first
  const dataWithSTT = filteredData.map((customer, index) => ({
    ...customer,
    sttNumber: index + 1,
  }));

  // Apply STT sorting if order is set (sort all data, not just current page)
  let sortedDataWithSTT = dataWithSTT;
  if (sttSortOrder) {
    sortedDataWithSTT = dataWithSTT.sort((a, b) => {
      if (sttSortOrder === "asc") {
        return a.sttNumber - b.sttNumber;
      } else {
        return b.sttNumber - a.sttNumber;
      }
    });

    // Re-assign STT numbers after sorting to maintain sequential order
    sortedDataWithSTT = sortedDataWithSTT.map((customer, index) => ({
      ...customer,
      sttNumber: index + 1,
    }));
  }

  // Frontend pagination after sorting
  const pageSize = 10;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const pageData = sortedDataWithSTT.slice(startIndex, endIndex);

  const totalPages = Math.ceil(sortedDataWithSTT.length / pageSize);

  // Reset page to 1 when search or status changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, status]);

  // Get customer data for edit modal
  const { data: customerData, isPending: isCustomerPending } = useCustomerById(
    customerId && action === "edit" ? Number(customerId) : null,
  );

  // Update customer hook
  const { mutate: updateCustomer, isPending: isUpdating } = useCustomerUpdate();

  // Handle STT sorting
  const handleSttSort = () => {
    if (sttSortOrder === null || sttSortOrder === "desc") {
      setSttSortOrder("asc");
    } else {
      setSttSortOrder("desc");
    }
    setPage(1); // Always reset to first page when sorting to see the results
  };

  // Check if we should show detail page
  if (customerId && action !== "edit") {
    return <CustomerDetailPage />;
  }

  // Use navigation hook to get correct route for both admin and staff
  const handleCloseModal = handleGoBack;

  const handleUpdateCustomer = (data: {
    fullName: string;
    userName: string;
    phoneNumber: string;
    email?: string;
    dateOfBirth: string;
    gender: "Male" | "Female";
    address: string;
  }) => {
    if (customerId) {
      updateCustomer(
        {
          customerId: Number(customerId),
          payload: data,
        },
        {
          onSuccess: () => {
            handleCloseModal();
          },
        },
      );
    }
  };

  return (
    <PageLoader
      loading={isPending && !isFetching}
      loadingText="Đang tải danh sách khách hàng..."
    >
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <User color="#00B8A9" />
          <h1 className="text-primary font-inter-700 text-2xl">
            Quản lý khách hàng
          </h1>
        </div>
        <PageBreadcrumb items={["Khách hàng"]} />

        <div className="flex items-end justify-between py-4">
          <div className="flex items-end justify-between gap-4">
            <SearchLabel value={search} onChange={setSearch} />
            <CustomerFilter status={status} onStatusChange={setStatus} />
          </div>

          {/* Search loading indicator */}
          {debouncedSearch && isFetching && (
            <InlineLoading text="Đang tìm kiếm..." variant="muted" size="sm" />
          )}
        </div>

        <CustomerTable
          customers={pageData}
          isPending={isPending || isFetching}
          currentPage={page}
          pageSize={pageSize}
          sttSortOrder={sttSortOrder}
          onSttSort={handleSttSort}
        />

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) => setPage(newPage)}
        />

        {/* Customer Edit Modal */}
        <CustomerEditModal
          open={Boolean(customerId && action === "edit")}
          onClose={handleCloseModal}
          customer={customerData || null}
          onSubmit={handleUpdateCustomer}
          isLoading={isCustomerPending || isUpdating}
        />
      </div>
    </PageLoader>
  );
}
