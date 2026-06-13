"use client"
import * as React from "react"
import {
  Globe,
  Flame,
  Trophy,
  Zap,
  Headphones,
  MessageCircle,
  BookOpen,
  Star,
  Check,
  Play,
  Volume2,
  ArrowRight,
  Smartphone,
  Apple,
  Sparkles,
  Target,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

const LANGUAGES = [
  { code: "es", label: "Spanish", flag: "ES" },
  { code: "fr", label: "French", flag: "FR" },
  { code: "ja", label: "Japanese", flag: "JP" },
  { code: "de", label: "German", flag: "DE" },
  { code: "it", label: "Italian", flag: "IT" },
  { code: "ko", label: "Korean", flag: "KR" },
  { code: "pt", label: "Portuguese", flag: "PT" },
]

const LESSONS: Record<string, { phrase: string; translation: string; pron: string }[]> = {
  es: [
    { phrase: "Hola, ¿cómo estás?", translation: "Hi, how are you?", pron: "OH-lah, KOH-moh ess-TAHS" },
    { phrase: "Me llamo Ana", translation: "My name is Ana", pron: "meh YAH-moh AH-nah" },
    { phrase: "Mucho gusto", translation: "Nice to meet you", pron: "MOO-choh GOOS-toh" },
  ],
  fr: [
    { phrase: "Bonjour, ça va ?", translation: "Hello, how's it going?", pron: "bon-ZHOOR, sah VAH" },
    { phrase: "Je m'appelle Léa", translation: "My name is Léa", pron: "zhuh mah-PELL LAY-ah" },
    { phrase: "Enchanté", translation: "Nice to meet you", pron: "ahn-shahn-TAY" },
  ],
  ja: [
    { phrase: "こんにちは", translation: "Hello", pron: "kon-nee-chee-wah" },
    { phrase: "私はユキです", translation: "I am Yuki", pron: "wah-tah-shee wah yoo-kee dess" },
    { phrase: "よろしくお願いします", translation: "Nice to meet you", pron: "yo-ro-shee-koo o-neh-gai shee-mass" },
  ],
  de: [
    { phrase: "Hallo, wie geht's?", translation: "Hi, how are you?", pron: "HAH-loh, vee gayts" },
    { phrase: "Ich heiße Max", translation: "My name is Max", pron: "ikh HY-suh mahks" },
    { phrase: "Freut mich", translation: "Nice to meet you", pron: "froyt mikh" },
  ],
  it: [
    { phrase: "Ciao, come stai?", translation: "Hi, how are you?", pron: "chow, KOH-meh sty" },
    { phrase: "Mi chiamo Luca", translation: "My name is Luca", pron: "mee kee-AH-moh LOO-kah" },
    { phrase: "Piacere", translation: "Nice to meet you", pron: "pee-ah-CHEH-reh" },
  ],
  ko: [
    { phrase: "안녕하세요", translation: "Hello", pron: "an-nyong-ha-se-yo" },
    { phrase: "저는 지수예요", translation: "I am Jisoo", pron: "juh-neun jee-soo-yeh-yo" },
    { phrase: "반갑습니다", translation: "Nice to meet you", pron: "ban-gap-seum-ni-da" },
  ],
  pt: [
    { phrase: "Olá, tudo bem?", translation: "Hi, all good?", pron: "oh-LAH, TOO-doh beng" },
    { phrase: "Meu nome é João", translation: "My name is João", pron: "meh-oo NOH-mee eh zhwah-OW" },
    { phrase: "Prazer", translation: "Nice to meet you", pron: "prah-ZEHR" },
  ],
}

const FEATURES = [
  {
    icon: MessageCircle,
    title: "Real conversations",
    body: "Practice speaking from day one with AI tutors that adapt to your pace and correct you gently.",
  },
  {
    icon: Headphones,
    title: "Native audio",
    body: "Every phrase is voiced by native speakers, so you build the right accent and rhythm naturally.",
  },
  {
    icon: Target,
    title: "Spaced repetition",
    body: "Our review engine resurfaces words right before you forget them, locking them into memory.",
  },
  {
    icon: BookOpen,
    title: "Bite-size lessons",
    body: "Five-minute lessons that fit between meetings, commutes, and coffee breaks.",
  },
]

const STREAK_DAYS = [
  { day: "M", done: true },
  { day: "T", done: true },
  { day: "W", done: true },
  { day: "T", done: true },
  { day: "F", done: true },
  { day: "S", done: false },
  { day: "S", done: false },
]

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    blurb: "Learn at your own pace with ads.",
    features: ["1 language", "Daily lessons", "Streak tracking", "Community access"],
    highlight: false,
    cta: "Start free",
  },
  {
    name: "Plus",
    price: "$9",
    period: "per month",
    blurb: "Everything you need to get fluent.",
    features: ["All 40+ languages", "No ads", "Offline lessons", "AI conversation tutor", "Progress reports"],
    highlight: true,
    cta: "Go Plus",
  },
  {
    name: "Family",
    price: "$16",
    period: "per month",
    blurb: "Up to 6 accounts under one plan.",
    features: ["Everything in Plus", "6 member accounts", "Shared leaderboards", "Parent dashboard"],
    highlight: false,
    cta: "Choose Family",
  },
]

export default function LanguageLearningLanding() {
  const [selected, setSelected] = React.useState("es")
  const lessons = LESSONS[selected]
  const activeLang = LANGUAGES.find((l) => l.code === selected) ?? LANGUAGES[0]

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Globe className="h-5 w-5" />
            </span>
            <span className="text-lg font-bold tracking-tight">Lingo</span>
          </div>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#method" className="transition-colors hover:text-foreground">Method</a>
            <a href="#preview" className="transition-colors hover:text-foreground">Lessons</a>
            <a href="#streak" className="transition-colors hover:text-foreground">Streaks</a>
            <a href="#pricing" className="transition-colors hover:text-foreground">Pricing</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Log in</Button>
            <Button size="sm">Get started</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
            <div>
              <Badge variant="secondary" className="mb-5 gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                Learn a language in 5 minutes a day
              </Badge>
              <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                Speak {activeLang.label}.<br />
                <span className="text-primary">Actually speak it.</span>
              </h1>
              <p className="mt-5 max-w-md text-lg text-muted-foreground">
                Free, fun, and effective. Pick a language and start your first lesson in seconds.
              </p>

              <div className="mt-7">
                <p className="mb-3 text-sm font-medium text-muted-foreground">I want to learn</p>
                <div className="flex flex-wrap gap-2">
                  {LANGUAGES.map((lang) => {
                    const active = lang.code === selected
                    return (
                      <button
                        key={lang.code}
                        onClick={() => setSelected(lang.code)}
                        aria-pressed={active}
                        className={cn(
                          "flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all",
                          active
                            ? "border-primary bg-primary text-primary-foreground shadow-sm"
                            : "bg-card text-foreground hover:bg-accent"
                        )}
                      >
                        <span className={cn(
                          "rounded px-1.5 py-0.5 text-[10px] font-bold tracking-wider",
                          active ? "bg-primary-foreground/20" : "bg-muted"
                        )}>
                          {lang.flag}
                        </span>
                        {lang.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="gap-2">
                  Start learning {activeLang.label}
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  <Play className="h-4 w-4" />
                  Watch demo
                </Button>
              </div>

              <div className="mt-7 flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex -space-x-2">
                  {["A", "M", "K", "J"].map((i) => (
                    <span
                      key={i}
                      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-secondary text-xs font-semibold"
                    >
                      {i}
                    </span>
                  ))}
                </div>
                <span>Loved by <span className="font-semibold text-foreground">12M+</span> learners</span>
              </div>
            </div>

            {/* Lesson preview card */}
            <div id="preview" className="relative">
              <div className="absolute -right-6 -top-6 hidden h-24 w-24 rounded-full bg-primary/10 lg:block" />
              <Card className="relative overflow-hidden">
                <div className="flex items-center justify-between border-b bg-muted/30 px-5 py-3">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-bold tracking-wider">
                      {activeLang.flag}
                    </span>
                    {activeLang.label} · Lesson 1
                  </div>
                  <Badge variant="outline" className="gap-1">
                    <Star className="h-3 w-3 fill-current" />
                    Greetings
                  </Badge>
                </div>
                <CardContent className="space-y-3 p-5">
                  <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                    <span>Progress</span>
                    <span>1 of 3</span>
                  </div>
                  <Progress value={33} className="mb-2" />
                  {lessons.map((item, i) => (
                    <div
                      key={i}
                      className={cn(
                        "flex items-start justify-between rounded-xl border p-4 transition-colors",
                        i === 0 ? "border-primary bg-primary/5" : "bg-card"
                      )}
                    >
                      <div>
                        <p className="text-base font-semibold">{item.phrase}</p>
                        <p className="text-sm text-muted-foreground">{item.translation}</p>
                        <p className="mt-1 text-xs italic text-muted-foreground">{item.pron}</p>
                      </div>
                      <button
                        aria-label={"Play pronunciation for " + item.phrase}
                        className="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary/20"
                      >
                        <Volume2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <Button className="mt-2 w-full gap-2">
                    Continue lesson
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats strip */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 md:grid-cols-4">
            {[
              { icon: Users, stat: "12M+", label: "Active learners" },
              { icon: Globe, stat: "40+", label: "Languages" },
              { icon: Trophy, stat: "300M", label: "Lessons completed" },
              { icon: Star, stat: "4.9", label: "App store rating" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center text-center">
                <s.icon className="mb-2 h-6 w-6 text-primary" />
                <span className="text-2xl font-extrabold tracking-tight">{s.stat}</span>
                <span className="text-sm text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Method features */}
        <section id="method" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="secondary" className="mb-4">The method</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Built on how your brain learns
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We blend cognitive science with playful design so progress feels effortless.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <Card key={f.title} className="transition-shadow hover:shadow-md">
                <CardContent className="p-6">
                  <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mb-2 text-base font-semibold">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{f.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Streak / gamification */}
        <section id="streak" className="border-y bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
            <div>
              <Badge variant="secondary" className="mb-4 gap-1.5">
                <Flame className="h-3.5 w-3.5" />
                Stay motivated
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Streaks that turn study into a habit
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Earn XP, climb leagues, and unlock badges. A little friendly competition keeps you coming back every single day.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  { icon: Zap, title: "Daily XP goals", body: "Hit your target and watch the streak grow." },
                  { icon: Trophy, title: "Weekly leagues", body: "Compete with learners at your level." },
                ].map((g) => (
                  <div key={g.title} className="flex gap-3 rounded-xl border bg-card p-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <g.icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{g.title}</p>
                      <p className="text-xs text-muted-foreground">{g.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Flame className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="text-3xl font-extrabold leading-none tracking-tight">142</p>
                      <p className="text-sm text-muted-foreground">day streak</p>
                    </div>
                  </div>
                  <Badge className="gap-1">
                    <Trophy className="h-3.5 w-3.5" />
                    Diamond League
                  </Badge>
                </div>

                <Separator className="my-6" />

                <div className="flex justify-between">
                  {STREAK_DAYS.map((d, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <span
                        className={cn(
                          "flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-colors",
                          d.done ? "bg-primary text-primary-foreground" : "border bg-card text-muted-foreground"
                        )}
                      >
                        {d.done ? <Check className="h-4 w-4" /> : d.day}
                      </span>
                      <span className="text-[11px] text-muted-foreground">{d.day}</span>
                    </div>
                  ))}
                </div>

                <Separator className="my-6" />

                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium">Today's XP</span>
                    <span className="text-muted-foreground">40 / 50</span>
                  </div>
                  <Progress value={80} />
                  <p className="mt-2 text-xs text-muted-foreground">10 XP to reach your daily goal. Almost there!</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="secondary" className="mb-4">Pricing</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Start free, upgrade when ready</h2>
            <p className="mt-4 text-lg text-muted-foreground">No commitment. Cancel anytime.</p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {PLANS.map((plan) => (
              <Card
                key={plan.name}
                className={cn(
                  "relative flex flex-col",
                  plan.highlight && "border-primary shadow-md"
                )}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    Most popular
                  </span>
                )}
                <CardContent className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{plan.blurb}</p>
                  <div className="mt-5 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold tracking-tight">{plan.price}</span>
                    <span className="text-sm text-muted-foreground">/ {plan.period}</span>
                  </div>
                  <ul className="mt-6 space-y-3">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={plan.highlight ? "default" : "outline"}
                    className="mt-7 w-full"
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Download CTA */}
        <section className="border-t bg-primary/5">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <Card className="overflow-hidden border-primary/20">
              <CardContent className="grid items-center gap-8 p-8 sm:p-12 lg:grid-cols-2">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    Carry your classroom in your pocket
                  </h2>
                  <p className="mt-4 max-w-md text-lg text-muted-foreground">
                    Download Lingo and turn idle minutes into real progress. Available on iOS and Android.
                  </p>
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <Button size="lg" className="gap-2">
                      <Apple className="h-5 w-5" />
                      App Store
                    </Button>
                    <Button size="lg" variant="outline" className="gap-2">
                      <Smartphone className="h-5 w-5" />
                      Google Play
                    </Button>
                  </div>
                </div>
                <div className="flex justify-center lg:justify-end">
                  <div className="flex items-center gap-3 rounded-2xl border bg-card p-5 shadow-sm">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                      <Globe className="h-7 w-7" />
                    </span>
                    <div>
                      <p className="font-semibold">Lingo</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                        4.9 · 2.4M ratings
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Globe className="h-4 w-4" />
            </span>
            <span className="font-semibold">Lingo</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2024 Lingo Labs. Learn the world.</p>
          <nav className="flex gap-5 text-sm text-muted-foreground">
            <a href="#method" className="transition-colors hover:text-foreground">About</a>
            <a href="#pricing" className="transition-colors hover:text-foreground">Pricing</a>
            <a href="#preview" className="transition-colors hover:text-foreground">Support</a>
          </nav>
        </div>
      </footer>
    </div>
  )
}
