"use client"

import * as React from "react"
import {
  Cpu,
  CalendarDays,
  MapPin,
  ArrowRight,
  Check,
  Sparkles,
  Clock,
  Ticket,
  Twitter,
  Linkedin,
  Github,
  Plane,
  Hotel,
  Wifi,
  Coffee,
  Menu,
  Quote,
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
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

const SUMMIT = {
  name: "Helix Tech Summit",
  edition: "2026",
  tagline: "Two days at the intersection of AI, infrastructure, and the people building what's next.",
  date: "March 18–19, 2026",
  location: "Austin Convention Center, TX",
}

const NAV_LINKS = [
  { label: "Speakers", href: "#speakers" },
  { label: "Agenda", href: "#agenda" },
  { label: "Pricing", href: "#pricing" },
  { label: "Venue", href: "#venue" },
  { label: "Sponsors", href: "#sponsors" },
]

const COUNTDOWN = [
  { value: "47", label: "Days" },
  { value: "12", label: "Hours" },
  { value: "38", label: "Mins" },
]

const KEYNOTE = {
  name: "Dr. Ingrid Voss",
  role: "Chief Scientist, Meridian Labs",
  title: "Beyond the Model: Building Systems That Reason",
  blurb:
    "A grounded look at where applied AI is actually delivering value in production today — and the infrastructure decisions that separate demos from durable products.",
  img: "https://i.pravatar.cc/240?img=20",
}

const SPEAKERS = [
  { name: "Rafael Mendes", role: "Distinguished Engineer, Kestrel Cloud", img: "https://i.pravatar.cc/160?img=11" },
  { name: "Hana Sato", role: "Head of ML Platform, Driftwave", img: "https://i.pravatar.cc/160?img=36" },
  { name: "Omar Haddad", role: "Founder & CEO, Vectorly", img: "https://i.pravatar.cc/160?img=14" },
  { name: "Beatrice Lund", role: "VP Infrastructure, Northgate", img: "https://i.pravatar.cc/160?img=44" },
  { name: "Kenji Watanabe", role: "Staff SRE, Hyperlane", img: "https://i.pravatar.cc/160?img=53" },
  { name: "Aaliyah Brooks", role: "Director of DevRel, Forge", img: "https://i.pravatar.cc/160?img=29" },
]

const TRACKS = [
  { value: "ai", label: "AI & ML", desc: "Models, agents, and applied research" },
  { value: "infra", label: "Infrastructure", desc: "Scale, reliability, and the edge" },
  { value: "product", label: "Product & Craft", desc: "Building things people keep using" },
]

const AGENDA: Record<string, { time: string; title: string; speaker: string; room: string }[]> = {
  ai: [
    { time: "09:30", title: "Agents That Actually Ship", speaker: "Omar Haddad", room: "Hall A" },
    { time: "11:00", title: "Evaluating LLMs You Can Trust", speaker: "Hana Sato", room: "Hall A" },
    { time: "13:30", title: "Retrieval Without the Hype", speaker: "Dr. Ingrid Voss", room: "Hall A" },
    { time: "15:00", title: "Fine-Tuning in the Real World", speaker: "Rafael Mendes", room: "Hall A" },
  ],
  infra: [
    { time: "09:30", title: "Running Inference at the Edge", speaker: "Kenji Watanabe", room: "Hall B" },
    { time: "11:00", title: "Cost-Aware Autoscaling", speaker: "Beatrice Lund", room: "Hall B" },
    { time: "13:30", title: "Observability for GPU Fleets", speaker: "Kenji Watanabe", room: "Hall B" },
    { time: "15:00", title: "Multi-Region Without Tears", speaker: "Rafael Mendes", room: "Hall B" },
  ],
  product: [
    { time: "09:30", title: "Designing for Uncertainty", speaker: "Aaliyah Brooks", room: "Studio" },
    { time: "11:00", title: "From Prototype to Platform", speaker: "Omar Haddad", room: "Studio" },
    { time: "13:30", title: "Developer Experience as Strategy", speaker: "Aaliyah Brooks", room: "Studio" },
    { time: "15:00", title: "Shipping Trust at Scale", speaker: "Beatrice Lund", room: "Studio" },
  ],
}

const TIERS = [
  {
    name: "Builder",
    price: "$249",
    tagline: "For individuals & indie devs",
    featured: false,
    perks: ["Both days of talks", "All three tracks", "Session recordings", "Summit swag"],
  },
  {
    name: "Pro",
    price: "$599",
    tagline: "For working professionals",
    featured: true,
    perks: [
      "Everything in Builder",
      "Hands-on workshops",
      "Reserved seating",
      "Speaker Q&A lounge",
      "Afterparty access",
    ],
  },
  {
    name: "Team",
    price: "$2,200",
    tagline: "Bundle of 5 Pro passes",
    featured: false,
    perks: ["5 Pro tickets", "Private team room", "Group onboarding session", "Invoice billing"],
  },
]

const VENUE_PERKS = [
  { icon: Plane, title: "15 min from AUS", desc: "Direct shuttle from the airport every 30 minutes." },
  { icon: Hotel, title: "Partner hotels", desc: "Discounted rates at four hotels within walking distance." },
  { icon: Wifi, title: "Gigabit Wi-Fi", desc: "Dedicated network across all halls and lounges." },
  { icon: Coffee, title: "All-day catering", desc: "Meals, snacks, and a barista bar included with every pass." },
]

const SPONSORS = ["Kestrel", "Driftwave", "Vectorly", "Northgate", "Hyperlane", "Forge", "Meridian", "Lattice"]

export default function TechSummitPage() {
  const [activeTrack, setActiveTrack] = React.useState("ai")

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-2 font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Cpu className="h-4 w-4" />
            </span>
            <span>
              Helix <span className="text-muted-foreground">Summit</span>
            </span>
          </a>
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <a href="#pricing">
                <Ticket className="mr-1 h-4 w-4" />
                Register
              </a>
            </Button>
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main id="top" className="flex flex-1 flex-col">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-background to-background" />
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:py-28">
            <div>
              <Badge variant="secondary" className="mb-5">
                <Sparkles className="mr-1 h-3 w-3" />
                Early-bird pricing live now
              </Badge>
              <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                {SUMMIT.name}{" "}
                <span className="text-primary">{SUMMIT.edition}</span>
              </h1>
              <p className="mt-5 max-w-xl text-pretty text-lg text-muted-foreground">
                {SUMMIT.tagline}
              </p>
              <div className="mt-7 flex flex-col gap-3 text-sm font-medium sm:flex-row sm:items-center sm:gap-6">
                <span className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-primary" />
                  {SUMMIT.date}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  {SUMMIT.location}
                </span>
              </div>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <a href="#pricing">
                    Register now
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href="#agenda">Explore the agenda</a>
                </Button>
              </div>
            </div>

            <Card className="bg-card/80 backdrop-blur">
              <CardHeader>
                <CardDescription>Doors open in</CardDescription>
                <CardTitle className="text-xl">Save your seat before the countdown ends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  {COUNTDOWN.map((unit) => (
                    <div
                      key={unit.label}
                      className="rounded-lg border bg-muted/30 p-4 text-center"
                    >
                      <div className="text-3xl font-bold tabular-nums tracking-tight">{unit.value}</div>
                      <div className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
                        {unit.label}
                      </div>
                    </div>
                  ))}
                </div>
                <Separator className="my-5" />
                <dl className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Speakers</dt>
                    <dd className="font-semibold">45+</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Tracks</dt>
                    <dd className="font-semibold">3 parallel</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Attendees</dt>
                    <dd className="font-semibold">1,800 expected</dd>
                  </div>
                </dl>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <a href="#pricing">Claim early-bird price</a>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Keynote spotlight */}
        <section className="border-b bg-muted/30 py-20 sm:py-24">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <Badge variant="outline" className="mb-3">
              Opening keynote
            </Badge>
            <div className="grid gap-10 lg:grid-cols-[300px_1fr] lg:items-center">
              <div className="relative">
                <div className="aspect-square overflow-hidden rounded-2xl border bg-card">
                  <img
                    src={KEYNOTE.img}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 left-4 right-4 rounded-xl border bg-card p-3 text-center shadow-sm">
                  <p className="font-semibold leading-tight">{KEYNOTE.name}</p>
                  <p className="text-xs text-muted-foreground">{KEYNOTE.role}</p>
                </div>
              </div>
              <div>
                <Quote className="h-8 w-8 text-primary" />
                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                  {KEYNOTE.title}
                </h2>
                <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{KEYNOTE.blurb}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Badge variant="secondary">Day 1 · 09:00</Badge>
                  <Badge variant="secondary">Main Stage</Badge>
                  <Badge variant="secondary">45 min</Badge>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Speakers */}
        <section id="speakers" className="border-b py-20 sm:py-24">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <Badge variant="outline" className="mb-3">
                Speakers
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                The minds on stage
              </h2>
              <p className="mt-3 text-muted-foreground">
                Engineers, scientists, and founders sharing hard-won lessons from shipping at scale.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3">
              {SPEAKERS.map((speaker) => (
                <Card key={speaker.name} className="transition-shadow hover:shadow-md">
                  <CardContent className="flex items-center gap-4 pt-6">
                    <Avatar className="h-14 w-14 shrink-0">
                      <AvatarImage src={speaker.img} alt="" />
                      <AvatarFallback>
                        {speaker.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <h3 className="truncate font-semibold">{speaker.name}</h3>
                      <p className="text-sm text-muted-foreground">{speaker.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Agenda by track */}
        <section id="agenda" className="border-b bg-muted/30 py-20 sm:py-24">
          <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <Badge variant="outline" className="mb-3">
                Agenda
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Three tracks, running in parallel
              </h2>
              <p className="mt-3 text-muted-foreground">
                Build your own schedule. Switch between tracks to see the full day-one lineup.
              </p>
            </div>

            <Tabs value={activeTrack} onValueChange={setActiveTrack} className="mt-10">
              <TabsList className="grid w-full grid-cols-3">
                {TRACKS.map((track) => (
                  <TabsTrigger key={track.value} value={track.value}>
                    {track.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              {TRACKS.map((track) => (
                <TabsContent key={track.value} value={track.value} className="mt-6">
                  <p className="mb-4 text-sm text-muted-foreground">{track.desc}</p>
                  <ul className="divide-y overflow-hidden rounded-xl border bg-card">
                    {AGENDA[track.value].map((item, i) => (
                      <li
                        key={i}
                        className="flex flex-col gap-2 p-4 transition-colors hover:bg-accent/50 sm:flex-row sm:items-center sm:gap-4 sm:p-5"
                      >
                        <div className="flex w-20 shrink-0 items-center gap-1.5 text-sm font-medium text-muted-foreground">
                          <Clock className="h-3.5 w-3.5" />
                          {item.time}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium">{item.title}</p>
                          <p className="text-sm text-muted-foreground">{item.speaker}</p>
                        </div>
                        <Badge variant="outline" className="w-fit shrink-0">
                          {item.room}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="border-b py-20 sm:py-24">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="outline" className="mb-3">
                Pricing
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Pick your pass</h2>
              <p className="mt-3 text-muted-foreground">
                Every pass covers both days and all three tracks. Early-bird ends February 1.
              </p>
            </div>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {TIERS.map((tier) => (
                <Card
                  key={tier.name}
                  className={cn(
                    "flex flex-col",
                    tier.featured && "border-primary shadow-md ring-1 ring-primary"
                  )}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{tier.name}</CardTitle>
                      {tier.featured && <Badge>Most popular</Badge>}
                    </div>
                    <CardDescription>{tier.tagline}</CardDescription>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-4xl font-bold tracking-tight">{tier.price}</span>
                      <span className="text-sm text-muted-foreground">/ pass</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-3">
                      {tier.perks.map((perk) => (
                        <li key={perk} className="flex items-start gap-2 text-sm">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <span>{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant={tier.featured ? "default" : "outline"}>
                      Get {tier.name}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Venue */}
        <section id="venue" className="border-b bg-muted/30 py-20 sm:py-24">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <Badge variant="outline" className="mb-3">
                  Venue
                </Badge>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Austin Convention Center
                </h2>
                <p className="mt-3 text-muted-foreground">
                  In the heart of downtown, steps from live music, great food, and the river. Everything
                  you need is on-site or a short walk away.
                </p>
                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  {VENUE_PERKS.map((perk) => (
                    <div key={perk.title} className="flex gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <perk.icon className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="font-medium">{perk.title}</p>
                        <p className="text-sm text-muted-foreground">{perk.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="mt-8">
                  Travel & lodging guide
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
              <div className="overflow-hidden rounded-2xl border bg-card">
                <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-primary/10 via-muted to-background">
                  <div className="text-center">
                    <MapPin className="mx-auto h-10 w-10 text-primary" />
                    <p className="mt-3 font-semibold">500 E Cesar Chavez St</p>
                    <p className="text-sm text-muted-foreground">Austin, TX 78701</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sponsors */}
        <section id="sponsors" className="border-b py-20 sm:py-24">
          <div className="mx-auto w-full max-w-6xl px-4 text-center sm:px-6">
            <Badge variant="outline" className="mb-3">
              Sponsors
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Powered by our partners</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              The teams making Helix Summit possible — and hiring across the show floor.
            </p>
            <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-4">
              {SPONSORS.map((sponsor) => (
                <div
                  key={sponsor}
                  className="flex items-center justify-center bg-card p-8 text-lg font-semibold text-muted-foreground transition-colors hover:text-foreground"
                >
                  {sponsor}
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Button variant="outline">
                Become a sponsor
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-20 sm:py-24">
          <div className="mx-auto w-full max-w-3xl px-4 text-center sm:px-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Don&apos;t miss an update</h2>
            <p className="mt-3 text-muted-foreground">
              New speakers, track reveals, and early-bird reminders — straight to your inbox.
            </p>
            <form
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input type="email" placeholder="you@company.com" aria-label="Email address" className="flex-1" />
              <Button type="submit">Notify me</Button>
            </form>
            <p className="mt-3 text-xs text-muted-foreground">No spam. Unsubscribe anytime.</p>
          </div>
        </section>
      </main>

      <footer className="border-t bg-muted/30">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-xs">
              <div className="flex items-center gap-2 font-semibold">
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <Cpu className="h-4 w-4" />
                </span>
                Helix Summit
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                {SUMMIT.date} · {SUMMIT.location}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <div>
                <p className="text-sm font-medium">Summit</p>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {NAV_LINKS.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} className="transition-colors hover:text-foreground">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium">Resources</p>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a href="#" className="transition-colors hover:text-foreground">
                      Code of conduct
                    </a>
                  </li>
                  <li>
                    <a href="#" className="transition-colors hover:text-foreground">
                      Press kit
                    </a>
                  </li>
                  <li>
                    <a href="#" className="transition-colors hover:text-foreground">
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium">Follow</p>
                <div className="mt-3 flex gap-2">
                  <Button variant="outline" size="icon" aria-label="Twitter">
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" aria-label="LinkedIn">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" aria-label="GitHub">
                    <Github className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
            <p>© 2026 Helix Tech Summit. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="transition-colors hover:text-foreground">
                Privacy
              </a>
              <a href="#" className="transition-colors hover:text-foreground">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
