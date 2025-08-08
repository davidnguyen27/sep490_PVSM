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
    <div className="space-y-6 p-6">
      <CustomerDetailHeader onGoBack={handleGoBack} onEdit={handleEdit} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <CustomerInfoSection customer={customer} />
        <CustomerSidebar customer={customer} />
      </div>
    </div>
  );
}
