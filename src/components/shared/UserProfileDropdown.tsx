import { icons } from "@/shared/constants/icons.constants";
import LogoutButton from "@/components/shared/LogoutButton";

interface User {
  name: string;
  email: string;
  initials: string;
  role: string;
}

interface UserProfileDropdownProps {
  isOpen: boolean;
  user: User;
  onViewProfile: () => void;
  onSettings: () => void;
}

const USER_PROFILE_STYLES = {
  dropdown:
    "absolute top-full right-0 mt-2 w-64 bg-white border border-gray-200 shadow-lg z-50 rounded-lg",
  dropdownItem:
    "flex items-center space-x-3 px-4 py-3 text-sm font-nunito-400 text-gray-700 hover:bg-gray-50 transition-colors duration-200 w-full text-left cursor-pointer",
  dropdownSeparator: "border-t border-gray-200",
} as const;

const UserProfileDropdown: React.FC<UserProfileDropdownProps> = ({
  isOpen,
  user,
  onViewProfile,
  onSettings,
}) => {
  if (!isOpen) return null;

  return (
    <div className={USER_PROFILE_STYLES.dropdown}>
      {/* User Info Section */}
      <div className="border-b border-gray-200 p-4">
        <div className="font-inter-600 text-sm text-gray-900">{user.name}</div>
        <div className="font-nunito-400 text-xs text-gray-500">
          {user.email}
        </div>
        <div className="font-nunito-400 text-primary text-xs">{user.role}</div>
      </div>

      {/* Actions Section */}
      <div className="py-2">
        <button
          onClick={onViewProfile}
          className={USER_PROFILE_STYLES.dropdownItem}
        >
          <icons.User size={16} />
          <span>Xem hồ sơ</span>
        </button>

        <button
          onClick={onSettings}
          className={USER_PROFILE_STYLES.dropdownItem}
        >
          <icons.Settings size={16} />
          <span>Cài đặt</span>
        </button>
      </div>

      {/* Logout Section */}
      <div className={USER_PROFILE_STYLES.dropdownSeparator}></div>
      <div className="py-2">
        <LogoutButton
          variant="ghost"
          className={`${USER_PROFILE_STYLES.dropdownItem} w-full justify-start text-red-600 hover:bg-red-50`}
          showIcon={true}
          showText={true}
        />
      </div>
    </div>
  );
};

export default UserProfileDropdown;
export type { User, UserProfileDropdownProps };
