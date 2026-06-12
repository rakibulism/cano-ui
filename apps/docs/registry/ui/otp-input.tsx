"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface OtpInputProps {
  /** Number of digits, default 6. */
  length?: number
  value?: string
  onValueChange?: (value: string) => void
  /** Called once every cell is filled. */
  onComplete?: (value: string) => void
  /** Visual gap in the middle, e.g. 123 456. */
  separator?: boolean
  /** Restrict to digits, default true. */
  numeric?: boolean
  disabled?: boolean
  /** Marks all cells invalid, e.g. after a wrong code. */
  error?: boolean
  autoFocus?: boolean
  className?: string
}

export function OtpInput({
  length = 6,
  value,
  onValueChange,
  onComplete,
  separator = true,
  numeric = true,
  disabled,
  error,
  autoFocus,
  className,
}: OtpInputProps) {
  const [internal, setInternal] = React.useState("")
  const code = value ?? internal
  const refs = React.useRef<(HTMLInputElement | null)[]>([])

  function setCode(next: string) {
    setInternal(next)
    onValueChange?.(next)
    if (next.length === length) onComplete?.(next)
  }

  function sanitize(raw: string) {
    return (numeric ? raw.replace(/\D/g, "") : raw).slice(0, length)
  }

  function handleChange(index: number, raw: string) {
    const char = sanitize(raw).slice(-1)
    if (!char && raw !== "") return
    const next = (code.slice(0, index) + char + code.slice(index + 1)).slice(
      0,
      length
    )
    setCode(next)
    if (char && index < length - 1) refs.current[index + 1]?.focus()
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      e.preventDefault()
      setCode(code.slice(0, index - 1))
      refs.current[index - 1]?.focus()
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault()
      refs.current[index - 1]?.focus()
    } else if (e.key === "ArrowRight" && index < length - 1) {
      e.preventDefault()
      refs.current[index + 1]?.focus()
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault()
    const pasted = sanitize(e.clipboardData.getData("text"))
    if (!pasted) return
    setCode(pasted)
    refs.current[Math.min(pasted.length, length - 1)]?.focus()
  }

  return (
    <div
      data-slot="otp-input"
      role="group"
      aria-label="One-time code"
      className={cn("flex items-center gap-2", className)}
    >
      {Array.from({ length }, (_, i) => (
        <React.Fragment key={i}>
          {separator && length % 2 === 0 && i === length / 2 ? (
            <span aria-hidden="true" className="text-muted-foreground">
              –
            </span>
          ) : null}
          <input
            ref={(el) => {
              refs.current[i] = el
            }}
            type="text"
            inputMode={numeric ? "numeric" : "text"}
            autoComplete={i === 0 ? "one-time-code" : "off"}
            autoFocus={autoFocus && i === 0}
            maxLength={length}
            value={code[i] ?? ""}
            disabled={disabled}
            aria-label={`Digit ${i + 1} of ${length}`}
            aria-invalid={error || undefined}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            onFocus={(e) => e.target.select()}
            className={cn(
              "size-10 rounded-md border border-input bg-transparent text-center text-base font-medium tabular-nums shadow-xs transition-colors",
              "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none",
              "disabled:pointer-events-none disabled:opacity-50",
              error &&
                "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20"
            )}
          />
        </React.Fragment>
      ))}
    </div>
  )
}
