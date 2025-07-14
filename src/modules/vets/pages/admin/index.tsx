import AdminLayout from "@/shared/layouts/AdminLayout";
import { PlusCircle } from "lucide-react";

// components
import { Button } from "@/components/ui";
import PageBreadcumb from "@/components/shared/PageBreadcrumb";
import SearchLabel from "@/components/shared/SearchLabel";
import Pagination from "@/components/shared/Pagination";
import { VetFilter, VetTable } from "../../components";

// hooks
import { useEffect, useState } from "react";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useVets } from "../../hooks";

export default function VetManagementPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const { data, isPending, isFetching } = useVets({
    pageNumber: page,
    pageSize: 10,
    keyWord: debouncedSearch,
  });

  const pageData = data?.data.pageData ?? [];
  const totalPages = data?.data.pageInfo.totalPage ?? 1;

  return (
    <AdminLayout>
      <div className="space-y-6 p-6">
        <div className="space-y-1">
          <h1 className="text-primary font-inter-700 text-2xl">
            Quản lý bác sĩ
          </h1>
          <PageBreadcumb items={["Bảng điều khiển", "Bác sỹ"]} />
        </div>

        <div className="bg-linen flex flex-wrap items-end gap-4 p-4 shadow-md">
          <SearchLabel value={search} onChange={setSearch} />
          <VetFilter />
          <Button
            className="font-nunito-500"
            // onClick={() => setOpenCreate(true)}
          >
            <PlusCircle /> Thêm bác sĩ
          </Button>
        </div>

        <VetTable
          vets={pageData}
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
      </div>
    </AdminLayout>
  );
}
