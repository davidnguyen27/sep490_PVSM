import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ConditionFormData } from "../types/state.type";
import { Input } from "@/components/ui";

interface Props {
  values: ConditionFormData["healthCheck"];
  vitalSigns: ConditionFormData["vitalSigns"];
  onChange: (
    section: "healthCheck" | "vitalSigns",
    field: string,
    value: string,
  ) => void;
  disabled?: boolean;
  canEdit?: boolean;
}

export function GeneralHealthCheckCard({
  values,
  vitalSigns,
  onChange,
  canEdit,
  disabled,
}: Props) {
  const vitalSignFields: {
    key: keyof typeof vitalSigns;
    label: string;
    unit?: string;
  }[] = [
    { key: "heartRate", label: "Nhịp tim", unit: "bpm" },
    { key: "breathingRate", label: "Nhịp thở", unit: "lần/phút" },
    { key: "weight", label: "Cân nặng", unit: "kg" },
    { key: "temperature", label: "Nhiệt độ", unit: "°C" },
  ];

  const healthCheckFields: {
    key: keyof typeof values;
    label: string;
    placeholder?: string;
  }[] = [
    {
      key: "eHNM",
      label: "Tai, mắt, mũi, miệng",
      placeholder: "Mô tả tình trạng tai, mắt, mũi, miệng của thú cưng...",
    },
    {
      key: "skinAFur",
      label: "Da & Lông",
      placeholder: "Mô tả tình trạng da và lông của thú cưng...",
    },
    {
      key: "digestion",
      label: "Tiêu hóa",
      placeholder: "Mô tả tình trạng tiêu hóa, ăn uống...",
    },
    {
      key: "respiratory",
      label: "Hô hấp",
      placeholder: "Mô tả tình trạng hô hấp, thở...",
    },
    {
      key: "excrete",
      label: "Bài tiết",
      placeholder: "Mô tả tình trạng bài tiết, đi vệ sinh...",
    },
    {
      key: "behavior",
      label: "Hành vi",
      placeholder: "Mô tả hành vi, hoạt động của thú cưng...",
    },
    {
      key: "psycho",
      label: "Tâm lý",
      placeholder: "Mô tả tình trạng tâm lý, tinh thần...",
    },
    {
      key: "different",
      label: "Triệu chứng khác",
      placeholder: "Mô tả các triệu chứng bất thường khác...",
    },
  ];

  const isFieldDisabled = canEdit || disabled;

  return (
    <div className="space-y-6">
      {/* Vital Signs Section */}
      <Card className="border border-gray-200 bg-white shadow-sm">
        <div className="p-6">
          <div className="mb-4 flex items-center gap-2">
            <div className="bg-primary h-6 w-1 rounded-full"></div>
            <h3 className="text-lg font-semibold text-gray-900">
              Chỉ số sinh tồn
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {vitalSignFields.map(({ key, label, unit }) => (
              <div key={key} className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  {label}
                  {unit && <span className="ml-1 text-gray-500">({unit})</span>}
                </Label>
                <div className="relative">
                  <Input
                    type="number"
                    min={0}
                    max={300}
                    step={0.1}
                    value={vitalSigns[key]}
                    onChange={(e) =>
                      onChange("vitalSigns", key, e.target.value)
                    }
                    disabled={isFieldDisabled}
                    className="focus:ring-primary/20 focus:border-primary pr-12 focus:ring-2"
                    placeholder="0"
                  />
                  {unit && (
                    <span className="absolute top-1/2 right-3 -translate-y-1/2 text-sm text-gray-500">
                      {unit}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Health Check Section */}
      <Card className="border border-gray-200 bg-white shadow-sm">
        <div className="p-6">
          <div className="mb-4 flex items-center gap-2">
            <div className="bg-primary h-6 w-1 rounded-full"></div>
            <h3 className="text-lg font-semibold text-gray-900">
              Khám lâm sàng
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {healthCheckFields.map(({ key, label, placeholder }) => (
              <div key={key} className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  {label}
                </Label>
                <Textarea
                  className="focus:ring-primary/20 focus:border-primary min-h-[100px] resize-none focus:ring-2"
                  value={values[key]}
                  onChange={(e) => onChange("healthCheck", key, e.target.value)}
                  disabled={isFieldDisabled}
                  placeholder={placeholder}
                />
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Conclusion Section */}
      <Card className="from-primary/5 to-primary/10 border-primary/20 border bg-gradient-to-r shadow-sm">
        <div className="p-6">
          <div className="mb-4 flex items-center gap-2">
            <div className="bg-primary h-6 w-1 rounded-full"></div>
            <h3 className="text-primary text-lg font-semibold">Kết luận</h3>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Kết luận chung về tình trạng sức khỏe
            </Label>
            <Textarea
              className="focus:ring-primary/20 focus:border-primary min-h-[120px] resize-none bg-white focus:ring-2"
              value={values.conclusion}
              onChange={(e) =>
                onChange("healthCheck", "conclusion", e.target.value)
              }
              disabled={isFieldDisabled}
              placeholder="Nhập kết luận tổng quát về tình trạng sức khỏe của thú cưng, chẩn đoán và khuyến nghị điều trị..."
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
