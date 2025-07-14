import { createContext, useEffect, useState } from "react";

interface SidebarContextProps {
  openMenus: string[];
  toggleMenu: (label: string) => void;
  isCollapsed: boolean;
  toggleCollapse: () => void;
  setOpenMenus: React.Dispatch<React.SetStateAction<string[]>>;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined,
);

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false); // Ngăn render sớm

  // Load từ localStorage khi mount
  useEffect(() => {
    try {
      const savedMenus = localStorage.getItem("sidebar-open-menus");
      const savedCollapsed = localStorage.getItem("sidebar-is-collapsed");

      if (savedMenus) setOpenMenus(JSON.parse(savedMenus));
      if (savedCollapsed) setIsCollapsed(JSON.parse(savedCollapsed));
    } finally {
      setIsReady(true); // Chỉ khi load xong mới render
    }
  }, []);

  // Lưu openMenus vào localStorage
  useEffect(() => {
    if (isReady) {
      localStorage.setItem("sidebar-open-menus", JSON.stringify(openMenus));
    }
  }, [openMenus, isReady]);

  // Lưu isCollapsed vào localStorage
  useEffect(() => {
    if (isReady) {
      localStorage.setItem("sidebar-is-collapsed", JSON.stringify(isCollapsed));
    }
  }, [isCollapsed, isReady]);

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label],
    );
  };

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  // Ngăn render khi chưa load xong localStorage
  if (!isReady) return null;

  return (
    <SidebarContext.Provider
      value={{
        openMenus,
        toggleMenu,
        isCollapsed,
        toggleCollapse,
        setOpenMenus,
        setIsCollapsed,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
