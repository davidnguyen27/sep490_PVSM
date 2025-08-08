import { useDebounce } from "@/shared/hooks";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useCustomers, useCustomerById, useCustomerUpdate } from "../hooks";
import { PageBreadcrumb, Pagination, SearchLabel } from "@/components/shared";
import { CustomerTable } from "../components/CustomerTable";
import { CustomerFilter } from "../components/CustomerFilter";
import { CustomerEditModal } from "../components/CustomerEditModal";
import { CustomerDetailPage } from "../index";
import { User } from "lucide-react";

export default function CustomerManagementPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const customerId = searchParams.get("customerId");
  const action = searchParams.get("action");

  const searchDebounced = useDebounce(search, 400);
  const { data, isPending, isFetching } = useCustomers({
    pageNumber: page,
    pageSize: 10,
    keyWord: searchDebounced,
  });

  // Get customer data for edit modal
  const { data: customerData, isPending: isCustomerPending } = useCustomerById(
    customerId && action === "edit" ? Number(customerId) : null,
  );

  // Update customer hook
  const { mutate: updateCustomer, isPending: isUpdating } = useCustomerUpdate();

  const pageData = data?.data.pageData ?? [];
  const totalPages = data?.data.pageInfo.totalPage ?? 1;

  useEffect(() => {
    setPage(1);
  }, [searchDebounced]);

  // Show detail page if customerId is present and not in edit mode
  if (customerId && action !== "edit") {
    return <CustomerDetailPage />;
  }

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
    <>
      <div className="space-y-1">
        <h1 className="text-primary font-inter-700 flex items-center gap-2 text-xl">
          <User /> Quản lý khách hàng
        </h1>
        <PageBreadcrumb items={["Trang chủ", "Khách hàng"]} />
      </div>

      <div className="bg-linen flex flex-wrap items-end gap-4 p-4 shadow-md">
        <SearchLabel value={search} onChange={setSearch} />
        <CustomerFilter />
        {/* <Button
            className="font-nunito-500"
            onClick={() => setOpenCreate(true)}
          >
            <PlusCircle /> Thêm microchip
          </Button> */}
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

      {/* <MicrochipModalCreate
          open={openCreate}
          onClose={() => setOpenCreate(false)}
          submit={handleCreate}
          isSubmitting={isCreating}
        /> */}

      {/* Customer Edit Modal */}
      <CustomerEditModal
        open={Boolean(customerId && action === "edit")}
        onClose={handleCloseModal}
        customer={customerData || null}
        onSubmit={handleUpdateCustomer}
        isLoading={isCustomerPending || isUpdating}
      />
    </>
  );
}
