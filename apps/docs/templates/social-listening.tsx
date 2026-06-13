"use client"
import * as React from "react"
import {
  Radar,
  Search,
  Bell,
  Settings,
  TrendingUp,
  TrendingDown,
  MessageSquare,
  Eye,
  Smile,
  Frown,
  Meh,
  Hash,
  Globe,
  Heart,
  Repeat2,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

type Platform = "All" | "X" | "Instagram" | "Reddit" | "News"
type Sentiment = "Positive" | "Neutral" | "Negative"

const PLATFORMS: Platform[] = ["All", "X", "Instagram", "Reddit", "News"]

const KPIS = [
  { label: "Total Mentions", value: "48.2K", delta: "+12.4%", up: true, icon: MessageSquare },
  { label: "Estimated Reach", value: "9.8M", delta: "+6.1%", up: true, icon: Eye },
  { label: "Net Sentiment", value: "+34", delta: "+4 pts", up: true, icon: Smile },
  { label: "Share of Voice", value: "27%", delta: "-1.8%", up: false, icon: Radar },
]

const SENTIMENT = [
  { label: "Positive", pct: 58, icon: Smile, bar: "bg-primary" },
  { label: "Neutral", pct: 29, icon: Meh, bar: "bg-muted-foreground/50" },
  { label: "Negative", pct: 13, icon: Frown, bar: "bg-destructive" },
]

const TRENDING = [
  { tag: "#PlatedLaunch", volume: "12.4K", change: "+182%", up: true },
  { tag: "#SummerMenu", volume: "8.1K", change: "+64%", up: true },
  { tag: "customer support", volume: "5.6K", change: "+21%", up: true },
  { tag: "pricing change", volume: "3.2K", change: "-9%", up: false },
  { tag: "#AppRedesign", volume: "2.8K", change: "+47%", up: true },
]

const MENTIONS: {
  id: number
  author: string
  handle: string
  platform: Exclude<Platform, "All">
  sentiment: Sentiment
  time: string
  text: string
  likes: string
  reposts: string
  replies: string
  fallback: string
}[] = [
  {
    id: 1,
    author: "Dana Whitfield",
    handle: "@danacooks",
    platform: "X",
    sentiment: "Positive",
    time: "8m",
    text: "Three weeks in and the new Plated meal kits have completely changed weeknight dinners for us. Portion sizes are spot on. ",
    likes: "1.2K",
    reposts: "318",
    replies: "94",
    fallback: "DW",
  },
  {
    id: 2,
    author: "TechFork Review",
    handle: "techfork.com",
    platform: "News",
    sentiment: "Neutral",
    time: "41m",
    text: "Plated rolls out a redesigned mobile app with a focus on faster checkout. We break down what changed and whether it sticks.",
    likes: "204",
    reposts: "56",
    replies: "12",
    fallback: "TF",
  },
  {
    id: 3,
    author: "marcus_eats",
    handle: "@marcus_eats",
    platform: "Instagram",
    sentiment: "Positive",
    time: "1h",
    text: "The summer menu drop is gorgeous. Plating these felt effortless and the herbs were genuinely fresh on arrival. ",
    likes: "4.6K",
    reposts: "0",
    replies: "211",
    fallback: "ME",
  },
  {
    id: 4,
    author: "u/budget_chef",
    handle: "r/MealKits",
    platform: "Reddit",
    sentiment: "Negative",
    time: "2h",
    text: "Anyone else notice the per-serving price crept up again? Quality is still good but it's getting hard to justify monthly.",
    likes: "892",
    reposts: "0",
    replies: "347",
    fallback: "BC",
  },
  {
    id: 5,
    author: "Priya Nair",
    handle: "@priyatastes",
    platform: "X",
    sentiment: "Neutral",
    time: "3h",
    text: "Switched my Plated delivery window without issue. Support replied in under five minutes which honestly surprised me.",
    likes: "76",
    reposts: "9",
    replies: "4",
    fallback: "PN",
  },
  {
    id: 6,
    author: "the_food_lab",
    handle: "@the_food_lab",
    platform: "Instagram",
    sentiment: "Positive",
    time: "5h",
    text: "Collab dinner with Plated tonight. The packaging redesign is fully recyclable now and it shows. Big improvement. ",
    likes: "9.1K",
    reposts: "0",
    replies: "503",
    fallback: "FL",
  },
  {
    id: 7,
    author: "u/late_packages",
    handle: "r/subscriptions",
    platform: "Reddit",
    sentiment: "Negative",
    time: "7h",
    text: "Second late box this month. Cold pack was warm on arrival. Reached out but still waiting on a resolution.",
    likes: "421",
    reposts: "0",
    replies: "188",
    fallback: "LP",
  },
]

const platformStyles: Record<Exclude<Platform, "All">, string> = {
  X: "bg-foreground/10 text-foreground",
  Instagram: "bg-primary/10 text-primary",
  Reddit: "bg-accent text-foreground",
  News: "bg-secondary text-foreground",
}

function sentimentBadgeVariant(s: Sentiment): "default" | "secondary" | "destructive" {
  if (s === "Positive") return "default"
  if (s === "Negative") return "destructive"
  return "secondary"
}

export default function SocialListeningDashboard() {
  const [active, setActive] = React.useState<Platform>("All")

  const filtered = React.useMemo(
    () => (active === "All" ? MENTIONS : MENTIONS.filter((m) => m.platform === active)),
    [active],
  )

  return (
    <div className="flex min-h-full bg-background text-foreground [-webkit-font-smoothing:antialiased]">
      {/* Sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col border-r bg-card/40 lg:flex">
        <div className="flex items-center gap-2 px-6 py-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Radar className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold">Plated</p>
            <p className="text-xs text-muted-foreground">Listening</p>
          </div>
        </div>
        <Separator />
        <nav className="flex-1 space-y-1 px-3 py-4 text-sm">
          {[
            { label: "Overview", icon: Radar, active: true },
            { label: "Mentions", icon: MessageSquare },
            { label: "Sentiment", icon: Smile },
            { label: "Trends", icon: TrendingUp },
            { label: "Audience", icon: Globe },
            { label: "Settings", icon: Settings },
          ].map((item) => (
            <button
              key={item.label}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors active:scale-[0.98] [transition-property:scale,background-color,color]",
                item.active
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </nav>
        <Separator />
        <div className="flex items-center gap-3 px-4 py-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt="" />
            <AvatarFallback>SR</AvatarFallback>
          </Avatar>
          <div className="min-w-0 leading-tight">
            <p className="truncate text-sm font-medium">Sloane Reyes</p>
            <p className="truncate text-xs text-muted-foreground">Brand Analyst</p>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 flex items-center gap-4 border-b bg-background/80 px-4 py-3 backdrop-blur sm:px-6">
          <div className="flex items-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Radar className="h-4 w-4" />
            </div>
            <span className="font-semibold">Plated</span>
          </div>
          <div className="relative ml-auto w-full max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search mentions, topics, authors" className="pl-9" />
          </div>
          <Button variant="ghost" size="icon" aria-label="Notifications" className="active:scale-[0.96] transition-transform">
            <Bell className="h-5 w-5" />
          </Button>
          <Button size="sm" className="hidden active:scale-[0.96] transition-transform sm:inline-flex">
            Export
          </Button>
        </header>

        <main className="flex-1 space-y-6 px-4 py-6 sm:px-6">
          {/* Title row */}
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-balance">Brand Overview</h1>
              <p className="text-sm text-muted-foreground">Real-time listening across social and news. Last 7 days.</p>
            </div>
            <Badge variant="outline" className="gap-1.5">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Live monitoring
            </Badge>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {KPIS.map((kpi) => (
              <Card key={kpi.label}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardDescription>{kpi.label}</CardDescription>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <kpi.icon className="h-4 w-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold tabular-nums">{kpi.value}</div>
                  <div
                    className={cn(
                      "mt-1 flex items-center gap-1 text-xs font-medium",
                      kpi.up ? "text-primary" : "text-destructive",
                    )}
                  >
                    {kpi.up ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                    <span className="tabular-nums">{kpi.delta}</span>
                    <span className="text-muted-foreground">vs prev</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sentiment + Trending */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Sentiment Breakdown</CardTitle>
                <CardDescription>Distribution of 48,200 classified mentions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {SENTIMENT.map((s) => (
                  <div key={s.label} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 font-medium">
                        <s.icon className="h-4 w-4 text-muted-foreground" />
                        {s.label}
                      </span>
                      <span className="tabular-nums text-muted-foreground">{s.pct}%</span>
                    </div>
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className={cn("h-full rounded-full transition-[width] duration-500", s.bar)}
                        style={{ width: `${s.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
                <Separator />
                <div className="grid grid-cols-3 gap-3 text-center">
                  {SENTIMENT.map((s) => (
                    <div key={s.label} className="rounded-lg bg-muted/30 p-3">
                      <p className="text-lg font-semibold tabular-nums">{s.pct}%</p>
                      <p className="text-xs text-muted-foreground">{s.label}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-primary" />
                  Trending Topics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                {TRENDING.map((t, i) => (
                  <div
                    key={t.tag}
                    className="flex items-center justify-between rounded-lg px-2 py-2.5 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="w-4 shrink-0 text-sm font-semibold tabular-nums text-muted-foreground">
                        {i + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{t.tag}</p>
                        <p className="text-xs text-muted-foreground tabular-nums">{t.volume} mentions</p>
                      </div>
                    </div>
                    <span
                      className={cn(
                        "flex shrink-0 items-center gap-0.5 text-xs font-medium tabular-nums",
                        t.up ? "text-primary" : "text-destructive",
                      )}
                    >
                      {t.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {t.change}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Mentions feed */}
          <Card>
            <CardHeader className="gap-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <CardTitle>Mentions Feed</CardTitle>
                  <CardDescription>
                    {filtered.length} {active === "All" ? "recent" : active} {filtered.length === 1 ? "mention" : "mentions"}
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" className="gap-1.5 active:scale-[0.96] transition-transform">
                  View all
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>
              {/* Platform filter chips */}
              <div className="flex flex-wrap gap-2">
                {PLATFORMS.map((p) => {
                  const selected = active === p
                  return (
                    <button
                      key={p}
                      onClick={() => setActive(p)}
                      aria-pressed={selected}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors active:scale-[0.96] [transition-property:scale,background-color,color,border-color]",
                        selected
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                    >
                      {p === "All" && <Globe className="h-3.5 w-3.5" />}
                      {p}
                    </button>
                  )
                })}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed py-12 text-center">
                  <MessageSquare className="h-6 w-6 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">No mentions on this platform yet.</p>
                </div>
              ) : (
                filtered.map((m) => (
                  <div
                    key={m.id}
                    className="rounded-xl border bg-card p-4 transition-colors hover:bg-muted/30"
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="" alt="" />
                        <AvatarFallback>{m.fallback}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <span className="text-sm font-semibold">{m.author}</span>
                          <span className="text-xs text-muted-foreground">{m.handle}</span>
                          <span className="text-xs text-muted-foreground">· {m.time}</span>
                          <span
                            className={cn(
                              "ml-auto rounded-md px-2 py-0.5 text-xs font-medium",
                              platformStyles[m.platform],
                            )}
                          >
                            {m.platform}
                          </span>
                        </div>
                        <p className="mt-1.5 text-sm leading-relaxed text-foreground/90 [text-wrap:pretty]">
                          {m.text}
                        </p>
                        <div className="mt-3 flex items-center gap-5 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1.5 tabular-nums">
                            <Heart className="h-3.5 w-3.5" />
                            {m.likes}
                          </span>
                          <span className="flex items-center gap-1.5 tabular-nums">
                            <Repeat2 className="h-3.5 w-3.5" />
                            {m.reposts}
                          </span>
                          <span className="flex items-center gap-1.5 tabular-nums">
                            <MessageCircle className="h-3.5 w-3.5" />
                            {m.replies}
                          </span>
                          <Badge
                            variant={sentimentBadgeVariant(m.sentiment)}
                            className="ml-auto"
                          >
                            {m.sentiment}
                          </Badge>
                        </div>
                      </div>
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
