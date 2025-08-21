import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: "blue" | "green" | "purple" | "amber";
  className?: string;
}

export function StatsCard({
  title,
  value,
  icon,
  color,
  className,
}: StatsCardProps) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
    amber: "bg-amber-50 text-amber-600",
  };

  const textColorClasses = {
    blue: "text-blue-900",
    green: "text-green-900",
    purple: "text-purple-900",
    amber: "text-amber-900",
  };

  const valueColorClasses = {
    blue: "text-blue-600",
    green: "text-green-600",
    purple: "text-purple-600",
    amber: "text-amber-600",
  };

  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-none p-3",
        colorClasses[color],
        className,
      )}
    >
      <div className="flex items-center space-x-3">
        <div className={cn("h-5 w-5", valueColorClasses[color])}>{icon}</div>
        <span className={cn("text-sm font-medium", textColorClasses[color])}>
          {title}
        </span>
      </div>
      <span className={cn("text-lg font-bold", valueColorClasses[color])}>
        {value}
      </span>
    </div>
  );
}

interface InfoCardProps {
  title: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function InfoCard({ title, children, className }: InfoCardProps) {
  return (
    <Card className={cn("rounded-none border-gray-200 shadow-sm", className)}>
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-gray-900">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

interface FieldProps {
  label: string;
  value: string | number | React.ReactNode;
  className?: string;
}

export function Field({ label, value, className }: FieldProps) {
  return (
    <div className={className}>
      <label className="text-sm font-medium tracking-wide text-gray-500 uppercase">
        {label}
      </label>
      <div className="mt-1 text-lg font-medium text-gray-900">{value}</div>
    </div>
  );
}
