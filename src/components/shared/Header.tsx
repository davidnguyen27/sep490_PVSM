import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { icons } from "@/shared/constants/icons.constants";
import { images } from "@/shared/constants/images.constants";
import { useSidebar } from "@/shared/hooks/useSidebar";
import { useAuth } from "@/modules/auth/hooks/use-auth-context";
import LogoutButton from "@/components/shared/LogoutButton";
import { useNavigate } from "react-router-dom";
import { Menu, ChevronDown, Scan, User } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";

// Types for better type safety
interface User {
  name: string;
  email: string;
  initials: string;
  role: string;
}

// Constants for better maintainability
const HEADER_STYLES = {
  container: "w-full bg-[#E0F7F5]",
  menuButton:
    "bg-primary flex size-16 items-center justify-center text-white transition-colors duration-200",
  iconButton:
    "rounded-lg p-2 text-gray-600 transition-colors duration-200 hover:bg-gray-100 hover:text-dark",
  notificationBadge:
    "absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white",
  searchInput:
    "w-full border-gray-300 bg-gray-50 py-3 pr-12 pl-12 text-sm font-nunito-400 focus:border-transparent focus:ring-2 focus:ring-blue-500",
  scanButton:
    "bg-primary hover:bg-secondary items-center space-x-2 px-3 py-2.5 text-sm font-inter-500 text-white transition-colors duration-200 md:flex rounded-sm",
  brandTitle: "hidden text-2xl font-inter-700 text-[#2D3748] sm:block",
  userProfile: "relative flex items-center space-x-3",
  userButton:
    "flex items-center space-x-2 cursor-pointer hover:bg-gray-100 rounded-lg p-2 transition-colors duration-200",
  userAvatar:
    "flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-primary to-teal-600",
  userName: "hidden text-sm font-inter-600 text-dark md:block",
  dropdown:
    "absolute top-full right-0 mt-2 w-64 bg-white border border-gray-200 shadow-lg z-50",
  dropdownItem:
    "flex items-center space-x-3 px-4 py-3 text-sm font-nunito-400 text-gray-700 hover:bg-gray-50 transition-colors duration-200 w-full text-left",
  dropdownSeparator: "border-t border-gray-200",
} as const;

export default function Header() {
  const { toggleCollapse } = useSidebar();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const [scannedCode, setScannedCode] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Mock user data - replace with actual user state
  const currentUser: User = {
    name: user?.email?.split("@")[0] || "User",
    email: user?.email || "user@vaxpet.vn",
    initials: user?.email?.charAt(0).toUpperCase() || "U",
    role:
      user?.role === 1
        ? "Admin"
        : user?.role === 2
          ? "Staff"
          : user?.role === 3
            ? "Vet"
            : "Unknown",
  };

  // Optimized event handlers with useCallback to prevent unnecessary re-renders
  const handleDropdownToggle = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
  }, []);

  const handleViewProfile = useCallback(() => {
    console.log("Viewing profile...");
    setIsDropdownOpen(false);
    // Add actual view profile logic here
  }, []);

  const handleSettings = useCallback(() => {
    console.log("Opening settings...");
    setIsDropdownOpen(false);
    navigate("/admin/settings");
  }, [navigate]);

  const handleScanMicrochip = useCallback(() => {
    console.log("Opening microchip scanner...");
    setIsScanModalOpen(true);
    setScannedCode("");
  }, []);

  const handleScanSubmit = useCallback(() => {
    if (scannedCode.trim()) {
      console.log("Navigating to scan page with microchip:", scannedCode);
      // Close modal and navigate to scan page immediately
      setIsScanModalOpen(false);
      navigate(`/admin/scan-microchip/${scannedCode.trim()}`);
      setScannedCode("");
    }
  }, [scannedCode, navigate]);

  const handleScanModalClose = useCallback(() => {
    setIsScanModalOpen(false);
    setScannedCode("");
  }, []);

  // Optimized outside click handler - only add listener when dropdown is open
  useEffect(() => {
    if (!isDropdownOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  return (
    <header className={HEADER_STYLES.container}>
      <div className="flex items-center justify-between gap-4">
        {/* Left section */}
        <div className="flex items-center">
          <button onClick={toggleCollapse} className={HEADER_STYLES.menuButton}>
            <Menu className="size-5" />
          </button>

          <div className="flex items-center px-4">
            <img
              src={images.VaxPetLogo}
              alt="VaxPet Logo"
              className="h-16 object-contain"
            />
            <h1 className={HEADER_STYLES.brandTitle}>VaxPet</h1>
          </div>
        </div>

        {/* Center section - Search */}
        <div className="mx-4 max-w-md flex-1 py-3">
          <div className="relative">
            <icons.Search
              size={20}
              className="absolute top-1/2 left-4 -translate-y-1/2 transform text-gray-400"
            />
            <Input
              placeholder="Tìm kiếm lịch hẹn"
              className={HEADER_STYLES.searchInput}
            />
          </div>
        </div>

        {/* Right section - Actions */}
        <div className="flex items-center space-x-3 px-4">
          {/* Scan Microchip Button */}
          <button
            onClick={handleScanMicrochip}
            className={HEADER_STYLES.scanButton}
            title="Quét microchip tìm lịch hẹn"
          >
            <Scan size={18} />
            <span>Tra cứu</span>
          </button>

          {/* Settings Button: chỉ hiển thị nếu không phải Staff (2) hoặc Vet (3) */}
          {user?.role !== 2 && user?.role !== 3 && (
            <button
              className={HEADER_STYLES.iconButton}
              onClick={handleSettings}
            >
              <icons.Settings size={20} />
            </button>
          )}

          {/* Notification Button */}
          <button className={`${HEADER_STYLES.iconButton} relative`}>
            <icons.Bell size={20} />
            <span className={HEADER_STYLES.notificationBadge}>3</span>
          </button>

          {/* User Profile Dropdown */}
          <div className={HEADER_STYLES.userProfile} ref={dropdownRef}>
            <div
              className={HEADER_STYLES.userButton}
              onClick={handleDropdownToggle}
            >
              <div className={HEADER_STYLES.userAvatar}>
                <span className="text-sm font-medium text-white">
                  {currentUser.initials}
                </span>
              </div>

              <div className="hidden md:flex md:flex-col">
                <span className={HEADER_STYLES.userName}>
                  {currentUser.name}
                </span>
                <span className="font-nunito-400 text-xs text-gray-500">
                  {currentUser.role}
                </span>
              </div>

              <ChevronDown
                size={16}
                className={`text-gray-500 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className={HEADER_STYLES.dropdown}>
                {/* User Info Section */}
                <div className="border-b border-gray-200 p-4">
                  <div className="font-inter-600 text-sm text-gray-900">
                    {currentUser.name}
                  </div>
                  <div className="font-nunito-400 text-xs text-gray-500">
                    {currentUser.email}
                  </div>
                  <div className="font-nunito-400 text-primary text-xs">
                    {currentUser.role}
                  </div>
                </div>

                {/* Actions Section */}
                <div className="py-2">
                  <button
                    onClick={handleViewProfile}
                    className={HEADER_STYLES.dropdownItem}
                  >
                    <icons.User size={16} />
                    <span>Xem hồ sơ</span>
                  </button>

                  <button
                    onClick={handleSettings}
                    className={HEADER_STYLES.dropdownItem}
                  >
                    <icons.Settings size={16} />
                    <span>Cài đặt</span>
                  </button>
                </div>

                {/* Logout Section */}
                <div className={HEADER_STYLES.dropdownSeparator}></div>
                <div className="py-2">
                  <LogoutButton
                    variant="ghost"
                    className={`${HEADER_STYLES.dropdownItem} w-full justify-start text-red-600 hover:bg-red-50`}
                    showIcon={true}
                    showText={true}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Microchip Scanner Modal */}
      <Dialog open={isScanModalOpen} onOpenChange={setIsScanModalOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Scan className="text-primary h-5 w-5" />
              Tra cứu microchip
            </DialogTitle>
            <DialogDescription>
              Nhập mã microchip để tìm kiếm thông tin thú cưng
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Manual Input Mode */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Mã microchip</label>
                <div className="flex gap-2">
                  <Input
                    value={scannedCode}
                    onChange={(e) => setScannedCode(e.target.value)}
                    placeholder="Nhập mã microchip..."
                    className="flex-1"
                    autoFocus
                  />
                  <Button
                    onClick={handleScanSubmit}
                    disabled={!scannedCode.trim()}
                    className="bg-primary hover:bg-secondary"
                  >
                    Tìm kiếm
                  </Button>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end space-x-2 border-t pt-4">
              <Button variant="outline" onClick={handleScanModalClose}>
                Đóng
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}
