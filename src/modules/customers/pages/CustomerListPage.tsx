import { useDebounce } from "@/shared/hooks";
import { useEffect, useState } from "react";
import { useCustomers } from "../hooks/useCustomers";
import { PageBreadcrumb, Pagination, SearchLabel } from "@/components/shared";
import { CustomerTable } from "../components/CustomerTable";
import { CustomerFilter } from "../components/CustomerFilter";

export default function CustomerManagementPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const searchDebounced = useDebounce(search, 400);
  const { data, isPending, isFetching } = useCustomers({
    pageNumber: page,
    pageSize: 10,
    keyWord: searchDebounced,
  });

  const pageData = data?.data.pageData ?? [];
  const totalPages = data?.data.pageInfo.totalPage ?? 1;

  useEffect(() => {
    setPage(1);
  }, [searchDebounced]);

  return (
    <>
      <div className="space-y-1">
        <h1 className="text-primary font-inter-700 text-xl">
          Quản lý khách hàng
        </h1>
        <PageBreadcrumb items={["Dashboard", "Khách hàng"]} />
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
    </>
  );
}
