"use client"

import * as React from "react"
import {
  GraduationCap,
  Menu,
  Play,
  Star,
  Clock,
  BarChart3,
  Users,
  Award,
  CheckCircle2,
  Check,
  Sparkles,
  BookOpen,
  Globe,
  MessageCircle,
  Quote,
  ArrowRight,
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
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/registry/ui/accordion"

const NAV = ["Courses", "Why Lumora", "Instructors", "Pricing", "FAQ"]

const STATS = [
  { value: "120+", label: "Live courses" },
  { value: "48k", label: "Active learners" },
  { value: "96%", label: "Completion rate" },
  { value: "4.9", label: "Average rating" },
]

type Level = "Beginner" | "Intermediate" | "Advanced"

const COURSES: {
  title: string
  category: string
  level: Level
  duration: string
  lessons: number
  rating: number
  learners: string
  icon: React.ComponentType<{ className?: string }>
}[] = [
  {
    title: "Foundations of Web Development",
    category: "Engineering",
    level: "Beginner",
    duration: "8 weeks",
    lessons: 64,
    rating: 4.9,
    learners: "12.4k",
    icon: Globe,
  },
  {
    title: "Data Science with Python",
    category: "Data",
    level: "Intermediate",
    duration: "10 weeks",
    lessons: 78,
    rating: 4.8,
    learners: "9.1k",
    icon: BarChart3,
  },
  {
    title: "UX & Product Design Studio",
    category: "Design",
    level: "Beginner",
    duration: "6 weeks",
    lessons: 52,
    rating: 4.9,
    learners: "7.8k",
    icon: Sparkles,
  },
  {
    title: "Machine Learning Systems",
    category: "AI",
    level: "Advanced",
    duration: "12 weeks",
    lessons: 96,
    rating: 4.7,
    learners: "5.3k",
    icon: BookOpen,
  },
  {
    title: "Digital Marketing Mastery",
    category: "Business",
    level: "Intermediate",
    duration: "7 weeks",
    lessons: 58,
    rating: 4.8,
    learners: "8.6k",
    icon: MessageCircle,
  },
  {
    title: "Cloud & DevOps Engineering",
    category: "Engineering",
    level: "Advanced",
    duration: "11 weeks",
    lessons: 84,
    rating: 4.8,
    learners: "4.9k",
    icon: Award,
  },
]

const FILTERS: ("All" | Level)[] = ["All", "Beginner", "Intermediate", "Advanced"]

const FEATURES = [
  {
    icon: Users,
    title: "Live cohort learning",
    body: "Join small cohorts with weekly live sessions, peer reviews, and a dedicated mentor for every learner.",
  },
  {
    icon: Award,
    title: "Verified certificates",
    body: "Earn shareable, industry-recognized certificates the moment you complete a track.",
  },
  {
    icon: MessageCircle,
    title: "24/7 mentor support",
    body: "Stuck on a problem? Get unblocked fast through async chat and scheduled office hours.",
  },
  {
    icon: BarChart3,
    title: "Project-based mastery",
    body: "Build a portfolio of real, graded projects that prove your skills to employers.",
  },
]

const INSTRUCTORS = [
  {
    name: "Dr. Amara Okafor",
    role: "Lead, Data Science",
    bio: "Former research scientist with 12 years teaching applied machine learning.",
    img: "https://i.pravatar.cc/160?img=47",
    fallback: "AO",
    tag: "Data",
  },
  {
    name: "Marco Bellini",
    role: "Principal Engineer",
    bio: "Shipped products at scale and mentored 3,000+ engineers into their first roles.",
    img: "https://i.pravatar.cc/160?img=12",
    fallback: "MB",
    tag: "Engineering",
  },
  {
    name: "Lena Hartmann",
    role: "Head of Design",
    bio: "Design leader who turns beginners into confident, hireable product designers.",
    img: "https://i.pravatar.cc/160?img=32",
    fallback: "LH",
    tag: "Design",
  },
]

const PLANS = [
  {
    name: "Starter",
    price: "$0",
    cadence: "forever",
    blurb: "Explore the platform and audit select lessons.",
    cta: "Start free",
    highlighted: false,
    perks: [
      "Access to 10 intro courses",
      "Community discussion access",
      "Self-paced learning",
      "Mobile + desktop apps",
    ],
  },
  {
    name: "Pro",
    price: "$29",
    cadence: "per month",
    blurb: "Full catalog, live cohorts, and certificates.",
    cta: "Enroll now",
    highlighted: true,
    perks: [
      "Unlimited course access",
      "Live cohorts & mentor support",
      "Verified certificates",
      "Graded portfolio projects",
      "Career coaching sessions",
    ],
  },
  {
    name: "Teams",
    price: "$89",
    cadence: "per seat / mo",
    blurb: "Upskill your whole organization with admin tools.",
    cta: "Contact sales",
    highlighted: false,
    perks: [
      "Everything in Pro",
      "Team analytics dashboard",
      "Custom learning paths",
      "Dedicated success manager",
      "SSO & priority support",
    ],
  },
]

const FAQS = [
  {
    q: "Do I need any prior experience to enroll?",
    a: "Not at all. Most of our tracks start at the beginner level and build up step by step. Each course page lists prerequisites so you always know what to expect.",
  },
  {
    q: "How do live cohorts work?",
    a: "Cohorts run on a fixed schedule with weekly live sessions led by your instructor, plus peer groups and graded projects. You can also revisit every recording on demand.",
  },
  {
    q: "Are the certificates recognized by employers?",
    a: "Yes. Our verified certificates are shareable on LinkedIn and trusted by hiring partners who recruit directly from our completers.",
  },
  {
    q: "Can I switch or cancel my plan anytime?",
    a: "Absolutely. Upgrade, downgrade, or cancel from your account settings at any time, no questions asked. Pro plans include a 14-day money-back guarantee.",
  },
  {
    q: "Is there support if I get stuck?",
    a: "Every Pro learner gets 24/7 async mentor chat and scheduled office hours, so you are never blocked for long.",
  },
]

const levelTone: Record<Level, string> = {
  Beginner: "bg-primary/10 text-primary",
  Intermediate: "bg-accent text-foreground",
  Advanced: "bg-secondary text-foreground",
}

export default function OnlineSchoolPage() {
  const [activeFilter, setActiveFilter] = React.useState<(typeof FILTERS)[number]>(
    "All"
  )
  const [email, setEmail] = React.useState("")

  const visibleCourses =
    activeFilter === "All"
      ? COURSES
      : COURSES.filter((c) => c.level === activeFilter)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-2 font-semibold">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <GraduationCap className="h-5 w-5" />
            </span>
            <span className="text-lg tracking-tight">Lumora</span>
          </a>
          <nav className="hidden items-center gap-7 md:flex">
            {NAV.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s|&/g, "")}`}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              Log in
            </Button>
            <Button size="sm">Enroll now</Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main id="top" className="flex flex-1 flex-col">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_0%,theme(colors.primary/12),transparent)]" />
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
            <div>
              <Badge
                variant="secondary"
                className="mb-5 inline-flex items-center gap-1.5"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Spring cohorts now open
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Learn the skills that
                <span className="text-primary"> launch careers</span>
              </h1>
              <p className="mt-5 max-w-md text-lg text-muted-foreground">
                Lumora is an online school where mentors, live cohorts, and
                hands-on projects turn curiosity into a career you love.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="gap-2">
                  Enroll today
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  <Play className="h-4 w-4" />
                  Watch a lesson
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[5, 14, 23, 31].map((n) => (
                    <Avatar key={n} className="h-9 w-9 border-2 border-background">
                      <AvatarImage src={`https://i.pravatar.cc/72?img=${n}`} alt="" />
                      <AvatarFallback>L</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">48,000+</span>{" "}
                  learners enrolled this year
                </div>
              </div>
            </div>

            <Card className="relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-32 bg-primary/10" />
              <CardHeader className="relative">
                <Badge className="w-fit gap-1.5">
                  <Play className="h-3 w-3" /> Featured track
                </Badge>
                <CardTitle className="mt-3 text-2xl">
                  Full-Stack Career Path
                </CardTitle>
                <CardDescription>
                  From first line of code to job-ready in 6 months.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {STATS.map((s) => (
                    <div
                      key={s.label}
                      className="rounded-xl border bg-muted/30 p-4"
                    >
                      <div className="text-2xl font-bold">{s.value}</div>
                      <div className="text-xs text-muted-foreground">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Your progress</span>
                    <span className="font-medium">Module 4 of 9</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full w-[44%] rounded-full bg-primary" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="relative">
                <Button className="w-full gap-2">
                  Continue learning <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Course catalog */}
        <section id="courses" className="border-b">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Explore the catalog
                </h2>
                <p className="mt-3 max-w-md text-muted-foreground">
                  Browse expert-built courses across every level and discipline.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {FILTERS.map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                      activeFilter === f
                        ? "border-primary bg-primary text-primary-foreground"
                        : "bg-background text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleCourses.map((course) => {
                const Icon = course.icon
                return (
                  <Card
                    key={course.title}
                    className="group flex flex-col transition-shadow hover:shadow-lg"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <Icon className="h-5 w-5" />
                        </span>
                        <Badge
                          variant="outline"
                          className={cn("border-0", levelTone[course.level])}
                        >
                          {course.level}
                        </Badge>
                      </div>
                      <CardTitle className="mt-4 text-lg leading-snug">
                        {course.title}
                      </CardTitle>
                      <CardDescription>{course.category}</CardDescription>
                    </CardHeader>
                    <CardContent className="mt-auto">
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="h-4 w-4" />
                          {course.duration}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <BookOpen className="h-4 w-4" />
                          {course.lessons} lessons
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Users className="h-4 w-4" />
                          {course.learners}
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex items-center justify-between border-t pt-4">
                      <span className="inline-flex items-center gap-1 text-sm font-medium">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        {course.rating.toFixed(1)}
                      </span>
                      <Button variant="ghost" size="sm" className="gap-1">
                        View course
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </Button>
                    </CardFooter>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Why us */}
        <section id="whylumora" className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="secondary" className="mb-4">
                Why Lumora
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Learning designed to make it stick
              </h2>
              <p className="mt-3 text-muted-foreground">
                We pair world-class instruction with the structure and support
                that beginners actually need to finish.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {FEATURES.map((f) => {
                const Icon = f.icon
                return (
                  <div
                    key={f.title}
                    className="rounded-2xl border bg-card p-6"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 font-semibold">{f.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {f.body}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Instructors */}
        <section id="instructors" className="border-b">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <div className="max-w-xl">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Learn from people who&apos;ve done it
                </h2>
                <p className="mt-3 text-muted-foreground">
                  Our instructors are working practitioners and seasoned mentors
                  invested in your success.
                </p>
              </div>
              <Button variant="outline" className="gap-2">
                Meet all mentors <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {INSTRUCTORS.map((ins) => (
                <Card key={ins.name} className="text-center">
                  <CardHeader className="items-center">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={ins.img} alt="" />
                      <AvatarFallback>{ins.fallback}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="mt-4">{ins.name}</CardTitle>
                    <CardDescription className="text-primary">
                      {ins.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{ins.bio}</p>
                  </CardContent>
                  <CardFooter className="justify-center">
                    <Badge variant="secondary">{ins.tag}</Badge>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <Card className="mt-12 overflow-hidden bg-muted/30">
              <CardContent className="flex flex-col gap-6 p-8 md:flex-row md:items-center">
                <Quote className="h-10 w-10 shrink-0 text-primary" />
                <div>
                  <p className="text-lg font-medium leading-relaxed">
                    &ldquo;I went from zero coding experience to a junior
                    developer role in seven months. The mentors and live cohorts
                    made all the difference.&rdquo;
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="https://i.pravatar.cc/72?img=58" alt="" />
                      <AvatarFallback>JR</AvatarFallback>
                    </Avatar>
                    <div className="text-sm">
                      <div className="font-semibold">Jordan Rivera</div>
                      <div className="text-muted-foreground">
                        Full-Stack Path graduate
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="secondary" className="mb-4">
                Pricing
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Plans for every kind of learner
              </h2>
              <p className="mt-3 text-muted-foreground">
                Start free, upgrade when you&apos;re ready. Cancel anytime.
              </p>
            </div>
            <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-3">
              {PLANS.map((plan) => (
                <Card
                  key={plan.name}
                  className={cn(
                    "relative flex flex-col",
                    plan.highlighted && "border-primary shadow-lg lg:scale-[1.03]"
                  )}
                >
                  {plan.highlighted && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                      Most popular
                    </Badge>
                  )}
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.blurb}</CardDescription>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-sm text-muted-foreground">
                        {plan.cadence}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <Separator className="mb-5" />
                    <ul className="space-y-3">
                      {plan.perks.map((perk) => (
                        <li
                          key={perk}
                          className="flex items-start gap-2.5 text-sm"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <span>{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      variant={plan.highlighted ? "default" : "outline"}
                    >
                      {plan.cta}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-b">
          <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
            <div className="text-center">
              <Badge variant="secondary" className="mb-4">
                FAQ
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Questions, answered
              </h2>
              <p className="mt-3 text-muted-foreground">
                Everything you need to know before you enroll.
              </p>
            </div>
            <Accordion type="single" collapsible className="mt-10 w-full">
              {FAQS.map((faq, i) => (
                <AccordionItem key={faq.q} value={`item-${i}`}>
                  <AccordionTrigger className="text-left text-base">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
            <Card className="overflow-hidden border-primary/20 bg-primary/5">
              <CardContent className="flex flex-col items-center gap-6 p-10 text-center lg:p-16">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                  <GraduationCap className="h-7 w-7" />
                </span>
                <h2 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
                  Your next chapter starts with one lesson
                </h2>
                <p className="max-w-lg text-muted-foreground">
                  Join thousands of learners building real skills with Lumora.
                  Get a free lesson plan in your inbox to begin.
                </p>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
                >
                  <Input
                    type="email"
                    placeholder="you@email.com"
                    aria-label="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-background"
                  />
                  <Button type="submit" size="lg" className="gap-2">
                    Get started
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Check className="h-3.5 w-3.5 text-primary" />
                  No credit card required · Cancel anytime
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <a href="#top" className="flex items-center gap-2 font-semibold">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <GraduationCap className="h-5 w-5" />
                </span>
                Lumora
              </a>
              <p className="mt-4 max-w-xs text-sm text-muted-foreground">
                The online school helping curious people build careers they
                love.
              </p>
            </div>
            {[
              { h: "Learn", links: ["Courses", "Cohorts", "Certificates", "Pricing"] },
              { h: "Company", links: ["About", "Instructors", "Careers", "Blog"] },
              { h: "Support", links: ["Help center", "Community", "Contact", "Status"] },
            ].map((col) => (
              <div key={col.h}>
                <h4 className="text-sm font-semibold">{col.h}</h4>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
            <p>© 2024 Lumora Online School. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="transition-colors hover:text-foreground">
                Privacy
              </a>
              <a href="#" className="transition-colors hover:text-foreground">
                Terms
              </a>
              <a href="#" className="transition-colors hover:text-foreground">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
