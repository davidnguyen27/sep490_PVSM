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
      {/* Avatar Card */}
      <div className="rounded-lg bg-white shadow-lg">
        <CustomerAvatarCard customer={customer} />
      </div>

      {/* Stats Card */}
      <div className="rounded-lg bg-white shadow-lg">
        <CustomerStatsCard />
      </div>

      {/* Membership Card */}
      <div className="rounded-lg bg-white shadow-lg">
        <CustomerMembershipCard membership={customer.membershipResponseDTO} />
      </div>
    </div>
  );
}
