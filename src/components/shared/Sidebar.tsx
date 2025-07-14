import { cn } from "@/lib/utils";
import { images } from "@/shared/constants/images";
import { icons } from "@/shared/constants/icons";
import { useSidebar } from "@/shared/hooks/useSidebar";
import { Link, useLocation } from "react-router-dom";

interface SidebarItem {
  label: string;
  icon: React.ReactNode;
  path?: string;
  children?: SidebarItem[];
}

interface SidebarProps {
  items: SidebarItem[];
}

export default function Sidebar({ items }: SidebarProps) {
  const { openMenus, toggleMenu, isCollapsed, toggleCollapse } = useSidebar();
  const location = useLocation();

  const isActive = (path?: string) => path && location.pathname === path;

  return (
    <aside
      className={cn(
        "bg-primary relative flex h-screen flex-col text-white transition-all duration-300 ease-in-out",
        "overflow-hidden",
        isCollapsed ? "w-24" : "w-64",
      )}
    >
      {/* Logo */}
      <div className="mb-2 flex w-full justify-center">
        <img
          src={images.VaxPetLogo}
          alt="VaxPet Logo"
          className="h-auto w-48 cursor-pointer object-contain transition-opacity duration-300"
        />
      </div>

      {/* Menu Items */}
      <nav className="font-nunito flex flex-col gap-0 px-2 text-sm">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex flex-col gap-0 border-b border-white/20 py-[2px]"
          >
            {item.children ? (
              <button
                className={cn(
                  "flex items-center justify-between rounded p-3 transition-all duration-200",
                  isActive(item.path) && "bg-white/20",
                  "hover:bg-white/20",
                )}
                onClick={() => toggleMenu(item.label)}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <span>{item.icon}</span>
                  <span
                    className={cn(
                      "ml-1 text-base whitespace-nowrap transition-opacity duration-300 ease-in-out",
                      isCollapsed ? "opacity-0" : "opacity-100",
                    )}
                  >
                    {item.label}
                  </span>
                </div>
                <span
                  className={cn(
                    "transition-transform duration-300",
                    openMenus.includes(item.label) ? "rotate-90" : "rotate-0",
                  )}
                >
                  <icons.ChevronRight size={18} />
                </span>
              </button>
            ) : (
              <Link
                to={item.path || "#"}
                className={cn(
                  "flex items-center gap-3 rounded p-3 transition-all duration-200 hover:bg-white/20",
                  isActive(item.path) && "bg-white/20",
                )}
              >
                <span>{item.icon}</span>
                <span
                  className={cn(
                    "ml-1 text-base whitespace-nowrap transition-all duration-300 ease-in-out",
                    isCollapsed
                      ? "w-0 translate-x-[-10px] opacity-0"
                      : "w-auto translate-x-0 opacity-100",
                  )}
                >
                  {item.label}
                </span>
              </Link>
            )}

            {/* Submenu */}
            {item.children && openMenus.includes(item.label) && (
              <div className="ml-5 border-l border-white/20 pl-3">
                {item.children.map((child) => (
                  <Link
                    key={child.label}
                    to={child.path || "#"}
                    className={cn(
                      "font-nunito flex items-center gap-3 rounded px-1 py-1.5 text-sm text-white transition-all hover:bg-white/20",
                      isActive(child.path) && "bg-white/20",
                    )}
                  >
                    <span>{child.icon}</span>
                    <span
                      className={cn(
                        "transition-opacity duration-300 ease-in-out",
                        isCollapsed ? "opacity-0" : "opacity-100",
                      )}
                    >
                      {child.label}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Collapse/Expand Button */}
      <div
        onClick={toggleCollapse}
        role="button"
        className="hover:bg-secondary mt-auto flex w-full cursor-pointer items-center justify-center border-t border-t-white/20 py-4"
      >
        {isCollapsed ? (
          <icons.ChevronRight size={20} />
        ) : (
          <icons.ChevronLeft size={20} />
        )}
      </div>
    </aside>
  );
}
