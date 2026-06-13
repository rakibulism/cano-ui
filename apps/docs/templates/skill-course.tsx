"use client"

import * as React from "react"
import {
  Camera,
  Star,
  Aperture,
  Play,
  Clock,
  Check,
  Sun,
  Image as ImageIcon,
  ChevronRight,
  Sparkles,
  Quote,
  Instagram,
  Youtube,
  Mail,
  ArrowRight,
  Award,
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

const NAV_LINKS = [
  { label: "Gallery", href: "#gallery" },
  { label: "Curriculum", href: "#curriculum" },
  { label: "Instructor", href: "#instructor" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
]

const GALLERY = [
  { title: "Golden Hour Portrait", tag: "Natural light" },
  { title: "Misty Mountain Range", tag: "Landscape" },
  { title: "Neon Street Scene", tag: "Low light" },
  { title: "Macro Dewdrop", tag: "Close-up" },
  { title: "Candid Market Moment", tag: "Street" },
  { title: "Long Exposure Coast", tag: "Motion" },
]

const CURRICULUM = [
  {
    value: "m1",
    title: "Module 1 — Seeing Like a Camera",
    lessons: 5,
    duration: "47 min",
    items: [
      "How the camera reads light differently than your eye",
      "The exposure triangle, demystified",
      "Choosing your first lens for the look you want",
    ],
  },
  {
    value: "m2",
    title: "Module 2 — Composition That Holds Attention",
    lessons: 6,
    duration: "1h 12m",
    items: [
      "Beyond the rule of thirds: leading lines and framing",
      "Using negative space to create mood",
      "Building depth with foreground and layers",
    ],
  },
  {
    value: "m3",
    title: "Module 3 — Mastering Natural Light",
    lessons: 4,
    duration: "58 min",
    items: [
      "Reading golden hour and blue hour",
      "Shooting into the sun without losing detail",
      "Diffusing and bouncing on a budget",
    ],
  },
  {
    value: "m4",
    title: "Module 4 — Editing With Intention",
    lessons: 7,
    duration: "1h 34m",
    items: [
      "A repeatable RAW workflow start to finish",
      "Color grading to match your personal style",
      "Exporting for print, web, and social",
    ],
  },
]

const PLANS = {
  once: {
    price: "$149",
    cadence: "one-time",
    note: "Pay once, keep forever",
  },
  plan: {
    price: "$29",
    cadence: "/mo for 6 months",
    note: "Spread the cost, same access",
  },
}

const PLAN_FEATURES = [
  "22 video lessons in 4K",
  "Lifetime access & future updates",
  "Downloadable Lightroom presets",
  "Private student community",
  "Weekly photo critiques",
  "Certificate of completion",
]

const TESTIMONIALS = [
  {
    name: "Maya Chen",
    role: "Hobbyist, now freelancing",
    quote:
      "I went from auto-mode to booking my first paid portrait session in eight weeks. The lighting module alone was worth it.",
    initials: "MC",
  },
  {
    name: "Daniel Ortiz",
    role: "Travel blogger",
    quote:
      "Finally understand why my photos felt flat. The composition lessons completely changed how I frame a scene.",
    initials: "DO",
  },
  {
    name: "Priya Nair",
    role: "Small business owner",
    quote:
      "I shoot all my own product photos now and they look studio-grade. The editing workflow is so easy to follow.",
    initials: "PN",
  },
]

const FAQ = [
  {
    value: "f1",
    q: "Do I need an expensive camera to start?",
    a: "Not at all. Any DSLR, mirrorless, or even a recent smartphone will work. The principles you learn apply to whatever gear you own.",
  },
  {
    value: "f2",
    q: "How long do I have access?",
    a: "Forever. Once you enroll you keep lifetime access to every lesson, plus any new material I add down the road.",
  },
  {
    value: "f3",
    q: "Is there a refund policy?",
    a: "Yes. Try the full course for 30 days. If it is not for you, email me and I will refund every cent, no questions asked.",
  },
  {
    value: "f4",
    q: "Can I learn at my own pace?",
    a: "Absolutely. The course is fully self-paced with downloadable resources, so you can move as fast or slow as you like.",
  },
]

export default function SkillCourse() {
  const [billing, setBilling] = React.useState<"once" | "plan">("once")
  const active = PLANS[billing]

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3.5">
          <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Aperture className="h-4.5 w-4.5" />
            </span>
            Lightcraft
          </a>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="transition-colors hover:text-foreground">
                {l.label}
              </a>
            ))}
          </nav>
          <Button size="sm" className="shrink-0">
            Enroll now
          </Button>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-background to-accent" />
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-20 lg:grid-cols-2 lg:py-28">
            <div>
              <Badge variant="secondary" className="mb-5 gap-1.5">
                <Sparkles className="h-3.5 w-3.5" /> New 2026 cohort
              </Badge>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Take photos you are proud to print.
              </h1>
              <p className="mt-5 max-w-md text-lg text-muted-foreground">
                A hands-on photography course that teaches you to see light, compose
                with intention, and edit like a pro — whatever camera you own.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Button size="lg" className="gap-2">
                  Enroll for {PLANS.once.price} <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  <Play className="h-4 w-4" /> Watch trailer
                </Button>
              </div>
              <div className="mt-7 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">4.9</span> from 2,180+ students
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-3">
                {GALLERY.slice(0, 4).map((g, i) => (
                  <div
                    key={g.title}
                    className={cn(
                      "flex aspect-[4/5] flex-col justify-end rounded-2xl border bg-muted p-4",
                      i % 2 === 1 && "mt-6"
                    )}
                  >
                    <Camera className="mb-auto h-5 w-5 text-muted-foreground" aria-hidden="true" />
                    <p className="text-xs font-medium">{g.title}</p>
                    <p className="text-[11px] text-muted-foreground">{g.tag}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What you will create */}
        <section id="gallery" className="mx-auto w-full max-w-6xl px-4 py-20">
          <div className="mb-10 max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight">What you will create</h2>
            <p className="mt-3 text-muted-foreground">
              Each module ends with a real shoot. By the time you finish, your portfolio
              looks like this.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GALLERY.map((g) => (
              <div
                key={g.title}
                className="group flex aspect-[5/4] flex-col justify-end rounded-2xl border bg-muted/30 p-5 transition-colors hover:bg-muted"
              >
                <ImageIcon className="mb-auto h-6 w-6 text-muted-foreground" aria-hidden="true" />
                <Badge variant="outline" className="mb-2 w-fit bg-background">
                  {g.tag}
                </Badge>
                <p className="font-medium">{g.title}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Curriculum */}
        <section id="curriculum" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-3xl px-4 py-20">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-semibold tracking-tight">The curriculum</h2>
              <p className="mt-3 text-muted-foreground">
                22 lessons across 4 modules — about 4.5 hours of focused, practical video.
              </p>
            </div>
            <Accordion type="single" collapsible defaultValue="m1" className="w-full">
              {CURRICULUM.map((mod) => (
                <AccordionItem key={mod.value} value={mod.value} className="border-b">
                  <AccordionTrigger className="text-left text-base font-medium">
                    {mod.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="mb-3 flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Play className="h-3.5 w-3.5" /> {mod.lessons} lessons
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" /> {mod.duration}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {mod.items.map((it) => (
                        <li key={it} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          {it}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Instructor + sample lesson */}
        <section id="instructor" className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-20 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Meet your instructor</h2>
            <div className="mt-6 flex items-start gap-5">
              <Avatar className="h-16 w-16">
                <AvatarImage src="" alt="" />
                <AvatarFallback>ES</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-lg font-semibold">Elena Sokolova</p>
                <p className="text-sm text-muted-foreground">
                  Award-winning portrait & travel photographer
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-xl text-muted-foreground">
              Elena has spent twelve years shooting for editorial and commercial clients
              across four continents. She has taught over 9,000 students how to find their
              own voice behind the lens — and now she is sharing her complete process with you.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Badge variant="secondary" className="gap-1.5">
                <Sun className="h-3.5 w-3.5" /> Natural light specialist
              </Badge>
              <Badge variant="secondary" className="gap-1.5">
                <Award className="h-3.5 w-3.5" /> 9,000+ students taught
              </Badge>
              <Badge variant="secondary" className="gap-1.5">
                <Camera className="h-3.5 w-3.5" /> 12 years pro
              </Badge>
            </div>
          </div>

          <Card className="overflow-hidden">
            <div className="flex aspect-video items-center justify-center border-b bg-muted/40">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Play className="h-6 w-6 fill-current" />
              </div>
            </div>
            <CardHeader>
              <CardTitle className="text-base">Free sample lesson</CardTitle>
              <CardDescription>
                Lesson 2.1 — Finding leading lines anywhere
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" /> 9 min preview
              </span>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Play className="h-3.5 w-3.5" /> Watch
              </Button>
            </CardFooter>
          </Card>
        </section>

        {/* Pricing */}
        <section id="pricing" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-md px-4 py-20">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-semibold tracking-tight">One course, your pace</h2>
              <p className="mt-3 text-muted-foreground">
                Lifetime access either way. Switch the toggle to fit your budget.
              </p>
            </div>

            <div className="mb-7 flex items-center justify-center">
              <div className="inline-flex rounded-full border bg-background p-1">
                {(["once", "plan"] as const).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setBilling(key)}
                    aria-pressed={billing === key}
                    className={cn(
                      "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                      billing === key
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {key === "once" ? "One-time" : "Payment plan"}
                  </button>
                ))}
              </div>
            </div>

            <Card className="border-primary">
              <CardHeader>
                <CardDescription>Complete course</CardDescription>
                <CardTitle className="flex items-end gap-1.5">
                  <span className="text-4xl font-semibold tracking-tight">{active.price}</span>
                  <span className="pb-1 text-sm text-muted-foreground">{active.cadence}</span>
                </CardTitle>
                <p className="text-sm text-muted-foreground">{active.note}</p>
              </CardHeader>
              <CardContent>
                <Separator className="mb-5" />
                <ul className="space-y-3">
                  {PLAN_FEATURES.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex-col items-stretch gap-3">
                <Button size="lg" className="w-full">
                  Enroll now
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  30-day money-back guarantee
                </p>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Testimonials */}
        <section id="reviews" className="mx-auto w-full max-w-6xl px-4 py-20">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-semibold tracking-tight">Loved by students</h2>
            <p className="mt-3 text-muted-foreground">
              Real results from people who started exactly where you are.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <Card key={t.name} className="flex flex-col">
                <CardContent className="flex-1 pt-6">
                  <Quote className="mb-3 h-6 w-6 text-primary" aria-hidden="true" />
                  <p className="text-sm text-muted-foreground">{t.quote}</p>
                </CardContent>
                <CardFooter className="gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback>{t.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-t bg-muted/30">
          <div className="mx-auto w-full max-w-3xl px-4 py-20">
            <h2 className="mb-8 text-center text-3xl font-semibold tracking-tight">
              Frequently asked questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {FAQ.map((item) => (
                <AccordionItem key={item.value} value={item.value} className="border-b">
                  <AccordionTrigger className="text-left text-base font-medium">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mx-auto w-full max-w-6xl px-4 py-20">
          <Card className="overflow-hidden border-primary bg-primary/10">
            <CardContent className="flex flex-col items-center gap-6 px-6 py-14 text-center">
              <Aperture className="h-10 w-10 text-primary" aria-hidden="true" />
              <h2 className="max-w-xl text-3xl font-semibold tracking-tight">
                Your best photo is one lesson away.
              </h2>
              <p className="max-w-md text-muted-foreground">
                Join the 2026 cohort today and start shooting with confidence this weekend.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button size="lg" className="gap-2">
                  Enroll for {PLANS.once.price} <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Get the free lesson
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
          <a href="#top" className="flex items-center gap-2 text-sm font-semibold">
            <Aperture className="h-4 w-4 text-primary" /> Lightcraft
          </a>
          <p className="text-xs text-muted-foreground">
            © 2026 Lightcraft Photography School. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Instagram">
              <Instagram className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="YouTube">
              <Youtube className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Email">
              <Mail className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}
