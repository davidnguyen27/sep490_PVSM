import { cn } from "@/lib/utils";

interface LoadingSkeletonProps {
  className?: string;
  rows?: number;
  showAvatar?: boolean;
  variant?: "default" | "card" | "table";
}

export default function LoadingSkeleton({
  className,
  rows = 3,
  showAvatar = false,
  variant = "default",
}: LoadingSkeletonProps) {
  const SkeletonRow = ({ index }: { index: number }) => (
    <div
      className="flex animate-pulse items-start space-x-4"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {showAvatar && (
        <div className="bg-primary/10 border-primary/20 h-12 w-12 animate-pulse rounded-full border-2" />
      )}
      <div className="flex-1 space-y-3">
        <div
          className="from-primary/20 via-primary/10 to-primary/20 h-4 animate-pulse rounded-md bg-gradient-to-r"
          style={{ width: `${75 + Math.random() * 25}%` }}
        />
        <div
          className="from-secondary/20 via-secondary/10 to-secondary/20 h-3 animate-pulse rounded-md bg-gradient-to-r"
          style={{ width: `${50 + Math.random() * 40}%` }}
        />
        {variant === "card" && (
          <div className="bg-muted/40 h-2 w-1/3 animate-pulse rounded" />
        )}
      </div>
    </div>
  );

  return (
    <div
      className={cn(
        "space-y-6 p-6",
        variant === "card" && "rounded-lg border bg-white shadow-sm",
        variant === "table" && "bg-white/50",
        className,
      )}
    >
      {Array.from({ length: rows }).map((_, i) => (
        <SkeletonRow key={i} index={i} />
      ))}
    </div>
  );
}
