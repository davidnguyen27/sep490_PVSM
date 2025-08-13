import { cn } from "@/lib/utils";
import Spinner from "./Spinner";

interface InlineLoadingProps {
  text?: string;
  size?: "xs" | "sm" | "md";
  variant?: "primary" | "secondary" | "muted";
  showDots?: boolean;
}

export default function InlineLoading({
  text = "Đang tải...",
  size = "sm",
  variant = "primary",
  showDots = true,
}: InlineLoadingProps) {
  return (
    <div className="flex items-center gap-3 py-2">
      <Spinner size={size} layout="inline" variant={variant} />
      <div className="flex items-center gap-1">
        <span
          className={cn(
            "font-nunito-500 text-sm",
            variant === "primary" && "text-primary",
            variant === "secondary" && "text-secondary",
            variant === "muted" && "text-muted-foreground",
          )}
        >
          {text}
        </span>
        {showDots && (
          <div className="ml-1 flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-1 w-1 animate-bounce rounded-full",
                  variant === "primary" && "bg-primary",
                  variant === "secondary" && "bg-secondary",
                  variant === "muted" && "bg-muted-foreground",
                )}
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
