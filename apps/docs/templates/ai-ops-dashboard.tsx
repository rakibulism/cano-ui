"use client"

import * as React from "react"
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Bot,
  CircuitBoard,
  Coins,
  Cpu,
  Download,
  Gauge,
  LayoutDashboard,
  Search,
  Settings,
  Sparkles,
  Timer,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type ModelKey = "all" | "gpt" | "claude" | "llama"

const MODEL_FILTERS: { key: ModelKey; label: string }[] = [
  { key: "all", label: "All models" },
  { key: "gpt", label: "GPT" },
  { key: "claude", label: "Claude" },
  { key: "llama", label: "Llama" },
]

const KPIS = [
  {
    label: "Tokens processed",
    value: "48.2M",
    delta: "+12.4%",
    up: true,
    icon: Zap,
    hint: "vs. last 7 days",
  },
  {
    label: "Requests",
    value: "182,940",
    delta: "+8.1%",
    up: true,
    icon: Activity,
    hint: "vs. last 7 days",
  },
  {
    label: "Avg latency",
    value: "642 ms",
    delta: "-5.3%",
    up: false,
    icon: Timer,
    hint: "p50 across models",
  },
  {
    label: "Spend",
    value: "$9,418",
    delta: "+3.7%",
    up: true,
    icon: Coins,
    hint: "month to date",
  },
]

const CHART = [
  { day: "Mon", gpt: 62, claude: 40, llama: 18 },
  { day: "Tue", gpt: 70, claude: 48, llama: 22 },
  { day: "Wed", gpt: 58, claude: 55, llama: 30 },
  { day: "Thu", gpt: 80, claude: 62, llama: 28 },
  { day: "Fri", gpt: 92, claude: 70, llama: 34 },
  { day: "Sat", gpt: 48, claude: 38, llama: 24 },
  { day: "Sun", gpt: 54, claude: 44, llama: 20 },
]

type UsageRow = {
  model: string
  provider: ModelKey
  requests: string
  tokens: string
  latency: string
  errorRate: string
  trendUp: boolean
}

const USAGE: UsageRow[] = [
  { model: "gpt-4o", provider: "gpt", requests: "61,204", tokens: "18.4M", latency: "538 ms", errorRate: "0.21%", trendUp: true },
  { model: "gpt-4o-mini", provider: "gpt", requests: "44,910", tokens: "9.1M", latency: "312 ms", errorRate: "0.08%", trendUp: true },
  { model: "claude-opus-4", provider: "claude", requests: "28,770", tokens: "11.7M", latency: "720 ms", errorRate: "0.14%", trendUp: false },
  { model: "claude-haiku", provider: "claude", requests: "19,640", tokens: "4.2M", latency: "284 ms", errorRate: "0.05%", trendUp: true },
  { model: "llama-3.1-70b", provider: "llama", requests: "16,330", tokens: "3.6M", latency: "910 ms", errorRate: "0.42%", trendUp: false },
  { model: "llama-3.1-8b", provider: "llama", requests: "11,086", tokens: "1.2M", latency: "190 ms", errorRate: "0.11%", trendUp: true },
]

type CostRow = {
  model: string
  provider: ModelKey
  inputCost: string
  outputCost: string
  total: string
  share: number
}

const COSTS: CostRow[] = [
  { model: "gpt-4o", provider: "gpt", inputCost: "$1,840", outputCost: "$2,210", total: "$4,050", share: 43 },
  { model: "claude-opus-4", provider: "claude", inputCost: "$1,120", outputCost: "$1,690", total: "$2,810", share: 30 },
  { model: "gpt-4o-mini", provider: "gpt", inputCost: "$410", outputCost: "$520", total: "$930", share: 10 },
  { model: "claude-haiku", provider: "claude", inputCost: "$280", outputCost: "$340", total: "$620", share: 7 },
  { model: "llama-3.1-70b", provider: "llama", inputCost: "$420", outputCost: "$340", total: "$760", share: 8 },
  { model: "llama-3.1-8b", provider: "llama", inputCost: "$120", outputCost: "$128", total: "$248", share: 2 },
]

type LogRow = {
  id: string
  prompt: string
  model: string
  provider: ModelKey
  tokens: string
  latency: string
  status: "ok" | "throttled" | "error"
  time: string
}

const LOGS: LogRow[] = [
  { id: "req_8af2", prompt: "Summarize the Q2 incident retro into 5 action items", model: "gpt-4o", provider: "gpt", tokens: "3,120", latency: "612 ms", status: "ok", time: "12:04:18" },
  { id: "req_7b1c", prompt: "Classify support ticket sentiment and route to team", model: "claude-haiku", provider: "claude", tokens: "842", latency: "248 ms", status: "ok", time: "12:03:51" },
  { id: "req_6d09", prompt: "Generate SQL for top spenders by region last month", model: "llama-3.1-70b", provider: "llama", tokens: "1,940", latency: "1.1 s", status: "throttled", time: "12:03:22" },
  { id: "req_5e44", prompt: "Draft a changelog entry for the billing migration", model: "claude-opus-4", provider: "claude", tokens: "2,604", latency: "788 ms", status: "ok", time: "12:02:40" },
  { id: "req_4c17", prompt: "Extract entities from the uploaded contract PDF", model: "gpt-4o-mini", provider: "gpt", tokens: "5,210", latency: "402 ms", status: "error", time: "12:01:59" },
  { id: "req_3a88", prompt: "Rewrite onboarding email in a friendlier tone", model: "gpt-4o", provider: "gpt", tokens: "980", latency: "356 ms", status: "ok", time: "12:01:12" },
]

const NAV = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "Models", icon: Cpu, active: false },
  { label: "Latency", icon: Gauge, active: false },
  { label: "Spend", icon: Coins, active: false },
  { label: "Logs", icon: CircuitBoard, active: false },
  { label: "Settings", icon: Settings, active: false },
]

function statusBadge(status: LogRow["status"]) {
  if (status === "ok") return <Badge variant="secondary">ok</Badge>
  if (status === "throttled")
    return <Badge variant="outline" className="text-muted-foreground">throttled</Badge>
  return <Badge variant="destructive">error</Badge>
}

export default function AiOpsDashboard() {
  const [model, setModel] = React.useState<ModelKey>("all")
  const [query, setQuery] = React.useState("")

  const matches = React.useCallback(
    (provider: ModelKey) => model === "all" || provider === model,
    [model],
  )

  const usage = USAGE.filter((r) => matches(r.provider))
  const costs = COSTS.filter((r) => matches(r.provider))
  const logs = LOGS.filter(
    (r) =>
      matches(r.provider) &&
      r.prompt.toLowerCase().includes(query.toLowerCase()),
  )

  const chartMax = 92
  const seriesColor: Record<Exclude<ModelKey, "all">, string> = {
    gpt: "bg-primary",
    claude: "bg-primary/60",
    llama: "bg-primary/30",
  }
  const visibleSeries: Exclude<ModelKey, "all">[] =
    model === "all" ? ["gpt", "claude", "llama"] : [model]

  return (
    <div className="flex min-h-full bg-background text-foreground">
      <aside className="hidden w-60 shrink-0 border-r bg-muted/30 lg:flex lg:flex-col">
        <div className="flex h-16 items-center gap-2 px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold leading-none">NeuronOps</p>
            <p className="text-xs text-muted-foreground">LLM control plane</p>
          </div>
        </div>
        <Separator />
        <nav className="flex flex-1 flex-col gap-1 p-3">
          {NAV.map((item) => (
            <button
              key={item.label}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                item.active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </nav>
        <Separator />
        <div className="p-3">
          <div className="rounded-lg border bg-card p-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Sparkles className="h-4 w-4 text-primary" />
              Pro tier
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              68% of monthly token budget used.
            </p>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full w-[68%] rounded-full bg-primary" />
            </div>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur sm:px-6">
          <div className="flex items-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Bot className="h-4 w-4" />
            </div>
            <span className="text-sm font-semibold">NeuronOps</span>
          </div>
          <div className="relative hidden flex-1 sm:block sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search prompt logs..."
              className="pl-9"
            />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Badge variant="outline" className="hidden gap-1 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              All systems operational
            </Badge>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </header>

        <main className="flex-1 space-y-6 p-4 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">
                AI Operations
              </h1>
              <p className="text-sm text-muted-foreground">
                Usage, latency and spend across your model fleet.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {MODEL_FILTERS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setModel(f.key)}
                  aria-pressed={model === f.key}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                    model === f.key
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:bg-accent hover:text-foreground",
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {KPIS.map((kpi) => (
              <Card key={kpi.label}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardDescription>{kpi.label}</CardDescription>
                  <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <kpi.icon className="h-4 w-4" />
                  </span>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold tracking-tight">
                    {kpi.value}
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-xs">
                    <span
                      className={cn(
                        "flex items-center gap-0.5 font-medium",
                        kpi.up ? "text-primary" : "text-muted-foreground",
                      )}
                    >
                      {kpi.up ? (
                        <ArrowUpRight className="h-3 w-3" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3" />
                      )}
                      {kpi.delta}
                    </span>
                    <span className="text-muted-foreground">{kpi.hint}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Requests over time</CardTitle>
                    <CardDescription>
                      Daily request volume by model (thousands)
                    </CardDescription>
                  </div>
                  <div className="hidden gap-3 sm:flex">
                    {visibleSeries.map((s) => (
                      <div key={s} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span className={cn("h-2.5 w-2.5 rounded-sm", seriesColor[s])} />
                        {s === "gpt" ? "GPT" : s === "claude" ? "Claude" : "Llama"}
                      </div>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex h-56 items-end justify-between gap-3">
                  {CHART.map((d) => (
                    <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                      <div className="flex h-full w-full items-end justify-center gap-1">
                        {visibleSeries.map((s) => (
                          <div
                            key={s}
                            className={cn(
                              "w-full max-w-[14px] rounded-t-sm transition-all",
                              seriesColor[s],
                            )}
                            style={{ height: `${(d[s] / chartMax) * 100}%` }}
                            title={`${d.day} · ${d[s]}k`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">{d.day}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost by model</CardTitle>
                <CardDescription>Share of month-to-date spend</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {costs.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No models match this filter.
                  </p>
                ) : (
                  costs.map((c) => (
                    <div key={c.model} className="space-y-1.5">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{c.model}</span>
                        <span className="text-muted-foreground">{c.total}</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${c.share}%` }}
                        />
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Model usage</CardTitle>
              <CardDescription>
                Per-model request, token and latency breakdown
                {model !== "all" ? ` · filtered to ${model.toUpperCase()}` : ""}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Model</TableHead>
                    <TableHead className="text-right">Requests</TableHead>
                    <TableHead className="text-right">Tokens</TableHead>
                    <TableHead className="text-right">Latency</TableHead>
                    <TableHead className="text-right">Error rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {usage.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground">
                        No usage for the selected model.
                      </TableCell>
                    </TableRow>
                  ) : (
                    usage.map((r) => (
                      <TableRow key={r.model}>
                        <TableCell>
                          <div className="flex items-center gap-2 font-medium">
                            <Cpu className="h-4 w-4 text-muted-foreground" />
                            {r.model}
                          </div>
                        </TableCell>
                        <TableCell className="text-right tabular-nums">{r.requests}</TableCell>
                        <TableCell className="text-right tabular-nums">{r.tokens}</TableCell>
                        <TableCell className="text-right tabular-nums">{r.latency}</TableCell>
                        <TableCell className="text-right">
                          <span
                            className={cn(
                              "inline-flex items-center gap-1 tabular-nums",
                              r.trendUp ? "text-muted-foreground" : "text-destructive",
                            )}
                          >
                            {!r.trendUp && <AlertTriangle className="h-3 w-3" />}
                            {r.errorRate}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Recent prompt logs</CardTitle>
                  <CardDescription>Latest inference requests</CardDescription>
                </div>
                <Badge variant="outline" className="w-fit gap-1">
                  <Activity className="h-3 w-3" />
                  {logs.length} shown
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {logs.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No logs match the current filters.
                </p>
              ) : (
                logs.map((log) => (
                  <div
                    key={log.id}
                    className="flex flex-col gap-2 rounded-lg border bg-card p-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{log.prompt}</p>
                      <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground">
                        <span className="font-mono">{log.id}</span>
                        <span>·</span>
                        <span>{log.model}</span>
                        <span>·</span>
                        <span>{log.time}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-3 sm:shrink-0">
                      <span className="text-xs text-muted-foreground tabular-nums">
                        {log.tokens} tok
                      </span>
                      <span className="text-xs text-muted-foreground tabular-nums">
                        {log.latency}
                      </span>
                      {statusBadge(log.status)}
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
