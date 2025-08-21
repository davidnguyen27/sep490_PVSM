import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ResultCardProps {
  values: {
    description: string;
    note: string;
  };
  onChange: (field: keyof ResultCardProps["values"], value: string) => void;
  readOnly?: boolean;
}

export function ResultCard({
  values,
  onChange,
  readOnly = false,
}: ResultCardProps) {
  return (
    <Card className="bg-linen rounded-none py-4">
      <CardHeader>
        <CardTitle className="text-foreground text-base font-semibold">
          Thông tin sau cấy microchip
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <Label className="text-sm font-medium">
            Vị trí cấy <span className="text-red-500">*</span>
          </Label>
          <Input
            placeholder="VD: Vị trí cấy microchip,..."
            value={values.description}
            onChange={(e) => onChange("description", e.target.value)}
            readOnly={readOnly}
            className={
              readOnly ? "bg-muted text-muted-foreground cursor-default" : ""
            }
          />
        </div>
        <div className="space-y-1">
          <Label className="text-sm font-medium">Ghi chú</Label>
          <Textarea
            placeholder="Nhập ghi chú thêm (nếu có)..."
            rows={3}
            value={values.note}
            onChange={(e) => onChange("note", e.target.value)}
            readOnly={readOnly}
            className={
              readOnly ? "bg-muted text-muted-foreground cursor-default" : ""
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}
