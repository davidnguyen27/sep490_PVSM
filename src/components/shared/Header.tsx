import { Input } from "@/components/ui/input";
import { useAuth } from "@/modules/auth";
import { icons } from "@/shared/constants/icons";

export default function Header() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-linen flex h-16 items-center justify-between border-b border-gray-200 px-4 sm:px-6">
      <div className="text-primary font-inter-700 truncate text-base sm:text-lg lg:text-xl">
        Hệ thống VaxPet
      </div>

      <div className="relative mx-4 hidden w-full max-w-xs md:block lg:max-w-sm">
        <icons.Search
          size={20}
          className="text-dark absolute top-1/2 left-3 -translate-y-1/2"
        />
        <Input
          placeholder="Tìm kiếm..."
          className="text-dark border-none bg-[#eeeeee] pr-3 pl-9 shadow-sm"
        />
      </div>

      <div className="text-dark flex items-center gap-3 sm:gap-5">
        <icons.Settings
          size={22}
          strokeWidth={1.5}
          className="cursor-pointer"
        />

        <div className="hidden items-center gap-1 sm:flex">
          <icons.CircleUserRound
            size={24}
            strokeWidth={1.5}
            className="cursor-pointer"
          />
          <span className="text-sm md:text-base">Xin chào</span>
          <span className="text-primary font-nunito-700 cursor-pointer text-sm underline md:text-base">
            Thế Anh
          </span>
        </div>

        {/* Logout */}
        <icons.LogOut
          size={20}
          strokeWidth={1.5}
          className="cursor-pointer"
          onClick={handleLogout}
        />
      </div>
    </header>
  );
}
