import { CustomerAvatarCard } from "./CustomerAvatarCard";
import { CustomerStatsCard } from "./CustomerStatsCard";
import { CustomerMembershipCard } from "./CustomerMembershipCard";
import type { Customer } from "../types/customer.type";

interface CustomerSidebarProps {
  customer: Customer;
}

export function CustomerSidebar({ customer }: CustomerSidebarProps) {
  return (
    <div className="space-y-6">
      <CustomerAvatarCard customer={customer} />
      <CustomerStatsCard />
      <CustomerMembershipCard membership={customer.membershipResponseDTO} />
    </div>
  );
}
