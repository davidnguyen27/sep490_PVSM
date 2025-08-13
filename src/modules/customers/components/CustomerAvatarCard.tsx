import { User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Customer } from "../types/customer.type";

interface CustomerAvatarCardProps {
  customer: Customer;
}

export function CustomerAvatarCard({ customer }: CustomerAvatarCardProps) {
  return (
    <Card className="rounded-none border-0 shadow-lg">
      <CardContent className="px-8 py-6 text-center">
        <div className="bg-primary/10 mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border-4 border-white shadow-lg">
          {customer.image ? (
            <img
              src={customer.image}
              alt={customer.fullName}
              className="h-24 w-24 rounded-full object-cover"
            />
          ) : (
            <User size={48} className="text-primary" />
          )}
        </div>
        <h3 className="font-nunito text-dark mb-2 text-xl font-bold">
          {customer.fullName}
        </h3>
        <p className="font-inter text-dark/70 mb-4 text-sm">
          {customer.customerCode}
        </p>
        <Badge
          variant={customer.isDeleted ? "destructive" : "default"}
          className="bg-primary/10 text-primary border-primary hover:bg-primary px-4 py-1 transition-colors hover:text-white"
        >
          {customer.isDeleted ? "Không hoạt động" : "Hoạt động"}
        </Badge>
      </CardContent>
    </Card>
  );
}
