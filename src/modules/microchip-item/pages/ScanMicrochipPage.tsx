import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  User,
  Calendar,
  MapPin,
  Phone,
  AlertCircle,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { useMicrochipByCode } from "../hooks/useMicrochipByCode";
import { PageBreadcrumb } from "@/components/shared";

export default function ScanMicrochipPage() {
  const { microchipCode: paramMicrochipCode } = useParams<{
    microchipCode?: string;
  }>();
  const [microchipCode, setMicrochipCode] = useState(paramMicrochipCode || "");
  const [searchCode, setSearchCode] = useState(paramMicrochipCode || "");

  // Query để lấy thông tin pet bằng microchip code
  const {
    data: petInfo,
    isLoading,
    error,
  } = useMicrochipByCode({
    microchipCode: searchCode,
    enabled: !!searchCode,
  });

  const breadcrumbItems = [
    { label: "Trang chủ", href: "/" },
    { label: "Microchip", href: "/microchips" },
    { label: "Tra cứu microchip" },
  ];

  // Xử lý tìm kiếm thủ công
  const handleManualSearch = () => {
    if (microchipCode.trim()) {
      setSearchCode(microchipCode.trim());
    }
  };

  // Xử lý khi Enter được nhấn
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleManualSearch();
    }
  };

  const renderPetInfo = () => {
    if (isLoading) {
      return (
        <Card>
          <CardContent className="flex items-center justify-center py-8">
            <Loader2 className="mr-2 h-6 w-6 animate-spin" />
            <span>Đang tìm kiếm thông tin...</span>
          </CardContent>
        </Card>
      );
    }

    if (error) {
      return (
        <Card className="border-red-200">
          <CardContent className="flex items-center justify-center py-8">
            <AlertCircle className="mr-2 h-6 w-6 text-red-500" />
            <span className="text-red-600">
              Không tìm thấy thông tin cho mã microchip này
            </span>
          </CardContent>
        </Card>
      );
    }

    if (petInfo?.pet) {
      const pet = petInfo.pet;
      const customer = pet.customer;
      return (
        <Card className="border-green-200">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <CardTitle className="text-green-700">
                Thông tin thú cưng
              </CardTitle>
            </div>
            <CardDescription>
              Đã tìm thấy thông tin cho mã microchip: {searchCode}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Thông tin thú cưng */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">
                  Thông tin thú cưng
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Tên:</span>
                    <span>{pet.name || "Chưa có tên"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Loài:</span>
                    <span>{pet.species || "Chưa xác định"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Giống:</span>
                    <span>{pet.breed || "Chưa xác định"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Màu sắc:</span>
                    <span>{pet.color || "Chưa xác định"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Giới tính:</span>
                    <span>{pet.gender || "Chưa xác định"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Cân nặng:</span>
                    <span>{pet.weight || "Chưa xác định"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Triệt sản:</span>
                    <Badge variant={pet.isSterilized ? "default" : "secondary"}>
                      {pet.isSterilized ? "Đã triệt sản" : "Chưa triệt sản"}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Thông tin chủ sở hữu */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">
                  Thông tin chủ sở hữu
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">Tên:</span>
                    <span>{customer?.fullName || "Chưa có thông tin"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">SĐT:</span>
                    <span>{customer?.phoneNumber || "Chưa có thông tin"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">Địa chỉ:</span>
                    <span>{customer?.address || "Chưa có thông tin"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Email:</span>
                    <span>
                      {customer?.accountResponseDTO?.email ||
                        "Chưa có thông tin"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Thông tin microchip */}
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">
                Thông tin microchip
              </h4>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Mã chip:</span>
                  <code className="rounded bg-gray-100 px-2 py-1 text-sm">
                    {searchCode}
                  </code>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">Ngày cấy:</span>
                  <span>{petInfo.installationDate || "Chưa có thông tin"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Trạng thái:</span>
                  <Badge
                    variant={
                      petInfo.status === "active" ? "default" : "secondary"
                    }
                  >
                    {petInfo.status === "active" ? "Hoạt động" : petInfo.status}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-4">
              <Button variant="outline" size="sm">
                Xem chi tiết thú cưng
              </Button>
              <Button size="sm">Tạo lịch hẹn</Button>
              <Button variant="outline" size="sm">
                Xem lịch sử khám
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    }

    return null;
  };

  return (
    <div className="space-y-6">
      <PageBreadcrumb items={breadcrumbItems} />

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Tra cứu microchip
          </h1>
          <p className="mt-2 text-gray-600">
            Tìm kiếm thông tin thú cưng bằng mã microchip
          </p>
        </div>

        <div className="space-y-6">
          {/* Phần nhập mã thủ công */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Nhập mã microchip
              </CardTitle>
              <CardDescription>
                Nhập mã microchip để tìm kiếm thông tin thú cưng
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={microchipCode}
                  onChange={(e) => setMicrochipCode(e.target.value)}
                  placeholder="Nhập mã microchip..."
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button
                  onClick={handleManualSearch}
                  disabled={!microchipCode.trim() || isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-sm text-gray-500">
                Nhấn Enter hoặc click nút tìm kiếm để tra cứu
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Kết quả tìm kiếm */}
        {searchCode && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Kết quả tìm kiếm</h2>
            {renderPetInfo()}
          </div>
        )}
      </div>
    </div>
  );
}
