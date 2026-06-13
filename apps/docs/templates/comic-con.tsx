"use client"
import * as React from "react"
import { Zap, MapPin, Calendar, Ticket, Star, Users, Mic2, Store, ChevronRight, Sparkles, Clock, Twitter, Instagram, Youtube, Twitch } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/registry/ui/accordion"

const STATS = [
  { icon: Star, value: "120+", label: "Featured Guests" },
  { icon: Mic2, value: "85", label: "Panels & Talks" },
  { icon: Store, value: "300+", label: "Exhibitors" },
  { icon: Users, value: "60K", label: "Fans Expected" },
]

const GUESTS = [
  { name: "Nova Reyes", role: "Voice of Starblade", tag: "Anime", initials: "NR" },
  { name: "Dax Holloway", role: "Sketch Artist, Inkfall", tag: "Comics", initials: "DH" },
  { name: "Mira Tanaka", role: "Cosplay Champion 2025", tag: "Cosplay", initials: "MT" },
  { name: "Cole Vance", role: "Director, Neon Saga", tag: "Film", initials: "CV" },
  { name: "Priya Anand", role: "Lead Writer, Voidborn", tag: "Comics", initials: "PA" },
  { name: "Rex Okafor", role: "Pro Gamer, Apex League", tag: "Gaming", initials: "RO" },
  { name: "Lena Frost", role: "Prop Master FX", tag: "Cosplay", initials: "LF" },
  { name: "Theo Marsh", role: "Composer, Game OST", tag: "Music", initials: "TM" },
]

const SCHEDULE: Record<string, { time: string; title: string; room: string; tag: string }[]> = {
  "Fri": [
    { time: "10:00", title: "Opening Ceremony & Keynote", room: "Main Hall", tag: "Featured" },
    { time: "12:30", title: "Inside Voidborn: Writers Panel", room: "Stage B", tag: "Comics" },
    { time: "15:00", title: "Beginner Cosplay Workshop", room: "Studio 2", tag: "Cosplay" },
    { time: "18:00", title: "Apex League Showmatch", room: "Arena", tag: "Gaming" },
  ],
  "Sat": [
    { time: "09:30", title: "Voice Acting Masterclass", room: "Stage A", tag: "Anime" },
    { time: "11:00", title: "Building Props That Light Up", room: "Studio 2", tag: "Cosplay" },
    { time: "14:00", title: "Neon Saga: Behind the Scenes", room: "Main Hall", tag: "Film" },
    { time: "16:30", title: "Sketch Battle Live", room: "Stage B", tag: "Comics" },
    { time: "20:00", title: "Cosplay Masquerade Finals", room: "Main Hall", tag: "Featured" },
  ],
  "Sun": [
    { time: "10:00", title: "Future of Indie Games", room: "Stage A", tag: "Gaming" },
    { time: "12:00", title: "Composing for Worlds", room: "Studio 1", tag: "Music" },
    { time: "14:30", title: "Fan Q&A: The Full Cast", room: "Main Hall", tag: "Featured" },
    { time: "16:00", title: "Closing Party & Giveaways", room: "Arena", tag: "Featured" },
  ],
}

const TIERS = [
  { name: "Day Pass", price: "$45", note: "One day of your choice", perks: ["Exhibitor floor access", "General panels", "Day-of badge pickup"], featured: false },
  { name: "Weekend Badge", price: "$120", note: "All three days", perks: ["Everything in Day Pass", "Priority panel seating", "Exclusive enamel pin", "Fast-lane entry"], featured: true },
  { name: "VIP Vanguard", price: "$320", note: "The full experience", perks: ["Everything in Weekend", "Front-row reserved seats", "Guest meet & greet", "VIP swag crate", "After-party access"], featured: false },
]

const SPONSORS = ["Hyperdrive", "PixelForge", "NovaInk", "RetroByte", "StarLoot", "OmniCon", "Mythweave", "ArcadeX"]

const FAQS = [
  { q: "Where can I pick up my badge?", a: "Badge pickup opens at 8:00 AM each day in the West Lobby. Bring a photo ID and your order confirmation." },
  { q: "Is cosplay allowed?", a: "Absolutely, cosplay is encouraged! Please review the prop and weapons policy before arriving. All large props are subject to a quick safety check." },
  { q: "Are tickets refundable?", a: "Badges are non-refundable but fully transferable up to 7 days before the event. Manage transfers from your account dashboard." },
  { q: "Is the venue accessible?", a: "Yes. The Aurora Convention Center is fully wheelchair accessible with reserved seating, ASL interpreters at main stages, and a sensory quiet room." },
]

export default function ComicConTemplate() {
  const days = Object.keys(SCHEDULE)
  const [activeDay, setActiveDay] = React.useState(days[0])

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
          <a href="#" className="flex items-center gap-2 font-bold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Zap className="h-4 w-4" />
            </span>
            AuroraCon
          </a>
          <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
            <a href="#guests" className="transition-colors hover:text-foreground">Guests</a>
            <a href="#schedule" className="transition-colors hover:text-foreground">Schedule</a>
            <a href="#tickets" className="transition-colors hover:text-foreground">Tickets</a>
            <a href="#faq" className="transition-colors hover:text-foreground">FAQ</a>
          </nav>
          <Button size="sm" className="gap-1.5">
            <Ticket className="h-4 w-4" /> Get Badges
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/15 via-background to-accent" />
          <div className="absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
          <div className="mx-auto w-full max-w-6xl px-4 py-20 md:py-28">
            <Badge variant="secondary" className="mb-5 gap-1.5">
              <Sparkles className="h-3.5 w-3.5" /> 12th Annual Pop Culture Festival
            </Badge>
            <h1 className="max-w-3xl text-5xl font-black uppercase leading-[0.95] tracking-tight md:text-7xl">
              Where every <span className="text-primary">fandom</span> comes alive
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Three electric days of guests, panels, cosplay, and the biggest exhibitor floor on the coast. This is your universe.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm font-medium">
              <span className="flex items-center gap-2 rounded-full border bg-card px-4 py-2">
                <Calendar className="h-4 w-4 text-primary" /> Oct 17 to 19, 2026
              </span>
              <span className="flex items-center gap-2 rounded-full border bg-card px-4 py-2">
                <MapPin className="h-4 w-4 text-primary" /> Aurora Convention Center
              </span>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" className="gap-2">
                <Ticket className="h-4 w-4" /> Grab your badge
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                View full lineup <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Stats band */}
        <section className="border-b bg-primary text-primary-foreground">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-px px-4 py-10 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1 text-center">
                <s.icon className="mb-1 h-6 w-6 opacity-90" />
                <div className="text-3xl font-black tracking-tight">{s.value}</div>
                <div className="text-sm opacity-80">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Guests */}
        <section id="guests" className="mx-auto w-full max-w-6xl px-4 py-20">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <Badge variant="outline" className="mb-3">Featured Guests</Badge>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Meet the legends</h2>
            </div>
            <Button variant="ghost" className="gap-1">See all 120 <ChevronRight className="h-4 w-4" /></Button>
          </div>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {GUESTS.map((g) => (
              <Card key={g.name} className="group overflow-hidden text-center transition-shadow hover:shadow-lg">
                <CardContent className="flex flex-col items-center p-6">
                  <Avatar className="h-20 w-20 ring-2 ring-primary/20 transition-transform group-hover:scale-105">
                    <AvatarImage src="" alt="" />
                    <AvatarFallback className="bg-primary/10 text-lg font-bold text-primary">{g.initials}</AvatarFallback>
                  </Avatar>
                  <h3 className="mt-4 font-semibold">{g.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{g.role}</p>
                  <Badge variant="secondary" className="mt-3">{g.tag}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Schedule */}
        <section id="schedule" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-20">
            <Badge variant="outline" className="mb-3">Programming</Badge>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Day-by-day schedule</h2>
            <p className="mt-2 max-w-lg text-muted-foreground">Pick a day to see the headline panels, workshops, and showmatches on the main stages.</p>

            <div className="mt-8 inline-flex rounded-lg border bg-card p-1">
              {days.map((d) => (
                <button
                  key={d}
                  onClick={() => setActiveDay(d)}
                  className={cn(
                    "rounded-md px-6 py-2 text-sm font-semibold transition-colors",
                    activeDay === d ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                  aria-pressed={activeDay === d}
                >
                  {d === "Fri" ? "Friday" : d === "Sat" ? "Saturday" : "Sunday"}
                </button>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              {SCHEDULE[activeDay].map((item) => (
                <Card key={item.title} className="overflow-hidden">
                  <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center">
                    <div className="flex w-24 shrink-0 items-center gap-2 font-mono text-sm font-semibold text-primary">
                      <Clock className="h-4 w-4" /> {item.time}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" /> {item.room}
                      </p>
                    </div>
                    <Badge variant={item.tag === "Featured" ? "default" : "secondary"}>{item.tag}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Tickets */}
        <section id="tickets" className="mx-auto w-full max-w-6xl px-4 py-20">
          <div className="mb-10 text-center">
            <Badge variant="outline" className="mb-3">Tickets</Badge>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Choose your badge</h2>
            <p className="mx-auto mt-2 max-w-lg text-muted-foreground">Lock in early-bird pricing before it sells out, like it did last year.</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {TIERS.map((t) => (
              <Card key={t.name} className={cn("relative flex flex-col", t.featured && "border-primary shadow-lg")}>
                {t.featured && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>
                )}
                <CardContent className="flex flex-1 flex-col p-7">
                  <h3 className="text-lg font-semibold">{t.name}</h3>
                  <p className="text-sm text-muted-foreground">{t.note}</p>
                  <div className="mt-4 text-4xl font-black tracking-tight">{t.price}</div>
                  <ul className="mt-6 flex-1 space-y-3 text-sm">
                    {t.perks.map((p) => (
                      <li key={p} className="flex items-start gap-2">
                        <Star className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="mt-7 w-full" variant={t.featured ? "default" : "outline"}>
                    Select {t.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Sponsors / exhibitors strip */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-14 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Powered by our partners & exhibitors</p>
            <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
              {SPONSORS.map((s) => (
                <div key={s} className="flex items-center justify-center gap-2 text-lg font-bold tracking-tight text-muted-foreground transition-colors hover:text-foreground">
                  <Store className="h-5 w-5" /> {s}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto w-full max-w-3xl px-4 py-20">
          <div className="mb-10 text-center">
            <Badge variant="outline" className="mb-3">FAQ</Badge>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Before you go</h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-base font-medium">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Final CTA */}
        <section className="relative overflow-hidden border-t bg-primary text-primary-foreground">
          <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-primary-foreground/10 blur-3xl" />
          <div className="mx-auto w-full max-w-6xl px-4 py-20 text-center">
            <h2 className="text-3xl font-black uppercase tracking-tight md:text-5xl">Your adventure starts here</h2>
            <p className="mx-auto mt-4 max-w-md opacity-90">Join 60,000 fans this October. Badges are moving fast.</p>
            <Button size="lg" variant="secondary" className="mt-8 gap-2">
              <Ticket className="h-4 w-4" /> Get your badge now
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t bg-background">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 font-bold">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Zap className="h-3.5 w-3.5" />
              </span>
              AuroraCon
            </div>
            <p className="mt-2 text-sm text-muted-foreground">Aurora Convention Center, Oct 17 to 19, 2026.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Twitter"><Twitter className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon" aria-label="Instagram"><Instagram className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon" aria-label="YouTube"><Youtube className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon" aria-label="Twitch"><Twitch className="h-4 w-4" /></Button>
          </div>
        </div>
        <div className="border-t py-5 text-center text-xs text-muted-foreground">
          (c) 2026 AuroraCon. A celebration of all things fandom.
        </div>
      </footer>
    </div>
  )
}
