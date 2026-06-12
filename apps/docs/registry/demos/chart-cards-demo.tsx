"use client"

import * as React from "react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { AreaChartCard, BarChartCard } from "@/registry/ui/chart-cards"

const revenueData = [
  { month: "Jan", revenue: 28400 },
  { month: "Feb", revenue: 30100 },
  { month: "Mar", revenue: 29650 },
  { month: "Apr", revenue: 33200 },
  { month: "May", revenue: 35800 },
  { month: "Jun", revenue: 34900 },
  { month: "Jul", revenue: 38600 },
  { month: "Aug", revenue: 41200 },
  { month: "Sep", revenue: 40300 },
  { month: "Oct", revenue: 44100 },
  { month: "Nov", revenue: 46500 },
  { month: "Dec", revenue: 48210 },
]

const signupsData = [
  { week: "W1", signups: 186 },
  { week: "W2", signups: 204 },
  { week: "W3", signups: 178 },
  { week: "W4", signups: 231 },
  { week: "W5", signups: 259 },
  { week: "W6", signups: 244 },
  { week: "W7", signups: 287 },
  { week: "W8", signups: 312 },
]

export default function ChartCardsDemo() {
  const [period, setPeriod] = React.useState("12m")

  return (
    <div className="grid w-full gap-4 lg:grid-cols-2">
      <AreaChartCard
        title="Revenue"
        description="Monthly recurring revenue for Acme"
        data={revenueData}
        xKey="month"
        series={[{ key: "revenue", label: "Revenue" }]}
        action={
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger size="sm" className="w-[150px]">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3m">Last 3 months</SelectItem>
              <SelectItem value="6m">Last 6 months</SelectItem>
              <SelectItem value="12m">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
        }
      />
      <BarChartCard
        title="Signups"
        description="New Acme workspaces per week"
        data={signupsData}
        xKey="week"
        series={[{ key: "signups", label: "Signups" }]}
      />
    </div>
  )
}
