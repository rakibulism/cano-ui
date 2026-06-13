"use client"

import * as React from "react"
import {
  GraduationCap,
  Award,
  ShieldCheck,
  CheckCircle2,
  Clock,
  DollarSign,
  Users,
  Star,
  ArrowRight,
  Briefcase,
  TrendingUp,
  BookOpen,
  Quote,
  Menu,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/registry/ui/accordion"

type ProgramKey = "business" | "cs" | "nursing" | "design"

const PROGRAMS: Record<
  ProgramKey,
  {
    label: string
    degree: string
    tagline: string
    duration: string
    credits: string
    courses: { title: string; term: string }[]
    outcomes: { role: string; salary: string }[]
    median: string
    growth: string
  }
> = {
  business: {
    label: "Business",
    degree: "Online MBA",
    tagline: "Lead teams, scale ventures, and master modern management.",
    duration: "24 months",
    credits: "48 credits",
    courses: [
      { title: "Financial Accounting & Analysis", term: "Term 1" },
      { title: "Marketing Strategy", term: "Term 2" },
      { title: "Operations & Supply Chain", term: "Term 3" },
      { title: "Corporate Finance", term: "Term 4" },
      { title: "Leadership & Org Behavior", term: "Term 5" },
      { title: "Capstone Strategy Project", term: "Term 6" },
    ],
    outcomes: [
      { role: "Product Manager", salary: "$132k" },
      { role: "Operations Director", salary: "$145k" },
      { role: "Management Consultant", salary: "$128k" },
    ],
    median: "$118,400",
    growth: "+14%",
  },
  cs: {
    label: "Computer Science",
    degree: "MS in Computer Science",
    tagline: "Build production systems, ML pipelines, and scalable software.",
    duration: "20 months",
    credits: "36 credits",
    courses: [
      { title: "Algorithms & Data Structures", term: "Term 1" },
      { title: "Distributed Systems", term: "Term 2" },
      { title: "Machine Learning", term: "Term 3" },
      { title: "Cloud Architecture", term: "Term 4" },
      { title: "Security Engineering", term: "Term 5" },
      { title: "Capstone Engineering Project", term: "Term 6" },
    ],
    outcomes: [
      { role: "Software Engineer", salary: "$148k" },
      { role: "ML Engineer", salary: "$165k" },
      { role: "Platform Architect", salary: "$172k" },
    ],
    median: "$152,900",
    growth: "+22%",
  },
  nursing: {
    label: "Nursing",
    degree: "MSN — Family Nurse Practitioner",
    tagline: "Advance clinical practice with evidence-based patient care.",
    duration: "30 months",
    credits: "52 credits",
    courses: [
      { title: "Advanced Pathophysiology", term: "Term 1" },
      { title: "Pharmacology for Practice", term: "Term 2" },
      { title: "Health Assessment", term: "Term 3" },
      { title: "Population Health", term: "Term 4" },
      { title: "Primary Care Practicum", term: "Term 5" },
      { title: "Clinical Residency", term: "Term 6" },
    ],
    outcomes: [
      { role: "Nurse Practitioner", salary: "$124k" },
      { role: "Clinical Nurse Lead", salary: "$112k" },
      { role: "Nurse Educator", salary: "$98k" },
    ],
    median: "$121,600",
    growth: "+38%",
  },
  design: {
    label: "Design",
    degree: "MA in UX & Product Design",
    tagline: "Craft human-centered products from research to launch.",
    duration: "18 months",
    credits: "32 credits",
    courses: [
      { title: "Design Research Methods", term: "Term 1" },
      { title: "Interaction Design", term: "Term 2" },
      { title: "Visual Systems & Typography", term: "Term 3" },
      { title: "Prototyping & Testing", term: "Term 4" },
      { title: "Design Leadership", term: "Term 5" },
      { title: "Portfolio Capstone", term: "Term 6" },
    ],
    outcomes: [
      { role: "Product Designer", salary: "$126k" },
      { role: "UX Researcher", salary: "$118k" },
      { role: "Design Manager", salary: "$152k" },
    ],
    median: "$122,300",
    growth: "+16%",
  },
}

const ACCREDITORS = [
  { name: "WASC Accredited", icon: ShieldCheck },
  { name: "AACSB Member", icon: Award },
  { name: "CCNE Approved", icon: CheckCircle2 },
]

const STATS = [
  { value: "94%", label: "Graduate employment within 6 months" },
  { value: "38k+", label: "Alumni across 60+ countries" },
  { value: "1:14", label: "Faculty to student ratio" },
  { value: "100%", label: "Online & asynchronous" },
]

const FACULTY = [
  {
    name: "Dr. Elena Marsh",
    title: "Professor of Business Strategy",
    img: "https://i.pravatar.cc/160?img=47",
    note: "Former VP at a Fortune 100 firm.",
  },
  {
    name: "Dr. Rajiv Bhatt",
    title: "Chair, Computer Science",
    img: "https://i.pravatar.cc/160?img=12",
    note: "20+ years in distributed systems.",
  },
  {
    name: "Dr. Amara Okafor",
    title: "Director of Nursing Practice",
    img: "https://i.pravatar.cc/160?img=32",
    note: "Board-certified FNP & researcher.",
  },
  {
    name: "Prof. Liam Chen",
    title: "Head of Design Studio",
    img: "https://i.pravatar.cc/160?img=15",
    note: "Led design at two unicorns.",
  },
]

const TESTIMONIALS = [
  {
    quote:
      "I kept my full-time job and still earned my degree. The asynchronous format made it genuinely possible.",
    name: "Priya Anand",
    program: "MS Computer Science '24",
    img: "https://i.pravatar.cc/120?img=45",
  },
  {
    quote:
      "The capstone connected me directly with a hiring manager. I had an offer before graduation.",
    name: "Marcus Webb",
    program: "Online MBA '23",
    img: "https://i.pravatar.cc/120?img=68",
  },
  {
    quote:
      "Faculty were practicing clinicians. Everything I learned applied to my shifts the very next week.",
    name: "Sofia Reyes",
    program: "MSN-FNP '24",
    img: "https://i.pravatar.cc/120?img=49",
  },
]

const FAQS = [
  {
    q: "Is this degree fully online?",
    a: "Yes. All coursework is delivered online with asynchronous lectures, so you can study around your schedule. Select programs include optional in-person residencies.",
  },
  {
    q: "Will my diploma say 'online'?",
    a: "No. Online graduates receive the same diploma and transcript as on-campus students. The credential is identical and fully accredited.",
  },
  {
    q: "Can I transfer credits?",
    a: "You may transfer up to 12 eligible graduate credits from a regionally accredited institution after a transcript review.",
  },
  {
    q: "What financial aid is available?",
    a: "Federal aid, employer tuition assistance, scholarships, and monthly payment plans are all available to qualifying applicants.",
  },
]

export default function OnlineDegreePage() {
  const [active, setActive] = React.useState<ProgramKey>("business")
  const program = PROGRAMS[active]
  const tabs = Object.keys(PROGRAMS) as ProgramKey[]

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="text-lg font-semibold tracking-tight">
              Meridian University
            </span>
          </div>
          <div className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#programs" className="transition-colors hover:text-foreground">
              Programs
            </a>
            <a href="#tuition" className="transition-colors hover:text-foreground">
              Tuition
            </a>
            <a href="#faculty" className="transition-colors hover:text-foreground">
              Faculty
            </a>
            <a href="#faq" className="transition-colors hover:text-foreground">
              FAQ
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              Request info
            </Button>
            <Button size="sm">Apply now</Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-24">
            <div>
              <Badge variant="secondary" className="mb-4 gap-1.5">
                <Star className="h-3.5 w-3.5" /> Ranked Top 25 for Online Graduate Programs
              </Badge>
              <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                Earn an accredited degree, on your schedule.
              </h1>
              <p className="mt-5 max-w-md text-lg text-muted-foreground">
                Flexible, fully-online master's programs built for working
                professionals — taught by the same faculty who teach on campus.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Button size="lg" className="gap-2">
                  Start your application <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Download brochure
                </Button>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                {ACCREDITORS.map((a) => (
                  <div
                    key={a.name}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <a.icon className="h-4 w-4 text-primary" />
                    {a.name}
                  </div>
                ))}
              </div>
            </div>

            <Card className="border-primary/20 shadow-sm">
              <CardContent className="p-6">
                <p className="text-sm font-semibold">Get program details</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  No commitment. We'll email a personalized overview.
                </p>
                <div className="mt-5 grid gap-4">
                  <div className="grid gap-1.5">
                    <Label htmlFor="name">Full name</Label>
                    <Input id="name" placeholder="Jordan Avery" />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="email">Email address</Label>
                    <Input id="email" type="email" placeholder="jordan@email.com" />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="prog">Program of interest</Label>
                    <select
                      id="prog"
                      className="h-9 w-full rounded-md border bg-background px-3 text-sm text-foreground"
                      defaultValue="business"
                    >
                      {tabs.map((k) => (
                        <option key={k} value={k}>
                          {PROGRAMS[k].degree}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Button className="w-full">Request information</Button>
                  <p className="text-center text-xs text-muted-foreground">
                    Next cohort starts September 2026.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Stats band */}
        <section className="border-b bg-primary text-primary-foreground">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-bold sm:text-4xl">{s.value}</div>
                <div className="mt-1 text-sm text-primary-foreground/80">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Program selector */}
        <section id="programs" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Explore our programs
            </h2>
            <p className="mt-3 text-muted-foreground">
              Select a discipline to see the curriculum and career outcomes.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {tabs.map((k) => (
              <button
                key={k}
                onClick={() => setActive(k)}
                className={cn(
                  "rounded-full border px-5 py-2 text-sm font-medium transition-colors",
                  active === k
                    ? "border-primary bg-primary text-primary-foreground"
                    : "bg-background text-muted-foreground hover:bg-muted"
                )}
              >
                {PROGRAMS[k].label}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {/* Program overview */}
            <Card className="lg:col-span-1">
              <CardContent className="p-6">
                <Badge variant="outline" className="mb-3">
                  {program.label}
                </Badge>
                <h3 className="text-2xl font-bold tracking-tight">
                  {program.degree}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {program.tagline}
                </p>
                <Separator className="my-5" />
                <ul className="grid gap-4 text-sm">
                  <li className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Duration</span>
                    <span className="ml-auto font-medium">{program.duration}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Credits</span>
                    <span className="ml-auto font-medium">{program.credits}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Median salary</span>
                    <span className="ml-auto font-medium">{program.median}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Briefcase className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Job growth</span>
                    <span className="ml-auto font-medium">{program.growth}</span>
                  </li>
                </ul>
                <Button className="mt-6 w-full gap-2">
                  Apply to {program.label} <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Curriculum */}
            <Card className="lg:col-span-1">
              <CardContent className="p-6">
                <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Sample curriculum
                </h4>
                <ul className="grid gap-3">
                  {program.courses.map((c) => (
                    <li
                      key={c.title}
                      className="flex items-start gap-3 rounded-lg border bg-muted/30 p-3"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <div>
                        <div className="text-sm font-medium leading-snug">
                          {c.title}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {c.term}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Outcomes */}
            <Card className="lg:col-span-1">
              <CardContent className="p-6">
                <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Where graduates go
                </h4>
                <ul className="grid gap-3">
                  {program.outcomes.map((o) => (
                    <li
                      key={o.role}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                          <Briefcase className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-medium">{o.role}</span>
                      </div>
                      <span className="text-sm font-semibold text-primary">
                        {o.salary}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 rounded-lg bg-muted/30 p-4 text-sm text-muted-foreground">
                  Median salary for {program.label} graduates is{" "}
                  <span className="font-semibold text-foreground">
                    {program.median}
                  </span>{" "}
                  with {program.growth} projected role growth.
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Tuition */}
        <section id="tuition" className="border-y bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Transparent, affordable tuition
              </h2>
              <p className="mt-3 text-muted-foreground">
                Pay per credit with no hidden fees. Most students fund their
                degree through a mix of aid, employer support, and monthly plans.
              </p>
              <ul className="mt-6 grid gap-3 text-sm">
                {[
                  "$685 per credit hour, locked at enrollment",
                  "No application or technology fees",
                  "Employer tuition reimbursement accepted",
                  "Interest-free monthly payment plans",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <Card>
              <CardContent className="p-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <DollarSign className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Estimated total — {program.degree}
                    </p>
                    <p className="text-2xl font-bold">
                      {active === "cs"
                        ? "$24,660"
                        : active === "design"
                          ? "$21,920"
                          : active === "nursing"
                            ? "$35,620"
                            : "$32,880"}
                    </p>
                  </div>
                </div>
                <Separator className="my-5" />
                <div className="grid gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Per credit</span>
                    <span className="font-medium">$685</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total credits</span>
                    <span className="font-medium">{program.credits}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Avg. aid awarded
                    </span>
                    <span className="font-medium text-primary">up to 40%</span>
                  </div>
                </div>
                <Button className="mt-6 w-full" variant="outline">
                  See payment options
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Faculty */}
        <section id="faculty" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Learn from leaders in the field
            </h2>
            <p className="mt-3 text-muted-foreground">
              Faculty who balance academic depth with real-world practice.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FACULTY.map((f) => (
              <Card key={f.name} className="text-center">
                <CardContent className="flex flex-col items-center p-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={f.img} alt="" />
                    <AvatarFallback>
                      {f.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="mt-4 font-semibold">{f.name}</h3>
                  <p className="text-sm text-primary">{f.title}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{f.note}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
            <h2 className="text-center text-3xl font-bold tracking-tight">
              Stories from our graduates
            </h2>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <Card key={t.name}>
                  <CardContent className="flex h-full flex-col p-6">
                    <Quote className="h-6 w-6 text-primary/40" />
                    <p className="mt-3 flex-1 text-sm leading-relaxed">
                      "{t.quote}"
                    </p>
                    <div className="mt-5 flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={t.img} alt="" />
                        <AvatarFallback>{t.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium">{t.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {t.program}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
          <h2 className="text-center text-3xl font-bold tracking-tight">
            Frequently asked questions
          </h2>
          <Accordion type="single" collapsible className="mt-8 w-full">
            {FAQS.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-sm font-medium">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Apply CTA */}
        <section className="border-t bg-primary text-primary-foreground">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-foreground/10">
              <GraduationCap className="h-7 w-7" />
            </div>
            <h2 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
              Your next chapter starts here
            </h2>
            <p className="max-w-xl text-primary-foreground/80">
              Applications for the September 2026 cohort are now open. Join 38,000+
              alumni building careers that move the world forward.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button size="lg" variant="secondary" className="gap-2">
                Apply now <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
              >
                Talk to an advisor
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-background">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            <span className="font-medium text-foreground">Meridian University</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href="#programs" className="hover:text-foreground">
              Programs
            </a>
            <a href="#tuition" className="hover:text-foreground">
              Tuition
            </a>
            <a href="#faculty" className="hover:text-foreground">
              Faculty
            </a>
            <a href="#faq" className="hover:text-foreground">
              FAQ
            </a>
          </div>
          <p>© 2026 Meridian University. Accredited & equal-opportunity.</p>
        </div>
      </footer>
    </div>
  )
}
