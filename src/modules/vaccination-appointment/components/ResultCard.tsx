import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ClipboardPen } from "lucide-react";

interface ResultCardProps {
  vaccineType: string;
  values: {
    reaction: string;
    appointmentDate: string;
    notes: string;
  };
  onChange: (field: keyof ResultCardProps["values"], value: string) => void;
  canEdit?: boolean;
  disabled?: boolean;
}

export function ResultCard({
  vaccineType,
  values,
  onChange,
  disabled,
  canEdit,
}: ResultCardProps) {
  return (
    <Card className="bg-linen rounded-none py-4">
      <CardHeader>
        <CardTitle className="font-nunito-700 text-primary flex items-center gap-2 text-lg underline">
          <ClipboardPen size={16} /> Thông tin sau tiêm vaccine
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <Label className="font-nunito-600 text-dark text-xs">
              Loại vaccine
            </Label>
            <Input
              value={vaccineType}
              disabled
              readOnly
              className="bg-muted cursor-not-allowed"
            />
          </div>
          <div className="space-y-1 md:col-span-2">
            <Label className="font-nunito-600 text-dark text-xs">
              Phản ứng sau tiêm <span className="text-red-500">*</span>
            </Label>
            <Input
              placeholder="VD: Bình thường, sốt nhẹ, sưng đỏ..."
              value={values.reaction}
              disabled={disabled || canEdit}
              onChange={(e) => onChange("reaction", e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-1">
          <Label className="font-nunito-600 text-dark text-xs">Ghi chú</Label>
          <Textarea
            placeholder="Nhập ghi chú thêm (nếu có)..."
            rows={3}
            value={values.notes}
            disabled={disabled || canEdit}
            onChange={(e) => onChange("notes", e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
