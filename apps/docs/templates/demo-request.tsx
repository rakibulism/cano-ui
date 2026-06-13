"use client"

import * as React from "react"
import {
  CalendarCheck,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Zap,
  Users,
  Clock,
  PhoneCall,
  ArrowRight,
  Quote,
  Building2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const BENEFITS = [
  {
    icon: Zap,
    title: "See your workflow in action",
    body: "A tailored walkthrough built around the use cases your team cares about most.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise-grade security",
    body: "SOC 2 Type II, SSO/SAML, and granular role-based access reviewed live.",
  },
  {
    icon: Users,
    title: "Talk to a real specialist",
    body: "No bots. A product expert answers your questions and maps a rollout plan.",
  },
]

const LOGOS = ["Northwind", "Acme Co", "Lumen", "Vertex", "Quanta", "Helios"]

const STEPS = [
  {
    icon: CalendarCheck,
    title: "Book a time",
    body: "Pick a slot that fits your calendar. Demos run 30 minutes.",
  },
  {
    icon: PhoneCall,
    title: "Meet your specialist",
    body: "We learn your goals and tailor the session to your stack.",
  },
  {
    icon: Sparkles,
    title: "See it live",
    body: "A guided tour of the exact features your team will use day one.",
  },
  {
    icon: ArrowRight,
    title: "Get a plan",
    body: "Leave with pricing, a rollout timeline, and next steps.",
  },
]

const TEAM_SIZES = ["1–10", "11–50", "51–200", "201–1,000", "1,000+"]

export default function DemoRequestPage() {
  const [submitted, setSubmitted] = React.useState(false)
  const [teamSize, setTeamSize] = React.useState("11–50")
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  function resetForm() {
    setSubmitted(false)
    setForm({ name: "", email: "", company: "", message: "" })
    setTeamSize("11–50")
  }

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
            </div>
            <span className="text-lg font-semibold tracking-tight">Cadence</span>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#benefits" className="transition-colors hover:text-foreground">
              Why Cadence
            </a>
            <a href="#how" className="transition-colors hover:text-foreground">
              How it works
            </a>
            <a href="#customers" className="transition-colors hover:text-foreground">
              Customers
            </a>
          </nav>
          <Button asChild size="sm" variant="outline" className="hidden sm:inline-flex">
            <a href="#form">Sign in</a>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="border-b bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-14 lg:grid-cols-2 lg:py-20">
            <div className="flex flex-col justify-center">
              <Badge variant="secondary" className="mb-4 w-fit gap-1">
                <CalendarCheck className="h-3.5 w-3.5" aria-hidden="true" />
                30-minute live demo
              </Badge>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                See Cadence in action
              </h1>
              <p className="mt-4 max-w-md text-lg text-muted-foreground">
                Book a personalized walkthrough with a product specialist and
                discover how teams ship work 2x faster.
              </p>

              <ul className="mt-8 space-y-5">
                {BENEFITS.map((b) => (
                  <li key={b.title} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <b.icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-medium">{b.title}</p>
                      <p className="mt-0.5 text-sm text-muted-foreground">{b.body}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <Separator className="my-8" />

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Trusted by fast-growing teams
                </p>
                <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-6">
                  {LOGOS.map((logo) => (
                    <div
                      key={logo}
                      className="flex items-center justify-center gap-1.5 rounded-md border bg-card px-2 py-2 text-xs font-semibold text-muted-foreground"
                    >
                      <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
                      <span className="truncate">{logo}</span>
                    </div>
                  ))}
                </div>
              </div>

              <figure className="mt-8 rounded-xl border bg-card p-6">
                <Quote className="h-6 w-6 text-primary/40" aria-hidden="true" />
                <blockquote className="mt-3 text-sm leading-relaxed">
                  &ldquo;The demo paid for itself. Within the first ten minutes we
                  saw exactly how Cadence would replace three tools we were juggling.&rdquo;
                </blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-sm font-semibold">
                    MR
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Maya Rossi</p>
                    <p className="text-muted-foreground">VP Operations, Northwind</p>
                  </div>
                </figcaption>
              </figure>
            </div>

            <div id="form" className="flex flex-col justify-center">
              <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
                {submitted ? (
                  <div className="flex flex-col items-center py-8 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
                    </div>
                    <h2 className="mt-5 text-2xl font-semibold tracking-tight">
                      Request received
                    </h2>
                    <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                      Thanks{form.name ? `, ${form.name.split(" ")[0]}` : ""}! A
                      specialist will reach out within one business day to confirm
                      your demo time.
                    </p>
                    <div className="mt-6 flex items-center gap-2 rounded-lg bg-muted px-4 py-2.5 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                      <span className="text-muted-foreground">
                        Average response time: under 4 hours
                      </span>
                    </div>
                    <Button variant="outline" className="mt-6" onClick={resetForm}>
                      Book another demo
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="mb-6">
                      <h2 className="text-2xl font-semibold tracking-tight">
                        Book your demo
                      </h2>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Fill in a few details and we&rsquo;ll be in touch shortly.
                      </p>
                    </div>
                    <form className="space-y-5" onSubmit={handleSubmit}>
                      <div className="space-y-2">
                        <Label htmlFor="name">Full name</Label>
                        <Input
                          id="name"
                          placeholder="Alex Morgan"
                          required
                          value={form.name}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, name: e.target.value }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Work email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="alex@company.com"
                          required
                          value={form.email}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, email: e.target.value }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          placeholder="Acme Inc."
                          required
                          value={form.company}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, company: e.target.value }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Team size</Label>
                        <div className="flex flex-wrap gap-2">
                          {TEAM_SIZES.map((size) => (
                            <button
                              key={size}
                              type="button"
                              onClick={() => setTeamSize(size)}
                              aria-pressed={teamSize === size}
                              className={cn(
                                "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                                teamSize === size
                                  ? "border-primary bg-primary/10 text-primary"
                                  : "text-muted-foreground hover:bg-muted"
                              )}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">What would you like to see?</Label>
                        <Textarea
                          id="message"
                          rows={3}
                          placeholder="Tell us about your goals and current tools…"
                          value={form.message}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, message: e.target.value }))
                          }
                        />
                      </div>
                      <Button type="submit" size="lg" className="w-full gap-2">
                        Request demo
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Button>
                      <p className="text-center text-xs text-muted-foreground">
                        By submitting, you agree to our terms and privacy policy.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        <section id="how" className="mx-auto w-full max-w-6xl px-6 py-16">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight">
              What to expect
            </h2>
            <p className="mt-3 text-muted-foreground">
              From booking to rollout plan, here&rsquo;s how the process works.
            </p>
          </div>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                className="relative rounded-xl border bg-card p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <step.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <span className="text-2xl font-semibold text-muted-foreground/30">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-4 font-medium">{step.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>
      </main>

      <footer className="border-t bg-muted/30">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-primary-foreground">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            </div>
            <span className="font-medium text-foreground">Cadence</span>
          </div>
          <p>© Cadence Labs, Inc. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href="#form" className="transition-colors hover:text-foreground">
              Privacy
            </a>
            <a href="#form" className="transition-colors hover:text-foreground">
              Terms
            </a>
            <a href="#form" className="transition-colors hover:text-foreground">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
