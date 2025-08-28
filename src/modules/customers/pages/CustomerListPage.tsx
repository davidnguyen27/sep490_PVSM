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

  // Customer data for list view - frontend sorting handles newest first
  const debouncedSearch = useDebounce(search, 500, { leading: true });
  const { data, isPending, isFetching } = useCustomers({
    pageNumber: page,
    pageSize: 10,
    keyWord: debouncedSearch,
  });

  // Get customer data for edit modal
  const { data: customerData, isPending: isCustomerPending } = useCustomerById(
    customerId && action === "edit" ? Number(customerId) : null,
  );

  // Update customer hook
  const { mutate: updateCustomer, isPending: isUpdating } = useCustomerUpdate();

  // Check if we should show detail page
  if (customerId && action !== "edit") {
    return <CustomerDetailPage />;
  }

  const pageData = data?.data?.pageData ?? [];
  const totalPages = data?.data?.pageInfo?.totalPage ?? 1;

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
          customers={
            status === "all"
              ? pageData
              : status === "active"
                ? pageData.filter((c) => !c.isDeleted)
                : pageData.filter((c) => c.isDeleted)
          }
          isPending={isPending || isFetching}
          currentPage={page}
          pageSize={10}
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
