"use client"

import * as React from "react"
import {
  ArrowRight,
  ArrowUpRight,
  Quote,
  Compass,
  Lightbulb,
  Microscope,
  Layers,
  TrendingUp,
  TrendingDown,
  Target,
  Users,
  Clock,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const SECTIONS = [
  { id: "problem", label: "The Problem" },
  { id: "research", label: "Research" },
  { id: "process", label: "Process" },
  { id: "solution", label: "Solution" },
  { id: "results", label: "Results" },
  { id: "learnings", label: "Learnings" },
] as const

type SectionId = (typeof SECTIONS)[number]["id"]

const HERO_STATS = [
  { label: "Task completion", value: "+42%", icon: Target },
  { label: "Support tickets", value: "-58%", icon: TrendingDown },
  { label: "Active users", value: "31k", icon: Users },
]

const RESEARCH_METHODS = [
  { name: "User interviews", detail: "14 sessions with new and lapsed account holders", count: "14" },
  { name: "Usability testing", detail: "Moderated tests on the legacy transfer flow", count: "9" },
  { name: "Analytics review", detail: "Six months of drop-off and rage-click data", count: "6mo" },
  { name: "Support audit", detail: "Tagged 400+ tickets to find the loudest pain", count: "400+" },
]

const PROCESS_STEPS = [
  { phase: "01", title: "Discovery", desc: "Mapped the existing journey end to end and aligned stakeholders on the core job-to-be-done." },
  { phase: "02", title: "Synthesis", desc: "Clustered interview and analytics findings into three themes that framed every later decision." },
  { phase: "03", title: "Ideation", desc: "Ran two design studios with PM and engineering to pressure-test concepts against constraints." },
  { phase: "04", title: "Prototype", desc: "Built a clickable flow and iterated across three rounds of testing before a line of code." },
  { phase: "05", title: "Handoff", desc: "Shipped annotated specs, a component checklist, and a measurement plan for launch." },
]

const METRICS = [
  { label: "Time to first transfer", before: "4m 12s", after: "1m 38s", trend: "down" as const },
  { label: "Onboarding completion", before: "54%", after: "89%", trend: "up" as const },
  { label: "Error rate on submit", before: "11.3%", after: "2.1%", trend: "down" as const },
  { label: "CSAT after flow", before: "3.4 / 5", after: "4.6 / 5", trend: "up" as const },
]

const LEARNINGS = [
  { title: "Defaults beat options", desc: "Every additional choice we removed lifted completion. The strongest design decision was deciding for the user." },
  { title: "Test the unhappy path", desc: "Most of our wins came from error states and edge cases, not the pristine happy flow we kept polishing." },
  { title: "Ship the measurement plan", desc: "Instrumenting events before launch meant we could prove impact in week one instead of guessing for a quarter." },
]

export default function UxCaseStudy() {
  const [active, setActive] = React.useState<SectionId>("problem")

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Layers className="h-4 w-4" aria-hidden="true" />
            </span>
            Avery Lin
            <span className="text-muted-foreground">/ Case Study</span>
          </a>
          <Button asChild size="sm" variant="outline" className="gap-1.5">
            <a href="#contact">
              Next project
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* Hero */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-16 sm:pt-24">
            <Badge variant="outline" className="mb-6 gap-1.5 rounded-full px-3 py-1 text-xs font-normal">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Fintech · Mobile · 2024
            </Badge>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
              Rebuilding money transfers people could actually trust
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
              A ground-up redesign of the transfer experience for a digital bank — turning the most
              abandoned flow in the product into its most loved.
            </p>

            <dl className="mt-10 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-6 text-sm sm:grid-cols-3">
              <div>
                <dt className="text-muted-foreground">Role</dt>
                <dd className="mt-1 font-medium">Lead Product Designer</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Timeline</dt>
                <dd className="mt-1 flex items-center gap-1.5 font-medium">
                  <Clock className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
                  14 weeks
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Team</dt>
                <dd className="mt-1 font-medium">PM, 3 Eng, 1 Researcher</dd>
              </div>
            </dl>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {HERO_STATS.map((s) => (
                <Card key={s.label} className="border-primary/20 bg-card">
                  <CardContent className="flex items-center gap-4 p-5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <s.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <div className="text-2xl font-semibold tracking-tight">{s.value}</div>
                      <div className="text-xs text-muted-foreground">{s.label}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-10 aspect-[16/7] w-full rounded-xl border bg-gradient-to-br from-primary/10 via-muted to-background" aria-hidden="true" />
          </div>
        </section>

        <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[200px_1fr]">
          {/* Sticky section nav */}
          <nav aria-label="Sections" className="hidden lg:block">
            <ul className="sticky top-24 space-y-1 text-sm">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={"#" + s.id}
                    onClick={() => setActive(s.id)}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-2 transition-colors",
                      active === s.id
                        ? "bg-accent font-medium text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                    aria-current={active === s.id ? "true" : undefined}
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        active === s.id ? "bg-primary" : "bg-muted-foreground/40",
                      )}
                      aria-hidden="true"
                    />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0 space-y-20">
            {/* Problem */}
            <section id="problem" className="scroll-mt-24">
              <SectionHeading icon={Compass} kicker="01 — Context" title="The Problem" />
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Transfers were the single most-used feature and the single biggest source of churn.
                Nearly half of first-time users abandoned before sending a cent, and the support
                queue filled with the same three questions every single day.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  "A 7-step flow with no way to see progress",
                  "Errors surfaced only after submit, never inline",
                  "Recipients had to be re-entered every time",
                ].map((pain) => (
                  <div key={pain} className="rounded-lg border bg-muted/30 p-5 text-sm">
                    {pain}
                  </div>
                ))}
              </div>
            </section>

            {/* Research */}
            <section id="research" className="scroll-mt-24">
              <SectionHeading icon={Microscope} kicker="02 — Discovery" title="Research" />
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                I paired qualitative depth with quantitative breadth to make sure we were solving the
                problem users felt, not the one we assumed.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {RESEARCH_METHODS.map((m) => (
                  <Card key={m.name}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{m.name}</CardTitle>
                        <span className="text-sm font-semibold text-primary">{m.count}</span>
                      </div>
                      <CardDescription>{m.detail}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>

              <figure className="mt-8 rounded-xl border-l-2 border-primary bg-muted/30 p-6 sm:p-8">
                <Quote className="h-6 w-6 text-primary" aria-hidden="true" />
                <blockquote className="mt-3 text-xl font-medium leading-snug sm:text-2xl">
                  &ldquo;I always send the same person money, but the app makes me start from zero
                  every single time. I just gave up and used a competitor.&rdquo;
                </blockquote>
                <figcaption className="mt-4 text-sm text-muted-foreground">
                  Participant P07, lapsed user, interview round one
                </figcaption>
              </figure>
            </section>

            {/* Process */}
            <section id="process" className="scroll-mt-24">
              <SectionHeading icon={Lightbulb} kicker="03 — How" title="Process" />
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                A tight, collaborative loop kept design, product, and engineering moving in the same
                direction from the first sketch to handoff.
              </p>
              <ol className="mt-8 space-y-4">
                {PROCESS_STEPS.map((step) => (
                  <li key={step.phase} className="flex gap-5 rounded-lg border bg-card p-5">
                    <span className="text-sm font-semibold text-muted-foreground">{step.phase}</span>
                    <div>
                      <h3 className="font-medium">{step.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{step.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* Solution */}
            <section id="solution" className="scroll-mt-24">
              <SectionHeading icon={Layers} kicker="04 — Outcome" title="Solution" />
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                A single-screen transfer flow with saved recipients, inline validation, and a clear
                review step — designed to feel fast, forgiving, and trustworthy.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="aspect-[4/5] rounded-xl border bg-gradient-to-b from-muted to-background" aria-hidden="true" />
                <div className="space-y-4">
                  {[
                    { h: "Saved recipients", p: "Frequent contacts surface first, cutting the flow to two taps for repeat sends." },
                    { h: "Inline validation", p: "Every field validates as you type, so errors are caught before they cost you." },
                    { h: "Confident review", p: "A plain-language summary makes the final tap feel safe, not scary." },
                  ].map((item) => (
                    <div key={item.h} className="rounded-lg border bg-card p-5">
                      <h3 className="font-medium">{item.h}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{item.p}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Results — before/after metrics */}
            <section id="results" className="scroll-mt-24">
              <SectionHeading icon={TrendingUp} kicker="05 — Impact" title="Results" />
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Measured four weeks after a phased rollout to 100% of users.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {METRICS.map((m) => (
                  <Card key={m.label}>
                    <CardContent className="p-5">
                      <div className="text-sm text-muted-foreground">{m.label}</div>
                      <div className="mt-3 flex items-end gap-3">
                        <span className="text-sm text-muted-foreground line-through">{m.before}</span>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                        <span className="text-2xl font-semibold tracking-tight">{m.after}</span>
                        <span
                          className={cn(
                            "mb-1 flex items-center gap-1 text-xs font-medium",
                            "text-primary",
                          )}
                        >
                          {m.trend === "up" ? (
                            <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
                          ) : (
                            <TrendingDown className="h-3.5 w-3.5" aria-hidden="true" />
                          )}
                          improved
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Learnings */}
            <section id="learnings" className="scroll-mt-24">
              <SectionHeading icon={Lightbulb} kicker="06 — Reflection" title="Key Learnings" />
              <div className="mt-8 space-y-4">
                {LEARNINGS.map((l, i) => (
                  <div key={l.title} className="flex gap-5">
                    <span className="text-2xl font-semibold tabular-nums text-muted-foreground/50">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-medium">{l.title}</h3>
                      <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{l.desc}</p>
                      {i < LEARNINGS.length - 1 ? <Separator className="mt-4" /> : null}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Next project CTA */}
        <section id="contact" className="border-t bg-muted/30">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-6 py-16 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Up next</p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                A loyalty program reimagined for Gen Z
              </h2>
            </div>
            <Button asChild size="lg" className="gap-2">
              <a href="#top">
                View case study
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
          <span>© 2024 Avery Lin — Product Designer</span>
          <div className="flex items-center gap-5">
            <a href="#top" className="transition-colors hover:text-foreground">Top</a>
            <a href="#contact" className="transition-colors hover:text-foreground">Contact</a>
            <a href="#top" className="transition-colors hover:text-foreground">Dribbble</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function SectionHeading({
  icon: Icon,
  kicker,
  title,
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
  kicker: string
  title: string
}) {
  return (
    <div>
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        <Icon className="h-4 w-4 text-primary" aria-hidden={true} />
        {kicker}
      </div>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight">{title}</h2>
    </div>
  )
}
