"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

export type ProgressBarVariant = "default" | "success" | "warning" | "danger"
export type ProgressBarSize = "sm" | "default" | "lg"

export interface ProgressBarProps {
  /** 0–100. Omit (undefined) for an indeterminate loading bar. */
  value?: number
  label?: string
  /** Shows the percentage next to the label. */
  showValue?: boolean
  variant?: ProgressBarVariant
  size?: ProgressBarSize
  className?: string
}

const variantClasses: Record<ProgressBarVariant, string> = {
  default: "bg-primary",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  danger: "bg-destructive",
}

const sizeClasses: Record<ProgressBarSize, string> = {
  sm: "h-1",
  default: "h-2",
  lg: "h-3",
}

export function ProgressBar({
  value,
  label,
  showValue = false,
  variant = "default",
  size = "default",
  className,
}: ProgressBarProps) {
  const indeterminate = value === undefined
  const clamped = indeterminate ? 0 : Math.min(100, Math.max(0, value))

  return (
    <div
      data-slot="progress-bar"
      className={cn("flex w-full flex-col gap-1.5", className)}
    >
      {label || showValue ? (
        <div className="flex items-baseline justify-between gap-2">
          {label ? (
            <span className="text-sm font-medium text-foreground">{label}</span>
          ) : null}
          {showValue && !indeterminate ? (
            <span className="text-xs tabular-nums text-muted-foreground">
              {Math.round(clamped)}%
            </span>
          ) : null}
        </div>
      ) : null}
      <ProgressPrimitive.Root
        value={indeterminate ? null : clamped}
        aria-label={label}
        className={cn(
          "relative w-full overflow-hidden rounded-full bg-muted",
          sizeClasses[size]
        )}
      >
        <ProgressPrimitive.Indicator
          className={cn(
            "h-full rounded-full transition-transform duration-500 ease-out",
            variantClasses[variant],
            indeterminate &&
              "w-1/3 animate-[progress-bar-slide_1.2s_ease-in-out_infinite]"
          )}
          style={
            indeterminate
              ? undefined
              : { transform: `translateX(-${100 - clamped}%)` }
          }
        />
      </ProgressPrimitive.Root>
      {indeterminate ? (
        <style>{`@keyframes progress-bar-slide { 0% { transform: translateX(-100%); } 100% { transform: translateX(400%); } }`}</style>
      ) : null}
    </div>
  )
}
