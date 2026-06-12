import * as React from "react"
import { AlertCircle, CheckCircle2, SearchX, type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface EmptyStateProps extends React.ComponentProps<"div"> {
  icon?: LucideIcon
  title: string
  description?: string
  action?: React.ReactNode
  secondaryAction?: React.ReactNode
}

function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  secondaryAction,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      data-slot="empty-state"
      className={cn(
        "flex flex-col items-center justify-center px-6 py-16 text-center max-md:py-8",
        className
      )}
      {...props}
    >
      {Icon ? (
        <div
          aria-hidden="true"
          className="flex size-12 items-center justify-center rounded-lg bg-muted"
        >
          <Icon className="size-6 text-muted-foreground" />
        </div>
      ) : null}
      <h3 className={cn("text-base font-semibold text-foreground", Icon && "mt-4")}>
        {title}
      </h3>
      {description ? (
        <p className="mt-1.5 max-w-xs text-center text-sm text-balance text-muted-foreground">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-6">{action}</div> : null}
      {secondaryAction ? <div className="mt-3">{secondaryAction}</div> : null}
    </div>
  )
}

type EmptyStatePresetProps = Omit<EmptyStateProps, "title"> & {
  title?: string
}

function EmptyStateNoResults({
  icon = SearchX,
  title = "No results found",
  description = "Try adjusting your search or filters to find what you're looking for.",
  ...props
}: EmptyStatePresetProps) {
  return (
    <EmptyState icon={icon} title={title} description={description} {...props} />
  )
}

function EmptyStateError({
  icon = AlertCircle,
  title = "Something went wrong",
  description = "We couldn't load this content. Please try again.",
  onRetry,
  action,
  ...props
}: EmptyStatePresetProps & { onRetry?: () => void }) {
  return (
    <EmptyState
      icon={icon}
      title={title}
      description={description}
      action={
        action ??
        (onRetry ? (
          <Button variant="outline" onClick={onRetry}>
            Try again
          </Button>
        ) : undefined)
      }
      {...props}
    />
  )
}

function EmptyStateDone({
  icon = CheckCircle2,
  title = "All caught up",
  description = "You're all set. New items will show up here.",
  ...props
}: EmptyStatePresetProps) {
  return (
    <EmptyState icon={icon} title={title} description={description} {...props} />
  )
}

export {
  EmptyState,
  EmptyStateNoResults,
  EmptyStateError,
  EmptyStateDone,
  type EmptyStateProps,
}
