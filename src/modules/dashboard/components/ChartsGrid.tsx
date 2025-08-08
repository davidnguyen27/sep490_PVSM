import type { ReactNode } from "react";

interface ChartsGridProps {
  children: ReactNode;
}

export default function ChartsGrid({ children }: ChartsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">{children}</div>
  );
}
