"use client"

import * as React from "react"
import {
  ArrowRight,
  Building2,
  ShieldCheck,
  TrendingUp,
  Globe,
  Users,
  Briefcase,
  Phone,
  Mail,
  MapPin,
  Menu,
  Check,
  Quote,
  ChevronRight,
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const NAV_LINKS = ["Services", "Company", "Insights", "Case Studies", "Contact"]

const SERVICES = [
  {
    icon: Briefcase,
    title: "Management Consulting",
    description:
      "Strategy, operations, and organizational design that turn ambition into measurable outcomes.",
  },
  {
    icon: TrendingUp,
    title: "Growth Advisory",
    description:
      "Market entry, M&A, and revenue acceleration backed by rigorous financial modeling.",
  },
  {
    icon: ShieldCheck,
    title: "Risk & Compliance",
    description:
      "Enterprise risk frameworks and regulatory readiness for highly governed industries.",
  },
  {
    icon: Globe,
    title: "Digital Transformation",
    description:
      "Modernize platforms, data, and ways of working to compete in a digital-first economy.",
  },
]

const STATS = [
  { value: "$48B", label: "Client value created" },
  { value: "120+", label: "Countries served" },
  { value: "2,400", label: "Engagements delivered" },
  { value: "98%", label: "Client retention" },
]

const LEADERS = [
  {
    name: "Eleanor Vance",
    role: "Chief Executive Officer",
    image: "https://i.pravatar.cc/160?img=47",
    initials: "EV",
  },
  {
    name: "Marcus Holloway",
    role: "Managing Partner",
    image: "https://i.pravatar.cc/160?img=12",
    initials: "MH",
  },
  {
    name: "Priya Raman",
    role: "Head of Strategy",
    image: "https://i.pravatar.cc/160?img=32",
    initials: "PR",
  },
  {
    name: "David Okonkwo",
    role: "Chief Financial Officer",
    image: "https://i.pravatar.cc/160?img=15",
    initials: "DO",
  },
]

const PARTNERS = [
  "Northwind",
  "Vertex Global",
  "Lumen Capital",
  "Arclight",
  "Meridian",
  "Solstice",
]

const CASE_RESULTS = [
  "32% reduction in operating costs",
  "$1.2B in new annual revenue",
  "Go-to-market timeline halved",
]

export default function CorporateBusiness() {
  const [menuOpen, setMenuOpen] = React.useState(false)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Building2 className="h-4 w-4" />
            </span>
            Meridian Partners
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
              Client Login
            </Button>
            <Button size="sm">
              Get in touch
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
                Get in touch
              </Button>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
            <div>
              <Badge variant="secondary" className="mb-5">
                Trusted by the Fortune 500
              </Badge>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Strategy that moves enterprises forward.
              </h1>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                We partner with leadership teams to solve their most complex
                challenges — combining deep industry expertise with disciplined
                execution that delivers lasting results.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg">
                  Schedule a consultation
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  View our work
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
                <ShieldCheck className="h-5 w-5 text-primary" />
                ISO 27001 certified · Independently audited
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-xl border bg-card shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <Card className="absolute -bottom-6 -left-6 hidden w-56 sm:block">
                <CardContent className="flex items-center gap-3 p-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <TrendingUp className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-lg font-semibold">+27%</div>
                    <div className="text-xs text-muted-foreground">
                      Avg. client EBITDA lift
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-4">
              What we do
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Full-spectrum advisory
            </h2>
            <p className="mt-4 text-muted-foreground">
              Integrated capabilities across the strategy lifecycle, delivered by
              specialists who have sat in your seat.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service) => (
              <Card
                key={service.title}
                className="group transition-shadow hover:shadow-md"
              >
                <CardHeader>
                  <span className="mb-2 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <service.icon className="h-5 w-5" />
                  </span>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <a
                    href="#"
                    className="inline-flex items-center text-sm font-medium text-primary"
                  >
                    Learn more
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Stats band */}
        <section className="border-y bg-primary text-primary-foreground">
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-semibold tracking-tight">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-primary-foreground/80">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Leadership */}
        <section className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div className="max-w-xl">
              <Badge variant="outline" className="mb-4">
                Leadership
              </Badge>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Guided by experience
              </h2>
              <p className="mt-4 text-muted-foreground">
                Our partners average two decades of operating and advisory
                experience across global markets.
              </p>
            </div>
            <Button variant="outline">
              <Users className="h-4 w-4" />
              Meet the full team
            </Button>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {LEADERS.map((leader) => (
              <Card key={leader.name} className="text-center">
                <CardContent className="flex flex-col items-center p-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={leader.image} alt="" />
                    <AvatarFallback>{leader.initials}</AvatarFallback>
                  </Avatar>
                  <div className="mt-4 font-medium">{leader.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {leader.role}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Case study highlight */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center">
            <div className="order-2 lg:order-1">
              <div className="aspect-[4/3] overflow-hidden rounded-xl border bg-card shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <Badge variant="secondary" className="mb-4">
                Case study · Industrials
              </Badge>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Repositioning a global manufacturer for the next decade
              </h2>
              <p className="mt-4 text-muted-foreground">
                We led an 18-month transformation spanning portfolio strategy,
                supply chain redesign, and a new operating model — unlocking
                durable margin and a clearer growth path.
              </p>
              <ul className="mt-6 space-y-3">
                {CASE_RESULTS.map((result) => (
                  <li key={result} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-medium">{result}</span>
                  </li>
                ))}
              </ul>
              <figure className="mt-8 rounded-lg border bg-card p-5">
                <Quote className="h-5 w-5 text-primary" />
                <blockquote className="mt-3 text-sm text-muted-foreground">
                  &ldquo;Meridian brought clarity to a problem we&rsquo;d wrestled
                  with for years. The results speak for themselves.&rdquo;
                </blockquote>
                <figcaption className="mt-3 text-sm font-medium">
                  — Chief Operating Officer, Fortune 200 Manufacturer
                </figcaption>
              </figure>
              <Button variant="link" className="mt-4 px-0">
                Read the full case study
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Partner logos */}
        <section className="mx-auto w-full max-w-6xl px-6 py-16">
          <p className="text-center text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Trusted by leading organizations worldwide
          </p>
          <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {PARTNERS.map((partner) => (
              <div
                key={partner}
                className="flex items-center justify-center rounded-lg border bg-card px-4 py-6 text-sm font-semibold text-muted-foreground"
              >
                {partner}
              </div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="border-t bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Let&rsquo;s build what&rsquo;s next.
              </h2>
              <p className="mt-4 max-w-md text-muted-foreground">
                Tell us about your priorities and a partner will reach out within
                two business days.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-5 w-5 text-primary" />
                  +1 (212) 555-0143
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-5 w-5 text-primary" />
                  partners@meridian.example
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-5 w-5 text-primary" />
                  200 Park Avenue, New York, NY
                </div>
              </div>
            </div>
            <Card>
              <CardContent className="p-6">
                <form
                  className="grid gap-4"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="grid gap-2 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Full name</Label>
                      <Input id="name" placeholder="Jane Doe" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" placeholder="Acme Inc." />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Work email</Label>
                    <Input id="email" type="email" placeholder="jane@acme.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="message">How can we help?</Label>
                    <Textarea
                      id="message"
                      rows={4}
                      placeholder="Tell us about your challenge..."
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full">
                    Request a consultation
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="mx-auto w-full max-w-6xl px-6 py-14">
          <div className="grid gap-10 md:grid-cols-4">
            <div>
              <a href="#" className="flex items-center gap-2 font-semibold">
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <Building2 className="h-4 w-4" />
                </span>
                Meridian Partners
              </a>
              <p className="mt-4 max-w-xs text-sm text-muted-foreground">
                A global advisory firm helping leaders navigate complexity and
                create lasting value.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Services</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                {SERVICES.map((s) => (
                  <li key={s.title}>
                    <a href="#" className="hover:text-foreground">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Company</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                {["About", "Leadership", "Careers", "Newsroom"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-foreground">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Stay informed</h3>
              <p className="mt-4 text-sm text-muted-foreground">
                Quarterly insights from our partners.
              </p>
              <form
                className="mt-4 flex gap-2"
                onSubmit={(e) => e.preventDefault()}
              >
                <Input placeholder="Email address" aria-label="Email address" />
                <Button type="submit" variant="secondary" aria-label="Subscribe">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
            <p>© 2026 Meridian Partners LLP. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-foreground">
                Privacy
              </a>
              <a href="#" className="hover:text-foreground">
                Terms
              </a>
              <a href="#" className="hover:text-foreground">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
