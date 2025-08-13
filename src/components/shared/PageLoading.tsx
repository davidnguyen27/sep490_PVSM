import { cn } from "@/lib/utils";
import Spinner from "./Spinner";

interface PageLoadingProps {
  title?: string;
  subtitle?: string;
  variant?: "primary" | "secondary" | "success";
}

export default function PageLoading({
  title = "Đang tải dữ liệu...",
  subtitle,
  variant = "primary",
}: PageLoadingProps) {
  return (
    <div className="flex min-h-[500px] flex-col items-center justify-center space-y-6 p-8">
      <div className="relative">
        <Spinner
          size="2xl"
          variant={variant}
          showPulse
          className="drop-shadow-lg"
        />
        <div className="from-primary/20 to-secondary/20 absolute -inset-4 animate-pulse rounded-full bg-gradient-to-r via-transparent blur-xl" />
      </div>

      <div className="max-w-md space-y-3 text-center">
        <h3 className="font-nunito-600 text-foreground animate-pulse text-lg">
          {title}
        </h3>
        {subtitle && (
          <p className="text-muted-foreground font-nunito-400 animate-pulse leading-relaxed">
            {subtitle}
          </p>
        )}

        {/* Progress dots */}
        <div className="flex justify-center space-x-2 pt-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-2 w-2 animate-bounce rounded-full",
                variant === "primary" && "bg-primary",
                variant === "secondary" && "bg-secondary",
                variant === "success" && "bg-green-600",
              )}
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
