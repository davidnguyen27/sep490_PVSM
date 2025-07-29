import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Thermometer,
  Activity,
  HeartPulse,
  Stethoscope,
} from "lucide-react";
import { Input } from "@/components/ui/input";

interface HealthCheckData {
  temperature: string;
  generalCondition: string;
  heartRate: string;
  others: string;
}

interface Props {
  data: HealthCheckData;
  onChange: (data: HealthCheckData) => void;
  disabled?: boolean;
  canEdit?: boolean;
}

export function HealthCheckCard({ data, onChange, disabled, canEdit }: Props) {
  const [open, setOpen] = useState(true);

  console.log("disabled", disabled);

  return (
    <Card className="bg-linen rounded-none">
      <CardContent className="space-y-4 p-6">
        {/* Header */}
        <div
          className="flex cursor-pointer items-center justify-between border-b pb-3"
          onClick={() => setOpen(!open)}
        >
          <h2 className="font-nunito-700 text-primary flex items-center gap-2 text-lg underline">
            <Stethoscope size={16} />
            Kiểm tra sức khỏe trước tiêm
          </h2>
          {open ? (
            <ChevronUp
              size={20}
              className="text-primary transition-transform"
            />
          ) : (
            <ChevronDown
              size={20}
              className="text-primary transition-transform"
            />
          )}
        </div>

        {/* Content */}
        {open && (
          <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
            <InputInfo
              label="Nhiệt độ cơ thể (°C)"
              icon={<Thermometer size={16} />}
              placeholder="Nhập nhiệt độ cơ thể..."
              inputType="number"
              value={data.temperature}
              disabled={disabled || canEdit}
              onChange={(val) => onChange({ ...data, temperature: val })}
            />
            <InputInfo
              label="Tình trạng tổng quát"
              icon={<Activity size={16} />}
              placeholder="Nhập tình trạng tổng quát..."
              inputType="text"
              value={data.generalCondition}
              disabled={disabled || canEdit}
              onChange={(val) => onChange({ ...data, generalCondition: val })}
            />
            <InputInfo
              label="Nhịp tim (lần/phút)"
              icon={<HeartPulse size={16} />}
              placeholder="Nhập nhịp tim..."
              inputType="number"
              value={data.heartRate}
              disabled={disabled || canEdit}
              onChange={(val) => onChange({ ...data, heartRate: val })}
            />
            <InputInfo
              label="Dấu hiệu sinh tồn khác"
              icon={<Stethoscope size={16} />}
              placeholder="Nhập dấu hiệu khác..."
              inputType="text"
              value={data.others}
              disabled={disabled || canEdit}
              onChange={(val) => onChange({ ...data, others: val })}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface InputInfoProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  placeholder: string;
  inputType?: "text" | "number";
  onChange: (val: string) => void;
  disabled?: boolean;
}

function InputInfo({
  label,
  value,
  icon,
  placeholder,
  inputType,
  onChange,
  disabled,
}: InputInfoProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    if (inputType === "number") {
      if (val === "") {
        return onChange("");
      }

      const valid = /^[0-9]*\.?[0-9]*$/.test(val);
      if (!valid) return;

      const numberValue = Number(val);
      if (numberValue < 0) return;

      return onChange(val);
    }
    onChange(val);
  };

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-[#E3E3E3] bg-[#FFFDFB] p-3">
      <div className="flex items-start gap-2">
        <div className="text-primary mt-1">{icon}</div>
        <div className="flex flex-1 flex-col">
          <span className="text-dark font-nunito-600 text-xs">{label}</span>
          <Input
            inputMode={inputType === "number" ? "decimal" : "text"}
            type="text"
            placeholder={placeholder}
            value={value}
            disabled={disabled}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}
