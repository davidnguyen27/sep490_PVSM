import { useEffect, useState } from "react";
import { User } from "lucide-react";
import {
  PageBreadcrumb,
  SearchLabel,
  Pagination,
  PageLoader,
  InlineLoading,
} from "@/components/shared";
import { AccountTable } from "../components/AccountTable";
import { AccountFilter } from "../components/AccountFilter";
import { useAccounts } from "../hooks/useAccounts";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useCreateAccount } from "../hooks/useAccountCreate";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input, Label, Button } from "@/components/ui";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { useForm, Controller } from "react-hook-form";

import { UserRole } from "@/shared/constants/roles.constants";

export default function AccountManagementPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<string>("true");
  const [openCreate, setOpenCreate] = useState(false);

  // Form setup
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "", role: UserRole.STAFF },
  });
  const createAccount = useCreateAccount();

  const onSubmit = (data: {
    email: string;
    password: string;
    role: number;
  }) => {
    createAccount.mutate(data, {
      onSuccess: () => {
        setOpenCreate(false);
        reset();
      },
    });
  };

  useEffect(() => {
    document.title = "PVMS | Quản lý tài khoản";
    return () => {
      document.title = "PVMS | Quản lý tài khoản";
    };
  }, []);

  const debouncedSearch = useDebounce(search, 500, { leading: true });
  const { data, isPending, isFetching, refetch } = useAccounts({
    pageNumber: page,
    pageSize: 10,
    keyword: debouncedSearch,
    status: status === "true" ? true : false,
  });

  const pageData = data?.data?.pageData ?? [];
  const totalPages = data?.data?.pageInfo?.totalPage ?? 1;

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, status]);

  return (
    <PageLoader
      loading={isPending && !isFetching}
      loadingText="Đang tải danh sách tài khoản..."
    >
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <User color="#00B8A9" />
          <h1 className="text-primary font-inter-700 text-2xl">
            Quản lý tài khoản
          </h1>
        </div>
        <PageBreadcrumb items={["Tài khoản"]} />

        <div className="flex items-end justify-between py-4">
          <div className="flex items-end justify-between gap-4">
            <SearchLabel value={search} onChange={setSearch} />
            <AccountFilter status={status} onStatusChange={setStatus} />
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              className="font-nunito-600"
              onClick={() => refetch()}
            >
              Làm mới
            </Button>
            <Button
              className="bg-primary font-nunito-600 text-white"
              onClick={() => setOpenCreate(true)}
            >
              Tạo tài khoản
            </Button>
          </div>
          {debouncedSearch && isFetching && (
            <InlineLoading text="Đang tìm kiếm..." variant="muted" size="sm" />
          )}
        </div>
        {/* Modal tạo mới account */}
        <Dialog open={openCreate} onOpenChange={setOpenCreate}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tạo tài khoản mới</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  {...register("email", { required: "Email là bắt buộc" })}
                />
                {errors.email && (
                  <span className="text-xs text-red-500">
                    {errors.email.message as string}
                  </span>
                )}
              </div>
              <div>
                <Label>Mật khẩu</Label>
                <Input
                  type="password"
                  {...register("password", {
                    required: "Mật khẩu là bắt buộc",
                  })}
                />
                {errors.password && (
                  <span className="text-xs text-red-500">
                    {errors.password.message as string}
                  </span>
                )}
              </div>
              <div>
                <Label>Vai trò</Label>
                <Controller
                  name="role"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      value={String(field.value)}
                      onValueChange={(val) => field.onChange(Number(val))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn vai trò" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={String(UserRole.ADMIN)}>
                          Quản trị viên
                        </SelectItem>
                        <SelectItem value={String(UserRole.STAFF)}>
                          Nhân viên
                        </SelectItem>
                        <SelectItem value={String(UserRole.VET)}>
                          Bác sĩ
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setOpenCreate(false);
                    reset();
                  }}
                >
                  Hủy
                </Button>
                <Button
                  type="submit"
                  className="bg-primary text-white"
                  disabled={createAccount.isPending}
                >
                  {createAccount.isPending ? "Đang tạo..." : "Tạo mới"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <AccountTable
          accounts={pageData}
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
    </PageLoader>
  );
}
