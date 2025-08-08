import { Star, Gift } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InfoItem } from "./InfoItem";
import type { Customer } from "../types/customer.type";

interface CustomerMembershipCardProps {
  membership: Customer["membershipResponseDTO"];
}

export function CustomerMembershipCard({
  membership,
}: CustomerMembershipCardProps) {
  if (!membership) return null;

  return (
    <Card className="bg-linen rounded-none shadow-sm">
      <CardHeader className="border-b bg-gradient-to-r from-purple-50 to-purple-100">
        <CardTitle className="font-inter flex items-center gap-2 text-purple-700">
          <Star size={20} />
          Thông tin hội viên
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="text-center">
            <Badge
              variant="outline"
              className="mb-2 border-purple-200 bg-purple-50 text-purple-700"
            >
              {membership.rank}
            </Badge>
            <h4 className="font-inter text-dark font-semibold">
              {membership.name}
            </h4>
            <p className="font-nunito text-dark/70 text-sm">
              {membership.description}
            </p>
          </div>

          <div className="border-t pt-4">
            <InfoItem
              icon={<Gift size={16} className="text-purple-600" />}
              label="Quyền lợi"
              value={membership.benefits}
              className="text-sm"
            />
            <InfoItem
              icon={<Star size={16} className="text-yellow-600" />}
              label="Điểm tối thiểu"
              value={membership.minPoints.toLocaleString()}
              suffix="điểm"
              className="mt-2 text-sm"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
