"use client"
import * as React from "react"
import {
  ShieldCheck,
  Award,
  GraduationCap,
  CheckCircle2,
  Clock,
  BookOpen,
  Users,
  Star,
  ArrowRight,
  Briefcase,
  FileCheck,
  Infinity as InfinityIcon,
  BadgeCheck,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/registry/ui/accordion"

const STATS = [
  { value: "94%", label: "First-attempt pass rate" },
  { value: "38k+", label: "Professionals certified" },
  { value: "+27%", label: "Average salary uplift" },
  { value: "4.9/5", label: "Learner satisfaction" },
]

const DOMAINS = [
  {
    id: "d1",
    title: "Domain 1 — Foundations & Governance",
    weight: "18%",
    topics: ["Frameworks & standards", "Risk fundamentals", "Roles & accountability", "Policy lifecycle"],
  },
  {
    id: "d2",
    title: "Domain 2 — Architecture & Design",
    weight: "24%",
    topics: ["Reference architectures", "Control selection", "Secure design patterns", "Trade-off analysis"],
  },
  {
    id: "d3",
    title: "Domain 3 — Implementation & Operations",
    weight: "30%",
    topics: ["Deployment pipelines", "Monitoring & telemetry", "Incident handling", "Change management"],
  },
  {
    id: "d4",
    title: "Domain 4 — Assessment & Audit",
    weight: "16%",
    topics: ["Evidence collection", "Gap analysis", "Continuous assurance", "Reporting to stakeholders"],
  },
  {
    id: "d5",
    title: "Domain 5 — Leadership & Ethics",
    weight: "12%",
    topics: ["Program strategy", "Vendor oversight", "Professional ethics", "Stakeholder communication"],
  },
]

const PERKS = [
  { icon: BookOpen, title: "120+ lessons", body: "Structured video modules mapped to every exam domain." },
  { icon: FileCheck, title: "6 practice exams", body: "Timed mocks with detailed answer rationales." },
  { icon: Briefcase, title: "Capstone project", body: "A reviewed, portfolio-ready implementation case study." },
  { icon: InfinityIcon, title: "Lifetime access", body: "Keep your materials and all future content updates." },
  { icon: Users, title: "Cohort community", body: "Private forum, office hours, and study groups." },
  { icon: BadgeCheck, title: "Digital credential", body: "A verifiable, shareable badge for your profile." },
]

const INSTRUCTORS = [
  { name: "Dr. Elena Park", role: "Lead Examiner · 18 yrs", initials: "EP", note: "Co-authored the official exam blueprint." },
  { name: "Marcus Bell", role: "Principal Architect", initials: "MB", note: "Built assurance programs at scale across 40 teams." },
  { name: "Aisha Rahman", role: "Audit Practice Director", initials: "AR", note: "Leads continuous-assurance research and labs." },
]

const TESTIMONIALS = [
  { name: "Priya N.", role: "Security Lead", quote: "The domain breakdown mirrored the real exam exactly. I passed on the first try with weeks to spare." },
  { name: "Tom W.", role: "Cloud Engineer", quote: "The capstone alone was worth it — I used it verbatim in an interview and got the offer." },
  { name: "Sofia L.", role: "Compliance Manager", quote: "Best-structured prep I've taken. The practice exams felt harder than the actual one." },
]

const FAQS = [
  { q: "Do I need experience before enrolling?", a: "We recommend one to two years in a related role, but motivated beginners complete the foundations track first and succeed." },
  { q: "How long do I have to finish?", a: "You get lifetime access. Most learners complete the program in eight to twelve weeks at a few hours per week." },
  { q: "Is the exam voucher included?", a: "Yes. Both the Individual and Team plans include one accredited exam voucher per seat." },
  { q: "What if I don't pass?", a: "Our pass guarantee gives you free access until you do, provided you complete all practice exams." },
]

export default function CertificationProgramPage() {
  const [team, setTeam] = React.useState(false)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-2 font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <span>Attest Pro</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#curriculum" className="transition-colors hover:text-foreground">Curriculum</a>
            <a href="#includes" className="transition-colors hover:text-foreground">What's included</a>
            <a href="#pricing" className="transition-colors hover:text-foreground">Pricing</a>
            <a href="#faq" className="transition-colors hover:text-foreground">FAQ</a>
          </nav>
          <Button size="sm" asChild>
            <a href="#pricing">Enroll now</a>
          </Button>
        </div>
      </header>

      <main id="top" className="flex flex-col">
        {/* Hero */}
        <section className="border-b">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
            <div className="flex flex-col justify-center">
              <Badge variant="secondary" className="mb-5 w-fit gap-1.5">
                <Award className="h-3.5 w-3.5" />
                Accredited · Cohort 14 opens soon
              </Badge>
              <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                Become a Certified Assurance Professional
              </h1>
              <p className="mt-5 max-w-xl text-lg text-muted-foreground">
                A rigorous, instructor-led path to an industry-recognized credential — built around the official exam
                blueprint, with a pass guarantee.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button size="lg" asChild>
                  <a href="#pricing">
                    Enroll now
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#curriculum">View curriculum</a>
                </Button>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" /> 8–12 weeks
                </span>
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="h-4 w-4" /> Exam voucher included
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" /> Pass guarantee
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <Card className="w-full max-w-sm border-primary/30 bg-card">
                <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary bg-primary/10 text-primary">
                    <Award className="h-10 w-10" />
                  </div>
                  <div>
                    <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Accredited by</p>
                    <p className="text-lg font-semibold">Global Assurance Council</p>
                  </div>
                  <Separator />
                  <dl className="grid w-full grid-cols-2 gap-4 text-left">
                    <div>
                      <dt className="text-xs text-muted-foreground">Credential ID</dt>
                      <dd className="font-medium">CAP-2026</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-muted-foreground">CPE credits</dt>
                      <dd className="font-medium">40 hours</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-muted-foreground">Validity</dt>
                      <dd className="font-medium">3 years</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-muted-foreground">Format</dt>
                      <dd className="font-medium">Proctored</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats band */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-bold tracking-tight sm:text-4xl">{s.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Curriculum */}
        <section id="curriculum" className="border-b">
          <div className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="mb-10 text-center">
              <Badge variant="outline" className="mb-3">Exam blueprint</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Five domains, fully covered</h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                Every module is weighted to match the official exam so your study time goes exactly where it counts.
              </p>
            </div>
            <Accordion type="single" collapsible defaultValue="d3" className="w-full">
              {DOMAINS.map((d) => (
                <AccordionItem key={d.id} value={d.id}>
                  <AccordionTrigger>
                    <span className="flex flex-1 items-center justify-between gap-4 pr-2 text-left">
                      <span className="font-medium">{d.title}</span>
                      <Badge variant="secondary" className="shrink-0">{d.weight}</Badge>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {d.topics.map((t) => (
                        <li key={t} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* What you get */}
        <section id="includes" className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What's included</h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                Everything you need to prepare, practice, and prove your expertise.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {PERKS.map((p) => (
                <Card key={p.title} className="bg-card">
                  <CardHeader>
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <p.icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-lg">{p.title}</CardTitle>
                    <CardDescription>{p.body}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Instructors */}
        <section className="border-b">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Taught by examiners</h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                Learn from the people who write the blueprint and lead real-world assurance programs.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {INSTRUCTORS.map((ins) => (
                <Card key={ins.name} className="bg-card text-center">
                  <CardContent className="flex flex-col items-center gap-3 p-8">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="bg-primary/10 text-primary">{ins.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{ins.name}</p>
                      <p className="text-sm text-primary">{ins.role}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{ins.note}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Simple, guaranteed pricing</h2>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                One payment, lifetime access, and a pass guarantee on every plan.
              </p>
              <div className="mt-6 inline-flex items-center gap-3 rounded-full border bg-card px-4 py-2 text-sm">
                <span className={cn(!team && "font-medium")}>Individual</span>
                <Switch checked={team} onCheckedChange={setTeam} aria-label="Toggle team pricing" />
                <span className={cn(team && "font-medium")}>Team (5 seats)</span>
              </div>
            </div>

            <Card className="border-primary/40 bg-card">
              <CardHeader className="text-center">
                <Badge variant="secondary" className="mx-auto mb-2 w-fit">
                  {team ? "Best for orgs" : "Most popular"}
                </Badge>
                <CardTitle className="text-xl">{team ? "Team Plan" : "Individual Plan"}</CardTitle>
                <div className="mt-2 flex items-end justify-center gap-1">
                  <span className="text-5xl font-bold tracking-tight">{team ? "$3,499" : "$899"}</span>
                  <span className="pb-1 text-muted-foreground">{team ? "/ 5 seats" : "one-time"}</span>
                </div>
                <CardDescription>
                  {team ? "$700 per seat — includes a team progress dashboard." : "Includes one accredited exam voucher."}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-3">
                  {[
                    "Full curriculum across all five domains",
                    "6 timed practice exams with rationales",
                    "Reviewed capstone project",
                    team ? "5 accredited exam vouchers" : "1 accredited exam voucher",
                    "Lifetime access & content updates",
                    team ? "Admin dashboard & cohort reporting" : "Private community & office hours",
                    "Pass guarantee",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button size="lg" className="mt-4 w-full">
                  {team ? "Enroll your team" : "Enroll now"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <p className="text-center text-xs text-muted-foreground">30-day refund · Invoicing available</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Testimonials */}
        <section className="border-b">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Trusted by certified professionals</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <Card key={t.name} className="bg-card">
                  <CardContent className="flex h-full flex-col gap-4 p-6">
                    <div className="flex gap-0.5 text-primary">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <p className="flex-1 text-sm text-muted-foreground">&ldquo;{t.quote}&rdquo;</p>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-muted text-xs">
                          {t.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
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

        {/* FAQ */}
        <section id="faq" className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Frequently asked questions</h2>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((f, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left font-medium">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <Card className="overflow-hidden border-primary/30 bg-primary/10">
              <CardContent className="flex flex-col items-center gap-6 px-6 py-14 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <GraduationCap className="h-7 w-7" />
                </div>
                <h2 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
                  Earn a credential that opens doors
                </h2>
                <p className="max-w-xl text-muted-foreground">
                  Join Cohort 14 and study alongside thousands of professionals advancing their careers — backed by our pass guarantee.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Button size="lg">
                    Enroll now
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline">
                    Talk to an advisor
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t bg-background">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <div className="flex items-center gap-2 font-medium text-foreground">
            <ShieldCheck className="h-4 w-4 text-primary" />
            Attest Pro
          </div>
          <p>Accredited by the Global Assurance Council · CAP-2026</p>
          <nav className="flex gap-5">
            <a href="#curriculum" className="transition-colors hover:text-foreground">Curriculum</a>
            <a href="#pricing" className="transition-colors hover:text-foreground">Pricing</a>
            <a href="#faq" className="transition-colors hover:text-foreground">FAQ</a>
          </nav>
        </div>
      </footer>
    </div>
  )
}
