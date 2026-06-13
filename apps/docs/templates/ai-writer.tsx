"use client"

import * as React from "react"
import {
  Sparkles,
  FileText,
  Mail,
  Megaphone,
  AlignLeft,
  Wand2,
  Copy,
  RotateCcw,
  Download,
  Lightbulb,
  Clock,
  Check,
  ChevronRight,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

type TemplateId = "blog" | "email" | "ad" | "summary"
type ToneId = "professional" | "casual" | "bold"

const TEMPLATES: {
  id: TemplateId
  label: string
  desc: string
  icon: React.ComponentType<{ className?: string }>
}[] = [
  { id: "blog", label: "Blog post", desc: "Long-form article with intro and sections", icon: FileText },
  { id: "email", label: "Email", desc: "Outreach or newsletter copy", icon: Mail },
  { id: "ad", label: "Ad copy", desc: "Punchy, conversion-focused lines", icon: Megaphone },
  { id: "summary", label: "Summary", desc: "Condense any text into key points", icon: AlignLeft },
]

const TONES: { id: ToneId; label: string }[] = [
  { id: "professional", label: "Professional" },
  { id: "casual", label: "Casual" },
  { id: "bold", label: "Bold" },
]

const TONE_OPENER: Record<ToneId, string> = {
  professional: "In today's competitive landscape, organizations must",
  casual: "Okay, let's be real for a second — you've probably",
  bold: "Stop settling for average. The teams that win",
}

const OUTPUT: Record<TemplateId, Record<ToneId, string>> = {
  blog: {
    professional:
      "# The Future of Productive Work\n\nIn today's competitive landscape, organizations must rethink how teams collaborate. This article explores three durable shifts: asynchronous communication, outcome-based planning, and the rise of AI copilots that handle routine drafting.\n\nFirst, async-first cultures reduce meeting load by an estimated 30%. Second, planning around outcomes rather than hours aligns incentives. Finally, AI assistance frees specialists for higher-leverage thinking.",
    casual:
      "# Why Work Feels Better Now\n\nOkay, let's be real for a second — you've probably sat through a meeting that should've been a message. Good news: things are changing.\n\nTeams are going async, ditching the calendar Tetris, and letting AI handle the boring first drafts. The result? More focus, fewer pings, and actual time to do deep work.",
    bold:
      "# Win the Decade of Deep Work\n\nStop settling for average. The teams that win aren't the busiest — they're the most focused. Async beats meetings. Outcomes beat hours. AI copilots beat blank pages.\n\nThe playbook is simple and ruthless: cut the noise, ship the work, repeat.",
  },
  email: {
    professional:
      "Subject: A faster path to your Q3 goals\n\nHi Jordan,\n\nIn today's competitive landscape, organizations must move faster without burning out their teams. I'd love to share how we've helped similar companies cut drafting time by 60%.\n\nWould a 15-minute call next week work?\n\nBest regards,\nAlex",
    casual:
      "Subject: quick idea for your team 👋\n\nHey Jordan,\n\nOkay, let's be real for a second — you've probably got a hundred tabs open right now. I'll keep this short.\n\nWe built something that writes your first drafts so you don't have to. Want me to send a 2-min demo?\n\nCheers,\nAlex",
    bold:
      "Subject: Your competitors are already using this\n\nJordan —\n\nStop settling for average. The teams that win are shipping content 5x faster while you're still staring at a blank doc.\n\nGive me 15 minutes and I'll prove it.\n\nAlex",
  },
  ad: {
    professional:
      "Headline: Draft smarter, ship faster.\n\nBody: A professional AI writing assistant trusted by 12,000+ teams. Generate on-brand copy in seconds, refine with one click, and keep your voice consistent.\n\nCTA: Start your free trial.",
    casual:
      "Headline: Blank page? Never again.\n\nBody: Okay, let's be real for a second — you've probably rewritten that intro five times. Let the AI take the first swing. You make it shine.\n\nCTA: Try it free, no card needed.",
    bold:
      "Headline: Write like you have a team of ten.\n\nBody: Stop settling for average. The teams that win generate, edit, and publish before lunch. This is your unfair advantage.\n\nCTA: Get started now.",
  },
  summary: {
    professional:
      "Summary (Professional)\n\n• In today's competitive landscape, organizations must adopt async-first workflows.\n• Outcome-based planning aligns incentives better than tracking hours.\n• AI copilots reduce routine drafting and free specialists for strategic work.\n• Early adopters report a 30–60% reduction in low-value tasks.",
    casual:
      "TL;DR\n\n• Okay, let's be real for a second — you've probably got too many meetings.\n• Going async = fewer pings, more focus.\n• Plan around results, not hours.\n• Let AI handle the boring drafts.",
    bold:
      "The Bottom Line\n\n• Stop settling for average. The teams that win cut the noise.\n• Async beats meetings. Every time.\n• Outcomes beat hours. No exceptions.\n• AI copilots beat blank pages. Use them.",
  },
}

const SUGGESTIONS = [
  "Tighten the opening line for more impact",
  "Add a concrete statistic or proof point",
  "Swap passive phrasing for active verbs",
  "End with a clearer call to action",
]

const HISTORY: { title: string; template: string; time: string }[] = [
  { title: "Q3 launch announcement", template: "Email", time: "2h ago" },
  { title: "Remote work blog draft", template: "Blog post", time: "Yesterday" },
  { title: "Spring sale headlines", template: "Ad copy", time: "2 days ago" },
  { title: "Investor update recap", template: "Summary", time: "Last week" },
]

export default function AiWriterTemplate() {
  const [template, setTemplate] = React.useState<TemplateId>("blog")
  const [tone, setTone] = React.useState<ToneId>("professional")
  const [content, setContent] = React.useState<string>("")
  const [generating, setGenerating] = React.useState(false)
  const [copied, setCopied] = React.useState(false)

  const activeTemplate = TEMPLATES.find((t) => t.id === template)!

  const handleGenerate = () => {
    setGenerating(true)
    const next = OUTPUT[template][tone]
    setContent((prev) => (prev.trim().length > 0 ? prev.trimEnd() + "\n\n" + next : next))
    setGenerating(false)
  }

  const handleCopy = () => {
    setCopied(true)
  }

  const wordCount = content.trim().length === 0 ? 0 : content.trim().split(/\s+/).length

  return (
    <div className="flex min-h-full bg-background text-foreground">
      {/* Left panel: templates */}
      <aside className="hidden w-64 shrink-0 flex-col border-r bg-muted/30 lg:flex">
        <div className="flex h-16 items-center gap-2 border-b px-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Wand2 className="h-4 w-4" />
          </div>
          <span className="text-sm font-semibold">Quill AI</span>
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          <p className="px-2 pb-2 pt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Templates
          </p>
          <nav className="flex flex-col gap-1">
            {TEMPLATES.map((t) => {
              const Icon = t.icon
              const active = t.id === template
              return (
                <button
                  key={t.id}
                  onClick={() => setTemplate(t.id)}
                  className={cn(
                    "flex items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                    active ? "bg-primary/10 text-primary" : "text-foreground hover:bg-accent"
                  )}
                  aria-pressed={active}
                >
                  <Icon className="mt-0.5 h-4 w-4 shrink-0" />
                  <span className="min-w-0">
                    <span className="block text-sm font-medium">{t.label}</span>
                    <span
                      className={cn(
                        "block text-xs leading-snug",
                        active ? "text-primary/80" : "text-muted-foreground"
                      )}
                    >
                      {t.desc}
                    </span>
                  </span>
                </button>
              )
            })}
          </nav>
          <Separator className="my-4" />
          <div className="rounded-lg border bg-card p-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Zap className="h-4 w-4 text-primary" />
              Credits
            </div>
            <p className="mt-1 text-xs text-muted-foreground">240 of 500 words remaining today</p>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full w-1/2 rounded-full bg-primary" />
            </div>
          </div>
        </div>
        <div className="border-t p-3">
          <div className="flex items-center gap-3 rounded-lg px-2 py-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>AM</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">Alex Morgan</p>
              <p className="truncate text-xs text-muted-foreground">Pro plan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Center: editor */}
      <main className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-between gap-4 border-b px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-2">
            <activeTemplate.icon className="h-5 w-5 shrink-0 text-primary" />
            <div className="min-w-0">
              <h1 className="truncate text-base font-semibold">{activeTemplate.label}</h1>
              <p className="truncate text-xs text-muted-foreground">Untitled document</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Copy content"
              onClick={handleCopy}
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Clear editor"
              onClick={() => {
                setContent("")
                setCopied(false)
              }}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </header>

        {/* Tone selector */}
        <div className="flex flex-wrap items-center gap-3 border-b px-4 py-3 sm:px-6">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Tone
          </span>
          <div className="flex flex-wrap gap-2">
            {TONES.map((t) => {
              const active = t.id === tone
              return (
                <button
                  key={t.id}
                  onClick={() => setTone(t.id)}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                    active
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-background text-muted-foreground hover:bg-accent"
                  )}
                  aria-pressed={active}
                >
                  {t.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Editor surface */}
        <div className="flex flex-1 flex-col px-4 py-5 sm:px-6">
          <textarea
            value={content}
            onChange={(e) => {
              setContent(e.target.value)
              setCopied(false)
            }}
            placeholder={`Start writing, or click Generate to draft a ${activeTemplate.label.toLowerCase()} in a ${tone} tone...`}
            className="min-h-[260px] flex-1 resize-none whitespace-pre-wrap rounded-lg border bg-card p-4 font-mono text-sm leading-relaxed text-foreground outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Document editor"
          />

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>{wordCount} words</span>
              <span className="hidden sm:inline">
                {activeTemplate.label} · {TONES.find((t) => t.id === tone)!.label}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => setContent("")}>
                Clear
              </Button>
              <Button size="sm" onClick={handleGenerate} disabled={generating}>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Right panel: suggestions + history */}
      <aside className="hidden w-72 shrink-0 flex-col border-l bg-muted/30 xl:flex">
        <div className="flex h-16 items-center gap-2 border-b px-5">
          <Lightbulb className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold">Assistant</span>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Suggestions
          </p>
          <ul className="mt-3 space-y-2">
            {SUGGESTIONS.map((s) => (
              <li key={s}>
                <button className="group flex w-full items-start gap-2 rounded-lg border bg-card p-3 text-left text-sm transition-colors hover:border-primary">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="min-w-0 flex-1">{s}</span>
                  <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </button>
              </li>
            ))}
          </ul>

          <Separator className="my-5" />

          <div className="flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              History
            </p>
            <Badge variant="secondary">{HISTORY.length}</Badge>
          </div>
          <ul className="mt-3 space-y-1">
            {HISTORY.map((h) => (
              <li key={h.title}>
                <button className="flex w-full items-start gap-3 rounded-lg px-2 py-2.5 text-left transition-colors hover:bg-accent">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium">{h.title}</span>
                    <span className="block text-xs text-muted-foreground">
                      {h.template} · {h.time}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t p-4">
          <Button variant="outline" className="w-full">
            <Wand2 className="mr-2 h-4 w-4" />
            New document
          </Button>
        </div>
      </aside>
    </div>
  )
}
