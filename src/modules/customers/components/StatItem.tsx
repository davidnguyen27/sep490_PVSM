interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  suffix?: string;
  bgColor: string;
  textColor: string;
}

export function StatItem({
  icon,
  label,
  value,
  suffix,
  bgColor,
  textColor,
}: StatItemProps) {
  return (
    <div className={`rounded-lg p-3 ${bgColor}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <span className={`font-inter text-sm font-medium ${textColor}`}>
            {label}
          </span>
        </div>
      </div>
      <div className={`font-nunito mt-1 text-lg font-bold ${textColor}`}>
        {value}
        {suffix && (
          <span className="font-nunito ml-1 text-sm font-normal">{suffix}</span>
        )}
      </div>
    </div>
  );
}
