import { Badge } from "@/components/ui/badge";

interface VaccineExportDetailItemInfoProps {
  icon: React.ElementType;
  label: string;
  value: string;
  badge?: {
    variant:
      | "default"
      | "secondary"
      | "destructive"
      | "outline"
      | null
      | undefined;
    text: string;
  };
}

export function VaccineExportDetailItemInfo({
  icon: Icon,
  label,
  value,
  badge,
}: VaccineExportDetailItemInfoProps) {
  return (
    <div className="group hover:border-primary/20 rounded-lg border border-gray-100 bg-white p-4 transition-all hover:shadow-sm">
      <div className="flex items-start gap-3">
        <div className="bg-primary/5 group-hover:bg-primary/10 rounded-full p-2 transition-colors">
          <Icon className="text-primary h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-nunito-500 text-xs tracking-wide text-gray-500 uppercase">
            {label}
          </p>
          <div className="mt-1 flex items-center gap-2">
            <p className="font-nunito-600 text-sm text-gray-900">{value}</p>
            {badge && (
              <Badge
                variant={badge.variant}
                className="font-nunito-500 text-xs"
              >
                {badge.text}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
