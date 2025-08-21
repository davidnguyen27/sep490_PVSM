import {
  useParams,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { useState } from "react";

// hooks
import { useVaccineReceiptDetail } from "../hooks/useVaccineReceiptDetail";
import { useVaccineReceiptDetailByReceipt } from "@/modules/vaccine-receipt-detail/hooks/useVaccineReceipDetailByReceipt";

// components
import {
  VaccineReceiptDetailHeader,
  VaccineReceiptMainInfo,
  VaccineReceiptSummary,
  VaccineReceiptDetailsTable,
  VaccineReceiptErrorState,
  VaccineReceiptLoadingState,
  VaccineReceiptEditModal,
} from "../components";

// utils

export default function VaccineReceiptDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [showEditModal, setShowEditModal] = useState(false);

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

  if (error) {
    return <VaccineReceiptErrorState onBack={handleBack} />;
  }

  if (isPending) {
    return <VaccineReceiptLoadingState onBack={handleBack} />;
  }

  return (
    <div className="min-h-screen bg-gray-50/30">
      {/* Header Section */}
      {vaccineReceiptId && (
        <VaccineReceiptDetailHeader
          onBack={handleBack}
          vaccineReceiptId={vaccineReceiptId}
        />
      )}

      {/* Main Content */}
      <div className="mx-auto py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Information Card */}
          <div className="lg:col-span-2">
            <VaccineReceiptMainInfo vaccineReceipt={vaccineReceipt!} />
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <VaccineReceiptSummary
              vaccineReceipt={vaccineReceipt!}
              receiptDetails={receiptDetails}
            />
          </div>
        </div>

        {/* Vaccine Details Table */}
        <div className="mt-8">
          <VaccineReceiptDetailsTable
            receiptDetails={receiptDetails}
            isDetailsLoading={isDetailsLoading}
            detailsError={detailsError}
          />
        </div>
      </div>

      {/* Edit Modal */}
      <VaccineReceiptEditModal
        open={showEditModal}
        onOpenChange={setShowEditModal}
        vaccineReceipt={vaccineReceipt || null}
      />
    </div>
  );
}
