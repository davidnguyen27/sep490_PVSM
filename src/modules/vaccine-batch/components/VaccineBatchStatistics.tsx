import { TrendingUp, TrendingDown, Archive, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface VaccineBatchStatisticsProps {
  totalImported: number;
  totalExported: number;
  currentStock: number;
  totalTransactions: number;
  importCount: number;
  exportCount: number;
}

export function VaccineBatchStatistics({
  totalImported,
  totalExported,
  currentStock,
  totalTransactions,
  importCount,
  exportCount,
}: VaccineBatchStatisticsProps) {
  const stats = [
    {
      title: "Tổng nhập",
      value: totalImported,
      subtitle: `${importCount} lần nhập`,
      icon: TrendingUp,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-100",
    },
    {
      title: "Tổng xuất",
      value: totalExported,
      subtitle: `${exportCount} lần xuất`,
      icon: TrendingDown,
      color: "text-rose-600",
      bgColor: "bg-rose-50",
      borderColor: "border-rose-100",
    },
    {
      title: "Tồn kho hiện tại",
      value: currentStock,
      subtitle: "Liều vaccine",
      icon: Archive,
      color: currentStock >= 0 ? "text-blue-600" : "text-rose-600",
      bgColor: currentStock >= 0 ? "bg-blue-50" : "bg-rose-50",
      borderColor: currentStock >= 0 ? "border-blue-100" : "border-rose-100",
    },
    {
      title: "Tổng giao dịch",
      value: totalTransactions,
      subtitle: "Phiếu nhập + xuất",
      icon: Package,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card
            key={index}
            className={`border-0 py-4 ${stat.bgColor} ${stat.borderColor} rounded-none border`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="font-inter-500 text-sm text-gray-700">
                {stat.title}
              </CardTitle>
              <div
                className={`rounded-none p-2 ${stat.bgColor} border ${stat.borderColor}`}
              >
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent className="space-y-1">
              <div
                className={`font-inter-bold text-2xl ${stat.color} transition-transform duration-200 group-hover:scale-105`}
              >
                {stat.value.toLocaleString()}
              </div>
              <p className="font-nunito-regular text-xs text-gray-500">
                {stat.subtitle}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
