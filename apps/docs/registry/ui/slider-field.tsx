"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

export interface SliderFieldProps {
  label?: string
  min?: number
  max?: number
  step?: number
  /** One value for a single thumb, two for a range. */
  value?: number[]
  defaultValue?: number[]
  onValueChange?: (value: number[]) => void
  /** Formats the value readout, e.g. (v) => `$${v}`. */
  formatValue?: (value: number) => string
  /** Hides the live value readout next to the label. */
  showValue?: boolean
  /** Shows min/max captions under the track. */
  showRange?: boolean
  disabled?: boolean
  className?: string
}

export function SliderField({
  label,
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue,
  onValueChange,
  formatValue = (v) => String(v),
  showValue = true,
  showRange = false,
  disabled,
  className,
}: SliderFieldProps) {
  const [internal, setInternal] = React.useState(
    value ?? defaultValue ?? [min]
  )
  const current = value ?? internal

  function handleChange(next: number[]) {
    setInternal(next)
    onValueChange?.(next)
  }

  return (
    <div
      data-slot="slider-field"
      className={cn("flex w-full flex-col gap-3", disabled && "opacity-50", className)}
    >
      {label || showValue ? (
        <div className="flex items-baseline justify-between gap-2">
          {label ? (
            <span className="text-sm font-medium text-foreground">{label}</span>
          ) : null}
          {showValue ? (
            <span className="text-sm tabular-nums text-muted-foreground">
              {current.map(formatValue).join(" – ")}
            </span>
          ) : null}
        </div>
      ) : null}
      <SliderPrimitive.Root
        min={min}
        max={max}
        step={step}
        value={value}
        defaultValue={value ? undefined : (defaultValue ?? [min])}
        onValueChange={handleChange}
        disabled={disabled}
        aria-label={label}
        className="relative flex w-full touch-none items-center select-none"
      >
        <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-muted">
          <SliderPrimitive.Range className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>
        {current.map((_, i) => (
          <SliderPrimitive.Thumb
            key={i}
            className="block size-4 shrink-0 rounded-full border border-primary bg-background shadow-sm transition-shadow hover:ring-4 hover:ring-ring/20 focus-visible:ring-4 focus-visible:ring-ring/30 focus-visible:outline-none disabled:pointer-events-none"
          />
        ))}
      </SliderPrimitive.Root>
      {showRange ? (
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{formatValue(min)}</span>
          <span>{formatValue(max)}</span>
        </div>
      ) : null}
    </div>
  )
}
