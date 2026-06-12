"use client"

import * as React from "react"
import { Drawer as VaulPrimitive } from "vaul"

import { cn } from "@/lib/utils"

export interface BottomSheetProps {
  /** Element that opens the sheet, rendered via Radix `asChild`. */
  trigger?: React.ReactNode
  title: string
  description?: string
  /** Hides the drag handle bar at the top. */
  withHandle?: boolean
  /** Vaul snap points, e.g. [0.4, 1] — omit for content height. */
  snapPoints?: (number | string)[]
  footer?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
  children?: React.ReactNode
}

export function BottomSheet({
  trigger,
  title,
  description,
  withHandle = true,
  snapPoints,
  footer,
  open,
  onOpenChange,
  className,
  children,
}: BottomSheetProps) {
  // Vaul requires activeSnapPoint state when snapPoints are used.
  const [snap, setSnap] = React.useState<number | string | null>(
    snapPoints?.[0] ?? null
  )

  return (
    <VaulPrimitive.Root
      open={open}
      onOpenChange={onOpenChange}
      {...(snapPoints
        ? { snapPoints, activeSnapPoint: snap, setActiveSnapPoint: setSnap }
        : {})}
    >
      {trigger ? (
        <VaulPrimitive.Trigger asChild>{trigger}</VaulPrimitive.Trigger>
      ) : null}
      <VaulPrimitive.Portal>
        <VaulPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50" />
        <VaulPrimitive.Content
          data-slot="bottom-sheet"
          className={cn(
            "fixed inset-x-0 bottom-0 z-50 flex max-h-[92dvh] flex-col rounded-t-xl border-t bg-background",
            snapPoints && "h-full",
            className
          )}
        >
          {withHandle ? (
            <div
              aria-hidden="true"
              className="mx-auto mt-3 h-1.5 w-10 shrink-0 rounded-full bg-muted"
            />
          ) : null}
          <div className="flex flex-col gap-1.5 p-4 text-center sm:text-left">
            <VaulPrimitive.Title className="font-semibold text-foreground">
              {title}
            </VaulPrimitive.Title>
            {description ? (
              <VaulPrimitive.Description className="text-sm text-muted-foreground">
                {description}
              </VaulPrimitive.Description>
            ) : (
              <VaulPrimitive.Description className="sr-only">
                {title}
              </VaulPrimitive.Description>
            )}
          </div>
          <div className="flex-1 overflow-y-auto px-4 pb-4">{children}</div>
          {footer ? (
            <div className="flex flex-col gap-2 border-t p-4 pb-[max(theme(spacing.4),env(safe-area-inset-bottom))]">
              {footer}
            </div>
          ) : null}
        </VaulPrimitive.Content>
      </VaulPrimitive.Portal>
    </VaulPrimitive.Root>
  )
}
