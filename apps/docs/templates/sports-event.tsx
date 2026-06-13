"use client"

import * as React from "react"
import {
  MapPin,
  CalendarDays,
  Trophy,
  Timer,
  Users,
  Flag,
  Mountain,
  Droplets,
  Music,
  HeartPulse,
  ChevronRight,
  Medal,
  ArrowRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/registry/ui/accordion"

const COUNTDOWN = [
  { label: "Days", value: "42" },
  { label: "Hours", value: "11" },
  { label: "Minutes", value: "27" },
  { label: "Runners", value: "8,400" },
]

type DistanceKey = "5k" | "10k" | "half" | "full"

const DISTANCES: Record<
  DistanceKey,
  {
    name: string
    distance: string
    price: string
    startTime: string
    cutoff: string
    elevation: string
    blurb: string
    perks: string[]
  }
> = {
  "5k": {
    name: "Harbor 5K",
    distance: "5 km",
    price: "$35",
    startTime: "9:30 AM",
    cutoff: "1h 15m",
    elevation: "Flat",
    blurb: "A fast, family-friendly loop along the waterfront promenade. Perfect for first-timers and pram-pushers.",
    perks: ["Finisher ribbon", "Chip timing", "Post-race snack"],
  },
  "10k": {
    name: "City 10K",
    distance: "10 km",
    price: "$55",
    startTime: "8:45 AM",
    cutoff: "2h 00m",
    elevation: "Rolling",
    blurb: "A scenic out-and-back through the old town squares with two cheer zones and live music at the turnaround.",
    perks: ["Finisher medal", "Chip timing", "Tech tee", "Free finish photo"],
  },
  half: {
    name: "Coastline Half",
    distance: "21.1 km",
    price: "$85",
    startTime: "7:30 AM",
    cutoff: "3h 30m",
    elevation: "Moderate",
    blurb: "The signature half-marathon hugging the cliff road with ocean views the whole way and four aid stations.",
    perks: [
      "Enamel medal",
      "Chip timing",
      "Tech tee",
      "Free finish photo",
      "Gel station",
    ],
  },
  full: {
    name: "Summit Marathon",
    distance: "42.2 km",
    price: "$120",
    startTime: "6:45 AM",
    cutoff: "6h 00m",
    elevation: "Challenging",
    blurb: "The full 42.2 km loop linking coast to summit and back. A certified course with pacers for every target time.",
    perks: [
      "Premium medal",
      "Chip timing",
      "Tech tee",
      "Free finish photo",
      "Gel + salt stations",
      "Pacers 3:00–5:30",
    ],
  },
}

const SCHEDULE = [
  { day: "Fri", title: "Expo & Bib Pickup", time: "12:00 – 8:00 PM", place: "Harbor Pavilion" },
  { day: "Sat", title: "Shakeout Run & Clinic", time: "8:00 – 10:00 AM", place: "Pier Plaza" },
  { day: "Sat", title: "Pasta Party", time: "6:00 – 9:00 PM", place: "Grand Hall" },
  { day: "Sun", title: "Race Day Start Waves", time: "6:45 – 9:30 AM", place: "Main Start Arch" },
  { day: "Sun", title: "Awards Ceremony", time: "11:30 AM", place: "Finish Festival" },
]

const HIGHLIGHTS = [
  { icon: Mountain, title: "Cliffside Miles", desc: "Run the famous coastal road with uninterrupted ocean panoramas." },
  { icon: Droplets, title: "Aid Every 5K", desc: "Water, electrolytes, and energy gels at fully stocked stations." },
  { icon: Music, title: "Cheer Zones", desc: "Live bands and drum lines keep the energy high on every climb." },
  { icon: HeartPulse, title: "Medical Support", desc: "Roaming medics, bike sweepers, and physio tents at the finish." },
]

const SPONSORS = ["Pacelab", "Strideway", "Hydra+", "Northpeak", "Coastline Bank", "GridFuel"]

const FAQS = [
  {
    q: "Can I switch distances after registering?",
    a: "Yes. You can change your distance up to 14 days before race day through your runner dashboard, subject to availability and any price difference.",
  },
  {
    q: "Is there a bag drop on race day?",
    a: "A free, staffed bag drop opens at the start arch two hours before the first wave and reopens at the finish festival.",
  },
  {
    q: "What are the time cut-offs?",
    a: "Each distance has its own cut-off based on a generous pace. Course support, including aid stations and timing mats, stays open until the marathon cut-off of six hours.",
  },
  {
    q: "Are there refunds or deferrals?",
    a: "Entries are non-refundable, but you may defer to next year or transfer your bib to another runner up to one week before the event.",
  },
]

export default function SportsEventPage() {
  const [distance, setDistance] = React.useState<DistanceKey>("half")
  const active = DISTANCES[distance]

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Flag className="size-4" />
            </span>
            <span className="text-lg">Coastline Marathon</span>
          </a>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#distances" className="transition-colors hover:text-foreground">Distances</a>
            <a href="#schedule" className="transition-colors hover:text-foreground">Schedule</a>
            <a href="#course" className="transition-colors hover:text-foreground">Course</a>
            <a href="#faq" className="transition-colors hover:text-foreground">FAQ</a>
          </nav>
          <Button size="sm" asChild>
            <a href="#register">Register</a>
          </Button>
        </div>
      </header>

      <main id="top" className="flex flex-1 flex-col">
        {/* Hero */}
        <section className="relative overflow-hidden border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
            <div className="flex flex-col items-start gap-6">
              <Badge variant="secondary" className="gap-1.5">
                <Trophy className="size-3.5" /> 12th Annual Edition
              </Badge>
              <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
                Run the coast. Chase the summit.
              </h1>
              <p className="max-w-xl text-lg text-muted-foreground">
                Four distances, one unforgettable course. Join thousands of runners on the most scenic road race of the year.
              </p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium">
                <span className="flex items-center gap-2">
                  <CalendarDays className="size-4 text-primary" /> Sunday, October 18
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="size-4 text-primary" /> Harbor Bay, Pacifica
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" asChild>
                  <a href="#register">
                    Secure your spot <ArrowRight className="size-4" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#course">Explore the course</a>
                </Button>
              </div>
            </div>

            <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-4">
              {COUNTDOWN.map((c) => (
                <div key={c.label} className="bg-card p-5 text-center">
                  <div className="text-3xl font-bold tabular-nums sm:text-4xl">{c.value}</div>
                  <div className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
                    {c.label}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Registration closes when the gun goes off or the field fills, whichever comes first.
            </p>
          </div>
        </section>

        {/* Distance selector */}
        <section id="distances" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="mb-8 flex flex-col gap-2 text-center">
            <h2 className="text-3xl font-bold tracking-tight">Pick your distance</h2>
            <p className="text-muted-foreground">
              From a breezy 5K to the full marathon — find the challenge that fits.
            </p>
          </div>

          <Tabs value={distance} onValueChange={(v) => setDistance(v as DistanceKey)}>
            <TabsList className="mx-auto grid w-full max-w-md grid-cols-4">
              <TabsTrigger value="5k">5K</TabsTrigger>
              <TabsTrigger value="10k">10K</TabsTrigger>
              <TabsTrigger value="half">Half</TabsTrigger>
              <TabsTrigger value="full">Full</TabsTrigger>
            </TabsList>
          </Tabs>

          <Card className="mt-8 overflow-hidden">
            <CardContent className="grid gap-8 p-6 sm:p-8 md:grid-cols-[1.4fr_1fr]">
              <div className="flex flex-col gap-5">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-2xl font-bold tracking-tight">{active.name}</h3>
                    <Badge variant="outline">{active.distance}</Badge>
                  </div>
                  <p className="mt-2 max-w-xl text-muted-foreground">{active.blurb}</p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-lg border bg-muted/30 p-3">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Timer className="size-3.5" /> Start
                    </div>
                    <div className="mt-1 font-semibold tabular-nums">{active.startTime}</div>
                  </div>
                  <div className="rounded-lg border bg-muted/30 p-3">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Flag className="size-3.5" /> Cut-off
                    </div>
                    <div className="mt-1 font-semibold tabular-nums">{active.cutoff}</div>
                  </div>
                  <div className="rounded-lg border bg-muted/30 p-3">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Mountain className="size-3.5" /> Terrain
                    </div>
                    <div className="mt-1 font-semibold">{active.elevation}</div>
                  </div>
                </div>

                <div>
                  <div className="mb-2 text-sm font-medium">What's included</div>
                  <div className="flex flex-wrap gap-2">
                    {active.perks.map((perk) => (
                      <Badge key={perk} variant="secondary" className="gap-1.5 font-normal">
                        <Medal className="size-3.5" /> {perk}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between gap-6 rounded-xl border bg-primary/10 p-6">
                <div>
                  <div className="text-sm text-muted-foreground">Entry fee</div>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-4xl font-bold tabular-nums text-primary">
                      {active.price}
                    </span>
                    <span className="text-sm text-muted-foreground">/ runner</span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Includes timing chip, finisher medal, and entry to the finish festival.
                  </p>
                </div>
                <Button size="lg" className="w-full" asChild>
                  <a href="#register">
                    Register for {active.name} <ChevronRight className="size-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Schedule */}
        <section id="schedule" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <div className="mb-8 flex items-center gap-3">
              <h2 className="text-3xl font-bold tracking-tight">Race weekend schedule</h2>
            </div>
            <ol className="flex flex-col gap-3">
              {SCHEDULE.map((item, i) => (
                <li
                  key={i}
                  className="flex flex-col gap-3 rounded-xl border bg-card p-4 sm:flex-row sm:items-center sm:gap-6"
                >
                  <div className="flex size-12 shrink-0 flex-col items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <span className="text-xs font-medium uppercase">{item.day}</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{item.title}</div>
                    <div className="text-sm text-muted-foreground">{item.place}</div>
                  </div>
                  <div className="text-sm font-medium tabular-nums text-muted-foreground">
                    {item.time}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Course highlights */}
        <section id="course" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="mb-8 flex flex-col gap-2 text-center">
            <h2 className="text-3xl font-bold tracking-tight">On-course highlights</h2>
            <p className="text-muted-foreground">
              Every kilometer is supported, scenic, and stacked with good vibes.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {HIGHLIGHTS.map((h) => (
              <Card key={h.title} className="h-full">
                <CardContent className="flex flex-col gap-3 p-6">
                  <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <h.icon className="size-5" />
                  </span>
                  <h3 className="font-semibold">{h.title}</h3>
                  <p className="text-sm text-muted-foreground">{h.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Sponsors */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
            <div className="mb-6 flex items-center justify-center gap-2 text-sm font-medium uppercase tracking-wide text-muted-foreground">
              <Users className="size-4" /> Powered by our partners
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
              {SPONSORS.map((s) => (
                <span key={s} className="text-xl font-bold tracking-tight text-muted-foreground">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="mb-8 text-center text-3xl font-bold tracking-tight">
            Frequently asked questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Register CTA */}
        <section id="register" className="border-t bg-primary/10">
          <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div className="flex flex-col gap-4">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Lock in your bib for the {active.name}
                </h2>
                <p className="text-muted-foreground">
                  Spots are filling fast across all distances. Reserve yours now at{" "}
                  <span className="font-semibold text-primary">{active.price}</span> and we'll send
                  your training plan straight to your inbox.
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Timer className="size-4 text-primary" /> Chip timed
                  </span>
                  <Separator orientation="vertical" className="h-4" />
                  <span className="flex items-center gap-1.5">
                    <Medal className="size-4 text-primary" /> Finisher medal
                  </span>
                </div>
              </div>

              <Card>
                <CardContent className="flex flex-col gap-4 p-6">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full name</Label>
                    <Input id="name" placeholder="Jordan Rivera" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="you@example.com" />
                  </div>
                  <div className="rounded-lg border bg-muted/30 p-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Selected distance</span>
                      <span className="font-semibold">{active.name}</span>
                    </div>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-muted-foreground">Total due</span>
                      <span className="font-semibold tabular-nums text-primary">{active.price}</span>
                    </div>
                  </div>
                  <Button size="lg" className="w-full">
                    Complete registration <ArrowRight className="size-4" />
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    Secure checkout. Transfers and deferrals available.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-background">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <div className="flex items-center gap-2 font-semibold text-foreground">
            <span className="flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Flag className="size-3.5" />
            </span>
            Coastline Marathon
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href="#distances" className="transition-colors hover:text-foreground">Distances</a>
            <a href="#schedule" className="transition-colors hover:text-foreground">Schedule</a>
            <a href="#faq" className="transition-colors hover:text-foreground">FAQ</a>
            <span>© 2026 Coastline Marathon</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
