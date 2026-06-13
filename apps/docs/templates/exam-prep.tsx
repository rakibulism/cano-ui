"use client"

import * as React from "react"
import {
  GraduationCap,
  TrendingUp,
  Target,
  Check,
  Star,
  ArrowRight,
  Sparkles,
  Clock,
  BookOpen,
  BarChart3,
  Award,
  Quote,
  Menu,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/registry/ui/accordion"

type ExamKey = "sat" | "gre" | "gmat"

const EXAMS: Record<
  ExamKey,
  {
    label: string
    full: string
    avgGain: string
    scale: string
    blurb: string
    planName: string
    price: string
    weeks: string
  }
> = {
  sat: {
    label: "SAT",
    full: "SAT",
    avgGain: "+210",
    scale: "points average lift",
    blurb: "Master the Digital SAT with adaptive drills and full-length proctored practice tests.",
    planName: "SAT Intensive",
    price: "$249",
    weeks: "8 weeks",
  },
  gre: {
    label: "GRE",
    full: "GRE",
    avgGain: "+12",
    scale: "points average lift",
    blurb: "Conquer Quant and Verbal with section-adaptive strategy and vocabulary systems.",
    planName: "GRE Accelerator",
    price: "$329",
    weeks: "10 weeks",
  },
  gmat: {
    label: "GMAT",
    full: "GMAT Focus",
    avgGain: "+90",
    scale: "points average lift",
    blurb: "Build data-sufficiency instincts and pacing for the GMAT Focus Edition.",
    planName: "GMAT Pro",
    price: "$399",
    weeks: "12 weeks",
  },
}

const STATS = [
  { value: "+210", label: "Avg. SAT score gain" },
  { value: "94%", label: "Hit their target score" },
  { value: "60k+", label: "Students coached" },
  { value: "4.9/5", label: "Average rating" },
]

const CURRICULUM: Record<ExamKey, { title: string; lessons: string; body: string }[]> = {
  sat: [
    { title: "Module 1 — Diagnostic & Score Strategy", lessons: "6 lessons", body: "Take a baseline test, map your section scores, and build a personalized point-gain roadmap." },
    { title: "Module 2 — Reading & Writing Engine", lessons: "14 lessons", body: "Evidence-based reading, grammar rules, and the question-type playbook for the verbal section." },
    { title: "Module 3 — Math Foundations & Tricks", lessons: "18 lessons", body: "Algebra, advanced math, and calculator-vs-mental shortcuts that save precious minutes." },
    { title: "Module 4 — Timed Full-Length Tests", lessons: "5 proctored exams", body: "Simulate test day under real timing, then review every miss with annotated solutions." },
  ],
  gre: [
    { title: "Module 1 — Diagnostic & Target Setting", lessons: "5 lessons", body: "Benchmark Quant and Verbal, then set a realistic program-driven goal score." },
    { title: "Module 2 — Verbal Reasoning Mastery", lessons: "16 lessons", body: "Text completion, sentence equivalence, and a 1,000-word high-frequency vocabulary system." },
    { title: "Module 3 — Quantitative Reasoning", lessons: "20 lessons", body: "Arithmetic through data interpretation with the elimination-first solving method." },
    { title: "Module 4 — Analytical Writing & Mocks", lessons: "6 proctored exams", body: "Issue and argument essay frameworks plus section-adaptive full-length simulations." },
  ],
  gmat: [
    { title: "Module 1 — Diagnostic & Pacing Plan", lessons: "5 lessons", body: "Establish baseline timing and accuracy across the three Focus Edition sections." },
    { title: "Module 2 — Quantitative Reasoning", lessons: "18 lessons", body: "Problem solving without the calculator crutch and rapid number-sense techniques." },
    { title: "Module 3 — Data Insights & Verbal", lessons: "17 lessons", body: "Data sufficiency, two-part analysis, and critical reasoning argument structures." },
    { title: "Module 4 — Adaptive Mock Exams", lessons: "6 proctored exams", body: "Full Focus Edition simulations with the question-review-and-replace flag system." },
  ],
}

const INSTRUCTORS = [
  { name: "Dr. Lena Park", role: "Head of Quant", credential: "Perfect 800 Math · 9 yrs", initials: "LP" },
  { name: "Marcus Bell", role: "Verbal Lead", credential: "340 GRE · Ivy admissions", initials: "MB" },
  { name: "Aisha Rahman", role: "Strategy Coach", credential: "Top 1% scorer · 60k hrs", initials: "AR" },
]

const FEATURES = [
  { icon: Target, title: "Adaptive question bank", desc: "8,000+ questions that adjust difficulty to your live performance, so every minute targets a weakness." },
  { icon: BarChart3, title: "Score analytics dashboard", desc: "Track section trends, pacing, and accuracy over time with predicted score projections." },
  { icon: Clock, title: "Proctored full-length tests", desc: "Realistic timing, breaks, and interface that mirror the actual digital exam experience." },
  { icon: BookOpen, title: "Annotated solutions", desc: "Every answer comes with a step-by-step walkthrough and the faster strategic shortcut." },
]

const TESTIMONIALS = [
  { name: "Jordan M.", result: "1290 → 1520 SAT", quote: "The adaptive drills found gaps I didn't even know I had. I cleared my dream-school cutoff with room to spare." },
  { name: "Priya S.", result: "308 → 326 GRE", quote: "The vocabulary system and timed mocks were game-changing. Coaches actually reviewed my essays line by line." },
  { name: "Devin T.", result: "615 → 705 GMAT", quote: "Data insights finally clicked. The pacing plan alone was worth the entire price of the course." },
]

const FAQS = [
  { q: "How long do I keep access to the course?", a: "You retain full access to your plan, all practice tests, and the question bank for 12 months from enrollment." },
  { q: "What if my score doesn't improve?", a: "If you complete the full program and don't gain points on an official test, we'll extend your access for free until you do." },
  { q: "Are the practice tests really proctored?", a: "Yes. Full-length exams run with realistic timing, breaks, and an interface that mirrors the official digital test." },
  { q: "Can I switch between exam tracks?", a: "Single-exam plans focus on one test. Our All-Access membership lets you move between SAT, GRE, and GMAT freely." },
]

export default function ExamPrep() {
  const [exam, setExam] = React.useState<ExamKey>("sat")
  const active = EXAMS[exam]

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#" className="flex items-center gap-2 font-semibold">
            <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GraduationCap className="size-5" />
            </span>
            ScoreUp
          </a>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#exams" className="transition-colors hover:text-foreground">Exams</a>
            <a href="#curriculum" className="transition-colors hover:text-foreground">Curriculum</a>
            <a href="#pricing" className="transition-colors hover:text-foreground">Pricing</a>
            <a href="#faq" className="transition-colors hover:text-foreground">FAQ</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Sign in</Button>
            <Button size="sm">Start free</Button>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu className="size-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
            <div>
              <Badge variant="secondary" className="mb-5 gap-1.5">
                <Sparkles className="size-3.5" />
                2026 Digital test-ready
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Score higher. <span className="text-primary">Get in.</span>
              </h1>
              <p className="mt-5 max-w-md text-lg text-muted-foreground">
                Adaptive prep for the SAT, GRE, and GMAT — built around proctored practice tests and coaches who've scored in the top 1%.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="gap-2">
                  Start free diagnostic
                  <ArrowRight className="size-4" />
                </Button>
                <Button size="lg" variant="outline">See plans</Button>
              </div>
              <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="size-4 fill-primary text-primary" />
                  ))}
                </div>
                Rated 4.9 by 60,000+ students
              </div>
            </div>

            <Card className="border-primary/30 bg-card shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <TrendingUp className="size-4 text-primary" />
                  Your projected progress
                </div>
                <div className="mt-4 flex items-end justify-between gap-3">
                  {[40, 58, 72, 86, 100].map((h, i) => (
                    <div key={i} className="flex flex-1 flex-col items-center gap-2">
                      <div
                        className={cn(
                          "w-full rounded-t-md",
                          i === 4 ? "bg-primary" : "bg-primary/20"
                        )}
                        style={{ height: `${h}px` }}
                      />
                      <span className="text-xs text-muted-foreground">W{i + 1}</span>
                    </div>
                  ))}
                </div>
                <Separator className="my-5" />
                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="text-3xl font-bold text-primary">{active.avgGain}</div>
                    <div className="text-xs text-muted-foreground">{active.scale}</div>
                  </div>
                  <Badge className="gap-1">
                    <Award className="size-3.5" />
                    {active.label} track
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Stat band */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-2 divide-x divide-border px-4 sm:px-6 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="px-4 py-8 text-center">
                <div className="text-3xl font-bold tracking-tight">{s.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Exam selector */}
        <section id="exams" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">Pick your exam</h2>
            <p className="mt-3 text-muted-foreground">Your curriculum, plan, and projections update instantly.</p>
          </div>

          <Tabs value={exam} onValueChange={(v) => setExam(v as ExamKey)} className="mt-8">
            <TabsList className="mx-auto grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="sat">SAT</TabsTrigger>
              <TabsTrigger value="gre">GRE</TabsTrigger>
              <TabsTrigger value="gmat">GMAT</TabsTrigger>
            </TabsList>
          </Tabs>

          <Card className="mx-auto mt-8 max-w-3xl border-primary/30">
            <CardContent className="flex flex-col items-center gap-6 p-8 text-center sm:flex-row sm:text-left">
              <div className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <GraduationCap className="size-8" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                  <h3 className="text-xl font-semibold">{active.full} Prep</h3>
                  <Badge variant="secondary">{active.weeks}</Badge>
                </div>
                <p className="mt-2 text-muted-foreground">{active.blurb}</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{active.avgGain}</div>
                <div className="text-xs text-muted-foreground">{active.scale}</div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Curriculum accordion */}
        <section id="curriculum" className="border-y bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:py-24">
            <div>
              <Badge variant="outline" className="mb-4">{active.label} curriculum</Badge>
              <h2 className="text-3xl font-bold tracking-tight">A roadmap from diagnostic to test day</h2>
              <p className="mt-4 text-muted-foreground">
                Four guided modules that build the skills, speed, and confidence to hit your target — adapting as you switch exams above.
              </p>
              <Button variant="outline" className="mt-6 gap-2">
                Download syllabus
                <ArrowRight className="size-4" />
              </Button>
            </div>
            <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
              {CURRICULUM[exam].map((m, i) => (
                <AccordionItem key={m.title} value={`item-${i}`}>
                  <AccordionTrigger className="text-left">
                    <span className="flex items-center gap-3">
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                        {i + 1}
                      </span>
                      {m.title}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">{m.body}</p>
                    <Badge variant="secondary" className="mt-3">{m.lessons}</Badge>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Practice tests feature section */}
        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">Practice that predicts</Badge>
            <h2 className="text-3xl font-bold tracking-tight">Full-length tests, real analytics</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Everything you need to walk into the exam room knowing exactly what to expect.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <Card key={f.title}>
                <CardContent className="flex gap-4 p-6">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <f.icon className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{f.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Instructors */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight">Coached by top-1% scorers</h2>
              <p className="mt-3 text-muted-foreground">Learn the strategies that actually move the needle.</p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {INSTRUCTORS.map((p) => (
                <Card key={p.name} className="text-center">
                  <CardContent className="p-8">
                    <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
                      {p.initials}
                    </div>
                    <h3 className="mt-4 font-semibold">{p.name}</h3>
                    <div className="text-sm text-primary">{p.role}</div>
                    <p className="mt-2 text-sm text-muted-foreground">{p.credential}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">Simple, results-driven pricing</h2>
            <p className="mt-3 text-muted-foreground">The highlighted plan follows your selected exam.</p>
          </div>
          <div className="mt-12 grid items-start gap-6 lg:grid-cols-3">
            <Card>
              <CardContent className="p-8">
                <h3 className="font-semibold">Free Diagnostic</h3>
                <div className="mt-3 text-3xl font-bold">$0</div>
                <p className="mt-1 text-sm text-muted-foreground">Find your baseline score.</p>
                <Separator className="my-6" />
                <ul className="space-y-3 text-sm">
                  {["1 full-length diagnostic", "Score breakdown report", "Sample lessons"].map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <Check className="size-4 text-primary" /> {f}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="mt-7 w-full">Start free</Button>
              </CardContent>
            </Card>

            <Card className="border-primary shadow-md ring-1 ring-primary">
              <CardContent className="p-8">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{active.planName}</h3>
                  <Badge>Recommended</Badge>
                </div>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{active.price}</span>
                  <span className="text-sm text-muted-foreground">/ {active.weeks}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">Everything for the {active.label}.</p>
                <Separator className="my-6" />
                <ul className="space-y-3 text-sm">
                  {["Full adaptive curriculum", "5+ proctored practice tests", "Score analytics dashboard", "Coach essay reviews"].map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <Check className="size-4 text-primary" /> {f}
                    </li>
                  ))}
                </ul>
                <Button className="mt-7 w-full">Enroll in {active.label}</Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="font-semibold">All-Access</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-3xl font-bold">$599</span>
                  <span className="text-sm text-muted-foreground">/ year</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">SAT, GRE & GMAT together.</p>
                <Separator className="my-6" />
                <ul className="space-y-3 text-sm">
                  {["All three exam tracks", "Unlimited practice tests", "Priority coach support", "Score-gain guarantee"].map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <Check className="size-4 text-primary" /> {f}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="mt-7 w-full">Go all-access</Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Testimonials */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight">Real students, real score jumps</h2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <Card key={t.name}>
                  <CardContent className="p-6">
                    <Quote className="size-6 text-primary/40" />
                    <p className="mt-3 text-sm text-muted-foreground">{t.quote}</p>
                    <Separator className="my-4" />
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{t.name}</span>
                      <Badge variant="secondary">{t.result}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">Frequently asked questions</h2>
          </div>
          <Accordion type="single" collapsible className="mt-10 w-full">
            {FAQS.map((f, i) => (
              <AccordionItem key={f.q} value={`faq-${i}`}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">{f.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* CTA */}
        <section className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6">
          <Card className="overflow-hidden border-primary/30 bg-primary text-primary-foreground">
            <CardContent className="flex flex-col items-center gap-6 p-10 text-center sm:p-14">
              <h2 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
                Your target score is closer than you think
              </h2>
              <p className="max-w-xl text-primary-foreground/80">
                Start with a free diagnostic and get a personalized point-gain plan for the {active.label} in minutes.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg" variant="secondary" className="gap-2">
                  Start free diagnostic
                  <ArrowRight className="size-4" />
                </Button>
                <Button size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
                  Talk to an advisor
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <div className="flex items-center gap-2 font-semibold text-foreground">
            <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GraduationCap className="size-4" />
            </span>
            ScoreUp
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a href="#exams" className="hover:text-foreground">Exams</a>
            <a href="#pricing" className="hover:text-foreground">Pricing</a>
            <a href="#faq" className="hover:text-foreground">FAQ</a>
            <a href="#" className="hover:text-foreground">Privacy</a>
          </nav>
          <span>© 2026 ScoreUp Prep, Inc.</span>
        </div>
      </footer>
    </div>
  )
}
