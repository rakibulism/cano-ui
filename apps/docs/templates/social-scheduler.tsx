"use client"

import * as React from "react"
import {
  BarChart3,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Facebook,
  GripVertical,
  Instagram,
  Layers,
  Linkedin,
  PauseCircle,
  PenSquare,
  Plus,
  Send,
  Settings,
  Sparkles,
  TrendingUp,
  Twitter,
  Users,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

type Section = "Calendar" | "Queue" | "Accounts" | "Analytics"
type AccountId = "ig" | "tw" | "li" | "fb"
type PostStatus = "Scheduled" | "Paused" | "Published"

const NAV: { id: Section; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "Calendar", icon: CalendarDays },
  { id: "Queue", icon: Layers },
  { id: "Accounts", icon: Users },
  { id: "Analytics", icon: BarChart3 },
]

const ACCOUNTS: {
  id: AccountId
  handle: string
  network: string
  icon: React.ComponentType<{ className?: string }>
  followers: string
}[] = [
  { id: "ig", handle: "@plated.studio", network: "Instagram", icon: Instagram, followers: "48.2k" },
  { id: "tw", handle: "@platedhq", network: "X / Twitter", icon: Twitter, followers: "12.9k" },
  { id: "li", handle: "Plated Studio", network: "LinkedIn", icon: Linkedin, followers: "8.4k" },
  { id: "fb", handle: "Plated", network: "Facebook", icon: Facebook, followers: "21.7k" },
]

type Post = {
  id: number
  account: AccountId
  day: number // 0..6 within visible week
  time: string
  title: string
  status: PostStatus
}

const INITIAL_POSTS: Post[] = [
  { id: 1, account: "ig", day: 0, time: "9:00 AM", title: "Behind the plating — winter menu", status: "Scheduled" },
  { id: 2, account: "tw", day: 0, time: "1:30 PM", title: "Thread: 5 plating mistakes", status: "Scheduled" },
  { id: 3, account: "li", day: 1, time: "8:15 AM", title: "We're hiring a sous chef", status: "Paused" },
  { id: 4, account: "fb", day: 2, time: "11:00 AM", title: "Weekend tasting event", status: "Scheduled" },
  { id: 5, account: "ig", day: 2, time: "6:45 PM", title: "Reel: 60-second risotto", status: "Scheduled" },
  { id: 6, account: "tw", day: 3, time: "10:00 AM", title: "Poll: best comfort dish?", status: "Published" },
  { id: 7, account: "li", day: 4, time: "9:30 AM", title: "Case study with Northwind", status: "Scheduled" },
  { id: 8, account: "fb", day: 4, time: "4:00 PM", title: "Recipe drop: brown butter", status: "Paused" },
  { id: 9, account: "ig", day: 5, time: "12:00 PM", title: "Carousel: pantry staples", status: "Scheduled" },
  { id: 10, account: "tw", day: 6, time: "3:15 PM", title: "Recap of the week", status: "Scheduled" },
]

const WEEK_DAYS = ["Mon 9", "Tue 10", "Wed 11", "Thu 12", "Fri 13", "Sat 14", "Sun 15"]

const ANALYTICS = [
  { label: "Posts published", value: "126", delta: "+18%", icon: Send },
  { label: "Total reach", value: "312k", delta: "+9.4%", icon: TrendingUp },
  { label: "Engagement rate", value: "4.8%", delta: "+0.6pt", icon: Sparkles },
  { label: "New followers", value: "2,140", delta: "+12%", icon: Users },
]

const NETWORK_PERF: { id: AccountId; reach: number }[] = [
  { id: "ig", reach: 92 },
  { id: "fb", reach: 64 },
  { id: "tw", reach: 47 },
  { id: "li", reach: 38 },
]

function accountMeta(id: AccountId) {
  return ACCOUNTS.find((a) => a.id === id)!
}

function statusVariant(s: PostStatus): "default" | "secondary" | "outline" {
  if (s === "Published") return "default"
  if (s === "Paused") return "outline"
  return "secondary"
}

export default function SocialScheduler() {
  const [section, setSection] = React.useState<Section>("Calendar")
  const [active, setActive] = React.useState<Record<AccountId, boolean>>({
    ig: true,
    tw: true,
    li: true,
    fb: true,
  })
  const [posts, setPosts] = React.useState<Post[]>(INITIAL_POSTS)

  const toggleAccount = (id: AccountId) =>
    setActive((prev) => ({ ...prev, [id]: !prev[id] }))

  const cyclePost = (id: number) =>
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p
        const next: PostStatus =
          p.status === "Scheduled" ? "Paused" : p.status === "Paused" ? "Published" : "Scheduled"
        return { ...p, status: next }
      }),
    )

  const movePost = (id: number, dir: -1 | 1) =>
    setPosts((prev) => {
      const idx = prev.findIndex((p) => p.id === id)
      const target = idx + dir
      if (idx < 0 || target < 0 || target >= prev.length) return prev
      const copy = [...prev]
      const [item] = copy.splice(idx, 1)
      copy.splice(target, 0, item)
      return copy
    })

  const visiblePosts = posts.filter((p) => active[p.account])

  return (
    <div className="flex min-h-full bg-background text-foreground">
      {/* Sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col border-r bg-muted/30 lg:flex">
        <div className="flex h-16 items-center gap-2 border-b px-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Send className="h-4 w-4" />
          </div>
          <span className="text-sm font-semibold">Cadence</span>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-3" aria-label="Primary">
          {NAV.map(({ id, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setSection(id)}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                section === id
                  ? "bg-primary/10 font-medium text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
              aria-current={section === id ? "page" : undefined}
            >
              <Icon className="h-4 w-4" />
              {id}
            </button>
          ))}
        </nav>
        <div className="space-y-2 border-t p-3">
          <p className="px-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Channels
          </p>
          {ACCOUNTS.map((a) => (
            <button
              key={a.id}
              onClick={() => toggleAccount(a.id)}
              className={cn(
                "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors hover:bg-accent",
                !active[a.id] && "opacity-50",
              )}
              aria-pressed={active[a.id]}
            >
              <a.icon className="h-4 w-4 text-muted-foreground" />
              <span className="truncate">{a.handle}</span>
              <span
                className={cn(
                  "ml-auto h-2 w-2 rounded-full",
                  active[a.id] ? "bg-primary" : "bg-muted",
                )}
              />
            </button>
          ))}
        </div>
        <div className="border-t p-3">
          <div className="flex items-center gap-3 rounded-md px-2 py-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>MK</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">Mia Kessler</p>
              <p className="truncate text-xs text-muted-foreground">Social lead</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-10 flex h-16 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur sm:px-6">
          <div className="min-w-0">
            <h1 className="truncate text-lg font-semibold tracking-tight">{section}</h1>
            <p className="hidden text-xs text-muted-foreground sm:block">
              June 9 – 15, 2026 · {visiblePosts.length} active posts
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="icon" aria-label="Settings" className="hidden sm:inline-flex">
              <Settings className="h-4 w-4" />
            </Button>
            <Button size="sm">
              <PenSquare className="h-4 w-4" />
              Compose
            </Button>
          </div>
        </header>

        {/* Account filter chips */}
        <div className="flex flex-wrap items-center gap-2 border-b px-4 py-3 sm:px-6">
          <span className="mr-1 text-xs font-medium text-muted-foreground">Filter:</span>
          {ACCOUNTS.map((a) => (
            <button
              key={a.id}
              onClick={() => toggleAccount(a.id)}
              className={cn(
                "flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-colors",
                active[a.id]
                  ? "border-primary bg-primary/10 font-medium text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
              aria-pressed={active[a.id]}
            >
              <a.icon className="h-3.5 w-3.5" />
              {a.network}
            </button>
          ))}
        </div>

        <main className="flex-1 p-4 sm:p-6">
          {section === "Calendar" && (
            <CalendarView posts={visiblePosts} cyclePost={cyclePost} />
          )}
          {section === "Queue" && (
            <QueueView posts={visiblePosts} cyclePost={cyclePost} movePost={movePost} />
          )}
          {section === "Accounts" && <AccountsView active={active} toggle={toggleAccount} />}
          {section === "Analytics" && <AnalyticsView active={active} />}
        </main>
      </div>
    </div>
  )
}

function CalendarView({
  posts,
  cyclePost,
}: {
  posts: Post[]
  cyclePost: (id: number) => void
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" aria-label="Previous week">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" aria-label="Next week">
          <ChevronRight className="h-4 w-4" />
        </Button>
        <span className="ml-2 text-sm font-medium">Week of June 9</span>
        <Badge variant="secondary" className="ml-auto">
          {posts.length} posts
        </Badge>
      </div>

      <div className="overflow-x-auto">
        <div className="grid min-w-[760px] grid-cols-7 gap-3">
          {WEEK_DAYS.map((label, dayIdx) => {
            const dayPosts = posts.filter((p) => p.day === dayIdx)
            return (
              <div key={label} className="flex min-h-[260px] flex-col rounded-lg border bg-card">
                <div className="flex items-center justify-between border-b px-3 py-2">
                  <span className="text-xs font-medium">{label}</span>
                  {dayPosts.length > 0 && (
                    <span className="rounded-full bg-muted px-1.5 text-[10px] text-muted-foreground">
                      {dayPosts.length}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-2 p-2">
                  {dayPosts.map((p) => {
                    const meta = accountMeta(p.account)
                    return (
                      <button
                        key={p.id}
                        onClick={() => cyclePost(p.id)}
                        className="group rounded-md border bg-background p-2 text-left transition-colors hover:border-primary"
                        aria-label={`Toggle status for ${p.title}`}
                      >
                        <div className="flex items-center gap-1.5">
                          <meta.icon className="h-3 w-3 text-muted-foreground" />
                          <span className="text-[10px] text-muted-foreground">{p.time}</span>
                          <StatusDot status={p.status} />
                        </div>
                        <p className="mt-1 line-clamp-2 text-xs font-medium leading-snug">
                          {p.title}
                        </p>
                      </button>
                    )
                  })}
                  <button
                    className="mt-auto flex items-center justify-center gap-1 rounded-md border border-dashed py-1.5 text-[11px] text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                    aria-label={`Add post on ${label}`}
                  >
                    <Plus className="h-3 w-3" />
                    Add
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        Tip: click any scheduled post to cycle Scheduled → Paused → Published.
      </p>
    </div>
  )
}

function QueueView({
  posts,
  cyclePost,
  movePost,
}: {
  posts: Post[]
  cyclePost: (id: number) => void
  movePost: (id: number, dir: -1 | 1) => void
}) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        Posts publish top to bottom. Reorder with the arrows and toggle status inline.
      </p>
      <div className="overflow-hidden rounded-lg border">
        {posts.map((p, i) => {
          const meta = accountMeta(p.account)
          return (
            <div
              key={p.id}
              className={cn(
                "flex items-center gap-3 px-3 py-3 sm:px-4",
                i !== posts.length - 1 && "border-b",
              )}
            >
              <GripVertical className="hidden h-4 w-4 shrink-0 text-muted-foreground sm:block" aria-hidden="true" />
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-muted">
                <meta.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{p.title}</p>
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {WEEK_DAYS[p.day]} · {p.time} · {meta.handle}
                </p>
              </div>
              <Badge variant={statusVariant(p.status)} className="hidden sm:inline-flex">
                {p.status}
              </Badge>
              <Button
                variant="ghost"
                size="icon"
                aria-label={`Cycle status for ${p.title}`}
                onClick={() => cyclePost(p.id)}
              >
                {p.status === "Published" ? (
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                ) : p.status === "Paused" ? (
                  <PauseCircle className="h-4 w-4" />
                ) : (
                  <Clock className="h-4 w-4" />
                )}
              </Button>
              <div className="flex flex-col">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  aria-label={`Move ${p.title} up`}
                  disabled={i === 0}
                  onClick={() => movePost(p.id, -1)}
                >
                  <ChevronLeft className="h-3 w-3 rotate-90" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  aria-label={`Move ${p.title} down`}
                  disabled={i === posts.length - 1}
                  onClick={() => movePost(p.id, 1)}
                >
                  <ChevronRight className="h-3 w-3 rotate-90" />
                </Button>
              </div>
            </div>
          )
        })}
        {posts.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-sm font-medium">No posts in queue</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Enable a channel filter to see scheduled posts.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function AccountsView({
  active,
  toggle,
}: {
  active: Record<AccountId, boolean>
  toggle: (id: AccountId) => void
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {ACCOUNTS.map((a) => (
        <Card key={a.id}>
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
              <a.icon className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <CardTitle className="text-base">{a.handle}</CardTitle>
              <p className="text-xs text-muted-foreground">{a.network}</p>
            </div>
            <Badge variant={active[a.id] ? "default" : "outline"} className="ml-auto">
              {active[a.id] ? "Connected" : "Muted"}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Followers</span>
              <span className="font-medium">{a.followers}</span>
            </div>
            <Separator />
            <Button
              variant={active[a.id] ? "outline" : "default"}
              size="sm"
              className="w-full"
              onClick={() => toggle(a.id)}
            >
              {active[a.id] ? "Mute in calendar" : "Show in calendar"}
            </Button>
          </CardContent>
        </Card>
      ))}
      <Card className="border-dashed">
        <CardContent className="flex h-full min-h-[150px] flex-col items-center justify-center gap-2 text-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-muted">
            <Plus className="h-5 w-5 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium">Connect a channel</p>
          <p className="text-xs text-muted-foreground">
            Link YouTube, TikTok, Pinterest and more.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

function AnalyticsView({ active }: { active: Record<AccountId, boolean> }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ANALYTICS.map((m) => (
          <Card key={m.label}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{m.label}</span>
                <m.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="mt-2 text-2xl font-semibold tracking-tight">{m.value}</p>
              <p className="mt-1 flex items-center gap-1 text-xs text-primary">
                <TrendingUp className="h-3 w-3" />
                {m.delta} vs last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Reach by channel</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {NETWORK_PERF.map((row) => {
            const meta = accountMeta(row.id)
            const muted = !active[row.id]
            return (
              <div key={row.id} className={cn("space-y-1.5", muted && "opacity-40")}>
                <div className="flex items-center gap-2 text-sm">
                  <meta.icon className="h-4 w-4 text-muted-foreground" />
                  <span>{meta.network}</span>
                  <span className="ml-auto font-medium">{row.reach}k</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${row.reach}%` }}
                  />
                </div>
              </div>
            )
          })}
          <p className="pt-1 text-xs text-muted-foreground">
            Muted channels are dimmed. Toggle them from the filter bar above.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

function StatusDot({ status }: { status: PostStatus }) {
  return (
    <span
      className={cn(
        "ml-auto h-1.5 w-1.5 rounded-full",
        status === "Published" && "bg-primary",
        status === "Scheduled" && "bg-muted-foreground",
        status === "Paused" && "border border-muted-foreground bg-transparent",
      )}
      aria-hidden="true"
    />
  )
}
