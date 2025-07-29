import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CheckCircle, Info, Star } from "lucide-react";

interface Props {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
  variant?: "success" | "info" | "completed";
  className?: string;
}

export default function FinalizedCard({
  title = "Dịch vụ đã xử lý thành công",
  message = "Không có hành động nào cần thực hiện thêm.",
  icon,
  variant = "success",
  className,
}: Props) {
  const variantConfig = {
    success: {
      badgeVariant: "default" as const,
      badgeText: "Thành công",
      badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-200",
      iconClass: "text-emerald-600",
      icon: CheckCircle,
      cardClass:
        "border-emerald-200 bg-gradient-to-br from-emerald-50/50 to-green-50/50",
    },
    info: {
      badgeVariant: "secondary" as const,
      badgeText: "Thông tin",
      badgeClass: "bg-blue-100 text-blue-800 border-blue-200",
      iconClass: "text-blue-600",
      icon: Info,
      cardClass:
        "border-blue-200 bg-gradient-to-br from-blue-50/50 to-indigo-50/50",
    },
    completed: {
      badgeVariant: "outline" as const,
      badgeText: "Hoàn thành",
      badgeClass: "bg-purple-100 text-purple-800 border-purple-200",
      iconClass: "text-purple-600",
      icon: Star,
      cardClass:
        "border-purple-200 bg-gradient-to-br from-purple-50/50 to-violet-50/50",
    },
  };

  const config = variantConfig[variant];
  const IconComponent = config.icon;

  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg",
        config.cardClass,
        className,
      )}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "bg-background/50 rounded-full p-2.5 shadow-sm transition-transform duration-300 group-hover:scale-110",
                config.iconClass,
              )}
            >
              {icon || <IconComponent className="h-5 w-5" />}
            </div>

            <div className="space-y-1">
              <h3 className="text-foreground text-lg leading-tight font-semibold">
                {title}
              </h3>
              <Badge
                variant="outline"
                className={cn("text-xs font-medium", config.badgeClass)}
              >
                {config.badgeText}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-muted-foreground text-sm leading-relaxed">
          {message}
        </p>
      </CardContent>

      {/* Decorative Background Pattern */}
      <div className="absolute top-0 right-0 h-32 w-32 overflow-hidden opacity-5">
        <div
          className={cn(
            "h-full w-full translate-x-8 -translate-y-8 rotate-12",
            config.iconClass,
          )}
        >
          <IconComponent className="h-full w-full" />
        </div>
      </div>

      {/* Subtle Border Accent */}
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 h-1 opacity-20",
          config.iconClass.replace("text-", "bg-"),
        )}
      />
    </Card>
  );
}
