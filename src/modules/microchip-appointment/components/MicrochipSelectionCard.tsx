import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Cpu } from "lucide-react";
import { useMicrochipItems } from "@/modules/microchip-item";

interface Props {
  selectedId: number | null;
  onChange: (id: number | null) => void;
  disabled?: boolean;
}

export function MicrochipSelectionCard({
  selectedId,
  onChange,
  disabled,
}: Props) {
  const { data, isPending } = useMicrochipItems({
    isUsed: false,
    pageNumber: 1,
    pageSize: 100,
  });

  const microchipItems = Array.isArray(data?.data?.pageData)
    ? data.data!.pageData
    : [];

  return (
    <Card className="bg-linen rounded-none p-6">
      <h2 className="text-primary font-nunito-700 mb-4 flex items-center gap-2 text-lg underline">
        <Cpu size={16} />
        Chọn microchip
      </h2>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label className="font-nunito-700">Microchip</Label>
          {isPending ? (
            <Skeleton className="h-10 w-full rounded-md" />
          ) : (
            <Select
              value={selectedId ? String(selectedId) : ""}
              onValueChange={(value) => onChange(value ? Number(value) : null)}
              disabled={isPending || disabled || microchipItems.length === 0}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn microchip" />
              </SelectTrigger>
              <SelectContent>
                {microchipItems.map((item) => (
                  <SelectItem
                    key={item.microchipItemId}
                    value={String(item.microchipItemId)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">
                        {item.microchipResponse.microchipCode}
                      </span>
                      <span className="text-muted-foreground">
                        {item.microchipResponse.name}
                      </span>
                      {item.status === "Active" && (
                        <Badge
                          className="bg-primary ml-2 text-white"
                          variant="outline"
                        >
                          Kích hoạt
                        </Badge>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          {microchipItems.length === 0 && !isPending && (
            <p className="text-muted-foreground font-nunito text-sm">
              Không có microchip khả dụng.
            </p>
          )}
        </div>

        {/* Hiển thị thông tin microchip đã chọn */}
        {selectedId && !isPending && (
          <Card className="mt-2 border border-dashed bg-[#FFFDFB] p-3 shadow-none">
            {(() => {
              const selected = microchipItems.find(
                (item) => item.microchipItemId === selectedId,
              );
              if (!selected) return null;
              return (
                <div className="flex flex-col gap-1">
                  <div className="font-nunito-700 text-primary flex items-center gap-2 text-base">
                    <Cpu size={14} />
                    {selected.microchipResponse.microchipCode}
                  </div>
                  <div className="font-nunito text-sm">
                    Tên:{" "}
                    <span className="font-semibold">
                      {selected.microchipResponse.name}
                    </span>
                  </div>
                  {selected.microchipResponse.notes && (
                    <div className="text-muted-foreground font-nunito text-xs">
                      {selected.microchipResponse.notes}
                    </div>
                  )}
                  <div className="mt-1">
                    <Badge
                      className={
                        selected.status === "Active"
                          ? "bg-green-500 text-white"
                          : "bg-yellow-400 text-white"
                      }
                      variant="outline"
                    >
                      {selected.status === "Active"
                        ? "Đang hoạt động"
                        : "Chưa kích hoạt"}
                    </Badge>
                  </div>
                </div>
              );
            })()}
          </Card>
        )}
      </div>
    </Card>
  );
}
