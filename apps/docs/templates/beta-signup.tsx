"use client"

import * as React from "react"
import {
  Lock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Gauge,
  GitBranch,
  Users,
  Clock,
  Mail,
  Quote,
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
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

const SNEAK_PEEK = [
  {
    icon: Zap,
    title: "Instant deploys",
    desc: "Ship to a global edge in under 4 seconds, with zero-config rollbacks baked in.",
  },
  {
    icon: Gauge,
    title: "Live insight panel",
    desc: "Watch latency, errors, and traffic stream in real time without a separate dashboard.",
  },
  {
    icon: GitBranch,
    title: "Preview branches",
    desc: "Every pull request gets its own sandboxed URL and a disposable database.",
  },
]

const WHY_JOIN = [
  "Lock in founder pricing for life — 60% off when we launch publicly.",
  "Direct line to the team in a private Slack channel.",
  "Vote on the roadmap and get features shipped for you first.",
  "A spot in the launch wall of fame and early-adopter badge.",
]

const TOTAL_SPOTS = 500
const SPOTS_TAKEN = 437

export default function BetaSignupPage() {
  const [email, setEmail] = React.useState("")
  const [role, setRole] = React.useState("")
  const [submitted, setSubmitted] = React.useState(false)
  const spotsLeft = TOTAL_SPOTS - SPOTS_TAKEN
  const fillPct = Math.round((SPOTS_TAKEN / TOTAL_SPOTS) * 100)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubmitted(true)
  }

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
            </div>
            <span className="text-base font-semibold tracking-tight">Halcyon</span>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="gap-1.5">
              <Lock className="h-3 w-3" aria-hidden="true" />
              Private beta
            </Badge>
            <Button variant="ghost" size="sm" asChild>
              <a href="#request">Request access</a>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero + form */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
            <div className="space-y-6">
              <Badge variant="outline" className="gap-1.5">
                <Sparkles className="h-3 w-3" aria-hidden="true" />
                Now inviting builders
              </Badge>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                The deploy platform we always wanted is in private beta.
              </h1>
              <p className="max-w-md text-lg text-muted-foreground">
                Halcyon turns your repo into a fast, observable production app in
                minutes. We are letting a small group in before the world sees it.
              </p>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="flex -space-x-2">
                  {["AR", "MK", "TS", "JL"].map((initials) => (
                    <Avatar key={initials} className="h-8 w-8 border-2 border-background">
                      <AvatarImage src="" alt="" />
                      <AvatarFallback className="text-xs">{initials}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <span>437 teams already building on Halcyon</span>
              </div>
            </div>

            <Card id="request" className="border-primary/30 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">
                  {submitted ? "You are on the list" : "Request your invite"}
                </CardTitle>
                <CardDescription>
                  {submitted
                    ? "We review every request by hand. Keep an eye on your inbox."
                    : "Tell us a little about you. Invites go out in weekly waves."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <div className="space-y-5">
                    <div className="flex items-start gap-3 rounded-lg border border-primary/30 bg-primary/10 p-4">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                      <div className="space-y-1 text-sm">
                        <p className="font-medium text-foreground">
                          Request received for {email || "your inbox"}
                        </p>
                        <p className="text-muted-foreground">
                          You are number 64 in the current wave. Most invites clear
                          within 7 days.
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p className="flex items-center gap-2">
                        <Mail className="h-4 w-4" aria-hidden="true" />
                        Watch for an email from invites@halcyon.dev
                      </p>
                      <p className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                        We never share your details. Unsubscribe anytime.
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setSubmitted(false)
                        setEmail("")
                        setRole("")
                      }}
                    >
                      Submit another request
                    </Button>
                  </div>
                ) : (
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                      <Label htmlFor="email">Work email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">What are you building?</Label>
                      <Input
                        id="role"
                        type="text"
                        placeholder="e.g. a fintech API for small banks"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      />
                    </div>
                    <Button type="submit" className="w-full gap-2">
                      Request access
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Button>
                    <p className="text-center text-xs text-muted-foreground">
                      No credit card. We hand-pick teams from each wave.
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Spots-left counter */}
        <section className="border-b">
          <div className="mx-auto w-full max-w-6xl px-6 py-12">
            <Card className="bg-muted/30">
              <CardContent className="flex flex-col gap-6 py-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Users className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold tracking-tight">
                      {spotsLeft} spots left
                    </p>
                    <p className="text-sm text-muted-foreground">
                      of {TOTAL_SPOTS} in the current private cohort
                    </p>
                  </div>
                </div>
                <div className="w-full max-w-sm space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{SPOTS_TAKEN} claimed</span>
                    <span className="font-medium">{fillPct}% full</span>
                  </div>
                  <Progress value={fillPct} />
                  <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" aria-hidden="true" />
                    Filling fast — the last cohort closed in 9 days.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Sneak peek */}
        <section className="border-b">
          <div className="mx-auto w-full max-w-6xl px-6 py-16">
            <div className="mb-10 max-w-2xl space-y-3">
              <Badge variant="outline">Sneak peek</Badge>
              <h2 className="text-3xl font-semibold tracking-tight">
                A look at what beta members get today
              </h2>
              <p className="text-muted-foreground">
                These are live in the product right now — not roadmap promises.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {SNEAK_PEEK.map((feature) => (
                <Card key={feature.title}>
                  <CardHeader>
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <feature.icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <CardDescription>{feature.desc}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why join + founder note */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 lg:grid-cols-2">
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold tracking-tight">
                Why join while it is small
              </h2>
              <ul className="space-y-4">
                {WHY_JOIN.map((reason) => (
                  <li key={reason} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                    <span className="text-sm text-foreground">{reason}</span>
                  </li>
                ))}
              </ul>
              <Separator />
              <Button asChild size="lg" className="gap-2">
                <a href="#request">
                  Claim a spot
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            </div>

            <Card className="self-start border-primary/20">
              <CardContent className="space-y-5 py-6">
                <Quote className="h-8 w-8 text-primary/40" aria-hidden="true" />
                <p className="text-lg leading-relaxed">
                  We are keeping the beta intentionally small so we can sit with
                  every team and fix the rough edges with you, not for you. If you
                  join now, you are not a user number — you are a co-author of what
                  Halcyon becomes.
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <Avatar className="h-11 w-11">
                    <AvatarImage src="" alt="" />
                    <AvatarFallback>DR</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Dana Reyes</p>
                    <p className="text-sm text-muted-foreground">
                      Co-founder & CEO, Halcyon
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Closing CTA */}
        <section>
          <div className="mx-auto w-full max-w-6xl px-6 py-16 text-center">
            <div className="mx-auto max-w-xl space-y-5">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Lock className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="text-3xl font-semibold tracking-tight">
                {spotsLeft} invites remain in this wave
              </h2>
              <p className="text-muted-foreground">
                When this cohort fills, the door closes until the next wave. Get
                your request in while there is still room.
              </p>
              <Button asChild size="lg" className="gap-2">
                <a href="#request">
                  Request access
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            <span>Halcyon — private beta</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#request" className="transition-colors hover:text-foreground">
              Request access
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
