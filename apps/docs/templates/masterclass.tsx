"use client"

import * as React from "react"
import {
  ArrowRight,
  Award,
  CheckCircle2,
  ChevronRight,
  Clapperboard,
  Clock,
  Download,
  Film,
  Infinity as InfinityIcon,
  Lock,
  Menu,
  Play,
  Quote,
  Sparkles,
  Star,
  Trophy,
  Users,
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

const NAV = ["Lessons", "Curriculum", "Instructor", "Membership", "FAQ"]

const LEARN = [
  {
    icon: Film,
    title: "The shot before the shot",
    body: "How to pre-visualize a scene so every frame earns its place on screen.",
  },
  {
    icon: Clapperboard,
    title: "Directing performance",
    body: "Draw honest, fearless work out of any actor — even when the budget is tight.",
  },
  {
    icon: Sparkles,
    title: "Light as story",
    body: "Use color and shadow to make an audience feel a turn before a word is spoken.",
  },
  {
    icon: Trophy,
    title: "Cutting for emotion",
    body: "Edit on feeling, not on action — the rhythm choices that win awards.",
  },
  {
    icon: Users,
    title: "Leading a set",
    body: "Command a crew of two hundred and still protect the fragile thing you came to make.",
  },
  {
    icon: Award,
    title: "The pitch that lands",
    body: "Walk into a room and leave with a green light — the room-craft no one teaches.",
  },
]

const CURRICULUM = [
  {
    chapter: "Chapter 01",
    title: "The Vision",
    runtime: "48 min",
    lessons: [
      "Why you, why now — finding the film only you can make",
      "From logline to lookbook",
      "Building the world before the camera rolls",
    ],
  },
  {
    chapter: "Chapter 02",
    title: "The Camera",
    runtime: "1 hr 12 min",
    lessons: [
      "Lens language and what each focal length says",
      "Blocking and the moving frame",
      "Working with your cinematographer",
    ],
  },
  {
    chapter: "Chapter 03",
    title: "The Performance",
    runtime: "57 min",
    lessons: [
      "Casting for truth, not for type",
      "The rehearsal room",
      "Getting the take when the day is falling apart",
    ],
  },
  {
    chapter: "Chapter 04",
    title: "The Cut",
    runtime: "1 hr 04 min",
    lessons: [
      "Assembling your first pass",
      "Sound, score, and silence",
      "Test screenings and the final mile",
    ],
  },
]

const CREDENTIALS = [
  { stat: "4", label: "Academy Awards" },
  { stat: "18", label: "films directed" },
  { stat: "30 yrs", label: "behind the camera" },
  { stat: "$2.4B", label: "global box office" },
]

const TESTIMONIALS = [
  {
    name: "Sofia Mendes",
    role: "First-time director",
    quote:
      "I have watched film-school lectures for years. Three lessons in, I understood more about directing actors than in two semesters. It is like sitting at her side on set.",
    img: "https://i.pravatar.cc/96?img=45",
  },
  {
    name: "Daniel Okafor",
    role: "Editor & colorist",
    quote:
      "The chapter on cutting for emotion changed how I open every project. I rewatched it three times and took four pages of notes. Worth the membership alone.",
    img: "https://i.pravatar.cc/96?img=15",
  },
  {
    name: "Hana Watanabe",
    role: "Screenwriter",
    quote:
      "She does not hold anything back — the failures, the fights, the green-light meetings. This is the most honest masterclass I have ever taken.",
    img: "https://i.pravatar.cc/96?img=31",
  },
]

const FAQ = [
  {
    q: "How long do I have access?",
    a: "All-Access membership gives you unlimited streaming for the full year, including this masterclass and every class in the catalog. Watch on your schedule, as many times as you like.",
  },
  {
    q: "Do I need filmmaking experience?",
    a: "Not at all. The class is built to reward total beginners and working professionals alike — each chapter starts with fundamentals and ends with the advanced craft.",
  },
  {
    q: "Can I download lessons to watch offline?",
    a: "Yes. Every lesson and the full class workbook can be downloaded in the mobile app, so you can study on a plane, on set, or anywhere without a connection.",
  },
  {
    q: "Is there a money-back guarantee?",
    a: "Absolutely. If the membership is not for you, request a full refund within 30 days of purchase — no forms, no questions.",
  },
  {
    q: "What is included in the membership?",
    a: "Unlimited access to every masterclass, downloadable class workbooks, the community, and new classes added every month — all for one annual price.",
  },
]

export default function MasterclassPage() {
  const [annual, setAnnual] = React.useState(true)
  const price = annual ? "$15" : "$22"
  const cadence = annual ? "/mo, billed annually" : "/mo, billed monthly"

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Clapperboard className="h-4.5 w-4.5" />
            </span>
            <span className="text-base">STUDIO ONE</span>
          </a>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
            {NAV.map((item) => (
              <a
                key={item}
                href={"#" + item.toLowerCase()}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <a href="#membership">Enroll now</a>
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* Cinematic dark hero */}
        <section className="relative isolate overflow-hidden bg-foreground text-background">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(60%_60%_at_70%_0%,rgba(255,255,255,0.14),transparent)]"
          />
          <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
            <div className="flex flex-col">
              <Badge
                variant="outline"
                className="mb-6 w-fit gap-1.5 border-background/30 text-background"
              >
                <Sparkles className="h-3.5 w-3.5" /> A Studio One Masterclass
              </Badge>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-background/60">
                Elena Vasquez teaches
              </p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Directing for the Screen
              </h1>
              <p className="mt-6 max-w-xl text-lg text-background/70">
                Four-time Academy Award winner Elena Vasquez opens her set. In 16 cinematic lessons,
                learn to find your story, lead your crew, and direct a film an audience will never
                forget.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" variant="secondary" asChild>
                  <a href="#membership">
                    Enroll for {price}{annual ? "/mo" : "/mo"} <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-background/30 bg-transparent text-background hover:bg-background hover:text-foreground"
                >
                  <a href="#lessons">
                    <Play className="mr-1 h-4 w-4 fill-current" /> Watch the trailer
                  </a>
                </Button>
              </div>
              <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-2 text-sm text-background/60">
                <span className="flex items-center gap-1.5">
                  <Film className="h-4 w-4" /> 16 lessons
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" /> 4h 12m total
                </span>
                <span className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-current" /> 4.9 from 12,400 students
                </span>
              </div>
            </div>

            {/* Cinematic poster */}
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-background/15">
                <img
                  src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=900&q=80"
                  alt=""
                  className="h-full w-full object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/20 to-transparent"
                />
                <button
                  type="button"
                  aria-label="Play trailer"
                  className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-background/90 text-foreground shadow-lg transition-transform hover:scale-105"
                >
                  <Play className="h-6 w-6 translate-x-0.5 fill-current" />
                </button>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="text-xs uppercase tracking-[0.2em] text-background/70">
                    Official trailer
                  </div>
                  <div className="text-lg font-semibold text-background">
                    Directing for the Screen
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What you'll learn */}
        <section id="lessons" className="mx-auto w-full max-w-6xl px-4 py-18 sm:px-6 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
              The craft
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              What you will learn
            </h2>
            <p className="mt-3 text-muted-foreground">
              Six pillars of directing, taught the way they are practiced on a working set — not in a
              textbook.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {LEARN.map((item) => (
              <Card key={item.title} className="transition-shadow hover:shadow-sm">
                <CardHeader>
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <CardTitle className="mt-4 text-lg">{item.title}</CardTitle>
                  <CardDescription>{item.body}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Curriculum */}
        <section id="curriculum" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-5xl px-4 py-18 sm:px-6 lg:py-24">
            <div className="max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                16 lessons · 4h 12m
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">The curriculum</h2>
              <p className="mt-3 text-muted-foreground">
                Four chapters that take you from the blank page to the final cut.
              </p>
            </div>
            <Accordion type="single" collapsible defaultValue="item-0" className="mt-10 w-full">
              {CURRICULUM.map((ch, i) => (
                <AccordionItem key={ch.chapter} value={"item-" + i}>
                  <AccordionTrigger className="text-left">
                    <span className="flex flex-1 flex-wrap items-center gap-x-3 gap-y-1 pr-3">
                      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        {ch.chapter}
                      </span>
                      <span className="text-base font-semibold">{ch.title}</span>
                      <Badge variant="outline" className="gap-1 font-normal">
                        <Clock className="h-3 w-3" /> {ch.runtime}
                      </Badge>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-1">
                      {ch.lessons.map((lesson, j) => (
                        <li
                          key={lesson}
                          className="flex items-center gap-3 rounded-md px-2 py-2.5 text-sm transition-colors hover:bg-background"
                        >
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                            {j + 1}
                          </span>
                          <span className="flex-1">{lesson}</span>
                          <Play className="h-3.5 w-3.5 shrink-0 fill-current text-muted-foreground" />
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Instructor credentials */}
        <section id="instructor" className="mx-auto w-full max-w-6xl px-4 py-18 sm:px-6 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div className="relative">
              <div className="overflow-hidden rounded-xl border">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                  alt="Portrait of instructor Elena Vasquez"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
            </div>
            <div>
              <Badge variant="secondary" className="mb-3">
                Your instructor
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Elena Vasquez</h2>
              <p className="mt-2 text-lg text-muted-foreground">
                Director · Writer · Four-time Academy Award winner
              </p>
              <p className="mt-5 max-w-xl text-muted-foreground">
                Over three decades, Elena has directed eighteen feature films and earned four Academy
                Awards, redefining how a generation of filmmakers thinks about light, performance, and
                story. For the first time, she is teaching everything she knows.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {CREDENTIALS.map((c) => (
                  <div key={c.label} className="rounded-lg border bg-muted/30 p-4">
                    <div className="text-2xl font-bold">{c.stat}</div>
                    <div className="mt-0.5 text-xs text-muted-foreground">{c.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sample lesson preview */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-18 sm:px-6 lg:py-24">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                Free preview
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Watch a sample lesson
              </h2>
              <p className="mt-3 text-muted-foreground">
                See exactly how Elena teaches before you enroll.
              </p>
            </div>
            <Card className="mt-12 overflow-hidden">
              <div className="grid gap-0 lg:grid-cols-[1.3fr_1fr]">
                <div className="relative aspect-video lg:aspect-auto">
                  <img
                    src="https://images.unsplash.com/photo-1500210618606-c91e34d9be1c?auto=format&fit=crop&w=1000&q=80"
                    alt=""
                    className="h-full w-full object-cover"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-foreground/30"
                  />
                  <button
                    type="button"
                    aria-label="Play sample lesson"
                    className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-background/90 text-foreground shadow-lg transition-transform hover:scale-105"
                  >
                    <Play className="h-6 w-6 translate-x-0.5 fill-current" />
                  </button>
                  <Badge className="absolute left-4 top-4 gap-1">
                    <Play className="h-3 w-3 fill-current" /> Lesson 02
                  </Badge>
                </div>
                <div className="flex flex-col justify-center gap-4 p-6 sm:p-8">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" /> 14 min · Chapter 01
                  </div>
                  <h3 className="text-2xl font-semibold tracking-tight">
                    From logline to lookbook
                  </h3>
                  <p className="text-muted-foreground">
                    Elena breaks down how a single sentence becomes the visual blueprint for an entire
                    film — and the exact references she pulls when she starts a new project.
                  </p>
                  <ul className="space-y-2 text-sm">
                    {[
                      "The one-line test every idea must pass",
                      "Building a reference board that earns buy-in",
                      "Sharing your vision without losing it",
                    ].map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="mt-1 w-fit" variant="outline" asChild>
                    <a href="#membership">
                      Watch full lesson <ChevronRight className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Membership pricing */}
        <section id="membership" className="mx-auto w-full max-w-5xl px-4 py-18 sm:px-6 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              One membership. Every class.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Enroll in Directing for the Screen and unlock every masterclass in the catalog.
            </p>
            <div className="mt-7 inline-flex items-center gap-1 rounded-full border bg-muted/50 p-1 text-sm">
              <button
                type="button"
                onClick={() => setAnnual(true)}
                aria-pressed={annual}
                className={cn(
                  "rounded-full px-4 py-1.5 font-medium transition-colors",
                  annual ? "bg-background shadow-sm" : "text-muted-foreground"
                )}
              >
                Annual · save 32%
              </button>
              <button
                type="button"
                onClick={() => setAnnual(false)}
                aria-pressed={!annual}
                className={cn(
                  "rounded-full px-4 py-1.5 font-medium transition-colors",
                  !annual ? "bg-background shadow-sm" : "text-muted-foreground"
                )}
              >
                Monthly
              </button>
            </div>
          </div>

          <Card className="mx-auto mt-10 max-w-2xl border-primary shadow-md ring-1 ring-primary">
            <CardHeader className="text-center">
              <Badge className="mx-auto mb-2 w-fit gap-1">
                <Sparkles className="h-3 w-3" /> All-Access Pass
              </Badge>
              <CardTitle className="text-xl">Every masterclass, all year</CardTitle>
              <div className="mt-3 flex items-baseline justify-center gap-1.5">
                <span className="text-5xl font-bold tracking-tight">{price}</span>
                <span className="text-sm text-muted-foreground">{cadence}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { icon: InfinityIcon, text: "Unlimited access to 200+ classes" },
                  { icon: Download, text: "Download lessons & workbooks" },
                  { icon: Film, text: "New classes added monthly" },
                  { icon: Users, text: "Member community access" },
                  { icon: Award, text: "Completion certificates" },
                  { icon: Lock, text: "30-day money-back guarantee" },
                ].map((f) => (
                  <div key={f.text} className="flex items-start gap-2.5 text-sm">
                    <f.icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{f.text}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex-col items-stretch gap-3">
              <Button size="lg" className="w-full">
                Get All-Access for {price}/mo <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Cancel anytime. {annual ? "Billed annually." : "Billed monthly."} Includes every
                masterclass.
              </p>
            </CardFooter>
          </Card>
        </section>

        {/* Testimonials */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-18 sm:px-6 lg:py-24">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                What students are saying
              </h2>
              <p className="mt-3 text-muted-foreground">
                Joined by 12,400 filmmakers, editors, and writers.
              </p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <Card key={t.name} className="flex flex-col justify-between">
                  <CardContent className="pt-6">
                    <Quote className="h-6 w-6 text-primary/40" aria-hidden="true" />
                    <div className="mt-3 flex gap-0.5" aria-hidden="true">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current text-primary" />
                      ))}
                    </div>
                    <p className="mt-3 text-sm leading-relaxed">{t.quote}</p>
                  </CardContent>
                  <CardFooter className="gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={t.img} alt="" />
                      <AvatarFallback>{t.name.slice(0, 1)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.role}</div>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto w-full max-w-3xl px-4 py-18 sm:px-6 lg:py-24">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Frequently asked</h2>
            <p className="mt-3 text-muted-foreground">
              Everything you need to know before you enroll.
            </p>
          </div>
          <Accordion type="single" collapsible className="mt-10 w-full">
            {FAQ.map((item, i) => (
              <AccordionItem key={item.q} value={"faq-" + i}>
                <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Final CTA */}
        <section className="relative isolate overflow-hidden bg-foreground text-background">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_0%,rgba(255,255,255,0.12),transparent)]"
          />
          <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6 lg:py-24">
            <Badge variant="outline" className="gap-1.5 border-background/30 text-background">
              <Clapperboard className="h-3.5 w-3.5" /> Studio One Masterclass
            </Badge>
            <h2 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              The set is open. Take your seat.
            </h2>
            <p className="max-w-xl text-background/70">
              Start learning from Elena Vasquez today, and get unlimited access to every masterclass
              for one annual price.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" variant="secondary" asChild>
                <a href="#membership">
                  Enroll for {price}/mo <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-background/30 bg-transparent text-background hover:bg-background hover:text-foreground"
              >
                <a href="#lessons">Explore the lessons</a>
              </Button>
            </div>
            <p className="text-xs text-background/50">
              30-day money-back guarantee · Cancel anytime
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Clapperboard className="h-4.5 w-4.5" />
            </span>
            STUDIO ONE
          </div>
          <nav
            className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground"
            aria-label="Footer"
          >
            {NAV.map((item) => (
              <a key={item} href={"#" + item.toLowerCase()} className="hover:text-foreground">
                {item}
              </a>
            ))}
          </nav>
          <Separator className="md:hidden" />
          <p className="text-sm text-muted-foreground">© 2026 Studio One. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
