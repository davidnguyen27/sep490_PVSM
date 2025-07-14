import { ChevronRight } from "lucide-react";

interface Props {
  items: string[];
}

export default function PageBreadcrumb({ items }: Props) {
  return (
    <div className="text-muted-foreground mt-2 flex items-center text-xs">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          <span
            className={`font-nunito ${
              index === items.length - 1
                ? "text-accent-foreground font-nunito-600"
                : "font-nunito-500 cursor-pointer"
            }`}
          >
            {item}
          </span>
          {index < items.length - 1 && (
            <ChevronRight size={14} strokeWidth={1.5} className="mx-1" />
          )}
        </div>
      ))}
    </div>
  );
}
