"use client"
import * as React from "react"
import {
  GraduationCap,
  Calendar,
  ArrowRight,
  TrendingUp,
  Briefcase,
  Users,
  Clock,
  Check,
  Star,
  ChevronDown,
  Database,
  BarChart3,
  Code2,
  Brain,
  LineChart,
  Sigma,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/registry/ui/accordion"

const NAV = ["Curriculum", "Outcomes", "Instructors", "Pricing", "FAQ"]

const STATS = [
  { icon: TrendingUp, value: "$118k", label: "Median starting salary" },
  { icon: Briefcase, value: "94%", label: "Hired within 6 months" },
  { icon: Users, value: "3,200+", label: "Graduates placed" },
  { icon: Star, value: "4.9/5", label: "Average cohort rating" },
]

const MODULES = [
  {
    title: "01 — Python & Data Foundations",
    weeks: "Weeks 1–2",
    desc: "Python for data, NumPy, pandas, clean data pipelines, and reproducible notebooks.",
    lessons: ["Pythonic data wrangling", "Vectorized NumPy", "pandas mastery", "Git for analysts"],
  },
  {
    title: "02 — Statistics & Experimentation",
    weeks: "Weeks 3–4",
    desc: "Probability, hypothesis testing, A/B experiments, and statistical reasoning that holds up.",
    lessons: ["Distributions & inference", "Confidence intervals", "A/B test design", "Causal thinking"],
  },
  {
    title: "03 — Machine Learning",
    weeks: "Weeks 5–8",
    desc: "Supervised & unsupervised learning, feature engineering, and model evaluation with scikit-learn.",
    lessons: ["Regression & trees", "Feature engineering", "Model evaluation", "Ensembles & tuning"],
  },
  {
    title: "04 — Deep Learning & NLP",
    weeks: "Weeks 9–10",
    desc: "Neural networks, embeddings, and modern NLP workflows with PyTorch and transformers.",
    lessons: ["Neural net basics", "PyTorch workflows", "Embeddings", "Transformers in practice"],
  },
  {
    title: "05 — Capstone & Career",
    weeks: "Weeks 11–12",
    desc: "Ship a portfolio-grade project end to end, plus interview prep and recruiter intros.",
    lessons: ["Scoping a project", "Deployment basics", "Portfolio polish", "Mock interviews"],
  },
]

const INSTRUCTORS = [
  {
    name: "Dr. Lena Ortiz",
    role: "Lead Instructor · ex-Staff DS @ Stripe",
    img: "https://i.pravatar.cc/160?img=47",
    fallback: "LO",
  },
  {
    name: "Marcus Bell",
    role: "ML Engineer · ex-Spotify",
    img: "https://i.pravatar.cc/160?img=12",
    fallback: "MB",
  },
  {
    name: "Priya Nair",
    role: "Data Science Mentor · ex-Airbnb",
    img: "https://i.pravatar.cc/160?img=32",
    fallback: "PN",
  },
]

const TOOLS = [
  { name: "Python", icon: Code2 },
  { name: "pandas", icon: Database },
  { name: "scikit-learn", icon: Brain },
  { name: "PyTorch", icon: Sigma },
  { name: "SQL", icon: Database },
  { name: "Tableau", icon: BarChart3 },
  { name: "matplotlib", icon: LineChart },
  { name: "Jupyter", icon: Sparkles },
]

const TESTIMONIALS = [
  {
    quote:
      "I went from a marketing role to a data analyst job at a fintech in four months. The capstone was literally what got me the interview.",
    name: "Sofia Reyes",
    role: "Data Analyst @ Plaid",
    img: "https://i.pravatar.cc/120?img=5",
    fallback: "SR",
  },
  {
    quote:
      "The mentors actually review your code. That feedback loop is what made the machine learning module click for me.",
    name: "Daniel Okafor",
    role: "ML Engineer @ Shopify",
    img: "https://i.pravatar.cc/120?img=15",
    fallback: "DO",
  },
  {
    quote:
      "Best investment I've made in my career. The pace is intense but the career support carries you all the way to an offer.",
    name: "Mei Tanaka",
    role: "Data Scientist @ Notion",
    img: "https://i.pravatar.cc/120?img=20",
    fallback: "MT",
  },
]

const FAQ = [
  {
    q: "Do I need a technical background?",
    a: "No prior data science experience required. You should be comfortable with basic spreadsheets and willing to commit serious study hours. We run a free prep course before each cohort.",
  },
  {
    q: "How much time should I budget per week?",
    a: "Plan for 40–50 hours per week for the full-time track, or 15–20 hours for part-time. Live sessions are recorded so you can revisit anything.",
  },
  {
    q: "Is the program remote?",
    a: "Yes, the entire program is remote with live instruction across multiple time zones, plus async support and 1:1 mentor calls.",
  },
  {
    q: "What if I don't get a job?",
    a: "Eligible graduates on the Career Plan are covered by our job guarantee — if you don't land a qualifying role within 12 months, you get a full tuition refund.",
  },
]

export default function DataScienceCourseTemplate() {
  const [annual, setAnnual] = React.useState(true)

  const upfront = 14000
  const monthly = 1400
  const planLabel = annual ? "Pay upfront" : "Monthly plan"

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center gap-2 font-semibold">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <GraduationCap className="size-5" />
            </span>
            <span className="text-lg tracking-tight">Inflection</span>
          </a>
          <div className="hidden items-center gap-7 md:flex">
            {NAV.map((item) => (
              <a
                key={item}
                href={"#" + item.toLowerCase()}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              Sign in
            </Button>
            <Button size="sm">Enroll now</Button>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 via-background to-background" />
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
            <div>
              <Badge variant="secondary" className="mb-5 gap-1.5">
                <Calendar className="size-3.5" />
                Next cohort starts Sept 8, 2026
              </Badge>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Become a{" "}
                <span className="text-primary">data scientist</span> in 12 weeks.
              </h1>
              <p className="mt-6 max-w-md text-lg text-muted-foreground">
                A live, mentor-led bootcamp that takes you from Python basics to
                deployed machine learning — with a job guarantee.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button size="lg" className="gap-2">
                  Enroll for September
                  <ArrowRight className="size-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Download syllabus
                </Button>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Clock className="size-4" />
                  Full-time & part-time
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="size-4" />
                  Limited to 30 seats
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="size-4 text-primary" />
                  100% remote
                </span>
              </div>
            </div>

            <Card className="border-primary/20 shadow-sm">
              <CardContent className="p-6">
                <p className="text-sm font-medium text-muted-foreground">
                  Upcoming cohorts
                </p>
                <ul className="mt-4 space-y-3">
                  {[
                    { date: "Sept 8, 2026", note: "Full-time · 9 seats left", hot: true },
                    { date: "Oct 20, 2026", note: "Part-time · 22 seats left", hot: false },
                    { date: "Jan 12, 2027", note: "Full-time · Early access", hot: false },
                  ].map((c) => (
                    <li
                      key={c.date}
                      className="flex items-center justify-between rounded-lg border bg-muted/30 px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                          <Calendar className="size-4" />
                        </span>
                        <div>
                          <p className="text-sm font-medium">{c.date}</p>
                          <p className="text-xs text-muted-foreground">{c.note}</p>
                        </div>
                      </div>
                      {c.hot && <Badge className="text-xs">Filling fast</Badge>}
                    </li>
                  ))}
                </ul>
                <Button className="mt-5 w-full">Reserve your seat</Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Outcomes stat band */}
        <section id="outcomes" className="border-b bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-px px-6 py-14 sm:gap-8 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="px-2 text-center sm:text-left">
                <s.icon className="mx-auto size-6 text-primary sm:mx-0" />
                <p className="mt-3 text-3xl font-semibold tracking-tight">{s.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Curriculum */}
        <section id="curriculum" className="mx-auto w-full max-w-4xl px-6 py-20">
          <div className="mb-10 text-center">
            <Badge variant="outline" className="mb-3">Curriculum</Badge>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Twelve weeks, five modules
            </h2>
            <p className="mt-3 text-muted-foreground">
              A structured path from fundamentals to a deployed capstone project.
            </p>
          </div>
          <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
            {MODULES.map((m, i) => (
              <AccordionItem key={m.title} value={"item-" + i}>
                <AccordionTrigger className="text-left">
                  <span className="flex flex-1 items-center justify-between gap-4 pr-2">
                    <span className="font-medium">{m.title}</span>
                    <span className="shrink-0 text-xs text-muted-foreground">{m.weeks}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">{m.desc}</p>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {m.lessons.map((l) => (
                      <li key={l} className="flex items-center gap-2 text-sm">
                        <Check className="size-4 text-primary" />
                        {l}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Tools logo grid */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-16">
            <p className="text-center text-sm font-medium uppercase tracking-wide text-muted-foreground">
              Tools you'll master
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {TOOLS.map((t) => (
                <div
                  key={t.name}
                  className="flex items-center gap-3 rounded-xl border bg-card px-4 py-4"
                >
                  <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <t.icon className="size-5" />
                  </span>
                  <span className="text-sm font-medium">{t.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Instructors */}
        <section id="instructors" className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="mb-10 text-center">
            <Badge variant="outline" className="mb-3">Instructors</Badge>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Learn from practitioners
            </h2>
            <p className="mt-3 text-muted-foreground">
              Working data scientists who've shipped models at scale.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {INSTRUCTORS.map((p) => (
              <Card key={p.name} className="text-center">
                <CardContent className="flex flex-col items-center p-8">
                  <Avatar className="size-20">
                    <AvatarImage src={p.img} alt="" />
                    <AvatarFallback>{p.fallback}</AvatarFallback>
                  </Avatar>
                  <p className="mt-4 font-semibold">{p.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{p.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="mb-10 text-center">
              <Badge variant="outline" className="mb-3">Graduates</Badge>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Careers, changed
              </h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <Card key={t.name} className="bg-card">
                  <CardContent className="flex h-full flex-col p-6">
                    <div className="flex gap-0.5 text-primary">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="size-4 fill-current" />
                      ))}
                    </div>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                      “{t.quote}”
                    </p>
                    <Separator className="my-5" />
                    <div className="flex items-center gap-3">
                      <Avatar className="size-10">
                        <AvatarImage src={t.img} alt="" />
                        <AvatarFallback>{t.fallback}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="mx-auto w-full max-w-5xl px-6 py-20">
          <div className="mb-8 text-center">
            <Badge variant="outline" className="mb-3">Pricing</Badge>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Invest in your next role
            </h2>
            <div className="mt-6 inline-flex items-center gap-3 rounded-full border bg-card px-4 py-2">
              <span
                className={cn(
                  "text-sm font-medium transition-colors",
                  !annual ? "text-foreground" : "text-muted-foreground"
                )}
              >
                Monthly
              </span>
              <Switch
                checked={annual}
                onCheckedChange={setAnnual}
                aria-label="Toggle payment plan"
              />
              <span
                className={cn(
                  "text-sm font-medium transition-colors",
                  annual ? "text-foreground" : "text-muted-foreground"
                )}
              >
                Pay upfront
              </span>
              <Badge variant="secondary" className="ml-1">Save $2,800</Badge>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardContent className="flex h-full flex-col p-8">
                <p className="text-sm font-medium text-muted-foreground">Self-Paced</p>
                <p className="mt-4 text-4xl font-semibold tracking-tight">
                  {annual ? "$6,500" : "$700"}
                  {!annual && <span className="text-base font-normal text-muted-foreground">/mo</span>}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {planLabel} · learn on your own schedule
                </p>
                <ul className="mt-6 flex-1 space-y-3 text-sm">
                  {["Full curriculum access", "Recorded lectures", "Community forum", "Graded projects"].map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <Check className="size-4 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="mt-8 w-full">Choose Self-Paced</Button>
              </CardContent>
            </Card>

            <Card className="relative border-primary shadow-md">
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most popular</Badge>
              <CardContent className="flex h-full flex-col p-8">
                <p className="text-sm font-medium text-primary">Career Track</p>
                <p className="mt-4 text-4xl font-semibold tracking-tight">
                  {annual ? "$" + upfront.toLocaleString() : "$" + monthly.toLocaleString()}
                  {!annual && <span className="text-base font-normal text-muted-foreground">/mo</span>}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {planLabel}{annual ? "" : " · 12 months"} · includes job guarantee
                </p>
                <ul className="mt-6 flex-1 space-y-3 text-sm">
                  {[
                    "Everything in Self-Paced",
                    "Live mentor-led sessions",
                    "1:1 career coaching",
                    "Recruiter introductions",
                    "Job guarantee or refund",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <Check className="size-4 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button className="mt-8 w-full">Enroll in Career Track</Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-t bg-muted/30">
          <div className="mx-auto w-full max-w-3xl px-6 py-20">
            <div className="mb-10 text-center">
              <Badge variant="outline" className="mb-3">FAQ</Badge>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Questions, answered
              </h2>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {FAQ.map((f, i) => (
                <AccordionItem key={f.q} value={"faq-" + i}>
                  <AccordionTrigger className="text-left font-medium">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mx-auto w-full max-w-6xl px-6 py-20">
          <Card className="overflow-hidden border-primary/20 bg-primary/5">
            <CardContent className="flex flex-col items-center gap-6 p-12 text-center">
              <span className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <GraduationCap className="size-6" />
              </span>
              <h2 className="max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
                The September cohort is filling fast
              </h2>
              <p className="max-w-md text-muted-foreground">
                Apply today, talk to an admissions advisor, and start the free prep
                course this week — no commitment required.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button size="lg" className="gap-2">
                  Apply now
                  <ArrowRight className="size-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Book an advisor call
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 sm:flex-row">
          <div className="flex items-center gap-2 text-sm font-medium">
            <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GraduationCap className="size-4" />
            </span>
            Inflection Data School
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 Inflection. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
