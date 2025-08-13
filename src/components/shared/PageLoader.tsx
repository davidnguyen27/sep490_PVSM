import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Spinner from "./Spinner";

interface Props {
  children: React.ReactNode;
  loading?: boolean;
  loadingText?: string;
  variant?: "primary" | "secondary" | "white";
  size?: "sm" | "md" | "lg" | "xl";
  showPulse?: boolean;
}

export default function PageLoader({
  children,
  loading,
  loadingText = "Đang tải...",
  variant = "primary",
  size = "lg",
  showPulse = true,
}: Props) {
  const location = useLocation();
  const [internalLoading, setInternalLoading] = useState(false);

  useEffect(() => {
    if (loading !== undefined) return;

    setInternalLoading(true);
    const timeout = setTimeout(() => {
      setInternalLoading(false);
    }, 500); // Increased for better UX

    return () => clearTimeout(timeout);
  }, [location.pathname, loading]);

  const isLoading = loading ?? internalLoading;

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 z-20 transition-all duration-300 ease-in-out">
          <Spinner
            layout="overlay"
            variant={variant}
            size={size}
            text={loadingText}
            showPulse={showPulse}
            containerClassName="bg-white/90 backdrop-blur-md"
          />
        </div>
      )}
      <div
        className={
          isLoading
            ? "pointer-events-none opacity-60 blur-[1px] transition-all duration-300 ease-in-out"
            : "transition-all duration-300 ease-in-out"
        }
      >
        {children}
      </div>
    </div>
  );
}
