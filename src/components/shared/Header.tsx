import { Input } from "@/components/ui/input";
import { icons } from "@/shared/constants/icons.constants";
import { images } from "@/shared/constants/images.constants";
import { useSidebar } from "@/shared/hooks/useSidebar";
import { useAuth } from "@/modules/auth/hooks/use-auth-context";
import { useNavigate } from "react-router-dom";
import { Menu, ChevronDown, Scan } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import NotificationDropdown from "@/components/shared/NotificationDropdown";
import UserProfileDropdown, {
  type User,
} from "@/components/shared/UserProfileDropdown";
import ScanModal from "@/components/shared/ScanModal";
import useExpiringVaccineBatches from "@/modules/vaccine-batch/hooks/useExpiringVaccineBatches";

// UI style constants
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
    "absolute top-full right-0 mt-2 w-64 bg-white border border-gray-200 shadow-lg z-50 rounded-lg",
  dropdownItem:
    "flex items-center space-x-3 px-4 py-3 text-sm font-nunito-400 text-gray-700 hover:bg-gray-50 transition-colors duration-200 w-full text-left cursor-pointer",
  dropdownSeparator: "border-t border-gray-200",
  notificationDropdown:
    "absolute top-full right-0 mt-2 w-80 bg-white border border-gray-200 shadow-lg z-50 rounded-lg",
  notificationHeader:
    "flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50 rounded-t-lg",
  notificationItem:
    "flex items-center justify-between px-4 py-3 border-b last:border-b-0 hover:bg-gray-50 transition-colors duration-200 cursor-pointer",
} as const;

export default function Header() {
  // Fetch expiring vaccine batches for notification
  const { data: expiringBatches = [] } = useExpiringVaccineBatches();

  // State: notification, user dropdown, scan modal, scan code
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const [scannedCode, setScannedCode] = useState("");

  // Hooks and refs
  const { toggleCollapse } = useSidebar();
  const { user } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  // User info (replace with actual user state if needed)
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

  // Event handlers (useCallback for optimization)
  const handleDropdownToggle = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
  }, []);

  const handleNotificationToggle = useCallback(() => {
    setIsNotificationOpen((prev) => !prev);
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
      setIsScanModalOpen(false);
      let basePath = "/admin";
      if (user?.role === 2) {
        basePath = "/staff";
      } else if (user?.role === 3) {
        basePath = "/vet";
      }
      navigate(`${basePath}/scan-microchip/${scannedCode.trim()}`);
      setScannedCode("");
    }
  }, [scannedCode, navigate, user?.role]);

  const handleScanModalClose = useCallback(() => {
    setIsScanModalOpen(false);
    setScannedCode("");
  }, []);

  const handleNavigate = useCallback(
    (path: string) => {
      navigate(path);
    },
    [navigate],
  );

  // Close dropdowns when clicking outside
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

  useEffect(() => {
    if (!isNotificationOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isNotificationOpen]);

  return (
    <header className={HEADER_STYLES.container}>
      <div className="flex items-center justify-between gap-4">
        {/* Left: menu & brand */}
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

        {/* Center: search bar */}
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

        {/* Right: actions (scan, settings, notification, user) */}
        <div className="flex items-center space-x-3 px-4">
          {/* Scan microchip button */}
          <button
            onClick={handleScanMicrochip}
            className={HEADER_STYLES.scanButton}
            title="Quét microchip tìm lịch hẹn"
          >
            <Scan size={18} />
            <span>Tra cứu</span>
          </button>

          {/* Settings button: only show if not Staff (2) or Vet (3) */}
          {user?.role !== 2 && user?.role !== 3 && (
            <button
              className={HEADER_STYLES.iconButton}
              onClick={handleSettings}
            >
              <icons.Settings size={20} />
            </button>
          )}

          {/* Notification button */}
          {user?.role !== 2 && user?.role !== 3 && (
            <div className="relative" ref={notificationRef}>
              <button
                className={`${HEADER_STYLES.iconButton} relative`}
                onClick={handleNotificationToggle}
                title="Xem thông báo lô vắc-xin hết hạn"
              >
                <icons.Bell size={20} />
                {expiringBatches.length > 0 && (
                  <span className={HEADER_STYLES.notificationBadge}>
                    {expiringBatches.length}
                  </span>
                )}
              </button>

              <NotificationDropdown
                isOpen={isNotificationOpen}
                expiringBatches={expiringBatches}
                onNavigate={handleNavigate}
                onClose={() => setIsNotificationOpen(false)}
              />
            </div>
          )}

          {/* User profile dropdown */}
          <div className={HEADER_STYLES.userProfile} ref={dropdownRef}>
            <div
              className={HEADER_STYLES.userButton}
              onClick={handleDropdownToggle}
            >
              <div className={HEADER_STYLES.userAvatar}>
                <span className="font-nunito-500 text-sm text-white">
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

            <UserProfileDropdown
              isOpen={isDropdownOpen}
              user={currentUser}
              onViewProfile={handleViewProfile}
              onSettings={handleSettings}
            />
          </div>
        </div>
      </div>

      {/* Microchip scanner modal */}
      <ScanModal
        isOpen={isScanModalOpen}
        scannedCode={scannedCode}
        onCodeChange={setScannedCode}
        onSubmit={handleScanSubmit}
        onClose={handleScanModalClose}
      />
    </header>
  );
}
