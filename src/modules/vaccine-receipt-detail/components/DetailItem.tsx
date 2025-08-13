import React from "react";

interface DetailItemProps {
  icon: React.ElementType;
  label: string;
  value: string;
  colorClass?: string;
}

export function DetailItem({
  icon: Icon,
  label,
  value,
  colorClass = "blue",
}: DetailItemProps) {
  return (
    <div
      className={`group rounded-lg border border-gray-100 p-4 transition-all hover:border-${colorClass}-200 hover:bg-${colorClass}-50/30`}
    >
      <div className="flex items-center space-x-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg bg-${colorClass}-100 group-hover:bg-${colorClass}-200`}
        >
          <Icon className={`h-5 w-5 text-${colorClass}-600`} />
        </div>
        <div>
          <p className="font-nunito-500 text-sm text-gray-600">{label}</p>
          <p className="font-nunito-600 text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}
