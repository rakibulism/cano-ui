"use client"

import * as React from "react"
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock,
  Globe2,
  MapPin,
  Mic2,
  Play,
  Radio,
  Sparkles,
  Ticket,
  Users,
  Wifi,
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
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/registry/ui/accordion"

const NAV = ["Agenda", "Speakers", "Tickets", "Sponsors", "FAQ"]

const STATS = [
  { icon: Mic2, value: "48", label: "Speakers" },
  { icon: Radio, value: "60+", label: "Live sessions" },
  { icon: Users, value: "12,000", label: "Attendees" },
]

const TRACKS = [
  {
    id: "product",
    label: "Product",
    sessions: [
      { time: "09:00", title: "Opening keynote: The next decade of building", speaker: "Lena Okafor", tag: "Keynote" },
      { time: "10:30", title: "Roadmaps that survive contact with reality", speaker: "Diego Marín", tag: "Talk" },
      { time: "13:00", title: "From zero to first thousand users", speaker: "Priya Raman", tag: "Workshop" },
      { time: "15:30", title: "Panel: Pricing in an AI-everything world", speaker: "Host + 3 guests", tag: "Panel" },
    ],
  },
  {
    id: "engineering",
    label: "Engineering",
    sessions: [
      { time: "09:30", title: "Shipping safely at a million requests a minute", speaker: "Marcus Lee", tag: "Talk" },
      { time: "11:00", title: "Hands-on: Observability you'll actually use", speaker: "Sofia Bauer", tag: "Workshop" },
      { time: "14:00", title: "The case for boring infrastructure", speaker: "Tomás Alvarez", tag: "Talk" },
      { time: "16:00", title: "Live debugging: a production incident, replayed", speaker: "Ava Chen", tag: "Live" },
    ],
  },
  {
    id: "design",
    label: "Design",
    sessions: [
      { time: "09:30", title: "Designing systems people don't fight", speaker: "Dana Whitfield", tag: "Talk" },
      { time: "11:30", title: "Motion that means something", speaker: "Noah Kim", tag: "Workshop" },
      { time: "14:30", title: "Research on a startup budget", speaker: "Hana Suzuki", tag: "Talk" },
      { time: "16:30", title: "Critique live: redesigning a checkout", speaker: "Open floor", tag: "Live" },
    ],
  },
  {
    id: "growth",
    label: "Growth",
    sessions: [
      { time: "10:00", title: "Channels that compound", speaker: "Olivia Brandt", tag: "Talk" },
      { time: "12:00", title: "Lifecycle email that doesn't get muted", speaker: "Sam Idris", tag: "Workshop" },
      { time: "15:00", title: "SEO when everyone has the same AI", speaker: "Wei Zhang", tag: "Talk" },
      { time: "17:00", title: "Closing panel: what actually moved the needle", speaker: "Host + 4 guests", tag: "Panel" },
    ],
  },
]

const SPEAKERS = [
  { name: "Lena Okafor", role: "CPO, Northwind", img: "https://i.pravatar.cc/160?img=47" },
  { name: "Marcus Lee", role: "Staff Engineer, Lumen", img: "https://i.pravatar.cc/160?img=12" },
  { name: "Dana Whitfield", role: "Design Lead, Foldera", img: "https://i.pravatar.cc/160?img=32" },
  { name: "Olivia Brandt", role: "VP Growth, Sprout", img: "https://i.pravatar.cc/160?img=5" },
  { name: "Diego Marín", role: "Founder, Cadence", img: "https://i.pravatar.cc/160?img=14" },
  { name: "Sofia Bauer", role: "SRE, Helios", img: "https://i.pravatar.cc/160?img=20" },
  { name: "Noah Kim", role: "Motion Designer", img: "https://i.pravatar.cc/160?img=33" },
  { name: "Priya Raman", role: "Founder, Tidemark", img: "https://i.pravatar.cc/160?img=45" },
]

const TIERS = [
  {
    name: "Free",
    price: "$0",
    note: "stream pass",
    features: ["Live main-stage keynotes", "Full session replays for 7 days", "Community chat access"],
    cta: "Get free pass",
    featured: false,
  },
  {
    name: "Pro",
    price: "$89",
    note: "per attendee",
    features: ["Everything in Free", "All four tracks, all sessions", "Lifetime replay library", "Hands-on workshop access", "Downloadable resources"],
    cta: "Get Pro pass",
    featured: true,
  },
  {
    name: "VIP",
    price: "$249",
    note: "per attendee",
    features: ["Everything in Pro", "Speaker AMA roundtables", "Private networking lounge", "1:1 mentor matchmaking", "Limited-edition swag kit"],
    cta: "Get VIP pass",
    featured: false,
  },
]

const SPONSORS = ["Northwind", "Lumen", "Foldera", "Helios", "Sprout", "Cadence", "Tidemark", "Helix"]

const FAQ = [
  { q: "Is the summit fully online?", a: "Yes — every session streams live and on-demand. Join from anywhere with a browser, no travel required." },
  { q: "What happens if I miss a session?", a: "Pro and VIP passes include the lifetime replay library. Free passes get replays for 7 days after the event." },
  { q: "Can I switch between tracks during the day?", a: "Absolutely. All four tracks run in parallel and you can hop between them freely — replays cover anything you miss." },
  { q: "Do workshops require anything to be installed?", a: "A few hands-on workshops share a starter repo in advance. Everything else runs right in your browser." },
  { q: "Can my team attend together?", a: "Yes. Reach out for team bundles of five or more Pro and VIP passes with consolidated invoicing." },
]

export default function VirtualSummitPage() {
  const [track, setTrack] = React.useState(TRACKS[0].id)
  const [email, setEmail] = React.useState("")

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-2 font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Globe2 className="h-5 w-5" />
            </span>
            <span>Horizon Summit</span>
          </a>
          <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
            {NAV.map((item) => (
              <a
                key={item}
                href={"#" + item.toLowerCase()}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item}
              </a>
            ))}
          </nav>
          <Button asChild size="sm">
            <a href="#tickets">
              Register <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </Button>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b bg-gradient-to-b from-primary/10 via-background to-background">
          <div className="mx-auto w-full max-w-4xl px-4 py-20 text-center sm:px-6 lg:py-28">
            <Badge variant="secondary" className="mx-auto mb-6 w-fit gap-1.5">
              <Wifi className="h-3.5 w-3.5" /> 100% online · streamed worldwide
            </Badge>
            <div className="mb-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4 text-primary" /> October 14–15, 2026
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-primary" /> Live from your browser
              </span>
            </div>
            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              The global summit for people who build the web.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Two days, four tracks, forty-eight speakers. Watch live, ask questions in real time,
              and meet the people shaping product, engineering, design, and growth.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <a href="#tickets">
                  Register now <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#agenda">
                  <Play className="mr-1 h-4 w-4" /> Preview the agenda
                </a>
              </Button>
            </div>

            <div className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-4">
              {STATS.map((s) => (
                <div key={s.label} className="rounded-xl border bg-card p-5">
                  <s.icon className="mx-auto h-5 w-5 text-primary" aria-hidden="true" />
                  <div className="mt-2 text-2xl font-bold sm:text-3xl">{s.value}</div>
                  <div className="text-sm text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Agenda with track switcher */}
        <section id="agenda" className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">A track for every role</h2>
            <p className="mt-3 text-muted-foreground">
              Four parallel tracks run all day. Pick one below to see its lineup — switch any time during the event.
            </p>
          </div>

          <Tabs value={track} onValueChange={setTrack} className="mt-10">
            <TabsList className="mx-auto flex h-auto w-full max-w-xl flex-wrap justify-center gap-1">
              {TRACKS.map((t) => (
                <TabsTrigger key={t.id} value={t.id} className="flex-1">
                  {t.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {TRACKS.map((t) => (
              <TabsContent key={t.id} value={t.id} className="mt-8">
                <ol className="space-y-3">
                  {t.sessions.map((s) => (
                    <li key={s.title}>
                      <Card className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center">
                        <div className="flex w-20 shrink-0 items-center gap-1.5 text-sm font-semibold text-primary">
                          <Clock className="h-4 w-4" /> {s.time}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-medium">{s.title}</div>
                          <div className="text-sm text-muted-foreground">{s.speaker}</div>
                        </div>
                        <Badge variant="outline" className="w-fit">{s.tag}</Badge>
                      </Card>
                    </li>
                  ))}
                </ol>
              </TabsContent>
            ))}
          </Tabs>
        </section>

        {/* Speakers */}
        <section id="speakers" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Featured speakers</h2>
              <p className="mt-3 text-muted-foreground">
                Operators and makers from the teams behind products you use every day.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {SPEAKERS.map((sp) => (
                <Card key={sp.name} className="items-center p-6 text-center transition-shadow hover:shadow-sm">
                  <Avatar className="mx-auto h-20 w-20">
                    <AvatarImage src={sp.img} alt="" />
                    <AvatarFallback>{sp.name.slice(0, 1)}</AvatarFallback>
                  </Avatar>
                  <div className="mt-4 font-semibold">{sp.name}</div>
                  <div className="text-sm text-muted-foreground">{sp.role}</div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Tickets */}
        <section id="tickets" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="secondary" className="mx-auto mb-4 w-fit gap-1.5">
              <Ticket className="h-3.5 w-3.5" /> Passes
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Pick your pass</h2>
            <p className="mt-3 text-muted-foreground">
              Start free, or unlock every track, workshop, and the networking lounge.
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
                  {tier.featured && <Badge className="mb-2 w-fit">Most popular</Badge>}
                  <CardTitle>{tier.name}</CardTitle>
                  <div className="mt-2 flex items-baseline gap-1.5">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    <span className="text-sm text-muted-foreground">{tier.note}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3 text-sm">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant={tier.featured ? "default" : "outline"}>
                    {tier.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Sponsors */}
        <section id="sponsors" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
            <p className="text-center text-sm font-medium uppercase tracking-wide text-muted-foreground">
              Backed by teams who build in the open
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {SPONSORS.map((name) => (
                <div
                  key={name}
                  className="flex items-center justify-center gap-2 rounded-lg border bg-card px-4 py-5 text-sm font-semibold text-muted-foreground"
                >
                  <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
                  {name}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Frequently asked</h2>
            <p className="mt-3 text-muted-foreground">Everything you need before you join us online.</p>
          </div>
          <Accordion type="single" collapsible className="mt-10 w-full">
            {FAQ.map((item, i) => (
              <AccordionItem key={item.q} value={"item-" + i}>
                <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Final CTA */}
        <section className="border-t">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="flex flex-col items-center gap-6 px-6 py-12 text-center sm:px-12">
                <h2 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
                  Save your seat for Horizon Summit 2026.
                </h2>
                <p className="max-w-xl text-primary-foreground/80">
                  Register your email to lock in your pass and get the full schedule the moment it drops.
                </p>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
                >
                  <label htmlFor="cta-email" className="sr-only">
                    Email address
                  </label>
                  <Input
                    id="cta-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-background text-foreground"
                  />
                  <Button type="submit" variant="secondary" className="shrink-0">
                    Register now
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Globe2 className="h-5 w-5" />
            </span>
            Horizon Summit
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground" aria-label="Footer">
            {NAV.map((item) => (
              <a key={item} href={"#" + item.toLowerCase()} className="hover:text-foreground">
                {item}
              </a>
            ))}
          </nav>
          <Separator className="md:hidden" />
          <p className="text-sm text-muted-foreground">© 2026 Horizon Summit. Streamed worldwide.</p>
        </div>
      </footer>
    </div>
  )
}
