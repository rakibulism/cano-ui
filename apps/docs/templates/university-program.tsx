"use client"

import * as React from "react"
import {
  GraduationCap,
  ArrowRight,
  Award,
  Users,
  Clock,
  Globe,
  CheckCircle2,
  FileText,
  CalendarDays,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  BookOpen,
  Building2,
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
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/registry/ui/accordion"

const NAV = [
  { label: "Overview", href: "#overview" },
  { label: "Curriculum", href: "#curriculum" },
  { label: "Faculty", href: "#faculty" },
  { label: "Admissions", href: "#admissions" },
  { label: "Tuition", href: "#tuition" },
  { label: "FAQ", href: "#faq" },
]

const STATS = [
  { icon: Clock, value: "4 years", label: "Full-time program" },
  { icon: Award, value: "96%", label: "Graduate employment" },
  { icon: Users, value: "12:1", label: "Student-faculty ratio" },
  { icon: Globe, value: "40+", label: "Partner universities" },
]

const HIGHLIGHTS = [
  {
    icon: BookOpen,
    title: "Research-led teaching",
    body: "Learn from active researchers across AI, systems, and human-computer interaction.",
  },
  {
    icon: Building2,
    title: "Industry placement year",
    body: "Spend your third year on a paid placement with leading technology employers.",
  },
  {
    icon: Globe,
    title: "Study abroad options",
    body: "Exchange semesters at 40+ partner institutions across four continents.",
  },
]

const CURRICULUM = [
  {
    year: "Year 1 — Foundations",
    credits: "120 credits",
    courses: [
      "Programming Fundamentals",
      "Discrete Mathematics",
      "Computer Systems & Architecture",
      "Academic & Professional Skills",
    ],
  },
  {
    year: "Year 2 — Core Engineering",
    credits: "120 credits",
    courses: [
      "Algorithms & Data Structures",
      "Databases & Information Systems",
      "Software Engineering",
      "Networks & Operating Systems",
    ],
  },
  {
    year: "Year 3 — Placement Year",
    credits: "Industry experience",
    courses: [
      "Paid 12-month industry placement",
      "Reflective practice portfolio",
      "Career mentorship programme",
    ],
  },
  {
    year: "Year 4 — Specialisation",
    credits: "120 credits",
    courses: [
      "Machine Learning & AI",
      "Distributed Systems",
      "Capstone Research Project",
      "Two elective specialisms",
    ],
  },
]

const FACULTY = [
  {
    name: "Dr. Amara Okafor",
    role: "Programme Director · AI & Machine Learning",
    img: "https://i.pravatar.cc/160?img=47",
    initials: "AO",
  },
  {
    name: "Prof. Daniel Reyes",
    role: "Distributed Systems & Cloud Computing",
    img: "https://i.pravatar.cc/160?img=12",
    initials: "DR",
  },
  {
    name: "Dr. Mei-Lin Zhao",
    role: "Human-Computer Interaction",
    img: "https://i.pravatar.cc/160?img=32",
    initials: "MZ",
  },
  {
    name: "Dr. Samuel Hart",
    role: "Cybersecurity & Cryptography",
    img: "https://i.pravatar.cc/160?img=15",
    initials: "SH",
  },
]

const ADMISSION_STEPS = [
  {
    step: "01",
    title: "Submit your application",
    body: "Apply online with your academic transcripts and a personal statement.",
  },
  {
    step: "02",
    title: "Application review",
    body: "Our admissions panel reviews your achievements, references, and statement.",
  },
  {
    step: "03",
    title: "Interview & offer",
    body: "Shortlisted candidates are invited to an interview, followed by a decision.",
  },
  {
    step: "04",
    title: "Enrol & begin",
    body: "Accept your offer, complete enrolment, and join welcome week in September.",
  },
]

const TUITION = [
  {
    name: "Home / Domestic",
    price: "$9,250",
    per: "per year",
    features: [
      "Full access to all core modules",
      "Placement year support",
      "Library & lab access",
      "Career services",
    ],
    featured: false,
  },
  {
    name: "International",
    price: "$24,500",
    per: "per year",
    features: [
      "Everything in Domestic",
      "Dedicated international advisor",
      "Visa & relocation guidance",
      "Airport pickup & orientation",
    ],
    featured: true,
  },
  {
    name: "Scholarship track",
    price: "Up to 50% off",
    per: "merit-based",
    features: [
      "Awarded on academic merit",
      "Renewable each year",
      "Research stipend eligibility",
      "Mentorship from faculty",
    ],
    featured: false,
  },
]

const FAQ = [
  {
    q: "What are the entry requirements?",
    a: "We require strong grades in mathematics and a science or computing subject. Equivalent international qualifications and foundation pathways are also accepted.",
  },
  {
    q: "Is the placement year guaranteed?",
    a: "While placements are competitive, our dedicated careers team supports every student with applications, mock interviews, and employer connections. Over 90% of students secure a placement.",
  },
  {
    q: "Can I apply without prior coding experience?",
    a: "Yes. Year 1 is designed to bring all students up to a common foundation, regardless of previous programming background.",
  },
  {
    q: "What financial support is available?",
    a: "We offer merit scholarships, need-based bursaries, and paid placement income. Our finance office can help you build a personalised funding plan.",
  },
]

export default function UniversityProgramPage() {
  const [email, setEmail] = React.useState("")

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#overview" className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <GraduationCap className="size-5" />
            </span>
            <span className="text-sm font-semibold leading-tight">
              Westbrook University
              <span className="block text-xs font-normal text-muted-foreground">
                School of Computing
              </span>
            </span>
          </a>
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              Prospectus
            </Button>
            <Button size="sm">
              Apply now
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section
          id="overview"
          className="border-b bg-muted/30"
        >
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-24">
            <div className="space-y-6">
              <Badge variant="secondary" className="gap-1.5">
                <Sparkles className="size-3.5" />
                BSc (Hons) · Now accepting 2026 entry
              </Badge>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Computer Science with Industry Placement
              </h1>
              <p className="max-w-xl text-lg text-muted-foreground">
                Build the technical depth and real-world experience to launch a
                career in technology. A four-year programme combining rigorous
                fundamentals, a paid placement year, and advanced specialisation.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="lg">
                  Start your application
                  <ArrowRight className="size-4" />
                </Button>
                <Button size="lg" variant="outline">
                  <FileText className="size-4" />
                  Download prospectus
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="size-4" />
                  Starts September 2026
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-4" />
                  Main Campus, Westbrook
                </span>
              </div>
            </div>

            <Card className="border-primary/20 lg:ml-auto lg:max-w-md">
              <CardHeader>
                <CardTitle>Request more information</CardTitle>
                <CardDescription>
                  Get the full course guide and key dates sent to your inbox.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="grid gap-1.5">
                    <Label htmlFor="fname">First name</Label>
                    <Input id="fname" placeholder="Jordan" />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="lname">Last name</Label>
                    <Input id="lname" placeholder="Lee" />
                  </div>
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="jordan@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex-col items-stretch gap-2">
                <Button className="w-full">Send me the guide</Button>
                <p className="text-center text-xs text-muted-foreground">
                  No spam. Unsubscribe anytime.
                </p>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-px overflow-hidden px-4 py-12 sm:px-6 lg:grid-cols-4">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-2 px-4 py-4 text-center"
              >
                <stat.icon className="size-6 text-primary" />
                <div className="text-3xl font-semibold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Highlights */}
        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <div className="mb-10 max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight">
              Why study this programme
            </h2>
            <p className="mt-3 text-muted-foreground">
              Designed with employers and built on world-class research, the
              programme balances theory, practice, and global opportunity.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {HIGHLIGHTS.map((h) => (
              <Card key={h.title}>
                <CardHeader>
                  <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <h.icon className="size-5" />
                  </span>
                  <CardTitle className="pt-3">{h.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{h.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Curriculum */}
        <section id="curriculum" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
            <div className="mb-10 max-w-2xl">
              <Badge variant="outline" className="mb-3">
                Curriculum
              </Badge>
              <h2 className="text-3xl font-semibold tracking-tight">
                What you will study, year by year
              </h2>
              <p className="mt-3 text-muted-foreground">
                Each year builds on the last, from core foundations to your own
                research specialisation.
              </p>
            </div>
            <div className="mx-auto max-w-3xl rounded-xl border bg-card px-6">
              <Accordion type="single" collapsible defaultValue="item-0">
                {CURRICULUM.map((c, i) => (
                  <AccordionItem key={c.year} value={`item-${i}`}>
                    <AccordionTrigger>
                      <span className="flex flex-1 items-center justify-between gap-4 pr-2">
                        <span className="text-base">{c.year}</span>
                        <Badge variant="secondary" className="shrink-0">
                          {c.credits}
                        </Badge>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="grid gap-2 sm:grid-cols-2">
                        {c.courses.map((course) => (
                          <li
                            key={course}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                            {course}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Faculty */}
        <section id="faculty" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <div className="mb-10 max-w-2xl">
            <Badge variant="outline" className="mb-3">
              Faculty
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight">
              Learn from leaders in their field
            </h2>
            <p className="mt-3 text-muted-foreground">
              Our teaching staff are active researchers and industry advisors.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FACULTY.map((f) => (
              <Card key={f.name} className="text-center">
                <CardContent className="flex flex-col items-center gap-3 pt-6">
                  <Avatar className="size-20">
                    <AvatarImage src={f.img} alt="" />
                    <AvatarFallback>{f.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{f.name}</div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      {f.role}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Admissions */}
        <section id="admissions" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
            <div className="mb-10 max-w-2xl">
              <Badge variant="outline" className="mb-3">
                Admissions
              </Badge>
              <h2 className="text-3xl font-semibold tracking-tight">
                Four steps to your place
              </h2>
              <p className="mt-3 text-muted-foreground">
                A clear, supportive process from first application to welcome week.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {ADMISSION_STEPS.map((s) => (
                <div
                  key={s.step}
                  className="relative rounded-xl border bg-card p-6"
                >
                  <span className="text-3xl font-semibold text-primary/30">
                    {s.step}
                  </span>
                  <h3 className="mt-3 font-medium">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-xl border bg-primary/10 p-6">
              <div>
                <div className="font-medium">
                  Applications for 2026 entry close 15 January
                </div>
                <p className="text-sm text-muted-foreground">
                  Late applications considered subject to availability.
                </p>
              </div>
              <Button>
                Begin application
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Tuition */}
        <section id="tuition" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <div className="mb-10 max-w-2xl">
            <Badge variant="outline" className="mb-3">
              Tuition & fees
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight">
              Transparent fees, real support
            </h2>
            <p className="mt-3 text-muted-foreground">
              Annual tuition for 2026 entry. Scholarships and bursaries can
              significantly reduce your costs.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {TUITION.map((t) => (
              <Card
                key={t.name}
                className={cn(
                  "flex flex-col",
                  t.featured && "border-primary ring-1 ring-primary"
                )}
              >
                <CardHeader>
                  {t.featured && (
                    <Badge className="mb-2 w-fit">Most common</Badge>
                  )}
                  <CardTitle>{t.name}</CardTitle>
                  <div className="flex items-baseline gap-1.5 pt-2">
                    <span className="text-3xl font-semibold">{t.price}</span>
                    <span className="text-sm text-muted-foreground">
                      {t.per}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <Separator className="mb-4" />
                  <ul className="space-y-3">
                    {t.features.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-start gap-2 text-sm"
                      >
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                        <span className="text-muted-foreground">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={t.featured ? "default" : "outline"}
                  >
                    Learn more
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-t bg-muted/30">
          <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
            <div className="mb-10 text-center">
              <Badge variant="outline" className="mb-3">
                FAQ
              </Badge>
              <h2 className="text-3xl font-semibold tracking-tight">
                Frequently asked questions
              </h2>
            </div>
            <div className="rounded-xl border bg-card px-6">
              <Accordion type="single" collapsible>
                {FAQ.map((item, i) => (
                  <AccordionItem key={item.q} value={`faq-${i}`}>
                    <AccordionTrigger className="text-base">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-muted-foreground">{item.a}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            <div className="mt-8 text-center text-sm text-muted-foreground">
              Still have questions?{" "}
              <a
                href="#overview"
                className="font-medium text-primary hover:underline"
              >
                Contact our admissions team
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <GraduationCap className="size-4" />
                </span>
                <span className="font-semibold">Westbrook University</span>
              </div>
              <p className="text-sm text-muted-foreground">
                School of Computing, shaping the next generation of technologists.
              </p>
            </div>
            <div>
              <div className="mb-3 text-sm font-medium">Programme</div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#curriculum" className="hover:text-foreground">Curriculum</a></li>
                <li><a href="#faculty" className="hover:text-foreground">Faculty</a></li>
                <li><a href="#tuition" className="hover:text-foreground">Tuition</a></li>
                <li><a href="#faq" className="hover:text-foreground">FAQ</a></li>
              </ul>
            </div>
            <div>
              <div className="mb-3 text-sm font-medium">Admissions</div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#admissions" className="hover:text-foreground">How to apply</a></li>
                <li><a href="#admissions" className="hover:text-foreground">Key dates</a></li>
                <li><a href="#tuition" className="hover:text-foreground">Scholarships</a></li>
                <li><a href="#overview" className="hover:text-foreground">Open days</a></li>
              </ul>
            </div>
            <div>
              <div className="mb-3 text-sm font-medium">Contact</div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Mail className="size-4" />
                  admissions@westbrook.edu
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="size-4" />
                  +1 (555) 200-1180
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="size-4" />
                  Main Campus, Westbrook
                </li>
              </ul>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col items-center justify-between gap-3 text-sm text-muted-foreground sm:flex-row">
            <span>© 2026 Westbrook University. All rights reserved.</span>
            <div className="flex gap-4">
              <a href="#overview" className="hover:text-foreground">Privacy</a>
              <a href="#overview" className="hover:text-foreground">Terms</a>
              <a href="#overview" className="hover:text-foreground">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
