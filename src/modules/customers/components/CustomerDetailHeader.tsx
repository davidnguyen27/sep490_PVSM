import { ArrowLeft, Edit, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageBreadcrumb } from "@/components/shared";
import { useAuth } from "@/modules/auth";
import { getCustomerRoutePaths } from "../utils/customer-route.utils";

interface CustomerDetailHeaderProps {
  onGoBack: () => void;
  onEdit: () => void;
}

export function CustomerDetailHeader({
  onGoBack,
  onEdit,
}: CustomerDetailHeaderProps) {
  const { user } = useAuth();

  // Get role-based paths
  const paths = getCustomerRoutePaths(user?.role || 2);

  const breadcrumbItems = [
    { label: "Danh sách khách hàng", path: paths.base },
    "Chi tiết",
  ];

  return (
    <div className="space-y-6">
      {/* Navigation Bar */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={onGoBack}
          className="hover:text-primary flex items-center space-x-2 text-gray-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Quay lại danh sách</span>
        </Button>

        <Badge
          variant="outline"
          className="border-primary text-primary font-inter bg-white"
        >
          <User className="mr-1 h-3 w-3" />
          Chi tiết khách hàng
        </Badge>
      </div>

      {/* Page Title */}
      <div className="text-center">
        <div className="mb-4 flex items-center justify-center">
          <div className="bg-primary/10 rounded-full p-3">
            <User className="text-primary h-8 w-8" />
          </div>
        </div>
        <h1 className="font-nunito mb-2 text-3xl font-bold text-gray-900">
          Thông tin khách hàng
        </h1>
        <p className="font-inter mx-auto max-w-2xl text-gray-600">
          Xem và quản lý thông tin chi tiết của khách hàng
        </p>
      </div>

      {/* Breadcrumb */}
      <div className="flex justify-center">
        <PageBreadcrumb items={breadcrumbItems} />
      </div>

      {/* Action Button */}
      <div className="flex justify-center">
        <Button
          onClick={onEdit}
          className="bg-primary hover:bg-primary/90 font-inter flex items-center space-x-2"
        >
          <Edit className="h-4 w-4" />
          <span>Chỉnh sửa thông tin</span>
        </Button>
      </div>
    </div>
  );
}
