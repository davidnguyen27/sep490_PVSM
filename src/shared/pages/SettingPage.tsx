import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PageBreadcrumb, PageLoader } from "@/components/shared";
import {
  MapPin,
  HelpCircle,
  BookOpen,
  HeadphonesIcon,
  ChevronRight,
  Settings,
  Globe,
  Shield,
  Database,
} from "lucide-react";
import { useAddresses } from "@/modules/address/hooks/useAddress";

interface SettingSection {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  count?: number;
  status?: "active" | "inactive" | "pending";
  action: () => void;
}

export default function SettingPage() {
  const navigate = useNavigate();
  const [currentPage] = useState(1);

  // Fetch addresses for count display
  const { data: addressData, isLoading: addressLoading } = useAddresses({
    pageNumber: currentPage,
    pageSize: 10,
  });

  const addressCount = addressData?.data?.pageInfo?.totalItem || 0;

  const settingSections: SettingSection[] = [
    {
      id: "address",
      title: "Quản lý địa chỉ",
      description:
        "Quản lý danh sách địa chỉ của hệ thống, thêm mới, chỉnh sửa và xóa địa chỉ",
      icon: <MapPin className="h-6 w-6 text-blue-600" />,
      count: addressCount,
      status: "active",
      action: () => navigate("/admin/settings/addresses"),
    },
    {
      id: "faq",
      title: "Câu hỏi thường gặp (FAQ)",
      description:
        "Quản lý các câu hỏi thường gặp của khách hàng và câu trả lời tương ứng",
      icon: <HelpCircle className="h-6 w-6 text-green-600" />,
      count: 24,
      status: "active",
      action: () => navigate("/admin/settings/faqs"),
    },
    {
      id: "handbook",
      title: "Sổ tay hướng dẫn",
      description:
        "Quản lý tài liệu hướng dẫn sử dụng hệ thống cho nhân viên và khách hàng",
      icon: <BookOpen className="h-6 w-6 text-purple-600" />,
      count: 12,
      status: "active",
      action: () => navigate("/admin/settings/handbooks"),
    },
    {
      id: "support-category",
      title: "Danh mục hỗ trợ",
      description:
        "Quản lý các danh mục hỗ trợ khách hàng và phân loại yêu cầu",
      icon: <HeadphonesIcon className="h-6 w-6 text-orange-600" />,
      count: 8,
      status: "active",
      action: () => navigate("/admin/settings/support-categories"),
    },
  ];

  const systemSettings = [
    {
      id: "general",
      title: "Cài đặt chung",
      description: "Cấu hình chung của hệ thống",
      icon: <Settings className="h-5 w-5 text-gray-600" />,
      action: () => navigate("/admin/settings/general"),
    },
    {
      id: "security",
      title: "Bảo mật",
      description: "Cài đặt bảo mật và quyền truy cập",
      icon: <Shield className="h-5 w-5 text-red-600" />,
      action: () => navigate("/admin/settings/security"),
    },
    {
      id: "localization",
      title: "Ngôn ngữ & Khu vực",
      description: "Cài đặt ngôn ngữ và múi giờ",
      icon: <Globe className="h-5 w-5 text-blue-600" />,
      action: () => navigate("/admin/settings/localization"),
    },
    {
      id: "backup",
      title: "Sao lưu dữ liệu",
      description: "Quản lý sao lưu và khôi phục dữ liệu",
      icon: <Database className="h-5 w-5 text-green-600" />,
      action: () => navigate("/admin/settings/backup"),
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Hoạt động
          </Badge>
        );
      case "inactive":
        return (
          <Badge variant="secondary" className="bg-gray-100 text-gray-800">
            Không hoạt động
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
            Đang xử lý
          </Badge>
        );
      default:
        return null;
    }
  };

  if (addressLoading) {
    return (
      <PageLoader loading={true} loadingText="Đang tải cài đặt...">
        <div></div>
      </PageLoader>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Cài đặt hệ thống</h1>
          <p className="mt-1 text-gray-600">
            Quản lý cấu hình và nội dung của hệ thống
          </p>
        </div>
      </div>

      <PageBreadcrumb items={[{ label: "Cài đặt hệ thống" }]} />

      {/* Content Management Section */}
      <div className="space-y-6">
        <div>
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Quản lý nội dung
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {settingSections.map((section) => (
              <Card
                key={section.id}
                className="border-l-primary group cursor-pointer rounded-none border-l-4 transition-all duration-200 hover:shadow-lg"
                onClick={section.action}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="group-hover:bg-primary/10 rounded-lg bg-gray-50 p-2 transition-colors">
                        {section.icon}
                      </div>
                      <div>
                        <CardTitle className="group-hover:text-primary text-lg font-semibold transition-colors">
                          {section.title}
                        </CardTitle>
                        {section.status && (
                          <div className="mt-1">
                            {getStatusBadge(section.status)}
                          </div>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="group-hover:text-primary h-5 w-5 text-gray-400 transition-colors" />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-3 text-sm text-gray-600">
                    {section.description}
                  </CardDescription>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {section.count !== undefined && (
                        <div className="text-sm text-gray-500">
                          <span className="text-primary text-lg font-medium">
                            {section.count}
                          </span>{" "}
                          mục
                        </div>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-none"
                      onClick={(e) => {
                        e.stopPropagation();
                        section.action();
                      }}
                    >
                      Quản lý
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Separator className="my-8" />

        {/* System Configuration Section */}
        <div>
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Cấu hình hệ thống
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {systemSettings.map((setting) => (
              <Card
                key={setting.id}
                className="group cursor-pointer rounded-none transition-all duration-200 hover:shadow-md"
                onClick={setting.action}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="group-hover:bg-primary/10 rounded-lg bg-gray-50 p-2 transition-colors">
                        {setting.icon}
                      </div>
                      <div>
                        <h3 className="group-hover:text-primary font-medium text-gray-900 transition-colors">
                          {setting.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {setting.description}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="group-hover:text-primary h-4 w-4 text-gray-400 transition-colors" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="rounded-none border-2 border-dashed border-gray-200">
        <CardContent className="p-6 text-center">
          <h3 className="mb-2 text-lg font-semibold text-gray-900">
            Cần hỗ trợ?
          </h3>
          <p className="mb-4 text-gray-600">
            Liên hệ với đội ngũ kỹ thuật để được hỗ trợ cấu hình hệ thống
          </p>
          <div className="flex justify-center space-x-3">
            <Button variant="outline" className="rounded-none">
              Tài liệu hướng dẫn
            </Button>
            <Button className="bg-primary hover:bg-primary/90 rounded-none">
              Liên hệ hỗ trợ
            </Button>
          </div>
        </CardContent>
      </Card>

      <Outlet />
    </div>
  );
}
