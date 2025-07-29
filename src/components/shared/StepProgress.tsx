import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export interface Step {
  label: string;
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
    <div className="my-10 flex items-center justify-center">
      <div className="mx-auto flex w-full max-w-4xl items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;

          return (
            <div key={step.label} className="flex flex-1 items-center">
              <div
                className="z-10 flex cursor-pointer flex-col items-center"
                onClick={() => onStepClick?.(stepNumber)}
              >
                <div
                  className={cn(
                    "font-nunito flex size-12 items-center justify-center rounded-full text-base transition-all",
                    isCompleted && "border-primary bg-primary text-white",
                    isActive &&
                      "border-primary bg-primary text-white hover:shadow-md",
                    !isCompleted && !isActive && "text-dark bg-[#EEEEEE]",
                  )}
                >
                  {isCompleted ? <Check size={24} /> : stepNumber}
                </div>
                <span
                  className={cn(
                    "font-nunito mt-1.5 text-sm",
                    isCompleted && "text-primary",
                    isActive && "text-primary",
                    !isCompleted && !isActive && "text-dark",
                  )}
                >
                  {step.label}
                </span>
              </div>

              {index !== steps.length - 1 && (
                <div className="relative h-1 flex-1 overflow-hidden bg-[#E3E3E3]">
                  <div
                    className={cn(
                      "bg-primary absolute top-0 left-0 h-full transition-all",
                      currentStep > stepNumber && "w-full",
                      currentStep === stepNumber && "w-1/2",
                      currentStep < stepNumber && "w-0",
                    )}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
