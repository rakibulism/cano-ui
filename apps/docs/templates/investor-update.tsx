"use client"
import * as React from "react"
import { TrendingUp, TrendingDown, Wallet, Flame, Gauge, Rocket, Target, ArrowUpRight, CheckCircle2, Mail, Download } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const COMPANY = "Nimbus Labs"
const PERIOD = "May 2026"
const PERIOD_SHORT = "May"

const KPIS = [
  { label: "MRR", value: "$184.2k", delta: "+12.4%", up: true, sub: "vs. April", icon: TrendingUp },
  { label: "Net new growth", value: "+$20.3k", delta: "+8 logos", up: true, sub: "expansion + new", icon: ArrowUpRight },
  { label: "Runway", value: "19 mo", delta: "+1 mo", up: true, sub: "at current burn", icon: Gauge },
  { label: "Net burn", value: "$96k", delta: "-6.1%", up: true, sub: "down from $102k", icon: Flame },
]

const HIGHLIGHTS = [
  "Closed Acme Co. ($48k ARR) — our largest contract to date.",
  "Net revenue retention crossed 118% for the first time.",
  "Hired a VP of Engineering, starting next month.",
  "Shipped the workspaces feature requested by 40% of accounts.",
]

const LOWLIGHTS = [
  "Self-serve conversion dipped to 3.1% (from 3.6%); investigating onboarding.",
  "Two enterprise deals slipped to next quarter pending security review.",
  "Support response time crept up to 6h as volume grew faster than headcount.",
]

const SHIPPED = [
  { title: "Shared workspaces", note: "Multi-team collaboration with granular roles.", tag: "Major" },
  { title: "SOC 2 Type II", note: "Audit completed; report available to enterprise prospects.", tag: "Trust" },
  { title: "Usage-based billing", note: "Metered plans now live for API customers.", tag: "Revenue" },
  { title: "Mobile beta", note: "iOS app in TestFlight with 200 early users.", tag: "Beta" },
]

const ASKS = [
  { title: "Enterprise intros", detail: "Warm intros to Heads of Data at 200+ person SaaS companies." },
  { title: "VP Sales candidates", detail: "Referrals for a player-coach sales leader, US-based." },
  { title: "Pricing feedback", detail: "Reactions to our new usage-based tier from your portfolio." },
]

export default function InvestorUpdatePage() {
  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Rocket className="h-4 w-4" />
            </div>
            <span className="text-sm font-semibold tracking-tight">{COMPANY}</span>
            <Separator orientation="vertical" className="mx-1 h-4" />
            <span className="text-sm text-muted-foreground">Investor Update</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="hidden sm:inline-flex">{PERIOD}</Badge>
            <Button variant="outline" size="sm">
              <Download className="mr-1.5 h-4 w-4" />
              PDF
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-6">
        <section className="border-b py-14 md:py-20">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">{PERIOD} Update</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            A strong month: record MRR, lower burn, and a clearer path to the next milestone.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            We grew {PERIOD_SHORT} MRR 12.4% while bringing burn down for the second straight month.
            Below is the full picture — the wins, the things we are watching, what we shipped, and where you can help.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Badge variant="outline" className="gap-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
              On track to plan
            </Badge>
            <Badge variant="outline">19 months runway</Badge>
            <Badge variant="outline">8 new logos</Badge>
          </div>
        </section>

        <section className="py-12">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {KPIS.map((k) => {
              const Icon = k.icon
              return (
                <Card key={k.label} className="border bg-card">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{k.label}</span>
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="mt-3 text-3xl font-semibold tracking-tight tabular-nums">{k.value}</div>
                    <div className="mt-2 flex items-center gap-1.5 text-sm">
                      <span className={cn("inline-flex items-center gap-0.5 font-medium", k.up ? "text-primary" : "text-destructive")}>
                        {k.up ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                        {k.delta}
                      </span>
                      <span className="text-muted-foreground">{k.sub}</span>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        <section className="py-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card className="border bg-card">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <CardTitle className="text-base">Highlights</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {HIGHLIGHTS.map((h) => (
                    <li key={h} className="flex gap-3 text-sm leading-relaxed">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border bg-muted/30">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-muted-foreground" />
                  <CardTitle className="text-base">Lowlights & watch items</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {LOWLIGHTS.map((l) => (
                    <li key={l} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
                      <span>{l}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-12">
          <div className="mb-6 flex items-center gap-2">
            <Wallet className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold tracking-tight">What we shipped</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {SHIPPED.map((s) => (
              <div key={s.title} className="flex items-start justify-between gap-4 rounded-lg border bg-card p-5">
                <div>
                  <h3 className="text-sm font-semibold">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.note}</p>
                </div>
                <Badge variant="secondary" className="shrink-0">{s.tag}</Badge>
              </div>
            ))}
          </div>
        </section>

        <section className="py-12">
          <Card className="border-primary bg-primary/10">
            <CardContent className="p-7">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold tracking-tight">How you can help</h2>
              </div>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                A few specific asks this month. Replies to this email go straight to the founders.
              </p>
              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                {ASKS.map((a, i) => (
                  <div key={a.title} className="rounded-lg border bg-card p-5">
                    <span className="text-xs font-semibold text-primary">0{i + 1}</span>
                    <h3 className="mt-2 text-sm font-semibold">{a.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{a.detail}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="py-12">
          <div className="rounded-xl border bg-muted/30 p-8 md:p-10">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">Sign-off</p>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed">
              Thank you for backing us. {PERIOD_SHORT} reminded us what this team can do when the
              fundamentals line up — and we are just getting started. As always, reach out any time.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-11 w-11">
                  <AvatarImage src="" alt="" />
                  <AvatarFallback>MR</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold">Maya Reyes</p>
                  <p className="text-sm text-muted-foreground">Co-founder & CEO, {COMPANY}</p>
                </div>
              </div>
              <Button>
                <Mail className="mr-1.5 h-4 w-4" />
                Reply to the founders
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-2 px-6 py-6 text-sm text-muted-foreground sm:flex-row">
          <span>{COMPANY} — Confidential investor update, {PERIOD}.</span>
          <span>Forwarded? Subscribe at updates@nimbuslabs.io</span>
        </div>
      </footer>
    </div>
  )
}
