"use client"

import * as React from "react"
import {
  ArrowRight,
  BookOpen,
  Check,
  Globe,
  GraduationCap,
  Headphones,
  Menu,
  MessageCircle,
  Mic,
  Play,
  Quote,
  Sparkles,
  Star,
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
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/registry/ui/accordion"

type LangKey = "es" | "fr" | "ja" | "de"

const LANGUAGES: { key: LangKey; flag: string; name: string; greeting: string }[] = [
  { key: "es", flag: "🇪🇸", name: "Spanish", greeting: "¡Hola!" },
  { key: "fr", flag: "🇫🇷", name: "French", greeting: "Bonjour!" },
  { key: "ja", flag: "🇯🇵", name: "Japanese", greeting: "こんにちは!" },
  { key: "de", flag: "🇩🇪", name: "German", greeting: "Hallo!" },
]

const CURRICULUM: Record<LangKey, { tagline: string; learners: string; modules: string[] }> = {
  es: {
    tagline: "From café orders to confident conversations across Latin America and Spain.",
    learners: "82,400 learners",
    modules: ["Greetings & introductions", "Ordering food & travel", "Past & future tenses", "Idioms of Madrid & Mexico City"],
  },
  fr: {
    tagline: "Polish your accent and read the menus, the news, and the novels.",
    learners: "54,100 learners",
    modules: ["Bonjour basics", "Markets & directions", "The elegant subjunctive", "Parisian slang & cinema"],
  },
  ja: {
    tagline: "Master hiragana, katakana, and the kanji you actually need first.",
    learners: "37,900 learners",
    modules: ["Kana foundations", "Polite & casual speech", "Counting & particles", "Manga, anime & keigo"],
  },
  de: {
    tagline: "Tame the cases and unlock business, travel, and the Bundesliga.",
    learners: "29,300 learners",
    modules: ["Der, die, das", "Travel & transit", "The four cases", "Compound words & idioms"],
  },
}

const TUTORS: Record<LangKey, { name: string; city: string; rating: number; reviews: number; img: string; tag: string }[]> = {
  es: [
    { name: "Lucía Fernández", city: "Sevilla, ES", rating: 4.9, reviews: 612, img: "https://i.pravatar.cc/128?img=45", tag: "Conversation" },
    { name: "Mateo Rojas", city: "Bogotá, CO", rating: 4.8, reviews: 488, img: "https://i.pravatar.cc/128?img=14", tag: "Business" },
    { name: "Valentina Cruz", city: "CDMX, MX", rating: 5.0, reviews: 721, img: "https://i.pravatar.cc/128?img=20", tag: "Beginners" },
  ],
  fr: [
    { name: "Camille Laurent", city: "Lyon, FR", rating: 4.9, reviews: 543, img: "https://i.pravatar.cc/128?img=31", tag: "Accent" },
    { name: "Hugo Moreau", city: "Paris, FR", rating: 4.7, reviews: 402, img: "https://i.pravatar.cc/128?img=11", tag: "Grammar" },
    { name: "Élise Dubois", city: "Montréal, CA", rating: 5.0, reviews: 689, img: "https://i.pravatar.cc/128?img=49", tag: "Travel" },
  ],
  ja: [
    { name: "Yuki Tanaka", city: "Tokyo, JP", rating: 5.0, reviews: 758, img: "https://i.pravatar.cc/128?img=5", tag: "Kanji" },
    { name: "Haruto Sato", city: "Osaka, JP", rating: 4.8, reviews: 431, img: "https://i.pravatar.cc/128?img=33", tag: "Conversation" },
    { name: "Mei Kobayashi", city: "Kyoto, JP", rating: 4.9, reviews: 596, img: "https://i.pravatar.cc/128?img=24", tag: "Beginners" },
  ],
  de: [
    { name: "Lena Weber", city: "Berlin, DE", rating: 4.9, reviews: 511, img: "https://i.pravatar.cc/128?img=27", tag: "Cases" },
    { name: "Felix Bauer", city: "Munich, DE", rating: 4.8, reviews: 367, img: "https://i.pravatar.cc/128?img=13", tag: "Business" },
    { name: "Anna Schmidt", city: "Vienna, AT", rating: 5.0, reviews: 644, img: "https://i.pravatar.cc/128?img=44", tag: "Conversation" },
  ],
}

const STEPS = [
  { icon: Globe, title: "Pick your language", body: "Choose from Spanish, French, Japanese, or German — switch any time as you grow." },
  { icon: BookOpen, title: "Follow a tailored path", body: "A placement check builds a curriculum around what you already know." },
  { icon: Mic, title: "Practice out loud", body: "Daily speaking drills with instant pronunciation feedback that adapts to you." },
  { icon: MessageCircle, title: "Meet your tutor", body: "Weekly live sessions with a native speaker to lock in real conversation." },
]

const LEVELS = [
  { level: "A1 — Beginner", title: "Find your footing", body: "Greet people, introduce yourself, and handle everyday phrases with confidence.", weeks: "6 weeks" },
  { level: "B1 — Intermediate", title: "Hold the conversation", body: "Talk about your day, your plans, and your opinions without freezing up.", weeks: "10 weeks" },
  { level: "C1 — Advanced", title: "Think in the language", body: "Debate, joke, and read native media — the accent and nuance finally click.", weeks: "14 weeks" },
]

const PRICING = [
  {
    name: "Self-study",
    monthly: 9,
    annual: 7,
    desc: "Learn at your own pace.",
    features: ["All 4 languages", "Interactive lessons", "Speaking drills", "Progress tracking"],
    featured: false,
  },
  {
    name: "Tutor Plus",
    monthly: 29,
    annual: 24,
    desc: "Lessons plus live tutors.",
    features: ["Everything in Self-study", "4 live tutor sessions / mo", "Personalized study plan", "Priority support"],
    featured: true,
  },
  {
    name: "Immersion",
    monthly: 59,
    annual: 49,
    desc: "Go all in, fast.",
    features: ["Everything in Tutor Plus", "Unlimited tutor sessions", "Small-group conversation clubs", "Completion certificate"],
    featured: false,
  },
]

const TESTIMONIALS = [
  { name: "Priya N.", role: "Learning Spanish", quote: "I switched between Spanish and French to see which clicked — the curriculum reshaped itself instantly. Six months in and I ordered dinner in Madrid without English.", img: "https://i.pravatar.cc/96?img=47" },
  { name: "Tom B.", role: "Learning Japanese", quote: "The kana path actually made sense. My tutor in Tokyo was patient and funny, and the speaking drills cured my fear of talking.", img: "https://i.pravatar.cc/96?img=12" },
  { name: "Sofia L.", role: "Learning German", quote: "Cases used to terrify me. The level cards broke it into stages I could actually finish, and I passed my B1 exam on the first try.", img: "https://i.pravatar.cc/96?img=32" },
]

const FAQ = [
  { q: "Can I learn more than one language?", a: "Yes. Every plan includes all four languages — Spanish, French, Japanese, and German. Switch any time and your progress is saved per language." },
  { q: "How are tutors matched to me?", a: "After a short placement check we suggest native-speaker tutors whose specialty matches your goals, whether that's accent, grammar, business, or travel." },
  { q: "Do I need any prior experience?", a: "Not at all. Every language starts with an A1 beginner path, and the placement check skips you ahead if you already know the basics." },
  { q: "What if I miss a live session?", a: "Sessions can be rescheduled up to 12 hours in advance, and every group conversation club is recorded so you can catch up." },
  { q: "Can I cancel any time?", a: "Yes. Plans are month-to-month with no lock-in, and annual billing can be refunded pro-rata within 30 days." },
]

const NAV = ["How it works", "Levels", "Tutors", "Pricing", "FAQ"]

function navHref(item: string) {
  return "#" + item.toLowerCase().replace(/\s+/g, "-")
}

export default function LanguageCoursePage() {
  const [lang, setLang] = React.useState<LangKey>("es")
  const [annual, setAnnual] = React.useState(false)
  const [email, setEmail] = React.useState("")

  const active = LANGUAGES.find((l) => l.key === lang)!
  const course = CURRICULUM[lang]
  const tutors = TUTORS[lang]

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-2 font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Globe className="h-5 w-5" />
            </span>
            <span>Linguafy</span>
          </a>
          <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
            {NAV.map((item) => (
              <a
                key={item}
                href={navHref(item)}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
              <a href="#top">Log in</a>
            </Button>
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <a href="#pricing">Start learning</a>
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* Hero + language selector */}
        <section className="relative overflow-hidden border-b">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
            <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div className="flex flex-col justify-center">
                <Badge variant="secondary" className="mb-5 w-fit gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" /> Speak from day one
                </Badge>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  Learn{" "}
                  <span className="text-primary">{active.name}</span>{" "}
                  the way it&rsquo;s actually spoken.
                </h1>
                <p className="mt-5 max-w-xl text-lg text-muted-foreground">
                  Bite-sized lessons, real native tutors, and speaking practice that adapts to you.
                  Pick a language below and watch your whole learning path reshape itself.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button size="lg" asChild>
                    <a href="#pricing">
                      Start learning {active.name} <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href="#how-it-works">
                      <Play className="mr-1 h-4 w-4" /> See how it works
                    </a>
                  </Button>
                </div>
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Users className="h-4 w-4" /> 200k+ active learners
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Star className="h-4 w-4 fill-current text-primary" /> 4.9 in the App Store
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Headphones className="h-4 w-4" /> Native-speaker audio
                  </span>
                </div>
              </div>

              {/* Language tabs panel */}
              <Card className="self-center shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Globe className="h-4 w-4 text-primary" /> Choose your language
                  </CardTitle>
                  <CardDescription>Your curriculum and tutors update instantly.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={lang} onValueChange={(v) => setLang(v as LangKey)}>
                    <TabsList className="grid w-full grid-cols-4">
                      {LANGUAGES.map((l) => (
                        <TabsTrigger key={l.key} value={l.key} className="gap-1.5">
                          <span aria-hidden="true">{l.flag}</span>
                          <span className="hidden sm:inline">{l.name}</span>
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    {LANGUAGES.map((l) => (
                      <TabsContent key={l.key} value={l.key} className="mt-5 space-y-5">
                        <div className="rounded-lg border bg-muted/30 p-4">
                          <div className="text-2xl font-bold">{l.greeting}</div>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {CURRICULUM[l.key].tagline}
                          </p>
                        </div>
                        <div>
                          <div className="mb-2 flex items-center justify-between">
                            <span className="text-sm font-medium">Highlighted curriculum</span>
                            <Badge variant="outline">{CURRICULUM[l.key].learners}</Badge>
                          </div>
                          <ul className="space-y-2">
                            {CURRICULUM[l.key].modules.map((m, i) => (
                              <li key={m} className="flex items-center gap-3 text-sm">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                                  {i + 1}
                                </span>
                                {m}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <a href="#tutors">Meet {active.name} tutors</a>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How it works</h2>
            <p className="mt-3 text-muted-foreground">
              Four steps from your first word to a real conversation.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <Card key={s.title} className="relative transition-shadow hover:shadow-sm">
                <CardHeader>
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <span className="absolute right-5 top-5 text-3xl font-bold text-muted-foreground/20">
                    {i + 1}
                  </span>
                  <CardTitle className="mt-4 text-lg">{s.title}</CardTitle>
                  <CardDescription>{s.body}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Levels */}
        <section id="levels" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                A path for every level of {active.name}
              </h2>
              <p className="mt-3 text-muted-foreground">
                Whether you&rsquo;re starting from {active.greeting} or refining your accent, there&rsquo;s a track for you.
              </p>
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {LEVELS.map((lvl, i) => (
                <Card key={lvl.level} className={cn("flex flex-col", i === 1 && "border-primary ring-1 ring-primary")}>
                  <CardHeader>
                    <Badge variant={i === 1 ? "default" : "secondary"} className="w-fit">
                      {lvl.level}
                    </Badge>
                    <CardTitle className="mt-3">{lvl.title}</CardTitle>
                    <CardDescription>{lvl.body}</CardDescription>
                  </CardHeader>
                  <CardFooter className="mt-auto flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{lvl.weeks}</span>
                    <Button variant="ghost" size="sm" asChild>
                      <a href="#pricing">
                        Explore <ArrowRight className="ml-1 h-4 w-4" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Tutors */}
        <section id="tutors" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Meet your {active.name} tutors
              </h2>
              <p className="mt-3 text-muted-foreground">
                Native speakers who make every session feel like a real conversation.
              </p>
            </div>
            <Badge variant="secondary" className="gap-1.5">
              <span aria-hidden="true">{active.flag}</span> {active.name}
            </Badge>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {tutors.map((t) => (
              <Card key={t.name} className="flex flex-col text-center">
                <CardHeader className="items-center">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={t.img} alt="" />
                    <AvatarFallback>{t.name.slice(0, 1)}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="mt-4 text-lg">{t.name}</CardTitle>
                  <CardDescription>{t.city}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <Badge variant="outline">{t.tag}</Badge>
                </CardContent>
                <CardFooter className="flex items-center justify-center gap-1.5">
                  <Star className="h-4 w-4 fill-current text-primary" />
                  <span className="font-medium">{t.rating.toFixed(1)}</span>
                  <span className="text-sm text-muted-foreground">({t.reviews} reviews)</span>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Simple, flexible pricing</h2>
              <p className="mt-3 text-muted-foreground">
                Every plan unlocks all four languages. Cancel any time.
              </p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <span className={cn("text-sm", !annual && "font-medium")}>Monthly</span>
                <Switch
                  checked={annual}
                  onCheckedChange={setAnnual}
                  aria-label="Toggle annual billing"
                />
                <span className={cn("text-sm", annual && "font-medium")}>Annual</span>
                <Badge variant="secondary" className="ml-1">Save ~20%</Badge>
              </div>
            </div>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {PRICING.map((plan) => {
                const price = annual ? plan.annual : plan.monthly
                return (
                  <Card
                    key={plan.name}
                    className={cn(
                      "flex flex-col",
                      plan.featured && "border-primary shadow-md ring-1 ring-primary"
                    )}
                  >
                    <CardHeader>
                      {plan.featured && <Badge className="mb-2 w-fit">Most popular</Badge>}
                      <CardTitle>{plan.name}</CardTitle>
                      <CardDescription>{plan.desc}</CardDescription>
                      <div className="mt-3 flex items-baseline gap-1.5">
                        <span className="text-4xl font-bold">${price}</span>
                        <span className="text-sm text-muted-foreground">/ mo</span>
                      </div>
                      {annual && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          Billed ${price * 12} yearly
                        </p>
                      )}
                    </CardHeader>
                    <CardContent className="flex-1">
                      <ul className="space-y-3 text-sm">
                        {plan.features.map((f) => (
                          <li key={f} className="flex items-start gap-2">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" variant={plan.featured ? "default" : "outline"}>
                        Choose {plan.name}
                      </Button>
                    </CardFooter>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Learners who stuck with it</h2>
            <p className="mt-3 text-muted-foreground">Real stories from people who finally became fluent.</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <Card key={t.name} className="flex flex-col justify-between">
                <CardContent className="pt-6">
                  <Quote className="h-6 w-6 text-primary/40" aria-hidden="true" />
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
        </section>

        {/* FAQ */}
        <section id="faq" className="border-t bg-muted/30">
          <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Frequently asked</h2>
              <p className="mt-3 text-muted-foreground">Everything you need before your first lesson.</p>
            </div>
            <Accordion type="single" collapsible className="mt-10 w-full">
              {FAQ.map((item, i) => (
                <AccordionItem key={item.q} value={"item-" + i}>
                  <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="flex flex-col items-center gap-6 px-6 py-12 text-center sm:px-12">
                <span className="text-4xl" aria-hidden="true">{active.greeting}</span>
                <h2 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
                  Your first {active.name} lesson is free.
                </h2>
                <p className="max-w-xl text-primary-foreground/80">
                  Drop your email and we&rsquo;ll send your placement check and a starter lesson today.
                </p>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
                >
                  <label htmlFor="cta-email" className="sr-only">
                    Email address
                  </label>
                  <Input
                    id="cta-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-background text-foreground"
                  />
                  <Button type="submit" variant="secondary" className="shrink-0">
                    Start free <GraduationCap className="ml-1 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Globe className="h-5 w-5" />
            </span>
            Linguafy
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground" aria-label="Footer">
            {NAV.map((item) => (
              <a key={item} href={navHref(item)} className="hover:text-foreground">
                {item}
              </a>
            ))}
          </nav>
          <Separator className="md:hidden" />
          <p className="text-sm text-muted-foreground">© 2026 Linguafy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
