"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export type TooltipSide = "top" | "right" | "bottom" | "left"

export interface RichTooltipProps {
  /** Hover/focus target, rendered via Radix `asChild`. */
  children: React.ReactNode
  /** Main tooltip text. */
  content: React.ReactNode
  /** Optional bold first line above the content. */
  title?: string
  /** Keyboard shortcut keys rendered as <kbd>, e.g. ["⌘", "K"]. */
  shortcut?: string[]
  side?: TooltipSide
  align?: "start" | "center" | "end"
  delayDuration?: number
  /** Controlled open state — useful for previews and playgrounds. */
  open?: boolean
  /** Set false to always honor `side`, even near the viewport edge. */
  avoidCollisions?: boolean
  className?: string
}

export function RichTooltip({
  children,
  content,
  title,
  shortcut,
  side = "top",
  align = "center",
  delayDuration = 200,
  open,
  avoidCollisions = true,
  className,
}: RichTooltipProps) {
  return (
    <Tooltip delayDuration={delayDuration} open={open}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        side={side}
        align={align}
        avoidCollisions={avoidCollisions}
        data-slot="rich-tooltip"
        className={cn(title && "max-w-60 py-2", className)}
      >
        <div className="flex items-center gap-2">
          <div className="flex flex-col gap-0.5">
            {title ? <p className="font-semibold">{title}</p> : null}
            <p className={cn(title && "text-primary-foreground/80")}>
              {content}
            </p>
          </div>
          {shortcut?.length ? (
            <span className="flex gap-0.5">
              {shortcut.map((key) => (
                <kbd
                  key={key}
                  className="flex h-4 min-w-4 items-center justify-center rounded-xs bg-primary-foreground/15 px-1 font-sans text-[10px] font-medium"
                >
                  {key}
                </kbd>
              ))}
            </span>
          ) : null}
        </div>
      </TooltipContent>
    </Tooltip>
  )
}
