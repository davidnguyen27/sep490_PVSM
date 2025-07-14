// components
import { PageBreadcumb, SearchLabel, Pagination } from "@/components/shared";
import { PetTable, PetFilter } from "../components";

// hooks
import { useState } from "react";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { usePets } from "../hooks/usePets";

export default function PetManagementPage() {
  const [search, setSearch] = useState("");
  // const [openCreate, setOpenCreate] = useState(false);
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 400);
  const { data, isPending, isFetching } = usePets({
    pageNumber: page,
    pageSize: 10,
    keyWord: debouncedSearch,
  });

  const pageData = data?.data.pageData ?? [];
  const totalPages = data?.data.pageInfo.totalPage ?? 1;

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-1">
        <h1 className="text-primary font-inter-700 text-2xl">
          Quản lý thú cưng
        </h1>
        <PageBreadcumb items={["Bảng điều khiển", "Thú cưng"]} />
      </div>

      <div className="bg-linen flex flex-wrap items-end gap-4 p-4 shadow-md">
        <SearchLabel value={search} onChange={setSearch} />
        <PetFilter />
        {/* <Button
            className="font-nunito-500"
            onClick={() => setOpenCreate(true)}
          >
            <PlusCircle /> Tạo hồ sơ thú cưng
          </Button> */}
      </div>

      <PetTable
        pets={pageData}
        isPending={isPending || isFetching}
        currentPage={page}
        pageSize={10}
      />

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
}
