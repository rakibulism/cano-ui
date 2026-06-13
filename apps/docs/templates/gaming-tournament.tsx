"use client"
import * as React from "react"
import {
  Trophy,
  Calendar,
  Users,
  Eye,
  Zap,
  Gamepad2,
  Twitch,
  Youtube,
  Ticket,
  Radio,
  Crown,
  Swords,
  ChevronRight,
  Flame,
  Star,
  ArrowRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

const STATS = [
  { label: "Teams Competing", value: "32", icon: Users },
  { label: "Total Prize Pool", value: "$1.2M", icon: Trophy },
  { label: "Peak Viewers", value: "4.8M", icon: Eye },
  { label: "Match Days", value: "9", icon: Calendar },
]

type Match = {
  id: string
  teamA: string
  scoreA: number | null
  teamB: string
  scoreB: number | null
  time: string
  status: "live" | "upcoming" | "done"
}

const STAGES: Record<string, Match[]> = {
  "Group Stage": [
    { id: "g1", teamA: "Nova Surge", scoreA: 2, teamB: "Iron Wolves", scoreB: 0, time: "Completed", status: "done" },
    { id: "g2", teamA: "Phantom Echo", scoreA: 1, teamB: "Crimson Vipers", scoreB: 2, time: "Completed", status: "done" },
    { id: "g3", teamA: "Apex Titans", scoreA: 1, teamB: "Solar Drift", scoreB: 1, time: "LIVE", status: "live" },
    { id: "g4", teamA: "Void Reapers", scoreA: null, teamB: "Neon Pulse", scoreB: null, time: "21:00 CET", status: "upcoming" },
  ],
  Quarterfinals: [
    { id: "q1", teamA: "Nova Surge", scoreA: 3, teamB: "Crimson Vipers", scoreB: 1, time: "Completed", status: "done" },
    { id: "q2", teamA: "Apex Titans", scoreA: 2, teamB: "Phantom Echo", scoreB: 3, time: "LIVE", status: "live" },
    { id: "q3", teamA: "Void Reapers", scoreA: null, teamB: "Solar Drift", scoreB: null, time: "19:30 CET", status: "upcoming" },
    { id: "q4", teamA: "Neon Pulse", scoreA: null, teamB: "Iron Wolves", scoreB: null, time: "22:00 CET", status: "upcoming" },
  ],
  Semifinals: [
    { id: "s1", teamA: "Nova Surge", scoreA: null, teamB: "Phantom Echo", scoreB: null, time: "Sat 18:00 CET", status: "upcoming" },
    { id: "s2", teamA: "Void Reapers", scoreA: null, teamB: "Neon Pulse", scoreB: null, time: "Sat 21:00 CET", status: "upcoming" },
  ],
  "Grand Final": [
    { id: "f1", teamA: "TBD", scoreA: null, teamB: "TBD", scoreB: null, time: "Sun 20:00 CET", status: "upcoming" },
  ],
}

const SCHEDULE = [
  { day: "Day 1", date: "Jul 12", title: "Group Stage Opens", note: "Groups A & B kickoff", live: false },
  { day: "Day 4", date: "Jul 15", title: "Quarterfinals", note: "Single elimination bracket", live: true },
  { day: "Day 7", date: "Jul 18", title: "Semifinals", note: "Best of 5 showdown", live: false },
  { day: "Day 9", date: "Jul 20", title: "Grand Final", note: "Lifting of the trophy", live: false },
]

const SPONSORS = ["HyperCore", "VoltGear", "PixelForge", "RiftEnergy", "ByteHaus", "NexusChips"]

const TIERS = [
  {
    name: "Stream Pass",
    price: "Free",
    icon: Radio,
    highlight: false,
    perks: ["All matches in 1080p", "Live English casting", "Community chat access"],
    cta: "Watch Free",
  },
  {
    name: "Arena Ticket",
    price: "$89",
    icon: Ticket,
    highlight: true,
    perks: ["Stadium seat, 3 days", "Backstage team meet", "Exclusive merch drop", "4K multi-cam stream"],
    cta: "Get Tickets",
  },
  {
    name: "VIP Front Row",
    price: "$249",
    icon: Crown,
    highlight: false,
    perks: ["Front-row seating", "Player signing session", "Lounge + open bar", "Limited signed jersey"],
    cta: "Go VIP",
  },
]

function statusBadge(status: Match["status"]) {
  if (status === "live") {
    return (
      <Badge className="gap-1 bg-primary text-primary-foreground">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary-foreground" />
        LIVE
      </Badge>
    )
  }
  if (status === "done") return <Badge variant="outline">Final</Badge>
  return <Badge variant="secondary">Upcoming</Badge>
}

export default function GamingTournamentPage() {
  const stageNames = Object.keys(STAGES)
  const [stage, setStage] = React.useState(stageNames[0])

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Gamepad2 className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold tracking-tight">RIFT MASTERS</span>
            <Badge variant="outline" className="ml-1 hidden sm:inline-flex">2026</Badge>
          </div>
          <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
            <a href="#brackets" className="transition-colors hover:text-foreground">Brackets</a>
            <a href="#schedule" className="transition-colors hover:text-foreground">Schedule</a>
            <a href="#tickets" className="transition-colors hover:text-foreground">Tickets</a>
            <a href="#sponsors" className="transition-colors hover:text-foreground">Partners</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              <Radio className="mr-1 h-4 w-4" /> Watch
            </Button>
            <Button size="sm">Register</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* HERO */}
        <section className="relative overflow-hidden border-b bg-card">
          <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
            <div className="flex flex-col justify-center">
              <Badge variant="outline" className="mb-5 w-fit gap-1 border-primary text-primary">
                <Flame className="h-3.5 w-3.5" /> Global Championship Series
              </Badge>
              <h1 className="text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl">
                RIFT MASTERS
                <span className="block text-primary">WORLD FINALS</span>
              </h1>
              <p className="mt-5 max-w-md text-base text-muted-foreground sm:text-lg">
                32 elite squads. One arena. Nine days of pure adrenaline as the
                best teams on the planet clash for glory and a record prize pool.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-6">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Prize Pool</p>
                  <p className="text-3xl font-black text-primary">$1,200,000</p>
                </div>
                <Separator orientation="vertical" className="hidden h-12 sm:block" />
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Live Dates</p>
                  <p className="text-3xl font-black">Jul 12 – 20</p>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button size="lg" className="gap-2">
                  Register Your Team <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  <Radio className="h-4 w-4" /> Watch Live
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <Card className="w-full max-w-sm border-primary/40 bg-background/60 backdrop-blur">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm font-semibold">
                      <Swords className="h-4 w-4 text-primary" /> Featured Match
                    </span>
                    {statusBadge("live")}
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg bg-muted/30 p-4">
                      <span className="font-bold">Apex Titans</span>
                      <span className="text-2xl font-black">1</span>
                    </div>
                    <div className="text-center text-xs uppercase tracking-widest text-muted-foreground">versus</div>
                    <div className="flex items-center justify-between rounded-lg bg-primary/10 p-4">
                      <span className="font-bold text-primary">Solar Drift</span>
                      <span className="text-2xl font-black text-primary">1</span>
                    </div>
                  </div>
                  <Button variant="secondary" className="mt-5 w-full gap-2">
                    <Eye className="h-4 w-4" /> Jump into stream
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* STATS BAND */}
        <section className="border-b bg-primary/5">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-px px-4 sm:px-6 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1 py-8 text-center">
                <s.icon className="mb-1 h-5 w-5 text-primary" />
                <span className="text-3xl font-black tracking-tight">{s.value}</span>
                <span className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* BRACKETS */}
        <section id="brackets" className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <Badge variant="secondary" className="mb-3 gap-1">
                <Trophy className="h-3.5 w-3.5" /> Live Brackets
              </Badge>
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">The Road to the Trophy</h2>
              <p className="mt-2 max-w-xl text-muted-foreground">
                Follow every matchup as 32 teams fight through the bracket. Pick a stage to see the action.
              </p>
            </div>
          </div>

          <Tabs value={stage} onValueChange={setStage}>
            <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1">
              {stageNames.map((name) => (
                <TabsTrigger key={name} value={name} className="gap-1.5">
                  {name === "Grand Final" && <Crown className="h-3.5 w-3.5" />}
                  {name}
                </TabsTrigger>
              ))}
            </TabsList>

            {stageNames.map((name) => (
              <TabsContent key={name} value={name} className="mt-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  {STAGES[name].map((m) => (
                    <Card
                      key={m.id}
                      className={cn(
                        "overflow-hidden transition-colors",
                        m.status === "live" && "border-primary",
                      )}
                    >
                      <CardContent className="p-5">
                        <div className="mb-4 flex items-center justify-between">
                          {statusBadge(m.status)}
                          <span className="text-xs text-muted-foreground">{m.time}</span>
                        </div>
                        <TeamRow
                          name={m.teamA}
                          score={m.scoreA}
                          winner={m.scoreA !== null && m.scoreB !== null && m.scoreA > m.scoreB}
                        />
                        <Separator className="my-3" />
                        <TeamRow
                          name={m.teamB}
                          score={m.scoreB}
                          winner={m.scoreA !== null && m.scoreB !== null && m.scoreB > m.scoreA}
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </section>

        {/* SCHEDULE */}
        <section id="schedule" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6">
            <div className="mb-10 text-center">
              <Badge variant="secondary" className="mb-3 gap-1">
                <Calendar className="h-3.5 w-3.5" /> Event Schedule
              </Badge>
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Nine Days of Mayhem</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-4">
              {SCHEDULE.map((e) => (
                <Card key={e.day} className={cn("relative", e.live && "border-primary")}>
                  <CardContent className="p-5">
                    {e.live && (
                      <Badge className="absolute right-4 top-4 gap-1 bg-primary text-primary-foreground">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary-foreground" /> LIVE
                      </Badge>
                    )}
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary">{e.day}</p>
                    <p className="mt-1 text-2xl font-black">{e.date}</p>
                    <p className="mt-3 font-semibold">{e.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{e.note}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* TICKETS / STREAM TIERS */}
        <section id="tickets" className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6">
          <div className="mb-10 text-center">
            <Badge variant="secondary" className="mb-3 gap-1">
              <Ticket className="h-3.5 w-3.5" /> Get In On The Action
            </Badge>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Tickets & Stream Passes</h2>
            <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
              Whether you are courtside or on the couch, there is a way to experience the finals.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {TIERS.map((t) => (
              <Card
                key={t.name}
                className={cn(
                  "relative flex flex-col",
                  t.highlight && "border-primary shadow-lg",
                )}
              >
                {t.highlight && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 gap-1 bg-primary text-primary-foreground">
                    <Star className="h-3 w-3" /> Most Popular
                  </Badge>
                )}
                <CardContent className="flex flex-1 flex-col p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-md",
                        t.highlight ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary",
                      )}
                    >
                      <t.icon className="h-5 w-5" />
                    </div>
                    <span className="text-lg font-bold">{t.name}</span>
                  </div>
                  <p className="mb-1 text-4xl font-black">{t.price}</p>
                  <p className="mb-5 text-sm text-muted-foreground">per attendee</p>
                  <ul className="mb-6 flex-1 space-y-3 text-sm">
                    {t.perks.map((p) => (
                      <li key={p} className="flex items-start gap-2">
                        <Zap className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full gap-2" variant={t.highlight ? "default" : "outline"}>
                    {t.cta} <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* SPONSORS */}
        <section id="sponsors" className="border-y bg-card">
          <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6">
            <p className="mb-8 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Powered by our partners
            </p>
            <div className="grid grid-cols-2 gap-px sm:grid-cols-3 lg:grid-cols-6">
              {SPONSORS.map((s) => (
                <div
                  key={s}
                  className="flex items-center justify-center gap-2 py-6 text-sm font-bold text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Star className="h-4 w-4 text-primary" />
                  {s}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-primary/5">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative mx-auto w-full max-w-3xl px-4 py-20 text-center sm:px-6">
            <Trophy className="mx-auto mb-5 h-10 w-10 text-primary" />
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Think your squad has what it takes?</h2>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
              Open qualifiers close soon. Lock in your roster and battle your way to the world stage.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button size="lg" className="gap-2">
                Register Your Team <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">View Rulebook</Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-background">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div className="max-w-xs">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <Gamepad2 className="h-4 w-4" />
                </div>
                <span className="font-bold tracking-tight">RIFT MASTERS</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                The premier global esports championship. Compete, watch, and become a legend.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <FooterCol title="Event" links={["Brackets", "Schedule", "Teams", "Results"]} />
              <FooterCol title="Attend" links={["Tickets", "Stream", "Venue", "FAQ"]} />
              <FooterCol title="More" links={["Press", "Careers", "Contact", "Rules"]} />
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
            <p>© 2026 Rift Masters League. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" aria-label="Twitch channel">
                <Twitch className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="YouTube channel">
                <Youtube className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Discord community">
                <Radio className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function TeamRow({
  name,
  score,
  winner,
}: {
  name: string
  score: number | null
  winner: boolean
}) {
  return (
    <div className="flex items-center justify-between">
      <span className={cn("font-semibold", winner && "text-primary")}>{name}</span>
      <span className={cn("text-xl font-black tabular-nums", winner ? "text-primary" : "text-muted-foreground")}>
        {score === null ? "–" : score}
      </span>
    </div>
  )
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <p className="mb-3 text-sm font-semibold">{title}</p>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="transition-colors hover:text-foreground">{l}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
