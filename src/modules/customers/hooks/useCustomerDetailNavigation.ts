import { useSearchParams, useNavigate } from "react-router-dom";
import { useUserRole } from "@/shared/hooks/useUserRole";
import { getCustomerRoutePaths } from "../utils/customer-route.utils";

export function useCustomerDetailNavigation() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { role } = useUserRole();
  const paths = getCustomerRoutePaths(role || 2);

  const customerId = searchParams.get("customerId");

  const handleGoBack = () => {
    navigate(paths.base);
  };

  const handleEdit = () => {
    if (customerId) {
      navigate(`${paths.base}?customerId=${customerId}&action=edit`);
    }
  };

  return {
    customerId,
    handleGoBack,
    handleEdit,
  };
}
