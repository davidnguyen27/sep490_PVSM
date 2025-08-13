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
import { useState } from "react";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useCustomers, useCustomerById, useCustomerUpdate } from "../hooks";
import { useSearchParams, useNavigate } from "react-router-dom";

// icons
import { User } from "lucide-react";

export default function CustomerManagementPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const customerId = searchParams.get("customerId");
  const action = searchParams.get("action");

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

  const pageData = data?.data.pageData ?? [];
  const totalPages = data?.data.pageInfo.totalPage ?? 1;

  const handleCloseModal = () => {
    navigate("/admin/customers", { replace: true });
  };

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
          <h1 className="text-primary font-nunito text-2xl font-bold">
            Quản lý khách hàng
          </h1>
        </div>
        <PageBreadcrumb items={["Khách hàng"]} />

        <div className="bg-linen flex items-end justify-between p-4 shadow-md">
          <div className="flex items-end justify-between gap-4">
            <SearchLabel value={search} onChange={setSearch} />
            <CustomerFilter />
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
