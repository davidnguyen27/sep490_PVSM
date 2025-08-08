import { ArrowLeft, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageBreadcrumb } from "@/components/shared";

interface CustomerDetailHeaderProps {
  onGoBack: () => void;
  onEdit: () => void;
}

export function CustomerDetailHeader({
  onGoBack,
  onEdit,
}: CustomerDetailHeaderProps) {
  const breadcrumbItems = [
    "Trang chủ",
    "Quản lý khách hàng",
    "Chi tiết khách hàng",
  ];

  return (
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <PageBreadcrumb items={breadcrumbItems} />
        <div className="flex items-center gap-4">
          <Button
            onClick={onGoBack}
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={16} className="mr-2" />
            Quay lại
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">
            Chi tiết khách hàng
          </h1>
        </div>
      </div>

      <Button onClick={onEdit} className="gap-2">
        <Edit size={16} />
        Chỉnh sửa
      </Button>
    </div>
  );
}
