import { images } from "@/shared/constants/images";

interface AdminAuthProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AdminAuthProps) {
  return (
    <div className="flex h-screen flex-col lg:flex-row">
      <div className="bg-primary relative flex w-full flex-col items-start justify-start px-6 pt-10 pb-10 text-left text-white lg:w-[45%]">
        <h1 className="font-inter-600 mt-0 mb-6 w-full text-center text-3xl leading-relaxed sm:text-2xl md:text-3xl">
          Quản lý tiêm chủng thú cưng <br /> dễ dàng & hiệu quả
        </h1>
        <div className="flex w-full flex-1 items-center justify-center">
          <img
            src={images.DogBackground}
            alt="Dog Vaccine"
            className="object-contain sm:w-[260px] md:w-[480px]"
          />
        </div>
      </div>

      <div className="relative flex w-full items-center justify-center px-4 py-6 sm:px-10 md:px-20 lg:w-[55%] lg:min-w-[600px]">
        <img
          src={images.BackgroundCorner}
          alt="Logo"
          className="absolute top-5 right-5 w-8 sm:w-9 md:w-20"
        />
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
