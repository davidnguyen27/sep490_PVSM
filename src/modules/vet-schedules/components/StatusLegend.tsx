import { Card, CardContent } from "@/components/ui/card";

interface StatusConfig {
  color: string;
  label: string;
}

interface StatusLegendProps {
  statusConfig: Record<string, StatusConfig>;
}

export const StatusLegend = ({ statusConfig }: StatusLegendProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-wrap justify-center gap-4">
          {Object.entries(statusConfig).map(([status, config]) => (
            <div key={status} className="flex items-center gap-2">
              <div
                className={`h-4 w-4 rounded-full border ${config.color}`}
              ></div>
              <span className="text-sm text-gray-600">{config.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
