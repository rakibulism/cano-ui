"use client"

import * as React from "react"
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CircleDot,
  Coffee,
  Figma,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Palette,
  Quote,
  Sparkles,
  Star,
  Twitter,
  Zap,
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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const NAV = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
]

const STATS = [
  { value: "8+", label: "Years freelancing" },
  { value: "120", label: "Projects shipped" },
  { value: "40+", label: "Happy clients" },
  { value: "4.9", label: "Average rating" },
]

const PACKAGES = [
  {
    name: "Brand Sprint",
    price: "$2,400",
    cadence: "one-time",
    blurb: "A focused week to nail your identity and visual direction.",
    icon: Palette,
    featured: false,
    features: ["Logo + wordmark", "Color & type system", "1-page brand guide", "2 revision rounds"],
  },
  {
    name: "Product Design",
    price: "$5,800",
    cadence: "per project",
    blurb: "End-to-end UI design for your web or mobile product.",
    icon: Sparkles,
    featured: true,
    features: ["UX flows & wireframes", "Hi-fi UI screens", "Design system in Figma", "Dev handoff & specs"],
  },
  {
    name: "Retainer",
    price: "$3,200",
    cadence: "/ month",
    blurb: "Ongoing design support for fast-moving teams.",
    icon: Zap,
    featured: false,
    features: ["40 hours / month", "Priority turnaround", "Weekly check-ins", "Slack on-call"],
  },
]

const WORK = [
  { title: "Norra Finance", tag: "Fintech app", year: "2025", accent: "Mobile banking redesign" },
  { title: "Bloom & Co", tag: "E-commerce", year: "2024", accent: "Storefront + brand" },
  { title: "Pulse Health", tag: "Healthcare", year: "2024", accent: "Patient dashboard" },
  { title: "Cartograph", tag: "SaaS", year: "2023", accent: "Maps analytics tool" },
  { title: "Driftwood", tag: "Hospitality", year: "2023", accent: "Booking experience" },
  { title: "Studio Vera", tag: "Portfolio", year: "2022", accent: "Architecture site" },
]

const TESTIMONIALS = [
  {
    quote:
      "Maya turned a vague idea into a product our investors loved on the first demo. Calm, fast, and ridiculously good at the details.",
    name: "Daniel Roe",
    role: "Founder, Norra Finance",
    initials: "DR",
  },
  {
    quote:
      "The most organized freelancer we have worked with. Clear scope, clear handoff, zero surprises. We re-hired within a month.",
    name: "Priya Nair",
    role: "Head of Product, Pulse Health",
    initials: "PN",
  },
  {
    quote:
      "Our conversion jumped 31% after the storefront redesign. Worth every dollar and then some.",
    name: "Sofia Marchetti",
    role: "CEO, Bloom & Co",
    initials: "SM",
  },
]

const TOOLS = ["Figma", "Framer", "Webflow", "Notion", "Linear", "Tailwind"]

export default function FreelancerPortfolio() {
  const [budget, setBudget] = React.useState("$5k - $10k")
  const budgets = ["< $5k", "$5k - $10k", "$10k+"]

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
          <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              M
            </span>
            Maya Larsson
          </a>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            {NAV.map((item) => (
              <a key={item.label} href={item.href} className="transition-colors hover:text-foreground">
                {item.label}
              </a>
            ))}
          </nav>
          <Button size="sm" asChild>
            <a href="#contact">Book a call</a>
          </Button>
        </div>
      </header>

      <main className="flex-1" id="top">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_0%,theme(colors.primary/12),transparent)]" />
          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
            <div>
              <Badge variant="secondary" className="mb-5 gap-1.5 rounded-full px-3 py-1">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                Available for new projects — July 2026
              </Badge>
              <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                Hi, I'm Maya — I design products people actually enjoy using.
              </h1>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                A freelance product & brand designer helping startups ship clean, considered
                interfaces. Friendly process, sharp results, on-time every time.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button size="lg" asChild>
                  <a href="#contact" className="gap-2">
                    Start a project <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#work">See selected work</a>
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" /> Stockholm · Remote
                </span>
                <Separator orientation="vertical" className="h-4" />
                <span className="flex items-center gap-1.5">
                  <Coffee className="h-4 w-4" /> Mostly async
                </span>
              </div>
            </div>

            <div className="relative">
              <Card className="overflow-hidden">
                <div className="aspect-[4/5] w-full bg-gradient-to-br from-primary/20 via-muted to-accent">
                  <img
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=900&q=80"
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
              </Card>
              <Card className="absolute -bottom-5 -left-5 hidden w-48 p-4 shadow-lg sm:block">
                <div className="flex items-center gap-1 text-primary">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-2 text-sm font-medium">4.9 / 5 client rating</p>
                <p className="text-xs text-muted-foreground">across 40+ projects</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-px px-6 py-10 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-semibold tracking-tight">{s.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Services / Packages */}
        <section id="services" className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-4 rounded-full">
              Services & pricing
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Pick a package, or let's shape a custom scope
            </h2>
            <p className="mt-4 text-muted-foreground">
              Transparent, flat-rate pricing. No hourly guesswork, no surprise invoices.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {PACKAGES.map((pkg) => {
              const Icon = pkg.icon
              return (
                <Card
                  key={pkg.name}
                  className={cn(
                    "relative flex flex-col",
                    pkg.featured && "border-primary shadow-lg ring-1 ring-primary",
                  )}
                >
                  {pkg.featured && (
                    <Badge className="absolute -top-3 left-6 rounded-full">Most popular</Badge>
                  )}
                  <CardHeader>
                    <div
                      className={cn(
                        "mb-3 flex h-11 w-11 items-center justify-center rounded-xl",
                        pkg.featured ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary",
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle>{pkg.name}</CardTitle>
                    <CardDescription>{pkg.blurb}</CardDescription>
                    <div className="mt-3 flex items-baseline gap-1.5">
                      <span className="text-3xl font-semibold tracking-tight">{pkg.price}</span>
                      <span className="text-sm text-muted-foreground">{pkg.cadence}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-2.5 text-sm">
                      {pkg.features.map((f) => (
                        <li key={f} className="flex items-center gap-2.5">
                          <Check className="h-4 w-4 shrink-0 text-primary" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      variant={pkg.featured ? "default" : "outline"}
                      asChild
                    >
                      <a href="#contact">Choose {pkg.name}</a>
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Selected work */}
        <section id="work" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <Badge variant="outline" className="mb-4 rounded-full">
                  Selected work
                </Badge>
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  A few things I'm proud of
                </h2>
              </div>
              <Button variant="ghost" asChild>
                <a href="#contact" className="gap-1.5">
                  Full case studies <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {WORK.map((item) => (
                <a
                  key={item.title}
                  href="#contact"
                  className="group block"
                  aria-label={`View ${item.title} case study`}
                >
                  <Card className="overflow-hidden transition-shadow group-hover:shadow-lg">
                    <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-primary/15 via-muted to-accent">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <CircleDot className="h-10 w-10 text-primary/40" />
                      </div>
                      <Badge
                        variant="secondary"
                        className="absolute left-3 top-3 rounded-full"
                      >
                        {item.tag}
                      </Badge>
                    </div>
                    <CardContent className="flex items-center justify-between py-4">
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.accent}</p>
                      </div>
                      <span className="text-sm text-muted-foreground">{item.year}</span>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-2">
          <div>
            <Badge variant="outline" className="mb-4 rounded-full">
              About me
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Design that respects people's time
            </h2>
            <p className="mt-5 text-muted-foreground">
              I've spent the last eight years partnering with founders and product teams to turn
              fuzzy ideas into shipped interfaces. I care about clarity, momentum, and leaving every
              project better documented than I found it.
            </p>
            <p className="mt-4 text-muted-foreground">
              When I'm not in Figma, you'll find me roasting coffee, sketching type, or hiking the
              archipelago outside Stockholm.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {TOOLS.map((t) => (
                <Badge key={t} variant="secondary" className="rounded-full px-3 py-1">
                  {t}
                </Badge>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[Figma, Palette, Zap, Sparkles].map((Icon, i) => (
              <Card key={i} className={cn("p-6", i % 2 === 1 && "mt-6")}>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-4 font-medium">
                  {["Product design", "Brand & identity", "Rapid prototyping", "Design systems"][i]}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {[
                    "Flows, screens, and polish.",
                    "Logos, type, and palettes.",
                    "Clickable in days, not weeks.",
                    "Scalable, documented, tidy.",
                  ][i]}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="outline" className="mb-4 rounded-full">
                Kind words
              </Badge>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Clients keep coming back
              </h2>
            </div>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <Card key={t.name} className="flex flex-col">
                  <CardContent className="flex-1 pt-6">
                    <Quote className="h-7 w-7 text-primary/30" />
                    <p className="mt-4 text-sm leading-relaxed">{t.quote}</p>
                  </CardContent>
                  <CardFooter className="gap-3">
                    <Avatar>
                      <AvatarFallback>{t.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <Badge variant="outline" className="mb-4 rounded-full">
                Let's talk
              </Badge>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Have a project in mind?
              </h2>
              <p className="mt-4 text-muted-foreground">
                Tell me a little about what you're building. I usually reply within a day, and the
                first call is always free.
              </p>
              <div className="mt-8 space-y-3 text-sm">
                <a href="#contact" className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground">
                  <Mail className="h-4 w-4" /> hello@mayalarsson.design
                </a>
                <div className="flex items-center gap-3 pt-2">
                  <Button variant="outline" size="icon" aria-label="Twitter" asChild>
                    <a href="#contact"><Twitter className="h-4 w-4" /></a>
                  </Button>
                  <Button variant="outline" size="icon" aria-label="LinkedIn" asChild>
                    <a href="#contact"><Linkedin className="h-4 w-4" /></a>
                  </Button>
                  <Button variant="outline" size="icon" aria-label="GitHub" asChild>
                    <a href="#contact"><Github className="h-4 w-4" /></a>
                  </Button>
                </div>
              </div>
            </div>

            <Card>
              <CardContent className="pt-6">
                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Jane Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="jane@company.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Budget</Label>
                    <div className="flex flex-wrap gap-2">
                      {budgets.map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setBudget(b)}
                          className={cn(
                            "rounded-full border px-4 py-1.5 text-sm transition-colors",
                            budget === b
                              ? "border-primary bg-primary/10 text-primary"
                              : "text-muted-foreground hover:bg-muted",
                          )}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Project details</Label>
                    <Textarea
                      id="message"
                      rows={4}
                      placeholder="What are you building, and what's the timeline?"
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full gap-2">
                    Send message <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
          <span>© 2026 Maya Larsson · Freelance product & brand design</span>
          <nav className="flex items-center gap-6">
            {NAV.map((item) => (
              <a key={item.label} href={item.href} className="transition-colors hover:text-foreground">
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  )
}
