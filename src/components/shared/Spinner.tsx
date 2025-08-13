import { cn } from "@/lib/utils";
import { Loader2, RefreshCw } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

const spinnerVariants = cva("animate-spin transition-all duration-300", {
  variants: {
    size: {
      xs: "h-3 w-3",
      sm: "h-4 w-4",
      md: "h-6 w-6",
      lg: "h-8 w-8",
      xl: "h-12 w-12",
      "2xl": "h-16 w-16",
    },
    variant: {
      primary: "text-primary drop-shadow-sm",
      secondary: "text-secondary",
      muted: "text-muted-foreground",
      white: "text-white drop-shadow-lg",
      success: "text-green-600",
      warning: "text-warning",
      danger: "text-danger",
      info: "text-info",
      purple: "text-purple",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "primary",
  },
});

const containerVariants = cva(
  "flex items-center justify-center transition-all duration-300",
  {
    variants: {
      layout: {
        inline: "",
        center: "min-h-[200px]",
        fullscreen:
          "fixed inset-0 z-50 bg-white/90 dark:bg-dark/90 backdrop-blur-md",
        overlay:
          "absolute inset-0 z-20 bg-white/80 dark:bg-dark/80 backdrop-blur-sm",
        modal:
          "absolute inset-0 z-30 bg-white/95 dark:bg-dark/95 backdrop-blur-lg",
      },
    },
    defaultVariants: {
      layout: "center",
    },
  },
);

export interface SpinnerProps
  extends VariantProps<typeof spinnerVariants>,
    VariantProps<typeof containerVariants> {
  className?: string;
  containerClassName?: string;
  text?: string;
  icon?: "loader" | "refresh";
  showPulse?: boolean;
}

export default function Spinner({
  size,
  variant,
  layout,
  className,
  containerClassName,
  text,
  icon = "loader",
  showPulse = false,
}: SpinnerProps) {
  const IconComponent = icon === "refresh" ? RefreshCw : Loader2;

  const SpinnerContent = () => (
    <div className="flex flex-col items-center gap-4">
      <div className={cn("relative", showPulse && "animate-pulse")}>
        <IconComponent
          className={cn(spinnerVariants({ size, variant }), className)}
        />
        {showPulse && (
          <div
            className={cn(
              "absolute inset-0 animate-ping rounded-full opacity-20",
              variant === "primary" && "bg-primary",
              variant === "secondary" && "bg-secondary",
              variant === "success" && "bg-green-600",
              variant === "warning" && "bg-warning",
              variant === "danger" && "bg-danger",
              variant === "info" && "bg-info",
              variant === "purple" && "bg-purple",
            )}
          />
        )}
      </div>
      {text && (
        <div className="text-center">
          <p
            className={cn(
              "font-nunito-600 animate-pulse text-sm",
              variant === "white"
                ? "text-white"
                : variant === "muted"
                  ? "text-muted-foreground"
                  : variant === "primary"
                    ? "text-primary"
                    : variant === "secondary"
                      ? "text-secondary"
                      : "text-foreground",
            )}
          >
            {text}
          </p>
          <div className="mt-2 flex justify-center space-x-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-1 w-1 animate-bounce rounded-full",
                  variant === "primary" && "bg-primary",
                  variant === "secondary" && "bg-secondary",
                  variant === "white" && "bg-white",
                  variant === "muted" && "bg-muted-foreground",
                )}
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className={cn(containerVariants({ layout }), containerClassName)}>
      <SpinnerContent />
    </div>
  );
}
