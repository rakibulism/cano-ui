"use client"
import * as React from "react"
import {
  GraduationCap,
  LayoutGrid,
  BookOpen,
  BarChart3,
  Award,
  Search,
  Bell,
  Flame,
  Clock,
  PlayCircle,
  CheckCircle2,
  Star,
  Users,
  Download,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

type Section = "courses" | "catalog" | "progress" | "certificates"

const NAV: { id: Section; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "courses", label: "My courses", icon: LayoutGrid },
  { id: "catalog", label: "Catalog", icon: BookOpen },
  { id: "progress", label: "Progress", icon: BarChart3 },
  { id: "certificates", label: "Certificates", icon: Award },
]

const CATEGORIES = ["All", "Design", "Development", "Data", "Marketing", "Business"]

type Course = {
  id: string
  title: string
  category: string
  instructor: string
  lessons: number
  done: number
  rating: number
  hours: number
  accent: string
}

const MY_COURSES: Course[] = [
  { id: "c1", title: "Design Systems Foundations", category: "Design", instructor: "Mara Lindqvist", lessons: 24, done: 18, rating: 4.9, hours: 9, accent: "bg-primary" },
  { id: "c2", title: "Modern React Patterns", category: "Development", instructor: "Devon Park", lessons: 32, done: 12, rating: 4.8, hours: 14, accent: "bg-accent" },
  { id: "c3", title: "Practical Data Storytelling", category: "Data", instructor: "Aisha Rahman", lessons: 18, done: 18, rating: 5.0, hours: 7, accent: "bg-secondary" },
  { id: "c4", title: "Growth Marketing Lab", category: "Marketing", instructor: "Leo Fernández", lessons: 20, done: 4, rating: 4.6, hours: 8, accent: "bg-muted" },
]

const CATALOG: Course[] = [
  { id: "k1", title: "Typography for Interfaces", category: "Design", instructor: "Mara Lindqvist", lessons: 16, done: 0, rating: 4.9, hours: 6, accent: "bg-primary" },
  { id: "k2", title: "TypeScript at Scale", category: "Development", instructor: "Devon Park", lessons: 28, done: 0, rating: 4.7, hours: 12, accent: "bg-accent" },
  { id: "k3", title: "SQL for Analysts", category: "Data", instructor: "Aisha Rahman", lessons: 22, done: 0, rating: 4.8, hours: 10, accent: "bg-secondary" },
  { id: "k4", title: "Brand Strategy Essentials", category: "Business", instructor: "Priya Nair", lessons: 14, done: 0, rating: 4.5, hours: 5, accent: "bg-muted" },
  { id: "k5", title: "Lifecycle Email Marketing", category: "Marketing", instructor: "Leo Fernández", lessons: 19, done: 0, rating: 4.6, hours: 7, accent: "bg-primary" },
  { id: "k6", title: "Product Discovery Sprints", category: "Business", instructor: "Priya Nair", lessons: 12, done: 0, rating: 4.7, hours: 4, accent: "bg-accent" },
]

const LESSONS = [
  { id: "l1", title: "Why design tokens matter", min: 12, done: true },
  { id: "l2", title: "Color, scale and contrast", min: 18, done: true },
  { id: "l3", title: "Building a spacing system", min: 15, done: true },
  { id: "l4", title: "Component anatomy", min: 22, done: false },
  { id: "l5", title: "Documenting variants", min: 16, done: false },
  { id: "l6", title: "Shipping a starter kit", min: 25, done: false },
]

const CERTS = [
  { id: "z1", title: "Practical Data Storytelling", issued: "Mar 2026", id_no: "CN-8842-DS" },
  { id: "z2", title: "UX Writing Fundamentals", issued: "Jan 2026", id_no: "CN-7310-UX" },
]

export default function LmsPlatform() {
  const [section, setSection] = React.useState<Section>("courses")
  const [category, setCategory] = React.useState("All")
  const [enrolled, setEnrolled] = React.useState<string[]>([])
  const [lessons, setLessons] = React.useState(LESSONS)

  const toggleLesson = (id: string) =>
    setLessons((prev) => prev.map((l) => (l.id === id ? { ...l, done: !l.done } : l)))

  const doneCount = lessons.filter((l) => l.done).length
  const pct = Math.round((doneCount / lessons.length) * 100)

  const filteredCatalog = CATALOG.filter((c) => category === "All" || c.category === category)

  const sectionTitle =
    section === "courses" ? "My courses" : section === "catalog" ? "Catalog" : section === "progress" ? "My progress" : "Certificates"

  return (
    <div className="flex min-h-full bg-background text-foreground">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r bg-card lg:flex">
        <div className="flex h-16 items-center gap-2 border-b px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="text-base font-semibold tracking-tight">Lumen Learn</span>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-4">
          {NAV.map((item) => {
            const Icon = item.icon
            const active = section === item.id
            return (
              <button
                key={item.id}
                onClick={() => setSection(item.id)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            )
          })}
        </nav>
        <div className="m-4 rounded-xl border bg-muted/30 p-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Flame className="h-4 w-4 text-primary" /> 12-day streak
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Keep it going. Learn 15 minutes today.</p>
          <Progress value={64} className="mt-3 h-2" />
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur sm:px-6">
          <div className="lg:hidden flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <GraduationCap className="h-4 w-4" />
            </div>
          </div>
          <div className="relative hidden flex-1 max-w-md sm:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search courses, lessons, instructors" className="pl-9" />
          </div>
          <div className="ml-auto flex items-center gap-3">
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar className="h-9 w-9">
              <AvatarImage src="" alt="" />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="flex-1 space-y-8 p-4 sm:p-6 lg:p-8">
          {/* Mobile section switcher */}
          <div className="flex flex-wrap gap-2 lg:hidden">
            {NAV.map((item) => (
              <button
                key={item.id}
                onClick={() => setSection(item.id)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                  section === item.id ? "border-primary bg-primary/10 text-primary" : "text-muted-foreground"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{sectionTitle}</h1>
            <p className="mt-1 text-sm text-muted-foreground">Welcome back, Jordan. Pick up where you left off.</p>
          </div>

          {/* MY COURSES */}
          {section === "courses" && (
            <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {MY_COURSES.map((c) => {
                const p = Math.round((c.done / c.lessons) * 100)
                const complete = c.done === c.lessons
                return (
                  <Card key={c.id} className="overflow-hidden">
                    <div className={cn("h-24 w-full", c.accent, "opacity-90")} aria-hidden="true" />
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">{c.category}</Badge>
                        {complete && (
                          <span className="flex items-center gap-1 text-xs font-medium text-primary">
                            <CheckCircle2 className="h-3.5 w-3.5" /> Completed
                          </span>
                        )}
                      </div>
                      <CardTitle className="mt-2 text-base">{c.title}</CardTitle>
                      <CardDescription>{c.instructor}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{c.done}/{c.lessons} lessons</span>
                        <span>{p}%</span>
                      </div>
                      <Progress value={p} className="h-2" />
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" variant={complete ? "outline" : "default"}>
                        <PlayCircle className="h-4 w-4" />
                        {complete ? "Review" : "Continue"}
                      </Button>
                    </CardFooter>
                  </Card>
                )
              })}
            </section>
          )}

          {/* CATALOG */}
          {section === "catalog" && (
            <section className="space-y-6">
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                      category === cat
                        ? "border-primary bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filteredCatalog.map((c) => {
                  const isEnrolled = enrolled.includes(c.id)
                  return (
                    <Card key={c.id} className="flex flex-col">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">{c.category}</Badge>
                          <span className="flex items-center gap-1 text-xs font-medium">
                            <Star className="h-3.5 w-3.5 fill-current text-primary" /> {c.rating.toFixed(1)}
                          </span>
                        </div>
                        <CardTitle className="mt-2 text-base">{c.title}</CardTitle>
                        <CardDescription>{c.instructor}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <BookOpen className="h-3.5 w-3.5" /> {c.lessons} lessons
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" /> {c.hours}h
                          </span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button
                          className="w-full"
                          variant={isEnrolled ? "secondary" : "default"}
                          onClick={() =>
                            setEnrolled((prev) =>
                              isEnrolled ? prev.filter((x) => x !== c.id) : [...prev, c.id]
                            )
                          }
                        >
                          {isEnrolled ? (
                            <>
                              <CheckCircle2 className="h-4 w-4" /> Enrolled
                            </>
                          ) : (
                            "Enroll"
                          )}
                        </Button>
                      </CardFooter>
                    </Card>
                  )
                })}
              </div>
            </section>
          )}

          {/* PROGRESS */}
          {section === "progress" && (
            <section className="grid gap-6 lg:grid-cols-3">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-base">Design Systems Foundations</CardTitle>
                  <CardDescription>
                    {doneCount} of {lessons.length} lessons complete · {pct}%
                  </CardDescription>
                  <Progress value={pct} className="mt-3 h-2" />
                </CardHeader>
                <CardContent className="space-y-1">
                  {lessons.map((l) => (
                    <button
                      key={l.id}
                      onClick={() => toggleLesson(l.id)}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-muted"
                    >
                      <span
                        className={cn(
                          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
                          l.done ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/40"
                        )}
                      >
                        {l.done && <CheckCircle2 className="h-4 w-4" />}
                      </span>
                      <span className={cn("flex-1 text-sm", l.done && "text-muted-foreground line-through")}>
                        {l.title}
                      </span>
                      <span className="text-xs text-muted-foreground">{l.min} min</span>
                    </button>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button className="w-full sm:w-auto">
                    <PlayCircle className="h-4 w-4" /> Resume next lesson
                  </Button>
                </CardFooter>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">This week</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" /> Learning time
                      </span>
                      <span className="text-sm font-semibold">3h 40m</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4" /> Lessons done
                      </span>
                      <span className="text-sm font-semibold">{doneCount}</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Flame className="h-4 w-4" /> Current streak
                      </span>
                      <span className="text-sm font-semibold">12 days</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Cohort</CardTitle>
                    <CardDescription>You are ahead of 78% of learners</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" /> 1,284 active learners
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          )}

          {/* CERTIFICATES */}
          {section === "certificates" && (
            <section className="grid gap-5 sm:grid-cols-2">
              {CERTS.map((z) => (
                <Card key={z.id} className="border-primary/30">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Award className="h-5 w-5" />
                      </div>
                      <Badge variant="secondary">Verified</Badge>
                    </div>
                    <CardTitle className="mt-3 text-base">{z.title}</CardTitle>
                    <CardDescription>Issued {z.issued} · ID {z.id_no}</CardDescription>
                  </CardHeader>
                  <CardFooter className="gap-3">
                    <Button variant="outline" className="flex-1">
                      <Download className="h-4 w-4" /> Download
                    </Button>
                    <Button variant="ghost" className="flex-1">
                      Share <ChevronRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              <Card className="flex items-center justify-center border-dashed bg-muted/30">
                <CardContent className="py-10 text-center">
                  <BookOpen className="mx-auto h-6 w-6 text-muted-foreground" />
                  <p className="mt-3 text-sm font-medium">Finish a course to earn your next certificate</p>
                  <Button variant="link" className="mt-1" onClick={() => setSection("catalog")}>
                    Browse catalog
                  </Button>
                </CardContent>
              </Card>
            </section>
          )}
        </main>
      </div>
    </div>
  )
}
