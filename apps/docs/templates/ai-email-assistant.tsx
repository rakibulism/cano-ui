"use client"

import * as React from "react"
import {
  Archive,
  Check,
  ChevronDown,
  Inbox,
  Lightbulb,
  Mail,
  Paperclip,
  PenLine,
  Search,
  Send,
  Sparkles,
  Star,
  Trash2,
  Wand2,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

type Thread = {
  id: string
  from: string
  initials: string
  subject: string
  preview: string
  time: string
  to: string
  unread?: boolean
  starred?: boolean
  label: string
  draft: string
}

type Tone = "Professional" | "Friendly" | "Concise" | "Persuasive" | "Apologetic"

const TONES: Tone[] = ["Professional", "Friendly", "Concise", "Persuasive", "Apologetic"]

const THREADS: Thread[] = [
  {
    id: "t1",
    from: "Dana Whitfield",
    initials: "DW",
    subject: "Renewal terms for the Q3 contract",
    preview: "Hi — wanted to circle back on the pricing tier before we...",
    time: "9:24 AM",
    to: "dana@northwind.co",
    unread: true,
    starred: true,
    label: "Sales",
    draft:
      "Hi Dana,\n\nThank you for circling back on the Q3 renewal. I'd be happy to walk you through the updated pricing tiers and the volume discount we discussed.\n\nBased on your current usage, the Growth plan looks like the strongest fit, and I can hold the current rate through the end of the quarter. Would Thursday at 2pm work for a quick call to finalize the terms?\n\nBest,\nAlex",
  },
  {
    id: "t2",
    from: "Marcus Lee",
    initials: "ML",
    subject: "Following up on the design handoff",
    preview: "The latest Figma file is ready — can you confirm the...",
    time: "8:02 AM",
    to: "marcus@studioform.io",
    unread: true,
    label: "Product",
    draft:
      "Hi Marcus,\n\nAppreciate you getting the design handoff over so quickly. I reviewed the latest Figma file and the spacing tokens look great.\n\nOne small thing: could you confirm the empty-state illustration is final before we kick off the build? Once that's locked I'll get the tickets created today.\n\nThanks,\nAlex",
  },
  {
    id: "t3",
    from: "Priya Nair",
    initials: "PN",
    subject: "Re: Onboarding feedback from the pilot",
    preview: "A few of our team members mentioned the setup flow felt...",
    time: "Yesterday",
    to: "priya@brightlabs.com",
    starred: true,
    label: "Support",
    draft:
      "Hi Priya,\n\nThank you for the thoughtful onboarding feedback from the pilot — this is exactly the kind of detail that helps us improve.\n\nWe're already simplifying the setup flow your team flagged, and I'll make sure your account is migrated to the streamlined version next week. I'll follow up once it's live.\n\nWarm regards,\nAlex",
  },
  {
    id: "t4",
    from: "Jordan Cole",
    initials: "JC",
    subject: "Invoice #4821 — payment confirmation",
    preview: "Just confirming we received the wire transfer for...",
    time: "Mon",
    to: "billing@coleventures.com",
    label: "Finance",
    draft:
      "Hi Jordan,\n\nThanks for confirming receipt of the wire transfer for invoice #4821. I've marked the account as paid in full on our side.\n\nYour next statement will go out on the 1st. Let me know if you'd like the receipt forwarded to anyone else on your team.\n\nBest,\nAlex",
  },
]

const SUGGESTIONS: { id: string; title: string; body: string }[] = [
  {
    id: "s1",
    title: "Add a clear call to action",
    body: "Suggest a specific time so the reply doesn't stall in back-and-forth.",
  },
  {
    id: "s2",
    title: "Soften the opening",
    body: "Lead with appreciation before the ask to keep the tone warm.",
  },
  {
    id: "s3",
    title: "Shorten paragraph two",
    body: "The middle section runs long — trim to one focused sentence.",
  },
]

export default function AiEmailAssistant() {
  const [activeId, setActiveId] = React.useState<string>(THREADS[0].id)
  const [tone, setTone] = React.useState<Tone>("Professional")
  const [body, setBody] = React.useState<string>("")
  const [generating, setGenerating] = React.useState(false)
  const [accepted, setAccepted] = React.useState<string[]>([])

  const active = THREADS.find((t) => t.id === activeId) ?? THREADS[0]

  React.useEffect(() => {
    setBody("")
    setAccepted([])
  }, [activeId])

  function handleSelect(id: string) {
    setActiveId(id)
  }

  function handleGenerate() {
    setGenerating(true)
    window.setTimeout(() => {
      const prefix =
        tone === "Concise"
          ? active.draft.split("\n\n").slice(0, 2).join("\n\n")
          : tone === "Friendly"
            ? active.draft.replace("Best,", "Cheers,").replace("Hi ", "Hey ")
            : active.draft
      setBody(prefix)
      setGenerating(false)
    }, 650)
  }

  function toggleSuggestion(id: string) {
    setAccepted((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    )
  }

  return (
    <div className="flex min-h-full bg-background text-foreground">
      {/* Threads list */}
      <aside className="hidden w-80 shrink-0 flex-col border-r md:flex">
        <div className="flex items-center gap-2 border-b px-4 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold leading-none">Inbox AI</span>
            <span className="text-xs text-muted-foreground">Smart compose</span>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="ml-auto"
            aria-label="Compose new email"
          >
            <PenLine className="h-4 w-4" />
          </Button>
        </div>

        <div className="border-b p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search drafts" className="pl-9" />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-2">
          {THREADS.map((t) => {
            const isActive = t.id === activeId
            return (
              <button
                key={t.id}
                onClick={() => handleSelect(t.id)}
                className={cn(
                  "mb-1 flex w-full flex-col gap-1 rounded-lg border border-transparent px-3 py-3 text-left transition-colors",
                  isActive
                    ? "border-border bg-accent"
                    : "hover:bg-muted/60",
                )}
              >
                <div className="flex items-center gap-2">
                  <Avatar className="h-7 w-7">
                    <AvatarFallback className="text-xs">{t.initials}</AvatarFallback>
                  </Avatar>
                  <span
                    className={cn(
                      "truncate text-sm",
                      t.unread ? "font-semibold" : "font-medium",
                    )}
                  >
                    {t.from}
                  </span>
                  {t.starred && (
                    <Star className="ml-auto h-3.5 w-3.5 fill-primary text-primary" />
                  )}
                  <span
                    className={cn(
                      "text-xs text-muted-foreground",
                      t.starred ? "" : "ml-auto",
                    )}
                  >
                    {t.time}
                  </span>
                </div>
                <span className="truncate text-sm font-medium">{t.subject}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {t.preview}
                </span>
                <Badge variant="secondary" className="mt-1 w-fit text-[10px]">
                  {t.label}
                </Badge>
              </button>
            )
          })}
        </nav>
      </aside>

      {/* Composer */}
      <main className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-3 border-b px-6 py-4">
          <div className="flex min-w-0 flex-col">
            <h1 className="truncate text-base font-semibold">{active.subject}</h1>
            <p className="truncate text-xs text-muted-foreground">
              To {active.to}
            </p>
          </div>
          <div className="ml-auto flex items-center gap-1">
            <Button size="icon" variant="ghost" aria-label="Archive">
              <Archive className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" aria-label="Move to inbox">
              <Inbox className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" aria-label="Delete draft">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-5 overflow-y-auto p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="to" className="text-xs text-muted-foreground">
                Recipient
              </Label>
              <Input id="to" defaultValue={active.to} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="subject" className="text-xs text-muted-foreground">
                Subject
              </Label>
              <Input id="subject" defaultValue={active.subject} />
            </div>
          </div>

          {/* Tone chips + generate */}
          <div className="rounded-xl border bg-muted/30 p-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 flex items-center gap-1.5 text-sm font-medium">
                <Wand2 className="h-4 w-4 text-primary" />
                Tone
              </span>
              {TONES.map((tn) => {
                const selected = tn === tone
                return (
                  <button
                    key={tn}
                    onClick={() => setTone(tn)}
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                      selected
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:bg-muted",
                    )}
                  >
                    {tn}
                  </button>
                )
              })}
              <Button
                size="sm"
                className="ml-auto gap-1.5"
                onClick={handleGenerate}
                disabled={generating}
              >
                <Sparkles className={cn("h-4 w-4", generating && "animate-pulse")} />
                {generating ? "Generating…" : "AI Generate"}
              </Button>
            </div>
          </div>

          <Textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Start writing, or hit AI Generate to draft a reply in your selected tone…"
            className="min-h-64 flex-1 resize-none text-sm leading-relaxed"
          />
        </div>

        <footer className="flex items-center gap-2 border-t px-6 py-4">
          <Button className="gap-1.5">
            <Send className="h-4 w-4" />
            Send
          </Button>
          <Button variant="outline" className="gap-1.5">
            <Paperclip className="h-4 w-4" />
            Attach
          </Button>
          <span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
            <Mail className="h-3.5 w-3.5" />
            Draft saved
          </span>
        </footer>
      </main>

      {/* Suggestions panel */}
      <aside className="hidden w-80 shrink-0 flex-col border-l p-5 lg:flex">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold">AI Suggestions</h2>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Improvements for your reply in a {tone.toLowerCase()} tone.
        </p>

        <div className="mt-4 flex flex-col gap-3">
          {SUGGESTIONS.map((s) => {
            const isAccepted = accepted.includes(s.id)
            return (
              <div
                key={s.id}
                className="rounded-lg border bg-card p-3 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-medium">{s.title}</h3>
                  <Button
                    size="icon"
                    variant={isAccepted ? "secondary" : "ghost"}
                    className="h-7 w-7 shrink-0"
                    onClick={() => toggleSuggestion(s.id)}
                    aria-label={isAccepted ? "Undo suggestion" : "Apply suggestion"}
                  >
                    <Check
                      className={cn(
                        "h-4 w-4",
                        isAccepted ? "text-primary" : "text-muted-foreground",
                      )}
                    />
                  </Button>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{s.body}</p>
              </div>
            )
          })}
        </div>

        <Separator className="my-5" />

        <div className="rounded-xl border bg-primary/10 p-4">
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            Writing score
          </div>
          <div className="mt-3 flex items-end gap-2">
            <span className="text-3xl font-semibold">
              {82 + accepted.length * 4}
            </span>
            <span className="mb-1 text-xs text-muted-foreground">/ 100</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Apply suggestions to lift clarity and warmth.
          </p>
        </div>

        <Button variant="ghost" className="mt-4 justify-between text-xs">
          More writing tools
          <ChevronDown className="h-4 w-4" />
        </Button>
      </aside>
    </div>
  )
}
