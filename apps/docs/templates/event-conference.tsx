"use client"

import * as React from "react"
import {
  CalendarDays,
  MapPin,
  ArrowRight,
  Check,
  Star,
  Clock,
  Ticket,
  Twitter,
  Linkedin,
  Github,
  Mic2,
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
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

const EVENT = {
  name: "Frontier Conf 2026",
  tagline: "The summit for builders shaping the next decade of software.",
  date: "October 14–16, 2026",
  location: "Moscone West, San Francisco",
}

const NAV_LINKS = [
  { label: "Speakers", href: "#speakers" },
  { label: "Agenda", href: "#agenda" },
  { label: "Tickets", href: "#tickets" },
  { label: "Sponsors", href: "#sponsors" },
]

const STATS = [
  { value: "60+", label: "Speakers" },
  { value: "3", label: "Days" },
  { value: "40", label: "Sessions" },
  { value: "2,500", label: "Attendees" },
]

const SPEAKERS = [
  { name: "Mara Okafor", role: "VP Engineering, Northwind", img: "https://i.pravatar.cc/160?img=47" },
  { name: "Devon Park", role: "Founder, Loom Systems", img: "https://i.pravatar.cc/160?img=12" },
  { name: "Aisha Rahman", role: "Principal Designer, Figma", img: "https://i.pravatar.cc/160?img=32" },
  { name: "Lucas Vendetti", role: "CTO, Streamline AI", img: "https://i.pravatar.cc/160?img=15" },
  { name: "Priya Nair", role: "Head of Platform, Vercel", img: "https://i.pravatar.cc/160?img=45" },
  { name: "Tom Hwang", role: "Staff Engineer, Stripe", img: "https://i.pravatar.cc/160?img=58" },
  { name: "Elena Sokolov", role: "Research Lead, OpenMind", img: "https://i.pravatar.cc/160?img=23" },
  { name: "Marcus Bell", role: "DevRel, Supabase", img: "https://i.pravatar.cc/160?img=68" },
]

const AGENDA: Record<string, { time: string; title: string; speaker: string; track: string }[]> = {
  day1: [
    { time: "09:00", title: "Opening Keynote: The Next Decade", speaker: "Mara Okafor", track: "Keynote" },
    { time: "10:30", title: "Designing Systems That Scale", speaker: "Aisha Rahman", track: "Design" },
    { time: "12:00", title: "Lunch & Networking", speaker: "—", track: "Break" },
    { time: "13:30", title: "Edge Compute in Production", speaker: "Priya Nair", track: "Platform" },
    { time: "15:00", title: "AI Pair Programming, Honestly", speaker: "Lucas Vendetti", track: "AI" },
  ],
  day2: [
    { time: "09:30", title: "Building Resilient Teams", speaker: "Devon Park", track: "Leadership" },
    { time: "11:00", title: "Payments at Global Scale", speaker: "Tom Hwang", track: "Platform" },
    { time: "12:30", title: "Lunch & Networking", speaker: "—", track: "Break" },
    { time: "14:00", title: "The Future of Local-First", speaker: "Marcus Bell", track: "Engineering" },
    { time: "15:30", title: "Research to Product", speaker: "Elena Sokolov", track: "AI" },
  ],
  day3: [
    { time: "10:00", title: "Workshop: Ship Faster", speaker: "Priya Nair", track: "Workshop" },
    { time: "11:30", title: "Open Source Sustainability", speaker: "Marcus Bell", track: "Community" },
    { time: "13:00", title: "Lunch & Networking", speaker: "—", track: "Break" },
    { time: "14:30", title: "Closing Panel: What's Next", speaker: "All speakers", track: "Keynote" },
    { time: "16:00", title: "Afterparty", speaker: "—", track: "Social" },
  ],
}

const TIERS = [
  {
    name: "Community",
    price: "$199",
    tagline: "For individuals & students",
    featured: false,
    perks: ["All 3 days of talks", "Hallway track access", "Recorded sessions", "Event swag bag"],
  },
  {
    name: "Pro",
    price: "$499",
    tagline: "For working professionals",
    featured: true,
    perks: [
      "Everything in Community",
      "Reserved front seating",
      "Workshop access",
      "Speaker meet & greet",
      "Afterparty entry",
    ],
  },
  {
    name: "Team",
    price: "$1,799",
    tagline: "Up to 5 seats",
    featured: false,
    perks: ["5 Pro tickets", "Dedicated team lounge", "Private group session", "Priority support"],
  },
]

const SPONSORS = ["Northwind", "Vercel", "Stripe", "Figma", "Supabase", "OpenMind", "Loom", "Streamline"]

const DAY_TABS = [
  { value: "day1", label: "Day 1", date: "Oct 14" },
  { value: "day2", label: "Day 2", date: "Oct 15" },
  { value: "day3", label: "Day 3", date: "Oct 16" },
]

export default function EventConferencePage() {
  const [activeDay, setActiveDay] = React.useState("day1")

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-2 font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Mic2 className="h-4 w-4" />
            </span>
            <span>Frontier Conf</span>
          </a>
          <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
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
              <a href="#tickets">Register</a>
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main id="top" className="flex flex-1 flex-col">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 via-background to-background" />
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:py-32">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="secondary" className="mb-5">
                <Star className="mr-1 h-3 w-3" />
                Early-bird pricing ends soon
              </Badge>
              <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                {EVENT.name}
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg text-muted-foreground">
                {EVENT.tagline}
              </p>
              <div className="mt-7 flex flex-col items-center justify-center gap-4 text-sm font-medium text-muted-foreground sm:flex-row sm:gap-8">
                <span className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-primary" />
                  {EVENT.date}
                </span>
                <span className="hidden h-4 sm:block">
                  <Separator orientation="vertical" />
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  {EVENT.location}
                </span>
              </div>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <a href="#tickets">
                    Register now
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href="#agenda">View agenda</a>
                </Button>
              </div>
            </div>

            <div className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-4">
              {STATS.map((stat) => (
                <div key={stat.label} className="bg-card p-6 text-center">
                  <div className="text-3xl font-bold tracking-tight">{stat.value}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
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
                Learn from the people building it
              </h2>
              <p className="mt-3 text-muted-foreground">
                A lineup of engineers, designers, and founders sharing what actually works in production.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
              {SPEAKERS.map((speaker) => (
                <Card key={speaker.name} className="text-center transition-shadow hover:shadow-md">
                  <CardContent className="flex flex-col items-center pt-6">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={speaker.img} alt="" />
                      <AvatarFallback>
                        {speaker.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="mt-4 font-semibold">{speaker.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{speaker.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Agenda */}
        <section id="agenda" className="border-b bg-muted/30 py-20 sm:py-24">
          <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <Badge variant="outline" className="mb-3">
                Agenda
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Three days, one schedule</h2>
              <p className="mt-3 text-muted-foreground">
                Talks, workshops, and panels across multiple tracks. Pick a day to see what's on.
              </p>
            </div>

            <Tabs value={activeDay} onValueChange={setActiveDay} className="mt-10">
              <TabsList className="grid w-full grid-cols-3">
                {DAY_TABS.map((tab) => (
                  <TabsTrigger key={tab.value} value={tab.value} className="flex flex-col py-2">
                    <span className="font-medium">{tab.label}</span>
                    <span className="text-xs text-muted-foreground">{tab.date}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
              {DAY_TABS.map((tab) => (
                <TabsContent key={tab.value} value={tab.value} className="mt-6">
                  <ul className="divide-y overflow-hidden rounded-xl border bg-card">
                    {AGENDA[tab.value].map((item, i) => (
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
                        <Badge variant="secondary" className="w-fit shrink-0">
                          {item.track}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Tickets */}
        <section id="tickets" className="border-b py-20 sm:py-24">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="outline" className="mb-3">
                Tickets
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Pick your pass</h2>
              <p className="mt-3 text-muted-foreground">
                Every ticket includes full access to all three days. Prices rise after early-bird.
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
                      <Ticket className="mr-1 h-4 w-4" />
                      Get {tier.name}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Sponsors */}
        <section id="sponsors" className="border-b bg-muted/30 py-20 sm:py-24">
          <div className="mx-auto w-full max-w-6xl px-4 text-center sm:px-6">
            <Badge variant="outline" className="mb-3">
              Sponsors
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Backed by the best</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Frontier Conf is made possible by partners who care about the craft.
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
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Stay in the loop</h2>
            <p className="mt-3 text-muted-foreground">
              Get speaker announcements, schedule updates, and early-bird reminders.
            </p>
            <form
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input type="email" placeholder="you@company.com" aria-label="Email address" className="flex-1" />
              <Button type="submit">Subscribe</Button>
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
                  <Mic2 className="h-4 w-4" />
                </span>
                Frontier Conf
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                {EVENT.date} · {EVENT.location}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <div>
                <p className="text-sm font-medium">Event</p>
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
                      Venue & travel
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
            <p>© 2026 Frontier Conf. All rights reserved.</p>
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
