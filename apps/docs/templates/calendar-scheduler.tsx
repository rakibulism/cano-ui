"use client"
import * as React from "react"
import { CalendarDays, ChevronLeft, ChevronRight, Plus, Search, Settings, Users, Clock, MapPin, Video, Filter } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

type CalendarKey = "design" | "engineering" | "marketing" | "personal"

const CALENDARS: { key: CalendarKey; label: string; dot: string; chip: string }[] = [
  { key: "design", label: "Design", dot: "bg-primary", chip: "bg-primary/10 text-primary border-primary/20" },
  { key: "engineering", label: "Engineering", dot: "bg-foreground", chip: "bg-muted text-foreground border" },
  { key: "marketing", label: "Marketing", dot: "bg-accent-foreground", chip: "bg-accent text-accent-foreground border" },
  { key: "personal", label: "Personal", dot: "bg-secondary-foreground", chip: "bg-secondary text-secondary-foreground border" },
]

type Event = {
  id: number
  day: number
  title: string
  time: string
  cal: CalendarKey
  attendees: string[]
  location?: string
  online?: boolean
}

const EVENTS: Event[] = [
  { id: 1, day: 3, title: "Sprint planning", time: "09:00", cal: "engineering", attendees: ["AL", "MK", "RP"], online: true },
  { id: 2, day: 3, title: "Design crit", time: "13:30", cal: "design", attendees: ["SD", "JN"], location: "Studio A" },
  { id: 3, day: 5, title: "Brand workshop", time: "10:00", cal: "marketing", attendees: ["TM", "KO", "LW"], location: "Room 2" },
  { id: 4, day: 9, title: "1:1 with Priya", time: "11:00", cal: "personal", attendees: ["PS"], online: true },
  { id: 5, day: 9, title: "API review", time: "15:00", cal: "engineering", attendees: ["RP", "AL"], online: true },
  { id: 6, day: 12, title: "Component sync", time: "09:30", cal: "design", attendees: ["SD", "MK"], location: "Studio A" },
  { id: 7, day: 12, title: "Launch prep", time: "14:00", cal: "marketing", attendees: ["TM", "KO"], online: true },
  { id: 8, day: 17, title: "Roadmap review", time: "10:30", cal: "engineering", attendees: ["AL", "RP", "MK", "JN"], location: "Boardroom" },
  { id: 9, day: 17, title: "User testing", time: "13:00", cal: "design", attendees: ["SD", "JN"], online: true },
  { id: 10, day: 20, title: "Newsletter", time: "09:00", cal: "marketing", attendees: ["KO"] },
  { id: 11, day: 20, title: "Dentist", time: "16:30", cal: "personal", attendees: [""], location: "Downtown" },
  { id: 12, day: 24, title: "Release standup", time: "09:15", cal: "engineering", attendees: ["AL", "RP"], online: true },
  { id: 13, day: 24, title: "Design system review", time: "11:30", cal: "design", attendees: ["SD", "MK", "JN"], location: "Studio A" },
  { id: 14, day: 27, title: "Campaign retro", time: "15:30", cal: "marketing", attendees: ["TM", "KO", "LW"], online: true },
]

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const MONTH_LABEL = "June 2026"
const LEADING_BLANKS = 1 // June 2026 starts on Monday
const DAYS_IN_MONTH = 30
const SELECTED_DEFAULT = 17

const WEEK_HOURS = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"]
const WEEK_DAYS = [
  { label: "Mon", date: 15 },
  { label: "Tue", date: 16 },
  { label: "Wed", date: 17 },
  { label: "Thu", date: 18 },
  { label: "Fri", date: 19 },
]

function calMeta(key: CalendarKey) {
  return CALENDARS.find((c) => c.key === key)!
}

export default function CalendarSchedulerTemplate() {
  const [view, setView] = React.useState<string>("month")
  const [active, setActive] = React.useState<Record<CalendarKey, boolean>>({
    design: true,
    engineering: true,
    marketing: true,
    personal: true,
  })
  const [selectedDay, setSelectedDay] = React.useState<number>(SELECTED_DEFAULT)

  const visibleEvents = EVENTS.filter((e) => active[e.cal])
  const eventsByDay = (day: number) => visibleEvents.filter((e) => e.day === day)
  const agenda = eventsByDay(selectedDay).sort((a, b) => a.time.localeCompare(b.time))

  function toggleCal(key: CalendarKey) {
    setActive((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur">
        <div className="flex h-16 items-center gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <CalendarDays className="h-5 w-5" />
            </div>
            <span className="text-lg font-semibold tracking-tight">Cadence</span>
          </div>
          <div className="ml-2 hidden items-center gap-1 md:flex">
            <Button variant="outline" size="icon" aria-label="Previous month">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" aria-label="Next month">
              <ChevronRight className="h-4 w-4" />
            </Button>
            <span className="ml-2 text-base font-medium">{MONTH_LABEL}</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative hidden sm:block">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search events" className="w-44 pl-8 lg:w-56" />
            </div>
            <Button variant="ghost" size="icon" aria-label="Settings">
              <Settings className="h-4 w-4" />
            </Button>
            <Button size="sm">
              <Plus className="mr-1 h-4 w-4" /> New event
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 flex-col lg:flex-row">
        <aside className="shrink-0 border-b bg-muted/30 p-4 lg:w-72 lg:border-b-0 lg:border-r">
          <div className="mb-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
              <Filter className="h-4 w-4 text-muted-foreground" /> Calendars
            </div>
            <p className="text-xs text-muted-foreground">Toggle teams to show or hide their events.</p>
          </div>
          <div className="space-y-1">
            {CALENDARS.map((c) => {
              const count = EVENTS.filter((e) => e.cal === c.key).length
              return (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => toggleCal(c.key)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left text-sm transition-colors hover:bg-accent",
                    !active[c.key] && "opacity-50"
                  )}
                >
                  <Checkbox checked={active[c.key]} aria-label={c.label} className="pointer-events-none" />
                  <span className={cn("h-2.5 w-2.5 rounded-full", c.dot)} />
                  <span className="flex-1 font-medium">{c.label}</span>
                  <span className="text-xs text-muted-foreground">{count}</span>
                </button>
              )
            })}
          </div>

          <Separator className="my-5" />

          <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
            <Users className="h-4 w-4 text-muted-foreground" /> Teammates
          </div>
          <div className="space-y-3">
            {[
              { name: "Sofia Diaz", role: "Design lead", init: "SD", free: true },
              { name: "Alex Lin", role: "Engineering", init: "AL", free: false },
              { name: "Tara Mehta", role: "Marketing", init: "TM", free: true },
            ].map((m) => (
              <div key={m.init} className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">{m.init}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{m.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{m.role}</p>
                </div>
                <Badge variant={m.free ? "secondary" : "outline"} className="text-[10px]">
                  {m.free ? "Free" : "Busy"}
                </Badge>
              </div>
            ))}
          </div>
        </aside>

        <main className="flex flex-1 flex-col p-4 sm:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-semibold tracking-tight">{MONTH_LABEL}</h1>
              <p className="text-sm text-muted-foreground">{visibleEvents.length} events across {Object.values(active).filter(Boolean).length} calendars</p>
            </div>
            <Tabs value={view} onValueChange={setView}>
              <TabsList>
                <TabsTrigger value="month">Month</TabsTrigger>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="day">Day</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid flex-1 grid-cols-1 gap-6 xl:grid-cols-[1fr_320px]">
            <div className="min-w-0">
              {view === "month" && (
                <Card className="overflow-hidden">
                  <div className="grid grid-cols-7 border-b bg-muted/40 text-center text-xs font-medium text-muted-foreground">
                    {WEEKDAYS.map((d) => (
                      <div key={d} className="py-2">{d}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7">
                    {Array.from({ length: LEADING_BLANKS }).map((_, i) => (
                      <div key={"b" + i} className="min-h-24 border-b border-r bg-muted/20" />
                    ))}
                    {Array.from({ length: DAYS_IN_MONTH }).map((_, i) => {
                      const day = i + 1
                      const dayEvents = eventsByDay(day)
                      const isSelected = day === selectedDay
                      return (
                        <button
                          key={day}
                          type="button"
                          onClick={() => setSelectedDay(day)}
                          className={cn(
                            "min-h-24 border-b border-r p-1.5 text-left align-top transition-colors hover:bg-accent/50",
                            isSelected && "bg-primary/5 ring-1 ring-inset ring-primary"
                          )}
                        >
                          <span
                            className={cn(
                              "inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium",
                              isSelected ? "bg-primary text-primary-foreground" : "text-foreground"
                            )}
                          >
                            {day}
                          </span>
                          <div className="mt-1 space-y-1">
                            {dayEvents.slice(0, 2).map((e) => (
                              <div
                                key={e.id}
                                className={cn("truncate rounded px-1.5 py-0.5 text-[10px] font-medium", calMeta(e.cal).chip)}
                              >
                                {e.time} {e.title}
                              </div>
                            ))}
                            {dayEvents.length > 2 && (
                              <div className="px-1 text-[10px] text-muted-foreground">+{dayEvents.length - 2} more</div>
                            )}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </Card>
              )}

              {view === "week" && (
                <Card className="overflow-hidden">
                  <div className="grid grid-cols-[56px_repeat(5,1fr)] border-b bg-muted/40 text-center text-xs font-medium">
                    <div className="py-2" />
                    {WEEK_DAYS.map((d) => (
                      <div key={d.date} className={cn("py-2", d.date === selectedDay && "text-primary")}>
                        <div className="text-muted-foreground">{d.label}</div>
                        <div className="text-sm font-semibold text-foreground">{d.date}</div>
                      </div>
                    ))}
                  </div>
                  <div className="max-h-[520px] overflow-y-auto">
                    {WEEK_HOURS.map((h) => (
                      <div key={h} className="grid grid-cols-[56px_repeat(5,1fr)] border-b last:border-b-0">
                        <div className="px-2 py-3 text-right text-[10px] text-muted-foreground">{h}</div>
                        {WEEK_DAYS.map((d) => {
                          const slot = visibleEvents.find((e) => e.day === d.date && e.time === h)
                          return (
                            <div key={d.date + h} className="min-h-12 border-l p-1">
                              {slot && (
                                <div className={cn("rounded-md border px-1.5 py-1 text-[10px] font-medium leading-tight", calMeta(slot.cal).chip)}>
                                  <div className="truncate">{slot.title}</div>
                                  <div className="opacity-80">{slot.time}</div>
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {view === "day" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Wednesday, June {selectedDay}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-0 p-0">
                    {WEEK_HOURS.map((h) => {
                      const slot = visibleEvents.find((e) => e.day === selectedDay && e.time === h)
                      return (
                        <div key={h} className="grid grid-cols-[64px_1fr] border-b last:border-b-0">
                          <div className="px-3 py-4 text-right text-xs text-muted-foreground">{h}</div>
                          <div className="min-h-14 border-l p-2">
                            {slot && (
                              <div className={cn("flex items-center justify-between gap-2 rounded-lg border px-3 py-2", calMeta(slot.cal).chip)}>
                                <div>
                                  <p className="text-sm font-semibold">{slot.title}</p>
                                  <p className="text-xs opacity-80">{slot.online ? "Video call" : slot.location}</p>
                                </div>
                                <div className="flex -space-x-2">
                                  {slot.attendees.filter(Boolean).map((a, idx) => (
                                    <Avatar key={idx} className="h-6 w-6 border-2 border-background">
                                      <AvatarFallback className="text-[9px]">{a}</AvatarFallback>
                                    </Avatar>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>
              )}
            </div>

            <aside className="min-w-0">
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-base">
                    <span>June {selectedDay}</span>
                    <Badge variant="secondary">{agenda.length} events</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {agenda.length === 0 && (
                    <div className="rounded-lg border border-dashed py-10 text-center text-sm text-muted-foreground">
                      No events for this day.
                    </div>
                  )}
                  {agenda.map((e) => (
                    <div key={e.id} className="rounded-lg border p-3">
                      <div className="flex items-center gap-2">
                        <span className={cn("h-2.5 w-2.5 rounded-full", calMeta(e.cal).dot)} />
                        <p className="flex-1 text-sm font-semibold">{e.title}</p>
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" /> {e.time}
                        </span>
                        {e.online ? (
                          <span className="inline-flex items-center gap-1">
                            <Video className="h-3.5 w-3.5" /> Video call
                          </span>
                        ) : e.location ? (
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" /> {e.location}
                          </span>
                        ) : null}
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex -space-x-2">
                          {e.attendees.filter(Boolean).map((a, idx) => (
                            <Avatar key={idx} className="h-6 w-6 border-2 border-background">
                              <AvatarFallback className="text-[9px]">{a}</AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                        <Badge variant="outline" className="text-[10px] capitalize">{e.cal}</Badge>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    <Plus className="mr-1 h-4 w-4" /> Add to June {selectedDay}
                  </Button>
                </CardContent>
              </Card>
            </aside>
          </div>
        </main>
      </div>
    </div>
  )
}
