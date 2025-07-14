import { PlusCircle } from "lucide-react";
import type { MicrochipPayload } from "../types/payload.type";

// components
import { Button } from "@/components/ui";
import PageBreadcumb from "@/components/shared/PageBreadcrumb";
import SearchLabel from "@/components/shared/SearchLabel";
import Pagination from "@/components/shared/Pagination";
import {
  MicrochipFilter,
  MicrochipModalCreate,
  MicrochipTable,
} from "../components";

// hooks
import { useEffect, useState } from "react";
import { useMicrochipCreation, useMicrochips } from "../hooks";
import { useDebounce } from "@/shared/hooks/useDebounce";

export default function MicrochipsListPage() {
  const [search, setSearch] = useState("");
  const [openCreate, setOpenCreate] = useState(false);
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const { mutate: createMicrochip, isPending: isCreating } =
    useMicrochipCreation();
  const { data, isPending, isFetching } = useMicrochips({
    pageNumber: page,
    pageSize: 10,
    keyWord: debouncedSearch,
  });

  const pageData = data?.data.pageData ?? [];
  const totalPages = data?.data.pageInfo.totalPage ?? 1;

  const handleCreate = (payload: MicrochipPayload) => {
    createMicrochip(payload, {
      onSuccess: () => {
        setOpenCreate(false);
      },
    });
  };

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-1">
        <h1 className="text-primary font-inter-700 text-2xl">
          Quản lý microchip
        </h1>
        <PageBreadcumb items={["Bảng điều khiển", "Microchips"]} />
      </div>

      <div className="bg-linen flex flex-wrap items-end gap-4 p-4 shadow-md">
        <SearchLabel value={search} onChange={setSearch} />
        <MicrochipFilter />
        <Button className="font-nunito-500" onClick={() => setOpenCreate(true)}>
          <PlusCircle /> Thêm microchip
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
        isSubmitting={isCreating}
      />
    </div>
  );
}
