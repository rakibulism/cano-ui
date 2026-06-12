import { StatsGrid, type Stat } from "@/registry/ui/stats-grid"

const stats: Stat[] = [
  {
    label: "MRR",
    value: "$48,210",
    delta: { value: "12.4%", direction: "up" },
    description: "vs. last month",
  },
  {
    label: "Active users",
    value: "2,841",
    delta: { value: "4.1%", direction: "up" },
    description: "vs. last month",
  },
  {
    label: "Churn",
    value: "1.2%",
    delta: { value: "0.3%", direction: "down" },
    description: "vs. last month",
  },
  {
    label: "API latency",
    value: "142ms",
    delta: { value: "0.0%", direction: "neutral" },
    description: "p95, last 24h",
  },
]

export default function StatsGridDemo() {
  return <StatsGrid stats={stats} columns={4} className="w-full" />
}
