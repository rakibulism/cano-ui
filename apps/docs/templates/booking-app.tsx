"use client"
import * as React from "react"
import { CalendarDays, CalendarCheck, Users, Scissors, Plus, Search, Settings, Clock, User, Phone, CheckCircle2, XCircle, CircleDot, ChevronRight, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

type SectionKey = "calendar" | "appointments" | "services" | "clients"
type Status = "upcoming" | "completed" | "cancelled"

const NAV: { key: SectionKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: "calendar", label: "Calendar", icon: CalendarDays },
  { key: "appointments", label: "Appointments", icon: CalendarCheck },
  { key: "services", label: "Services", icon: Scissors },
  { key: "clients", label: "Clients", icon: Users },
]

type Appt = {
  id: number
  time: string
  end: string
  client: string
  init: string
  service: string
  staff: string
  status: Status
  phone: string
}

const APPTS: Appt[] = [
  { id: 1, time: "09:00", end: "09:45", client: "Mara Whitfield", init: "MW", service: "Signature Cut & Style", staff: "Lena", status: "completed", phone: "(415) 555-0148" },
  { id: 2, time: "10:00", end: "10:30", client: "Devon Park", init: "DP", service: "Beard Trim", staff: "Marcus", status: "completed", phone: "(415) 555-0192" },
  { id: 3, time: "11:00", end: "12:00", client: "Imani Brooks", init: "IB", service: "Full Color", staff: "Lena", status: "upcoming", phone: "(415) 555-0117" },
  { id: 4, time: "12:30", end: "13:00", client: "Theo Nakamura", init: "TN", service: "Quick Cut", staff: "Marcus", status: "cancelled", phone: "(415) 555-0163" },
  { id: 5, time: "13:30", end: "14:30", client: "Sofia Reyes", init: "SR", service: "Balayage", staff: "Lena", status: "upcoming", phone: "(415) 555-0125" },
  { id: 6, time: "15:00", end: "15:45", client: "Caleb Ofori", init: "CO", service: "Signature Cut & Style", staff: "Priya", status: "upcoming", phone: "(415) 555-0139" },
  { id: 7, time: "16:00", end: "16:30", client: "Nadia Khan", init: "NK", service: "Blowout", staff: "Priya", status: "upcoming", phone: "(415) 555-0171" },
]

const SLOTS = ["09:00", "10:00", "11:00", "12:00", "12:30", "13:30", "15:00", "16:00"]

const SERVICES: { name: string; duration: string; price: string; bookings: number; tone: string }[] = [
  { name: "Signature Cut & Style", duration: "45 min", price: "$68", bookings: 124, tone: "bg-primary/10 text-primary border-primary/20" },
  { name: "Full Color", duration: "60 min", price: "$120", bookings: 86, tone: "bg-secondary text-secondary-foreground border" },
  { name: "Balayage", duration: "90 min", price: "$185", bookings: 52, tone: "bg-accent text-accent-foreground border" },
  { name: "Beard Trim", duration: "20 min", price: "$28", bookings: 73, tone: "bg-muted text-foreground border" },
  { name: "Blowout", duration: "30 min", price: "$45", bookings: 61, tone: "bg-muted text-foreground border" },
  { name: "Quick Cut", duration: "25 min", price: "$38", bookings: 95, tone: "bg-muted text-foreground border" },
]

const CLIENTS: { name: string; init: string; visits: number; last: string; tier: string }[] = [
  { name: "Mara Whitfield", init: "MW", visits: 18, last: "Today", tier: "VIP" },
  { name: "Sofia Reyes", init: "SR", visits: 11, last: "Today", tier: "Regular" },
  { name: "Imani Brooks", init: "IB", visits: 7, last: "Today", tier: "Regular" },
  { name: "Caleb Ofori", init: "CO", visits: 3, last: "2 weeks ago", tier: "New" },
  { name: "Devon Park", init: "DP", visits: 22, last: "Today", tier: "VIP" },
]

const STATUS_META: Record<Status, { label: string; chip: string; icon: React.ComponentType<{ className?: string }> }> = {
  upcoming: { label: "Upcoming", chip: "bg-primary/10 text-primary border-primary/20", icon: CircleDot },
  completed: { label: "Completed", chip: "bg-secondary text-secondary-foreground border", icon: CheckCircle2 },
  cancelled: { label: "Cancelled", chip: "bg-muted text-muted-foreground border", icon: XCircle },
}

const FILTERS: { key: "all" | Status; label: string }[] = [
  { key: "all", label: "All" },
  { key: "upcoming", label: "Upcoming" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
]

const DAY_LABEL = "Saturday, June 14"

function apptAt(time: string) {
  return APPTS.find((a) => a.time === time)
}

export default function BookingAppTemplate() {
  const [section, setSection] = React.useState<SectionKey>("calendar")
  const [filter, setFilter] = React.useState<"all" | Status>("all")

  const filtered = filter === "all" ? APPTS : APPTS.filter((a) => a.status === filter)
  const counts = {
    all: APPTS.length,
    upcoming: APPTS.filter((a) => a.status === "upcoming").length,
    completed: APPTS.filter((a) => a.status === "completed").length,
    cancelled: APPTS.filter((a) => a.status === "cancelled").length,
  }

  return (
    <div className="flex min-h-full bg-background text-foreground">
      <aside className="hidden w-60 shrink-0 flex-col border-r bg-muted/30 lg:flex">
        <div className="flex h-16 items-center gap-2 border-b px-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Scissors className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <span className="block text-sm font-semibold tracking-tight">Glow Studio</span>
            <span className="block text-xs text-muted-foreground">Booking</span>
          </div>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {NAV.map((item) => {
            const Icon = item.icon
            const active = section === item.key
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setSection(item.key)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.key === "appointments" && (
                  <span className={cn("rounded-full px-1.5 text-[10px]", active ? "bg-primary-foreground/20" : "bg-muted")}>{counts.upcoming}</span>
                )}
              </button>
            )
          })}
        </nav>
        <div className="border-t p-3">
          <div className="flex items-center gap-3 rounded-lg px-2 py-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs">LR</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1 leading-tight">
              <p className="truncate text-sm font-medium">Lena Ruiz</p>
              <p className="truncate text-xs text-muted-foreground">Owner</p>
            </div>
            <Button variant="ghost" size="icon" aria-label="Settings">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur">
          <div className="flex h-16 items-center gap-4 px-4 sm:px-6">
            <div className="lg:hidden flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Scissors className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-lg font-semibold tracking-tight capitalize">{section}</h1>
              <p className="hidden text-xs text-muted-foreground sm:block">{DAY_LABEL}</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <div className="relative hidden sm:block">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search clients" className="w-40 pl-8 lg:w-56" />
              </div>
              <Button size="sm">
                <Plus className="mr-1 h-4 w-4" /> New booking
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6">
          {section === "calendar" && (
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_320px]">
              <Card className="min-w-0 overflow-hidden">
                <CardHeader className="flex-row items-center justify-between border-b">
                  <div>
                    <CardTitle className="text-base">Day schedule</CardTitle>
                    <CardDescription>{DAY_LABEL}</CardDescription>
                  </div>
                  <Badge variant="secondary">{APPTS.filter((a) => a.status !== "cancelled").length} booked</Badge>
                </CardHeader>
                <CardContent className="p-0">
                  {SLOTS.map((slot) => {
                    const appt = apptAt(slot)
                    const meta = appt ? STATUS_META[appt.status] : null
                    return (
                      <div key={slot} className="grid grid-cols-[64px_1fr] border-b last:border-b-0">
                        <div className="px-3 py-4 text-right text-xs font-medium text-muted-foreground">{slot}</div>
                        <div className="min-h-16 border-l p-2">
                          {appt && meta ? (
                            <div className={cn("flex items-center gap-3 rounded-lg border px-3 py-2.5", meta.chip, appt.status === "cancelled" && "opacity-60")}>
                              <Avatar className="h-8 w-8 border border-background">
                                <AvatarFallback className="text-[10px]">{appt.init}</AvatarFallback>
                              </Avatar>
                              <div className="min-w-0 flex-1">
                                <p className={cn("truncate text-sm font-semibold", appt.status === "cancelled" && "line-through")}>{appt.service}</p>
                                <p className="truncate text-xs opacity-80">{appt.client} · {appt.time}–{appt.end} · {appt.staff}</p>
                              </div>
                              <meta.icon className="h-4 w-4 shrink-0" />
                            </div>
                          ) : (
                            <button type="button" className="flex h-full min-h-12 w-full items-center justify-center rounded-lg border border-dashed text-xs text-muted-foreground transition-colors hover:bg-accent/50">
                              <Plus className="mr-1 h-3.5 w-3.5" /> Open slot
                            </button>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>

              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Today", value: counts.all },
                    { label: "Upcoming", value: counts.upcoming },
                    { label: "Revenue", value: "$612" },
                  ].map((s) => (
                    <Card key={s.label}>
                      <CardContent className="p-4">
                        <p className="text-xs text-muted-foreground">{s.label}</p>
                        <p className="mt-1 text-2xl font-semibold tracking-tight">{s.value}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Card className="sticky top-20">
                  <CardHeader>
                    <CardTitle className="text-base">Today's staff</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { name: "Lena Ruiz", init: "LR", role: "Senior stylist", booked: 3 },
                      { name: "Marcus Bell", init: "MB", role: "Barber", booked: 2 },
                      { name: "Priya Anand", init: "PA", role: "Stylist", booked: 2 },
                    ].map((m) => (
                      <div key={m.init} className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">{m.init}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1 leading-tight">
                          <p className="truncate text-sm font-medium">{m.name}</p>
                          <p className="truncate text-xs text-muted-foreground">{m.role}</p>
                        </div>
                        <Badge variant="outline" className="text-[10px]">{m.booked} booked</Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {section === "appointments" && (
            <div className="space-y-4">
              <Tabs value={filter} onValueChange={(v) => setFilter(v as "all" | Status)}>
                <TabsList>
                  {FILTERS.map((f) => (
                    <TabsTrigger key={f.key} value={f.key}>
                      {f.label}
                      <span className="ml-1.5 text-xs opacity-70">{counts[f.key]}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              <Card className="overflow-hidden">
                <CardContent className="divide-y p-0">
                  {filtered.length === 0 && (
                    <div className="py-16 text-center text-sm text-muted-foreground">No {filter} appointments.</div>
                  )}
                  {filtered.map((a) => {
                    const meta = STATUS_META[a.status]
                    return (
                      <div key={a.id} className="flex items-center gap-4 px-4 py-3.5 transition-colors hover:bg-muted/40 sm:px-5">
                        <div className="hidden w-16 shrink-0 text-center sm:block">
                          <p className="text-sm font-semibold">{a.time}</p>
                          <p className="text-[11px] text-muted-foreground">{a.end}</p>
                        </div>
                        <Separator orientation="vertical" className="hidden h-10 sm:block" />
                        <Avatar className="h-9 w-9 shrink-0">
                          <AvatarFallback className="text-xs">{a.init}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold">{a.client}</p>
                          <p className="truncate text-xs text-muted-foreground">{a.service} · with {a.staff}</p>
                        </div>
                        <span className="hidden items-center gap-1 text-xs text-muted-foreground md:inline-flex">
                          <Phone className="h-3.5 w-3.5" /> {a.phone}
                        </span>
                        <Badge variant="outline" className={cn("gap-1 capitalize", meta.chip)}>
                          <meta.icon className="h-3 w-3" /> {meta.label}
                        </Badge>
                        <Button variant="ghost" size="icon" aria-label="More options">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            </div>
          )}

          {section === "services" && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {SERVICES.map((s) => (
                <Card key={s.name} className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-base">{s.name}</CardTitle>
                      <Badge variant="outline" className={s.tone}>{s.price}</Badge>
                    </div>
                    <CardDescription className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" /> {s.duration}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">{s.bookings}</span> bookings this quarter
                    </p>
                  </CardContent>
                  <CardFooter className="gap-2">
                    <Button variant="outline" size="sm" className="flex-1">Edit</Button>
                    <Button size="sm" className="flex-1">
                      <Plus className="mr-1 h-3.5 w-3.5" /> Book
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}

          {section === "clients" && (
            <Card className="overflow-hidden">
              <CardHeader className="border-b">
                <CardTitle className="text-base">Clients</CardTitle>
                <CardDescription>{CLIENTS.length} active clients</CardDescription>
              </CardHeader>
              <CardContent className="divide-y p-0">
                {CLIENTS.map((c) => (
                  <button key={c.name} type="button" className="flex w-full items-center gap-4 px-4 py-3.5 text-left transition-colors hover:bg-muted/40 sm:px-5">
                    <Avatar className="h-9 w-9 shrink-0">
                      <AvatarFallback className="text-xs">{c.init}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{c.name}</p>
                      <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
                        <User className="h-3 w-3" /> {c.visits} visits · last {c.last}
                      </p>
                    </div>
                    <Badge
                      variant={c.tier === "VIP" ? "default" : c.tier === "New" ? "secondary" : "outline"}
                      className="text-[10px]"
                    >
                      {c.tier}
                    </Badge>
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                  </button>
                ))}
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  )
}
