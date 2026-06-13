"use client"

import * as React from "react"
import {
  Tags,
  ListChecks,
  SkipForward,
  Undo2,
  Smile,
  Frown,
  Meh,
  CheckCircle2,
  Circle,
  BookOpen,
  Keyboard,
  Flag,
  Sparkles,
  TrendingUp,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"

type LabelId = "positive" | "neutral" | "negative"

type Item = {
  id: string
  source: string
  channel: string
  text: string
  label: LabelId | null
}

const LABELS: {
  id: LabelId
  name: string
  hint: string
  shortcut: string
  icon: React.ComponentType<{ className?: string }>
}[] = [
  { id: "positive", name: "Positive", hint: "Praise, satisfaction, delight", shortcut: "1", icon: Smile },
  { id: "neutral", name: "Neutral", hint: "Factual, mixed, no clear sentiment", shortcut: "2", icon: Meh },
  { id: "negative", name: "Negative", hint: "Complaint, frustration, churn risk", shortcut: "3", icon: Frown },
]

const LABEL_TONE: Record<LabelId, string> = {
  positive: "border-primary bg-primary/10 text-primary",
  neutral: "border-border bg-muted text-foreground",
  negative: "border-destructive/40 bg-destructive/10 text-destructive",
}

const INITIAL_ITEMS: Item[] = [
  {
    id: "RV-1042",
    source: "App Store review",
    channel: "iOS",
    text: "Honestly the new dashboard is a game changer. I set up my first report in under two minutes and the export worked perfectly. Whoever redesigned this deserves a raise.",
    label: null,
  },
  {
    id: "RV-1043",
    source: "Support ticket",
    channel: "Email",
    text: "I was charged twice this month and nobody has replied to my last two messages. This is incredibly frustrating and I'm considering cancelling my plan.",
    label: null,
  },
  {
    id: "RV-1044",
    source: "In-app survey",
    channel: "Web",
    text: "The product does what it says. Onboarding took a while and a few settings were hard to find, but overall it gets the job done for our small team.",
    label: null,
  },
  {
    id: "RV-1045",
    source: "Twitter mention",
    channel: "Social",
    text: "Switched our whole team over last week and we are not looking back. The integrations alone saved us hours. Highly recommend to anyone on the fence.",
    label: null,
  },
  {
    id: "RV-1046",
    source: "Support ticket",
    channel: "Chat",
    text: "App keeps crashing on the latest update whenever I open the reports tab. Tried reinstalling twice with no luck. Please fix this soon.",
    label: null,
  },
  {
    id: "RV-1047",
    source: "App Store review",
    channel: "Android",
    text: "Update from version 3 is fine. Layout changed a bit and I needed to find a couple of buttons again, but nothing major. Works as expected.",
    label: null,
  },
  {
    id: "RV-1048",
    source: "In-app survey",
    channel: "Web",
    text: "Customer support went above and beyond to migrate my data on a Sunday. That kind of service is rare and it made me a customer for life.",
    label: null,
  },
  {
    id: "RV-1049",
    source: "Twitter mention",
    channel: "Social",
    text: "Pricing went up again with no new features to show for it. Starting to feel like loyal customers are being taken for granted here.",
    label: null,
  },
]

const GUIDELINES: { title: string; body: string }[] = [
  {
    title: "Judge sentiment, not topic",
    body: "Label the writer's feeling about the product, not the subject they mention.",
  },
  {
    title: "Mixed signals are Neutral",
    body: "If praise and complaint roughly balance out, choose Neutral rather than guessing.",
  },
  {
    title: "Sarcasm counts",
    body: "Read intent. \"Great, another bug\" is Negative even with a positive word.",
  },
  {
    title: "Flag the unclear",
    body: "If a sample is off-topic or ambiguous, flag it instead of forcing a label.",
  },
]

export default function AiDataLabelingTemplate() {
  const [items, setItems] = React.useState<Item[]>(INITIAL_ITEMS)
  const [activeId, setActiveId] = React.useState<string>(INITIAL_ITEMS[0].id)

  const labeledCount = items.filter((i) => i.label !== null).length
  const total = items.length
  const remaining = total - labeledCount
  const pct = Math.round((labeledCount / total) * 100)

  const activeIndex = items.findIndex((i) => i.id === activeId)
  const activeItem = items[activeIndex]

  const counts: Record<LabelId, number> = {
    positive: items.filter((i) => i.label === "positive").length,
    neutral: items.filter((i) => i.label === "neutral").length,
    negative: items.filter((i) => i.label === "negative").length,
  }

  const goToNextUnlabeled = (fromIndex: number) => {
    for (let step = 1; step <= items.length; step++) {
      const idx = (fromIndex + step) % items.length
      if (items[idx].label === null) {
        setActiveId(items[idx].id)
        return
      }
    }
  }

  const assignLabel = (label: LabelId) => {
    if (!activeItem) return
    const wasUnlabeled = activeItem.label === null
    setItems((prev) =>
      prev.map((i) => (i.id === activeItem.id ? { ...i, label } : i))
    )
    if (wasUnlabeled) {
      goToNextUnlabeled(activeIndex)
    }
  }

  const skip = () => {
    if (!activeItem) return
    goToNextUnlabeled(activeIndex)
  }

  const undo = () => {
    if (!activeItem) return
    setItems((prev) =>
      prev.map((i) => (i.id === activeItem.id ? { ...i, label: null } : i))
    )
  }

  const allDone = remaining === 0

  return (
    <div className="flex min-h-full bg-background text-foreground">
      {/* Left: queue */}
      <aside className="hidden w-72 shrink-0 flex-col border-r bg-muted/30 md:flex">
        <div className="flex h-16 items-center gap-2 border-b px-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Tags className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">LabelForge</p>
            <p className="truncate text-xs text-muted-foreground">Sentiment · batch 14</p>
          </div>
        </div>
        <div className="flex items-center justify-between border-b px-5 py-3">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Queue
          </span>
          <Badge variant="secondary">{remaining} left</Badge>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          <ul className="space-y-1">
            {items.map((item) => {
              const active = item.id === activeId
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveId(item.id)}
                    aria-pressed={active}
                    className={cn(
                      "flex w-full items-start gap-3 rounded-lg border px-3 py-2.5 text-left transition-colors",
                      active
                        ? "border-primary bg-primary/10"
                        : "border-transparent hover:bg-accent"
                    )}
                  >
                    {item.label ? (
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    ) : (
                      <Circle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    )}
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className="text-xs font-medium tabular-nums">{item.id}</span>
                        {item.label && (
                          <span
                            className={cn(
                              "rounded-full border px-1.5 py-0.5 text-[10px] font-medium capitalize",
                              LABEL_TONE[item.label]
                            )}
                          >
                            {item.label}
                          </span>
                        )}
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                        {item.text}
                      </span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="border-t p-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <ListChecks className="h-4 w-4 text-primary" />
            {labeledCount} of {total} labeled
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Auto-saves after each label</p>
        </div>
      </aside>

      {/* Center: item card */}
      <main className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-between gap-4 border-b px-4 sm:px-6">
          <div className="min-w-0">
            <h1 className="truncate text-base font-semibold">Label sentiment</h1>
            <p className="truncate text-xs text-muted-foreground">
              Assign one label per sample, then advance
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm font-medium tabular-nums text-muted-foreground sm:inline">
              {pct}% complete
            </span>
            <Progress value={pct} className="hidden h-2 w-32 sm:block" />
          </div>
        </header>

        {/* Mobile progress */}
        <div className="border-b px-4 py-3 sm:hidden">
          <div className="mb-1.5 flex items-center justify-between text-xs text-muted-foreground">
            <span>{labeledCount} labeled</span>
            <span className="tabular-nums">{pct}%</span>
          </div>
          <Progress value={pct} className="h-2" />
        </div>

        <div className="flex flex-1 flex-col items-center overflow-y-auto px-4 py-6 sm:px-6">
          <div className="w-full max-w-2xl">
            {allDone ? (
              <div className="flex flex-col items-center rounded-xl border bg-card p-10 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h2 className="mt-4 text-lg font-semibold">Batch complete</h2>
                <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                  All {total} samples in this batch are labeled. Submit to send them for review,
                  or revisit any item from the queue.
                </p>
                <Button className="mt-5">Submit batch</Button>
              </div>
            ) : (
              activeItem && (
                <>
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="tabular-nums">
                      {activeItem.id}
                    </Badge>
                    <Badge variant="secondary">{activeItem.source}</Badge>
                    <Badge variant="outline">{activeItem.channel}</Badge>
                    <span className="ml-auto text-xs tabular-nums text-muted-foreground">
                      Item {activeIndex + 1} of {total}
                    </span>
                  </div>

                  <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Text sample
                    </p>
                    <p className="mt-3 text-lg leading-relaxed">{activeItem.text}</p>
                    {activeItem.label && (
                      <div className="mt-5 flex items-center gap-2 border-t pt-4 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        <span className="text-muted-foreground">Current label</span>
                        <span
                          className={cn(
                            "rounded-full border px-2 py-0.5 text-xs font-medium capitalize",
                            LABEL_TONE[activeItem.label]
                          )}
                        >
                          {activeItem.label}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Label buttons */}
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {LABELS.map((l) => {
                      const Icon = l.icon
                      const selected = activeItem.label === l.id
                      return (
                        <button
                          key={l.id}
                          onClick={() => assignLabel(l.id)}
                          aria-pressed={selected}
                          className={cn(
                            "group flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-all hover:border-primary hover:shadow-sm",
                            selected ? "border-primary bg-primary/5 ring-1 ring-primary" : "bg-card"
                          )}
                        >
                          <span className="flex w-full items-center justify-between">
                            <span
                              className={cn(
                                "flex h-9 w-9 items-center justify-center rounded-lg",
                                selected
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted text-foreground"
                              )}
                            >
                              <Icon className="h-5 w-5" />
                            </span>
                            <kbd className="rounded border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                              {l.shortcut}
                            </kbd>
                          </span>
                          <span className="text-sm font-semibold">{l.name}</span>
                          <span className="text-xs leading-snug text-muted-foreground">
                            {l.hint}
                          </span>
                        </button>
                      )
                    })}
                  </div>

                  {/* Secondary actions */}
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <Button variant="outline" size="sm" onClick={skip}>
                      <SkipForward className="mr-2 h-4 w-4" />
                      Skip
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={undo}
                      disabled={!activeItem.label}
                    >
                      <Undo2 className="mr-2 h-4 w-4" />
                      Clear label
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <Flag className="mr-2 h-4 w-4" />
                      Flag as unclear
                    </Button>
                    <span className="ml-auto hidden items-center gap-1.5 text-xs text-muted-foreground sm:flex">
                      <Keyboard className="h-3.5 w-3.5" />
                      Press 1–3 to label
                    </span>
                  </div>
                </>
              )
            )}
          </div>
        </div>
      </main>

      {/* Right: guidelines + stats */}
      <aside className="hidden w-80 shrink-0 flex-col border-l bg-muted/30 xl:flex">
        <div className="flex h-16 items-center gap-2 border-b px-5">
          <BookOpen className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold">Guidelines & stats</span>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          {/* Stats */}
          <div className="rounded-xl border bg-card p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Session
              </p>
              <span className="flex items-center gap-1 text-xs text-primary">
                <TrendingUp className="h-3.5 w-3.5" />
                {pct}%
              </span>
            </div>
            <p className="mt-2 text-3xl font-semibold tabular-nums">{labeledCount}</p>
            <p className="text-xs text-muted-foreground">samples labeled this batch</p>
            <Separator className="my-4" />
            <ul className="space-y-3">
              {LABELS.map((l) => {
                const c = counts[l.id]
                const share = total === 0 ? 0 : Math.round((c / total) * 100)
                return (
                  <li key={l.id}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <span
                          className={cn(
                            "h-2.5 w-2.5 rounded-full",
                            l.id === "positive"
                              ? "bg-primary"
                              : l.id === "neutral"
                                ? "bg-muted-foreground"
                                : "bg-destructive"
                          )}
                        />
                        {l.name}
                      </span>
                      <span className="tabular-nums text-muted-foreground">{c}</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all",
                          l.id === "positive"
                            ? "bg-primary"
                            : l.id === "neutral"
                              ? "bg-muted-foreground"
                              : "bg-destructive"
                        )}
                        style={{ width: `${share}%` }}
                      />
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>

          <Separator className="my-5" />

          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Labeling guidelines
          </p>
          <ul className="mt-3 space-y-3">
            {GUIDELINES.map((g) => (
              <li key={g.title} className="rounded-lg border bg-card p-3">
                <p className="text-sm font-medium">{g.title}</p>
                <p className="mt-1 text-xs leading-snug text-muted-foreground">{g.body}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t p-4">
          <Button className="w-full" disabled={!allDone}>
            {allDone ? "Submit batch" : `${remaining} left to label`}
          </Button>
        </div>
      </aside>
    </div>
  )
}
