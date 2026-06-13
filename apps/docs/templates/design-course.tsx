"use client"

import * as React from "react"
import {
  Palette,
  Menu,
  Star,
  ArrowRight,
  PlayCircle,
  Check,
  Clock,
  BookOpen,
  Layers,
  PenTool,
  Figma,
  Eye,
  Sparkles,
  Award,
  Infinity,
  Quote,
  Twitter,
  Dribbble,
  Linkedin,
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
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/registry/ui/accordion"

const NAV_LINKS = [
  { label: "Curriculum", href: "#curriculum" },
  { label: "Instructor", href: "#instructor" },
  { label: "Outcomes", href: "#outcomes" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
]

const CURRICULUM = [
  {
    module: "Module 01",
    title: "Design Foundations",
    lessons: ["The principles of visual hierarchy", "Color theory in practice", "Typography systems that scale", "Spacing, grids & layout"],
    duration: "3h 20m",
  },
  {
    module: "Module 02",
    title: "Interface Patterns",
    lessons: ["Designing for clarity", "Components & design tokens", "Forms, inputs & states", "Empty states & micro-copy"],
    duration: "4h 05m",
  },
  {
    module: "Module 03",
    title: "Prototyping in Figma",
    lessons: ["Auto layout mastery", "Variants & interactive components", "Smart animate transitions", "Sharing & developer handoff"],
    duration: "3h 45m",
  },
  {
    module: "Module 04",
    title: "Ship a Real Product",
    lessons: ["From brief to wireframe", "High-fidelity polish", "Building a case study", "Presenting your work"],
    duration: "5h 10m",
  },
]

const LEARN = [
  { icon: Layers, title: "Design systems", body: "Build reusable component libraries with tokens, variants and clear documentation." },
  { icon: PenTool, title: "Visual craft", body: "Develop an eye for spacing, contrast and the small details that feel premium." },
  { icon: Figma, title: "Figma fluency", body: "Move fast with auto layout, variables, prototyping and handoff workflows." },
  { icon: Eye, title: "UX thinking", body: "Frame problems, map user flows and validate decisions with real feedback." },
  { icon: Sparkles, title: "Motion basics", body: "Add purposeful micro-interactions that guide attention without distraction." },
  { icon: Award, title: "A standout portfolio", body: "Finish with three polished case studies ready to share with hiring teams." },
]

const TESTIMONIALS = [
  {
    name: "Maya Chen",
    role: "Product Designer, Loop",
    quote: "I went from screenshots in PowerPoint to leading design reviews. The curriculum is ruthlessly practical.",
    img: "https://i.pravatar.cc/120?img=47",
  },
  {
    name: "Tomas Vidal",
    role: "Freelance Designer",
    quote: "The Figma modules alone paid for the course. I doubled my project rate within two months.",
    img: "https://i.pravatar.cc/120?img=12",
  },
  {
    name: "Priya Nair",
    role: "UX Designer, Northwind",
    quote: "Clear, warm and demanding in the best way. The portfolio reviews completely changed my work.",
    img: "https://i.pravatar.cc/120?img=32",
  },
]

const FAQS = [
  { q: "Do I need any prior design experience?", a: "None at all. We start from first principles and build up to advanced workflows, so beginners and self-taught designers both feel at home." },
  { q: "How long do I have access?", a: "Forever. Your enrollment includes lifetime access to all current lessons plus every future update to the course." },
  { q: "What software do I need?", a: "A free Figma account is all you need. We'll walk you through setup in the very first lesson." },
  { q: "Is there a community?", a: "Yes. You'll join a private community for feedback, accountability and weekly live critiques with the instructor." },
  { q: "Can I get a refund?", a: "Absolutely. If the course isn't right for you, request a full refund within 30 days, no questions asked." },
]

export default function DesignCourse() {
  const [annual, setAnnual] = React.useState(false)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-2 font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Palette className="h-4 w-4" />
            </span>
            Craft & Pixel
          </a>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="transition-colors hover:text-foreground">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              Sign in
            </Button>
            <Button size="sm" asChild>
              <a href="#pricing">Enroll now</a>
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2">
            <div>
              <Badge variant="secondary" className="mb-5 gap-1.5">
                <Sparkles className="h-3.5 w-3.5" /> New 2026 cohort
              </Badge>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Become a designer people <span className="text-primary">trust with the work.</span>
              </h1>
              <p className="mt-5 max-w-md text-lg text-muted-foreground">
                A hands-on online course that takes you from blank canvas to a portfolio of polished, shippable product design.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" asChild>
                  <a href="#pricing">
                    Enroll now <ArrowRight className="ml-1.5 h-4 w-4" />
                  </a>
                </Button>
                <Button size="lg" variant="outline">
                  <PlayCircle className="mr-1.5 h-4 w-4" /> Watch trailer
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[14, 28, 5, 9].map((n) => (
                    <Avatar key={n} className="h-9 w-9 border-2 border-background">
                      <AvatarImage src={`https://i.pravatar.cc/80?img=${n}`} alt="" />
                      <AvatarFallback>D</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="flex items-center gap-1 text-primary">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                    <span className="ml-1 font-semibold text-foreground">4.9</span>
                  </div>
                  <p className="text-muted-foreground">from 2,400+ students</p>
                </div>
              </div>
            </div>

            <Card className="relative">
              <CardContent className="p-3">
                <div className="aspect-video overflow-hidden rounded-lg border bg-muted">
                  <img
                    src="https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80"
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between gap-4 px-5 pb-5 pt-0">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" /> 16h of lessons
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BookOpen className="h-4 w-4" /> 4 modules
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Infinity className="h-4 w-4" /> Lifetime access
                </div>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* What you'll learn */}
        <section id="outcomes" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight">What you'll learn</h2>
            <p className="mt-3 text-muted-foreground">
              Six skill areas, taught through real projects and direct feedback.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {LEARN.map((item) => (
              <Card key={item.title} className="border-border/70">
                <CardHeader>
                  <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription>{item.body}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Curriculum */}
        <section id="curriculum" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 md:py-24">
            <div className="text-center">
              <Badge variant="outline" className="mb-4">Curriculum</Badge>
              <h2 className="text-3xl font-semibold tracking-tight">Four modules, one finished portfolio</h2>
              <p className="mt-3 text-muted-foreground">Expand any module to see the lessons inside.</p>
            </div>
            <Accordion type="single" collapsible defaultValue="item-0" className="mt-10">
              {CURRICULUM.map((mod, idx) => (
                <AccordionItem key={mod.title} value={`item-${idx}`} className="rounded-xl border bg-background px-4">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex flex-1 items-center justify-between gap-4 pr-3 text-left">
                      <div>
                        <p className="text-xs font-medium text-muted-foreground">{mod.module}</p>
                        <p className="font-semibold">{mod.title}</p>
                      </div>
                      <span className="shrink-0 text-sm text-muted-foreground">{mod.duration}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2.5 pb-2">
                      {mod.lessons.map((lesson) => (
                        <li key={lesson} className="flex items-center gap-3 text-sm text-muted-foreground">
                          <PlayCircle className="h-4 w-4 shrink-0 text-primary" /> {lesson}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Instructor */}
        <section id="instructor" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <Card className="overflow-hidden">
            <div className="grid items-center gap-0 md:grid-cols-[320px_1fr]">
              <div className="h-full bg-muted">
                <img
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=640&q=80"
                  alt=""
                  className="h-72 w-full object-cover md:h-full"
                />
              </div>
              <div className="p-8 md:p-10">
                <Badge variant="secondary" className="mb-4">Your instructor</Badge>
                <h2 className="text-2xl font-semibold tracking-tight">Lena Hartmann</h2>
                <p className="mt-1 text-sm text-primary">Principal Designer, ex-Figma & Airbnb</p>
                <p className="mt-4 max-w-lg text-muted-foreground">
                  Lena has spent 12 years building product design teams and shipping interfaces used by millions. She has mentored over 3,000 designers and believes great craft is learnable, one deliberate decision at a time.
                </p>
                <div className="mt-6 flex flex-wrap gap-6 text-sm">
                  <div>
                    <p className="text-xl font-semibold">12+ yrs</p>
                    <p className="text-muted-foreground">Industry experience</p>
                  </div>
                  <div>
                    <p className="text-xl font-semibold">3,000+</p>
                    <p className="text-muted-foreground">Designers mentored</p>
                  </div>
                  <div>
                    <p className="text-xl font-semibold">4.9 / 5</p>
                    <p className="text-muted-foreground">Average rating</p>
                  </div>
                </div>
                <div className="mt-6 flex gap-2">
                  <Button variant="outline" size="icon" aria-label="Twitter">
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" aria-label="Dribbble">
                    <Dribbble className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" aria-label="LinkedIn">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Testimonials */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight">Loved by working designers</h2>
              <p className="mt-3 text-muted-foreground">Real outcomes from people who took the course.</p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <Card key={t.name} className="flex flex-col">
                  <CardContent className="flex flex-1 flex-col p-6">
                    <Quote className="h-6 w-6 text-primary" />
                    <p className="mt-3 flex-1 text-sm leading-relaxed">{t.quote}</p>
                    <Separator className="my-5" />
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={t.img} alt="" />
                        <AvatarFallback>{t.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="text-sm">
                        <p className="font-medium">{t.name}</p>
                        <p className="text-muted-foreground">{t.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight">Simple, fair pricing</h2>
            <p className="mt-3 text-muted-foreground">Pay once and own it, or spread it across a membership.</p>
            <div className="mt-7 inline-flex items-center gap-3 rounded-full border bg-muted/40 px-4 py-2">
              <Label htmlFor="billing" className={cn("text-sm", !annual && "text-foreground", annual && "text-muted-foreground")}>
                One-time
              </Label>
              <Switch id="billing" checked={annual} onCheckedChange={setAnnual} aria-label="Toggle billing" />
              <Label htmlFor="billing" className={cn("text-sm", annual && "text-foreground", !annual && "text-muted-foreground")}>
                Subscription
              </Label>
            </div>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Starter</CardTitle>
                <CardDescription>Everything to learn at your own pace.</CardDescription>
                <p className="pt-4">
                  <span className="text-4xl font-semibold">{annual ? "$19" : "$149"}</span>
                  <span className="text-muted-foreground">{annual ? " /mo" : " once"}</span>
                </p>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {["All 4 course modules", "16 hours of video lessons", "Downloadable Figma files", "Community access"].map((f) => (
                  <div key={f} className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-primary" /> {f}
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Choose Starter</Button>
              </CardFooter>
            </Card>

            <Card className="relative border-primary shadow-sm ring-1 ring-primary/20">
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most popular</Badge>
              <CardHeader>
                <CardTitle>Pro Mentorship</CardTitle>
                <CardDescription>Course plus live feedback on your work.</CardDescription>
                <p className="pt-4">
                  <span className="text-4xl font-semibold">{annual ? "$39" : "$299"}</span>
                  <span className="text-muted-foreground">{annual ? " /mo" : " once"}</span>
                </p>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {["Everything in Starter", "Weekly live portfolio reviews", "1:1 mentor sessions", "Certificate of completion", "Priority support"].map((f) => (
                  <div key={f} className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-primary" /> {f}
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button className="w-full">Enroll in Pro</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-t bg-muted/30">
          <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 md:py-24">
            <div className="text-center">
              <h2 className="text-3xl font-semibold tracking-tight">Frequently asked questions</h2>
              <p className="mt-3 text-muted-foreground">Everything else you might be wondering.</p>
            </div>
            <Accordion type="single" collapsible className="mt-10 space-y-3">
              {FAQS.map((faq, idx) => (
                <AccordionItem key={faq.q} value={`faq-${idx}`} className="rounded-xl border bg-background px-4">
                  <AccordionTrigger className="text-left hover:no-underline">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <Card className="overflow-hidden border-primary/30 bg-primary text-primary-foreground">
            <CardContent className="flex flex-col items-center gap-6 px-6 py-14 text-center md:px-12">
              <Palette className="h-10 w-10" />
              <h2 className="max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
                Start designing work you're proud of
              </h2>
              <p className="max-w-md text-primary-foreground/80">
                Join the next cohort and build a portfolio that opens doors. Risk-free with a 30-day money-back guarantee.
              </p>
              <Button size="lg" variant="secondary" asChild>
                <a href="#pricing">
                  Enroll now <ArrowRight className="ml-1.5 h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <div className="flex items-center gap-2 font-semibold text-foreground">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Palette className="h-3.5 w-3.5" />
            </span>
            Craft & Pixel
          </div>
          <p>© 2026 Craft & Pixel. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#top" className="hover:text-foreground">Privacy</a>
            <a href="#top" className="hover:text-foreground">Terms</a>
            <a href="#top" className="hover:text-foreground">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
