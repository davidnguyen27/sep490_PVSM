import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { cva } from "class-variance-authority";

const spinnerVariants = cva("animate-spin transition-all duration-300", {
  variants: {
    size: {
      xs: "h-3 w-3",
      sm: "h-4 w-4",
      md: "h-6 w-6",
    },
    variant: {
      white: "text-white drop-shadow-lg",
      primary: "text-primary drop-shadow-sm",
      secondary: "text-secondary",
    },
  },
  defaultVariants: {
    size: "sm",
    variant: "white",
  },
});

interface ButtonSpinnerProps {
  size?: "xs" | "sm" | "md";
  className?: string;
  variant?: "white" | "primary" | "secondary";
}

export default function ButtonSpinner({
  size = "sm",
  className,
  variant = "white",
}: ButtonSpinnerProps) {
  return (
    <div className="flex items-center">
      <Loader2
        className={cn(spinnerVariants({ size, variant }), "mr-1", className)}
      />
    </div>
  );
}
