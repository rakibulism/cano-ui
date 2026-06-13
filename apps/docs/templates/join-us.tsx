"use client"

import * as React from "react"
import {
  ArrowRight,
  Rocket,
  Heart,
  Globe,
  Sparkles,
  Users,
  Compass,
  Shield,
  Zap,
  Coffee,
  Plane,
  GraduationCap,
  HeartPulse,
  Home,
  MapPin,
  Clock,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const NAV_LINKS = [
  { label: "Mission", href: "#mission" },
  { label: "Why join", href: "#why" },
  { label: "Culture", href: "#culture" },
  { label: "Roles", href: "#roles" },
]

const BENEFITS = [
  {
    icon: Rocket,
    title: "Real ownership",
    body: "Ship work that reaches millions in your first weeks. No layers, no busywork — just impact.",
  },
  {
    icon: Globe,
    title: "Remote-first",
    body: "Work from anywhere across 14 time zones. We design every ritual around async-by-default.",
  },
  {
    icon: GraduationCap,
    title: "Grow fast",
    body: "A yearly learning budget, mentorship, and the kind of problems that make you better.",
  },
  {
    icon: Zap,
    title: "Move with speed",
    body: "Tiny teams, sharp focus. We make decisions in hours, not quarters.",
  },
]

const VALUES = [
  {
    icon: Compass,
    title: "Default to curiosity",
    body: "We ask the question behind the question and stay humble about what we don't know yet.",
  },
  {
    icon: Heart,
    title: "Care out loud",
    body: "Direct feedback is a gift. We give it with kindness and receive it with grace.",
  },
  {
    icon: Shield,
    title: "Earn the trust",
    body: "We do the right thing when no one is watching and own our outcomes, good and bad.",
  },
]

const GALLERY = [
  { label: "Offsite in Lisbon", tone: "bg-primary/10" },
  { label: "Demo Friday", tone: "bg-secondary" },
  { label: "Pairing session", tone: "bg-accent" },
  { label: "Launch day", tone: "bg-muted" },
  { label: "Team lunch", tone: "bg-primary/10" },
  { label: "Hack week", tone: "bg-secondary" },
]

const DEPARTMENTS = ["All", "Engineering", "Design", "Product", "Go-to-market"]

const ROLES = [
  {
    title: "Senior Frontend Engineer",
    dept: "Engineering",
    location: "Remote · EU",
    type: "Full-time",
  },
  {
    title: "Platform Engineer",
    dept: "Engineering",
    location: "Remote · Global",
    type: "Full-time",
  },
  {
    title: "Product Designer",
    dept: "Design",
    location: "Remote · Americas",
    type: "Full-time",
  },
  {
    title: "Brand Designer",
    dept: "Design",
    location: "Remote · EU",
    type: "Contract",
  },
  {
    title: "Group Product Manager",
    dept: "Product",
    location: "Remote · Global",
    type: "Full-time",
  },
  {
    title: "Product Operations Lead",
    dept: "Product",
    location: "Remote · EU",
    type: "Full-time",
  },
  {
    title: "Account Executive",
    dept: "Go-to-market",
    location: "Remote · Americas",
    type: "Full-time",
  },
  {
    title: "Developer Advocate",
    dept: "Go-to-market",
    location: "Remote · Global",
    type: "Full-time",
  },
]

const PERKS = [
  { icon: Plane, label: "4 weeks paid leave" },
  { icon: HeartPulse, label: "Full health cover" },
  { icon: Home, label: "Home office stipend" },
  { icon: Coffee, label: "Quarterly offsites" },
  { icon: GraduationCap, label: "$2k learning budget" },
  { icon: Sparkles, label: "Equity for everyone" },
]

const STATS = [
  { value: "62", label: "Teammates" },
  { value: "14", label: "Countries" },
  { value: "4.9", label: "Glassdoor" },
  { value: "100%", label: "Remote" },
]

export default function JoinOurMissionPage() {
  const [activeDept, setActiveDept] = React.useState("All")

  const filteredRoles =
    activeDept === "All"
      ? ROLES
      : ROLES.filter((role) => role.dept === activeDept)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-2 font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Rocket className="h-4 w-4" aria-hidden="true" />
            </span>
            Northbound
          </a>
          <div className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>
          <Button asChild size="sm">
            <a href="#roles">
              See roles
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
        </nav>
      </header>

      <main id="top" className="flex flex-col">
        {/* Hero */}
        <section
          id="mission"
          className="relative overflow-hidden border-b bg-muted/30"
        >
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
            <div className="flex flex-col justify-center">
              <Badge variant="secondary" className="w-fit gap-1.5">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                We are hiring across 4 teams
              </Badge>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Build the tools that put creators back in control.
              </h1>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                Northbound is on a mission to make independent work sustainable
                for everyone. Join a small, senior team solving hard problems
                with care, speed, and a lot of heart.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button asChild size="lg">
                  <a href="#roles">
                    See open roles
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="#mission">Read our mission</a>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 self-center">
              {STATS.map((stat) => (
                <Card key={stat.label} className="bg-card">
                  <CardContent className="flex flex-col items-start gap-1 p-6">
                    <span className="text-3xl font-semibold tracking-tight">
                      {stat.value}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {stat.label}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why join */}
        <section id="why" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-wider text-primary">
              Why join
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              The good kind of hard work.
            </h2>
            <p className="mt-4 text-muted-foreground">
              We hire people who want to do the best work of their careers — and
              we build the conditions to make that possible.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((benefit) => (
              <Card key={benefit.title} className="h-full">
                <CardHeader>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <benefit.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <CardTitle className="mt-4 text-lg">
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {benefit.body}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-xl">
                <p className="text-sm font-medium uppercase tracking-wider text-primary">
                  Our values
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  What we hold to, every day.
                </h2>
              </div>
              <p className="max-w-sm text-sm text-muted-foreground">
                These are not posters on a wall. They are how we hire, give
                feedback, and decide what to build next.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {VALUES.map((value, index) => (
                <div
                  key={value.title}
                  className="flex flex-col rounded-2xl border bg-card p-7"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <value.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-medium text-muted-foreground">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-semibold">{value.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {value.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Culture gallery */}
        <section
          id="culture"
          className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6"
        >
          <div className="flex items-center gap-2 text-primary">
            <Users className="h-5 w-5" aria-hidden="true" />
            <p className="text-sm font-medium uppercase tracking-wider">
              Life at Northbound
            </p>
          </div>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            A team you'll actually look forward to seeing.
          </h2>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
            {GALLERY.map((item, index) => (
              <div
                key={item.label}
                className={cn(
                  "group relative flex items-end overflow-hidden rounded-2xl border p-5",
                  item.tone,
                  index === 0 && "col-span-2 row-span-2 md:col-span-2"
                )}
              >
                <div
                  className={cn(
                    "aspect-[4/3] w-full",
                    index === 0 && "aspect-[16/10]"
                  )}
                  aria-hidden="true"
                />
                <span className="absolute bottom-4 left-5 text-sm font-medium text-foreground">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Open roles */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <div id="roles" className="max-w-2xl scroll-mt-20">
              <p className="text-sm font-medium uppercase tracking-wider text-primary">
                Open roles
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Find your seat.
              </h2>
              <p className="mt-4 text-muted-foreground">
                {filteredRoles.length} open{" "}
                {filteredRoles.length === 1 ? "role" : "roles"}
                {activeDept !== "All" ? ` in ${activeDept}` : " across the team"}.
              </p>
            </div>

            <Tabs
              value={activeDept}
              onValueChange={setActiveDept}
              className="mt-8"
            >
              <TabsList className="flex h-auto flex-wrap justify-start gap-1 bg-transparent p-0">
                {DEPARTMENTS.map((dept) => (
                  <TabsTrigger
                    key={dept}
                    value={dept}
                    className="rounded-full border bg-background px-4 py-1.5 data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    {dept}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="mt-8 flex flex-col gap-3">
              {filteredRoles.map((role) => (
                <div
                  key={role.title}
                  className="group flex flex-col gap-4 rounded-xl border bg-card p-5 transition-colors hover:border-primary sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold">{role.title}</h3>
                      <Badge variant="secondary">{role.dept}</Badge>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" aria-hidden="true" />
                        {role.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" aria-hidden="true" />
                        {role.type}
                      </span>
                    </div>
                  </div>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    <a href="#apply">
                      Apply
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </Button>
                </div>
              ))}

              {filteredRoles.length === 0 && (
                <div className="rounded-xl border border-dashed bg-card p-10 text-center text-sm text-muted-foreground">
                  No open roles here right now — but we always want to meet great
                  people.
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Perks strip */}
        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex flex-col gap-8 rounded-3xl border bg-card p-8 sm:p-10">
            <div className="flex items-center gap-3">
              <Heart className="h-5 w-5 text-primary" aria-hidden="true" />
              <h2 className="text-xl font-semibold">Perks that have your back</h2>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-6">
              {PERKS.map((perk) => (
                <div key={perk.label} className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <perk.icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-medium">{perk.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Apply CTA */}
        <section
          id="apply"
          className="mx-auto w-full max-w-6xl px-4 pb-24 pt-4 sm:px-6"
        >
          <div className="relative overflow-hidden rounded-3xl border bg-primary px-6 py-16 text-center text-primary-foreground sm:px-12">
            <div className="mx-auto max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Don't see your role? Reach out anyway.
              </h2>
              <p className="mt-4 text-primary-foreground/80">
                We're always looking for thoughtful, driven people. Tell us how
                you'd help push the mission forward.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button asChild size="lg" variant="secondary">
                  <a href="#roles">
                    Browse open roles
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  <a href="#apply">Email the team</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <div className="flex items-center gap-2 font-semibold text-foreground">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Rocket className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            Northbound
          </div>
          <p>Building the future of independent work. Remote, everywhere.</p>
          <p>© 2026 Northbound, Inc.</p>
        </div>
      </footer>
    </div>
  )
}
