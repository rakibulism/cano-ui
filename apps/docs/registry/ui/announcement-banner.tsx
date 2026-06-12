"use client"

import * as React from "react"
import { ArrowRight, Megaphone, X, type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export type AnnouncementVariant = "default" | "info" | "success" | "warning"

export interface AnnouncementBannerProps
  extends Omit<React.ComponentProps<"div">, "title"> {
  title: React.ReactNode
  /** Optional secondary text shown after the title on wider screens. */
  description?: React.ReactNode
  variant?: AnnouncementVariant
  icon?: LucideIcon
  /** Action slot, e.g. a link or button; gets a default arrow link style via `actionLabel`. */
  action?: React.ReactNode
  actionLabel?: string
  onAction?: () => void
  /** Renders a close button and calls back when dismissed. */
  onDismiss?: () => void
}

const variantStyles: Record<AnnouncementVariant, string> = {
  default: "bg-primary text-primary-foreground",
  info: "bg-blue-600 text-white dark:bg-blue-500",
  success: "bg-emerald-600 text-white dark:bg-emerald-500",
  warning: "bg-amber-500 text-amber-950",
}

export function AnnouncementBanner({
  title,
  description,
  variant = "default",
  icon: Icon = Megaphone,
  action,
  actionLabel,
  onAction,
  onDismiss,
  className,
  ...props
}: AnnouncementBannerProps) {
  const [dismissed, setDismissed] = React.useState(false)
  if (dismissed) return null

  return (
    <div
      data-slot="announcement-banner"
      role="status"
      className={cn(
        "flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      <Icon className="size-4 shrink-0" aria-hidden="true" />
      <p className="min-w-0 flex-1">
        <span className="font-medium">{title}</span>
        {description ? (
          <span className="opacity-80 max-sm:hidden"> — {description}</span>
        ) : null}
      </p>
      {action ??
        (actionLabel ? (
          <button
            type="button"
            onClick={onAction}
            className="flex shrink-0 items-center gap-1 text-sm font-medium underline-offset-4 hover:underline"
          >
            {actionLabel}
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </button>
        ) : null)}
      {onDismiss ? (
        <Button
          variant="ghost"
          size="icon"
          aria-label="Dismiss announcement"
          className="size-7 shrink-0 text-current hover:bg-white/15 hover:text-current"
          onClick={() => {
            setDismissed(true)
            onDismiss()
          }}
        >
          <X aria-hidden="true" />
        </Button>
      ) : null}
    </div>
  )
}
