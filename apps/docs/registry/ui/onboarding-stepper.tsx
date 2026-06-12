"use client"

import * as React from "react"
import { Check, Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export interface StepperStep {
  id: string
  title: string
  description?: string
}

interface StepperContextValue {
  steps: StepperStep[]
  currentStep: number
  onStepChange: (step: number) => void
  nonLinear: boolean
  maxStepReached: number
}

const StepperContext = React.createContext<StepperContextValue | null>(null)

function useStepper(): StepperContextValue {
  const context = React.useContext(StepperContext)
  if (!context) {
    throw new Error("Stepper components must be used within <Stepper>.")
  }
  return context
}

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: StepperStep[]
  /** Zero-based index of the active step. */
  currentStep: number
  onStepChange: (step: number) => void
  /** Allow jumping to any previously visited step via the indicator. */
  nonLinear?: boolean
  /** Replace the step circles with a progress bar and a "Step x of y" counter. */
  compact?: boolean
}

function Stepper({
  steps,
  currentStep,
  onStepChange,
  nonLinear = false,
  compact = false,
  className,
  children,
  ...props
}: StepperProps) {
  const [maxStepReached, setMaxStepReached] = React.useState(currentStep)

  React.useEffect(() => {
    setMaxStepReached((max) => Math.max(max, currentStep))
  }, [currentStep])

  const value = React.useMemo<StepperContextValue>(
    () => ({ steps, currentStep, onStepChange, nonLinear, maxStepReached }),
    [steps, currentStep, onStepChange, nonLinear, maxStepReached]
  )

  return (
    <StepperContext.Provider value={value}>
      <div className={cn("flex flex-col gap-8", className)} {...props}>
        {compact ? <StepperCompactIndicator /> : <StepperIndicator />}
        {children}
      </div>
    </StepperContext.Provider>
  )
}

function StepperCompactIndicator({ className }: { className?: string }) {
  const { steps, currentStep } = useStepper()
  const active = steps[currentStep]

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-baseline justify-between gap-4">
        <p className="truncate text-sm font-medium text-foreground">
          {active?.title}
        </p>
        <p className="shrink-0 text-sm text-muted-foreground">
          Step {currentStep + 1} of {steps.length}
        </p>
      </div>
      <Progress
        value={((currentStep + 1) / steps.length) * 100}
        aria-label={`Step ${currentStep + 1} of ${steps.length}`}
      />
    </div>
  )
}

function StepperIndicator({ className }: { className?: string }) {
  const { steps, currentStep, onStepChange, nonLinear, maxStepReached } =
    useStepper()

  function canNavigateTo(index: number): boolean {
    if (index === currentStep) return false
    return nonLinear ? index <= maxStepReached : index < currentStep
  }

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <ol className="flex items-center gap-3">
        {steps.map((step, index) => {
          const status =
            index < currentStep
              ? "completed"
              : index === currentStep
                ? "active"
                : "upcoming"
          const clickable = canNavigateTo(index)
          const isLast = index === steps.length - 1

          return (
            <li
              key={step.id}
              aria-current={status === "active" ? "step" : undefined}
              className={cn("flex items-center gap-3", !isLast && "flex-1")}
            >
              <button
                type="button"
                disabled={!clickable}
                onClick={() => onStepChange(index)}
                aria-label={`Step ${index + 1}: ${step.title}`}
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full border text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
                  status === "completed" &&
                    "border-primary bg-primary text-primary-foreground",
                  status === "active" &&
                    "border-primary text-foreground ring-2 ring-ring/20",
                  status === "upcoming" && "text-muted-foreground",
                  !clickable && "cursor-default"
                )}
              >
                {status === "completed" ? (
                  <Check className="size-4" aria-hidden="true" />
                ) : (
                  index + 1
                )}
              </button>
              <div className="hidden min-w-0 md:block">
                <p className="truncate text-sm font-medium leading-none text-foreground">
                  {step.title}
                </p>
                {step.description ? (
                  <p className="mt-1 truncate text-xs text-muted-foreground">
                    {step.description}
                  </p>
                ) : null}
              </div>
              {!isLast ? (
                <div
                  aria-hidden="true"
                  className={cn(
                    "h-px flex-1 bg-border transition-colors",
                    index < currentStep && "bg-primary"
                  )}
                />
              ) : null}
            </li>
          )
        })}
      </ol>
      <p className="text-sm text-muted-foreground md:hidden">
        Step {currentStep + 1} of {steps.length}:{" "}
        <span className="font-medium text-foreground">
          {steps[currentStep]?.title}
        </span>
      </p>
    </div>
  )
}

export interface StepperContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Zero-based index of the step this panel belongs to. */
  step: number
}

function StepperContent({
  step,
  className,
  children,
  ...props
}: StepperContentProps) {
  const { currentStep } = useStepper()
  if (step !== currentStep) return null

  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      {children}
    </div>
  )
}

export interface StepperFooterProps {
  onBack?: () => void
  onNext?: () => void
  isSubmitting?: boolean
  /** Defaults to "Next", or "Submit" on the last step. */
  nextLabel?: string
  backLabel?: string
  /** Validation error for the current step, announced politely. */
  error?: string
  className?: string
}

function StepperFooter({
  onBack,
  onNext,
  isSubmitting = false,
  nextLabel,
  backLabel = "Back",
  error,
  className,
}: StepperFooterProps) {
  const { steps, currentStep } = useStepper()
  const isFirst = currentStep === 0
  const isLast = currentStep === steps.length - 1

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <p
        aria-live="polite"
        className={cn("text-sm text-destructive", !error && "sr-only")}
      >
        {error}
      </p>
      <div className="flex items-center justify-between gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={isFirst || isSubmitting}
        >
          {backLabel}
        </Button>
        <Button type="button" onClick={onNext} disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="animate-spin" aria-hidden="true" />
          ) : null}
          {nextLabel ?? (isLast ? "Submit" : "Next")}
        </Button>
      </div>
    </div>
  )
}

export { Stepper, StepperContent, StepperFooter, useStepper }
