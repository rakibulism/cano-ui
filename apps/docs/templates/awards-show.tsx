"use client"

import * as React from "react"
import {
  Award,
  Calendar,
  MapPin,
  Clock,
  Star,
  Trophy,
  Ticket,
  Sparkles,
  Crown,
  Film,
  Music,
  Mic,
  Camera,
  Check,
  ArrowRight,
  Menu,
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
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

const COUNTDOWN = [
  { label: "Days", value: "42" },
  { label: "Hours", value: "16" },
  { label: "Minutes", value: "08" },
  { label: "Seconds", value: "23" },
]

type Category = {
  id: string
  label: string
  icon: React.ElementType
  nominees: { name: string; work: string; initials: string; favorite?: boolean }[]
}

const CATEGORIES: Category[] = [
  {
    id: "picture",
    label: "Best Picture",
    icon: Film,
    nominees: [
      { name: "The Long Horizon", work: "Meridian Studios", initials: "LH", favorite: true },
      { name: "Salt & Static", work: "Northwind Pictures", initials: "SS" },
      { name: "A Quiet Voltage", work: "Lumen Films", initials: "QV" },
      { name: "Paper Cathedrals", work: "Halcyon Works", initials: "PC" },
    ],
  },
  {
    id: "director",
    label: "Best Director",
    icon: Camera,
    nominees: [
      { name: "Imani Okafor", work: "The Long Horizon", initials: "IO", favorite: true },
      { name: "Lars Henning", work: "Salt & Static", initials: "LH" },
      { name: "Priya Nair", work: "A Quiet Voltage", initials: "PN" },
      { name: "Tomas Vela", work: "Paper Cathedrals", initials: "TV" },
    ],
  },
  {
    id: "lead",
    label: "Lead Performance",
    icon: Star,
    nominees: [
      { name: "Cora Bellweather", work: "A Quiet Voltage", initials: "CB" },
      { name: "Desmond Frye", work: "The Long Horizon", initials: "DF", favorite: true },
      { name: "Naomi Strand", work: "Salt & Static", initials: "NS" },
      { name: "Owen Calloway", work: "Paper Cathedrals", initials: "OC" },
    ],
  },
  {
    id: "score",
    label: "Original Score",
    icon: Music,
    nominees: [
      { name: "Elise Marchetti", work: "The Long Horizon", initials: "EM" },
      { name: "The Bramble Collective", work: "A Quiet Voltage", initials: "BC", favorite: true },
      { name: "Yusuf Demir", work: "Paper Cathedrals", initials: "YD" },
      { name: "Halsey Quartet", work: "Salt & Static", initials: "HQ" },
    ],
  },
]

const SCHEDULE = [
  { time: "6:00 PM", title: "Champagne Arrivals", desc: "Red carpet & press line on the Grand Promenade", icon: Sparkles },
  { time: "7:00 PM", title: "Doors & Seating", desc: "Guests take their tables in the Aurora Ballroom", icon: Ticket },
  { time: "7:45 PM", title: "Opening Ceremony", desc: "Host monologue and the year in review", icon: Mic },
  { time: "8:15 PM", title: "First Awards Block", desc: "Craft and performance honors presented", icon: Award },
  { time: "9:30 PM", title: "Live Tribute", desc: "Orchestral performance and lifetime achievement", icon: Music },
  { time: "10:00 PM", title: "Top Honors & Gala", desc: "Best Picture reveal followed by the after-party", icon: Crown },
]

const TIERS = [
  {
    name: "Single Seat",
    price: "$450",
    note: "per guest",
    perks: ["Reserved ballroom seat", "Welcome champagne", "Ceremony program", "Coat check"],
    featured: false,
  },
  {
    name: "Gala Table",
    price: "$5,200",
    note: "table of ten",
    perks: ["Premium center table", "Bottle service", "Plated four-course dinner", "Priority red carpet", "After-party access"],
    featured: true,
  },
  {
    name: "Patron Suite",
    price: "$12,000",
    note: "private box",
    perks: ["Elevated private box", "Dedicated host", "Backstage lounge pass", "Commemorative trophy", "Valet & limo arrival"],
    featured: false,
  },
]

const SPONSORS = ["Aurelia", "Northwind", "Lumen", "Meridian", "Halcyon", "Velour"]

export default function AwardsShowTemplate() {
  const [active, setActive] = React.useState(CATEGORIES[0].id)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            <span className="text-base font-semibold tracking-tight">The Aurora Awards</span>
          </div>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#nominees" className="transition-colors hover:text-foreground">Nominees</a>
            <a href="#schedule" className="transition-colors hover:text-foreground">Schedule</a>
            <a href="#tickets" className="transition-colors hover:text-foreground">Tickets</a>
            <a href="#sponsors" className="transition-colors hover:text-foreground">Sponsors</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button className="hidden sm:inline-flex" size="sm">
              <Ticket className="h-4 w-4" /> Reserve
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" aria-hidden="true" />
          <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" aria-hidden="true" />
          <div className="relative mx-auto w-full max-w-6xl px-4 py-24 text-center">
            <Badge variant="secondary" className="mb-5 gap-1.5">
              <Sparkles className="h-3.5 w-3.5" /> 24th Annual Ceremony
            </Badge>
            <h1 className="mx-auto max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
              A Night to Honor the Year&apos;s Finest
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-lg text-muted-foreground">
              Join us for an evening of glamour, performance, and recognition as we celebrate the artists who defined the season.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 text-sm text-muted-foreground sm:flex-row sm:gap-6">
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" /> Saturday, November 14
              </span>
              <span className="hidden h-4 sm:block"><Separator orientation="vertical" /></span>
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" /> The Aurora Ballroom, Marlowe Hall
              </span>
            </div>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg">
                Reserve Your Table <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" asChild={false}>
                <a href="#nominees">View Nominees</a>
              </Button>
            </div>

            {/* Countdown stat row */}
            <div className="mx-auto mt-14 grid max-w-2xl grid-cols-4 gap-3 sm:gap-4">
              {COUNTDOWN.map((c) => (
                <div key={c.label} className="rounded-xl border bg-card/60 p-4 backdrop-blur">
                  <div className="text-3xl font-semibold tabular-nums tracking-tight sm:text-4xl">{c.value}</div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{c.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Nominees */}
        <section id="nominees" className="mx-auto w-full max-w-6xl px-4 py-20">
          <div className="text-center">
            <Badge variant="outline" className="mb-3">The Nominees</Badge>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">This Year&apos;s Contenders</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Browse the nominees by category. The competition has never been closer.
            </p>
          </div>

          <Tabs value={active} onValueChange={setActive} className="mt-10">
            <TabsList className="mx-auto flex h-auto w-full max-w-2xl flex-wrap justify-center gap-1">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon
                return (
                  <TabsTrigger key={cat.id} value={cat.id} className="gap-1.5">
                    <Icon className="h-4 w-4" /> {cat.label}
                  </TabsTrigger>
                )
              })}
            </TabsList>

            {CATEGORIES.map((cat) => (
              <TabsContent key={cat.id} value={cat.id} className="mt-8">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {cat.nominees.map((nom) => (
                    <Card
                      key={nom.name}
                      className={cn(
                        "group relative overflow-hidden transition-colors",
                        nom.favorite ? "border-primary" : "hover:border-primary/40"
                      )}
                    >
                      {nom.favorite && (
                        <Badge className="absolute right-3 top-3 gap-1">
                          <Crown className="h-3 w-3" /> Frontrunner
                        </Badge>
                      )}
                      <CardHeader>
                        <Avatar className="h-12 w-12 border bg-primary/10">
                          <AvatarFallback className="bg-primary/10 text-primary">{nom.initials}</AvatarFallback>
                        </Avatar>
                        <CardTitle className="mt-3 text-lg">{nom.name}</CardTitle>
                        <CardDescription>{nom.work}</CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Award className="h-4 w-4 text-primary" /> {cat.label}
                        </span>
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
          <div className="mx-auto w-full max-w-4xl px-4 py-20">
            <div className="text-center">
              <Badge variant="outline" className="mb-3">Order of the Evening</Badge>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Schedule of the Night</h2>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                From the red carpet to the final toast, here is how the evening unfolds.
              </p>
            </div>

            <ol className="mt-12 space-y-2">
              {SCHEDULE.map((item, i) => {
                const Icon = item.icon
                return (
                  <li key={item.title} className="relative flex gap-4 rounded-xl border bg-card p-4 transition-colors hover:border-primary/40">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="inline-flex items-center gap-1.5 text-sm font-medium tabular-nums text-primary">
                          <Clock className="h-3.5 w-3.5" /> {item.time}
                        </span>
                        <h3 className="text-base font-semibold">{item.title}</h3>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                    <span className="absolute right-4 top-4 text-xs font-medium tabular-nums text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </li>
                )
              })}
            </ol>
          </div>
        </section>

        {/* Tickets */}
        <section id="tickets" className="mx-auto w-full max-w-6xl px-4 py-20">
          <div className="text-center">
            <Badge variant="outline" className="mb-3">Be Part of It</Badge>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Tickets & Tables</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Choose how you&apos;ll experience the gala. Seating is limited and assigned in order of reservation.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {TIERS.map((tier) => (
              <Card
                key={tier.name}
                className={cn(
                  "relative flex flex-col",
                  tier.featured && "border-primary shadow-sm ring-1 ring-primary/20"
                )}
              >
                {tier.featured && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>
                )}
                <CardHeader>
                  <CardTitle className="text-lg">{tier.name}</CardTitle>
                  <div className="mt-2 flex items-baseline gap-1.5">
                    <span className="text-4xl font-semibold tracking-tight">{tier.price}</span>
                    <span className="text-sm text-muted-foreground">{tier.note}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3 text-sm">
                    {tier.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2.5">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant={tier.featured ? "default" : "outline"}>
                    Reserve {tier.name}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Sponsors */}
        <section id="sponsors" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16">
            <p className="text-center text-sm uppercase tracking-widest text-muted-foreground">
              Presented with our distinguished partners
            </p>
            <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
              {SPONSORS.map((s) => (
                <div key={s} className="flex items-center justify-center gap-2 text-lg font-semibold tracking-tight text-muted-foreground transition-colors hover:text-foreground">
                  <Star className="h-4 w-4" /> {s}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="mx-auto w-full max-w-6xl px-4 py-20">
          <Card className="overflow-hidden border-primary/30 bg-primary/5 text-center">
            <CardContent className="px-6 py-14">
              <Trophy className="mx-auto h-10 w-10 text-primary" />
              <h2 className="mx-auto mt-5 max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Reserve your place at the most celebrated night of the year
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
                Tables are selling quickly. Secure yours before the countdown ends.
              </p>
              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button size="lg">
                  <Ticket className="h-4 w-4" /> Get Tickets
                </Button>
                <Button size="lg" variant="outline">Request Press Pass</Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto w-full max-w-6xl px-4 py-12">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
            <div className="max-w-xs">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                <span className="text-base font-semibold tracking-tight">The Aurora Awards</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Celebrating excellence in film and performance for twenty-four years running.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
              <div>
                <h3 className="text-sm font-medium">Event</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li><a href="#nominees" className="hover:text-foreground">Nominees</a></li>
                  <li><a href="#schedule" className="hover:text-foreground">Schedule</a></li>
                  <li><a href="#tickets" className="hover:text-foreground">Tickets</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium">Attend</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground">Venue & Map</a></li>
                  <li><a href="#" className="hover:text-foreground">Dress Code</a></li>
                  <li><a href="#" className="hover:text-foreground">Accessibility</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium">Press</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground">Media Kit</a></li>
                  <li><a href="#" className="hover:text-foreground">Credentials</a></li>
                  <li><a href="#" className="hover:text-foreground">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col items-center justify-between gap-3 text-sm text-muted-foreground sm:flex-row">
            <p>© 2026 The Aurora Awards Foundation. All rights reserved.</p>
            <div className="flex items-center gap-5">
              <a href="#" className="hover:text-foreground">Privacy</a>
              <a href="#" className="hover:text-foreground">Terms</a>
              <a href="#" className="hover:text-foreground">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
