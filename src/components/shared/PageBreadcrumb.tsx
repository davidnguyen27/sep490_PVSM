import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface Props {
  items: (string | BreadcrumbItem)[];
  showHome?: boolean;
}

export default function PageBreadcrumb({ items, showHome = true }: Props) {
  const normalizedItems = items.map((item) =>
    typeof item === "string" ? { label: item } : item,
  );

  return (
    <nav className="font-nunito-400 mb-6 flex items-center space-x-1 text-[12px] text-gray-600">
      {showHome && (
        <>
          <Link
            to="/admin/dashboard"
            className="hover:text-primary font-nunito-500 flex items-center transition-colors"
          >
            <Home size={16} className="mr-1" />
            Dashboard
          </Link>
          {normalizedItems.length > 0 && (
            <ChevronRight size={16} className="text-gray-400" />
          )}
        </>
      )}

      {normalizedItems.map((item, index) => (
        <div key={index} className="flex items-center">
          {item.path ? (
            <Link
              to={item.path}
              className="hover:text-primary font-nunito-400 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span
              className={
                index === normalizedItems.length - 1
                  ? "font-nunito-600 text-gray-900"
                  : "hover:text-primary font-nunito-400 cursor-pointer transition-colors"
              }
            >
              {item.label}
            </span>
          )}

          {index < normalizedItems.length - 1 && (
            <ChevronRight size={16} className="mx-1 text-gray-400" />
          )}
        </div>
      ))}
    </nav>
  );
}
