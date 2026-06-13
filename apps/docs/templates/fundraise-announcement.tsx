"use client"
import * as React from "react"
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Users,
  Rocket,
  Globe,
  ShieldCheck,
  Building2,
  Zap,
  Heart,
  Star,
  Quote,
  Mail,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

const STATS = [
  { label: "Raised", value: "$24M", sub: "Series A" },
  { label: "Customers", value: "1,800+", sub: "teams onboard" },
  { label: "ARR growth", value: "4.6x", sub: "year over year" },
  { label: "Team", value: "62", sub: "and growing" },
] as const

const MEANING = [
  {
    icon: Zap,
    title: "Build faster",
    body: "We are doubling our engineering team to ship the roadmap our customers have been asking for at twice the pace.",
  },
  {
    icon: Globe,
    title: "Go global",
    body: "New data regions in the EU and APAC, plus localized onboarding so teams everywhere get the same first-class experience.",
  },
  {
    icon: ShieldCheck,
    title: "Earn deeper trust",
    body: "Investing in security, compliance, and reliability so the largest organizations can standardize on Northbeam.",
  },
] as const

const BUILDING = [
  {
    tag: "Q3",
    title: "Realtime collaboration",
    body: "Multiplayer editing across every surface, so your whole org moves on one shared source of truth.",
  },
  {
    tag: "Q3",
    title: "Workflow automations",
    body: "A no-code builder that turns repetitive operations into reliable, auditable pipelines.",
  },
  {
    tag: "Q4",
    title: "Northbeam Intelligence",
    body: "An assistant that drafts, summarizes, and forecasts directly inside the work you already do.",
  },
  {
    tag: "Q4",
    title: "Enterprise controls",
    body: "Granular permissions, SSO everywhere, and SOC 2 Type II to meet the bar of regulated industries.",
  },
] as const

const ROLES = [
  { title: "Senior Product Engineer", team: "Engineering", location: "Remote · Americas" },
  { title: "Staff Designer", team: "Design", location: "Remote · Global" },
  { title: "Developer Advocate", team: "Growth", location: "Remote · EU" },
  { title: "Enterprise Account Executive", team: "Sales", location: "New York, NY" },
  { title: "Solutions Architect", team: "Customer", location: "Remote · APAC" },
  { title: "Security Engineer", team: "Platform", location: "Remote · Americas" },
] as const

const INVESTORS = [
  { name: "Meridian Capital", note: "Lead · Series A" },
  { name: "Foundry Ventures", note: "Seed + A" },
  { name: "Northstar Partners", note: "Strategic" },
  { name: "Atlas Seed", note: "Pre-seed" },
  { name: "Cohort Fund", note: "Series A" },
  { name: "Beacon Angels", note: "Angels" },
] as const

export default function FundraiseAnnouncementPage() {
  const [email, setEmail] = React.useState("")
  const [subscribed, setSubscribed] = React.useState(false)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Rocket className="h-4 w-4" aria-hidden="true" />
            </div>
            <span className="text-base font-semibold tracking-tight">Northbeam</span>
          </div>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex" aria-label="Primary">
            <a href="#meaning" className="transition-colors hover:text-foreground">What it means</a>
            <a href="#building" className="transition-colors hover:text-foreground">What we are building</a>
            <a href="#hiring" className="transition-colors hover:text-foreground">Careers</a>
            <a href="#investors" className="transition-colors hover:text-foreground">Investors</a>
          </nav>
          <Button size="sm" asChild={false}>
            Read the post
            <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="pointer-events-none absolute inset-0 bg-primary/5" aria-hidden="true" />
          <div className="relative mx-auto w-full max-w-6xl px-6 py-24 text-center">
            <Badge variant="secondary" className="mb-6 gap-1.5">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Big news · June 2026
            </Badge>
            <h1 className="mx-auto max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              We raised a{" "}
              <span className="text-primary">$24M Series A</span> to build the future of teamwork
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
              Led by Meridian Capital, with participation from every investor who has
              believed in us since day one. Today is a milestone, and it is only the beginning.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg">
                Read the announcement
                <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
              </Button>
              <Button size="lg" variant="outline">
                See open roles
              </Button>
            </div>
            <p className="mt-5 text-sm text-muted-foreground">
              Joined by <span className="font-medium text-foreground">1,800+ teams</span> already building with Northbeam.
            </p>
          </div>

          {/* Stats strip */}
          <div className="relative mx-auto w-full max-w-6xl px-6 pb-16">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-border md:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="bg-card p-6 text-center">
                  <div className="text-3xl font-bold tracking-tight text-primary">{s.value}</div>
                  <div className="mt-1 text-sm font-medium">{s.label}</div>
                  <div className="text-xs text-muted-foreground">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lead investor quote */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-4xl px-6 py-16">
            <Quote className="h-9 w-9 text-primary" aria-hidden="true" />
            <blockquote className="mt-4 text-pretty text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
              Northbeam has the rare combination of explosive growth and genuine customer
              love. We are thrilled to lead this round and back the team for the long haul.
            </blockquote>
            <div className="mt-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Building2 className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <div className="text-sm font-semibold">Dana Okafor</div>
                <div className="text-sm text-muted-foreground">General Partner, Meridian Capital</div>
              </div>
            </div>
          </div>
        </section>

        {/* What it means */}
        <section id="meaning" className="border-b">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="max-w-2xl">
              <Badge variant="outline" className="mb-4">What it means</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                More fuel for the mission you care about
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                This round lets us invest in the three things our customers tell us matter most.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {MEANING.map((m) => {
                const Icon = m.icon
                return (
                  <Card key={m.title} className="border bg-card">
                    <CardContent className="p-6">
                      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <h3 className="text-lg font-semibold">{m.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{m.body}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* What we are building */}
        <section id="building" className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <Badge variant="outline" className="mb-4">What we are building</Badge>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  The roadmap this round unlocks
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  A preview of what is shipping over the next two quarters.
                </p>
              </div>
              <div className="hidden items-center gap-2 text-sm text-muted-foreground md:flex">
                <TrendingUp className="h-4 w-4 text-primary" aria-hidden="true" />
                Shipping continuously
              </div>
            </div>
            <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2">
              {BUILDING.map((b) => (
                <div key={b.title} className="group bg-card p-7 transition-colors hover:bg-accent">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{b.tag}</Badge>
                    <Star className="h-4 w-4 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold tracking-tight">{b.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{b.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* We are hiring */}
        <section id="hiring" className="border-b">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <Badge variant="outline" className="mb-4 gap-1.5">
                  <Users className="h-3.5 w-3.5" aria-hidden="true" />
                  We are hiring
                </Badge>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Come build the next chapter with us
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  We are growing across every team. Remote-first, with a culture built on
                  ownership and care.
                </p>
              </div>
              <Button variant="outline">View all openings</Button>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ROLES.map((r) => (
                <a
                  key={r.title}
                  href="#apply"
                  className={cn(
                    "group flex flex-col rounded-xl border bg-card p-5",
                    "transition-colors hover:border-primary"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{r.team}</Badge>
                    <ArrowRight
                      className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mt-4 text-base font-semibold">{r.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{r.location}</p>
                </a>
              ))}
            </div>
            <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
              <Heart className="h-4 w-4 text-primary" aria-hidden="true" />
              Full benefits, equity for everyone, and a generous learning stipend.
            </div>
          </div>
        </section>

        {/* Investors */}
        <section id="investors" className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="outline" className="mb-4">Backed by the best</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Investors who believe in the mission
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Grateful to partner with funds and operators who have backed category leaders.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-3">
              {INVESTORS.map((inv) => (
                <div key={inv.name} className="flex flex-col items-center justify-center gap-2 bg-card px-6 py-10 text-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                    <Building2 className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="text-sm font-semibold">{inv.name}</div>
                  <div className="text-xs text-muted-foreground">{inv.note}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="apply" className="border-b">
          <div className="mx-auto w-full max-w-5xl px-6 py-20">
            <Card className="overflow-hidden border bg-primary text-primary-foreground">
              <CardContent className="p-10 text-center sm:p-14">
                <Sparkles className="mx-auto h-9 w-9" aria-hidden="true" />
                <h2 className="mx-auto mt-4 max-w-2xl text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                  Be part of what comes next
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-pretty text-primary-foreground/80">
                  Get product updates, hiring drops, and the occasional behind-the-scenes note
                  straight to your inbox.
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    if (email.trim()) setSubscribed(true)
                  }}
                  className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
                >
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                    <Input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      aria-label="Email address"
                      className="bg-background pl-9 text-foreground"
                    />
                  </div>
                  <Button type="submit" variant="secondary" size="lg">
                    {subscribed ? "Subscribed" : "Keep me posted"}
                  </Button>
                </form>
                {subscribed && (
                  <p className="mt-4 text-sm text-primary-foreground/80">
                    Thanks for subscribing. Welcome aboard.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="bg-background">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Rocket className="h-3.5 w-3.5" aria-hidden="true" />
            </div>
            <span className="text-sm font-semibold">Northbeam</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 Northbeam, Inc. Building the future of teamwork.
          </p>
          <nav className="flex items-center gap-5 text-sm text-muted-foreground" aria-label="Footer">
            <a href="#meaning" className="transition-colors hover:text-foreground">Blog</a>
            <a href="#hiring" className="transition-colors hover:text-foreground">Careers</a>
            <a href="#investors" className="transition-colors hover:text-foreground">Press</a>
          </nav>
        </div>
      </footer>
    </div>
  )
}
