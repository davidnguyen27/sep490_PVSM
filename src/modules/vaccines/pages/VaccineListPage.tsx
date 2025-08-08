import { PlusCircle, Syringe } from "lucide-react";

// components
import { Button } from "@/components/ui/button";
import PageBreadcumb from "@/components/shared/PageBreadcrumb";
import SearchLabel from "@/components/shared/SearchLabel";
import Pagination from "@/components/shared/Pagination";
import { VaccineTable, VaccineModalCreate } from "../components";

// hooks
import { useEffect, useState } from "react";
import { useVaccines, useCreateVaccine } from "../hooks";
import { useDebounce } from "@/shared/hooks/useDebounce";
import type { VaccinePayload } from "../types/vaccine.payload.type";

export default function VaccineListPage() {
  const [search, setSearch] = useState("");
  const [openCreate, setOpenCreate] = useState(false);
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 500, { leading: true });

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const { mutate: createVaccine, isPending: isCreating } = useCreateVaccine();

  const { data, isPending, isFetching } = useVaccines({
    pageNumber: page,
    pageSize: 10,
    keyWord: debouncedSearch,
  });

  const pageData = data?.data.pageData ?? [];
  const totalPages = data?.data.pageInfo.totalPage ?? 1;

  const handleCreate = (payload: VaccinePayload) => {
    createVaccine(payload, {
      onSuccess: () => {
        setOpenCreate(false);
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-primary font-inter-700 flex items-center text-2xl">
          <Syringe /> Quản lý vaccine
        </h1>
        <PageBreadcumb items={["Danh sách vắc-xin"]} />
      </div>

      <div className="bg-linen flex flex-wrap items-end gap-4 p-4 shadow-md">
        <SearchLabel value={search} onChange={setSearch} />
        {/* TODO: Add VaccineFilter component when ready */}
        {/* <VaccineFilter /> */}
        <Button className="font-nunito-500" onClick={() => setOpenCreate(true)}>
          <PlusCircle /> Thêm vaccine
        </Button>
      </div>

      <VaccineTable
        vaccines={pageData}
        isPending={isPending || isFetching}
        currentPage={page}
        pageSize={10}
      />

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(newPage) => setPage(newPage)}
      />

      <VaccineModalCreate
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onSubmit={handleCreate}
        isSubmitting={isCreating}
      />
    </div>
  );
}
