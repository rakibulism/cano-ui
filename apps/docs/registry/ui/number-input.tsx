"use client"

import * as React from "react"
import { Minus, Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export interface NumberInputProps {
  value?: number
  defaultValue?: number
  onValueChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
  label?: string
  disabled?: boolean
  className?: string
}

export function NumberInput({
  value,
  defaultValue = 0,
  onValueChange,
  min = -Infinity,
  max = Infinity,
  step = 1,
  label,
  disabled,
  className,
}: NumberInputProps) {
  const [internal, setInternal] = React.useState(defaultValue)
  const current = value ?? internal
  // Text mirror so partial input ("-", "1.") survives while typing.
  const [text, setText] = React.useState(String(current))

  React.useEffect(() => {
    setText(String(current))
  }, [current])

  function clamp(n: number) {
    return Math.min(max, Math.max(min, n))
  }

  function commit(n: number) {
    const next = clamp(n)
    setInternal(next)
    setText(String(next))
    onValueChange?.(next)
  }

  function nudge(direction: 1 | -1) {
    // Round to the step's precision so 0.1 + 0.2 doesn't leak floats.
    const decimals = (String(step).split(".")[1] ?? "").length
    commit(Number((current + direction * step).toFixed(decimals)))
  }

  return (
    <div
      data-slot="number-input"
      className={cn("isolate inline-flex items-stretch", className)}
    >
      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label={`Decrease${label ? ` ${label}` : ""}`}
        disabled={disabled || current <= min}
        onClick={() => nudge(-1)}
        className="rounded-r-none shadow-none"
      >
        <Minus aria-hidden="true" />
      </Button>
      <Input
        type="text"
        inputMode="decimal"
        role="spinbutton"
        aria-label={label}
        aria-valuenow={current}
        aria-valuemin={Number.isFinite(min) ? min : undefined}
        aria-valuemax={Number.isFinite(max) ? max : undefined}
        value={text}
        disabled={disabled}
        onChange={(e) => {
          setText(e.target.value)
          const parsed = Number(e.target.value)
          if (e.target.value !== "" && !Number.isNaN(parsed)) {
            setInternal(clamp(parsed))
            onValueChange?.(clamp(parsed))
          }
        }}
        onBlur={() => {
          const parsed = Number(text)
          commit(text === "" || Number.isNaN(parsed) ? current : parsed)
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowUp") {
            e.preventDefault()
            nudge(1)
          } else if (e.key === "ArrowDown") {
            e.preventDefault()
            nudge(-1)
          }
        }}
        className="z-10 -mx-px w-16 rounded-none text-center tabular-nums shadow-none focus-visible:z-20"
      />
      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label={`Increase${label ? ` ${label}` : ""}`}
        disabled={disabled || current >= max}
        onClick={() => nudge(1)}
        className="rounded-l-none shadow-none"
      >
        <Plus aria-hidden="true" />
      </Button>
    </div>
  )
}
