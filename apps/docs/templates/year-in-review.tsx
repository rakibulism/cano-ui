"use client"
import * as React from "react"
import {
  Sparkles,
  TrendingUp,
  Users,
  Rocket,
  Heart,
  ArrowRight,
  Star,
  Trophy,
  Calendar,
  Zap,
  Globe,
  PartyPopper,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const YEAR = "2025"

const STATS = [
  { icon: Users, label: "Customers onboarded", value: "12,480", delta: "+214%", caption: "from 3,970 last year" },
  { icon: TrendingUp, label: "Revenue growth", value: "3.8x", delta: "+280%", caption: "ARR year over year" },
  { icon: Rocket, label: "Features shipped", value: "147", delta: "+62%", caption: "across 38 releases" },
  { icon: Globe, label: "Countries reached", value: "64", delta: "+19", caption: "new markets entered" },
]

const HIGHLIGHTS = [
  { icon: Zap, label: "API calls served", value: "9.2B" },
  { icon: Star, label: "5-star reviews", value: "4,310" },
  { icon: Trophy, label: "Awards won", value: "7" },
]

const TIMELINE = [
  { month: "Jan", title: "Series A closed", body: "Raised $14M to scale the platform and grow the team.", tag: "Funding" },
  { month: "Mar", title: "Workflows v2 launched", body: "Rebuilt automation engine, 4x faster runs out of the box.", tag: "Product" },
  { month: "May", title: "Hit 5,000 customers", body: "Crossed a milestone we once dreamed about in a garage.", tag: "Growth" },
  { month: "Jul", title: "Opened EU region", body: "Data residency in Frankfurt unlocked enterprise demand.", tag: "Infra" },
  { month: "Sep", title: "AI Copilot shipped", body: "Natural-language building landed for every plan tier.", tag: "Product" },
  { month: "Nov", title: "100k community members", body: "Our Discord and forum became the place to learn.", tag: "Community" },
  { month: "Dec", title: "SOC 2 Type II", body: "Closed the year audit-ready for the biggest teams.", tag: "Trust" },
]

const TEAM = [
  { name: "Maya Chen", role: "Co-founder & CEO", img: "https://i.pravatar.cc/120?img=47" },
  { name: "Dev Okafor", role: "Co-founder & CTO", img: "https://i.pravatar.cc/120?img=12" },
  { name: "Priya Nair", role: "Head of Product", img: "https://i.pravatar.cc/120?img=32" },
  { name: "Leo Marín", role: "VP Engineering", img: "https://i.pravatar.cc/120?img=15" },
  { name: "Sara Kim", role: "Head of Design", img: "https://i.pravatar.cc/120?img=49" },
  { name: "Tomás Reyes", role: "Head of Growth", img: "https://i.pravatar.cc/120?img=53" },
]

const WHATS_NEXT = [
  { title: "Open-source SDK", body: "Build on our primitives with a fully typed, community-driven SDK." },
  { title: "Realtime collaboration", body: "Multiplayer editing across every surface, no refresh required." },
  { title: "Marketplace launch", body: "Install and monetize templates, integrations, and add-ons." },
]

export default function YearInReviewPage() {
  const [tab, setTab] = React.useState<"all" | "Product" | "Growth">("all")

  const filteredTimeline = TIMELINE.filter((item) =>
    tab === "all" ? true : item.tag === tab
  )

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
            </span>
            Nimbus
          </div>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#stats" className="transition-colors hover:text-foreground">By the numbers</a>
            <a href="#timeline" className="transition-colors hover:text-foreground">Timeline</a>
            <a href="#team" className="transition-colors hover:text-foreground">The team</a>
            <a href="#next" className="transition-colors hover:text-foreground">What's next</a>
          </nav>
          <Button size="sm">Read the blog</Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 bg-primary/10" aria-hidden="true" />
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" aria-hidden="true" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-accent blur-3xl" aria-hidden="true" />
          <div className="relative mx-auto w-full max-w-6xl px-6 py-24 text-center">
            <Badge variant="secondary" className="mb-6 gap-1.5">
              <PartyPopper className="h-3.5 w-3.5" aria-hidden="true" />
              Nimbus Wrapped
            </Badge>
            <div className="flex items-center justify-center gap-3 text-7xl font-black tracking-tighter sm:text-8xl lg:text-9xl">
              <span className="text-primary">{YEAR}</span>
            </div>
            <h1 className="mx-auto mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
              A year of momentum, milestones, and a lot of you.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
              We shipped more, grew faster, and built closer to our community than ever before. Here's everything that happened.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Button size="lg" className="gap-2">
                Explore the recap
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button size="lg" variant="outline">
                Watch the highlight reel
              </Button>
            </div>

            <div className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
              {HIGHLIGHTS.map((h) => (
                <div key={h.label} className="rounded-2xl border bg-card/60 px-5 py-6 backdrop-blur">
                  <h.icon className="mx-auto h-5 w-5 text-primary" aria-hidden="true" />
                  <div className="mt-3 text-3xl font-extrabold tracking-tight">{h.value}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{h.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Big numbers */}
        <section id="stats" className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="mb-10 text-center">
            <Badge variant="outline" className="mb-3">By the numbers</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">The year in big numbers</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Every metric that mattered, and how far we've come since {YEAR === "2025" ? "2024" : "last year"}.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <Card
                key={s.label}
                className={cn(
                  "overflow-hidden transition-shadow hover:shadow-lg",
                  i === 0 && "border-primary"
                )}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <s.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <Badge variant="secondary" className="gap-1 text-primary">
                      <TrendingUp className="h-3 w-3" aria-hidden="true" />
                      {s.delta}
                    </Badge>
                  </div>
                  <div className="mt-5 text-4xl font-black tracking-tight">{s.value}</div>
                  <div className="mt-1 font-medium">{s.label}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{s.caption}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section id="timeline" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="mb-10 flex flex-col items-center text-center">
              <Badge variant="outline" className="mb-3 gap-1.5">
                <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                Month by month
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Twelve months of milestones</h2>
              <div className="mt-6 inline-flex rounded-full border bg-background p-1">
                {(["all", "Product", "Growth"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTab(t)}
                    className={cn(
                      "rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors",
                      tab === t
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {t === "all" ? "All moments" : t}
                  </button>
                ))}
              </div>
            </div>

            <ol className="relative mx-auto max-w-3xl space-y-6 before:absolute before:left-[1.15rem] before:top-2 before:h-full before:w-px before:bg-border">
              {filteredTimeline.map((item) => (
                <li key={item.title} className="relative flex gap-5">
                  <span className="relative z-10 flex h-10 w-10 flex-none items-center justify-center rounded-full border bg-background text-xs font-bold uppercase text-primary">
                    {item.month}
                  </span>
                  <Card className="flex-1">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-semibold">{item.title}</h3>
                        <Badge variant="secondary" className="flex-none">{item.tag}</Badge>
                      </div>
                      <p className="mt-1.5 text-sm text-muted-foreground">{item.body}</p>
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Team shoutout */}
        <section id="team" className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="mb-10 text-center">
            <Badge variant="outline" className="mb-3 gap-1.5">
              <Heart className="h-3.5 w-3.5" aria-hidden="true" />
              The people behind it
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">None of this happens without the team</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              42 humans across 9 time zones who turned a wild plan into a real year.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {TEAM.map((p) => (
              <div key={p.name} className="flex flex-col items-center rounded-2xl border bg-card p-5 text-center transition-colors hover:bg-accent">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={p.img} alt="" />
                  <AvatarFallback>{p.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <div className="mt-3 text-sm font-semibold">{p.name}</div>
                <div className="text-xs text-muted-foreground">{p.role}</div>
              </div>
            ))}
          </div>
        </section>

        {/* What's next */}
        <section id="next" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="mb-10 text-center">
              <Badge variant="outline" className="mb-3 gap-1.5">
                <Rocket className="h-3.5 w-3.5" aria-hidden="true" />
                Coming next
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">A sneak peek at what's next</h2>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                If this year was about momentum, next year is about reach. Here's where we're headed.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {WHATS_NEXT.map((n, i) => (
                <Card key={n.title} className="relative overflow-hidden">
                  <CardContent className="p-6">
                    <span className="text-5xl font-black text-primary/20">0{i + 1}</span>
                    <h3 className="mt-3 text-lg font-semibold">{n.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{n.body}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Thank-you CTA */}
        <section className="mx-auto w-full max-w-6xl px-6 py-24">
          <div className="relative overflow-hidden rounded-3xl border bg-primary px-8 py-16 text-center text-primary-foreground">
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary-foreground/10 blur-2xl" aria-hidden="true" />
            <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-primary-foreground/10 blur-2xl" aria-hidden="true" />
            <div className="relative">
              <Heart className="mx-auto h-8 w-8" aria-hidden="true" />
              <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
                Thank you for an unforgettable {YEAR}.
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-primary-foreground/80">
                Be the first to hear what we build next. Drop your email and join the journey.
              </p>
              <form className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
                <Input
                  type="email"
                  placeholder="you@company.com"
                  aria-label="Email address"
                  className="border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/60"
                />
                <Button type="submit" variant="secondary" className="gap-2">
                  Stay in the loop
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2 font-semibold text-foreground">
            <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
            Nimbus
          </div>
          <Separator className="sm:hidden" />
          <p>Here's to an even bigger {YEAR === "2025" ? "2026" : "next year"}.</p>
        </div>
      </footer>
    </div>
  )
}
