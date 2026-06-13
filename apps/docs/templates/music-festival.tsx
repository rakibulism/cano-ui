"use client"

import * as React from "react"
import {
  Music,
  MapPin,
  CalendarDays,
  Ticket,
  Clock,
  Menu,
  ArrowRight,
  Star,
  Tent,
  Car,
  Utensils,
  ShieldCheck,
  Instagram,
  Twitter,
  Youtube,
  Check,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

type Artist = { name: string; tag: string; headliner?: boolean; time: string }

const FESTIVAL = {
  name: "Solstice Sound",
  edition: "2026",
  dates: "July 17 – 19, 2026",
  location: "Mirage Valley, Joshua Tree, CA",
}

const LINEUP: Record<string, Artist[]> = {
  Friday: [
    { name: "Aurora Skies", tag: "Synthpop", headliner: true, time: "9:30 PM" },
    { name: "The Velvet Hum", tag: "Indie Rock", time: "8:00 PM" },
    { name: "Nova Drift", tag: "Electronic", time: "6:45 PM" },
    { name: "Marlowe Reed", tag: "Folk", time: "5:30 PM" },
    { name: "Coastlines", tag: "Dream Pop", time: "4:15 PM" },
    { name: "Junior Static", tag: "House", time: "3:00 PM" },
  ],
  Saturday: [
    { name: "Echo & The Tide", tag: "Alt R&B", headliner: true, time: "9:45 PM" },
    { name: "Goldhour", tag: "Funk", time: "8:15 PM" },
    { name: "Paper Cranes", tag: "Indie Pop", time: "7:00 PM" },
    { name: "DJ Selene", tag: "Techno", time: "5:45 PM" },
    { name: "Hollow Pines", tag: "Americana", time: "4:30 PM" },
    { name: "Bright Antenna", tag: "Garage Rock", time: "3:15 PM" },
  ],
  Sunday: [
    { name: "Midnight Cartographers", tag: "Psych Rock", headliner: true, time: "9:00 PM" },
    { name: "Saffron Bloom", tag: "Soul", time: "7:30 PM" },
    { name: "The Low Frequencies", tag: "Bass", time: "6:15 PM" },
    { name: "Wren", tag: "Singer-Songwriter", time: "5:00 PM" },
    { name: "Polaris Youth", tag: "Shoegaze", time: "3:45 PM" },
    { name: "Sunday Service Crew", tag: "Disco", time: "2:30 PM" },
  ],
}

const SCHEDULE = [
  { time: "12:00 PM", title: "Gates Open", stage: "All Entrances", note: "Doors & wristband pickup" },
  { time: "2:30 PM", title: "First sets begin", stage: "Canyon & Oasis Stage", note: "Three stages live" },
  { time: "6:00 PM", title: "Golden Hour Sessions", stage: "Oasis Stage", note: "Acoustic takeovers" },
  { time: "9:00 PM", title: "Headline performance", stage: "Main Stage", note: "Full production show" },
  { time: "11:00 PM", title: "Afterglow", stage: "Desert Dome", note: "Late-night DJ sets" },
]

const TICKETS = [
  {
    name: "General Admission",
    price: "$189",
    period: "3-day pass",
    perks: ["All-stage access", "Re-entry both days", "Festival app & map", "Free water refills"],
    featured: false,
  },
  {
    name: "VIP Experience",
    price: "$429",
    period: "3-day pass",
    perks: ["Front-of-stage viewing", "VIP lounge & shade", "Premium restrooms", "Express entry lanes", "Welcome merch kit"],
    featured: true,
  },
  {
    name: "Camping + GA",
    price: "$299",
    period: "3-day pass",
    perks: ["GA festival access", "On-site tent plot", "Hot showers", "24/7 quiet zone", "Morning coffee bar"],
    featured: false,
  },
]

const VENUE = [
  { icon: Tent, label: "Camping grounds", detail: "Tent & RV plots steps from the stages" },
  { icon: Car, label: "Parking & shuttles", detail: "Free lots with looping shuttle service" },
  { icon: Utensils, label: "Food village", detail: "40+ local vendors and craft bars" },
  { icon: ShieldCheck, label: "Safe & accessible", detail: "Medics, ADA viewing, welfare team on site" },
]

const SPONSORS = ["Lumen", "Northwind", "Cassette Co.", "Halcyon", "Driftwood", "Sunbeam Audio"]

export default function MusicFestivalTemplate() {
  const days = Object.keys(LINEUP)
  const [activeDay, setActiveDay] = React.useState(days[0])

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
        <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
          <a href="#top" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Music className="h-4.5 w-4.5" aria-hidden="true" />
            </span>
            <span className="text-base font-semibold tracking-tight">
              {FESTIVAL.name} <span className="text-muted-foreground">'{FESTIVAL.edition.slice(2)}</span>
            </span>
          </a>
          <div className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
            <a href="#lineup" className="transition-colors hover:text-foreground">Lineup</a>
            <a href="#schedule" className="transition-colors hover:text-foreground">Schedule</a>
            <a href="#tickets" className="transition-colors hover:text-foreground">Tickets</a>
            <a href="#venue" className="transition-colors hover:text-foreground">Venue</a>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <a href="#tickets">
                <Ticket className="h-4 w-4" aria-hidden="true" />
                Get tickets
              </a>
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>
        </nav>
      </header>

      <main id="top" className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/15 via-background to-accent/40" aria-hidden="true" />
          <div className="absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl" aria-hidden="true" />
          <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
            <Badge variant="secondary" className="mb-6 gap-1.5">
              <Star className="h-3.5 w-3.5" aria-hidden="true" />
              3 days · 3 stages · 60+ artists
            </Badge>
            <h1 className="max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              {FESTIVAL.name}
              <span className="block text-primary">Festival {FESTIVAL.edition}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              A weekend of sound under the desert sky. Camp, dance, and catch your favorite
              acts across three open-air stages.
            </p>
            <div className="mt-8 flex flex-col gap-4 text-sm sm:flex-row sm:items-center">
              <span className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 font-medium">
                <CalendarDays className="h-4 w-4 text-primary" aria-hidden="true" />
                {FESTIVAL.dates}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 font-medium">
                <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
                {FESTIVAL.location}
              </span>
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <a href="#tickets">
                  Buy tickets
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#lineup">View full lineup</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Lineup */}
        <section id="lineup" className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">The Lineup</span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Who's playing</h2>
            <p className="mx-auto max-w-lg text-muted-foreground">
              Pick a day to see the full roster. Set times are subject to change.
            </p>
          </div>

          <Tabs value={activeDay} onValueChange={setActiveDay} className="mt-10">
            <TabsList className="mx-auto flex w-full max-w-md">
              {days.map((day) => (
                <TabsTrigger key={day} value={day} className="flex-1">
                  {day}
                </TabsTrigger>
              ))}
            </TabsList>
            {days.map((day) => (
              <TabsContent key={day} value={day} className="mt-8">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {LINEUP[day].map((artist) => (
                    <Card
                      key={artist.name}
                      className={cn(
                        "transition-colors hover:border-primary",
                        artist.headliner && "border-primary bg-primary/5",
                      )}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <CardTitle className="text-xl">{artist.name}</CardTitle>
                            <CardDescription className="mt-1">{artist.tag}</CardDescription>
                          </div>
                          {artist.headliner && <Badge>Headliner</Badge>}
                        </div>
                      </CardHeader>
                      <CardFooter className="text-sm text-muted-foreground">
                        <Clock className="mr-2 h-4 w-4" aria-hidden="true" />
                        {day} · {artist.time}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </section>

        {/* Schedule */}
        <section id="schedule" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-3 text-center">
              <span className="text-sm font-semibold uppercase tracking-widest text-primary">Daily Flow</span>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">A day at the festival</h2>
            </div>
            <ol className="mt-10 space-y-4">
              {SCHEDULE.map((item) => (
                <li
                  key={item.title}
                  className="flex flex-col gap-3 rounded-xl border bg-card p-5 sm:flex-row sm:items-center"
                >
                  <span className="inline-flex w-28 shrink-0 items-center gap-2 text-sm font-semibold text-primary">
                    <Clock className="h-4 w-4" aria-hidden="true" />
                    {item.time}
                  </span>
                  <div className="flex-1">
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.note}</p>
                  </div>
                  <Badge variant="outline" className="w-fit">{item.stage}</Badge>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Tickets */}
        <section id="tickets" className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">Passes</span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Grab your wristband</h2>
            <p className="mx-auto max-w-lg text-muted-foreground">
              Early-bird pricing while supplies last. All passes cover the full three days.
            </p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {TICKETS.map((tier) => (
              <Card
                key={tier.name}
                className={cn(
                  "flex flex-col",
                  tier.featured && "border-primary shadow-lg ring-1 ring-primary/20",
                )}
              >
                <CardHeader>
                  {tier.featured && (
                    <Badge className="mb-3 w-fit">Most popular</Badge>
                  )}
                  <CardTitle className="text-lg">{tier.name}</CardTitle>
                  <div className="mt-2 flex items-baseline gap-1.5">
                    <span className="text-4xl font-bold tracking-tight">{tier.price}</span>
                    <span className="text-sm text-muted-foreground">/ {tier.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3 text-sm">
                    {tier.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2.5">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={tier.featured ? "default" : "outline"}
                  >
                    Choose {tier.name.split(" ")[0]}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Venue */}
        <section id="venue" className="border-y bg-muted/30">
          <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
            <div>
              <span className="text-sm font-semibold uppercase tracking-widest text-primary">The Venue</span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Set in Mirage Valley
              </h2>
              <p className="mt-4 max-w-md text-muted-foreground">
                A natural desert amphitheater an hour from Palm Springs. Camp on-site or
                shuttle in — everything you need is within walking distance of the stages.
              </p>
              <div className="mt-6 flex items-center gap-2 rounded-lg border bg-card px-4 py-3 text-sm">
                <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
                {FESTIVAL.location}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {VENUE.map((item) => (
                <Card key={item.label}>
                  <CardHeader>
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <item.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <CardTitle className="mt-3 text-base">{item.label}</CardTitle>
                    <CardDescription>{item.detail}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Sponsors */}
        <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Powered by our partners
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {SPONSORS.map((name) => (
              <span
                key={name}
                className="text-xl font-semibold tracking-tight text-muted-foreground/70"
              >
                {name}
              </span>
            ))}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="border-t bg-primary/5">
          <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Get drops, set times & ticket alerts
            </h2>
            <p className="max-w-md text-muted-foreground">
              Join the list for lineup announcements and presale codes before anyone else.
            </p>
            <form className="flex w-full max-w-md flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
              <Input type="email" placeholder="you@email.com" aria-label="Email address" className="flex-1" />
              <Button type="submit">Notify me</Button>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t bg-card">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div className="max-w-xs">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Music className="h-4.5 w-4.5" aria-hidden="true" />
                </span>
                <span className="text-base font-semibold tracking-tight">{FESTIVAL.name}</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{FESTIVAL.dates} · {FESTIVAL.location}</p>
              <div className="mt-5 flex items-center gap-2">
                <Button variant="outline" size="icon" aria-label="Instagram">
                  <Instagram className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button variant="outline" size="icon" aria-label="Twitter">
                  <Twitter className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button variant="outline" size="icon" aria-label="YouTube">
                  <Youtube className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
              <div className="flex flex-col gap-3">
                <p className="font-semibold">Festival</p>
                <a href="#lineup" className="text-muted-foreground transition-colors hover:text-foreground">Lineup</a>
                <a href="#schedule" className="text-muted-foreground transition-colors hover:text-foreground">Schedule</a>
                <a href="#venue" className="text-muted-foreground transition-colors hover:text-foreground">Venue</a>
              </div>
              <div className="flex flex-col gap-3">
                <p className="font-semibold">Tickets</p>
                <a href="#tickets" className="text-muted-foreground transition-colors hover:text-foreground">Passes</a>
                <a href="#tickets" className="text-muted-foreground transition-colors hover:text-foreground">Camping</a>
                <a href="#tickets" className="text-muted-foreground transition-colors hover:text-foreground">VIP</a>
              </div>
              <div className="flex flex-col gap-3">
                <p className="font-semibold">Info</p>
                <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">FAQ</a>
                <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">Accessibility</a>
                <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">Contact</a>
              </div>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
            <p>© {FESTIVAL.edition} {FESTIVAL.name} Festival. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="transition-colors hover:text-foreground">Terms</a>
              <a href="#" className="transition-colors hover:text-foreground">Privacy</a>
              <a href="#" className="transition-colors hover:text-foreground">Code of conduct</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
