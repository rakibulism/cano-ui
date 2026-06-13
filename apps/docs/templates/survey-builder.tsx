"use client"

import * as React from "react"
import {
  CircleDot,
  ListChecks,
  Star,
  SlidersHorizontal,
  AlignLeft,
  ThumbsUp,
  CalendarDays,
  Plus,
  Trash2,
  GripVertical,
  Settings2,
  BarChart3,
  PencilRuler,
  Eye,
  Send,
  Users,
  CheckCircle2,
  Timer,
  ClipboardList,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

type QKind = "single" | "multi" | "rating" | "scale" | "open" | "nps" | "date"

type PaletteItem = {
  kind: QKind
  label: string
  hint: string
  icon: React.ComponentType<{ className?: string }>
  defaultTitle: string
}

type Question = {
  id: number
  kind: QKind
  title: string
  required: boolean
  options: string[]
}

const PALETTE: PaletteItem[] = [
  { kind: "single", label: "Single choice", hint: "Pick one option", icon: CircleDot, defaultTitle: "Choose one option" },
  { kind: "multi", label: "Multiple choice", hint: "Pick several", icon: ListChecks, defaultTitle: "Select all that apply" },
  { kind: "rating", label: "Star rating", hint: "1 to 5 stars", icon: Star, defaultTitle: "How would you rate us?" },
  { kind: "scale", label: "Linear scale", hint: "Slider 0–10", icon: SlidersHorizontal, defaultTitle: "Rate from 0 to 10" },
  { kind: "nps", label: "NPS", hint: "Likelihood to recommend", icon: ThumbsUp, defaultTitle: "How likely are you to recommend us?" },
  { kind: "open", label: "Open text", hint: "Free response", icon: AlignLeft, defaultTitle: "Tell us more" },
  { kind: "date", label: "Date", hint: "Pick a day", icon: CalendarDays, defaultTitle: "When did this happen?" },
]

const KIND_LABEL: Record<QKind, string> = {
  single: "Single choice",
  multi: "Multiple choice",
  rating: "Star rating",
  scale: "Linear scale",
  nps: "NPS",
  open: "Open text",
  date: "Date",
}

const INITIAL: Question[] = [
  {
    id: 1,
    kind: "rating",
    title: "How would you rate your overall experience?",
    required: true,
    options: [],
  },
  {
    id: 2,
    kind: "single",
    title: "Which plan are you currently on?",
    required: true,
    options: ["Starter", "Growth", "Scale", "Enterprise"],
  },
  {
    id: 3,
    kind: "multi",
    title: "Which features do you use most?",
    required: false,
    options: ["Dashboards", "Automations", "Integrations", "Reports"],
  },
  {
    id: 4,
    kind: "open",
    title: "What is the one thing we could improve?",
    required: false,
    options: [],
  },
]

const RESULTS = [
  { label: "Very satisfied", count: 612, pct: 54 },
  { label: "Satisfied", count: 318, pct: 28 },
  { label: "Neutral", count: 124, pct: 11 },
  { label: "Dissatisfied", count: 79, pct: 7 },
]

const FEATURE_USE = [
  { label: "Dashboards", pct: 81 },
  { label: "Automations", pct: 64 },
  { label: "Integrations", pct: 47 },
  { label: "Reports", pct: 38 },
]

function QuestionPreview({ q }: { q: Question }) {
  switch (q.kind) {
    case "single":
      return (
        <div className="space-y-2">
          {q.options.map((o) => (
            <div key={o} className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="h-4 w-4 rounded-full border" />
              {o}
            </div>
          ))}
        </div>
      )
    case "multi":
      return (
        <div className="space-y-2">
          {q.options.map((o) => (
            <div key={o} className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="h-4 w-4 rounded border" />
              {o}
            </div>
          ))}
        </div>
      )
    case "rating":
      return (
        <div className="flex gap-1.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} className="h-6 w-6 text-muted-foreground" />
          ))}
        </div>
      )
    case "scale":
      return (
        <div className="space-y-2">
          <div className="h-1.5 w-full rounded-full bg-muted">
            <div className="h-1.5 w-2/3 rounded-full bg-primary" />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0</span>
            <span>5</span>
            <span>10</span>
          </div>
        </div>
      )
    case "nps":
      return (
        <div className="flex flex-wrap gap-1.5">
          {Array.from({ length: 11 }).map((_, i) => (
            <span
              key={i}
              className="flex h-8 w-8 items-center justify-center rounded-md border text-xs text-muted-foreground"
            >
              {i}
            </span>
          ))}
        </div>
      )
    case "date":
      return (
        <div className="flex h-9 w-44 items-center justify-between rounded-md border bg-background px-3 text-sm text-muted-foreground">
          Select a date
          <CalendarDays className="h-4 w-4" />
        </div>
      )
    default:
      return <div className="h-20 w-full rounded-md border bg-background" />
  }
}

export default function SurveyBuilder() {
  const [questions, setQuestions] = React.useState<Question[]>(INITIAL)
  const [selectedId, setSelectedId] = React.useState<number | null>(1)
  const [surveyTitle, setSurveyTitle] = React.useState("Customer Satisfaction Survey")
  const nextId = React.useRef(5)

  const selected = questions.find((q) => q.id === selectedId) ?? null

  function addQuestion(item: PaletteItem) {
    const id = nextId.current++
    const hasOptions = item.kind === "single" || item.kind === "multi"
    const newQ: Question = {
      id,
      kind: item.kind,
      title: item.defaultTitle,
      required: false,
      options: hasOptions ? ["Option 1", "Option 2", "Option 3"] : [],
    }
    setQuestions((prev) => [...prev, newQ])
    setSelectedId(id)
  }

  function removeQuestion(id: number) {
    setQuestions((prev) => prev.filter((q) => q.id !== id))
    setSelectedId((cur) => (cur === id ? null : cur))
  }

  function updateQuestion(id: number, patch: Partial<Question>) {
    setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, ...patch } : q)))
  }

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur">
        <div className="flex h-16 items-center gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <ClipboardList className="h-4 w-4" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">Pollwise</div>
              <div className="text-xs text-muted-foreground">Survey studio</div>
            </div>
          </div>
          <Badge variant="secondary" className="hidden sm:inline-flex">Draft</Badge>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              <Eye className="mr-1.5 h-4 w-4" /> Preview
            </Button>
            <Button size="sm">
              <Send className="mr-1.5 h-4 w-4" /> Publish
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 py-6 sm:px-6">
        <Tabs defaultValue="build" className="mx-auto w-full max-w-7xl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <TabsList>
              <TabsTrigger value="build">
                <PencilRuler className="mr-1.5 h-4 w-4" /> Build
              </TabsTrigger>
              <TabsTrigger value="results">
                <BarChart3 className="mr-1.5 h-4 w-4" /> Results
                <Badge variant="secondary" className="ml-2">1.1k</Badge>
              </TabsTrigger>
            </TabsList>
            <p className="hidden text-sm text-muted-foreground sm:block">
              {questions.length} question{questions.length === 1 ? "" : "s"} · auto-saved
            </p>
          </div>

          <TabsContent value="build" className="mt-6">
            <div className="grid gap-6 lg:grid-cols-[210px_1fr_290px]">
              <aside className="space-y-3">
                <h2 className="px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Question types
                </h2>
                <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
                  {PALETTE.map((item) => (
                    <button
                      key={item.kind}
                      onClick={() => addQuestion(item)}
                      className="group flex items-center gap-2.5 rounded-lg border bg-card px-3 py-2.5 text-left transition-colors hover:border-primary hover:bg-accent"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <item.icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium">{item.label}</span>
                        <span className="hidden truncate text-xs text-muted-foreground lg:block">
                          {item.hint}
                        </span>
                      </span>
                      <Plus className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                    </button>
                  ))}
                </div>
              </aside>

              <section className="min-w-0">
                <Card>
                  <CardHeader className="border-b">
                    <Input
                      value={surveyTitle}
                      onChange={(e) => setSurveyTitle(e.target.value)}
                      className="h-auto border-0 bg-transparent px-0 text-lg font-semibold shadow-none focus-visible:ring-0"
                      aria-label="Survey title"
                    />
                    <p className="text-sm text-muted-foreground">
                      Help us understand how we are doing. Takes about 2 minutes.
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-3 py-6">
                    {questions.length === 0 && (
                      <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed py-16 text-center">
                        <ClipboardList className="h-6 w-6 text-muted-foreground" />
                        <p className="text-sm font-medium">No questions yet</p>
                        <p className="text-xs text-muted-foreground">
                          Click a question type on the left to add one.
                        </p>
                      </div>
                    )}
                    {questions.map((q, idx) => (
                      <div
                        key={q.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => setSelectedId(q.id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") setSelectedId(q.id)
                        }}
                        className={cn(
                          "group relative rounded-lg border bg-card p-4 transition-colors",
                          selectedId === q.id
                            ? "border-primary ring-1 ring-primary"
                            : "hover:border-primary/40"
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex flex-col items-center gap-1 pt-0.5">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-[11px] font-medium text-muted-foreground">
                              {idx + 1}
                            </span>
                            <GripVertical className="h-4 w-4 cursor-grab text-muted-foreground" />
                          </div>
                          <div className="min-w-0 flex-1 space-y-2.5">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-sm font-medium">{q.title}</span>
                              {q.required && (
                                <span className="text-destructive" aria-label="required">*</span>
                              )}
                              <Badge variant="outline" className="text-[10px]">
                                {KIND_LABEL[q.kind]}
                              </Badge>
                            </div>
                            <QuestionPreview q={q} />
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Remove question"
                            className="h-8 w-8 shrink-0 text-muted-foreground opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100"
                            onClick={(e) => {
                              e.stopPropagation()
                              removeQuestion(q.id)
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </section>

              <aside className="space-y-4">
                <h2 className="px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Question settings
                </h2>
                {selected ? (
                  <Card>
                    <CardContent className="space-y-5 py-5">
                      <div className="flex items-center gap-2 rounded-md bg-muted/30 px-3 py-2 text-sm">
                        <Settings2 className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{KIND_LABEL[selected.kind]}</span>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="q-title">Question</Label>
                        <Textarea
                          id="q-title"
                          rows={2}
                          value={selected.title}
                          onChange={(e) => updateQuestion(selected.id, { title: e.target.value })}
                        />
                      </div>
                      {(selected.kind === "single" || selected.kind === "multi") && (
                        <div className="space-y-2">
                          <Label>Options</Label>
                          <div className="space-y-2">
                            {selected.options.map((opt, i) => (
                              <Input
                                key={i}
                                value={opt}
                                aria-label={`Option ${i + 1}`}
                                onChange={(e) => {
                                  const next = [...selected.options]
                                  next[i] = e.target.value
                                  updateQuestion(selected.id, { options: next })
                                }}
                              />
                            ))}
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            onClick={() =>
                              updateQuestion(selected.id, {
                                options: [
                                  ...selected.options,
                                  `Option ${selected.options.length + 1}`,
                                ],
                              })
                            }
                          >
                            <Plus className="mr-1.5 h-4 w-4" /> Add option
                          </Button>
                        </div>
                      )}
                      <Separator />
                      <div className="flex items-center justify-between rounded-md border px-3 py-2.5">
                        <div className="space-y-0.5">
                          <Label htmlFor="q-required" className="text-sm">Required</Label>
                          <p className="text-xs text-muted-foreground">Respondent must answer</p>
                        </div>
                        <Switch
                          id="q-required"
                          checked={selected.required}
                          onCheckedChange={(v) => updateQuestion(selected.id, { required: Boolean(v) })}
                        />
                      </div>
                      <Button
                        variant="outline"
                        className="w-full text-destructive"
                        onClick={() => removeQuestion(selected.id)}
                      >
                        <Trash2 className="mr-1.5 h-4 w-4" /> Delete question
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center gap-2 py-12 text-center">
                      <Settings2 className="h-6 w-6 text-muted-foreground" />
                      <p className="text-sm font-medium">No question selected</p>
                      <p className="text-xs text-muted-foreground">
                        Select a question on the canvas to edit it.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </aside>
            </div>
          </TabsContent>

          <TabsContent value="results" className="mt-6 space-y-6">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="flex items-center gap-3 py-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Users className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs text-muted-foreground">Responses</p>
                    <p className="text-xl font-semibold">1,133</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center gap-3 py-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <CheckCircle2 className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs text-muted-foreground">Completion</p>
                    <p className="text-xl font-semibold">78%</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center gap-3 py-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <ThumbsUp className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs text-muted-foreground">NPS</p>
                    <p className="text-xl font-semibold">+52</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center gap-3 py-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Timer className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs text-muted-foreground">Avg. time</p>
                    <p className="text-xl font-semibold">1m 52s</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader className="border-b">
                  <CardTitle className="text-base">Overall experience rating</CardTitle>
                  <p className="text-sm text-muted-foreground">Single choice · 1,133 answers</p>
                </CardHeader>
                <CardContent className="space-y-4 py-6">
                  {RESULTS.map((r) => (
                    <div key={r.label} className="space-y-1.5">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{r.label}</span>
                        <span className="text-muted-foreground">
                          {r.count.toLocaleString()} · {r.pct}%
                        </span>
                      </div>
                      <div className="h-2.5 w-full rounded-full bg-muted">
                        <div
                          className="h-2.5 rounded-full bg-primary"
                          style={{ width: `${r.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="border-b">
                  <CardTitle className="text-base">Most-used features</CardTitle>
                  <p className="text-sm text-muted-foreground">Multiple choice · share of respondents</p>
                </CardHeader>
                <CardContent className="space-y-5 py-6">
                  {FEATURE_USE.map((f) => (
                    <div key={f.label} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{f.label}</span>
                        <span className="text-muted-foreground">{f.pct}%</span>
                      </div>
                      <Progress value={f.pct} />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="border-b">
                <CardTitle className="text-base">Recent open responses</CardTitle>
                <p className="text-sm text-muted-foreground">&ldquo;What is the one thing we could improve?&rdquo;</p>
              </CardHeader>
              <CardContent className="divide-y py-0">
                {[
                  { who: "Marcus L.", when: "Jun 12", text: "Love the dashboards, but I would like deeper export options for reports." },
                  { who: "Priya N.", when: "Jun 12", text: "Onboarding was smooth. A mobile app would make check-ins much easier." },
                  { who: "Dana W.", when: "Jun 11", text: "Automations are powerful — a few more triggers would be perfect." },
                ].map((c) => (
                  <div key={c.who} className="flex gap-3 py-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
                      {c.who.charAt(0)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{c.who}</span>
                        <span className="text-xs text-muted-foreground">{c.when}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{c.text}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
