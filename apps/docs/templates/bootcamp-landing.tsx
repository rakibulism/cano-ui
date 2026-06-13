"use client"

import * as React from "react"
import {
  Code2,
  Menu,
  Check,
  ArrowRight,
  Clock,
  Calendar,
  Users,
  Briefcase,
  TrendingUp,
  GraduationCap,
  Laptop,
  CircleDollarSign,
  Wallet,
  HandCoins,
  Linkedin,
  Github,
  Twitter,
  MapPin,
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
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/registry/ui/accordion"

const NAV_LINKS = [
  { label: "Outcomes", href: "#outcomes" },
  { label: "Curriculum", href: "#curriculum" },
  { label: "Instructors", href: "#instructors" },
  { label: "Tuition", href: "#tuition" },
  { label: "FAQ", href: "#faq" },
]

const HERO_STATS = [
  { value: "16 wks", label: "Full-time" },
  { value: "Remote", label: "Or in-person" },
  { value: "Sep 8", label: "Next cohort" },
]

const OUTCOMES = [
  { icon: Briefcase, value: "94%", label: "Hired within 6 months" },
  { icon: CircleDollarSign, value: "$82k", label: "Median starting salary" },
  { icon: Users, value: "1,800+", label: "Graduates placed" },
  { icon: TrendingUp, value: "640+", label: "Hiring partners" },
]

const CURRICULUM = [
  {
    week: "Weeks 1–2",
    title: "Foundations & the Web",
    focus: "HTML, CSS, Git",
    items: [
      "Semantic HTML and accessible markup",
      "Modern CSS: flexbox, grid, responsive design",
      "Version control workflows with Git & GitHub",
    ],
  },
  {
    week: "Weeks 3–5",
    title: "JavaScript Deep Dive",
    focus: "Language & async",
    items: [
      "Data structures, scope, and closures",
      "Promises, async/await, and fetching APIs",
      "Testing fundamentals and debugging",
    ],
  },
  {
    week: "Weeks 6–9",
    title: "Frontend with React",
    focus: "Components & state",
    items: [
      "Thinking in components and props",
      "State management and side effects",
      "Routing, forms, and design systems",
    ],
  },
  {
    week: "Weeks 10–13",
    title: "Backend & Databases",
    focus: "APIs & data",
    items: [
      "Building REST APIs with Node",
      "Relational data modeling with SQL",
      "Authentication and deployment",
    ],
  },
  {
    week: "Weeks 14–16",
    title: "Capstone & Career",
    focus: "Ship & interview",
    items: [
      "Build a production full-stack project",
      "Technical interview prep and mock loops",
      "Portfolio, resume, and demo day",
    ],
  },
]

const INSTRUCTORS = [
  {
    name: "Dana Okonkwo",
    role: "Lead Instructor · ex-Stripe",
    bio: "Spent eight years building payments infrastructure before turning to teaching.",
    avatar: "https://i.pravatar.cc/200?img=5",
    initials: "DO",
  },
  {
    name: "Marco Belli",
    role: "Frontend Instructor · ex-Figma",
    bio: "Design-systems engineer who loves making complex UI feel effortless.",
    avatar: "https://i.pravatar.cc/200?img=13",
    initials: "MB",
  },
  {
    name: "Aisha Rahman",
    role: "Career Coach · ex-Airbnb",
    bio: "Has coached 400+ engineers through their first developer job search.",
    avatar: "https://i.pravatar.cc/200?img=45",
    initials: "AR",
  },
]

const PLANS = [
  {
    name: "Upfront",
    price: "$13,900",
    note: "Pay in full, save $1,600",
    icon: Wallet,
    featured: false,
    features: [
      "Full 16-week program",
      "1:1 mentorship hours",
      "Lifetime alumni network",
      "Career coaching included",
    ],
    cta: "Apply with upfront",
  },
  {
    name: "Monthly Plan",
    price: "$1,290/mo",
    note: "Spread across 12 months",
    icon: HandCoins,
    featured: true,
    features: [
      "Everything in Upfront",
      "0% interest financing",
      "No payment until week 1",
      "Cancel before day 7 free",
      "Dedicated capstone reviews",
    ],
    cta: "Apply with financing",
  },
  {
    name: "Deferred Tuition",
    price: "$0 upfront",
    note: "Pay once you're hired",
    icon: CircleDollarSign,
    featured: false,
    features: [
      "Start with nothing down",
      "Pay only after a $60k+ job",
      "Capped total repayment",
      "Income-based monthly cap",
    ],
    cta: "Check eligibility",
  },
]

const GRADUATES = [
  {
    name: "Priya Nair",
    role: "Software Engineer @ Datadog",
    quote:
      "I switched from nursing to engineering in under a year. The capstone project is literally what got me hired.",
    avatar: "https://i.pravatar.cc/120?img=32",
  },
  {
    name: "Devon Carter",
    role: "Frontend Developer @ Shopify",
    quote:
      "The career team ran six mock interviews with me. By the real thing, I was calm and confident.",
    avatar: "https://i.pravatar.cc/120?img=12",
  },
  {
    name: "Mara Lindqvist",
    role: "Full-stack Engineer @ Notion",
    quote:
      "Coming from retail, I never imagined a $90k offer. The instructors genuinely cared whether I made it.",
    avatar: "https://i.pravatar.cc/120?img=47",
  },
]

const FAQS = [
  {
    q: "Do I need prior coding experience?",
    a: "No. Our admissions process looks for problem-solving and persistence, not a CS background. A free 4-week prep course gets every admitted student to the same starting line.",
  },
  {
    q: "What is the time commitment?",
    a: "The full-time track runs 16 weeks at roughly 50 hours per week, Monday to Friday. We also offer a 32-week part-time track for those who work alongside the program.",
  },
  {
    q: "Is the job guarantee real?",
    a: "Yes. Students on the deferred tuition plan pay nothing until they land a qualifying role earning $60k or more. If you don't, you owe nothing.",
  },
  {
    q: "Can I attend remotely?",
    a: "Absolutely. Every cohort runs live online with the same instructors, and select cities offer an in-person option at no extra cost.",
  },
  {
    q: "What support exists after graduation?",
    a: "You keep lifetime access to the alumni network, career coaching for 12 months, and all future curriculum updates.",
  },
]

export default function BootcampLandingPage() {
  const [activePlan, setActivePlan] = React.useState("Monthly Plan")
  const [openWeek, setOpenWeek] = React.useState<string | undefined>("week-0")

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-2 font-semibold">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Code2 className="size-5" />
            </span>
            <span>Forge Academy</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              Download syllabus
            </Button>
            <Button size="sm">
              <a href="#tuition">Apply now</a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </Button>
          </div>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* Hero */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
            <div>
              <Badge variant="secondary" className="mb-4">
                Applications open · Cohort 24
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Become a software engineer in 16 weeks
              </h1>
              <p className="mt-5 max-w-xl text-lg text-muted-foreground">
                An immersive coding bootcamp that takes you from zero to a hired,
                job-ready full-stack developer — with deferred tuition until you
                land the role.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="gap-2">
                  Apply now <ArrowRight className="size-4" />
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  <Calendar className="size-4" /> Book an info session
                </Button>
              </div>
              <dl className="mt-10 grid max-w-md grid-cols-3 gap-4">
                {HERO_STATS.map((s) => (
                  <div key={s.label}>
                    <dt className="text-xs text-muted-foreground">{s.label}</dt>
                    <dd className="text-lg font-semibold">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <Card className="overflow-hidden shadow-sm">
              <div className="relative flex aspect-[4/3] items-center justify-center bg-primary/10">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=70"
                  alt=""
                  className="absolute inset-0 size-full object-cover opacity-80"
                />
              </div>
              <CardContent className="flex items-center gap-4 pt-6">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Laptop className="size-5" />
                </span>
                <div>
                  <div className="text-sm font-semibold">
                    Live, project-based learning
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Small cohorts · real instructors · ship every week
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Outcomes stats */}
        <section id="outcomes" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Outcomes that speak for themselves
            </h2>
            <p className="mt-3 text-muted-foreground">
              We publish a verified outcomes report every year. These are the
              numbers from our most recent graduating classes.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {OUTCOMES.map((o) => (
              <Card key={o.label} className="text-center">
                <CardContent className="flex flex-col items-center gap-2 pt-6">
                  <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <o.icon className="size-5" />
                  </span>
                  <div className="text-3xl font-bold">{o.value}</div>
                  <div className="text-sm text-muted-foreground">{o.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Curriculum */}
        <section id="curriculum" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:py-24">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight">
                A curriculum built week by week
              </h2>
              <p className="mt-3 text-muted-foreground">
                16 weeks · 5 phases · capstone demo day. Explore what you&apos;ll
                build along the way.
              </p>
            </div>
            <Accordion
              type="single"
              collapsible
              value={openWeek}
              onValueChange={setOpenWeek}
              className="mt-10 w-full"
            >
              {CURRICULUM.map((mod, i) => (
                <AccordionItem key={mod.title} value={`week-${i}`}>
                  <AccordionTrigger className="text-left">
                    <span className="flex flex-1 flex-col gap-1 pr-4 sm:flex-row sm:items-center sm:justify-between">
                      <span>
                        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          {mod.week}
                        </span>
                        <span className="block font-semibold">{mod.title}</span>
                      </span>
                      <span className="flex items-center gap-1 text-xs font-normal text-muted-foreground">
                        <Clock className="size-3.5" /> {mod.focus}
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 pl-1">
                      {mod.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <Check className="size-4 shrink-0 text-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Instructors */}
        <section id="instructors" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Learn from engineers who&apos;ve shipped
            </h2>
            <p className="mt-3 text-muted-foreground">
              Every instructor has years of industry experience and a track record
              of mentoring new developers.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {INSTRUCTORS.map((person) => (
              <Card key={person.name} className="h-full">
                <CardContent className="flex h-full flex-col items-center pt-6 text-center">
                  <Avatar className="size-20 border">
                    <AvatarImage src={person.avatar} alt={person.name} />
                    <AvatarFallback>{person.initials}</AvatarFallback>
                  </Avatar>
                  <h3 className="mt-4 text-lg font-semibold">{person.name}</h3>
                  <p className="text-sm text-primary">{person.role}</p>
                  <p className="mt-3 flex-1 text-sm text-muted-foreground">
                    {person.bio}
                  </p>
                  <div className="mt-4 flex justify-center gap-1">
                    <Button variant="ghost" size="icon" aria-label={`${person.name} on LinkedIn`}>
                      <Linkedin className="size-4" />
                    </Button>
                    <Button variant="ghost" size="icon" aria-label={`${person.name} on GitHub`}>
                      <Github className="size-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Tuition / financing */}
        <section id="tuition" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight">
                Tuition that works for you
              </h2>
              <p className="mt-3 text-muted-foreground">
                Choose the payment path that fits your situation — including paying
                nothing until you&apos;re hired.
              </p>
            </div>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {PLANS.map((plan) => {
                const isActive = activePlan === plan.name
                return (
                  <Card
                    key={plan.name}
                    className={cn(
                      "relative flex flex-col transition-all",
                      isActive ? "border-primary ring-1 ring-primary" : "border"
                    )}
                  >
                    {plan.featured && (
                      <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                        Most chosen
                      </Badge>
                    )}
                    <CardHeader>
                      <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <plan.icon className="size-5" />
                      </span>
                      <CardTitle className="pt-2">{plan.name}</CardTitle>
                      <CardDescription>{plan.note}</CardDescription>
                      <div className="pt-2">
                        <span className="text-3xl font-bold">{plan.price}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <ul className="space-y-3">
                        {plan.features.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-sm">
                            <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full"
                        variant={isActive ? "default" : "outline"}
                        onClick={() => setActivePlan(plan.name)}
                      >
                        {plan.cta}
                      </Button>
                    </CardFooter>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Student outcomes / graduates */}
        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Where our graduates land
            </h2>
            <p className="mt-3 text-muted-foreground">
              Career changers from every background, now building at companies they
              once only dreamed of joining.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {GRADUATES.map((g) => (
              <Card key={g.name} className="h-full">
                <CardContent className="flex h-full flex-col pt-6">
                  <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                    &ldquo;{g.quote}&rdquo;
                  </p>
                  <Separator className="my-4" />
                  <div className="flex items-center gap-3">
                    <Avatar className="size-10">
                      <AvatarImage src={g.avatar} alt="" />
                      <AvatarFallback>{g.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium">{g.name}</div>
                      <div className="text-xs text-muted-foreground">{g.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight">
                Frequently asked questions
              </h2>
              <p className="mt-3 text-muted-foreground">
                Still deciding? Our admissions team is happy to talk it through.
              </p>
            </div>
            <Accordion type="single" collapsible className="mt-10 w-full">
              {FAQS.map((faq, i) => (
                <AccordionItem key={faq.q} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left font-medium">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <Card className="overflow-hidden border-primary/20 bg-primary/5">
            <CardContent className="flex flex-col items-center gap-5 py-12 text-center">
              <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <GraduationCap className="size-6" />
              </span>
              <h2 className="max-w-xl text-3xl font-bold tracking-tight">
                Your career change starts with one application
              </h2>
              <p className="max-w-lg text-muted-foreground">
                Cohort 24 begins September 8 and seats are limited. Apply in under
                ten minutes — no fee, no commitment.
              </p>
              <Button size="lg" className="gap-2">
                Apply now <ArrowRight className="size-4" />
              </Button>
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="size-4 text-primary" />
                Remote worldwide · in-person in 6 cities
              </p>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <a href="#top" className="flex items-center gap-2 font-semibold">
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Code2 className="size-5" />
              </span>
              <span>Forge Academy</span>
            </a>
            <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" aria-label="Twitter">
                <Twitter className="size-4" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="LinkedIn">
                <Linkedin className="size-4" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="GitHub">
                <Github className="size-4" />
              </Button>
            </div>
          </div>
          <Separator className="my-6" />
          <p className="text-center text-xs text-muted-foreground">
            © 2026 Forge Academy. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
