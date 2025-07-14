import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  loading?: boolean;
}

export default function PageLoader({ children, loading }: Props) {
  const location = useLocation();
  const [internalLoading, setInternalLoading] = useState(false);

  useEffect(() => {
    if (loading !== undefined) return;

    setInternalLoading(true);
    const timeout = setTimeout(() => {
      setInternalLoading(false);
    }, 400);

    return () => clearTimeout(timeout);
  }, [location.pathname, loading]);

  const isLoading = loading ?? internalLoading;

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 transition-opacity">
          <Loader2 className="text-primary h-6 w-6 animate-spin" />
          <span className="font-nunito-500 text-primary ml-2 text-xl">
            Đang tải...
          </span>
        </div>
      )}
      <div
        className={
          isLoading
            ? "pointer-events-none opacity-50 transition-opacity"
            : "transition-opacity"
        }
      >
        {children}
      </div>
    </div>
  );
}
