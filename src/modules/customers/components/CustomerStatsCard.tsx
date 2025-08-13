import { Coins, Star, Gift, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatItem } from "./StatItem";

export function CustomerStatsCard() {
  return (
    <Card className="rounded-none border-0 shadow-lg">
      <CardHeader className="border-b-0 bg-gradient-to-r from-yellow-50 to-yellow-100 px-6 py-4">
        <CardTitle className="font-inter flex items-center gap-3 text-yellow-700">
          <div className="rounded-lg bg-yellow-100 p-2">
            <Coins size={20} />
          </div>
          <span className="font-nunito text-xl font-semibold">
            Điểm tích lũy & Chi tiêu
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-8 py-6">
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
