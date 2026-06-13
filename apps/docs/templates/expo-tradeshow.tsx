"use client"

import * as React from "react"
import {
  Building2,
  CalendarDays,
  MapPin,
  Users,
  Mic2,
  Ticket,
  ArrowRight,
  Clock,
  LayoutGrid,
  Sparkles,
  Wifi,
  Coffee,
  Check,
  ChevronRight,
  Menu,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const NAV = [
  { label: "Program", href: "#program" },
  { label: "Exhibitors", href: "#exhibitors" },
  { label: "Floor Plan", href: "#floor" },
  { label: "Passes", href: "#passes" },
]

const STATS = [
  { value: "320+", label: "Exhibitors", icon: Building2 },
  { value: "14k", label: "Visitors", icon: Users },
  { value: "85", label: "Speakers", icon: Mic2 },
  { value: "3", label: "Show days", icon: CalendarDays },
]

const DAYS = [
  {
    id: "day1",
    label: "Day 1",
    date: "Tue, Oct 14",
    theme: "Opening & Innovation",
    sessions: [
      { time: "09:00", title: "Doors Open & Registration", room: "Main Concourse", track: "All Access", lead: "Expo Team" },
      { time: "10:30", title: "Opening Keynote: The Next Industrial Decade", room: "Keynote Hall A", track: "Keynote", lead: "Dr. Elena Marsh" },
      { time: "13:00", title: "Robotics on the Floor — Live Demos", room: "Demo Arena", track: "Hardware", lead: "Atlas Dynamics" },
      { time: "15:30", title: "Startup Pitch Showcase", room: "Stage B", track: "Startups", lead: "Founders Circle" },
    ],
  },
  {
    id: "day2",
    label: "Day 2",
    date: "Wed, Oct 15",
    theme: "Deep Dives & Networking",
    sessions: [
      { time: "09:30", title: "Supply Chain Resilience Panel", room: "Keynote Hall A", track: "Panel", lead: "Logistics Guild" },
      { time: "11:00", title: "Hands-on Lab: Smart Manufacturing", room: "Lab 2", track: "Workshop", lead: "FactoryOS" },
      { time: "14:00", title: "Sustainability in Trade Fairs", room: "Stage B", track: "Keynote", lead: "Mara Lindqvist" },
      { time: "17:00", title: "Exhibitor Networking Mixer", room: "Sky Lounge", track: "Social", lead: "Expo Team" },
    ],
  },
  {
    id: "day3",
    label: "Day 3",
    date: "Thu, Oct 16",
    theme: "Future & Closing",
    sessions: [
      { time: "10:00", title: "AI on the Expo Floor", room: "Keynote Hall A", track: "Keynote", lead: "Prof. Idris Kang" },
      { time: "12:30", title: "Buyer–Seller Speed Meetings", room: "Match Lounge", track: "Networking", lead: "Trade Desk" },
      { time: "15:00", title: "Awards & Best-of-Show", room: "Keynote Hall A", track: "Ceremony", lead: "Expo Board" },
      { time: "16:30", title: "Closing Remarks & After Party", room: "Sky Lounge", track: "Social", lead: "Expo Team" },
    ],
  },
]

const EXHIBITORS = [
  "Atlas Dynamics", "FactoryOS", "NovaGrid", "Helix Robotics", "PolyForge",
  "VoltWorks", "Cobalt Labs", "Meridian", "Strata Systems", "Pulse IoT",
  "Quanta Mfg", "Verdant Energy",
]

const HIGHLIGHTS = [
  { title: "Innovation Pavilion", desc: "Two halls of cutting-edge hardware, live demos, and prototype reveals.", icon: Sparkles, span: true },
  { title: "Demo Arena", desc: "Hourly stage demos from leading exhibitors.", icon: LayoutGrid, span: false },
  { title: "Match Lounge", desc: "Pre-booked buyer-seller meetings.", icon: Users, span: false },
  { title: "Free Show Wi-Fi", desc: "Fast connectivity across all halls and lounges.", icon: Wifi, span: false },
  { title: "Hospitality Court", desc: "Curated food, coffee bars, and quiet zones.", icon: Coffee, span: false },
]

const PASSES = [
  {
    name: "Visitor",
    price: "Free",
    note: "Pre-register online",
    perks: ["All 3 expo days", "Exhibitor floor access", "Demo Arena sessions", "Show app & map"],
    cta: "Get visitor pass",
    featured: false,
  },
  {
    name: "Professional",
    price: "$149",
    note: "per attendee",
    perks: ["Everything in Visitor", "All keynotes & panels", "Workshop labs", "Networking mixer", "Match Lounge access"],
    cta: "Buy pro pass",
    featured: true,
  },
  {
    name: "Exhibitor",
    price: "From $2,400",
    note: "per booth",
    perks: ["Booth space & listing", "4 staff passes", "Lead-scan tool", "Logo on show map", "Sponsor add-ons"],
    cta: "Book a booth",
    featured: false,
  },
]

const SPONSORS = ["NovaGrid", "VoltWorks", "Meridian", "Strata Systems", "Quanta Mfg", "Verdant Energy"]

export default function ExpoTradeshowPage() {
  const [activeDay, setActiveDay] = React.useState(DAYS[0].id)
  const current = DAYS.find((d) => d.id === activeDay) ?? DAYS[0]

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Building2 className="h-4 w-4" />
            </span>
            <span>EXPO<span className="text-primary">'26</span></span>
          </a>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex" aria-label="Primary">
            {NAV.map((n) => (
              <a key={n.label} href={n.href} className="transition-colors hover:text-foreground">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Exhibit</Button>
            <Button size="sm">
              <Ticket className="h-4 w-4" />
              Get pass
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 -z-10 bg-primary/10" aria-hidden="true" />
          <div className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-primary/20 blur-3xl" aria-hidden="true" />
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:py-24">
            <div className="flex flex-col justify-center">
              <Badge variant="secondary" className="mb-5 w-fit gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                The Global Industry Showcase
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Where the industry
                <span className="block text-primary">meets, builds & deals.</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg text-muted-foreground">
                Three days of exhibitors, live demos, and high-value networking. Join 14,000 buyers, makers, and innovators on the floor.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm">
                <span className="inline-flex items-center gap-2 font-medium">
                  <CalendarDays className="h-4 w-4 text-primary" />
                  Oct 14–16, 2026
                </span>
                <span className="inline-flex items-center gap-2 font-medium">
                  <MapPin className="h-4 w-4 text-primary" />
                  Metro Convention Center, Hall A–D
                </span>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button size="lg">
                  <Ticket className="h-4 w-4" />
                  Get visitor pass
                </Button>
                <Button size="lg" variant="outline">
                  Become an exhibitor
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center">
              <Card className="w-full border-primary/30 shadow-sm">
                <CardHeader>
                  <CardDescription>Countdown to opening</CardDescription>
                  <CardTitle className="text-2xl">Doors open 09:00</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-3 gap-3">
                  {[
                    { v: "42", l: "Days" },
                    { v: "08", l: "Hours" },
                    { v: "15", l: "Mins" },
                  ].map((c) => (
                    <div key={c.l} className="rounded-lg bg-muted/40 p-4 text-center">
                      <div className="text-3xl font-bold tabular-nums">{c.v}</div>
                      <div className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">{c.l}</div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="text-sm text-muted-foreground">
                  <Clock className="mr-2 h-4 w-4" />
                  Early-bird pro passes end Sep 1
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats band */}
        <section className="border-b bg-primary text-primary-foreground">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-px px-4 py-10 sm:px-6 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-2 text-center">
                <s.icon className="h-6 w-6 opacity-80" />
                <div className="text-3xl font-bold tabular-nums sm:text-4xl">{s.value}</div>
                <div className="text-sm opacity-80">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Program with day tabs */}
        <section id="program" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Day-by-day program</h2>
              <p className="mt-2 text-muted-foreground">Switch days to explore keynotes, labs, and floor sessions.</p>
            </div>
            <div className="inline-flex rounded-lg border bg-muted/30 p-1">
              {DAYS.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setActiveDay(d.id)}
                  className={cn(
                    "rounded-md px-4 py-2 text-sm font-medium transition-colors",
                    activeDay === d.id
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6 flex flex-wrap items-center gap-3 rounded-lg bg-muted/40 px-4 py-3">
            <Badge>{current.date}</Badge>
            <span className="text-sm font-medium">{current.theme}</span>
            <span className="ml-auto text-sm text-muted-foreground">{current.sessions.length} sessions</span>
          </div>

          <div className="grid gap-3">
            {current.sessions.map((s) => (
              <Card key={s.title} className="transition-colors hover:border-primary/40">
                <CardContent className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center">
                  <div className="flex w-24 shrink-0 items-center gap-2 font-semibold tabular-nums">
                    <Clock className="h-4 w-4 text-primary" />
                    {s.time}
                  </div>
                  <Separator orientation="vertical" className="hidden h-10 sm:block" />
                  <div className="min-w-0 flex-1">
                    <div className="font-medium">{s.title}</div>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {s.room}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Mic2 className="h-3.5 w-3.5" />
                        {s.lead}
                      </span>
                    </div>
                  </div>
                  <Badge variant="outline" className="w-fit shrink-0">{s.track}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Exhibitors grid */}
        <section id="exhibitors" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold tracking-tight">320+ exhibitors on the floor</h2>
              <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
                A snapshot of the makers, suppliers, and platforms you'll meet across Halls A–D.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {EXHIBITORS.map((name) => (
                <div
                  key={name}
                  className="flex h-20 items-center justify-center rounded-lg border bg-card px-4 text-center text-sm font-semibold text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                >
                  {name}
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <Button variant="outline">
                View full exhibitor list
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Floor plan / highlights */}
        <section id="floor" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight">Floor plan & highlights</h2>
            <p className="mt-2 text-muted-foreground">Four connected halls with dedicated zones for demos, deals, and downtime.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {HIGHLIGHTS.map((h) => (
              <Card key={h.title} className={cn(h.span && "md:col-span-1 md:row-span-2", h.span && "bg-primary/5 border-primary/30")}>
                <CardHeader>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <h.icon className="h-5 w-5" />
                  </div>
                  <CardTitle>{h.title}</CardTitle>
                  <CardDescription>{h.desc}</CardDescription>
                </CardHeader>
                {h.span && (
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2 text-center text-xs font-medium">
                      {["Hall A", "Hall B", "Hall C", "Hall D"].map((hall) => (
                        <div key={hall} className="rounded-md border border-primary/20 bg-background/60 py-4">
                          {hall}
                        </div>
                      ))}
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">
                      Interactive map available in the show app at check-in.
                    </p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* Passes */}
        <section id="passes" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold tracking-tight">Choose your pass</h2>
              <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
                From free visitor access to full exhibitor booths — there's a way in for everyone.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {PASSES.map((p) => (
                <Card
                  key={p.name}
                  className={cn(
                    "flex flex-col",
                    p.featured && "border-primary shadow-md ring-1 ring-primary"
                  )}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{p.name}</CardTitle>
                      {p.featured && <Badge>Most popular</Badge>}
                    </div>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-4xl font-bold">{p.price}</span>
                      <span className="text-sm text-muted-foreground">{p.note}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-3 text-sm">
                      {p.perks.map((perk) => (
                        <li key={perk} className="flex items-start gap-2">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <span>{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant={p.featured ? "default" : "outline"}>
                      {p.cta}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Sponsors */}
        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <p className="mb-8 text-center text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Presented with our partners
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {SPONSORS.map((s) => (
              <span key={s} className="text-lg font-semibold text-muted-foreground/80">{s}</span>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t bg-primary text-primary-foreground">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6">
            <h2 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
              Reserve your spot at the industry's biggest show
            </h2>
            <p className="max-w-xl opacity-90">
              Passes are limited per hall. Register today and get the show app with your personalized agenda.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button size="lg" variant="secondary">
                <Ticket className="h-4 w-4" />
                Get your pass
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
                Talk to the team
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-background">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 font-semibold">
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <Building2 className="h-4 w-4" />
                </span>
                EXPO'26
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                The global industry showcase. Oct 14–16, 2026, Metro Convention Center.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Attend</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li><a href="#passes" className="hover:text-foreground">Get a pass</a></li>
                <li><a href="#program" className="hover:text-foreground">Program</a></li>
                <li><a href="#floor" className="hover:text-foreground">Floor plan</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Exhibit</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Book a booth</a></li>
                <li><a href="#" className="hover:text-foreground">Sponsorship</a></li>
                <li><a href="#exhibitors" className="hover:text-foreground">Exhibitor list</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Visit</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Metro Convention Center</li>
                <li className="flex items-center gap-2"><CalendarDays className="h-4 w-4" /> Oct 14–16, 2026</li>
              </ul>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
            <p>© 2026 EXPO. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-foreground">Privacy</a>
              <a href="#" className="hover:text-foreground">Terms</a>
              <a href="#" className="hover:text-foreground">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
