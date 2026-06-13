"use client"

import * as React from "react"
import {
  Scale,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Menu,
  Check,
  Quote,
  Gavel,
  Briefcase,
  Building2,
  Users,
  Home,
  Landmark,
  ShieldCheck,
  Award,
  Star,
  Clock,
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

const NAV_LINKS = ["Practice Areas", "Attorneys", "Results", "Testimonials", "Contact"]

const PRACTICE_AREAS = [
  {
    icon: Briefcase,
    title: "Corporate & Commercial",
    description:
      "Formation, governance, M&A, and contract strategy for growth-stage and established enterprises.",
  },
  {
    icon: Gavel,
    title: "Litigation & Disputes",
    description:
      "Aggressive, well-prepared representation in state and federal courts and in arbitration.",
  },
  {
    icon: Landmark,
    title: "Estate & Trust Planning",
    description:
      "Wills, trusts, and succession planning that protect your legacy across generations.",
  },
  {
    icon: Home,
    title: "Real Estate",
    description:
      "Acquisitions, leasing, development, and complex commercial real estate transactions.",
  },
  {
    icon: Users,
    title: "Family Law",
    description:
      "Discreet counsel through divorce, custody, and high-net-worth marital settlements.",
  },
  {
    icon: ShieldCheck,
    title: "Intellectual Property",
    description:
      "Trademark, copyright, and trade-secret protection that safeguards what you build.",
  },
]

const ATTORNEYS = [
  {
    name: "Margaret Whitfield",
    role: "Founding Partner",
    focus: "Corporate & M&A",
    image: "https://i.pravatar.cc/200?img=45",
    initials: "MW",
  },
  {
    name: "Jonathan Pierce",
    role: "Senior Partner",
    focus: "Litigation",
    image: "https://i.pravatar.cc/200?img=13",
    initials: "JP",
  },
  {
    name: "Adaeze Okafor",
    role: "Partner",
    focus: "Estate Planning",
    image: "https://i.pravatar.cc/200?img=31",
    initials: "AO",
  },
  {
    name: "Daniel Reyes",
    role: "Associate",
    focus: "Real Estate",
    image: "https://i.pravatar.cc/200?img=11",
    initials: "DR",
  },
]

const STATS = [
  { value: "$420M+", label: "Recovered for clients" },
  { value: "45 yrs", label: "Combined experience" },
  { value: "98%", label: "Cases favorably resolved" },
  { value: "24/7", label: "Client availability" },
]

const CREDENTIALS = [
  "Super Lawyers Rising Stars",
  "AV Preeminent Rated",
  "Best Law Firms",
  "Chambers Listed",
  "Avvo 10.0",
  "State Bar Honoree",
]

const RESULTS = [
  "$28M verdict in commercial fraud trial",
  "Landmark appellate reversal upholding contract rights",
  "Confidential nine-figure M&A close in 90 days",
]

const TESTIMONIALS = [
  {
    quote:
      "They treated my case as if it were their own. Meticulous, responsive, and relentless when it mattered most.",
    name: "Catherine Ellison",
    detail: "Estate Planning Client",
    initials: "CE",
  },
  {
    quote:
      "When negotiations stalled, their litigation team stepped in and changed the outcome entirely. Exceptional advocates.",
    name: "Robert Hastings",
    detail: "Corporate Client",
    initials: "RH",
  },
  {
    quote:
      "Clear advice, no jargon, and a steady hand through a difficult year. I always knew where my matter stood.",
    name: "Priscilla Moore",
    detail: "Family Law Client",
    initials: "PM",
  },
]

const PRACTICE_OPTIONS = [
  "Corporate & Commercial",
  "Litigation",
  "Estate Planning",
  "Real Estate",
  "Family Law",
  "Intellectual Property",
]

export default function LawFirm() {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [practice, setPractice] = React.useState(PRACTICE_OPTIONS[0])

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center gap-2.5 font-serif text-lg font-semibold tracking-tight">
            <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-primary text-primary-foreground">
              <Scale className="h-4 w-4" />
            </span>
            Whitfield &amp; Pierce
          </a>
          <div className="hidden items-center gap-8 lg:flex">
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
          <div className="hidden items-center gap-3 lg:flex">
            <a href="#" className="flex items-center gap-2 text-sm font-medium">
              <Phone className="h-4 w-4 text-primary" />
              (212) 555-0188
            </a>
            <Button size="sm">
              Free Consultation
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden"
            aria-label="Toggle navigation menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <Menu className="h-4 w-4" />
          </Button>
        </nav>
        {menuOpen && (
          <div className="border-t px-6 py-4 lg:hidden">
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
                Free Consultation
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
                Established 1981 · New York
              </Badge>
              <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Trusted counsel when the stakes are highest.
              </h1>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                For over four decades, Whitfield &amp; Pierce has represented
                individuals and businesses with discretion, rigor, and an
                unwavering commitment to results.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg">
                  Request a consultation
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Our practice areas
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Award-winning trial team
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Free initial review
                </span>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-sm border bg-card shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1000&q=80"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <Card className="absolute -bottom-6 -left-6 hidden w-60 rounded-sm sm:block">
                <CardContent className="flex items-center gap-3 p-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-primary/10 text-primary">
                    <Scale className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-lg font-semibold">$420M+</div>
                    <div className="text-xs text-muted-foreground">
                      Recovered for our clients
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Practice areas */}
        <section className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-4">
              Practice Areas
            </Badge>
            <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
              Comprehensive legal representation
            </h2>
            <p className="mt-4 text-muted-foreground">
              From the boardroom to the courtroom, our attorneys bring focused
              expertise to every matter we take on.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PRACTICE_AREAS.map((area) => (
              <Card
                key={area.title}
                className="group rounded-sm transition-shadow hover:shadow-md"
              >
                <CardHeader>
                  <span className="mb-2 flex h-11 w-11 items-center justify-center rounded-sm bg-primary/10 text-primary">
                    <area.icon className="h-5 w-5" />
                  </span>
                  <CardTitle className="font-serif text-lg">
                    {area.title}
                  </CardTitle>
                  <CardDescription>{area.description}</CardDescription>
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

        {/* Results / credentials band */}
        <section className="border-y bg-primary text-primary-foreground">
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-serif text-4xl font-semibold tracking-tight">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-primary-foreground/80">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Attorneys */}
        <section className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div className="max-w-xl">
              <Badge variant="outline" className="mb-4">
                Our Attorneys
              </Badge>
              <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                Advocates who deliver
              </h2>
              <p className="mt-4 text-muted-foreground">
                A seasoned team of trial lawyers, negotiators, and counselors
                dedicated to protecting your interests.
              </p>
            </div>
            <Button variant="outline">
              <Users className="h-4 w-4" />
              View full roster
            </Button>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ATTORNEYS.map((attorney) => (
              <Card key={attorney.name} className="overflow-hidden rounded-sm">
                <div className="aspect-square overflow-hidden bg-muted">
                  <img
                    src={attorney.image}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardContent className="p-5">
                  <div className="font-serif text-lg font-medium">
                    {attorney.name}
                  </div>
                  <div className="text-sm text-primary">{attorney.role}</div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {attorney.focus}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Notable results highlight */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center">
            <div className="order-2 lg:order-1">
              <div className="aspect-[4/3] overflow-hidden rounded-sm border bg-card shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1200&q=80"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <Badge variant="secondary" className="mb-4">
                Notable Results
              </Badge>
              <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                A record of decisive outcomes
              </h2>
              <p className="mt-4 text-muted-foreground">
                Our results speak to a disciplined, evidence-driven approach.
                While past performance is no guarantee, our track record reflects
                the depth of our preparation.
              </p>
              <ul className="mt-6 space-y-3">
                {RESULTS.map((result) => (
                  <li key={result} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-sm bg-primary/10 text-primary">
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-medium">{result}</span>
                  </li>
                ))}
              </ul>
              <Button variant="link" className="mt-4 px-0">
                See more case results
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Credentials strip */}
        <section className="mx-auto w-full max-w-6xl px-6 py-16">
          <p className="text-center text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Recognized by the profession
          </p>
          <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {CREDENTIALS.map((credential) => (
              <div
                key={credential}
                className="flex items-center justify-center rounded-sm border bg-card px-4 py-6 text-center text-sm font-semibold text-muted-foreground"
              >
                {credential}
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="outline" className="mb-4">
                Client Voices
              </Badge>
              <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                What our clients say
              </h2>
            </div>
            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {TESTIMONIALS.map((testimonial) => (
                <Card key={testimonial.name} className="rounded-sm">
                  <CardContent className="flex h-full flex-col p-6">
                    <Quote className="h-6 w-6 text-primary" />
                    <div className="mt-3 flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-primary text-primary"
                        />
                      ))}
                    </div>
                    <blockquote className="mt-4 flex-1 text-sm text-muted-foreground">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                    <div className="mt-6 flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{testimonial.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium">
                          {testimonial.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {testimonial.detail}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Consultation request */}
        <section id="contact" className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <Badge variant="outline" className="mb-4">
                Free Consultation
              </Badge>
              <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                Discuss your matter in confidence
              </h2>
              <p className="mt-4 max-w-md text-muted-foreground">
                Share a few details and an attorney will contact you within one
                business day. All inquiries are strictly confidential.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-5 w-5 text-primary" />
                  (212) 555-0188
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-5 w-5 text-primary" />
                  intake@whitfieldpierce.example
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-5 w-5 text-primary" />
                  500 Madison Avenue, Suite 2200, New York, NY
                </div>
              </div>
              <div className="mt-8 flex items-start gap-3 rounded-sm border bg-card p-4 text-sm text-muted-foreground">
                <Building2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                Submitting this form does not create an attorney-client
                relationship.
              </div>
            </div>
            <Card className="rounded-sm">
              <CardContent className="p-6">
                <form className="grid gap-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="firstName">First name</Label>
                      <Input id="firstName" placeholder="Jane" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="lastName">Last name</Label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="jane@example.com"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" placeholder="(212) 555-0000" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="practice">Practice area</Label>
                    <div className="flex flex-wrap gap-2">
                      {PRACTICE_OPTIONS.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setPractice(option)}
                          className={cn(
                            "rounded-sm border px-3 py-1.5 text-xs font-medium transition-colors",
                            practice === option
                              ? "border-primary bg-primary/10 text-primary"
                              : "text-muted-foreground hover:text-foreground"
                          )}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="message">How can we help?</Label>
                    <Textarea
                      id="message"
                      rows={4}
                      placeholder="Briefly describe your legal matter..."
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full">
                    Request my consultation
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
              <a href="#" className="flex items-center gap-2.5 font-serif text-lg font-semibold">
                <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-primary text-primary-foreground">
                  <Scale className="h-4 w-4" />
                </span>
                Whitfield &amp; Pierce
              </a>
              <p className="mt-4 max-w-xs text-sm text-muted-foreground">
                A full-service law firm providing principled, results-driven
                representation since 1981.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Practice Areas</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                {PRACTICE_AREAS.slice(0, 5).map((area) => (
                  <li key={area.title}>
                    <a href="#" className="hover:text-foreground">
                      {area.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Firm</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                {["About Us", "Our Attorneys", "Case Results", "Careers"].map(
                  (item) => (
                    <li key={item}>
                      <a href="#" className="hover:text-foreground">
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Contact</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  (212) 555-0188
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  intake@whitfieldpierce.example
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                  500 Madison Avenue, Suite 2200, New York, NY
                </li>
              </ul>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
            <p>© 2026 Whitfield &amp; Pierce LLP. Attorney advertising.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-foreground">
                Privacy
              </a>
              <a href="#" className="hover:text-foreground">
                Disclaimer
              </a>
              <a href="#" className="hover:text-foreground">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
