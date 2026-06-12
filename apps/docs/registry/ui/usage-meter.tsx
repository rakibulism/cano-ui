import * as React from "react"

import { cn } from "@/lib/utils"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export interface UsageMeterItem {
  /** Resource name, e.g. "API requests". */
  label: string
  /** Current usage in the same unit as `limit`. */
  used: number
  limit: number
  /** Pre-formatted display values, e.g. "84.2k" — falls back to raw numbers. */
  usedLabel?: string
  limitLabel?: string
}

export interface UsageMeterProps extends React.ComponentProps<typeof Card> {
  items: UsageMeterItem[]
  /** Fraction of the limit at which a meter is highlighted, default 0.8. */
  warnAt?: number
  title?: string
  description?: string
  /** Slot for an upgrade CTA or plan badge, rendered in the header. */
  action?: React.ReactNode
  footer?: React.ReactNode
}

function UsageMeterRow({
  item,
  warnAt,
}: {
  item: UsageMeterItem
  warnAt: number
}) {
  const fraction = item.limit > 0 ? item.used / item.limit : 0
  const percent = Math.min(100, Math.round(fraction * 100))
  const nearLimit = fraction >= warnAt

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-sm font-medium text-foreground">
          {item.label}
        </span>
        <span
          className={cn(
            "text-xs tabular-nums",
            nearLimit
              ? "font-medium text-destructive"
              : "text-muted-foreground"
          )}
        >
          {item.usedLabel ?? item.used.toLocaleString()} /{" "}
          {item.limitLabel ?? item.limit.toLocaleString()}
        </span>
      </div>
      <Progress
        value={percent}
        aria-label={`${item.label}: ${percent}% of limit used`}
        className={cn(nearLimit && "[&>*]:bg-destructive")}
      />
      {nearLimit ? (
        <p className="text-xs text-destructive">
          {percent >= 100 ? "Limit reached" : `${percent}% of limit used`}
        </p>
      ) : null}
    </div>
  )
}

export function UsageMeter({
  items,
  warnAt = 0.8,
  title = "Usage",
  description,
  action,
  footer,
  className,
  ...props
}: UsageMeterProps) {
  return (
    <Card data-slot="usage-meter" className={cn("w-full", className)} {...props}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
        {action ? <CardAction>{action}</CardAction> : null}
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {items.map((item) => (
          <UsageMeterRow key={item.label} item={item} warnAt={warnAt} />
        ))}
      </CardContent>
      {footer ? <CardFooter>{footer}</CardFooter> : null}
    </Card>
  )
}
