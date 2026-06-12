import * as React from "react"
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react"

import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

type StatDelta = {
  value: string
  direction: "up" | "down" | "neutral"
}

interface Stat {
  label: string
  value: string
  delta?: StatDelta
  description?: string
}

interface StatCardProps extends React.ComponentProps<typeof Card> {
  label: string
  value: string
  delta?: StatDelta
  description?: string
  loading?: boolean
}

const deltaIcons = {
  up: ArrowUpRight,
  down: ArrowDownRight,
  neutral: Minus,
} as const

const deltaLabels = {
  up: "increased",
  down: "decreased",
  neutral: "unchanged",
} as const

function StatDeltaIndicator({ delta }: { delta: StatDelta }) {
  const Icon = deltaIcons[delta.direction]
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 text-xs tabular-nums",
        delta.direction === "neutral"
          ? "text-muted-foreground"
          : "text-foreground"
      )}
    >
      <Icon aria-hidden="true" className="size-3.5" />
      {delta.value}
      <span className="sr-only">{deltaLabels[delta.direction]}</span>
    </span>
  )
}

function StatCard({
  label,
  value,
  delta,
  description,
  loading = false,
  className,
  ...props
}: StatCardProps) {
  return (
    <Card data-slot="stat-card" className={cn("gap-0 py-5", className)} {...props}>
      <CardContent className="flex flex-col gap-1.5 px-5">
        {loading ? (
          <>
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-4 w-16" />
          </>
        ) : (
          <>
            <div className="text-sm text-muted-foreground">{label}</div>
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-2xl font-semibold tracking-tight tabular-nums text-foreground">
                {value}
              </span>
              {delta ? <StatDeltaIndicator delta={delta} /> : null}
            </div>
            {description ? (
              <p className="text-xs text-muted-foreground">{description}</p>
            ) : null}
          </>
        )}
      </CardContent>
    </Card>
  )
}

interface StatsGridProps extends React.ComponentProps<"div"> {
  stats: Stat[]
  columns?: 2 | 3 | 4
  loading?: boolean
}

const columnClasses = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
} as const

function StatsGrid({
  stats,
  columns = 4,
  loading = false,
  className,
  ...props
}: StatsGridProps) {
  return (
    <div
      data-slot="stats-grid"
      className={cn("grid gap-4", columnClasses[columns], className)}
      {...props}
    >
      {stats.map((stat) => (
        <StatCard key={stat.label} loading={loading} {...stat} />
      ))}
    </div>
  )
}

export { StatsGrid, StatCard, type Stat, type StatDelta }
