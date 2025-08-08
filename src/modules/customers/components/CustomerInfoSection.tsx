import { CustomerBasicInfo } from "./CustomerBasicInfo";
import { CustomerAccountInfo } from "./CustomerAccountInfo";
import type { Customer } from "../types/customer.type";

interface CustomerInfoSectionProps {
  customer: Customer;
}

export function CustomerInfoSection({ customer }: CustomerInfoSectionProps) {
  return (
    <div className="space-y-6 lg:col-span-2">
      <CustomerBasicInfo customer={customer} />
      <CustomerAccountInfo customer={customer} />
    </div>
  );
}
