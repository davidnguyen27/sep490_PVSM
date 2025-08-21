import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactElement<LucideIcon>;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: "primary" | "info" | "warning" | "success";
}

export function StatsCard({
  title,
  value,
  icon,
  description,
  trend,
  color = "primary",
}: StatsCardProps) {
  const colorClasses = {
    primary: "border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10",
    info: "border-info/20 bg-gradient-to-br from-info/5 to-info/10",
    warning: "border-warning/20 bg-gradient-to-br from-warning/5 to-warning/10",
    success:
      "border-green-500/20 bg-gradient-to-br from-green-500/5 to-green-500/10",
  };

  const iconColorClasses = {
    primary: "text-primary bg-primary/10",
    info: "text-info bg-info/10",
    warning: "text-warning bg-warning/10",
    success: "text-green-500 bg-green-500/10",
  };

  return (
    <Card
      className={`${colorClasses[color]} rounded-none border transition-all duration-200`}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-dark/70 font-nunito-500 text-sm tracking-wide uppercase">
              {title}
            </p>
            <div className="flex items-baseline gap-2">
              <p className="text-dark font-inter-700 text-2xl">
                {typeof value === "number" ? value.toLocaleString() : value}
              </p>
              {trend && (
                <span
                  className={`font-nunito-600 text-xs ${
                    trend.isPositive ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {trend.isPositive ? "+" : "-"}
                  {Math.abs(trend.value)}%
                </span>
              )}
            </div>
            {description && (
              <p className="text-dark/60 font-nunito-400 text-xs">
                {description}
              </p>
            )}
          </div>
          <div className={`${iconColorClasses[color]} rounded-xl p-3`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
