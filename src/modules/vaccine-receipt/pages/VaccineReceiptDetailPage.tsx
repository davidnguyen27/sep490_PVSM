import {
  useParams,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageBreadcrumb, Spinner } from "@/components/shared";
import {
  Calendar,
  User,
  Clock,
  Hash,
  FileText,
  AlertCircle,
  ArrowLeft,
  Edit,
  Plus,
} from "lucide-react";
import { useState } from "react";

// hooks
import { useVaccineReceiptDetail } from "../hooks/useVaccineReceiptDetail";
import { useVaccineReceiptDetailByReceipt } from "@/modules/vaccine-receipt-detail/hooks/useVaccineReceipDetailByReceipt";

// components
import { VaccineReceiptDetailTable } from "@/modules/vaccine-receipt-detail/components/VaccineReceiptDetailTable";
import { VaccineReceiptEditModal } from "../components/VaccineReceiptEditModal";
import { VaccineReceiptDetailModalCreate } from "@/modules/vaccine-receipt-detail/components/VaccineReceiptDetailModalCreate";
import { VaccineReceiptDetailModalUpdate } from "@/modules/vaccine-receipt-detail/components/VaccineReceiptDetailModalUpdate";

// types
import type { VaccineReceiptDetail } from "@/modules/vaccine-receipt-detail/types/vaccine-receipt-detal.type";

// utils
import {
  formatReceiptCode,
  formatReceiptDate,
  formatCreatedDate,
  formatStatus,
  getStatusVariant,
} from "../utils/vaccine-receipt.utils";

export default function VaccineReceiptDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddDetailModal, setShowAddDetailModal] = useState(false);
  const [showUpdateDetailModal, setShowUpdateDetailModal] = useState(false);
  const [selectedDetailItem, setSelectedDetailItem] =
    useState<VaccineReceiptDetail | null>(null);

  // Get vaccineReceiptId from URL params or query params
  const vaccineReceiptId = id
    ? parseInt(id)
    : searchParams.get("vaccineReceipt")
      ? parseInt(searchParams.get("vaccineReceipt")!)
      : null;

  const isAdminRoute = location.pathname.startsWith("/admin");
  const baseRoute = isAdminRoute ? "/admin" : "/staff";

  const {
    data: vaccineReceipt,
    isPending,
    error,
  } = useVaccineReceiptDetail(vaccineReceiptId);

  const {
    data: receiptDetails,
    isPending: isDetailsLoading,
    error: detailsError,
  } = useVaccineReceiptDetailByReceipt(vaccineReceiptId);

  const handleBack = () => {
    navigate(`${baseRoute}/vaccine-receipts`);
  };

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleEditDetail = (item: VaccineReceiptDetail) => {
    setSelectedDetailItem(item);
    setShowUpdateDetailModal(true);
  };

  const DetailItem = ({
    icon: Icon,
    label,
    value,
    badge,
  }: {
    icon: React.ElementType;
    label: string;
    value: string;
    badge?: {
      variant:
        | "default"
        | "secondary"
        | "destructive"
        | "outline"
        | null
        | undefined;
      text: string;
    };
  }) => (
    <div className="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50/50 p-4">
      <div className="flex-shrink-0">
        <Icon className="text-primary h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-nunito-600 text-sm text-gray-700">{label}</p>
        <div className="mt-1 flex items-center gap-2">
          <p className="font-nunito-500 text-gray-900">{value}</p>
          {badge && (
            <Badge variant={badge.variant} className="font-nunito-500">
              {badge.text}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50/50">
        <div className="space-y-2 bg-white p-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="font-nunito-600"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại
            </Button>
            <div>
              <h1 className="text-primary font-inter-700 text-3xl">
                Chi tiết phiếu nhập vaccine
              </h1>
              <PageBreadcrumb
                items={["Trang chủ", "Phiếu nhập vaccine", "Chi tiết"]}
              />
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="mx-auto max-w-2xl rounded-xl border border-gray-100 bg-white p-8">
            <div className="flex flex-col items-center justify-center space-y-4">
              <AlertCircle className="h-12 w-12 text-red-500" />
              <div className="text-center">
                <h3 className="font-nunito-600 text-lg text-gray-900">
                  Không thể tải thông tin
                </h3>
                <p className="font-nunito-400 mt-1 text-sm text-gray-500">
                  Có lỗi xảy ra khi tải chi tiết phiếu nhập vaccine
                </p>
              </div>
              <Button onClick={handleBack} className="mt-4">
                Quay lại danh sách
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="min-h-screen bg-gray-50/50">
        <div className="space-y-2 bg-white p-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="font-nunito-600"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại
            </Button>
            <div>
              <h1 className="text-primary font-inter-700 text-3xl">
                Chi tiết phiếu nhập vaccine
              </h1>
              <PageBreadcrumb
                items={["Trang chủ", "Phiếu nhập vaccine", "Chi tiết"]}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center p-12">
          <Spinner />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="space-y-2 bg-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="font-nunito-600"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại
            </Button>
            <div>
              <h1 className="text-primary font-inter-700 text-3xl">
                Chi tiết phiếu nhập vaccine
              </h1>
              <PageBreadcrumb
                items={["Trang chủ", "Phiếu nhập vaccine", "Chi tiết"]}
              />
            </div>
          </div>
          <Button
            onClick={handleEdit}
            className="bg-primary font-nunito-600 text-white"
          >
            <Edit className="mr-2 h-4 w-4" />
            Chỉnh sửa
          </Button>
        </div>
      </div>

      <div className="space-y-6 p-6">
        {/* Thông tin phiếu nhập */}
        <div className="rounded-xl border border-gray-100 bg-white p-6">
          <h3 className="font-nunito-600 border-b pb-4 text-lg text-gray-900">
            Thông tin phiếu nhập
          </h3>

          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <DetailItem
                icon={Hash}
                label="Mã phiếu nhập"
                value={formatReceiptCode(vaccineReceipt!)}
              />

              <DetailItem
                icon={Calendar}
                label="Ngày nhập"
                value={formatReceiptDate(vaccineReceipt!)}
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <DetailItem
                icon={FileText}
                label="Trạng thái"
                value="Tình trạng phiếu nhập"
                badge={{
                  variant: getStatusVariant(vaccineReceipt?.isDeleted ?? false),
                  text: formatStatus(vaccineReceipt?.isDeleted ?? false),
                }}
              />
            </div>

            <div className="border-t border-gray-100 pt-4">
              <h4 className="font-nunito-600 mb-3 text-sm text-gray-700">
                Thông tin hệ thống
              </h4>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <DetailItem
                  icon={User}
                  label="Người tạo"
                  value={vaccineReceipt?.createdBy || "N/A"}
                />

                <DetailItem
                  icon={Clock}
                  label="Ngày tạo"
                  value={formatCreatedDate(vaccineReceipt!)}
                />
              </div>

              {vaccineReceipt?.modifiedBy && (
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <DetailItem
                    icon={User}
                    label="Người cập nhật"
                    value={vaccineReceipt.modifiedBy}
                  />

                  <DetailItem
                    icon={Clock}
                    label="Ngày cập nhật"
                    value={new Date(
                      vaccineReceipt.modifiedAt,
                    ).toLocaleDateString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Danh sách vaccine chi tiết */}
        <div className="rounded-xl border border-gray-100 bg-white p-6">
          <div className="flex items-center justify-between border-b pb-4">
            <h3 className="font-nunito-600 text-lg text-gray-900">
              Danh sách lô vắc-xin trong phiếu
            </h3>
            <Button
              onClick={() => setShowAddDetailModal(true)}
              className="bg-primary font-nunito-600 text-white"
              size="sm"
            >
              <Plus className="mr-2 h-4 w-4" />
              Thêm lô vaccine
            </Button>
          </div>

          <div className="mt-6">
            {detailsError ? (
              <div className="py-8 text-center">
                <AlertCircle className="mx-auto mb-2 h-8 w-8 text-red-500" />
                <p className="text-sm text-gray-500">
                  Không thể tải danh sách vaccine chi tiết
                </p>
              </div>
            ) : (
              <VaccineReceiptDetailTable
                data={receiptDetails || []}
                isPending={isDetailsLoading}
                onEdit={handleEditDetail}
              />
            )}
          </div>
        </div>
      </div>

      {/* Add Detail Modal */}
      {vaccineReceipt && vaccineReceiptId && (
        <VaccineReceiptDetailModalCreate
          open={showAddDetailModal}
          onOpenChange={setShowAddDetailModal}
          vaccineReceiptId={vaccineReceiptId}
          receiptCode={formatReceiptCode(vaccineReceipt)}
        />
      )}

      {/* Edit Modal */}
      <VaccineReceiptEditModal
        open={showEditModal}
        onOpenChange={setShowEditModal}
        vaccineReceipt={vaccineReceipt || null}
      />

      {/* Update Detail Modal */}
      {selectedDetailItem && vaccineReceipt && (
        <VaccineReceiptDetailModalUpdate
          open={showUpdateDetailModal}
          onOpenChange={setShowUpdateDetailModal}
          data={selectedDetailItem}
          receiptCode={formatReceiptCode(vaccineReceipt)}
        />
      )}
    </div>
  );
}
