import { cn } from "@/lib/utils";
import { icons } from "@/shared/constants/icons.constants";
import { useSidebar } from "@/shared/hooks/useSidebar";
import { Link, useLocation } from "react-router-dom";
import SidebarLogout from "./SidebarLogout";

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

  const isActive = (path?: string) =>
    Boolean(path && location.pathname === path);
  const isMobile = window.innerWidth < 1024;
  const shouldShowText = !isCollapsed || isMobile;

  // Shared class strings to reduce duplication
  const menuBaseClasses = cn(
    "flex w-full items-center rounded-lg py-2.5 text-sm font-nunito-500 transition-all duration-200 text-[#2D3748] hover:bg-primary hover:text-white",
    isCollapsed && !isMobile ? "justify-center px-2" : "px-3",
  );
  const submenuBaseClasses =
    "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-nunito-400 transition-all duration-200 text-gray-600 hover:bg-primary hover:text-white";
  const activeClasses = "bg-primary text-white";

  return (
    <>
      {/* Mobile overlay */}
      {!isCollapsed && (
        <div
          className="bg-opacity-50 fixed inset-0 top-16 z-40 bg-black lg:hidden"
          onClick={toggleCollapse}
        />
      )}

      <aside
        className={cn(
          "relative z-50 flex flex-col transition-all duration-300 ease-in-out",
          "font-nunito-400 overflow-hidden border-r-2 border-[#B8E6E1] bg-[#F0FBFA] shadow-lg",
          // Desktop
          "lg:relative lg:h-full lg:translate-x-0",
          isCollapsed ? "lg:w-16" : "lg:w-64",
          // Mobile
          "fixed top-16 h-[calc(100vh-4rem)] lg:static",
          isCollapsed
            ? "-translate-x-full lg:translate-x-0"
            : "w-64 translate-x-0",
        )}
      >
        {/* Menu Items */}
        <nav className="flex-1 space-y-1 overflow-x-hidden overflow-y-auto px-3 py-4">
          {items.map((item) => (
            <div key={item.label} className="space-y-1">
              {item.children ? (
                <>
                  <button
                    className={cn(
                      menuBaseClasses,
                      !isCollapsed || isMobile ? "justify-between" : "",
                      isActive(item.path) && activeClasses,
                    )}
                    onClick={() => toggleMenu(item.label)}
                  >
                    <div
                      className={cn(
                        "flex items-center",
                        isCollapsed && !isMobile
                          ? "justify-center"
                          : "space-x-3",
                      )}
                    >
                      <span className="flex-shrink-0">{item.icon}</span>
                      {shouldShowText && (
                        <span className="truncate">{item.label}</span>
                      )}
                    </div>
                    {shouldShowText && (
                      <span
                        className={cn(
                          "flex-shrink-0 transition-transform duration-200",
                          openMenus.includes(item.label)
                            ? "rotate-90"
                            : "rotate-0",
                        )}
                      >
                        <icons.ChevronRight size={16} />
                      </span>
                    )}
                  </button>

                  {/* Submenu */}
                  {item.children &&
                    openMenus.includes(item.label) &&
                    shouldShowText && (
                      <div className="ml-6 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            to={child.path || "#"}
                            className={cn(
                              submenuBaseClasses,
                              isActive(child.path) && activeClasses,
                            )}
                            onClick={() => isMobile && toggleCollapse()}
                          >
                            <span className="flex-shrink-0">{child.icon}</span>
                            <span className="truncate">{child.label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                </>
              ) : (
                <Link
                  to={item.path || "#"}
                  className={cn(
                    menuBaseClasses,
                    !isCollapsed || isMobile ? "space-x-3" : "",
                    isActive(item.path) && activeClasses,
                  )}
                  onClick={() => isMobile && toggleCollapse()}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {shouldShowText && (
                    <span className="truncate">{item.label}</span>
                  )}
                </Link>
              )}
            </div>
          ))}

          {/* Logout Section */}
          <SidebarLogout isCollapsed={isCollapsed && !isMobile} />
        </nav>
      </aside>
    </>
  );
}
