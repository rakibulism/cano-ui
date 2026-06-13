"use client"

import * as React from "react"
import {
  ArrowRight,
  BookOpen,
  Calculator,
  Calendar,
  CheckCircle2,
  Code2,
  FlaskConical,
  GraduationCap,
  Languages,
  Menu,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Users,
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
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

type SubjectKey = "math" | "science" | "languages" | "coding"

const SUBJECTS: {
  key: SubjectKey
  label: string
  icon: React.ComponentType<{ className?: string }>
  blurb: string
  benefits: string[]
  tutors: {
    name: string
    title: string
    rating: number
    sessions: string
    tag: string
    initials: string
    img: string
  }[]
}[] = [
  {
    key: "math",
    label: "Math",
    icon: Calculator,
    blurb: "From fractions to calculus, build real confidence one step at a time.",
    benefits: [
      "Targeted help for tests, homework, and exam prep",
      "Visual problem-solving with shared digital whiteboard",
      "Weekly progress reports sent straight to parents",
    ],
    tutors: [
      { name: "Dr. Amara Okafor", title: "Calculus & Algebra", rating: 5.0, sessions: "2,400+ sessions", tag: "Top rated", initials: "AO", img: "https://i.pravatar.cc/160?img=47" },
      { name: "Liam Carter", title: "Geometry & SAT Math", rating: 4.9, sessions: "1,800+ sessions", tag: "Exam specialist", initials: "LC", img: "https://i.pravatar.cc/160?img=12" },
      { name: "Priya Nair", title: "Statistics & Pre-Algebra", rating: 4.9, sessions: "1,200+ sessions", tag: "Patient & clear", initials: "PN", img: "https://i.pravatar.cc/160?img=32" },
    ],
  },
  {
    key: "science",
    label: "Science",
    icon: FlaskConical,
    blurb: "Make physics, chemistry, and biology click with hands-on explanations.",
    benefits: [
      "Concept-first teaching that goes beyond memorization",
      "Lab-style demos and simulations during every lesson",
      "Coverage for AP, IB, and GCSE science tracks",
    ],
    tutors: [
      { name: "Marco Ferreira", title: "Physics & AP Chemistry", rating: 5.0, sessions: "2,100+ sessions", tag: "AP expert", initials: "MF", img: "https://i.pravatar.cc/160?img=15" },
      { name: "Dr. Hana Sato", title: "Biology & Anatomy", rating: 4.9, sessions: "1,600+ sessions", tag: "Pre-med mentor", initials: "HS", img: "https://i.pravatar.cc/160?img=45" },
      { name: "Elena Vasquez", title: "Earth & Environmental Science", rating: 4.8, sessions: "980+ sessions", tag: "Engaging", initials: "EV", img: "https://i.pravatar.cc/160?img=20" },
    ],
  },
  {
    key: "languages",
    label: "Languages",
    icon: Languages,
    blurb: "Speak with confidence through immersive, conversation-led lessons.",
    benefits: [
      "Native and fluent tutors across 12 languages",
      "Conversation drills tailored to your real goals",
      "Cultural context that makes vocabulary stick",
    ],
    tutors: [
      { name: "Sofia Rossi", title: "Spanish & Italian", rating: 5.0, sessions: "2,700+ sessions", tag: "Native speaker", initials: "SR", img: "https://i.pravatar.cc/160?img=24" },
      { name: "Jean Dubois", title: "French & DELF Prep", rating: 4.9, sessions: "1,500+ sessions", tag: "Exam coach", initials: "JD", img: "https://i.pravatar.cc/160?img=51" },
      { name: "Yuki Tanaka", title: "Japanese & Mandarin", rating: 4.9, sessions: "1,300+ sessions", tag: "Beginner friendly", initials: "YT", img: "https://i.pravatar.cc/160?img=29" },
    ],
  },
  {
    key: "coding",
    label: "Coding",
    icon: Code2,
    blurb: "Build real projects in Python, web, and beyond with a mentor by your side.",
    benefits: [
      "Project-based learning, not just dry syntax",
      "Live pair-programming in a shared code editor",
      "Portfolio guidance for school and college apps",
    ],
    tutors: [
      { name: "Devon Wright", title: "Python & Data Science", rating: 5.0, sessions: "1,900+ sessions", tag: "Industry pro", initials: "DW", img: "https://i.pravatar.cc/160?img=33" },
      { name: "Aisha Khan", title: "Web Dev & JavaScript", rating: 4.9, sessions: "1,400+ sessions", tag: "Project mentor", initials: "AK", img: "https://i.pravatar.cc/160?img=44" },
      { name: "Noah Brooks", title: "Scratch & Game Design", rating: 4.9, sessions: "1,100+ sessions", tag: "Great with kids", initials: "NB", img: "https://i.pravatar.cc/160?img=60" },
    ],
  },
]

const STEPS = [
  { icon: Target, title: "Tell us your goals", desc: "Share the subject, grade level, and what you want to achieve in a 2-minute form." },
  { icon: Users, title: "Get matched", desc: "We pair your learner with a vetted tutor who fits their style and schedule." },
  { icon: Video, title: "Start learning 1:1", desc: "Meet live in our virtual classroom with whiteboard, screen share, and notes." },
  { icon: Sparkles, title: "Track real progress", desc: "Review session recaps and watch grades and confidence climb week over week." },
]

const PACKAGES = [
  {
    name: "Starter",
    price: "$32",
    cadence: "/ session",
    desc: "Perfect for occasional help and homework support.",
    features: ["1 session per week", "55-minute lessons", "Session recap notes", "Reschedule anytime"],
    highlight: false,
  },
  {
    name: "Growth",
    price: "$28",
    cadence: "/ session",
    desc: "Our most popular plan for steady, lasting improvement.",
    features: ["2 sessions per week", "55-minute lessons", "Weekly parent reports", "Priority tutor matching", "Free practice materials"],
    highlight: true,
  },
  {
    name: "Intensive",
    price: "$24",
    cadence: "/ session",
    desc: "Exam crunch or fast-track goals with dedicated support.",
    features: ["4 sessions per week", "Up to 90-minute lessons", "Dedicated lead tutor", "Mock exams & feedback", "On-demand check-ins"],
    highlight: false,
  },
]

const TESTIMONIALS = [
  { quote: "My daughter went from dreading math to asking for extra sessions. Her grade jumped a full letter in one term.", name: "Rachel M.", role: "Parent of a 9th grader", initials: "RM", img: "https://i.pravatar.cc/120?img=5" },
  { quote: "The coding tutor helped my son build an actual game. He's never been this proud of schoolwork.", name: "Daniel O.", role: "Parent of a 7th grader", initials: "DO", img: "https://i.pravatar.cc/120?img=13" },
  { quote: "Scheduling is effortless and the weekly reports keep me in the loop without micromanaging.", name: "Priya S.", role: "Parent of an 11th grader", initials: "PS", img: "https://i.pravatar.cc/120?img=9" },
]

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={rating + " out of 5 stars"}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          className={cn(
            "h-3.5 w-3.5",
            i < Math.round(rating) ? "fill-primary text-primary" : "text-muted-foreground/40"
          )}
        />
      ))}
    </span>
  )
}

export default function TutoringServiceTemplate() {
  const [active, setActive] = React.useState<SubjectKey>("math")
  const current = SUBJECTS.find((s) => s.key === active) ?? SUBJECTS[0]

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
          <a href="#" className="flex items-center gap-2 font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <GraduationCap className="h-4.5 w-4.5" />
            </span>
            <span className="text-base">BrightPath Tutors</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#subjects" className="transition-colors hover:text-foreground">Subjects</a>
            <a href="#how" className="transition-colors hover:text-foreground">How it works</a>
            <a href="#pricing" className="transition-colors hover:text-foreground">Pricing</a>
            <a href="#reviews" className="transition-colors hover:text-foreground">Reviews</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Sign in</Button>
            <Button size="sm" className="hidden sm:inline-flex">Book a free trial</Button>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section id="subjects" className="border-b">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-24">
            <div>
              <Badge variant="secondary" className="mb-5 gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" /> 12,000+ families coached
              </Badge>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                1:1 online tutoring that actually moves the needle
              </h1>
              <p className="mt-5 max-w-md text-lg text-muted-foreground">
                Matched tutors, live virtual lessons, and real progress in {current.label.toLowerCase()} and beyond. {current.blurb}
              </p>

              <div className="mt-7 flex flex-wrap gap-2" role="tablist" aria-label="Choose a subject">
                {SUBJECTS.map((s) => {
                  const Icon = s.icon
                  const selected = s.key === active
                  return (
                    <button
                      key={s.key}
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setActive(s.key)}
                      className={cn(
                        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                        selected
                          ? "border-primary bg-primary text-primary-foreground"
                          : "bg-card text-muted-foreground hover:bg-accent hover:text-foreground"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {s.label}
                    </button>
                  )
                })}
              </div>

              <ul className="mt-7 space-y-2.5">
                {current.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-primary" />
                    <span className="text-foreground">{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button size="lg" className="gap-2">
                  Book a free trial <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">Browse {current.label} tutors</Button>
              </div>
            </div>

            <div className="lg:pl-6">
              <Card className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Top {current.label} tutors</CardTitle>
                    <Badge variant="outline" className="gap-1">
                      <Star className="h-3 w-3 fill-primary text-primary" /> 4.9 avg
                    </Badge>
                  </div>
                  <CardDescription>{current.blurb}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {current.tutors.map((t) => (
                    <div
                      key={t.name}
                      className="flex items-center gap-3 rounded-xl border bg-muted/30 p-3"
                    >
                      <Avatar className="h-11 w-11">
                        <AvatarImage src={t.img} alt="" />
                        <AvatarFallback>{t.initials}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="truncate text-sm font-medium">{t.name}</p>
                          <Badge variant="secondary" className="hidden text-[10px] sm:inline-flex">{t.tag}</Badge>
                        </div>
                        <p className="truncate text-xs text-muted-foreground">{t.title}</p>
                        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                          <Stars rating={t.rating} />
                          <span>{t.rating.toFixed(1)}</span>
                          <span aria-hidden="true">&middot;</span>
                          <span>{t.sessions}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight">How it works</h2>
              <p className="mt-3 text-muted-foreground">
                Get from first contact to confident learner in four simple steps.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((s, i) => {
                const Icon = s.icon
                return (
                  <Card key={s.title} className="relative">
                    <CardHeader>
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="absolute right-5 top-5 text-3xl font-semibold text-muted-foreground/20">
                        {i + 1}
                      </span>
                      <CardTitle className="pt-2 text-base">{s.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{s.desc}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="border-b">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="secondary" className="mb-4">Simple, flexible pricing</Badge>
              <h2 className="text-3xl font-semibold tracking-tight">Packages built around your goals</h2>
              <p className="mt-3 text-muted-foreground">
                No long contracts. Pause, switch tutors, or change subjects anytime.
              </p>
            </div>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {PACKAGES.map((p) => (
                <Card
                  key={p.name}
                  className={cn(
                    "flex flex-col",
                    p.highlight && "border-primary shadow-sm ring-1 ring-primary"
                  )}
                >
                  <CardHeader>
                    {p.highlight && (
                      <Badge className="mb-2 w-fit gap-1">
                        <Sparkles className="h-3 w-3" /> Most popular
                      </Badge>
                    )}
                    <CardTitle className="text-lg">{p.name}</CardTitle>
                    <CardDescription>{p.desc}</CardDescription>
                    <div className="flex items-baseline gap-1 pt-3">
                      <span className="text-4xl font-semibold tracking-tight">{p.price}</span>
                      <span className="text-sm text-muted-foreground">{p.cadence}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <Separator className="mb-4" />
                    <ul className="space-y-2.5">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      variant={p.highlight ? "default" : "outline"}
                    >
                      Choose {p.name}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="reviews" className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight">Parents see the difference</h2>
              <p className="mt-3 text-muted-foreground">
                Rated 4.9 out of 5 by thousands of families across the country.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <Card key={t.name}>
                  <CardContent className="pt-6">
                    <Quote className="h-7 w-7 text-primary/30" />
                    <p className="mt-3 text-sm leading-relaxed text-foreground">&ldquo;{t.quote}&rdquo;</p>
                    <div className="mt-5 flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={t.img} alt="" />
                        <AvatarFallback>{t.initials}</AvatarFallback>
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

        {/* Book a trial CTA */}
        <section className="border-b">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-20">
            <div>
              <Badge variant="secondary" className="mb-4 gap-1.5">
                <Calendar className="h-3.5 w-3.5" /> Free, no card required
              </Badge>
              <h2 className="text-3xl font-semibold tracking-tight">Book a free trial lesson</h2>
              <p className="mt-3 max-w-md text-muted-foreground">
                Meet a matched tutor, try the virtual classroom, and see the fit before you commit. Most families book a follow-up within a day.
              </p>
              <ul className="mt-6 space-y-2.5 text-sm">
                <li className="flex items-center gap-2.5">
                  <BookOpen className="h-4.5 w-4.5 text-primary" /> 30-minute live session
                </li>
                <li className="flex items-center gap-2.5">
                  <Users className="h-4.5 w-4.5 text-primary" /> Hand-picked tutor match
                </li>
                <li className="flex items-center gap-2.5">
                  <ShieldCheck className="h-4.5 w-4.5 text-primary" /> Satisfaction guarantee
                </li>
              </ul>
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Reserve your spot</CardTitle>
                <CardDescription>We&rsquo;ll match a {current.label} tutor and email you a time.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="parent">Your name</Label>
                    <Input id="parent" placeholder="Jordan Lee" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="you@email.com" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="grade">Learner&rsquo;s grade level</Label>
                  <Input id="grade" placeholder="e.g. 8th grade" />
                </div>
                <div className="space-y-1.5">
                  <Label>Subject</Label>
                  <div className="flex flex-wrap gap-2">
                    {SUBJECTS.map((s) => (
                      <button
                        key={s.key}
                        type="button"
                        onClick={() => setActive(s.key)}
                        className={cn(
                          "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                          s.key === active
                            ? "border-primary bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-accent hover:text-foreground"
                        )}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
                <Button className="w-full gap-2">
                  Book my free trial <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="bg-muted/30">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
          <div className="flex flex-col gap-8 md:flex-row md:justify-between">
            <div className="max-w-xs">
              <a href="#" className="flex items-center gap-2 font-semibold">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <GraduationCap className="h-4.5 w-4.5" />
                </span>
                BrightPath Tutors
              </a>
              <p className="mt-3 text-sm text-muted-foreground">
                Personalized 1:1 online tutoring that builds confidence and real results.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <div>
                <p className="text-sm font-medium">Subjects</p>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {SUBJECTS.map((s) => (
                    <li key={s.key}><a href="#subjects" className="hover:text-foreground">{s.label}</a></li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium">Company</p>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground">About</a></li>
                  <li><a href="#" className="hover:text-foreground">Our tutors</a></li>
                  <li><a href="#" className="hover:text-foreground">Careers</a></li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium">Support</p>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground">Help center</a></li>
                  <li><a href="#pricing" className="hover:text-foreground">Pricing</a></li>
                  <li><a href="#" className="hover:text-foreground">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col items-center justify-between gap-3 text-xs text-muted-foreground sm:flex-row">
            <p>&copy; 2024 BrightPath Tutors. All rights reserved.</p>
            <div className="flex gap-5">
              <a href="#" className="hover:text-foreground">Privacy</a>
              <a href="#" className="hover:text-foreground">Terms</a>
              <a href="#" className="hover:text-foreground">Safeguarding</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
