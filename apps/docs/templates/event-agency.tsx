"use client"

import * as React from "react"
import {
  CalendarHeart,
  Sparkles,
  Briefcase,
  Gem,
  Rocket,
  Mic2,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Star,
  ClipboardList,
  PenTool,
  PartyPopper,
  CheckCircle2,
  Menu,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const NAV = ["Services", "Portfolio", "Process", "Clients", "Enquire"]

const STATS = [
  { value: "480+", label: "Signature events" },
  { value: "62k", label: "Guests hosted" },
  { value: "14", label: "Years curating" },
  { value: "98%", label: "Would rebook" },
]

const SERVICES = [
  {
    icon: Briefcase,
    title: "Corporate",
    copy: "Galas, summits and milestone celebrations engineered to impress every stakeholder.",
  },
  {
    icon: Gem,
    title: "Weddings",
    copy: "Bespoke ceremonies and receptions, designed down to the last candlelit detail.",
  },
  {
    icon: Rocket,
    title: "Launches",
    copy: "Product reveals and brand activations that turn a moment into momentum.",
  },
  {
    icon: Mic2,
    title: "Conferences",
    copy: "Multi-day programs with seamless staging, AV and hospitality at scale.",
  },
]

type Category = "All" | "Corporate" | "Weddings" | "Launches" | "Conferences"

const FILTERS: Category[] = ["All", "Corporate", "Weddings", "Launches", "Conferences"]

const PORTFOLIO = [
  { title: "Aurora Investor Gala", category: "Corporate", place: "The Grand Hall", guests: "620 guests" },
  { title: "The Vale Vineyard Wedding", category: "Weddings", place: "Tuscany", guests: "180 guests" },
  { title: "Helio Phone Reveal", category: "Launches", place: "Pier 48", guests: "900 guests" },
  { title: "FutureStack Summit", category: "Conferences", place: "Convention Center", guests: "2,400 guests" },
  { title: "Lumen Year-End Soirée", category: "Corporate", place: "Skyline Terrace", guests: "340 guests" },
  { title: "Coastal Sunset Vows", category: "Weddings", place: "Amalfi Coast", guests: "120 guests" },
] as const

const PROCESS = [
  { icon: ClipboardList, step: "01", title: "Discovery", copy: "We listen, dream and define the vision, budget and guest experience." },
  { icon: PenTool, step: "02", title: "Design", copy: "Mood boards, floor plans and a detailed run-of-show for every minute." },
  { icon: PartyPopper, step: "03", title: "Production", copy: "Vendors, staging and logistics handled by a dedicated lead team." },
  { icon: CheckCircle2, step: "04", title: "Showtime", copy: "We run the day end-to-end so you can stay fully in the moment." },
]

const CLIENTS = ["Northwind", "Lumen Co.", "Vela", "Atlas Group", "Meridian", "Helio"]

const TESTIMONIALS = [
  {
    quote:
      "They turned our annual summit into the event everyone talks about all year. Flawless from invite to encore.",
    name: "Priya Anand",
    role: "VP Events, Northwind",
    initials: "PA",
  },
  {
    quote:
      "Our wedding felt like a dream we didn't have to manage. Every detail was anticipated before we asked.",
    name: "Marcus & Lia",
    role: "Newlyweds",
    initials: "ML",
  },
  {
    quote:
      "The product launch generated more press than our last three combined. The staging was simply unreal.",
    name: "Devon Cole",
    role: "CMO, Helio",
    initials: "DC",
  },
]

export default function EventAgency() {
  const [filter, setFilter] = React.useState<Category>("All")

  const events = PORTFOLIO.filter((e) => filter === "All" || e.category === filter)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <CalendarHeart className="h-4 w-4" />
            </span>
            <span className="text-lg">Lumière Events</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            {NAV.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="transition-colors hover:text-foreground">
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button className="hidden sm:inline-flex" size="sm">
              Plan your event
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
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="secondary" className="mb-6 gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                Full-service event design studio
              </Badge>
              <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                We craft events the room never forgets
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-pretty text-lg text-muted-foreground">
                From intimate ceremonies to global summits, Lumière designs and produces unforgettable
                experiences end to end.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button size="lg" className="gap-2">
                  Start planning
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  View our work
                </Button>
              </div>
            </div>

            {/* Stat band */}
            <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="bg-card px-4 py-6 text-center">
                  <div className="text-3xl font-semibold tracking-tight text-primary">{s.value}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <div className="mb-12 max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-widest text-primary">What we do</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                Services tuned to your occasion
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {SERVICES.map((svc) => (
                <Card key={svc.title} className="group transition-shadow hover:shadow-md">
                  <CardContent className="pt-6">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <svc.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold">{svc.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{svc.copy}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio with filter chips */}
        <section id="portfolio" className="border-b">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-medium uppercase tracking-widest text-primary">Selected work</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">A gallery of signature events</h2>
              </div>
            </div>

            <div className="mb-8 flex flex-wrap gap-2">
              {FILTERS.map((f) => {
                const active = filter === f
                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFilter(f)}
                    aria-pressed={active}
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "bg-card text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {f}
                  </button>
                )
              })}
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((e) => (
                <Card key={e.title} className="overflow-hidden">
                  <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-primary/15 via-muted to-accent">
                    <CalendarHeart className="h-10 w-10 text-primary/50" aria-hidden="true" />
                  </div>
                  <CardContent className="pt-5">
                    <Badge variant="outline" className="mb-3">
                      {e.category}
                    </Badge>
                    <h3 className="text-base font-semibold">{e.title}</h3>
                    <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {e.place}
                      </span>
                      <span>{e.guests}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {events.length === 0 && (
              <p className="py-12 text-center text-sm text-muted-foreground">No events in this category yet.</p>
            )}
          </div>
        </section>

        {/* Process timeline */}
        <section id="process" className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <div className="mb-12 max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-widest text-primary">How it works</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">From idea to standing ovation</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-4">
              {PROCESS.map((p, i) => (
                <div key={p.step} className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <p.icon className="h-5 w-5" />
                  </div>
                  {i < PROCESS.length - 1 && (
                    <div className="absolute left-12 top-6 hidden h-px w-[calc(100%-3rem)] bg-border md:block" />
                  )}
                  <div className="mt-4 text-sm font-semibold text-muted-foreground">{p.step}</div>
                  <h3 className="mt-1 text-lg font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Client logos */}
        <section id="clients" className="border-b">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
            <p className="text-center text-sm text-muted-foreground">Trusted by teams who host at scale</p>
            <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
              {CLIENTS.map((c) => (
                <div
                  key={c}
                  className="flex items-center justify-center rounded-lg border bg-card py-5 text-base font-semibold tracking-tight text-muted-foreground"
                >
                  {c}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <div className="mb-12 max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-widest text-primary">Kind words</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Loved by hosts and guests alike</h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <Card key={t.name} className="flex flex-col">
                  <CardContent className="flex flex-1 flex-col pt-6">
                    <div className="flex gap-0.5 text-primary">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <p className="mt-4 flex-1 text-pretty text-sm leading-relaxed text-foreground">“{t.quote}”</p>
                    <Separator className="my-5" />
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{t.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-semibold">{t.name}</div>
                        <div className="text-xs text-muted-foreground">{t.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Enquire CTA */}
        <section id="enquire">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <div className="grid gap-10 rounded-3xl border bg-card p-8 lg:grid-cols-2 lg:p-12">
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Let's plan something unforgettable</h2>
                <p className="mt-4 max-w-md text-muted-foreground">
                  Tell us about your event and our team will reply within one business day with availability and ideas.
                </p>
                <div className="mt-8 space-y-3 text-sm">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Phone className="h-4 w-4 text-primary" />
                    +1 (212) 555-0148
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Mail className="h-4 w-4 text-primary" />
                    hello@lumiere-events.com
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary" />
                    24 Lantern Street, New York
                  </div>
                </div>
              </div>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full name</Label>
                    <Input id="name" placeholder="Jordan Avery" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="you@company.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Event type</Label>
                  <Input id="type" placeholder="Corporate gala, wedding, launch…" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="details">Tell us more</Label>
                  <Textarea id="details" rows={4} placeholder="Date, guest count, location and the vibe you're after." />
                </div>
                <Button type="submit" size="lg" className="w-full gap-2">
                  Send enquiry
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-muted/30">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <div className="flex items-center gap-2 font-semibold text-foreground">
            <CalendarHeart className="h-4 w-4 text-primary" />
            Lumière Events
          </div>
          <p>© 2026 Lumière Events. Crafting moments that matter.</p>
          <div className="flex gap-5">
            <a href="#services" className="hover:text-foreground">Services</a>
            <a href="#portfolio" className="hover:text-foreground">Portfolio</a>
            <a href="#enquire" className="hover:text-foreground">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
