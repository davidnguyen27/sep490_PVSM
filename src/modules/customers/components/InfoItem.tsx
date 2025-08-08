interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  suffix?: string;
  className?: string;
}

export function InfoItem({
  icon,
  label,
  value,
  suffix,
  className = "",
}: InfoItemProps) {
  return (
    <div className={`space-y-1 ${className}`}>
      <div className="flex items-center gap-2">
        {icon}
        <span className="font-nunito text-dark/80 text-sm font-medium">
          {label}
        </span>
      </div>
      <p className="font-nunito text-dark pl-6">
        {value}
        {suffix && <span className="text-dark/70 ml-1">{suffix}</span>}
      </p>
    </div>
  );
}
