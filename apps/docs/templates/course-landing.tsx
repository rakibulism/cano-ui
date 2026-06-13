"use client"

import * as React from "react"
import {
  GraduationCap,
  Menu,
  Check,
  Star,
  PlayCircle,
  Clock,
  Users,
  Award,
  ChevronRight,
  ArrowRight,
  Twitter,
  Linkedin,
  Youtube,
  ShieldCheck,
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
  { label: "Curriculum", href: "#curriculum" },
  { label: "Instructor", href: "#instructor" },
  { label: "Reviews", href: "#reviews" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
]

const STATS = [
  { value: "12,400+", label: "Students enrolled" },
  { value: "4.9", label: "Average rating" },
  { value: "48", label: "Video lessons" },
  { value: "Lifetime", label: "Access" },
]

const LEARN_POINTS = [
  "Design responsive layouts that work on every screen size",
  "Master modern CSS: flexbox, grid, and container queries",
  "Build reusable component systems from scratch",
  "Ship accessible interfaces that meet WCAG standards",
  "Wire up real data with React state and effects",
  "Deploy production apps with confidence and CI",
  "Create design tokens for consistent theming",
  "Optimize performance and Core Web Vitals",
]

const CURRICULUM = [
  {
    module: "Module 01",
    title: "Foundations of Modern UI",
    lessons: 8,
    duration: "1h 45m",
    items: [
      "Setting up your environment",
      "The box model, revisited",
      "Layout primitives that scale",
    ],
  },
  {
    module: "Module 02",
    title: "Components & Composition",
    lessons: 12,
    duration: "3h 10m",
    items: [
      "Thinking in components",
      "Props, slots, and variants",
      "Building an accessible button",
    ],
  },
  {
    module: "Module 03",
    title: "State, Data & Interactions",
    lessons: 14,
    duration: "3h 50m",
    items: [
      "Local and derived state",
      "Forms and validation patterns",
      "Animating UI transitions",
    ],
  },
  {
    module: "Module 04",
    title: "Shipping to Production",
    lessons: 14,
    duration: "2h 30m",
    items: [
      "Theming with design tokens",
      "Testing and accessibility audits",
      "Deploying and monitoring",
    ],
  },
]

const TESTIMONIALS = [
  {
    name: "Mara Lindqvist",
    role: "Frontend Engineer, Northwind",
    quote:
      "This is the course I wish I had three years ago. The component module alone paid for itself in a week.",
    avatar: "https://i.pravatar.cc/120?img=47",
  },
  {
    name: "Devon Carter",
    role: "Product Designer, Lumen",
    quote:
      "Clear, practical, and zero fluff. I finally understand layout systems instead of guessing at margins.",
    avatar: "https://i.pravatar.cc/120?img=12",
  },
  {
    name: "Priya Nair",
    role: "Indie Maker",
    quote:
      "I launched my SaaS landing page the same weekend I finished. The lessons are immediately useful.",
    avatar: "https://i.pravatar.cc/120?img=32",
  },
]

const PLANS = [
  {
    name: "Self-Paced",
    price: "$149",
    note: "One-time payment",
    featured: false,
    features: [
      "48 on-demand video lessons",
      "Downloadable starter files",
      "Lifetime access & updates",
      "Community forum access",
    ],
    cta: "Enroll now",
  },
  {
    name: "Pro Cohort",
    price: "$349",
    note: "Includes live sessions",
    featured: true,
    features: [
      "Everything in Self-Paced",
      "6 weeks of live workshops",
      "Code reviews on your projects",
      "Private mentor channel",
      "Certificate of completion",
    ],
    cta: "Join the cohort",
  },
  {
    name: "Team",
    price: "$1,290",
    note: "Up to 10 seats",
    featured: false,
    features: [
      "10 Pro Cohort seats",
      "Team progress dashboard",
      "Onboarding session",
      "Invoice billing",
    ],
    cta: "Talk to sales",
  },
]

const FAQS = [
  {
    q: "Do I need prior experience?",
    a: "Some familiarity with HTML and JavaScript helps, but each module starts from fundamentals so motivated beginners can keep up.",
  },
  {
    q: "How long do I have access?",
    a: "Forever. Your enrollment includes lifetime access to all current lessons plus any future updates to the curriculum.",
  },
  {
    q: "Is there a certificate?",
    a: "Yes. Pro Cohort and Team students receive a shareable certificate of completion once they finish the final project.",
  },
  {
    q: "What is your refund policy?",
    a: "If the course isn't for you, request a full refund within 30 days of purchase, no questions asked.",
  },
]

export default function CourseLandingPage() {
  const [activePlan, setActivePlan] = React.useState("Pro Cohort")

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-2 font-semibold">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <GraduationCap className="size-5" />
            </span>
            <span>Craft UI</span>
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
              Sign in
            </Button>
            <Button size="sm" asChild={false}>
              <a href="#pricing">Enroll</a>
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
                New cohort starts July 7
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Build interfaces people love to use
              </h1>
              <p className="mt-5 max-w-xl text-lg text-muted-foreground">
                A hands-on course on modern UI engineering. Go from shaky CSS to
                shipping polished, accessible products with confidence.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="gap-2">
                  Enroll now <ArrowRight className="size-4" />
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  <PlayCircle className="size-4" /> Watch preview
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex -space-x-2">
                  {TESTIMONIALS.map((t) => (
                    <Avatar key={t.name} className="size-9 border-2 border-background">
                      <AvatarImage src={t.avatar} alt="" />
                      <AvatarFallback>{t.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">12,400+</span>{" "}
                  students already learning
                </div>
              </div>
            </div>

            <Card className="overflow-hidden shadow-sm">
              <div className="relative flex aspect-video items-center justify-center bg-primary/10">
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=70"
                  alt=""
                  className="absolute inset-0 size-full object-cover opacity-80"
                />
                <span className="relative flex size-16 items-center justify-center rounded-full bg-background/90 text-primary shadow">
                  <PlayCircle className="size-8" />
                </span>
              </div>
              <CardContent className="grid grid-cols-2 gap-4 pt-6 sm:grid-cols-4">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <div className="text-xl font-bold">{s.value}</div>
                    <div className="text-xs text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* What you'll learn */}
        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              What you&apos;ll learn
            </h2>
            <p className="mt-3 text-muted-foreground">
              Practical, project-based skills you can apply to real work the moment
              you finish each module.
            </p>
          </div>
          <ul className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
            {LEARN_POINTS.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check className="size-4" />
                </span>
                <span className="text-sm leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Curriculum */}
        <section id="curriculum" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:py-24">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight">Curriculum</h2>
              <p className="mt-3 text-muted-foreground">
                4 modules · 48 lessons · 11+ hours of video
              </p>
            </div>
            <Accordion type="single" collapsible className="mt-10 w-full">
              {CURRICULUM.map((mod, i) => (
                <AccordionItem key={mod.title} value={`mod-${i}`}>
                  <AccordionTrigger className="text-left">
                    <span className="flex flex-1 flex-col gap-1 pr-4 sm:flex-row sm:items-center sm:justify-between">
                      <span>
                        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          {mod.module}
                        </span>
                        <span className="block font-semibold">{mod.title}</span>
                      </span>
                      <span className="flex items-center gap-3 text-xs font-normal text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <PlayCircle className="size-3.5" /> {mod.lessons} lessons
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="size-3.5" /> {mod.duration}
                        </span>
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
                          <ChevronRight className="size-4 shrink-0 text-primary" />
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

        {/* Instructor */}
        <section id="instructor" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[280px_1fr]">
            <div className="mx-auto w-full max-w-xs text-center">
              <Avatar className="mx-auto size-40 border">
                <AvatarImage
                  src="https://i.pravatar.cc/240?img=15"
                  alt="Course instructor Alex Rivera"
                />
                <AvatarFallback>AR</AvatarFallback>
              </Avatar>
              <h3 className="mt-4 text-lg font-semibold">Alex Rivera</h3>
              <p className="text-sm text-muted-foreground">
                Principal Engineer & Educator
              </p>
              <div className="mt-3 flex justify-center gap-2">
                <Button variant="ghost" size="icon" aria-label="Twitter profile">
                  <Twitter className="size-4" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="LinkedIn profile">
                  <Linkedin className="size-4" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="YouTube channel">
                  <Youtube className="size-4" />
                </Button>
              </div>
            </div>
            <div>
              <Badge variant="outline" className="mb-3">
                Your instructor
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight">
                Learn from someone who ships
              </h2>
              <p className="mt-4 text-muted-foreground">
                Alex has spent over a decade building design systems and product
                interfaces at scale, from early startups to teams of hundreds. This
                course distills the patterns that actually hold up in production into
                lessons you can follow at your own pace.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {[
                  { icon: Users, label: "12k+ students taught" },
                  { icon: Award, label: "10+ years experience" },
                  { icon: Star, label: "4.9 instructor rating" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 rounded-lg border bg-card p-3"
                  >
                    <span className="flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <item.icon className="size-4" />
                    </span>
                    <span className="text-sm">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="reviews" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight">
                Loved by students
              </h2>
              <p className="mt-3 text-muted-foreground">
                Real words from people who took the leap and finished.
              </p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <Card key={t.name} className="h-full">
                  <CardContent className="flex h-full flex-col pt-6">
                    <div className="flex gap-0.5 text-primary">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="size-4 fill-current" />
                      ))}
                    </div>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <Separator className="my-4" />
                    <div className="flex items-center gap-3">
                      <Avatar className="size-9">
                        <AvatarImage src={t.avatar} alt="" />
                        <AvatarFallback>{t.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium">{t.name}</div>
                        <div className="text-xs text-muted-foreground">{t.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Choose your plan
            </h2>
            <p className="mt-3 text-muted-foreground">
              One-time payment. Lifetime access. 30-day money-back guarantee.
            </p>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
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
                      Most popular
                    </Badge>
                  )}
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.note}</CardDescription>
                    <div className="pt-2">
                      <span className="text-4xl font-bold">{plan.price}</span>
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
          <p className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="size-4 text-primary" />
            Secure checkout · Cancel anytime within 30 days
          </p>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-t bg-muted/30">
          <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight">
                Frequently asked questions
              </h2>
              <p className="mt-3 text-muted-foreground">
                Still curious? Reach out and we&apos;ll happily help.
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
              <h2 className="max-w-xl text-3xl font-bold tracking-tight">
                Ready to build interfaces you&apos;re proud of?
              </h2>
              <p className="max-w-lg text-muted-foreground">
                Join the next cohort and start shipping polished, accessible UI in
                weeks, not years.
              </p>
              <Button size="lg" className="gap-2">
                Enroll now <ArrowRight className="size-4" />
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <a href="#top" className="flex items-center gap-2 font-semibold">
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <GraduationCap className="size-5" />
              </span>
              <span>Craft UI</span>
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
              <Button variant="ghost" size="icon" aria-label="YouTube">
                <Youtube className="size-4" />
              </Button>
            </div>
          </div>
          <Separator className="my-6" />
          <p className="text-center text-xs text-muted-foreground">
            © 2026 Craft UI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
