import { Coins, Star, Gift, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatItem } from "./StatItem";

export function CustomerStatsCard() {
  return (
    <Card className="bg-linen rounded-none shadow-sm">
      <CardHeader className="border-b bg-gradient-to-r from-yellow-50 to-yellow-100">
        <CardTitle className="font-inter flex items-center gap-2 text-yellow-700">
          <Coins size={20} />
          Điểm tích lũy & Chi tiêu
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <StatItem
            icon={<Star size={16} className="text-yellow-500" />}
            label="Điểm hiện tại"
            value="0"
            suffix="điểm"
            bgColor="bg-yellow-50"
            textColor="text-yellow-700"
          />
          <StatItem
            icon={<Gift size={16} className="text-green-500" />}
            label="Điểm có thể đổi"
            value="0"
            suffix="điểm"
            bgColor="bg-green-50"
            textColor="text-green-700"
          />
          <StatItem
            icon={<TrendingUp size={16} className="text-blue-500" />}
            label="Tổng chi tiêu"
            value="0"
            suffix="VNĐ"
            bgColor="bg-blue-50"
            textColor="text-blue-700"
          />
        </div>
      </CardContent>
    </Card>
  );
}
