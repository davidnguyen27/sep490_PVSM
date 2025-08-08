import { icons } from "@/shared/constants/icons.constants";

interface StatsCardProps {
  title: string;
  value: number;
  change: string;
  iconName: keyof typeof icons;
  color: string;
}

export default function StatsCard({
  title,
  value,
  change,
  iconName,
  color,
}: StatsCardProps) {
  const IconComponent = icons[iconName];

  return (
    <div className="border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-inter-500 mb-1 text-sm text-gray-600">{title}</p>
          <p className="font-nunito-700 text-2xl text-gray-900">{value}</p>
          <p className="font-nunito-500 text-sm text-green-600">
            {change} từ tháng trước
          </p>
        </div>
        <div className={`${color} border border-gray-100 p-3 text-white`}>
          <IconComponent className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
