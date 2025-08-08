import { useSearchParams, useNavigate } from "react-router-dom";

export function useCustomerDetailNavigation() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const customerId = searchParams.get("customerId");

  const handleGoBack = () => {
    navigate("/admin/customers");
  };

  const handleEdit = () => {
    if (customerId) {
      navigate(`/admin/customers?customerId=${customerId}&action=edit`);
    }
  };

  return {
    customerId,
    handleGoBack,
    handleEdit,
  };
}
