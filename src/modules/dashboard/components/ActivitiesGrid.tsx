import type { ReactNode } from "react";

interface ActivitiesGridProps {
  children: ReactNode;
}

export default function ActivitiesGrid({ children }: ActivitiesGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">{children}</div>
  );
}
