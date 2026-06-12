"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export type DrawerSize = "sm" | "default" | "lg" | "xl"

export interface DrawerProps {
  /** Element that opens the drawer, rendered via Radix `asChild`. */
  trigger?: React.ReactNode
  title: string
  description?: string
  side?: "left" | "right"
  size?: DrawerSize
  /** Sticky footer slot, e.g. save/cancel actions. */
  footer?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
  children?: React.ReactNode
}

const sizeClasses: Record<DrawerSize, string> = {
  sm: "sm:max-w-sm",
  default: "sm:max-w-md",
  lg: "sm:max-w-lg",
  xl: "sm:max-w-xl",
}

export function Drawer({
  trigger,
  title,
  description,
  side = "right",
  size = "default",
  footer,
  open,
  onOpenChange,
  className,
  children,
}: DrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {trigger ? <SheetTrigger asChild>{trigger}</SheetTrigger> : null}
      <SheetContent
        side={side}
        data-slot="drawer"
        className={cn("w-full gap-0", sizeClasses[size], className)}
      >
        <SheetHeader className="border-b">
          <SheetTitle>{title}</SheetTitle>
          {description ? (
            <SheetDescription>{description}</SheetDescription>
          ) : null}
        </SheetHeader>
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
        {footer ? (
          <SheetFooter className="flex-row justify-end border-t">
            {footer}
          </SheetFooter>
        ) : null}
      </SheetContent>
    </Sheet>
  )
}
