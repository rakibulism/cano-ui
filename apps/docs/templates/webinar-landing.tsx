"use client"

import * as React from "react"
import {
  CalendarDays,
  Clock,
  Globe,
  PlayCircle,
  CheckCircle2,
  Users,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Quote,
  ArrowRight,
  Video,
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const EVENT = {
  title: "Scaling Design Systems Without Slowing Down",
  date: "Thursday, July 17, 2026",
  time: "11:00 AM PT / 2:00 PM ET",
  timezone: "Live online · 60 minutes + Q&A",
  seats: "2,400 registered",
}

const LEARN = [
  {
    icon: TrendingUp,
    title: "Ship 3x faster",
    body: "A token-first workflow that lets teams move quickly without breaking visual consistency.",
  },
  {
    icon: ShieldCheck,
    title: "Govern at scale",
    body: "Contribution models and review gates that keep quality high as your library grows.",
  },
  {
    icon: Sparkles,
    title: "Design-dev parity",
    body: "Close the gap between Figma and code so handoff stops being a bottleneck.",
  },
  {
    icon: Users,
    title: "Drive adoption",
    body: "Practical tactics to get product teams to actually use the system you built.",
  },
]

const SPEAKERS = [
  {
    name: "Mara Voss",
    role: "Head of Design Systems, Northwind",
    img: "https://i.pravatar.cc/160?img=47",
    initials: "MV",
  },
  {
    name: "Dev Patel",
    role: "Principal Engineer, Loop",
    img: "https://i.pravatar.cc/160?img=12",
    initials: "DP",
  },
  {
    name: "Iris Chen",
    role: "Design Ops Lead, Cano",
    img: "https://i.pravatar.cc/160?img=32",
    initials: "IC",
  },
]

const AGENDA = [
  { time: "0:00", title: "Welcome & the state of design systems", who: "Iris Chen" },
  { time: "0:08", title: "Token architecture that scales", who: "Dev Patel" },
  { time: "0:24", title: "Governance without the gatekeeping", who: "Mara Voss" },
  { time: "0:42", title: "Live teardown of a real system", who: "All speakers" },
  { time: "0:54", title: "Open Q&A", who: "All speakers" },
]

const TESTIMONIALS = [
  {
    quote:
      "I walked away with a governance model we shipped the next sprint. Easily the most actionable webinar I've attended.",
    name: "Lena Okafor",
    role: "Staff Product Designer",
  },
  {
    quote:
      "Finally a session that treats design and engineering as one team. The token deep-dive alone was worth it.",
    name: "Tom Reyes",
    role: "Frontend Lead",
  },
]

export default function WebinarLanding() {
  const [email, setEmail] = React.useState("")
  const [name, setName] = React.useState("")
  const [submitted, setSubmitted] = React.useState(false)
  const [agree, setAgree] = React.useState(true)

  function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  const RegisterForm = ({ idPrefix }: { idPrefix: string }) => (
    <Card className="w-full border-border/80 shadow-sm">
      <CardHeader>
        <Badge variant="secondary" className="mb-1 w-fit">
          Free to attend
        </Badge>
        <CardTitle>Save your seat</CardTitle>
        <CardDescription>
          Register now and get the recording even if you can't make it live.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {submitted ? (
          <div className="flex flex-col items-center gap-3 rounded-lg bg-primary/10 p-6 text-center">
            <CheckCircle2 className="h-10 w-10 text-primary" aria-hidden="true" />
            <p className="font-medium text-foreground">You're registered!</p>
            <p className="text-sm text-muted-foreground">
              A calendar invite and join link are on the way to your inbox.
            </p>
          </div>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`${idPrefix}-name`}>Full name</Label>
              <Input
                id={`${idPrefix}-name`}
                placeholder="Ada Lovelace"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${idPrefix}-email`}>Work email</Label>
              <Input
                id={`${idPrefix}-email`}
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex items-start gap-2">
              <Checkbox
                id={`${idPrefix}-agree`}
                checked={agree}
                onCheckedChange={(v) => setAgree(Boolean(v))}
              />
              <Label
                htmlFor={`${idPrefix}-agree`}
                className="text-sm font-normal text-muted-foreground"
              >
                Email me the recording and occasional event updates.
              </Label>
            </div>
            <Button type="submit" size="lg" className="w-full">
              Register free <ArrowRight className="h-4 w-4" />
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              No spam. Unsubscribe anytime.
            </p>
          </form>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Video className="h-4 w-4" aria-hidden="true" />
            </div>
            <span className="text-sm font-semibold">Cano Live</span>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#learn" className="transition-colors hover:text-foreground">
              What you'll learn
            </a>
            <a href="#speakers" className="transition-colors hover:text-foreground">
              Speakers
            </a>
            <a href="#agenda" className="transition-colors hover:text-foreground">
              Agenda
            </a>
          </nav>
          <Button asChild size="sm">
            <a href="#register">Register</a>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl items-start gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
            <div className="space-y-6">
              <Badge variant="outline" className="gap-1.5">
                <span className="inline-block h-2 w-2 rounded-full bg-primary" />
                Live Webinar
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                {EVENT.title}
              </h1>
              <p className="max-w-xl text-lg text-muted-foreground">
                Join 2,400+ designers and engineers for a practical, no-fluff
                session on building design systems teams actually adopt.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <div className="flex items-center gap-2 rounded-lg border bg-card px-3 py-2 text-sm">
                  <CalendarDays className="h-4 w-4 text-primary" aria-hidden="true" />
                  {EVENT.date}
                </div>
                <div className="flex items-center gap-2 rounded-lg border bg-card px-3 py-2 text-sm">
                  <Clock className="h-4 w-4 text-primary" aria-hidden="true" />
                  {EVENT.time}
                </div>
                <div className="flex items-center gap-2 rounded-lg border bg-card px-3 py-2 text-sm">
                  <Globe className="h-4 w-4 text-primary" aria-hidden="true" />
                  {EVENT.timezone}
                </div>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <div className="flex -space-x-2">
                  {SPEAKERS.map((s) => (
                    <Avatar key={s.name} className="h-9 w-9 border-2 border-background">
                      <AvatarImage src={s.img} alt="" />
                      <AvatarFallback>{s.initials}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {EVENT.seats} · Limited live seats
                </span>
              </div>
            </div>
            <div id="register" className="scroll-mt-24">
              <RegisterForm idPrefix="hero" />
            </div>
          </div>
        </section>

        {/* What you'll learn */}
        <section id="learn" className="scroll-mt-20">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
            <div className="mb-10 max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight">What you'll learn</h2>
              <p className="mt-3 text-muted-foreground">
                Four takeaways you can put to work the moment the session ends.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {LEARN.map((item) => (
                <Card key={item.title} className="border-border/80">
                  <CardHeader>
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <item.icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <CardDescription>{item.body}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Speakers */}
        <section id="speakers" className="scroll-mt-20 border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
            <div className="mb-10 max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight">Meet your speakers</h2>
              <p className="mt-3 text-muted-foreground">
                Practitioners who've shipped and scaled real systems.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {SPEAKERS.map((s) => (
                <Card key={s.name} className="border-border/80 text-center">
                  <CardContent className="flex flex-col items-center gap-4 pt-6">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={s.img} alt="" />
                      <AvatarFallback>{s.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{s.name}</p>
                      <p className="text-sm text-muted-foreground">{s.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Agenda */}
        <section id="agenda" className="scroll-mt-20">
          <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
            <div className="mb-10">
              <h2 className="text-3xl font-bold tracking-tight">Agenda</h2>
              <p className="mt-3 text-muted-foreground">
                60 minutes, tightly run, with plenty of room for your questions.
              </p>
            </div>
            <ol className="space-y-1">
              {AGENDA.map((row, i) => (
                <li key={row.title}>
                  <div className="flex items-start gap-4 rounded-lg px-3 py-4 transition-colors hover:bg-muted/50">
                    <span className="mt-0.5 w-14 shrink-0 font-mono text-sm text-primary">
                      {row.time}
                    </span>
                    <div className="flex-1">
                      <p className="font-medium">{row.title}</p>
                      <p className="text-sm text-muted-foreground">{row.who}</p>
                    </div>
                    <PlayCircle
                      className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground"
                      aria-hidden="true"
                    />
                  </div>
                  {i < AGENDA.length - 1 && <Separator />}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Testimonials */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
            <h2 className="mb-10 text-3xl font-bold tracking-tight">
              What past attendees say
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {TESTIMONIALS.map((t) => (
                <Card key={t.name} className="border-border/80">
                  <CardContent className="pt-6">
                    <Quote className="mb-4 h-6 w-6 text-primary" aria-hidden="true" />
                    <p className="text-lg leading-relaxed">{t.quote}</p>
                  </CardContent>
                  <CardFooter className="flex-col items-start gap-0.5">
                    <p className="font-medium">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="scroll-mt-20">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <div
              className={cn(
                "grid items-center gap-10 rounded-2xl border bg-card p-8 sm:p-12 lg:grid-cols-2",
              )}
            >
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight">
                  Don't miss it — seats are limited
                </h2>
                <p className="text-muted-foreground">
                  The live session caps at 500 attendees. Register now to lock in
                  your spot and get the recording, slides, and resource pack.
                </p>
                <ul className="space-y-2 text-sm">
                  {[
                    "Live Q&A with all three speakers",
                    "Downloadable token starter kit",
                    "Recording sent within 24 hours",
                  ].map((perk) => (
                    <li key={perk} className="flex items-center gap-2">
                      <CheckCircle2
                        className="h-4 w-4 text-primary"
                        aria-hidden="true"
                      />
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>
              <RegisterForm idPrefix="cta" />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-primary-foreground">
              <Video className="h-3.5 w-3.5" aria-hidden="true" />
            </div>
            <span>Cano Live</span>
          </div>
          <p>© 2026 Cano Live. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="transition-colors hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
