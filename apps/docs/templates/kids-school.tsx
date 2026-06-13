"use client"

import * as React from "react"
import {
  GraduationCap,
  Menu,
  ArrowRight,
  Star,
  Heart,
  Users,
  BookOpen,
  Palette,
  Music,
  FlaskConical,
  Calculator,
  Globe2,
  Trophy,
  Sun,
  Bus,
  Apple,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  Clock,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const NAV_LINKS = ["Programs", "Why Us", "Curriculum", "Faculty", "Campus", "Admissions"]

const PROGRAMS = [
  {
    icon: Apple,
    level: "Early Years",
    range: "Pre-K – Kindergarten",
    blurb: "Play-based learning where curiosity leads and little hands explore the world.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: BookOpen,
    level: "Lower School",
    range: "Grades 1 – 5",
    blurb: "Strong foundations in reading, numbers, and friendship in joyful classrooms.",
    color: "bg-accent text-foreground",
  },
  {
    icon: FlaskConical,
    level: "Middle School",
    range: "Grades 6 – 8",
    blurb: "Hands-on science, creative projects, and clubs that spark new passions.",
    color: "bg-secondary text-secondary-foreground",
  },
  {
    icon: GraduationCap,
    level: "Upper School",
    range: "Grades 9 – 12",
    blurb: "College-ready academics, leadership, and a path to dream universities.",
    color: "bg-primary/10 text-primary",
  },
]

const STATS = [
  { n: "1:9", l: "Teacher to student ratio" },
  { n: "98%", l: "College acceptance rate" },
  { n: "40+", l: "Clubs & activities" },
  { n: "25", l: "Acre green campus" },
]

const CURRICULUM = {
  "Lower School": {
    tagline: "Grades 1 – 5 · Building blocks for curious minds",
    subjects: [
      { icon: BookOpen, name: "Literacy & Reading", text: "Phonics, story time, and the joy of first chapter books." },
      { icon: Calculator, name: "Foundational Math", text: "Numbers, patterns, and problem solving through play." },
      { icon: Palette, name: "Art & Making", text: "Painting, clay, and craft to grow creative confidence." },
      { icon: Music, name: "Music & Movement", text: "Singing, rhythm, and the basics of their first instrument." },
    ],
  },
  "Middle School": {
    tagline: "Grades 6 – 8 · Exploring ideas and finding their spark",
    subjects: [
      { icon: FlaskConical, name: "Hands-on Science", text: "Lab experiments, ecology, and weekly discovery projects." },
      { icon: Calculator, name: "Pre-Algebra & Logic", text: "Reasoning, equations, and real-world math puzzles." },
      { icon: Globe2, name: "World Cultures", text: "History, geography, and stories from across the globe." },
      { icon: Palette, name: "Studio Electives", text: "Drama, digital art, and design clubs to choose from." },
    ],
  },
  "Upper School": {
    tagline: "Grades 9 – 12 · College-ready and future-bound",
    subjects: [
      { icon: FlaskConical, name: "Advanced Sciences", text: "Biology, chemistry, and physics with honors pathways." },
      { icon: Calculator, name: "Calculus & Statistics", text: "Rigorous math that opens doors to STEM careers." },
      { icon: Globe2, name: "Humanities & Debate", text: "Literature, civics, and the art of persuasive writing." },
      { icon: GraduationCap, name: "College Counseling", text: "1:1 guidance for applications, essays, and scholarships." },
    ],
  },
}

const GRADES = Object.keys(CURRICULUM) as Array<keyof typeof CURRICULUM>

const WHY_US = [
  { icon: Heart, title: "Whole-child care", text: "We nurture kindness and well-being, not just grades." },
  { icon: Users, title: "Small classes", text: "Every child is known, seen, and supported by name." },
  { icon: Trophy, title: "Proven results", text: "Graduates thrive at top colleges and beyond." },
  { icon: Sun, title: "Joyful campus", text: "Gardens, art studios, and a sunny field to run free." },
]

const FACULTY = [
  { name: "Ms. Eleanor Hart", role: "Head of School", subject: "20 years in education", initials: "EH" },
  { name: "Mr. David Osei", role: "Science Lead", subject: "Award-winning STEM mentor", initials: "DO" },
  { name: "Ms. Lena Park", role: "Arts Director", subject: "Painter & ceramicist", initials: "LP" },
  { name: "Mr. Carlos Rivera", role: "College Counselor", subject: "Guides every senior", initials: "CR" },
]

const CAMPUS = [
  { icon: BookOpen, label: "Library & Reading Nooks" },
  { icon: FlaskConical, label: "Discovery Science Labs" },
  { icon: Palette, label: "Art & Maker Studios" },
  { icon: Music, label: "Music & Theater Hall" },
  { icon: Sun, label: "Gardens & Play Fields" },
  { icon: Bus, label: "Safe Daily Bus Routes" },
]

const TESTIMONIALS = [
  {
    quote: "The teachers know my daughter so well. She runs into school every morning, and that says everything.",
    name: "Maya Thompson",
    role: "Parent of a 3rd grader",
    initials: "MT",
  },
  {
    quote: "Small classes meant our son finally got the attention he needed. His confidence has soared this year.",
    name: "Raj Patel",
    role: "Parent of a 7th grader",
    initials: "RP",
  },
  {
    quote: "The college counseling was incredible. Our daughter got into her first-choice university with a scholarship.",
    name: "Grace Kim",
    role: "Parent of a senior",
    initials: "GK",
  },
]

export default function KidsSchoolTemplate() {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [grade, setGrade] = React.useState<keyof typeof CURRICULUM>("Lower School")
  const active = CURRICULUM[grade]

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="#top" className="flex items-center gap-2 font-bold">
            <span className="flex size-9 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <GraduationCap className="size-5" />
            </span>
            <span className="text-lg">Sunnybrook Academy</span>
          </a>
          <div className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={"#" + link.toLowerCase().replace(/\s+/g, "-")}
                className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {link}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Button className="hidden rounded-full sm:inline-flex">Apply now</Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <Menu className="size-5" />
            </Button>
          </div>
        </nav>
        {menuOpen && (
          <div className="border-t px-4 py-2 lg:hidden">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={"#" + link.toLowerCase().replace(/\s+/g, "-")}
                className="block rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted"
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </a>
            ))}
          </div>
        )}
      </header>

      <main id="top" className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-accent/40">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
            <div>
              <Badge variant="secondary" className="rounded-full">
                <Sparkles className="mr-1 size-3" /> Now enrolling for Fall 2026
              </Badge>
              <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Where every child{" "}
                <span className="text-primary">loves to learn</span>
              </h1>
              <p className="mt-4 max-w-md text-lg text-muted-foreground">
                A warm, welcoming K–12 school where small classes, big hearts, and joyful
                discovery help kids grow into confident, kind people.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button size="lg" className="rounded-full">
                  Apply now <ArrowRight className="ml-1 size-4" />
                </Button>
                <Button size="lg" variant="outline" className="rounded-full">
                  Book a campus tour
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex -space-x-3">
                  {["A", "B", "C", "D"].map((l) => (
                    <span
                      key={l}
                      className="flex size-9 items-center justify-center rounded-full border-2 border-background bg-primary/10 text-sm font-semibold text-primary"
                    >
                      {l}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="size-4 fill-primary text-primary" />
                  <span className="font-semibold">4.9</span>
                  <span className="text-muted-foreground">loved by 1,800+ families</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <Card className="rotate-1 border-2 shadow-sm">
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: Palette, l: "Art Studio" },
                      { icon: FlaskConical, l: "Science Lab" },
                      { icon: Music, l: "Music Room" },
                      { icon: BookOpen, l: "Library" },
                    ].map((tile) => (
                      <div
                        key={tile.l}
                        className="flex flex-col items-center gap-2 rounded-2xl bg-muted p-5 text-center"
                      >
                        <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <tile.icon className="size-5" />
                        </span>
                        <span className="text-sm font-semibold">{tile.l}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="absolute -bottom-6 -left-4 -rotate-3 border-2 shadow-sm">
                <CardContent className="flex items-center gap-3 p-4">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Heart className="size-5" />
                  </span>
                  <div className="text-sm">
                    <p className="font-semibold">Happy kids</p>
                    <p className="text-muted-foreground">Every single day</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Programs */}
        <section id="programs" className="border-t">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="outline" className="rounded-full">Programs by grade level</Badge>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                A loving home for every age
              </h2>
              <p className="mt-3 text-muted-foreground">
                From first finger-paintings to graduation caps, we grow with your child at every stage.
              </p>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {PROGRAMS.map((p) => (
                <Card key={p.level} className="flex flex-col border-2 transition-transform hover:-translate-y-1">
                  <CardContent className="flex flex-1 flex-col p-6">
                    <span className={cn("flex size-12 items-center justify-center rounded-2xl", p.color)}>
                      <p.icon className="size-6" />
                    </span>
                    <h3 className="mt-5 text-lg font-bold">{p.level}</h3>
                    <p className="mt-1 text-sm font-semibold text-primary">{p.range}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{p.blurb}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why us stats band */}
        <section id="why-us" className="border-t bg-primary text-primary-foreground">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <Badge variant="secondary" className="rounded-full">Why families choose us</Badge>
                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  Big enough to inspire, small enough to care
                </h2>
                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  {WHY_US.map((w) => (
                    <div key={w.title} className="flex gap-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-foreground/15">
                        <w.icon className="size-5" />
                      </span>
                      <div>
                        <h3 className="font-semibold">{w.title}</h3>
                        <p className="mt-1 text-sm text-primary-foreground/80">{w.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {STATS.map((s) => (
                  <div
                    key={s.l}
                    className="rounded-2xl bg-primary-foreground/10 p-6 text-center ring-1 ring-primary-foreground/15"
                  >
                    <p className="text-4xl font-extrabold">{s.n}</p>
                    <p className="mt-1 text-sm text-primary-foreground/80">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Curriculum with interactive grade selector */}
        <section id="curriculum" className="border-t bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="outline" className="rounded-full">What they learn</Badge>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Pick a grade, peek at the day
              </h2>
              <p className="mt-3 text-muted-foreground">
                Our curriculum grows with your child. Choose a level to see what a week of learning looks like.
              </p>
            </div>
            <Tabs
              value={grade}
              onValueChange={(v) => setGrade(v as keyof typeof CURRICULUM)}
              className="mt-10"
            >
              <TabsList className="mx-auto flex h-auto w-fit max-w-full flex-wrap justify-center rounded-full p-1">
                {GRADES.map((g) => (
                  <TabsTrigger key={g} value={g} className="rounded-full px-4 py-1.5">
                    {g}
                  </TabsTrigger>
                ))}
              </TabsList>
              {GRADES.map((g) => (
                <TabsContent key={g} value={g} className="mt-8">
                  <p className="text-center text-sm font-semibold text-primary">
                    {CURRICULUM[g].tagline}
                  </p>
                  <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {CURRICULUM[g].subjects.map((s) => (
                      <Card key={s.name} className="border-2">
                        <CardContent className="p-6">
                          <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                            <s.icon className="size-5" />
                          </span>
                          <h3 className="mt-4 font-bold">{s.name}</h3>
                          <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
            <p className="mt-8 text-center text-sm text-muted-foreground">
              Now viewing the <span className="font-semibold text-foreground">{grade}</span> curriculum.
              {" "}
              <a href="#admissions" className="font-semibold text-primary hover:underline">
                Request a full syllabus
              </a>
            </p>
          </div>
        </section>

        {/* Faculty */}
        <section id="faculty" className="border-t">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="outline" className="rounded-full">Meet our team</Badge>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Teachers who truly know your child
              </h2>
              <p className="mt-3 text-muted-foreground">
                Caring, credentialed educators who lead with patience and warmth.
              </p>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {FACULTY.map((f) => (
                <Card key={f.name} className="border-2 text-center">
                  <CardContent className="flex flex-col items-center p-6">
                    <Avatar className="size-16">
                      <AvatarFallback className="bg-primary/10 text-lg font-semibold text-primary">
                        {f.initials}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="mt-4 font-bold">{f.name}</h3>
                    <p className="mt-1 text-sm font-semibold text-primary">{f.role}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{f.subject}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Campus life gallery */}
        <section id="campus" className="border-t bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="outline" className="rounded-full">Campus life</Badge>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                A place built for play and wonder
              </h2>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {CAMPUS.map((c, i) => (
                <div
                  key={c.label}
                  className={cn(
                    "flex items-center gap-4 rounded-3xl border-2 p-6 transition-colors hover:bg-accent/40",
                    i % 2 === 0 ? "bg-card" : "bg-accent/30"
                  )}
                >
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <c.icon className="size-6" />
                  </span>
                  <span className="font-semibold">{c.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="border-t">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="outline" className="rounded-full">Parent voices</Badge>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Families feel the difference
              </h2>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <Card key={t.name} className="border-2">
                  <CardContent className="flex h-full flex-col p-6">
                    <div className="flex gap-0.5">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <Star key={i} className="size-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="mt-4 flex-1 text-sm leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                    <div className="mt-5 flex items-center gap-3">
                      <Avatar className="size-10">
                        <AvatarFallback className="bg-accent font-semibold">
                          {t.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-sm">
                        <p className="font-semibold">{t.name}</p>
                        <p className="text-muted-foreground">{t.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Admissions CTA */}
        <section id="admissions" className="border-t bg-accent/40">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-20">
            <div>
              <Badge variant="secondary" className="rounded-full">
                <Clock className="mr-1 size-3" /> Fall 2026 applications open
              </Badge>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Begin your family&apos;s journey
              </h2>
              <p className="mt-3 max-w-md text-muted-foreground">
                Tell us a little about your child and we&apos;ll be in touch to schedule a visit.
                No pressure, just a warm welcome.
              </p>
              <ul className="mt-6 space-y-2 text-sm">
                {["Personal campus tour", "Meet your child's future teachers", "Rolling admissions, apply any time"].map((b) => (
                  <li key={b} className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-primary" /> {b}
                  </li>
                ))}
              </ul>
              <div className="mt-8 grid gap-3 text-sm sm:grid-cols-3">
                <div className="flex items-center gap-2">
                  <MapPin className="size-4 text-primary" /> 12 Maple Lane
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="size-4 text-primary" /> (555) 014-8800
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="size-4 text-primary" /> hello@sunnybrook.edu
                </div>
              </div>
            </div>
            <Card className="border-2 shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold">Request information</h3>
                <form className="mt-5 space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="parent">Parent name</Label>
                      <Input id="parent" placeholder="Alex Johnson" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" placeholder="(555) 000-0000" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="alex@email.com" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Interested grade level</Label>
                    <div className="flex flex-wrap gap-2">
                      {["Early Years", ...GRADES].map((g) => (
                        <Button
                          key={g}
                          type="button"
                          size="sm"
                          variant={grade === g ? "default" : "outline"}
                          className="rounded-full"
                          onClick={() => {
                            if (g !== "Early Years") setGrade(g as keyof typeof CURRICULUM)
                          }}
                        >
                          {g}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <Button type="submit" className="w-full rounded-full" size="lg">
                    Start application <ArrowRight className="ml-1 size-4" />
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    We&apos;ll never share your details. A real person will reply within 2 days.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <a href="#top" className="flex items-center gap-2 font-bold">
              <span className="flex size-9 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <GraduationCap className="size-5" />
              </span>
              <span className="text-lg">Sunnybrook Academy</span>
            </a>
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href={"#" + link.toLowerCase().replace(/\s+/g, "-")}
                  className="hover:text-foreground"
                >
                  {link}
                </a>
              ))}
              <a href="#top" className="hover:text-foreground">Contact</a>
            </nav>
          </div>
          <Separator className="my-6" />
          <p className="text-center text-xs text-muted-foreground">
            &copy; 2026 Sunnybrook Academy. A joyful K–12 school where every child belongs.
          </p>
        </div>
      </footer>
    </div>
  )
}
