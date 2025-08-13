import { CustomerBasicInfo } from "./CustomerBasicInfo";
import { CustomerAccountInfo } from "./CustomerAccountInfo";
import type { Customer } from "../types/customer.type";

interface CustomerInfoSectionProps {
  customer: Customer;
}

export function CustomerInfoSection({ customer }: CustomerInfoSectionProps) {
  return (
    <div className="space-y-8">
      {/* Basic Information Card */}
      <div className="rounded-lg bg-white shadow-lg">
        <CustomerBasicInfo customer={customer} />
      </div>

      {/* Account Information Card */}
      <div className="rounded-lg bg-white shadow-lg">
        <CustomerAccountInfo customer={customer} />
      </div>
    </div>
  );
}
