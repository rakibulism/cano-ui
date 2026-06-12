import * as React from "react"

import { cn } from "@/lib/utils"

export interface KbdProps extends React.ComponentProps<"kbd"> {
  size?: "sm" | "default"
}

/** A single keyboard key, e.g. ⌘ or K. */
export function Kbd({ size = "default", className, ...props }: KbdProps) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "inline-flex items-center justify-center rounded-sm border border-b-2 bg-muted font-sans font-medium text-muted-foreground",
        size === "default"
          ? "h-5 min-w-5 px-1 text-[11px]"
          : "h-4 min-w-4 px-0.5 text-[10px]",
        className
      )}
      {...props}
    />
  )
}

export interface KbdGroupProps extends React.ComponentProps<"span"> {
  /** Keys rendered in order, e.g. ["⌘", "K"] or ["g", "d"]. */
  keys: string[]
  /** Text between keys: "+" for chords, "then" for sequences. */
  separator?: string
  size?: "sm" | "default"
}

/** A chord or sequence of keys, e.g. ⌘ + K or g then d. */
export function KbdGroup({
  keys,
  separator,
  size = "default",
  className,
  ...props
}: KbdGroupProps) {
  return (
    <span
      data-slot="kbd-group"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    >
      {keys.map((key, i) => (
        <React.Fragment key={`${key}-${i}`}>
          {i > 0 && separator ? (
            <span className="text-xs text-muted-foreground">{separator}</span>
          ) : null}
          <Kbd size={size}>{key}</Kbd>
        </React.Fragment>
      ))}
    </span>
  )
}
