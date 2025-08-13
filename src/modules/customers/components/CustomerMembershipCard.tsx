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
    <Card className="rounded-none border-0 shadow-lg">
      <CardHeader className="border-b-0 bg-gradient-to-r from-purple-50 to-purple-100 px-6 py-4">
        <CardTitle className="font-inter flex items-center gap-3 text-purple-700">
          <div className="rounded-lg bg-purple-100 p-2">
            <Star size={20} />
          </div>
          <span className="font-nunito text-xl font-semibold">
            Thông tin hội viên
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-8 py-6">
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
