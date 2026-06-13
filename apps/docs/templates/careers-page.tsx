"use client"

import * as React from "react"
import {
  ArrowRight,
  Sparkles,
  Heart,
  Rocket,
  Users,
  Globe,
  GraduationCap,
  Coffee,
  Plane,
  HeartPulse,
  Banknote,
  Home,
  MapPin,
  Clock,
  Menu,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const NAV_LINKS = ["Our values", "Life at Lumora", "Open roles", "Benefits"]

const PERKS = [
  {
    icon: Rocket,
    title: "Real ownership",
    description:
      "Small teams, big mandates. You own outcomes end to end and ship work that reaches millions.",
  },
  {
    icon: Globe,
    title: "Remote-first",
    description:
      "Work from anywhere across 19 countries, with quarterly gatherings to connect in person.",
  },
  {
    icon: GraduationCap,
    title: "Grow on purpose",
    description:
      "A generous learning budget, mentorship, and clear paths from your first day to staff level.",
  },
  {
    icon: Heart,
    title: "People first",
    description:
      "Psychological safety, candid feedback, and a culture that treats teammates like adults.",
  },
]

const GALLERY = [
  {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80",
    span: "row-span-2",
    caption: "Team offsite, Lisbon",
  },
  {
    src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=900&q=80",
    span: "",
    caption: "Design critique",
  },
  {
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80",
    span: "",
    caption: "Focus time",
  },
  {
    src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80",
    span: "row-span-2",
    caption: "Launch day",
  },
  {
    src: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=900&q=80",
    span: "",
    caption: "Coffee & code",
  },
]

const DEPARTMENTS = [
  "All",
  "Engineering",
  "Design",
  "Product",
  "Marketing",
  "People",
]

const ROLES = [
  {
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Remote · EU",
    type: "Full-time",
  },
  {
    title: "Staff Backend Engineer",
    department: "Engineering",
    location: "Remote · Global",
    type: "Full-time",
  },
  {
    title: "Product Designer",
    department: "Design",
    location: "Berlin · Hybrid",
    type: "Full-time",
  },
  {
    title: "Design Systems Lead",
    department: "Design",
    location: "Remote · EU",
    type: "Full-time",
  },
  {
    title: "Senior Product Manager",
    department: "Product",
    location: "Remote · Americas",
    type: "Full-time",
  },
  {
    title: "Growth Marketing Manager",
    department: "Marketing",
    location: "London · Hybrid",
    type: "Full-time",
  },
  {
    title: "Content Strategist",
    department: "Marketing",
    location: "Remote · Global",
    type: "Contract",
  },
  {
    title: "People Operations Partner",
    department: "People",
    location: "Berlin · Hybrid",
    type: "Full-time",
  },
]

const BENEFITS = [
  { icon: Banknote, label: "Competitive salary & equity" },
  { icon: HeartPulse, label: "Top-tier health & dental" },
  { icon: Plane, label: "Unlimited paid time off" },
  { icon: Home, label: "Home office stipend" },
  { icon: GraduationCap, label: "$2,500 learning budget" },
  { icon: Coffee, label: "Quarterly team retreats" },
]

const VALUES_STATS = [
  { value: "240+", label: "Lumorians worldwide" },
  { value: "19", label: "Countries" },
  { value: "4.8", label: "Glassdoor rating" },
  { value: "92%", label: "Would refer a friend" },
]

export default function CareersPage() {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [activeDept, setActiveDept] = React.useState("All")

  const filteredRoles =
    activeDept === "All"
      ? ROLES
      : ROLES.filter((role) => role.department === activeDept)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </span>
            Lumora
          </a>
          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link}
              </a>
            ))}
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <Button variant="ghost" size="sm">
              Company site
            </Button>
            <Button size="sm">
              See open roles
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            aria-label="Toggle navigation menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <Menu className="h-4 w-4" />
          </Button>
        </nav>
        {menuOpen && (
          <div className="border-t px-6 py-4 md:hidden">
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {link}
                </a>
              ))}
              <Button size="sm" className="mt-2 w-full">
                See open roles
              </Button>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 text-center lg:py-28">
            <Badge variant="secondary" className="mb-5">
              <Sparkles className="h-3.5 w-3.5" />
              We are hiring across 8 teams
            </Badge>
            <h1 className="mx-auto max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Build the future of work, with people who care.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              At Lumora we are a remote-first team of builders, designers, and
              dreamers shipping tools used by teams in every corner of the world.
              Come do the best work of your career.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <a href="#roles">
                  Explore open roles
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline">
                Read our culture deck
              </Button>
            </div>
            <div className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-8 sm:grid-cols-4">
              {VALUES_STATS.map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-semibold tracking-tight">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why work here */}
        <section className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-4">
              Why Lumora
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              A place to do your life&rsquo;s work
            </h2>
            <p className="mt-4 text-muted-foreground">
              We obsess over the conditions that let great people thrive — and we
              measure ourselves on whether you would do it again.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PERKS.map((perk) => (
              <Card
                key={perk.title}
                className="group transition-shadow hover:shadow-md"
              >
                <CardContent className="p-6">
                  <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <perk.icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-medium">{perk.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {perk.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Life at company */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <div className="max-w-xl">
                <Badge variant="outline" className="mb-4">
                  Life at Lumora
                </Badge>
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Moments from the team
                </h2>
                <p className="mt-4 text-muted-foreground">
                  From launch-day energy to slow mornings with good coffee — a
                  peek at how we work and play together.
                </p>
              </div>
              <Button variant="outline">
                <Users className="h-4 w-4" />
                Meet the team
              </Button>
            </div>
            <div className="mt-12 grid auto-rows-[180px] grid-cols-2 gap-4 lg:grid-cols-4">
              {GALLERY.map((photo, i) => (
                <figure
                  key={i}
                  className={cn(
                    "group relative overflow-hidden rounded-xl border bg-card",
                    photo.span,
                  )}
                >
                  <img
                    src={photo.src}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/70 to-transparent p-3 text-xs font-medium text-background">
                    {photo.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Open roles with department filter */}
        <section id="roles" className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-4">
              Open roles
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Find your next role
            </h2>
            <p className="mt-4 text-muted-foreground">
              Filter by team to find where you fit. Do not see your role? We are
              always glad to hear from exceptional people.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {DEPARTMENTS.map((dept) => {
              const count =
                dept === "All"
                  ? ROLES.length
                  : ROLES.filter((r) => r.department === dept).length
              const active = activeDept === dept
              return (
                <button
                  key={dept}
                  type="button"
                  onClick={() => setActiveDept(dept)}
                  aria-pressed={active}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "bg-card text-muted-foreground hover:text-foreground",
                  )}
                >
                  {dept}
                  <span
                    className={cn(
                      "rounded-full px-1.5 text-xs",
                      active
                        ? "bg-primary-foreground/20"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          <div className="mx-auto mt-10 max-w-3xl space-y-3">
            {filteredRoles.map((role) => (
              <Card
                key={role.title}
                className="group transition-colors hover:border-primary"
              >
                <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{role.title}</h3>
                      <Badge variant="secondary">{role.department}</Badge>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" />
                        {role.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        {role.type}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="shrink-0 self-start sm:self-auto"
                  >
                    Apply
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </CardContent>
              </Card>
            ))}
            {filteredRoles.length === 0 && (
              <p className="py-10 text-center text-sm text-muted-foreground">
                No open roles in this team right now — check back soon.
              </p>
            )}
          </div>
        </section>

        {/* Benefits */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="outline" className="mb-4">
                Benefits & perks
              </Badge>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                We invest in your whole life
              </h2>
              <p className="mt-4 text-muted-foreground">
                Beyond a competitive package, we build benefits that respect your
                time, health, and ambitions.
              </p>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {BENEFITS.map((benefit) => (
                <div
                  key={benefit.label}
                  className="flex items-center gap-4 rounded-xl border bg-card p-5"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <benefit.icon className="h-5 w-5" />
                  </span>
                  <span className="font-medium">{benefit.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Apply CTA */}
        <section className="mx-auto w-full max-w-6xl px-6 py-20">
          <Card className="overflow-hidden border-primary/20 bg-primary text-primary-foreground">
            <CardContent className="flex flex-col items-center gap-6 p-10 text-center sm:p-16">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-foreground/15">
                <Heart className="h-6 w-6" />
              </span>
              <h2 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
                Did not find the perfect fit?
              </h2>
              <p className="max-w-xl text-primary-foreground/80">
                We are always looking for talented people. Send us an open
                application and tell us how you would make Lumora better.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg" variant="secondary">
                  Submit an open application
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  Join our talent network
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="mx-auto w-full max-w-6xl px-6 py-14">
          <div className="grid gap-10 md:grid-cols-4">
            <div>
              <a href="#" className="flex items-center gap-2 font-semibold">
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <Sparkles className="h-4 w-4" />
                </span>
                Lumora
              </a>
              <p className="mt-4 max-w-xs text-sm text-muted-foreground">
                A remote-first company building the tools that help teams do their
                best work, together.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Teams</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                {["Engineering", "Design", "Product", "Marketing"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-foreground">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Company</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                {["About", "Culture", "Blog", "Press"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-foreground">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Hiring questions?</h3>
              <p className="mt-4 text-sm text-muted-foreground">
                Reach our talent team at careers@lumora.example
              </p>
              <Button variant="outline" size="sm" className="mt-4">
                Contact recruiting
              </Button>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
            <p>© 2026 Lumora, Inc. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-foreground">
                Equal opportunity
              </a>
              <a href="#" className="hover:text-foreground">
                Privacy
              </a>
              <a href="#" className="hover:text-foreground">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
