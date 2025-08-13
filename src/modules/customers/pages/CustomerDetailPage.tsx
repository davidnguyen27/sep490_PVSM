import { useCustomerById } from "../hooks/useCustomerById";
import { useCustomerDetailNavigation } from "../hooks/useCustomerDetailNavigation";
import {
  CustomerDetailHeader,
  CustomerNotFound,
  CustomerDetailSkeleton,
  CustomerInfoSection,
  CustomerSidebar,
} from "../components";

export default function CustomerDetailPage() {
  const { customerId, handleGoBack, handleEdit } =
    useCustomerDetailNavigation();

  const {
    data: customer,
    isPending,
    isError,
  } = useCustomerById(customerId ? Number(customerId) : null);

  if (isPending) {
    return <CustomerDetailSkeleton />;
  }

  if (isError || !customer) {
    return <CustomerNotFound onGoBack={handleGoBack} />;
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <CustomerDetailHeader onGoBack={handleGoBack} onEdit={handleEdit} />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Customer Info - Takes 3 columns */}
          <div className="lg:col-span-3">
            <CustomerInfoSection customer={customer} />
          </div>

          {/* Sidebar - Takes 1 column */}
          <div className="lg:col-span-1">
            <CustomerSidebar customer={customer} />
          </div>
        </div>
      </div>
    </div>
  );
}
