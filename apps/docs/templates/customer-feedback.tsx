"use client"

import * as React from "react"
import {
  ArrowUpRight,
  BarChart3,
  Frown,
  Inbox,
  Meh,
  MessageSquare,
  Search,
  Settings,
  Smile,
  Star,
  Tag,
  ThumbsUp,
  TrendingUp,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Sentiment = "Positive" | "Neutral" | "Negative"

type Feedback = {
  id: number
  name: string
  initials: string
  plan: string
  channel: string
  date: string
  rating: number
  sentiment: Sentiment
  excerpt: string
  body: string
  tags: string[]
}

const FEEDBACK: Feedback[] = [
  {
    id: 1,
    name: "Dana Whitfield",
    initials: "DW",
    plan: "Scale",
    channel: "In-app survey",
    date: "Jun 11",
    rating: 9,
    sentiment: "Positive",
    excerpt: "The new dashboard load times are night and day. My team noticed immediately.",
    body:
      "The new dashboard load times are night and day. My team noticed immediately and stopped complaining about the morning sync grinding to a halt. Whatever you shipped last sprint, keep doing more of that.",
    tags: ["Performance", "Dashboard", "Promoter"],
  },
  {
    id: 2,
    name: "Marcus Lee",
    initials: "ML",
    plan: "Growth",
    channel: "Support email",
    date: "Jun 10",
    rating: 6,
    sentiment: "Neutral",
    excerpt: "Export works fine but I wish CSV kept my column ordering between sessions.",
    body:
      "Export works fine but I wish CSV kept my column ordering between sessions. Right now I re-arrange the same six columns every Monday before the leadership report. Small thing, but it adds up over a quarter.",
    tags: ["Exports", "Feature request"],
  },
  {
    id: 3,
    name: "Priya Nair",
    initials: "PN",
    plan: "Scale",
    channel: "NPS follow-up",
    date: "Jun 09",
    rating: 3,
    sentiment: "Negative",
    excerpt: "Billing charged us twice this cycle and the chat agent couldn't reverse it.",
    body:
      "Billing charged us twice this cycle and the chat agent couldn't reverse it without escalating. We eventually got the refund but it took four days and three follow-ups. For an enterprise plan that felt slow.",
    tags: ["Billing", "Support", "Detractor"],
  },
  {
    id: 4,
    name: "Sofia Alvarez",
    initials: "SA",
    plan: "Starter",
    channel: "In-app survey",
    date: "Jun 08",
    rating: 10,
    sentiment: "Positive",
    excerpt: "Onboarding checklist got us live in an afternoon. Best setup I've done.",
    body:
      "Onboarding checklist got us live in an afternoon. Best setup experience I've had with any analytics tool. The sample data made it obvious what each report would look like before I imported anything.",
    tags: ["Onboarding", "Promoter"],
  },
  {
    id: 5,
    name: "Tobias Grant",
    initials: "TG",
    plan: "Growth",
    channel: "Support email",
    date: "Jun 07",
    rating: 5,
    sentiment: "Neutral",
    excerpt: "Mobile app is usable but charts overflow on smaller phones.",
    body:
      "Mobile app is usable but charts overflow on smaller phones. I review numbers on my commute and end up scrolling sideways a lot. Not a dealbreaker, just a bit fiddly compared to the desktop view.",
    tags: ["Mobile", "UI"],
  },
  {
    id: 6,
    name: "Hannah Brooks",
    initials: "HB",
    plan: "Scale",
    channel: "NPS follow-up",
    date: "Jun 06",
    rating: 2,
    sentiment: "Negative",
    excerpt: "Sync broke twice this week and I lost an hour of report edits each time.",
    body:
      "Sync broke twice this week and I lost an hour of report edits each time. I had to rebuild a board from memory for a client meeting. If reliability doesn't improve we'll have to look at alternatives at renewal.",
    tags: ["Reliability", "Sync", "Detractor"],
  },
]

const SENTIMENTS = ["All", "Positive", "Neutral", "Negative"] as const
type SentimentFilter = (typeof SENTIMENTS)[number]

const NAV = [
  ["Inbox", Inbox, true],
  ["Insights", BarChart3, false],
  ["Trends", TrendingUp, false],
  ["Settings", Settings, false],
] as const

const KPIS = [
  { label: "NPS", value: "+48", sub: "+6 vs last month", icon: ThumbsUp },
  { label: "Responses", value: "1,284", sub: "this quarter", icon: MessageSquare },
  { label: "Promoters", value: "61%", sub: "778 customers", icon: Smile },
  { label: "Avg. rating", value: "8.2", sub: "out of 10", icon: Star },
]

function sentimentMeta(s: Sentiment) {
  if (s === "Positive")
    return { icon: Smile, badge: "bg-primary/10 text-primary border-transparent" }
  if (s === "Negative")
    return { icon: Frown, badge: "bg-destructive/10 text-destructive border-transparent" }
  return { icon: Meh, badge: "bg-muted text-muted-foreground border-transparent" }
}

export default function CustomerFeedbackTemplate() {
  const [filter, setFilter] = React.useState<SentimentFilter>("All")
  const [query, setQuery] = React.useState("")
  const [selectedId, setSelectedId] = React.useState<number>(FEEDBACK[0].id)

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    return FEEDBACK.filter((f) => {
      const matchesSentiment = filter === "All" || f.sentiment === filter
      const matchesQuery =
        q === "" ||
        f.name.toLowerCase().includes(q) ||
        f.excerpt.toLowerCase().includes(q) ||
        f.tags.some((t) => t.toLowerCase().includes(q))
      return matchesSentiment && matchesQuery
    })
  }, [filter, query])

  const selected =
    filtered.find((f) => f.id === selectedId) ?? filtered[0] ?? null

  return (
    <div className="flex min-h-full bg-background text-foreground">
      <aside className="hidden w-60 shrink-0 flex-col border-r bg-muted/30 lg:flex">
        <div className="flex h-16 items-center gap-2 px-6">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <ThumbsUp className="size-4" />
          </div>
          <span className="text-base font-semibold">PulseLoop</span>
        </div>
        <Separator />
        <nav className="flex-1 space-y-1 p-3">
          {NAV.map(([label, Icon, active]) => (
            <button
              key={label as string}
              className={cn(
                "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <Icon className="size-4" />
              {label as string}
            </button>
          ))}
        </nav>
        <Separator />
        <div className="flex items-center gap-3 p-4">
          <Avatar className="size-9">
            <AvatarFallback>RM</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">Riley Morgan</p>
            <p className="truncate text-xs text-muted-foreground">Product Ops</p>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-background/95 px-6 backdrop-blur">
          <div>
            <h1 className="text-lg font-semibold">Customer Feedback</h1>
            <p className="text-xs text-muted-foreground">Listen, tag, and act on every response</p>
          </div>
          <Button size="sm">
            <BarChart3 className="size-4" />
            Export report
          </Button>
        </header>

        <main className="flex-1 space-y-6 overflow-y-auto p-6">
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="flex flex-col justify-between rounded-xl border bg-card p-5 md:col-span-2 xl:col-span-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">NPS score</span>
                <Badge variant="secondary">Last 30 days</Badge>
              </div>
              <div className="mt-4 flex items-end gap-2">
                <span className="text-4xl font-semibold tabular-nums">+48</span>
                <span className="mb-1 flex items-center gap-1 text-sm font-medium text-primary">
                  <ArrowUpRight className="size-4" />
                  6 pts
                </span>
              </div>
              <div className="mt-4 flex h-2 overflow-hidden rounded-full">
                <div className="bg-primary" style={{ width: "61%" }} />
                <div className="bg-muted" style={{ width: "26%" }} />
                <div className="bg-destructive" style={{ width: "13%" }} />
              </div>
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>61% promoters</span>
                <span>13% detractors</span>
              </div>
            </div>

            {KPIS.slice(1).map((kpi) => (
              <div key={kpi.label} className="rounded-xl border bg-card p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">{kpi.label}</span>
                  <span className="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <kpi.icon className="size-4" />
                  </span>
                </div>
                <p className="mt-3 text-3xl font-semibold tabular-nums">{kpi.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{kpi.sub}</p>
              </div>
            ))}
          </section>

          <div className="grid gap-6 lg:grid-cols-5">
            <section className="lg:col-span-3">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Tabs value={filter} onValueChange={(v) => setFilter(v as SentimentFilter)}>
                  <TabsList>
                    {SENTIMENTS.map((s) => (
                      <TabsTrigger key={s} value={s}>
                        {s}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
                <div className="relative sm:w-56">
                  <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search feedback or tags"
                    className="pl-9"
                    aria-label="Search feedback"
                  />
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {filtered.map((f) => {
                  const meta = sentimentMeta(f.sentiment)
                  const isActive = selected?.id === f.id
                  return (
                    <button
                      key={f.id}
                      onClick={() => setSelectedId(f.id)}
                      className={cn(
                        "w-full rounded-xl border bg-card p-4 text-left transition-colors hover:bg-accent/50",
                        isActive && "border-primary ring-1 ring-primary"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="size-9 shrink-0">
                          <AvatarFallback>{f.initials}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <p className="truncate text-sm font-medium">{f.name}</p>
                            <span className="shrink-0 text-xs text-muted-foreground">{f.date}</span>
                          </div>
                          <div className="mt-0.5 flex items-center gap-2">
                            <Badge className={cn("gap-1", meta.badge)}>
                              <meta.icon className="size-3" />
                              {f.sentiment}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{f.channel}</span>
                            <span className="ml-auto flex items-center gap-1 text-xs font-medium tabular-nums">
                              <Star className="size-3 text-primary" />
                              {f.rating}
                            </span>
                          </div>
                          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{f.excerpt}</p>
                        </div>
                      </div>
                    </button>
                  )
                })}

                {filtered.length === 0 && (
                  <div className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-card py-16 text-center">
                    <Inbox className="size-8 text-muted-foreground" />
                    <p className="mt-3 text-sm font-medium">No feedback matches</p>
                    <p className="mt-1 text-xs text-muted-foreground">Try a different sentiment or search term</p>
                  </div>
                )}
              </div>
            </section>

            <section className="lg:col-span-2">
              <div className="sticky top-24 rounded-xl border bg-card">
                {selected ? (
                  <div className="p-5">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-11">
                        <AvatarFallback>{selected.initials}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="truncate font-semibold">{selected.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {selected.plan} plan &middot; {selected.channel}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="rounded-lg bg-muted/50 p-3">
                        <p className="text-xs text-muted-foreground">Sentiment</p>
                        <p className="mt-1 text-sm font-medium">{selected.sentiment}</p>
                      </div>
                      <div className="rounded-lg bg-muted/50 p-3">
                        <p className="text-xs text-muted-foreground">Rating</p>
                        <p className="mt-1 text-sm font-medium tabular-nums">{selected.rating} / 10</p>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <p className="text-sm leading-relaxed">&ldquo;{selected.body}&rdquo;</p>

                    <div className="mt-4">
                      <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                        <Tag className="size-3.5" />
                        Tags
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {selected.tags.map((t) => (
                          <Badge key={t} variant="outline">
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <MessageSquare className="size-4" />
                        Reply
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <ThumbsUp className="size-4" />
                        Mark resolved
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <MessageSquare className="size-8 text-muted-foreground" />
                    <p className="mt-3 text-sm font-medium">Select a response</p>
                    <p className="mt-1 text-xs text-muted-foreground">Pick an item from the inbox to see details</p>
                  </div>
                )}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
