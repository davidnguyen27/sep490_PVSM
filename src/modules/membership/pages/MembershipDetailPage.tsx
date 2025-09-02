import { useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  Trophy,
  Users,
  Gift,
  Phone,
  Home,
  ChevronRight,
  Eye,
} from "lucide-react";
import { useMembershipById } from "../hooks/useMembershipById";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CustomerTable } from "../components/CustomerTable";
import { MembershipCustomerModal } from "../components/MembershipCustomerModal";
import { useState } from "react";
import type { Membership } from "../types/membership.type";
import PageLoading from "@/components/shared/PageLoading";
import {
  StatsCard,
  InfoCard,
  Field,
} from "../components/MembershipDetailComponents";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Link } from "react-router-dom";

export default function MembershipDetailPage() {
  const [openCustomerModal, setOpenCustomerModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<
    Membership["customer"][number] | null
  >(null);
  const [searchParams] = useSearchParams();
  const membershipId = searchParams.get("membershipId");

  const {
    data: membership,
    isLoading,
    error,
  } = useMembershipById(membershipId ? Number(membershipId) : null);

  if (isLoading) {
    return <PageLoading />;
  }

  if (error || !membership) {
    return (
      <div className="flex h-96 flex-col items-center justify-center space-y-4">
        <div className="text-center">
          <h2 className="font-nunito-600 text-2xl text-gray-900">
            Không tìm thấy thông tin thành viên
          </h2>
          <p className="mt-2 text-gray-600">
            Thông tin thành viên không tồn tại hoặc đã bị xóa.
          </p>
        </div>
        <Button variant="outline" onClick={() => window.history.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Quay lại
        </Button>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy HH:mm", { locale: vi });
  };

  const getRankColor = (rank: string) => {
    switch (rank.toLowerCase()) {
      case "bronze":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "silver":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "gold":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "platinum":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "diamond":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-green-100 text-green-800 border-green-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600">
        <Link
          to="/admin"
          className="flex items-center transition-colors hover:text-gray-900"
        >
          <Home className="mr-1 h-4 w-4" />
          Trang chủ
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link
          to="/admin/memberships"
          className="transition-colors hover:text-gray-900"
        >
          Quản lý thành viên
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="font-nunito-500 text-primary">
          Chi tiết thành viên
        </span>
      </nav>

      {/* Header Section */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.history.back()}
            className="rounded-none hover:bg-gray-100"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Button>
          <div>
            <h1 className="font-inter-700 text-primary text-2xl sm:text-3xl">
              Chi tiết thành viên
            </h1>
            <p className="mt-1 text-sm text-gray-600 sm:text-base">
              Mã thành viên:{" "}
              <span className="font-nunito">{membership.membershipCode}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Badge
            variant="outline"
            className={`font-nunito-500 rounded-none px-4 py-2 text-sm ${getRankColor(membership.rank)}`}
          >
            <Trophy className="mr-2 h-4 w-4" />
            {membership.name}
          </Badge>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column - Main Info */}
        <div className="space-y-6 lg:col-span-2">
          {/* Basic Information Card */}
          <InfoCard title="Thông tin cơ bản">
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Field label="Hạng thành viên" value={membership.name} />
                <Field
                  label="Điểm tối thiểu"
                  value={`${membership.minPoints.toLocaleString()} điểm`}
                />
                <Field
                  label="Trạng thái"
                  value={
                    <Badge
                      variant={membership.isDeleted ? "destructive" : "default"}
                      className="rounded-none"
                    >
                      {membership.isDeleted ? "Đã xóa" : "Hoạt động"}
                    </Badge>
                  }
                />
              </div>

              <Separator className="my-4" />

              <Field
                label="Mô tả"
                value={membership.description || "Không có mô tả"}
              />

              <Field
                label="Quyền lợi"
                value={membership.benefits || "Không có quyền lợi đặc biệt"}
              />
            </div>
          </InfoCard>

          {/* Customer List Card */}
          <InfoCard
            title={
              <div className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Danh sách khách hàng ({membership.customer?.length || 0})
              </div>
            }
          >
            {membership.customer && membership.customer.length > 0 ? (
              <div className="space-y-4">
                {/* Desktop Table View */}
                <CustomerTable
                  customers={membership.customer}
                  onViewDetail={(customer) => {
                    setSelectedCustomer(customer);
                    setOpenCustomerModal(true);
                  }}
                />
                <MembershipCustomerModal
                  open={openCustomerModal}
                  onClose={() => setOpenCustomerModal(false)}
                  customer={selectedCustomer}
                />

                {/* Mobile Card View */}
                <div className="space-y-4 md:hidden">
                  {membership.customer.map((customer, index) => (
                    <div
                      key={customer.customerId}
                      className="rounded-none border bg-white p-4 transition-colors hover:bg-gray-50"
                    >
                      <div className="mb-3 flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                            {customer.image ? (
                              <img
                                src={customer.image}
                                alt={customer.fullName}
                                className="h-12 w-12 rounded-full object-cover"
                              />
                            ) : (
                              <span className="font-inter-700 text-lg text-white">
                                {customer.fullName?.charAt(0) || "?"}
                              </span>
                            )}
                          </div>
                          <div>
                            <h4 className="font-nunito-600 text-gray-900">
                              {customer.fullName}
                            </h4>
                            <div className="mt-1 flex items-center space-x-2 text-sm text-gray-600">
                              <span className="font-nunito rounded border border-blue-200 bg-blue-50 px-2 py-1 text-xs text-blue-700">
                                {customer.customerCode}
                              </span>
                              <div className="flex items-center">
                                <Phone className="mr-1 h-3 w-3 text-gray-500" />
                                {customer.phoneNumber}
                              </div>
                            </div>
                          </div>
                        </div>
                        <span className="font-nunito-500 text-sm text-gray-500">
                          #{index + 1}
                        </span>
                      </div>

                      <div className="mb-3 grid grid-cols-2 gap-3">
                        <div className="rounded border border-blue-200 bg-blue-50 p-2">
                          <div className="font-nunito-500 text-xs tracking-wide text-blue-600 uppercase">
                            Điểm hiện tại
                          </div>
                          <div className="font-nunito-600 text-blue-700">
                            {customer.currentPoints?.toLocaleString() || 0}
                          </div>
                        </div>
                        <div className="rounded border border-green-200 bg-green-50 p-2">
                          <div className="font-nunito-500 text-xs tracking-wide text-green-600 uppercase">
                            Điểm đổi được
                          </div>
                          <div className="font-nunito-600 text-green-700">
                            {customer.redeemablePoints?.toLocaleString() || 0}
                          </div>
                        </div>
                      </div>

                      <div className="mb-3 rounded border border-purple-200 bg-purple-50 p-2">
                        <div className="font-nunito-500 text-xs tracking-wide text-purple-600 uppercase">
                          Tổng chi tiêu
                        </div>
                        <div className="font-nunito-600 text-purple-700">
                          {customer.totalSpent?.toLocaleString() || 0} VNĐ
                        </div>
                      </div>

                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full rounded-none transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                        onClick={() => {
                          // TODO: Navigate to customer detail page
                          console.log(
                            "View customer detail:",
                            customer.customerId,
                          );
                        }}
                      >
                        <Eye className="mr-1 h-3 w-3" />
                        Xem chi tiết khách hàng
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="py-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                  <Users className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="font-nunito-500 mb-2 text-lg text-gray-900">
                  Chưa có khách hàng
                </h3>
                <p className="text-gray-500">
                  Chưa có khách hàng nào thuộc hạng thành viên này
                </p>
              </div>
            )}
          </InfoCard>
        </div>

        {/* Right Column - Stats & Meta */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <InfoCard title="Thống kê">
            <div className="space-y-4">
              <StatsCard
                title="Tổng khách hàng"
                value={membership.customer?.length || 0}
                icon={<Users className="h-5 w-5" />}
                color="blue"
              />

              <StatsCard
                title="Điểm tối thiểu"
                value={membership.minPoints.toLocaleString()}
                icon={<Trophy className="h-5 w-5" />}
                color="green"
              />

              {membership.customer && membership.customer.length > 0 && (
                <>
                  <StatsCard
                    title="Tổng chi tiêu"
                    value={`${membership.customer
                      .reduce(
                        (sum, customer) => sum + (customer.totalSpent || 0),
                        0,
                      )
                      .toLocaleString()} VNĐ`}
                    icon={<Gift className="h-5 w-5" />}
                    color="purple"
                  />
                </>
              )}
            </div>
          </InfoCard>

          {/* Meta Information */}
          <InfoCard title="Thông tin hệ thống">
            <div className="space-y-4">
              <div>
                <Field
                  label="Ngày tạo"
                  value={
                    <div>
                      <div className="font-nunito-500 text-lg text-gray-900">
                        {formatDate(membership.createdAt)}
                      </div>
                      <div className="mt-1 text-xs text-gray-500">
                        Bởi: {membership.createdBy || "Hệ thống"}
                      </div>
                    </div>
                  }
                />
              </div>

              <Separator />

              <div>
                <Field
                  label="Cập nhật lần cuối"
                  value={
                    <div>
                      <div className="font-nunito-500 text-lg text-gray-900">
                        {formatDate(membership.modifiedAt)}
                      </div>
                      <div className="mt-1 text-xs text-gray-500">
                        Bởi: {membership.modifiedBy || "Hệ thống"}
                      </div>
                    </div>
                  }
                />
              </div>

              <Separator />
            </div>
          </InfoCard>
        </div>
      </div>
    </div>
  );
}
