import { User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Customer } from "../types/customer.type";

interface CustomerAvatarCardProps {
  customer: Customer;
}

export function CustomerAvatarCard({ customer }: CustomerAvatarCardProps) {
  return (
    <Card className="bg-linen rounded-none shadow-sm">
      <CardContent className="p-6 text-center">
        <div className="bg-primary/10 mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full">
          {customer.image ? (
            <img
              src={customer.image}
              alt={customer.fullName}
              className="h-20 w-20 rounded-full object-cover"
            />
          ) : (
            <User size={40} className="text-primary" />
          )}
        </div>
        <h3 className="font-inter text-dark text-lg font-semibold">
          {customer.fullName}
        </h3>
        <p className="font-nunito text-dark/70 text-sm">
          {customer.customerCode}
        </p>
        <Badge
          variant={customer.isDeleted ? "destructive" : "default"}
          className="mt-2"
        >
          {customer.isDeleted ? "Không hoạt động" : "Hoạt động"}
        </Badge>
      </CardContent>
    </Card>
  );
}
