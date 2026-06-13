"use client"

import * as React from "react"
import {
  ArrowUp,
  Bot,
  Check,
  Copy,
  MessageSquarePlus,
  Mic,
  MoreHorizontal,
  Paperclip,
  Search,
  Settings,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  User,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

type Role = "user" | "assistant"
type Message = { id: number; role: Role; content: string }

type Conversation = {
  id: string
  title: string
  preview: string
  time: string
  active?: boolean
}

const MODELS = [
  { id: "cano-pro", name: "Cano Pro", hint: "Most capable" },
  { id: "cano-flash", name: "Cano Flash", hint: "Fast & light" },
  { id: "cano-reason", name: "Cano Reason", hint: "Deep thinking" },
] as const

const CONVERSATIONS: Conversation[] = [
  {
    id: "c1",
    title: "Onboarding email rewrite",
    preview: "Can you make the tone warmer and...",
    time: "2m",
    active: true,
  },
  {
    id: "c2",
    title: "SQL query optimization",
    preview: "The join is scanning the whole table",
    time: "1h",
  },
  {
    id: "c3",
    title: "Trip itinerary for Kyoto",
    preview: "5 days in late October, two adults",
    time: "3h",
  },
  {
    id: "c4",
    title: "Marketing landing copy",
    preview: "Headline options for the launch page",
    time: "Yesterday",
  },
  {
    id: "c5",
    title: "Explain transformers simply",
    preview: "Like I'm a product manager, please",
    time: "2d",
  },
  {
    id: "c6",
    title: "Weekly standup summary",
    preview: "Turn these notes into bullet points",
    time: "4d",
  },
]

const SEED_MESSAGES: Message[] = [
  {
    id: 1,
    role: "user",
    content:
      "Can you rewrite our onboarding welcome email so it feels warmer and a little more personal?",
  },
  {
    id: 2,
    role: "assistant",
    content:
      "Absolutely. Here's a warmer take:\n\nSubject: Welcome aboard — we're so glad you're here\n\nHi {first_name}, thanks for joining us! We built this to save you time, and we'd love to help you get your first win today. Reply any time — a real human reads every message.",
  },
  {
    id: 3,
    role: "user",
    content: "Nice. Can you add one short line about our 24/7 support?",
  },
  {
    id: 4,
    role: "assistant",
    content:
      "Of course — drop this in right before the sign-off:\n\n\"Stuck at 2am? Our support team is on call around the clock, every day of the week.\"\n\nWant me to draft a matching follow-up email for day three?",
  },
]

const SUGGESTIONS = [
  "Summarize a document",
  "Draft a product update",
  "Plan a sprint",
  "Explain a concept",
] as const

const CANNED_REPLY =
  "Great question. Here's how I'd approach it: start with the outcome you want, break it into two or three concrete steps, then we can refine each one together. Want me to expand on any step in more detail?"

export default function AiChat() {
  const [model, setModel] = React.useState<(typeof MODELS)[number]["id"]>("cano-pro")
  const [messages, setMessages] = React.useState<Message[]>(SEED_MESSAGES)
  const [draft, setDraft] = React.useState("")
  const [copied, setCopied] = React.useState<number | null>(null)

  const activeModel = MODELS.find((m) => m.id === model) ?? MODELS[0]

  function send() {
    const text = draft.trim()
    if (!text) return
    setMessages((prev) => {
      const base = prev.length ? prev[prev.length - 1].id : 0
      return [
        ...prev,
        { id: base + 1, role: "user", content: text },
        { id: base + 2, role: "assistant", content: CANNED_REPLY },
      ]
    })
    setDraft("")
  }

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  function copy(m: Message) {
    setCopied(m.id)
    window.setTimeout(() => setCopied((c) => (c === m.id ? null : c)), 1200)
  }

  return (
    <div className="flex min-h-full bg-background text-foreground">
      {/* Sidebar */}
      <aside className="hidden w-72 shrink-0 flex-col border-r bg-muted/30 md:flex">
        <div className="flex items-center gap-2 px-4 py-4">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="size-4" />
          </div>
          <span className="text-sm font-semibold">Cano Assistant</span>
        </div>

        <div className="px-3">
          <Button className="w-full justify-start gap-2">
            <MessageSquarePlus className="size-4" />
            New chat
          </Button>
        </div>

        <div className="px-3 pt-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search chats" className="pl-9" aria-label="Search chats" />
          </div>
        </div>

        <nav className="mt-4 flex-1 overflow-y-auto px-2 pb-4">
          <p className="px-2 pb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Recent
          </p>
          <ul className="space-y-1">
            {CONVERSATIONS.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  className={cn(
                    "group flex w-full flex-col gap-0.5 rounded-lg px-3 py-2 text-left transition-colors",
                    c.active ? "bg-accent" : "hover:bg-accent"
                  )}
                >
                  <span className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-medium">{c.title}</span>
                    <span className="shrink-0 text-xs text-muted-foreground">{c.time}</span>
                  </span>
                  <span className="truncate text-xs text-muted-foreground">{c.preview}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <Separator />
        <div className="flex items-center gap-3 px-4 py-3">
          <Avatar className="size-8">
            <AvatarFallback>AM</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">Avery Mills</p>
            <p className="truncate text-xs text-muted-foreground">Pro plan</p>
          </div>
          <Button variant="ghost" size="icon" aria-label="Settings">
            <Settings className="size-4" />
          </Button>
        </div>
      </aside>

      {/* Main chat */}
      <main className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between gap-3 border-b px-4 py-3 sm:px-6">
          <div className="min-w-0">
            <h1 className="truncate text-sm font-semibold sm:text-base">
              Onboarding email rewrite
            </h1>
            <p className="text-xs text-muted-foreground">
              {messages.length} messages · {activeModel.name}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="gap-1">
              <Bot className="size-3" />
              {activeModel.name}
            </Badge>
            <Button variant="ghost" size="icon" aria-label="More options">
              <MoreHorizontal className="size-4" />
            </Button>
          </div>
        </header>

        {/* Thread */}
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          <div className="mx-auto flex max-w-3xl flex-col gap-6">
            {messages.map((m) => (
              <ChatBubble key={m.id} message={m} copied={copied === m.id} onCopy={() => copy(m)} />
            ))}
          </div>
        </div>

        {/* Composer */}
        <div className="border-t bg-background px-4 py-4 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground">Model</span>
              {MODELS.map((opt) => {
                const selected = opt.id === model
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setModel(opt.id)}
                    aria-pressed={selected}
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                      selected
                        ? "border-primary bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-accent"
                    )}
                  >
                    {opt.name}
                  </button>
                )
              })}
            </div>

            <div className="rounded-2xl border bg-card p-2 shadow-sm focus-within:ring-1 focus-within:ring-ring">
              <Textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={handleKey}
                rows={2}
                placeholder={`Message ${activeModel.name}…`}
                aria-label="Message composer"
                className="min-h-0 resize-none border-0 bg-transparent px-2 py-1.5 shadow-none focus-visible:ring-0"
              />
              <div className="flex items-center justify-between gap-2 px-1 pt-1">
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" aria-label="Attach file">
                    <Paperclip className="size-4" />
                  </Button>
                  <Button variant="ghost" size="icon" aria-label="Voice input">
                    <Mic className="size-4" />
                  </Button>
                </div>
                <Button
                  size="icon"
                  onClick={send}
                  disabled={!draft.trim()}
                  aria-label="Send message"
                  className="rounded-full"
                >
                  <ArrowUp className="size-4" />
                </Button>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setDraft(s)}
                  className="rounded-full border px-3 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent"
                >
                  {s}
                </button>
              ))}
            </div>

            <p className="mt-3 text-center text-xs text-muted-foreground">
              {activeModel.name} · {activeModel.hint}. Responses are simulated.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

function ChatBubble({
  message,
  copied,
  onCopy,
}: {
  message: Message
  copied: boolean
  onCopy: () => void
}) {
  const isUser = message.role === "user"
  return (
    <div className={cn("flex gap-3", isUser && "flex-row-reverse")}>
      <Avatar className="size-8 shrink-0">
        <AvatarFallback className={cn(isUser ? "bg-secondary" : "bg-primary text-primary-foreground")}>
          {isUser ? <User className="size-4" /> : <Bot className="size-4" />}
        </AvatarFallback>
      </Avatar>

      <div className={cn("flex max-w-[80%] flex-col gap-1.5", isUser && "items-end")}>
        <span className="px-1 text-xs font-medium text-muted-foreground">
          {isUser ? "You" : "Cano"}
        </span>
        <div
          className={cn(
            "whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed",
            isUser
              ? "rounded-tr-sm bg-primary text-primary-foreground"
              : "rounded-tl-sm border bg-card"
          )}
        >
          {message.content}
        </div>

        {!isUser && (
          <div className="flex items-center gap-1 px-1">
            <Button variant="ghost" size="icon" className="size-7" aria-label="Copy reply" onClick={onCopy}>
              {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            </Button>
            <Button variant="ghost" size="icon" className="size-7" aria-label="Good reply">
              <ThumbsUp className="size-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="size-7" aria-label="Bad reply">
              <ThumbsDown className="size-3.5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
