import { PageBreadcrumb } from "@/components/shared";

export const ScheduleErrorState = () => {
  return (
    <div className="container mx-auto space-y-6 p-6">
      <PageBreadcrumb items={["Trang chủ", "Lịch làm việc"]} />
      <div className="rounded-lg border border-red-200 bg-red-50 p-4">
        <h3 className="text-lg font-medium text-red-800">
          Lỗi tải dữ liệu lịch làm việc
        </h3>
        <p className="mt-2 text-red-600">
          Vui lòng thử lại sau hoặc liên hệ quản trị viên.
        </p>
      </div>
    </div>
  );
};
