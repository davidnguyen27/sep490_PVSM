import { cn } from "@/lib/utils";
import { Loader2, RefreshCw } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

const spinnerVariants = cva("animate-spin", {
  variants: {
    size: {
      xs: "h-3 w-3",
      sm: "h-4 w-4",
      md: "h-6 w-6",
      lg: "h-8 w-8",
      xl: "h-12 w-12",
    },
    variant: {
      default: "text-primary",
      muted: "text-muted-foreground",
      white: "text-white",
      accent: "text-accent-foreground",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
  },
});

const containerVariants = cva("flex items-center justify-center", {
  variants: {
    layout: {
      inline: "",
      center: "min-h-[200px]",
      fullscreen: "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm",
      overlay: "absolute inset-0 z-10 bg-background/50 backdrop-blur-sm",
    },
  },
  defaultVariants: {
    layout: "center",
  },
});

export interface SpinnerProps
  extends VariantProps<typeof spinnerVariants>,
    VariantProps<typeof containerVariants> {
  className?: string;
  containerClassName?: string;
  text?: string;
  icon?: "loader" | "refresh";
}

export default function Spinner({
  size,
  variant,
  layout,
  className,
  containerClassName,
  text,
  icon = "loader",
}: SpinnerProps) {
  const IconComponent = icon === "refresh" ? RefreshCw : Loader2;

  const SpinnerContent = () => (
    <div className="flex flex-col items-center gap-3">
      <IconComponent
        className={cn(spinnerVariants({ size, variant }), className)}
      />
      {text && (
        <p
          className={cn(
            "animate-pulse text-sm font-medium",
            variant === "white"
              ? "text-white"
              : variant === "muted"
                ? "text-muted-foreground"
                : "text-foreground",
          )}
        >
          {text}
        </p>
      )}
    </div>
  );

  return (
    <div className={cn(containerVariants({ layout }), containerClassName)}>
      <SpinnerContent />
    </div>
  );
}

// Loading Skeleton Component for better UX
export function LoadingSkeleton({
  className,
  rows = 3,
  showAvatar = false,
}: {
  className?: string;
  rows?: number;
  showAvatar?: boolean;
}) {
  return (
    <div className={cn("space-y-4 p-4", className)}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-start space-x-4">
          {showAvatar && (
            <div className="bg-muted h-10 w-10 animate-pulse rounded-full" />
          )}
          <div className="flex-1 space-y-2">
            <div
              className="bg-muted h-4 animate-pulse rounded"
              style={{ width: `${80 + Math.random() * 20}%` }}
            />
            <div
              className="bg-muted h-4 animate-pulse rounded"
              style={{ width: `${60 + Math.random() * 30}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// Page Loading Component
export function PageLoading({
  title = "Đang tải...",
  subtitle,
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4">
      <Spinner size="xl" text={title} />
      {subtitle && (
        <p className="text-muted-foreground max-w-md text-center">{subtitle}</p>
      )}
    </div>
  );
}

// Button Loading Component
export function ButtonSpinner({
  size = "sm",
  className,
}: {
  size?: "xs" | "sm" | "md";
  className?: string;
}) {
  return (
    <Loader2
      className={cn(spinnerVariants({ size, variant: "white" }), className)}
    />
  );
}

// Inline Loading Component
export function InlineLoading({
  text = "Đang tải...",
  size = "sm",
}: {
  text?: string;
  size?: "xs" | "sm" | "md";
}) {
  return (
    <div className="flex items-center gap-2">
      <Spinner size={size} layout="inline" />
      <span className="text-muted-foreground text-sm">{text}</span>
    </div>
  );
}
