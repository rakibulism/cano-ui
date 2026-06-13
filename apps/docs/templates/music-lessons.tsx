"use client"

import * as React from "react"
import {
  Music,
  Piano,
  Guitar,
  Mic2,
  Star,
  Calendar,
  PlayCircle,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Clock,
  Users,
  Award,
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
  CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

type InstrumentKey = "piano" | "guitar" | "violin" | "voice"

type Teacher = {
  name: string
  initials: string
  title: string
  rating: number
  reviews: number
  lessons: string
  tags: string[]
}

type InstrumentData = {
  label: string
  icon: React.ComponentType<{ className?: string }>
  tagline: string
  curriculum: string[]
  teachers: Teacher[]
}

const INSTRUMENTS: Record<InstrumentKey, InstrumentData> = {
  piano: {
    label: "Piano",
    icon: Piano,
    tagline: "From first scales to soaring concertos, build your foundation key by key.",
    curriculum: [
      "Posture, hand shape & finger independence",
      "Reading both treble and bass clef fluently",
      "Major & minor scales, chords and inversions",
      "Your first full piece in 6 weeks",
    ],
    teachers: [
      {
        name: "Clara Whitman",
        initials: "CW",
        title: "Classical & Jazz Piano",
        rating: 4.9,
        reviews: 214,
        lessons: "3,100+ lessons",
        tags: ["Beginner-friendly", "Improvisation"],
      },
      {
        name: "Marcus Lee",
        initials: "ML",
        title: "Contemporary Piano",
        rating: 4.8,
        reviews: 167,
        lessons: "2,400+ lessons",
        tags: ["Pop & Film", "Adults"],
      },
    ],
  },
  guitar: {
    label: "Guitar",
    icon: Guitar,
    tagline: "Strum your first song this week, then grow into riffs, solos and songwriting.",
    curriculum: [
      "Open chords & smooth chord transitions",
      "Strumming patterns and rhythm timing",
      "Fingerpicking and basic music theory",
      "Play 5 popular songs by month two",
    ],
    teachers: [
      {
        name: "Diego Santos",
        initials: "DS",
        title: "Acoustic & Flamenco",
        rating: 5.0,
        reviews: 189,
        lessons: "2,800+ lessons",
        tags: ["Fingerstyle", "All ages"],
      },
      {
        name: "Riley Okafor",
        initials: "RO",
        title: "Electric & Rock",
        rating: 4.7,
        reviews: 142,
        lessons: "1,900+ lessons",
        tags: ["Soloing", "Teens"],
      },
    ],
  },
  violin: {
    label: "Violin",
    icon: Music,
    tagline: "Develop a warm, confident tone with patient, classically-trained mentors.",
    curriculum: [
      "Bow hold, posture & first open strings",
      "Intonation and ear training fundamentals",
      "Reading rhythm and the first position",
      "Perform a simple recital piece",
    ],
    teachers: [
      {
        name: "Anya Petrova",
        initials: "AP",
        title: "Classical Violin",
        rating: 4.9,
        reviews: 156,
        lessons: "2,600+ lessons",
        tags: ["Suzuki method", "Children"],
      },
      {
        name: "Theo Hassan",
        initials: "TH",
        title: "Fiddle & Folk",
        rating: 4.8,
        reviews: 98,
        lessons: "1,400+ lessons",
        tags: ["Folk styles", "Adults"],
      },
    ],
  },
  voice: {
    label: "Voice",
    icon: Mic2,
    tagline: "Find your true voice with breath, control and stage-ready confidence.",
    curriculum: [
      "Breathing technique & vocal warm-ups",
      "Pitch accuracy and expanding your range",
      "Diction, phrasing and stylistic delivery",
      "Record your first polished performance",
    ],
    teachers: [
      {
        name: "Nina Adeyemi",
        initials: "NA",
        title: "Pop & Soul Vocals",
        rating: 5.0,
        reviews: 231,
        lessons: "3,400+ lessons",
        tags: ["Range building", "Performance"],
      },
      {
        name: "Sam Bennett",
        initials: "SB",
        title: "Musical Theatre",
        rating: 4.9,
        reviews: 119,
        lessons: "1,700+ lessons",
        tags: ["Stage craft", "Auditions"],
      },
    ],
  },
}

const STEPS = [
  {
    icon: Music,
    title: "Pick your instrument",
    desc: "Choose what you've always wanted to play and tell us your goals.",
  },
  {
    icon: Users,
    title: "Match with a mentor",
    desc: "We pair you with a teacher who fits your level, style and schedule.",
  },
  {
    icon: Calendar,
    title: "Book your first lesson",
    desc: "Reserve a time that works for you, online or in studio.",
  },
  {
    icon: Sparkles,
    title: "Play your first song",
    desc: "Follow a personalised path and feel the progress every week.",
  },
]

const PACKAGES = [
  {
    name: "Discover",
    price: "$29",
    cadence: "/ single lesson",
    desc: "Try a trial lesson with no commitment.",
    features: ["1 live 45-min lesson", "Beginner skill assessment", "Practice notes after class"],
    cta: "Book a trial",
    featured: false,
  },
  {
    name: "Rhythm",
    price: "$99",
    cadence: "/ month",
    desc: "Steady weekly progress, our most popular plan.",
    features: [
      "4 live lessons monthly",
      "Personalised curriculum",
      "Practice tracking app access",
      "Reschedule anytime",
    ],
    cta: "Start learning",
    featured: true,
  },
  {
    name: "Virtuoso",
    price: "$179",
    cadence: "/ month",
    desc: "Accelerated coaching for serious students.",
    features: [
      "8 live lessons monthly",
      "Two instruments included",
      "Recital & exam prep",
      "Priority teacher matching",
    ],
    cta: "Go all in",
    featured: false,
  },
]

const TESTIMONIALS = [
  {
    quote:
      "I went from never touching a piano to playing my favourite song at a family dinner in three months. My teacher made every lesson feel easy.",
    name: "Jordan M.",
    detail: "Piano student, 6 months",
    initials: "JM",
  },
  {
    quote:
      "The flexible scheduling fit around my shifts perfectly, and the practice app kept me accountable between lessons.",
    name: "Priya S.",
    detail: "Voice student, 1 year",
    initials: "PS",
  },
  {
    quote:
      "My daughter looks forward to her violin lesson every week. Patient, kind and genuinely talented mentors.",
    name: "Daniel R.",
    detail: "Parent of violin student",
    initials: "DR",
  },
]

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={rating + " out of 5 stars"}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          className={cn(
            "size-4",
            i < Math.round(rating)
              ? "fill-primary text-primary"
              : "text-muted-foreground/40"
          )}
        />
      ))}
    </div>
  )
}

export default function MusicLessonsPage() {
  const [instrument, setInstrument] = React.useState<InstrumentKey>("piano")
  const active = INSTRUMENTS[instrument]
  const ActiveIcon = active.icon

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
          <a href="#top" className="flex items-center gap-2 font-semibold">
            <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Music className="size-5" />
            </span>
            <span className="text-lg tracking-tight">Crescendo</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#instruments" className="transition-colors hover:text-foreground">
              Instruments
            </a>
            <a href="#how" className="transition-colors hover:text-foreground">
              How it works
            </a>
            <a href="#pricing" className="transition-colors hover:text-foreground">
              Pricing
            </a>
            <a href="#reviews" className="transition-colors hover:text-foreground">
              Reviews
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              Sign in
            </Button>
            <Button size="sm">
              <Calendar className="size-4" />
              Book a lesson
            </Button>
          </div>
        </div>
      </header>

      <main id="top" className="flex flex-1 flex-col">
        {/* Hero */}
        <section className="relative overflow-hidden border-b bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
            <div className="flex flex-col gap-6">
              <Badge variant="secondary" className="w-fit gap-1.5">
                <Sparkles className="size-3.5" />
                Trusted by 12,000+ students worldwide
              </Badge>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Learn an instrument you'll
                <span className="text-primary"> actually play.</span>
              </h1>
              <p className="max-w-md text-lg text-muted-foreground">
                One-on-one online music lessons with hand-picked mentors. Book your first
                lesson today and play your first song this week.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="gap-2">
                  <Calendar className="size-5" />
                  Book a lesson
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  <PlayCircle className="size-5" />
                  Watch a sample
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Star className="size-4 fill-primary text-primary" />
                  4.9 average rating
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="size-4 text-primary" />
                  Flexible scheduling
                </span>
                <span className="flex items-center gap-1.5">
                  <Award className="size-4 text-primary" />
                  No long-term contract
                </span>
              </div>
            </div>

            <Card className="border-primary/20 shadow-sm lg:ml-auto lg:max-w-md">
              <CardHeader>
                <CardTitle className="text-xl">Start your free trial lesson</CardTitle>
                <CardDescription>
                  Tell us what you'd love to learn. We'll match you in 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(INSTRUMENTS) as InstrumentKey[]).map((key) => {
                    const Icon = INSTRUMENTS[key].icon
                    const selected = instrument === key
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setInstrument(key)}
                        aria-pressed={selected}
                        className={cn(
                          "flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors",
                          selected
                            ? "border-primary bg-primary/10 text-primary"
                            : "bg-card text-muted-foreground hover:bg-accent"
                        )}
                      >
                        <Icon className="size-4" />
                        {INSTRUMENTS[key].label}
                      </button>
                    )
                  })}
                </div>
                <div className="rounded-lg border bg-muted/40 p-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2 font-medium text-foreground">
                    <ActiveIcon className="size-4 text-primary" />
                    {active.label} path
                  </span>
                  <p className="mt-1.5 leading-relaxed">{active.tagline}</p>
                </div>
                <Button className="w-full gap-2">
                  Claim my free lesson
                  <ArrowRight className="size-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Instrument selector */}
        <section id="instruments" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-4">
              Choose your sound
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Explore lessons by instrument
            </h2>
            <p className="mt-3 text-muted-foreground">
              Switch instruments to preview the curriculum and meet the mentors who teach it.
            </p>
          </div>

          <Tabs
            value={instrument}
            onValueChange={(v) => setInstrument(v as InstrumentKey)}
            className="mt-10"
          >
            <TabsList className="mx-auto flex h-auto w-full max-w-xl flex-wrap justify-center gap-1 p-1">
              {(Object.keys(INSTRUMENTS) as InstrumentKey[]).map((key) => {
                const Icon = INSTRUMENTS[key].icon
                return (
                  <TabsTrigger key={key} value={key} className="gap-1.5">
                    <Icon className="size-4" />
                    {INSTRUMENTS[key].label}
                  </TabsTrigger>
                )
              })}
            </TabsList>
          </Tabs>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            {/* Curriculum */}
            <Card className="bg-muted/30">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <ActiveIcon className="size-6" />
                  </span>
                  <div>
                    <CardTitle className="text-xl">{active.label} curriculum</CardTitle>
                    <CardDescription>Your guided beginner roadmap</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-col gap-4">
                  {active.curriculum.map((item, i) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                        {i + 1}
                      </span>
                      <span className="text-sm text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full gap-2">
                  See full {active.label.toLowerCase()} syllabus
                  <ArrowRight className="size-4" />
                </Button>
              </CardFooter>
            </Card>

            {/* Featured teachers */}
            <div className="flex flex-col gap-5">
              <h3 className="flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-muted-foreground">
                <Users className="size-4 text-primary" />
                Featured {active.label.toLowerCase()} mentors
              </h3>
              {active.teachers.map((t) => (
                <Card key={t.name} className="transition-shadow hover:shadow-sm">
                  <CardContent className="flex items-start gap-4 pt-6">
                    <Avatar className="size-14">
                      <AvatarFallback className="bg-primary/10 text-base font-semibold text-primary">
                        {t.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="font-semibold">{t.name}</p>
                        <Stars rating={t.rating} />
                      </div>
                      <p className="text-sm text-muted-foreground">{t.title}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                        <span className="font-medium text-foreground">
                          {t.rating.toFixed(1)}
                        </span>
                        <span>{t.reviews} reviews</span>
                        <Separator orientation="vertical" className="h-3" />
                        <span>{t.lessons}</span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {t.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="font-normal">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="outline" className="mb-4">
                Simple by design
              </Badge>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                How it works
              </h2>
              <p className="mt-3 text-muted-foreground">
                Four easy steps from curious beginner to confident player.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((step, i) => {
                const Icon = step.icon
                return (
                  <Card key={step.title} className="relative bg-card">
                    <CardContent className="flex flex-col gap-3 pt-6">
                      <div className="flex items-center justify-between">
                        <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <Icon className="size-6" />
                        </span>
                        <span className="text-3xl font-semibold text-muted-foreground/30">
                          {i + 1}
                        </span>
                      </div>
                      <h3 className="font-semibold">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.desc}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-4">
              Pricing
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Plans that grow with you
            </h2>
            <p className="mt-3 text-muted-foreground">
              No hidden fees. Pause or cancel anytime. Every plan starts with a free trial.
            </p>
          </div>
          <div className="mt-12 grid items-start gap-6 lg:grid-cols-3">
            {PACKAGES.map((pkg) => (
              <Card
                key={pkg.name}
                className={cn(
                  "flex flex-col",
                  pkg.featured && "border-primary shadow-md lg:-mt-4 lg:mb-4"
                )}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{pkg.name}</CardTitle>
                    {pkg.featured && <Badge>Most popular</Badge>}
                  </div>
                  <div className="flex items-baseline gap-1 pt-2">
                    <span className="text-4xl font-semibold tracking-tight">{pkg.price}</span>
                    <span className="text-sm text-muted-foreground">{pkg.cadence}</span>
                  </div>
                  <CardDescription className="pt-1">{pkg.desc}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="flex flex-col gap-3">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={pkg.featured ? "default" : "outline"}
                  >
                    {pkg.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section id="reviews" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="outline" className="mb-4">
                Loved by students
              </Badge>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Real progress, real joy
              </h2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <Card key={t.name} className="flex flex-col bg-card">
                  <CardContent className="flex flex-1 flex-col gap-4 pt-6">
                    <Quote className="size-7 text-primary/40" />
                    <p className="flex-1 text-sm leading-relaxed text-foreground">
                      {t.quote}
                    </p>
                    <Stars rating={5} />
                    <div className="flex items-center gap-3 border-t pt-4">
                      <Avatar className="size-10">
                        <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
                          {t.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.detail}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <Card className="overflow-hidden border-primary/20 bg-primary/10">
            <CardContent className="flex flex-col items-center gap-6 px-6 py-12 text-center sm:px-12">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <Music className="size-7" />
              </span>
              <h2 className="max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
                Your first lesson is on us
              </h2>
              <p className="max-w-md text-muted-foreground">
                Join thousands of students making music every week. Book a free trial lesson
                and discover how good it feels to play.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="gap-2">
                  <Calendar className="size-5" />
                  Book your free lesson
                </Button>
                <Button size="lg" variant="outline">
                  Talk to an advisor
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t bg-background">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 font-semibold">
                <span className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Music className="size-4" />
                </span>
                Crescendo
              </div>
              <p className="text-sm text-muted-foreground">
                Online music lessons that meet you where you are.
              </p>
            </div>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Instruments</p>
              <a href="#instruments" className="hover:text-foreground">Piano</a>
              <a href="#instruments" className="hover:text-foreground">Guitar</a>
              <a href="#instruments" className="hover:text-foreground">Violin</a>
              <a href="#instruments" className="hover:text-foreground">Voice</a>
            </div>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Company</p>
              <a href="#how" className="hover:text-foreground">How it works</a>
              <a href="#pricing" className="hover:text-foreground">Pricing</a>
              <a href="#reviews" className="hover:text-foreground">Reviews</a>
              <a href="#top" className="hover:text-foreground">Become a teacher</a>
            </div>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Support</p>
              <a href="#top" className="hover:text-foreground">Help center</a>
              <a href="#top" className="hover:text-foreground">Contact us</a>
              <a href="#top" className="hover:text-foreground">Privacy</a>
              <a href="#top" className="hover:text-foreground">Terms</a>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col items-center justify-between gap-3 text-sm text-muted-foreground sm:flex-row">
            <p>© 2024 Crescendo Music School. All rights reserved.</p>
            <p>Made with rhythm and a little patience.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
