import { cn } from "@/lib/utils";
import { Check, ChevronRight } from "lucide-react";

export interface Step {
  label: string;
  description?: string;
}

interface Props {
  steps: Step[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export default function StepProgress({
  steps,
  currentStep,
  onStepClick,
}: Props) {
  return (
    <div className="my-8 px-4">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isActive = stepNumber === currentStep;
            const isClickable = onStepClick && (isCompleted || isActive);

            return (
              <div key={step.label} className="flex flex-1 items-center">
                {/* Step Item */}
                <div className="flex flex-col items-center space-y-2">
                  {/* Step Circle */}
                  <div
                    className={cn(
                      "relative flex h-14 w-14 items-center justify-center rounded-full border-2 transition-all duration-300 ease-in-out",
                      isClickable && "cursor-pointer hover:scale-105",
                      isCompleted && [
                        "border-green-500 bg-green-500 text-white shadow-lg",
                        "hover:shadow-green-500/30",
                      ],
                      isActive && [
                        "border-primary bg-primary text-white shadow-lg",
                        "hover:shadow-primary/30",
                        "animate-pulse",
                      ],
                      !isCompleted &&
                        !isActive && [
                          "border-gray-300 bg-gray-100 text-gray-500",
                          "hover:border-gray-400 hover:bg-gray-200",
                        ],
                    )}
                    onClick={() => isClickable && onStepClick(stepNumber)}
                  >
                    {isCompleted ? (
                      <Check size={20} className="font-bold" />
                    ) : (
                      <span className="font-nunito-600 text-sm">
                        {stepNumber}
                      </span>
                    )}

                    {/* Active pulse ring */}
                    {isActive && (
                      <div className="border-primary/20 absolute -inset-1 animate-ping rounded-full border-2" />
                    )}
                  </div>

                  {/* Step Label */}
                  <div className="text-center">
                    <div
                      className={cn(
                        "font-nunito-600 text-sm transition-colors duration-200",
                        isCompleted && "text-green-600",
                        isActive && "text-primary",
                        !isCompleted && !isActive && "text-gray-500",
                      )}
                    >
                      {step.label}
                    </div>
                    {step.description && (
                      <div
                        className={cn(
                          "font-nunito mt-1 max-w-24 text-center text-xs transition-colors duration-200",
                          isCompleted && "text-green-500",
                          isActive && "text-primary/80",
                          !isCompleted && !isActive && "text-gray-400",
                        )}
                      >
                        {step.description}
                      </div>
                    )}
                  </div>
                </div>

                {/* Connection Line */}
                {index !== steps.length - 1 && (
                  <div className="flex flex-1 items-center px-4">
                    <div className="relative h-1 w-full overflow-hidden rounded-full bg-gray-200">
                      <div
                        className={cn(
                          "absolute top-0 left-0 h-full rounded-full transition-all duration-700 ease-in-out",
                          currentStep > stepNumber && "w-full bg-green-500",
                          currentStep === stepNumber && "bg-primary w-1/2",
                          currentStep < stepNumber && "w-0 bg-gray-300",
                        )}
                      />
                    </div>

                    {/* Animated chevron for active step */}
                    {currentStep === stepNumber && (
                      <ChevronRight
                        size={16}
                        className="text-primary ml-2 animate-bounce"
                      />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
