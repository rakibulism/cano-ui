"use client"

import * as React from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

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

const chartColors = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
] as const

type ChartSeries = {
  key: string
  label: string
}

interface ChartCardProps extends React.ComponentProps<typeof Card> {
  title: string
  description?: string
  action?: React.ReactNode
  footer?: React.ReactNode
}

function ChartCard({
  title,
  description,
  action,
  footer,
  children,
  className,
  ...props
}: ChartCardProps) {
  return (
    <Card data-slot="chart-card" className={cn("gap-4", className)} {...props}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
        {action ? <CardAction>{action}</CardAction> : null}
      </CardHeader>
      <CardContent>{children}</CardContent>
      {footer ? <CardFooter>{footer}</CardFooter> : null}
    </Card>
  )
}

type ChartTooltipPayloadItem = {
  dataKey?: string | number
  name?: string | number
  value?: number | string
  color?: string
}

interface ChartTooltipProps {
  active?: boolean
  label?: string | number
  payload?: ChartTooltipPayloadItem[]
  series?: ChartSeries[]
}

function ChartTooltip({ active, label, payload, series }: ChartTooltipProps) {
  if (!active || !payload || payload.length === 0) {
    return null
  }
  return (
    <div className="rounded-md border bg-popover px-2.5 py-1.5 text-xs text-popover-foreground shadow-sm">
      {label != null ? (
        <div className="mb-1 font-medium text-foreground">{label}</div>
      ) : null}
      <div className="flex flex-col gap-0.5">
        {payload.map((item, index) => {
          const seriesLabel =
            series?.find((s) => s.key === item.dataKey)?.label ??
            String(item.name ?? item.dataKey ?? "")
          return (
            <div
              key={String(item.dataKey ?? index)}
              className="flex items-center justify-between gap-4"
            >
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <span
                  aria-hidden="true"
                  className="size-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                {seriesLabel}
              </span>
              <span className="font-medium tabular-nums text-foreground">
                {typeof item.value === "number"
                  ? item.value.toLocaleString()
                  : item.value}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ChartLegend({ series }: { series: ChartSeries[] }) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-4">
      {series.map((s, index) => (
        <span
          key={s.key}
          className="flex items-center gap-1.5 text-xs text-muted-foreground"
        >
          <span
            aria-hidden="true"
            className="size-2 rounded-full"
            style={{ backgroundColor: chartColors[index % chartColors.length] }}
          />
          {s.label}
        </span>
      ))}
    </div>
  )
}

const axisTick = { fill: "var(--muted-foreground)", fontSize: 12 }

// Keeps 5+ digit values inside the default axis gutter (48210 → "48k").
function compactNumber(value: number): string {
  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value)
}

interface SeriesChartCardProps extends Omit<ChartCardProps, "children"> {
  data: Record<string, number | string>[]
  xKey: string
  series: ChartSeries[]
}

function AreaChartCard({
  data,
  xKey,
  series,
  ...props
}: SeriesChartCardProps) {
  return (
    <ChartCard {...props}>
      <div className="h-[240px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 4, right: 4, bottom: 0, left: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border)"
              vertical={false}
            />
            <XAxis
              dataKey={xKey}
              tickLine={false}
              axisLine={false}
              tick={axisTick}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={axisTick}
              tickFormatter={compactNumber}
              width={40}
            />
            <Tooltip
              cursor={{ stroke: "var(--border)" }}
              content={<ChartTooltip series={series} />}
            />
            {series.map((s, index) => {
              const color = chartColors[index % chartColors.length]
              return (
                <Area
                  key={s.key}
                  type="monotone"
                  dataKey={s.key}
                  stroke={color}
                  strokeWidth={2}
                  fill={color}
                  fillOpacity={0.1}
                />
              )
            })}
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <ChartLegend series={series} />
    </ChartCard>
  )
}

function BarChartCard({ data, xKey, series, ...props }: SeriesChartCardProps) {
  return (
    <ChartCard {...props}>
      <div className="h-[240px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 4, right: 4, bottom: 0, left: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border)"
              vertical={false}
            />
            <XAxis
              dataKey={xKey}
              tickLine={false}
              axisLine={false}
              tick={axisTick}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={axisTick}
              tickFormatter={compactNumber}
              width={40}
            />
            <Tooltip
              cursor={{ fill: "var(--muted)" }}
              content={<ChartTooltip series={series} />}
            />
            {series.map((s, index) => (
              <Bar
                key={s.key}
                dataKey={s.key}
                fill={chartColors[index % chartColors.length]}
                radius={[4, 4, 0, 0]}
                maxBarSize={32}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
      <ChartLegend series={series} />
    </ChartCard>
  )
}

export {
  ChartCard,
  ChartTooltip,
  ChartLegend,
  AreaChartCard,
  BarChartCard,
  type ChartSeries,
  type ChartCardProps,
}
