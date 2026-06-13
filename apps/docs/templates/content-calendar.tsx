"use client"

import * as React from "react"
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CircleDot,
  FileText,
  Mail,
  Megaphone,
  Plus,
  Settings2,
  Share2,
  Video,
  X,
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
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

type Channel = "Blog" | "Social" | "Email" | "Video"
type Status = "Planned" | "In progress" | "Published"

type ContentItem = {
  id: string
  day: number
  title: string
  channel: Channel
  status: Status
  owner: string
  initials: string
  time: string
  notes: string
}

const CHANNELS: { key: Channel; icon: React.ElementType; dot: string; soft: string }[] = [
  { key: "Blog", icon: FileText, dot: "bg-primary", soft: "bg-primary/10 text-primary" },
  { key: "Social", icon: Share2, dot: "bg-foreground", soft: "bg-muted text-foreground" },
  { key: "Email", icon: Mail, dot: "bg-secondary-foreground", soft: "bg-secondary text-secondary-foreground" },
  { key: "Video", icon: Video, dot: "bg-accent-foreground", soft: "bg-accent text-accent-foreground" },
]

const STATUSES: { key: Status; tone: string }[] = [
  { key: "Planned", tone: "border-border text-muted-foreground" },
  { key: "In progress", tone: "border-primary text-primary" },
  { key: "Published", tone: "border-foreground text-foreground" },
]

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

const ITEMS: ContentItem[] = [
  { id: "c1", day: 2, title: "State of editorial AI", channel: "Blog", status: "Published", owner: "Mara Quinn", initials: "MQ", time: "9:00 AM", notes: "Long-form pillar piece. 2,400 words, includes original survey data and three expert quotes." },
  { id: "c2", day: 3, title: "Behind the redesign", channel: "Social", status: "In progress", owner: "Theo Park", initials: "TP", time: "11:30 AM", notes: "Carousel for LinkedIn + cross-post to X. Five slides, before/after framing." },
  { id: "c3", day: 4, title: "June product digest", channel: "Email", status: "Planned", owner: "Lena Voss", initials: "LV", time: "8:00 AM", notes: "Monthly newsletter. Segment to active users, A/B test the subject line." },
  { id: "c4", day: 6, title: "Workflow walkthrough", channel: "Video", status: "Planned", owner: "Theo Park", initials: "TP", time: "2:00 PM", notes: "90-second screen capture. Needs final voiceover and captions before publish." },
  { id: "c5", day: 9, title: "Customer spotlight: Drift", channel: "Blog", status: "In progress", owner: "Mara Quinn", initials: "MQ", time: "10:00 AM", notes: "Interview transcript drafted, awaiting customer approval on the pull quotes." },
  { id: "c6", day: 10, title: "Poll: best publishing cadence", channel: "Social", status: "Planned", owner: "Ivy Chen", initials: "IC", time: "12:00 PM", notes: "Single-image poll for engagement. Schedule for lunch-hour reach." },
  { id: "c7", day: 11, title: "Re-engagement flow", channel: "Email", status: "Published", owner: "Lena Voss", initials: "LV", time: "7:30 AM", notes: "Win-back series, step 2 of 3. Triggered on 30-day inactivity." },
  { id: "c8", day: 13, title: "Founder Q&A live", channel: "Video", status: "In progress", owner: "Ivy Chen", initials: "IC", time: "4:00 PM", notes: "Live stream rehearsal done. Confirm guest mics and lower-thirds." },
  { id: "c9", day: 16, title: "SEO refresh: top 10", channel: "Blog", status: "Planned", owner: "Mara Quinn", initials: "MQ", time: "9:30 AM", notes: "Update 2024 rankings post with fresh data and new internal links." },
  { id: "c10", day: 17, title: "Hot take thread", channel: "Social", status: "Planned", owner: "Theo Park", initials: "TP", time: "1:00 PM", notes: "Six-tweet thread on editorial calendars. Hook tested in last week's poll." },
  { id: "c11", day: 18, title: "Feature launch blast", channel: "Email", status: "In progress", owner: "Lena Voss", initials: "LV", time: "8:30 AM", notes: "Announcement email tied to the calendar GA release. Hero image in review." },
  { id: "c12", day: 20, title: "Tips reel", channel: "Video", status: "Planned", owner: "Ivy Chen", initials: "IC", time: "3:30 PM", notes: "Vertical short for Reels and Shorts. Three quick tips, trending audio." },
  { id: "c13", day: 23, title: "Quarterly trends report", channel: "Blog", status: "Planned", owner: "Mara Quinn", initials: "MQ", time: "10:30 AM", notes: "Data-heavy report, needs two charts from analytics and a designer pass." },
  { id: "c14", day: 24, title: "Throwback case study", channel: "Social", status: "Published", owner: "Theo Park", initials: "TP", time: "11:00 AM", notes: "Repurpose Drift spotlight into a single graphic with a stat callout." },
  { id: "c15", day: 25, title: "Weekly roundup", channel: "Email", status: "Planned", owner: "Lena Voss", initials: "LV", time: "7:45 AM", notes: "Curated links + one original section. Keep under a 2-minute read." },
  { id: "c16", day: 27, title: "Office hours recap", channel: "Video", status: "Planned", owner: "Ivy Chen", initials: "IC", time: "5:00 PM", notes: "Edit highlights from the founder Q&A into a 4-minute recap." },
]

const FIRST_WEEKDAY_OFFSET = 0
const DAYS_IN_MONTH = 30

function channelMeta(channel: Channel) {
  return CHANNELS.find((c) => c.key === channel)!
}

export default function ContentCalendarTemplate() {
  const [active, setActive] = React.useState<Record<Channel, boolean>>({
    Blog: true,
    Social: true,
    Email: true,
    Video: true,
  })
  const [selectedId, setSelectedId] = React.useState<string>("c11")

  const toggleChannel = (channel: Channel) =>
    setActive((prev) => ({ ...prev, [channel]: !prev[channel] }))

  const visibleItems = ITEMS.filter((item) => active[item.channel])
  const selected = ITEMS.find((item) => item.id === selectedId) ?? null

  const kpis = React.useMemo(() => {
    const count = (status: Status) => visibleItems.filter((i) => i.status === status).length
    return {
      Planned: count("Planned"),
      "In progress": count("In progress"),
      Published: count("Published"),
    } as Record<Status, number>
  }, [visibleItems])

  const cells = React.useMemo(() => {
    const arr: (number | null)[] = []
    for (let i = 0; i < FIRST_WEEKDAY_OFFSET; i++) arr.push(null)
    for (let d = 1; d <= DAYS_IN_MONTH; d++) arr.push(d)
    while (arr.length % 7 !== 0) arr.push(null)
    return arr
  }, [])

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <CalendarDays className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Editorial</p>
              <p className="text-xs text-muted-foreground">Content calendar</p>
            </div>
          </div>
          <Separator orientation="vertical" className="hidden h-8 sm:block" />
          <nav className="hidden items-center gap-1 text-sm md:flex" aria-label="Primary">
            <Button variant="ghost" size="sm" className="font-medium">Calendar</Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">Backlog</Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">Analytics</Button>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="icon" aria-label="Calendar settings">
              <Settings2 className="h-4 w-4" />
            </Button>
            <Button size="sm">
              <Plus className="mr-1.5 h-4 w-4" />
              New item
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold tracking-tight">June 2026</h1>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="icon" className="h-8 w-8" aria-label="Previous month">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8" aria-label="Next month">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {visibleItems.length} items across {Object.values(active).filter(Boolean).length} channels
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {(STATUSES.map((s) => s.key) as Status[]).map((status) => (
            <Card key={status} className="border bg-card">
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{status}</p>
                  <p className="mt-1 text-2xl font-semibold tabular-nums">{kpis[status]}</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                  <CircleDot className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
          <section>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="mr-1 text-xs font-medium text-muted-foreground">Channels</span>
              {CHANNELS.map(({ key, icon: Icon, dot }) => {
                const on = active[key]
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => toggleChannel(key)}
                    aria-pressed={on}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm transition-colors",
                      on
                        ? "border-foreground/20 bg-card text-foreground"
                        : "border-dashed border-border bg-muted/30 text-muted-foreground"
                    )}
                  >
                    <span className={cn("h-2 w-2 rounded-full", on ? dot : "bg-muted-foreground/40")} />
                    <Icon className="h-3.5 w-3.5" />
                    {key}
                  </button>
                )
              })}
            </div>

            <Card className="overflow-hidden border bg-card">
              <div className="grid grid-cols-7 border-b bg-muted/30 text-center text-xs font-medium text-muted-foreground">
                {WEEKDAYS.map((d) => (
                  <div key={d} className="px-1 py-2">{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7">
                {cells.map((day, idx) => {
                  const dayItems = day
                    ? visibleItems.filter((i) => i.day === day)
                    : []
                  return (
                    <div
                      key={idx}
                      className={cn(
                        "min-h-[104px] border-b border-r p-1.5 last:border-r-0",
                        idx % 7 === 6 && "border-r-0",
                        !day && "bg-muted/20"
                      )}
                    >
                      {day && (
                        <>
                          <div className="mb-1 px-1 text-xs font-medium text-muted-foreground">{day}</div>
                          <div className="space-y-1">
                            {dayItems.map((item) => {
                              const meta = channelMeta(item.channel)
                              const isSel = item.id === selectedId
                              return (
                                <button
                                  key={item.id}
                                  type="button"
                                  onClick={() => setSelectedId(item.id)}
                                  className={cn(
                                    "flex w-full items-center gap-1.5 rounded px-1.5 py-1 text-left text-xs transition-colors",
                                    meta.soft,
                                    isSel ? "ring-2 ring-ring" : "hover:opacity-80"
                                  )}
                                >
                                  <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", meta.dot)} />
                                  <span className="truncate font-medium">{item.title}</span>
                                </button>
                              )
                            })}
                          </div>
                        </>
                      )}
                    </div>
                  )
                })}
              </div>
            </Card>

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="text-xs font-medium text-muted-foreground">Status</span>
              {STATUSES.map(({ key, tone }) => (
                <span key={key} className="inline-flex items-center gap-1.5 text-xs">
                  <span className={cn("rounded-full border px-2 py-0.5", tone)}>{key}</span>
                </span>
              ))}
            </div>
          </section>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Card className="border bg-card">
              {selected ? (
                <>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge
                          variant="secondary"
                          className={cn("gap-1", channelMeta(selected.channel).soft)}
                        >
                          {React.createElement(channelMeta(selected.channel).icon, {
                            className: "h-3 w-3",
                          })}
                          {selected.channel}
                        </Badge>
                        <span
                          className={cn(
                            "rounded-full border px-2 py-0.5 text-xs",
                            STATUSES.find((s) => s.key === selected.status)!.tone
                          )}
                        >
                          {selected.status}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="-mr-1 -mt-1 h-7 w-7 text-muted-foreground"
                        aria-label="Close panel"
                        onClick={() => setSelectedId("")}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardTitle className="pt-2 text-lg leading-snug">{selected.title}</CardTitle>
                    <CardDescription>
                      June {selected.day}, 2026 · {selected.time}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">{selected.initials}</AvatarFallback>
                      </Avatar>
                      <div className="leading-tight">
                        <p className="text-sm font-medium">{selected.owner}</p>
                        <p className="text-xs text-muted-foreground">Owner</p>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        Brief
                      </p>
                      <p className="text-sm text-muted-foreground">{selected.notes}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">Open draft</Button>
                      <Button size="sm" variant="outline" className="flex-1">Reschedule</Button>
                    </div>
                  </CardContent>
                </>
              ) : (
                <CardContent className="flex flex-col items-center justify-center gap-2 py-14 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <Megaphone className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium">No item selected</p>
                  <p className="max-w-[14rem] text-xs text-muted-foreground">
                    Pick a card on the calendar to see its brief, owner, and schedule.
                  </p>
                </CardContent>
              )}
            </Card>

            <Card className="mt-4 border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">This month</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2.5">
                {CHANNELS.map(({ key, icon: Icon, dot }) => {
                  const total = ITEMS.filter((i) => i.channel === key).length
                  return (
                    <div key={key} className="flex items-center justify-between text-sm">
                      <span className="inline-flex items-center gap-2">
                        <span className={cn("h-2 w-2 rounded-full", dot)} />
                        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                        {key}
                      </span>
                      <span className="tabular-nums text-muted-foreground">{total}</span>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>Editorial calendar · Synced 2 minutes ago</p>
          <p>16 scheduled items · 5 contributors</p>
        </div>
      </footer>
    </div>
  )
}
