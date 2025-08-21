import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { LayoutGrid, Table2, BarChart3, TrendingUp, List } from "lucide-react";

export type ViewMode = "cards" | "table" | "master-detail" | "analytics";

interface ViewModeSwitcherProps {
  currentMode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
  totalItems: number;
  selectedItems?: number;
}

export function ViewModeSwitcher({
  currentMode,
  onModeChange,
  totalItems,
  selectedItems = 0,
}: ViewModeSwitcherProps) {
  const viewModes = [
    {
      key: "cards" as ViewMode,
      label: "Card View",
      icon: LayoutGrid,
      description: "Xem theo từng bệnh riêng biệt",
    },
    {
      key: "table" as ViewMode,
      label: "Table View",
      icon: Table2,
      description: "Xem tất cả trong một bảng",
    },
    {
      key: "master-detail" as ViewMode,
      label: "Master-Detail",
      icon: List,
      description: "Xem chi tiết từng bệnh",
    },
    {
      key: "analytics" as ViewMode,
      label: "Analytics",
      icon: TrendingUp,
      description: "Phân tích và thống kê",
    },
  ];

  return (
    <Card className="bg-linen border-primary/20 rounded-none">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          {/* View Mode Buttons */}
          <div className="flex items-center gap-2">
            <span className="font-nunito-700 text-dark mr-2 text-sm">
              Chế độ xem:
            </span>
            {viewModes.map((mode) => {
              const Icon = mode.icon;
              const isActive = currentMode === mode.key;

              return (
                <Button
                  key={mode.key}
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => onModeChange(mode.key)}
                  className={`font-nunito-600 transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-white shadow-md"
                      : "hover:bg-primary/5 hover:border-primary/30"
                  }`}
                  title={mode.description}
                >
                  <Icon className="mr-1 h-4 w-4" />
                  {mode.label}
                </Button>
              );
            })}
          </div>

          {/* Info & Stats */}
          <div className="flex items-center gap-3">
            {selectedItems > 0 && (
              <Badge
                variant="outline"
                className="font-nunito-600 border-primary text-primary"
              >
                {selectedItems} đã chọn
              </Badge>
            )}

            <Badge variant="outline" className="font-nunito-600">
              {totalItems} mục
            </Badge>

            {/* Quick Stats for different modes */}
            {currentMode === "analytics" && (
              <div className="text-dark/60 flex items-center gap-1 text-xs">
                <BarChart3 className="h-3 w-3" />
                <span className="font-nunito-500">Chế độ phân tích</span>
              </div>
            )}
          </div>
        </div>

        {/* Mode Description */}
        <div className="mt-3 border-t border-gray-200 pt-3">
          <p className="text-dark/60 font-nunito-500 text-xs">
            {viewModes.find((m) => m.key === currentMode)?.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
